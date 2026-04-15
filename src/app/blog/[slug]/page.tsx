import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, Tag, ArrowLeft, MessageCircle, User, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

export const revalidate = 600

interface Props { params: { slug: string } }

async function getPost(slug: string) {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('status', 'published').single()
  return data
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: { images: [{ url: post.cover_image || '' }] },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const supabase = createSupabaseAdminClient()
  supabase.from('blog_posts').update({ view_count: (post.view_count || 0) + 1 }).eq('id', post.id).then(() => {})

  return (
    <main className="min-h-screen bg-white text-[#1D1D1F]">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="py-6 sm:py-8 flex items-center gap-2 text-xs sm:text-sm text-[#86868B]">
            <Link href="/blog" className="hover:text-[#1D1D1F] transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="truncate">{post.title}</span>
          </div>

          <header className="mb-8 sm:mb-12">
            {post.category && (
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E8720C] mb-4 inline-block">
                {post.category}
              </span>
            )}
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-6 sm:mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6E6E73] border-b border-[#F5F5F7] pb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] flex items-center justify-center overflow-hidden">
                  <User size={16} className="text-[#86868B]" />
                </div>
                <div>
                  <span className="text-[#1D1D1F] font-bold block">{post.author_name}</span>
                  <span className="text-[10px] sm:text-xs text-[#86868B]">{post.author_title || 'Expert Advisor'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pl-2 sm:pl-0 border-l sm:border-0 border-[#E8E8ED]">
                <Calendar size={14} />
                <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Published Recently'}</span>
              </div>
              <div className="flex items-center gap-1.5 pl-2 sm:pl-0 border-l sm:border-0 border-[#E8E8ED]">
                <Clock size={14} />
                <span>{post.read_time || '5'} min read</span>
              </div>
            </div>
          </header>

          {post.cover_image && (
            <div className="relative aspect-[16/9] sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-12 shadow-sm bg-[#F5F5F7]">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <article 
            className="prose prose-apple max-w-none text-base sm:text-lg leading-relaxed text-[#424245]" 
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon.</p>' }} 
          />

          <footer className="mt-12 sm:mt-16 pt-8 border-t border-[#F5F5F7]">
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 bg-[#F5F5F7] text-[#6E6E73] text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-medium border border-[#E8E8ED]">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="bg-[#F5F5F7] rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8720C]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#E8E8ED] flex items-center justify-center text-3xl sm:text-4xl shadow-sm flex-shrink-0">
                  ??
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1D1D1F] text-lg sm:text-xl mb-1">{post.author_name}</h3>
                  <p className="text-xs sm:text-sm text-[#E8720C] font-bold mb-4 uppercase tracking-widest">{post.author_title || 'Industrial Advisor'}</p>
                  <p className="text-sm sm:text-base text-[#6E6E73] mb-6 leading-relaxed">Have questions about this topic or need personalized advice for your industrial property requirement? Reach out directly.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3 px-6 text-sm justify-center shadow-md">
                      <MessageCircle size={18} /> WhatsApp for Advice
                    </a>
                    <Link href="/contact" className="btn-secondary bg-white py-3 px-6 text-sm justify-center">Contact Us</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Footer />
    </main>
  )
}
