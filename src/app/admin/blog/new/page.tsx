'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, Loader2, ArrowLeft, Eye, CheckCircle2, 
  Image as ImageIcon, Tag as TagIcon, X, 
  ChevronRight, Layout, Globe, Search,
  Edit3, Sparkles, FileText, Star
} from 'lucide-react'
import Link from 'next/link'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'write' | 'seo'>('write')

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: '',
    author_name: 'Vinod Jaiswal',
    author_title: 'Industrial Land Developer & Real Estate Advisor',
    status: 'draft',
    featured: false,
    meta_title: '',
    meta_description: '',
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (form.title) {
        localStorage.setItem('blog_draft', JSON.stringify({ ...form, tags }))
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [form, tags])

  useEffect(() => {
    const draft = localStorage.getItem('blog_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setForm(parsed)
        setTags(parsed.tags || [])
      } catch {}
    }
  }, [])

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  const save = async (status?: string) => {
    if (!form.title) { 
      alert('Your article needs a title to be saved.')
      return 
    }
    setSaving(true)
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tags, status: status || form.status }),
      })
      if (res.ok) {
        setSaved(true)
        localStorage.removeItem('blog_draft')
        setTimeout(() => router.push('/admin/blog'), 1500)
      }
    } catch (err) {
      console.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full bg-[#F5F5F7] border border-transparent rounded-2xl py-4 px-5 text-[#1D1D1F] text-sm font-medium focus:ring-2 focus:ring-[#E8720C]/20 focus:bg-white transition-all placeholder:text-[#86868B]/60 shadow-sm"
  const labelClass = "block text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 px-1"

  const categories = ['Buyer Guide', 'Legal Guide', 'NRI Guide', 'Market Intel', 'Due Diligence', 'State Guide', 'News & Updates']

  return (
    <div className="p-8 sm:p-10 max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/admin/blog" 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] hover:shadow-md transition-all shrink-0"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Create Article</h1>
            <p className="text-[#86868B] text-base mt-0.5 font-medium italic">Auto-sync active</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => save('draft')} 
            disabled={saving} 
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#E8E8ED] text-[#1D1D1F] font-bold text-sm hover:bg-[#F5F5F7] transition-all"
          >
            <Save size={18} /> Save Draft
          </button>
          <button 
            onClick={() => save('published')} 
            disabled={saving || saved} 
            className="btn-orange min-w-[160px] justify-center shadow-xl shadow-[#E8720C]/10 py-3.5"
          >
            {saving ? <><Loader2 size={18} className="animate-spin mr-2" /> Working...</> :
             saved ? <><CheckCircle2 size={18} className="mr-2" /> Live!</> :
             <><Sparkles size={18} className="mr-2" /> Publish Now</>}
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex gap-1.5 p-1 bg-[#F5F5F7] w-fit rounded-2xl border border-[#E8E8ED]">
        {(['write', 'seo'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-xl text-xs font-bold capitalize transition-all flex items-center gap-2 ${
              activeTab === tab ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            {tab === 'write' ? <Edit3 size={14} /> : <Search size={14} />}
            {tab === 'write' ? 'Content' : 'Optimization'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Editor Surface */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-[#E8E8ED] rounded-[40px] p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
             {/* Background design */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32" />

             {activeTab === 'write' ? (
              <div className="space-y-8 relative z-10">
                {/* Title */}
                <div className="space-y-2">
                  <label className={labelClass}>Article Title <span className="text-[#E8720C]">*</span></label>
                  <input
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="E.g. The Roadmap to Industrial Land Due Diligence in Gujarat"
                    className="w-full bg-transparent border-none p-0 text-[#1D1D1F] text-2xl sm:text-3xl font-bold placeholder:text-[#86868B]/30 focus:ring-0 transition-all font-display"
                  />
                  <div className="h-px bg-gradient-to-r from-[#E8720C] to-[#E8E8ED]" />
                </div>

                {/* Excerpt */}
                <div>
                  <label className={labelClass}>Snapshot / Lead Paragraph</label>
                  <textarea
                    value={form.excerpt}
                    onChange={e => set('excerpt', e.target.value)}
                    rows={3}
                    placeholder="Summarize your article in 2-3 powerful sentences..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Content Area */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <label className={labelClass}>Article Body</label>
                    <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-tighter">HTML Friendly</span>
                  </div>
                  <div className="bg-[#FBFBFD] border border-[#E8E8ED] rounded-3xl overflow-hidden shadow-inner">
                    {/* Simplified Toolbar */}
                    <div className="flex flex-wrap gap-2 p-3 bg-white border-b border-[#E8E8ED]">
                      {['H2', 'H3', 'Bold', 'Italic', 'Link', 'Quote', 'List'].map(tool => (
                        <button key={tool} type="button" className="px-3 py-1.5 text-[10px] font-bold text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg border border-transparent hover:border-[#E8E8ED] transition-all">
                          {tool}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={form.content}
                      onChange={e => set('content', e.target.value)}
                      placeholder="Start sharing your expertise...
  
Use <h2> for headings
Use <p> for paragraphs
Use <ul> and <li> for points"
                      rows={20}
                      className="w-full bg-transparent px-6 py-6 text-[#1D1D1F] text-base leading-relaxed resize-none focus:outline-none placeholder:text-[#86868B]/40 font-serif"
                    />
                  </div>
                  <div className="flex items-center justify-between px-2">
                     <p className="text-[10px] font-bold text-[#86868B] flex items-center gap-1">
                        <FileText size={10} /> {form.content.replace(/<[^>]+>/g, '').split(' ').filter(Boolean).length} Words recorded
                     </p>
                     <p className="text-[10px] font-bold text-[#86868B]">
                        Est. {Math.max(1, Math.ceil(form.content.replace(/<[^>]+>/g, '').split(' ').length / 250))} minute read
                     </p>
                  </div>
                </div>
              </div>
            ) : (
              /* SEO Surface */
              <div className="space-y-10 relative z-10">
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Google Search Title</label>
                    <input value={form.meta_title} onChange={e => set('meta_title', e.target.value)}
                      placeholder="Catchy but information-dense (60 chars max)" className={inputClass} maxLength={70} />
                    <div className="flex justify-between mt-2 px-1">
                       <span className={`text-[10px] font-bold ${form.meta_title.length > 60 ? 'text-[#E8720C]' : 'text-[#86868B]'}`}>
                          {form.meta_title.length}/70 Recommended
                       </span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Meta Hook / Description</label>
                    <textarea value={form.meta_description} onChange={e => set('meta_description', e.target.value)}
                      rows={3} placeholder="The snippet shown in search results..." className={`${inputClass} resize-none`} maxLength={200} />
                    <div className="flex justify-between mt-2 px-1">
                       <span className={`text-[10px] font-bold ${form.meta_description.length > 155 ? 'text-[#E8720C]' : 'text-[#86868B]'}`}>
                          {form.meta_description.length}/200 Max
                       </span>
                    </div>
                  </div>
                </div>

                {/* Google Preview Card */}
                <div className="p-8 bg-[#FBFBFD] border border-[#E8E8ED] rounded-3xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-[#E8E8ED] text-[#86868B]">
                       <Globe size={10} />
                    </div>
                    <span className="text-[10px] text-[#86868B] font-bold uppercase tracking-widest">SERP Preview</span>
                  </div>
                  <div className="text-[#0958D9] text-xl font-medium line-clamp-1 hover:underline cursor-default">
                    {form.meta_title || form.title || 'Maruti Developers Blog — Industrial Insights'}
                  </div>
                  <div className="text-[#389E0D] text-xs font-medium">https://marutilanddevelopers.com/blog/{(form.title || '').toLowerCase().replace(/\s+/g, '-')}</div>
                  <div className="text-[#434343] text-sm leading-relaxed line-clamp-2 font-normal">
                    {form.meta_description || form.excerpt || 'Empowering NRIs and corporations with the most verified industrial land datasets in Gujarat and beyond.'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          {/* Metadata Card */}
          <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Post Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Publish Strategy</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}>
                  <option value="draft">Review Draft</option>
                  <option value="published">Go Live Immediately</option>
                  <option value="archived">Archive Content</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Topic Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
                  <option value="">Select Category...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.featured ? 'bg-[#E8720C] border-[#E8720C]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                     {form.featured && <Star size={10} className="text-white fill-white" />}
                  </div>
                  <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="hidden" />
                  <span className="text-sm font-bold text-[#1D1D1F]">Highlight from Feed</span>
                </label>
              </div>
            </div>
          </div>

          {/* Asset Management */}
          <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight flex items-center justify-between">
              Visuals
              <ImageIcon size={18} className="text-[#E8720C]" />
            </h3>
            
            <div className="space-y-4">
               <label className={labelClass}>Cover Image URL</label>
               <input value={form.cover_image} onChange={e => set('cover_image', e.target.value)}
                 placeholder="https://..." className={inputClass} />
               
               <div className="aspect-video w-full rounded-2xl bg-[#F5F5F7] overflow-hidden border border-[#E8E8ED] relative flex items-center justify-center shadow-inner">
                  {form.cover_image ? (
                    <img src={form.cover_image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center space-y-2 opacity-30">
                       <ImageIcon size={32} className="mx-auto" />
                       <span className="block text-[10px] font-bold uppercase tracking-widest">No Header Image</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Taxonomy / Tags */}
          <div className="bg-white border border-[#E8E8ED] rounded-[32px] p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight flex items-center justify-between">
              Taxonomy
              <TagIcon size={18} className="text-[#3b82f6]" />
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <input
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (newTag.trim() && !tags.includes(newTag.trim())) { setTags([...tags, newTag.trim()]); setNewTag('') } } }}
                  placeholder="E.g. GIDC"
                  className={`${inputClass} !py-2.5 !rounded-xl`}
                />
                <button type="button" onClick={() => { if (newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag('') } }}
                  className="px-4 py-2 bg-[#1D1D1F] text-white rounded-xl text-xs font-bold">+</button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-2 bg-[#F5F5F7] text-[#1D1D1F] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#E8E8ED] group">
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="text-[#86868B] hover:text-[#E01B2F] transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-3">Popular Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {['Industrial', 'Warehouse', 'Investment', 'Gujarat', 'NRI'].map(s => (
                    !tags.includes(s) && (
                      <button key={s} onClick={() => setTags([...tags, s])}
                        className="text-[9px] font-bold text-[#86868B] px-3 py-1.5 rounded-lg border border-[#E8E8ED] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                        + {s}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
