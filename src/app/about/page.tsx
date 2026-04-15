'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FinalCTA } from '@/components/home/HomeSections'
import { TrustBar } from '@/components/home/TrustBar'
import { CheckCircle2, Phone, MessageCircle, Building2, Globe, Users, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const milestones = [
  { year: '1998', title: 'Founded in Vadodara', desc: 'Vinod Jaiswal starts Maruti Developers, focusing on GIDC industrial land advisory in Gujarat.' },
  { year: '2005', title: 'Expanded to Maharashtra', desc: 'Established on-ground network in MIDC estates. First pan-state coverage milestone.' },
  { year: '2010', title: '500+ Clients Served', desc: 'A decade of client-centric advisory. Reputation built on white-money transactions.' },
  { year: '2015', title: 'Pan-India Coverage', desc: 'Extended to Tamil Nadu (SIPCOT), Karnataka (KIADB), and Rajasthan (RIICO) corridors.' },
  { year: '2020', title: 'NRI-Safe Framework Built', desc: 'Post-pandemic remote due-diligence model: video walkthroughs, digital document packs, FEMA-compliant routing.' },
  { year: '2024', title: '2,500+ Clients', desc: 'Quarter-century of building industrial India. Over ₹2,000+ crore worth of transactions advised.' },
]

const values = [
  { icon: CheckCircle2, title: 'White-Money Only', desc: 'Every rupee on the record. Stamp duty on actual transacted value. No exceptions.' },
  { icon: Globe, title: 'Pan-India Depth', desc: 'Hub-and-spoke model with vetted local partners (lawyers, liaison specialists) in 7+ states.' },
  { icon: Users, title: 'Client-First, Always', desc: 'If we\'re not the right advisor for your deal, we\'ll tell you — and refer you to one who is.' },
  { icon: Building2, title: 'Post-Sale Support', desc: 'We stay on your file until your first production run — not just until the registry is done.' },
]

const faqs = [
  { q: 'Who is Maruti Developers?', a: 'Maruti Developers is an industrial real estate advisory firm founded in 1998 by Vinod Jaiswal in Vadodara, Gujarat. We specialise in industrial land, warehouses, sheds, and commercial property across 7+ Indian states with a strict white-money, RERA-compliant approach.' },
  { q: 'How many years of experience does Maruti Developers have?', a: 'Over 25 years. Since 1998, we have advised on 2,500+ transactions across Gujarat, Maharashtra, Rajasthan, Tamil Nadu, Karnataka, NCR, and Telangana/AP.' },
  { q: 'Which states and industrial estates do you cover?', a: 'We cover GIDC (Gujarat), MIDC (Maharashtra), RIICO (Rajasthan), SIPCOT (Tamil Nadu), KIADB (Karnataka), HSIIDC (Haryana/NCR), and TSIIC/APIIC (Telangana/AP). Our hub-and-spoke model ensures local depth in each state.' },
  { q: 'Do you handle NRI property transactions?', a: 'Yes. We offer an NRI-safe framework including registered Special Power of Attorney (never blanket GPA), video walkthroughs, FEMA-compliant NRE/NRO routing, and full repatriation clarity.' },
  { q: 'What does "white-money only" mean?', a: 'All our transactions are 100% on the record — stamp duty paid on actual transacted value, no cash component, no black-money structuring. If that\'s a dealbreaker, we\'re honestly not the right advisor.' },
  { q: 'How quickly can I get a property shortlist?', a: 'WhatsApp shortlist within 2 hours of your enquiry. Site visits within 48–72 hours in Gujarat and 3–5 days in other states.' },
  { q: 'Do you provide post-purchase support?', a: 'Absolutely. We stay on your file through pollution board consent, factory license, power connection, and municipal approvals — until your first production unit ships.' },
  { q: 'How does Maruti Developers make money?', a: 'We earn a standard brokerage/advisory fee from the seller or developer — disclosed upfront. No hidden charges, no referral kickbacks from lawyers or contractors.' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-[#E8E8ED] last:border-0"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-bold text-[#1D1D1F] text-[15px] pr-4">{q}</span>
        <ChevronDown size={18} className={`text-[#AEAEB2] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 text-sm text-[#6E6E73] leading-relaxed">{a}</div>}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        {/* Hero */}
        <div className="py-12 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />About Us<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] mb-4 sm:mb-6 leading-[1.08] tracking-tight">
              Industrial Real Estate<br />
              <span className="gradient-text">Done Honestly.</span> Since 1998.
            </h1>
            <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Maruti Developers was built on a simple premise: India&apos;s industrial growth needs real estate advisors who put the buyer&apos;s long-term interest first — not the commission cheque.
            </p>
          </div>
        </div>

        <TrustBar />

        {/* Founder — NOW WHITE */}
        <div className="py-12 sm:py-20 bg-[#F5F5F7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl bg-white border border-[#E8E8ED] flex items-center justify-center text-5xl sm:text-7xl mb-4 sm:mb-6 shadow-lg mx-auto md:mx-0">
                  🏭
                </div>
                <div className="font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">Vinod Jaiswal</div>
                <div className="text-[#E8720C] text-sm font-semibold mb-2">Founder &amp; Director</div>
                <div className="badge-gold text-xs">Industrial Land Developer &amp; Real Estate Advisor</div>
                <div className="flex gap-3 mt-5 sm:mt-6 justify-center md:justify-start">
                  <a href="tel:+919898610678" className="btn-primary py-2.5 px-4 sm:px-5 text-sm"><Phone size={14} /> Call</a>
                  <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-2.5 px-4 sm:px-5 text-sm"><MessageCircle size={14} /> WhatsApp</a>
                </div>
              </div>
              <div>
                <h2 className="font-extrabold text-xl sm:text-2xl text-[#1D1D1F] mb-3 sm:mb-4 tracking-tight">25 Years. Seen Everything.</h2>
                <div className="space-y-3 sm:space-y-4 text-[#6E6E73] leading-relaxed text-sm sm:text-base">
                  <p>I started Maruti Developers in Vadodara in 1998 with one conviction: that industrial land buyers deserve the same quality of advice that large corporations get from their internal real estate teams.</p>
                  <p>In 25 years, I&apos;ve closed deals from Bhiwadi to Hosur, helped NRI families navigate FEMA compliance from three continents, and personally walked hundreds of factory promoters through the documentation maze that trips up first-time buyers.</p>
                  <p>I&apos;ve also seen what goes wrong when advisors cut corners — forged titles, undisclosed encumbrances, plots sold twice, NA conversions that take a decade. Those failures built everything we do at Maruti.</p>
                  <p className="text-[#1D1D1F] italic font-semibold">&ldquo;If we&apos;re not the right fit for your deal, I&apos;ll tell you. That&apos;s worth more to me than one more commission.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-12 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Our Values<span className="w-6 h-px bg-[#E8720C]" /></p>
              <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem]">What We Stand For</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map(v => (
                <div key={v.title} className="card">
                  <div className="w-10 h-10 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-4">
                    <v.icon size={18} className="text-[#1D1D1F]" />
                  </div>
                  <h3 className="font-bold text-[#1D1D1F] text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-[#6E6E73]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline — NOW WHITE */}
        <div className="py-12 sm:py-20 bg-[#F5F5F7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Our Journey<span className="w-6 h-px bg-[#E8720C]" /></p>
              <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem]">25 Years of<br /><span className="gradient-text">Building Industrial India</span></h2>
            </div>
            <div className="relative">
              <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-[#D2D2D7]" />
              <div className="space-y-8">
                {milestones.map((m) => (
                  <motion.div key={m.year} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4 sm:gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#E8720C] flex items-center justify-center z-10 relative shadow-md">
                        <span className="text-[10px] sm:text-xs text-[#E8720C] font-bold">{m.year.slice(2)}</span>
                      </div>
                    </div>
                    <div className="pb-3 sm:pb-4">
                      <div className="font-bold text-[#1D1D1F] text-sm sm:text-base mb-1">{m.title}</div>
                      <div className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{m.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />FAQ<span className="w-6 h-px bg-[#E8720C]" /></p>
              <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem]">Frequently Asked<br />Questions</h2>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8E8ED] px-4 sm:px-8 shadow-lg">
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
            </div>
          </div>
        </div>

        <FinalCTA />
      </div>
      <Footer />
    </main>
  )
}
