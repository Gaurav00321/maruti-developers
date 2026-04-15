import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdminClient()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')
  const featured = searchParams.get('featured')

  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status && status !== 'all') query = query.eq('status', status)
  else if (!status) query = query.eq('status', 'published') // default public
  if (featured === 'true') query = query.eq('featured', true)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data, total: count })
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseAdminClient()
  const body = await req.json()

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    + '-' + Date.now()

  const wordCount = (body.content || '').replace(/<[^>]+>/g, '').split(' ').length
  const readTime = Math.max(1, Math.ceil(wordCount / 250))

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      ...body,
      slug,
      read_time: readTime,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
