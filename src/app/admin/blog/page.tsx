'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Plus, Edit2, Eye, FileText, Clock, 
  Star, Search, Trash2, ChevronRight, 
  BarChart3, Image as ImageIcon, Calendar
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, formatDistanceToNow } from 'date-fns'

const STATUS_THEME: Record<string, { bg: string; text: string; dot: string }> = {
  published: { bg: '#F6FFED', text: '#389E0D', dot: '#389E0D' },
  draft: { bg: '#F5F5F5', text: '#8C8C8C', dot: '#8C8C8C' },
  archived: { bg: '#FFF1F0', text: '#E01B2F', dot: '#E01B2F' },
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchPosts = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    params.set('limit', '100')
    const res = await fetch(`/api/blog?${params}`)
    const data = await res.json()
    setPosts(data.posts || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [statusFilter])

  const filtered = posts.filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Articles</h1>
          <p className="text-[#86868B] text-base mt-1 flex items-center gap-2">
            Build authority with industrial real estate insights.
          </p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="btn-orange px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#E8720C]/10"
        >
          <Plus size={18} /> New Article
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <input
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full bg-[#F5F5F7] border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#E8720C]/20 transition-all text-[#1D1D1F]"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'published', 'draft', 'archived'].map(s => {
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

      {/* Listing */}
      {loading ? (
        <div className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-[#E8E8ED] rounded-[32px] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E8E8ED] rounded-[32px] py-32 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#F5F5F7] flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-[#86868B]/40" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-2 tracking-tight">No articles yet</h3>
            <p className="text-[#86868B] text-sm mb-8 leading-relaxed font-medium">Content is king in real estate. Start writing your first industry guide today.</p>
            <Link href="/admin/blog/new" className="btn-orange inline-flex px-8">
              <Plus size={18} className="mr-2" /> Write First Post
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-white border border-[#E8E8ED] rounded-[32px] p-6 pr-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Thumb */}
                <div className="w-20 h-20 rounded-2xl bg-[#F5F5F7] flex-shrink-0 overflow-hidden relative">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={24} className="text-[#86868B]/30" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      {post.category && (
                        <span className="text-[10px] font-bold text-[#E8720C] uppercase tracking-[0.1em] px-2.5 py-1 bg-[#E8720C]/5 rounded-md border border-[#E8720C]/10">
                          {post.category}
                        </span>
                      )}
                      {post.featured && <Star size={14} className="text-[#f59e0b] fill-[#f59e0b]" />}
                    </div>
                    <h3 className="text-base font-bold text-[#1D1D1F] line-clamp-1 mb-1 group-hover:text-[#E8720C] transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-[#86868B] font-medium">
                       <span className="flex items-center gap-1.5"><Clock size={12} /> {post.read_time} min read</span>
                       <span className="flex items-center gap-1.5"><BarChart3 size={12} /> {post.view_count || 0} views</span>
                       <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.published_at ? format(new Date(post.published_at), 'MMM d') : 'Draft'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span 
                      className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                      style={{ 
                        backgroundColor: STATUS_THEME[post.status]?.bg || '#F5F5F7', 
                        color: STATUS_THEME[post.status]?.text || '#1D1D1F',
                        borderColor: `${STATUS_THEME[post.status]?.text}20` 
                      }}
                    >
                      {post.status}
                    </span>

                    <div className="flex items-center gap-2">
                       {post.status === 'published' && (
                         <Link 
                           href={`/blog/${post.slug}`} 
                           target="_blank"
                           className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#86868B] flex items-center justify-center hover:bg-[#1D1D1F] hover:text-white transition-all"
                         >
                           <Eye size={18} />
                         </Link>
                       )}
                       <Link 
                        href={`/admin/blog/${post.id}/edit`}
                        className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#86868B] flex items-center justify-center hover:bg-[#E8720C] hover:text-white transition-all"
                       >
                         <Edit2 size={18} />
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
