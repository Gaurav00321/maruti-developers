export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export const revalidate = 300

export const metadata = {
  title: 'Blog — Industrial Real Estate Insights | Maruti Developers',
  description: 'Expert guides on industrial land buying, GIDC/MIDC/SIPCOT parks, NRI investment, due diligence, and more. By Vinod Jaiswal, Maruti Developers.',
}

async function getPosts() {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)
  return data || []
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center py-16">
            <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#E8720C]" />Industry Insights<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h1 className="section-title mb-4">The Straight-Talk Blog</h1>
            <p className="text-[#6E6E73] text-lg max-w-2xl mx-auto leading-relaxed">
              Industrial real estate guides, market intel, and due-diligence checklists. Written by practitioners — not marketers.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#86868B] text-lg">Blog posts coming soon. Check back shortly.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white border border-[#E8E8ED] rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#D2D2D7] transition-all duration-300 h-full flex flex-col">
                    {/* Cover — images fetched from Supabase (GCS URLs stored in cover_image field) */}
                    <div className="relative h-48 bg-[#F5F5F7] overflow-hidden flex-shrink-0">
                      {post.cover_image ? (
                        <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📊</div>
                      )}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span className="badge-green text-[10px]">{post.category}</span>
                        </div>
                      )}
                    </div>
                    {/* Content — text fetched from Supabase */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-[#86868B] mb-3">
                        <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time} min read</span>
                        <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : ''}</span>
                      </div>
                      <h2 className="font-bold text-[#1D1D1F] text-base leading-snug mb-3 line-clamp-2 group-hover:text-[#E8720C] transition-colors">{post.title}</h2>
                      <p className="text-sm text-[#6E6E73] leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1 text-[10px] text-[#86868B]">
                              <Tag size={8} /> {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[#E8720C] text-sm font-semibold">
                        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
