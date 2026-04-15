import { MetadataRoute } from 'next'
import { createSupabaseAdminClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marutilanddevelopers.com'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/properties`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/coverage`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return staticRoutes
  }

  try {
    const supabase = createSupabaseAdminClient()

    // Dynamic property routes
    const { data: properties } = await supabase
      .from('properties')
      .select('slug, updated_at')
      .eq('status', 'active')

    const propertyRoutes: MetadataRoute.Sitemap = (properties || []).map(p => ({
      url: `${baseUrl}/properties/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // Dynamic blog routes
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('status', 'published')

    const blogRoutes: MetadataRoute.Sitemap = (posts || []).map(p => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...propertyRoutes, ...blogRoutes]
  } catch (error) {
    console.warn('Sitemap generation failed for dynamic routes', error)
    return staticRoutes
  }
}
