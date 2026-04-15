export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2).max(100),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email().optional().or(z.literal('')),
  industry: z.string().optional(),
  preferred_state: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().max(1000).optional(),
  source: z.enum(['popup', 'hero', 'contact', 'footer', 'property', 'website']).default('website'),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
})

let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

// Simple in-memory rate limiting (per IP, 5 req/min)
const rateLimitMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const supabase = createSupabaseAdminClient()

    // Insert lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        whatsapp: `+91${data.whatsapp}`,
        email: data.email || null,
        industry: data.industry || null,
        preferred_state: data.preferred_state || null,
        budget: data.budget || null,
        message: data.message || null,
        source: data.source,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        ip_address: ip,
        user_agent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer'),
      })
      .select()
      .single()

    if (error) throw error

    // Send email notifications (non-blocking)
    sendEmailNotifications(data).catch(console.error)

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendEmailNotifications(data: z.infer<typeof schema>) {
  const adminEmail = process.env.ADMIN_EMAIL || 'marutideveloper78@gmail.com'
  const fromEmail = process.env.FROM_EMAIL || 'leads@marutilanddevelopers.com'

  // 1. Admin notification
  await getResend().emails.send({
    from: `Maruti Developers Leads <${fromEmail}>`,
    to: [adminEmail],
    subject: `🔔 New Lead: ${data.name} — ${data.source.toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C160C;color:#f0fdf4;padding:32px;border-radius:16px">
        <div style="background:#16a34a;color:white;padding:4px 12px;border-radius:99px;font-size:12px;font-weight:700;display:inline-block;margin-bottom:20px;text-transform:uppercase">${data.source} Lead</div>
        <h2 style="font-size:24px;font-weight:800;color:#22c55e;margin:0 0 24px">New Lead from Maruti Developers Website</h2>
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Name', data.name],
            ['WhatsApp', `+91${data.whatsapp}`],
            ['Email', data.email || '—'],
            ['Industry', data.industry || '—'],
            ['Preferred State', data.preferred_state || '—'],
            ['Budget', data.budget || '—'],
            ['Source', data.source],
            ['Message', data.message || '—'],
          ].map(([k, v]) => `
            <tr>
              <td style="padding:10px 16px;background:#1A2E1A;color:#4b7c55;font-size:12px;text-transform:uppercase;width:35%;border-bottom:1px solid #0C160C">${k}</td>
              <td style="padding:10px 16px;background:#1A2E1A;color:#f0fdf4;font-size:14px;border-bottom:1px solid #0C160C">${v}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:24px;display:flex;gap:12px">
          <a href="https://wa.me/91${data.whatsapp}?text=${encodeURIComponent(`Hi ${data.name}, this is Vinod from Maruti Developers. I got your enquiry. Let me share some property options for you.`)}" 
             style="background:#25D366;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px">
            Open WhatsApp
          </a>
          <a href="mailto:${data.email}" 
             style="background:#1A2E1A;color:#22c55e;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;border:1px solid #22c55e44">
            Send Email
          </a>
        </div>
        <p style="color:#4b7c55;font-size:12px;margin-top:24px">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    `,
  })

  // 2. Lead confirmation (if email provided)
  if (data.email) {
    await getResend().emails.send({
      from: `Vinod Jaiswal — Maruti Developers <${fromEmail}>`,
      to: [data.email],
      subject: `We've received your enquiry — Maruti Developers`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
          <h2 style="color:#16a34a">Hi ${data.name},</h2>
          <p style="color:#374151;line-height:1.6">Thank you for reaching out to Maruti Developers. We've received your enquiry and our senior advisor will reach you on WhatsApp (+91${data.whatsapp}) within 2 hours with a verified property shortlist.</p>
          <p style="color:#374151;line-height:1.6">If you'd like to reach us directly:</p>
          <ul style="color:#374151">
            <li>📱 Call: <a href="tel:+919898610678">+91 98986 10678</a></li>
            <li>💬 WhatsApp: <a href="https://wa.me/919898610678">wa.me/919898610678</a></li>
            <li>✉️ Email: <a href="mailto:marutideveloper78@gmail.com">marutideveloper78@gmail.com</a></li>
          </ul>
          <p style="color:#6b7280;font-size:12px;margin-top:24px">Maruti Developers · Vadodara, Gujarat · Since 1998</p>
        </div>
      `,
    })
  }
}

// GET — admin only
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdminClient()
  const { searchParams } = new URL(req.url)

  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)
  if (source) query = query.eq('source', source)

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ leads: data, total: count })
}
