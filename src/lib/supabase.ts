import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// Client-side Supabase client (for use in Client Components)
export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

// Server-side admin client (for API routes — bypasses RLS)
export const createSupabaseAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.warn('Supabase Admin Client: Missing URL or Service Role Key. Operations will fail.')
    // Return a dummy client that will fail gracefully instead of crashing during init
    return createClient('https://placeholder-url.supabase.co', 'placeholder-key')
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

// Type definitions
export interface Lead {
  id: string
  created_at: string
  name: string
  whatsapp: string
  email?: string
  industry?: string
  preferred_state?: string
  budget?: string
  message?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'site_visit' | 'closed' | 'lost'
  notes?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface Property {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  description?: string
  type: 'industrial_land' | 'warehouse' | 'commercial' | 'shed' | 'agricultural' | 'office'
  transaction: 'sale' | 'lease' | 'rent'
  state: string
  city: string
  area_name?: string
  size_sqft?: number
  size_acres?: number
  price?: number
  price_per_sqft?: number
  rent_per_month?: number
  price_negotiable?: boolean
  price_on_request?: boolean
  estate_name?: string
  pollution_cat?: 'red' | 'orange' | 'green' | 'NA'
  road_width?: number
  power_available?: number
  railway_siding?: boolean
  latitude?: number
  longitude?: number
  images: Array<{ url: string; alt?: string; primary?: boolean }>
  features: string[]
  status: 'active' | 'sold' | 'leased' | 'draft' | 'pending'
  featured: boolean
  verified: boolean
  view_count: number
  rera_number?: string
  meta_title?: string
  meta_description?: string
}

export interface BlogPost {
  id: string
  created_at: string
  published_at?: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image?: string
  author_name: string
  author_title?: string
  tags: string[]
  category?: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  view_count: number
  read_time: number
  meta_title?: string
  meta_description?: string
}

export const STATES = [
  'Gujarat', 'Maharashtra', 'Rajasthan', 'Tamil Nadu',
  'Karnataka', 'Telangana', 'Andhra Pradesh', 'Haryana',
  'Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'West Bengal',
  'Odisha', 'Kerala', 'Delhi'
]

export const PROPERTY_TYPES = [
  { value: 'industrial_land', label: 'Industrial Land' },
  { value: 'warehouse', label: 'Warehouse / Godown' },
  { value: 'shed', label: 'Industrial Shed' },
  { value: 'commercial', label: 'Commercial Property' },
  { value: 'agricultural', label: 'Agricultural Land' },
  { value: 'office', label: 'Office Space' },
]

export const INDUSTRIES = [
  'Pharmaceuticals', 'Chemicals', 'Engineering / Auto Components',
  'Textiles', 'Food Processing', 'Electronics / IT', 'Logistics / Warehousing',
  'Plastics / Polymers', 'Packaging', 'FMCG', 'Steel / Metal',
  'Solar / Renewable Energy', 'Other Manufacturing', 'Investment / Portfolio'
]
