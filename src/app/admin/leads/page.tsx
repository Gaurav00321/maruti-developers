'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, Phone, Search, Download, 
  Filter, Clock, ChevronDown, User, 
  Mail, MapPin, Building2, Wallet, 
  ExternalLink, MoreHorizontal, CheckCircle2
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const STATUSES = ['new', 'contacted', 'qualified', 'site_visit', 'closed', 'lost']
const SOURCES = ['popup', 'hero', 'contact', 'footer', 'property', 'website']

const STATUS_THEME: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: '#FFF1F0', text: '#E01B2F', dot: '#E01B2F' },
  contacted: { bg: '#E6F4FF', text: '#0958D9', dot: '#0958D9' },
  qualified: { bg: '#F6FFED', text: '#389E0D', dot: '#389E0D' },
  site_visit: { bg: '#F9F0FF', text: '#531DAB', dot: '#531DAB' },
  closed: { bg: '#F6FFED', text: '#389E0D', dot: '#389E0D' },
  lost: { bg: '#F5F5F5', text: '#8C8C8C', dot: '#8C8C8C' },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (sourceFilter) params.set('source', sourceFilter)
    params.set('limit', '100')
    const res = await fetch(`/api/leads?${params}`)
    const data = await res.json()
    setLeads(data.leads || [])
    setTotal(data.total || 0)
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [statusFilter, sourceFilter])

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    } catch (err) {
      console.error('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const exportCSV = () => {
    const headers = ['Name', 'WhatsApp', 'Email', 'Industry', 'State', 'Budget', 'Source', 'Status', 'Created At']
    const rows = leads.map(l => [l.name, `+91${l.whatsapp?.replace(/\D/g, '')}`, l.email || '', l.industry || '', l.preferred_state || '', l.budget || '', l.source, l.status, l.created_at])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `maruti-leads-${new Date().toISOString().split('T')[0]}.csv`; a.click()
  }

  const filtered = leads.filter(l =>
    !search || 
    l.name?.toLowerCase().includes(search.toLowerCase()) || 
    l.whatsapp?.includes(search) ||
    l.industry?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Leads</h1>
          <p className="text-[#86868B] text-base mt-1 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#E8720C]" />
             {total} records synchronizing from cloud
          </p>
        </div>
        <button 
          onClick={exportCSV} 
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#E8E8ED] bg-white text-[#1D1D1F] font-bold text-sm hover:bg-[#F5F5F7] transition-all shadow-sm"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, whatsapp, or industry..."
              className="w-full bg-[#F5F5F7] border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#E8720C]/20 transition-all text-[#1D1D1F]"
            />
          </div>
          <div className="flex gap-2 min-w-fit">
             <select 
               value={statusFilter} 
               onChange={e => setStatusFilter(e.target.value)}
               className="bg-[#F5F5F7] border-none text-[#1D1D1F] font-bold text-xs rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#E8720C]/20 appearance-none cursor-pointer pr-10 relative"
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2386868B\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
             >
                <option value="">All Statuses</option>
                {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
             </select>
             <select 
               value={sourceFilter} 
               onChange={e => setSourceFilter(e.target.value)}
               className="bg-[#F5F5F7] border-none text-[#1D1D1F] font-bold text-xs rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#E8720C]/20 appearance-none cursor-pointer pr-10 relative"
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2386868B\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
             >
                <option value="">All Sources</option>
                {SOURCES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
             </select>
          </div>
        </div>

        {/* Status Quick Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F5F5F7]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest self-center mr-2">Quick Filter:</span>
          {STATUSES.map(s => {
             const active = statusFilter === s
             const theme = STATUS_THEME[s] || { bg: '#F5F5F7', text: '#86868B', dot: '#86868B' }
             return (
               <button
                 key={s}
                 onClick={() => setStatusFilter(active ? '' : s)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 capitalize ${
                    active ? 'shadow-sm' : 'border-transparent bg-[#F5F5F7] text-[#86868B] hover:bg-[#E8E8ED]'
                 }`}
                 style={active ? { backgroundColor: theme.bg, color: theme.text, borderColor: `${theme.text}20` } : {}}
               >
                 <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.dot }} />
                 {s}
               </button>
             )
          })}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-[#E8E8ED] rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FBFBFD]">
                <th className="text-left px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest border-b border-[#F5F5F7]">Lead Info</th>
                <th className="text-left px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest border-b border-[#F5F5F7]">Engagement</th>
                <th className="text-left px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest border-b border-[#F5F5F7]">Requirements</th>
                <th className="text-left px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest border-b border-[#F5F5F7]">Status & Flow</th>
                <th className="text-right px-8 py-5 text-[11px] font-bold text-[#86868B] uppercase tracking-widest border-b border-[#F5F5F7]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F7]">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-8 py-6"><div className="h-10 bg-[#F5F5F7] rounded-2xl animate-pulse" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center text-[#86868B] font-medium">No records matching your search queries.</td></tr>
              ) : filtered.map(lead => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-[#FBFBFD] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center font-bold text-[#1D1D1F] text-sm tracking-tighter shadow-inner">
                        {lead.name?.charAt(0) || 'L'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1D1D1F] mb-0.5">{lead.name}</div>
                        {lead.email && <div className="text-xs text-[#86868B] font-medium flex items-center gap-1.5"><Mail size={12} /> {lead.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <a 
                        href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is Vinod from Maruti Developers. I have some factory plots that fit your requirement. Can we talk?`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-sm font-bold text-[#1D1D1F] hover:text-[#25D366] transition-all flex items-center gap-2 group/wa"
                      >
                         <MessageCircle size={14} className="text-[#25D366]" /> {lead.whatsapp}
                      </a>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#F5F5F7] text-[#86868B] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#E8E8ED]">{lead.source}</span>
                        <span className="text-[10px] text-[#86868B] font-bold flex items-center gap-1"><Clock size={10} /> {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#86868B]" />
                        <span className="text-xs font-bold text-[#1D1D1F]">{lead.preferred_state || 'Any Location'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-[#86868B]" />
                        <span className="text-[11px] font-medium text-[#86868B] truncate max-w-[150px]">{lead.industry || 'General Industrial'}</span>
                      </div>
                      {lead.budget && (
                        <div className="flex items-center gap-2">
                          <Wallet size={12} className="text-[#86868B]" />
                          <span className="text-[11px] font-medium text-[#86868B]">{lead.budget}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative inline-block w-40">
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        disabled={updatingId === lead.id}
                        className="w-full text-xs font-bold rounded-xl px-4 py-2.5 appearance-none cursor-pointer focus:ring-2 focus:ring-[#E8720C]/20 transition-all border border-transparent shadow-sm capitalize"
                        style={{ 
                          backgroundColor: STATUS_THEME[lead.status]?.bg || '#F5F5F7', 
                          color: STATUS_THEME[lead.status]?.text || '#1D1D1F',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2386868B\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          backgroundSize: '14px'
                        }}
                      >
                        {STATUSES.map(s => <option key={s} value={s} className="bg-white text-[#1D1D1F]">{s}</option>)}
                      </select>
                      {updatingId === lead.id && (
                         <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl"><div className="w-4 h-4 border-2 border-[#E8720C] border-t-transparent rounded-full animate-spin" /></div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <a href={`tel:${lead.whatsapp}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:scale-110 active:scale-95 transition-all">
                        <Phone size={16} />
                      </a>
                      <a 
                        href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-50 text-green-600 hover:scale-110 active:scale-95 transition-all"
                      >
                        <MessageCircle size={16} />
                      </a>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
