'use client'
import { motion } from 'framer-motion'
import { 
  Users, Building2, FileText, TrendingUp, MessageCircle, 
  Phone, Plus, ArrowRight, Clock, MapPin, 
  Calendar, ChevronRight
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const STATUS_COLORS: Record<string, string> = {
  new: '#E8720C', // Orange for new
  contacted: '#3b82f6', // Blue
  qualified: '#10b981', // Green
  site_visit: '#8b5cf6', // Purple
  closed: '#059669', // Dark Green
  lost: '#ef4444', // Red
}

const CHART_COLORS = ['#E8720C', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']

interface DashboardData {
  stats: { totalLeads: number; todayLeads: number; weekLeads: number; newLeads: number; activeProperties: number; publishedPosts: number }
  recentLeads: any[]
  leadsBySource: any[]
  leadsByState: any[]
}

function countBy(arr: any[], key: string) {
  const counts: Record<string, number> = {}
  arr.forEach(item => {
    const val = item[key] || 'Unknown'
    counts[val] = (counts[val] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export function AdminDashboardClient({ data }: { data: DashboardData }) {
  const { stats, recentLeads, leadsBySource, leadsByState } = data
  const sourceData = countBy(leadsBySource, 'source')
  const stateData = countBy(leadsByState, 'preferred_state').slice(0, 6)

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: '#E8720C', sub: `${stats.weekLeads} this week` },
    { label: 'New Enquiries', value: stats.newLeads, icon: TrendingUp, color: '#10b981', sub: `${stats.todayLeads} today`, urgent: stats.newLeads > 0 },
    { label: 'Properties', value: stats.activeProperties, icon: Building2, color: '#3b82f6', sub: 'Live listings' },
    { label: 'Articles', value: stats.publishedPosts, icon: FileText, color: '#8b5cf6', sub: 'Insights' },
  ]

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Overview</h1>
          <p className="text-[#86868B] text-base mt-1 flex items-center gap-2">
            Welcome back, Vinod. Here's what's happening at Maruti Developers.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Link 
            href="/admin/properties/new" 
            className="btn-orange px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#E8720C]/10"
          >
            <Plus size={18} /> Add Property
          </Link>
          <Link 
            href="/admin/blog/new" 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#E8E8ED] bg-white text-[#1D1D1F] font-bold text-sm hover:bg-[#F5F5F7] transition-all"
          >
            <Plus size={18} /> New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-[#E8E8ED] rounded-[32px] p-7 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300" 
                     style={{ backgroundColor: `${card.color}10` }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                {card.urgent && (
                  <span className="flex items-center gap-1.5 bg-[#FFF1F0] text-[#E01B2F] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E01B2F] animate-pulse" /> Urgent
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-[#1D1D1F] tracking-tight">{card.value.toLocaleString()}</div>
                <div className="text-[#1D1D1F] font-bold text-sm tracking-tight">{card.label}</div>
                <div className="text-[#86868B] text-xs font-medium">{card.sub}</div>
              </div>
            </div>
            {/* Background design elements */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#F5F5F7] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lead Sources */}
        <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 lg:col-span-1 shadow-sm">
           <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Lead Sources</h3>
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest bg-[#F5F5F7] px-3 py-1 rounded-full">Real-time</span>
          </div>
          
          <div className="h-48 w-full relative">
            {sourceData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie 
                   data={sourceData} 
                   dataKey="value" 
                   nameKey="name" 
                   cx="50%" 
                   cy="50%" 
                   outerRadius={80} 
                   innerRadius={55}
                   paddingAngle={4}
                 >
                   {sourceData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />)}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ background: 'white', border: '1px solid #E8E8ED', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', padding: '8px 12px' }} 
                   itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                 />
               </PieChart>
             </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#86868B] text-sm italic font-medium">No enquiry data yet</div>
            )}
          </div>

          <div className="mt-8 space-y-3">
             {sourceData.map((s, i) => (
              <div key={s.name} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#E8720C] transition-colors capitalize">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-12 bg-[#F5F5F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E8720C]/20" style={{ width: `${(s.value / stats.totalLeads) * 100}%` }} />
                   </div>
                   <span className="text-xs font-bold text-[#86868B] font-mono">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Distriution */}
        <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 lg:col-span-1 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Preferred States</h3>
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest bg-[#F5F5F7] px-3 py-1 rounded-full">Top 6</span>
          </div>

          <div className="flex-1 min-h-[250px] w-full">
            {stateData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
               <BarChart data={stateData} layout="vertical" margin={{ left: -10, right: 20 }}>
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={90} tick={{ fill: '#86868B', fontSize: 13, fontWeight: 'bold', fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
                 <Tooltip 
                   cursor={{ fill: '#F5F5F7' }}
                   contentStyle={{ background: 'white', border: '1px solid #E8E8ED', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }} 
                 />
                 <Bar dataKey="value" fill="#E8720C" radius={[0, 8, 8, 0]} barSize={24} />
               </BarChart>
             </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#86868B] text-sm italic font-medium">Data will appear here</div>
            )}
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 lg:col-span-1 shadow-sm">
           <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight mb-8">Quick Actions</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'View All Leads', href: '/admin/leads', icon: Users, color: '#E8720C' },
                { label: 'Upload Property', href: '/admin/properties/new', icon: Building2, color: '#3b82f6' },
                { label: 'Recent Articles', href: '/admin/blog', icon: FileText, color: '#8b5cf6' },
                { label: 'WhatsApp Admin', href: 'https://wa.me/919898610678', icon: MessageCircle, color: '#25D366', external: true },
              ].map(action => (
                <Link
                  key={action.label}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  className="flex items-center gap-4 p-4 rounded-2x border border-transparent hover:border-[#E8E8ED] hover:bg-[#F5F5F7]/30 rounded-2xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105" 
                       style={{ backgroundColor: `${action.color}10` }}>
                    <action.icon size={18} style={{ color: action.color }} />
                  </div>
                  <span className="text-sm font-bold text-[#1D1D1F] group-hover:translate-x-0.5 transition-transform">{action.label}</span>
                  <ChevronRight size={14} className="ml-auto text-[#E8E8ED] group-hover:text-[#86868B] transition-colors" />
                </Link>
              ))}
           </div>

           <div className="mt-8 p-6 bg-[#F5F5F7] rounded-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#E8720C]" />
                <span className="text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider">Advisor Tip</span>
              </div>
              <p className="text-xs text-[#86868B] font-medium leading-relaxed">
                Respond to new leads within <span className="text-[#1D1D1F] font-bold">15 minutes</span> for +65% higher conversion. Use the direct WhatsApp button for immediate contact.
              </p>
           </div>
        </div>
      </div>

      {/* Recent Leads Table Section */}
      <div className="bg-white border border-[#E8E8ED] rounded-[32px] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-8 border-b border-[#F5F5F7]">
          <div>
            <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Recent Enquiries</h3>
            <p className="text-[#86868B] text-xs font-medium mt-1">Real-time leads from your landing pages.</p>
          </div>
          <Link href="/admin/leads" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs font-bold hover:bg-[#E8E8ED] transition-all">
            View List <ChevronRight size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#FBFBFD]">
                {['Advisor Info', 'Lead Data', 'Source', 'Status', 'Received', ''].map(h => (
                  <th key={h} className="text-left px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F7]">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="max-w-[180px] mx-auto opacity-40">
                      <Users size={40} className="mx-auto mb-4 text-[#86868B]" />
                      <p className="text-sm font-bold text-[#1D1D1F]">No leads yet</p>
                      <p className="text-xs text-[#86868B] mt-1 font-medium leading-relaxed">Leads will appear here as soon as visitors submit a form.</p>
                    </div>
                  </td>
                </tr>
              ) : recentLeads.map(lead => (
                <tr key={lead.id} className="group hover:bg-[#FBFBFD] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center font-bold text-[#1D1D1F] text-sm group-hover:scale-110 transition-transform">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1D1D1F] mb-0.5">{lead.name}</div>
                        <div className="text-xs text-[#86868B] font-medium flex items-center gap-1">
                          <MapPin size={10} /> {lead.preferred_state || 'Any State'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <a 
                        href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
                        target="_blank" 
                        className="text-sm font-bold text-[#1D1D1F] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                      >
                         {lead.whatsapp}
                      </a>
                      <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">{lead.industry || 'Unknown Sector'}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 bg-[#F5F5F7] text-[#1D1D1F] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#E8E8ED]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[lead.status] || '#86868B' }} />
                      <span className="text-xs font-bold text-[#1D1D1F] capitalize">{lead.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs text-[#86868B] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`tel:${lead.whatsapp}`} className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
                        <Phone size={14} />
                      </a>
                      <a href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} target="_blank" className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:scale-110 transition-transform">
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
