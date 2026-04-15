export const dynamic = 'force-dynamic'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { AdminDashboardClient } from './DashboardClient'

async function getDashboardData() {
  const supabase = createSupabaseAdminClient()
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { count: totalLeads },
    { count: todayLeads },
    { count: weekLeads },
    { count: newLeads },
    { count: activeProperties },
    { count: publishedPosts },
    { data: recentLeads },
    { data: leadsBySource },
    { data: leadsByState },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8),
    supabase.from('leads').select('source').gte('created_at', monthStart),
    supabase.from('leads').select('preferred_state').gte('created_at', monthStart).not('preferred_state', 'is', null),
  ])

  return {
    stats: {
      totalLeads: totalLeads || 0,
      todayLeads: todayLeads || 0,
      weekLeads: weekLeads || 0,
      newLeads: newLeads || 0,
      activeProperties: activeProperties || 0,
      publishedPosts: publishedPosts || 0,
    },
    recentLeads: recentLeads || [],
    leadsBySource: leadsBySource || [],
    leadsByState: leadsByState || [],
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()
  return <AdminDashboardClient data={data} />
}
