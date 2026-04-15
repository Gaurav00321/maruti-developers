import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const supabase = createSupabaseAdminClient()

  const state = searchParams.getAll('state')
  const type = searchParams.get('type')
  const transaction = searchParams.get('transaction')
  const priceMin = searchParams.get('price_min')
  const priceMax = searchParams.get('price_max')
  const sizeMin = searchParams.get('size_min')
  const sizeMax = searchParams.get('size_max')
  const estate = searchParams.get('estate')
  const pollutionCat = searchParams.getAll('pollution_cat')
  const railwaySiding = searchParams.get('railway_siding')
  const featured = searchParams.get('featured')
  const status = searchParams.get('status') || 'active'
  const sortBy = searchParams.get('sort') || 'created_at'
  const sortOrder = searchParams.get('order') === 'asc'
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '12')

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('status', status)

  if (state.length > 0) query = query.in('state', state)
  if (type) query = query.eq('type', type)
  if (transaction) query = query.eq('transaction', transaction)
  if (priceMin) query = query.gte('price', parseInt(priceMin))
  if (priceMax) query = query.lte('price', parseInt(priceMax))
  if (sizeMin) query = query.gte('size_sqft', parseInt(sizeMin))
  if (sizeMax) query = query.lte('size_sqft', parseInt(sizeMax))
  if (estate) query = query.ilike('estate_name', `%${estate}%`)
  const city = searchParams.get('city')
  if (city) query = query.ilike('city', `%${city}%`)
  if (pollutionCat.length > 0) query = query.in('pollution_cat', pollutionCat)
  if (railwaySiding === 'true') query = query.eq('railway_siding', true)
  if (featured === 'true') query = query.eq('featured', true)

  query = query
    .order(sortBy, { ascending: sortOrder })
    .range(page * limit, (page + 1) * limit - 1)

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    properties: data,
    total: count,
    page,
    pages: Math.ceil((count || 0) / limit),
  })
}

export async function POST(req: NextRequest) {
  // Auth check would go here in production
  const supabase = createSupabaseAdminClient()
  const body = await req.json()

  // Generate slug
  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    + '-' + Date.now()

  const { data, error } = await supabase
    .from('properties')
    .insert({ ...body, slug })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
