import { createSupabaseAdminClient } from '@/lib/supabase'
import { FeaturedProperties } from './HomeSections'

async function getFeaturedProperties() {
  try {
    const supabase = createSupabaseAdminClient()
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .limit(4)
    return data || []
  } catch (error) {
    console.error('FeaturedPropertiesList: Fetch failed', error)
    return []
  }
}

export default async function FeaturedPropertiesList() {
  const properties = await getFeaturedProperties()
  return <FeaturedProperties properties={properties} />
}
