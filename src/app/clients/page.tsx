import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ClientsGrid } from '@/components/clients/ClientsGrid'

export const metadata = {
  title: 'Our Clients | Maruti Developers',
  description: 'Trusted by over 2,500 industrial clients across India.',
}

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mt-10">
          <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#C4973B]" /> Trusted By The Best <span className="w-6 h-px bg-[#C4973B]" /></p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] mb-6">
            Building the foundations of<br /><span className="gradient-text italic">India's industry.</span>
          </h1>
          <p className="text-[#B8B0A0] text-lg max-w-2xl mx-auto font-sans">
            From established manufacturers to emerging enterprises, we have proudly facilitated industrial spaces for over 2,500 clients.
          </p>
        </div>
      </div>
      
      <ClientsGrid />
      <Footer />
    </main>
  )
}
