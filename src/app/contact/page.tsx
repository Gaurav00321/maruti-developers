import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Phone, Mail, MapPin, Globe, MessageCircle, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact — Maruti Developers',
  description: 'Contact Vinod Jaiswal at Maruti Developers. Call +91 98986 10678, WhatsApp, or email for industrial land, warehouse, and commercial property enquiries.',
}

const contactItems = [
  { icon: Phone, label: 'Call / WhatsApp', values: ['+91 98986 10678', '+91 78786 10678'], href: 'tel:+919898610678' },
  { icon: Mail, label: 'Email', values: ['marutideveloper78@gmail.com', 'info@marutilanddevelopers.com'], href: 'mailto:marutideveloper78@gmail.com' },
  { icon: Globe, label: 'Website', values: ['www.marutilanddevelopers.com'], href: 'https://www.marutilanddevelopers.com' },
  { icon: Clock, label: 'Working Hours', values: ['Mon–Sat: 9am–7pm IST', 'Sun: By appointment'], href: null },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        {/* Header */}
        <div className="py-12 sm:py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#E8720C]" />Get In Touch<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] mb-4 leading-[1.08] tracking-tight">We Pick Up the Phone</h1>
            <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed">
              No call-centre agents. No scripted responses. Speak directly with Vinod Jaiswal or a senior member of our advisory team.
            </p>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16">
            {contactItems.map((item) => (
              <div key={item.label} className="card group p-4 sm:p-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#E8E8ED] transition-all">
                  <item.icon size={16} className="text-[#1D1D1F]" />
                </div>
                <div className="font-bold text-[#1D1D1F] text-xs sm:text-sm mb-1 sm:mb-2">{item.label}</div>
                {item.values.map((v, i) => (
                  item.href ? (
                    <a key={i} href={item.href} className="block text-xs sm:text-sm text-[#6E6E73] hover:text-[#E8720C] transition-colors mb-0.5 sm:mb-1 break-all">{v}</a>
                  ) : (
                    <div key={i} className="text-xs sm:text-sm text-[#86868B] mb-0.5 sm:mb-1">{v}</div>
                  )
                ))}
              </div>
            ))}
          </div>

          {/* Office address */}
          <div className="bg-[#F5F5F7] rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <MapPin size={20} className="text-[#E8720C]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1D1F] text-base sm:text-lg mb-2">Office Address</h3>
              <address className="not-italic text-[#6E6E73] leading-loose text-sm sm:text-base">
                Atlantic K-10, Office No. 225, 2nd Floor, B-Tower<br />
                Opp. Vadodara Central Mall, Sarabhai Main Road<br />
                Vadiwadi, Vadodara, Gujarat, India — 390023
              </address>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-2.5 px-5 text-sm justify-center">
                  <MessageCircle size={14} /> WhatsApp Now
                </a>
                <a href="tel:+919898610678" className="btn-secondary py-2.5 px-5 text-sm justify-center">
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <FinalCTA />
      </div>
      <Footer />
    </main>
  )
}
