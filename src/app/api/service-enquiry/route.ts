import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseAdminClient } from '@/lib/supabase'

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit number required'),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().min(1, 'Service required'),
  city: z.string().optional(),
  message: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const supabase = createSupabaseAdminClient()

    // Insert into service_enquiries table
    const { data: enquiry, error } = await supabase
      .from('service_enquiries')
      .insert({
        name: data.name,
        phone: `+91${data.phone}`,
        email: data.email || null,
        service: data.service,
        city: data.city || null,
        message: data.message || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      // If table doesn't exist, insert into leads table as fallback
      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          whatsapp: `+91${data.phone}`,
          email: data.email || null,
          message: `[Service: ${data.service}] ${data.city ? `City: ${data.city}. ` : ''}${data.message || ''}`,
          source: 'service',
          preferred_state: data.city || null,
        })
        .select()
        .single()

      if (leadError) throw leadError

      // Send WhatsApp notification to admin
      sendWhatsAppNotification(data).catch(console.error)

      return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
    }

    // Send WhatsApp notification to admin
    sendWhatsAppNotification(data).catch(console.error)

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    console.error('Service enquiry error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendWhatsAppNotification(data: z.infer<typeof schema>) {
  const adminPhone = process.env.ADMIN_WHATSAPP || '919898610678'
  const message = encodeURIComponent(
    `🔔 New Service Enquiry!\n\n` +
    `👤 Name: ${data.name}\n` +
    `📱 Phone: +91${data.phone}\n` +
    `${data.email ? `✉️ Email: ${data.email}\n` : ''}` +
    `🏢 Service: ${data.service}\n` +
    `${data.city ? `📍 City: ${data.city}\n` : ''}` +
    `${data.message ? `💬 Message: ${data.message}\n` : ''}` +
    `\n⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`
  )

  // Use WhatsApp Business API if configured, otherwise use wa.me link
  const waApiUrl = process.env.WHATSAPP_API_URL
  const waApiToken = process.env.WHATSAPP_API_TOKEN

  if (waApiUrl && waApiToken) {
    try {
      await fetch(waApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${waApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: adminPhone,
          type: 'text',
          text: { body: decodeURIComponent(message) },
        }),
      })
    } catch (e) {
      console.error('WhatsApp API notification failed:', e)
    }
  }
  // If no API configured, the admin will see enquiries in the admin panel
}

// GET — fetch service enquiries for admin panel
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdminClient()

  // Try service_enquiries table first, fallback to leads with service source
  const { data, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .eq('source', 'service')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ enquiries: data })
}
