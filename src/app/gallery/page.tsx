import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export const metadata = {
  title: 'Our Gallery | Maruti Developers',
  description: 'View our portfolio of industrial sheds, warehouses, and commercial properties across India.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mt-10">
          <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#C4973B]" /> Our Portfolio <span className="w-6 h-px bg-[#C4973B]" /></p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] mb-6">
            Property moments<br /><span className="gradient-text italic">captured beautifully.</span>
          </h1>
          <p className="text-[#B8B0A0] text-lg max-w-2xl mx-auto font-sans">
            Explore high-quality images reflecting our industrial land developments, built-to-suit warehouses, and premium commercial projects.
          </p>
        </div>
      </div>
      
      <GalleryGrid />
      <Footer />
    </main>
  )
}
