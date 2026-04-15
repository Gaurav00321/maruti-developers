'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Plus, Edit2, Eye, Building2, MapPin, 
  Trash2, Star, Search, Filter, 
  ChevronRight, ArrowUpRight, BarChart3,
  Image as ImageIcon, Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

function formatPrice(price?: number) {
  if (!price) return 'POR'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`
  return `₹${(price / 1000).toFixed(0)}K`
}

const STATUS_THEME: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: '#F6FFED', text: '#389E0D', dot: '#389E0D' },
  draft: { bg: '#F5F5F5', text: '#8C8C8C', dot: '#8C8C8C' },
  sold: { bg: '#FFF1F0', text: '#E01B2F', dot: '#E01B2F' },
  leased: { bg: '#E6F4FF', text: '#0958D9', dot: '#0958D9' },
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchProperties = async () => {
    setLoading(true)
    const params = statusFilter !== 'all' ? `?status=${statusFilter}&limit=100` : '?limit=100'
    const res = await fetch(`/api/properties${params}`)
    const data = await res.json()
    setProperties(data.properties || [])
    setLoading(false)
  }

  useEffect(() => { fetchProperties() }, [statusFilter])

  const filtered = properties.filter(p =>
    !search || 
    p.title?.toLowerCase().includes(search.toLowerCase()) || 
    p.city?.toLowerCase().includes(search.toLowerCase()) ||
    p.estate_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Properties</h1>
          <p className="text-[#86868B] text-base mt-1 flex items-center gap-2">
            Manage your industrial and commercial listings.
          </p>
        </div>
        <Link 
          href="/admin/properties/new" 
          className="btn-orange px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#E8720C]/10"
        >
          <Plus size={18} /> Add Property
        </Link>
      </div>

      {/* Top Bar with Search & Filters */}
      <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <input
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, city or estate name..."
            className="w-full bg-[#F5F5F7] border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#E8720C]/20 transition-all text-[#1D1D1F]"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'active', 'draft', 'sold', 'leased'].map(s => {
            const active = statusFilter === s
            return (
              <button 
                key={s} 
                onClick={() => setStatusFilter(s)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border capitalize ${
                  active 
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]' 
                    : 'bg-white text-[#86868B] border-[#E8E8ED] hover:bg-[#F5F5F7]'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white border border-[#E8E8ED] rounded-[32px] p-4 h-64 animate-pulse">
               <div className="h-40 bg-[#F5F5F7] rounded-2xl mb-4" />
               <div className="h-4 bg-[#F5F5F7] rounded-full w-2/3 mb-2" />
               <div className="h-3 bg-[#F5F5F7] rounded-full w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E8E8ED] rounded-[32px] py-32 text-center shadow-sm">
          <div className="max-w-xs mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#F5F5F7] flex items-center justify-center mx-auto mb-6">
              <Building2 size={32} className="text-[#86868B]/40" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-2 tracking-tight">No properties found</h3>
            <p className="text-[#86868B] text-sm mb-8 leading-relaxed font-medium">Try adjusting your filters or search terms to find what you're looking for.</p>
            <Link href="/admin/properties/new" className="btn-orange inline-flex px-8">
              <Plus size={18} className="mr-2" /> Add New Listing
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-white border border-[#E8E8ED] rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all group relative"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F7] mb-5">
                   {p.images?.[0]?.url ? (
                    <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={32} className="text-[#86868B]/20" />
                    </div>
                  )}
                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span 
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm border"
                      style={{ 
                        backgroundColor: `${STATUS_THEME[p.status]?.bg}dd` || '#ffffffdd', 
                        color: STATUS_THEME[p.status]?.text || '#1D1D1F',
                        borderColor: `${STATUS_THEME[p.status]?.text}20` 
                      }}
                    >
                      {p.status}
                    </span>
                    {p.featured && (
                      <span className="bg-white/90 backdrop-blur-md text-[#E8720C] p-1.5 rounded-full shadow-sm">
                        <Star size={12} fill="currentColor" />
                      </span>
                    )}
                  </div>
                  {/* View count indicator */}
                  <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <BarChart3 size={10} /> {p.view_count || 0}
                  </div>
                </div>

                {/* Content */}
                <div className="px-1 space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#1D1D1F] line-clamp-1 group-hover:text-[#E8720C] transition-colors">{p.title}</h3>
                      <span className="text-xs font-bold text-[#E8720C] flex-shrink-0">{formatPrice(p.price)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-medium">
                      <MapPin size={12} />
                      <span className="truncate">{p.city}, {p.state}</span>
                    </div>
                  </div>

                  {/* Meta Grid */}
                  <div className="flex items-center gap-4 py-3 border-y border-[#F5F5F7]">
                    <div className="space-y-0.5">
                       <span className="block text-[10px] text-[#86868B] uppercase font-bold tracking-tight">Size</span>
                       <span className="block text-[11px] text-[#1D1D1F] font-bold tracking-tight">{p.size_sqft?.toLocaleString()} sqft</span>
                    </div>
                    <div className="w-px h-6 bg-[#F5F5F7]" />
                    <div className="space-y-0.5 min-w-0">
                       <span className="block text-[10px] text-[#86868B] uppercase font-bold tracking-tight">Zone</span>
                       <span className="block text-[11px] text-[#1D1D1F] font-bold tracking-tight truncate capitalize">{p.type.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#86868B] font-bold flex items-center gap-1">
                       <Clock size={10} /> {formatDistanceToNow(new Date(p.created_at), { addSuffix: true })}
                    </span>
                    <div className="flex items-center gap-2">
                       <Link 
                        href={`/properties/${p.slug}`} 
                        target="_blank"
                        className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#86868B] flex items-center justify-center hover:bg-[#1D1D1F] hover:text-white transition-all"
                       >
                         <ArrowUpRight size={14} />
                       </Link>
                       <Link 
                        href={`/admin/properties/${p.id}/edit`}
                        className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#86868B] flex items-center justify-center hover:bg-[#E8720C] hover:text-white transition-all"
                       >
                         <Edit2 size={14} />
                       </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
