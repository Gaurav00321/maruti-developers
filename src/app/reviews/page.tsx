import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReviewsMarquee } from '@/components/reviews/ReviewsMarquee'

export const metadata = {
  title: 'Client Reviews | Maruti Developers',
  description: 'Read testimonials from our satisfied clients in the industrial real estate sector.',
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(196,151,59,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 relative z-10">
        <div className="text-center mt-10">
          <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#C4973B]" /> Client Experiences <span className="w-6 h-px bg-[#C4973B]" /></p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] mb-6">
            Real stories from our<br /><span className="gradient-text italic">successful partners.</span>
          </h1>
          <p className="text-[#B8B0A0] text-lg max-w-2xl mx-auto font-sans">
            Hear directly from manufacturers, logistics providers, and investors about their experience acquiring industrial properties with Maruti Developers.
          </p>
        </div>
      </div>
      
      <div className="relative z-10 pb-12">
        <ReviewsMarquee />
      </div>
      
      <Footer />
    </main>
  )
}
