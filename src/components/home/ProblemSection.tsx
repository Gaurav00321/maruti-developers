'use client'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const horrors = [
  { title: '₹10.7 Crore Lost', sub: 'Gurugram NRI', desc: 'Forged gift deed. Money transferred. Developer vanished.', tag: 'Forged Title', img: '/images/gallery-images/30.jpg' },
  { title: 'Broker Vanished', sub: 'Indore Buyer', desc: 'Token cheque cleared. Broker phone switched off.', tag: 'Broker Scam', img: '/images/gallery-images/31.jpg' },
  { title: '₹10.5Cr in Cash', sub: '₹14Cr Farmland', desc: 'IT notice arrived 3 years later. Business shut.', tag: 'Black Money', img: '/images/gallery-images/32.jpg' },
  { title: '13 Months Waiting', sub: 'Maharashtra', desc: 'NA conversion still pending. Factory setup delayed.', tag: 'NA Scam', img: '/images/gallery-images/33.jpg' },
]

const fears = [
  '"Proposed NA" plots that stay proposed for 20 years',
  'Broker quietly asking "kitna cash chalega?" — IT notice arrives 3 years later',
  'Buying a chemical-use plot in a green-zone park and losing your pollution consent',
  '40% of the plot disappearing into setbacks, FAR, and green belt after you\'ve paid',
]

// Strip images for background
const stripImages = [
  '/images/gallery-images/10.jpg', '/images/gallery-images/13.jpg', '/images/gallery-images/14.jpg',
  '/images/gallery-images/15.jpg', '/images/gallery-images/16.jpg', '/images/gallery-images/18.jpg',
]

export function ProblemSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#09090B] border-t border-[#27272A] relative overflow-hidden">
      {/* Background Image Strip Marquee */}
      <div className="absolute top-40 inset-x-0 h-64 lg:h-80 opacity-5 pointer-events-none overflow-hidden rotate-[-2deg] scale-110">
         <div className="image-strip-track">
           {[...stripImages, ...stripImages].map((img, i) => (
             <div key={i} className="relative w-80 h-64 lg:h-80 rounded-xl overflow-hidden flex-shrink-0">
               <Image src={img} alt="" fill className="object-cover grayscale" />
             </div>
           ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20 lg:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label justify-center">
              <span className="w-6 h-px bg-[#10B981]" /> 02 — The Reality <span className="w-6 h-px bg-[#10B981]" />
            </p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-6">
              You've read the <span className="text-[#EA580C] italic">horror stories.</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-base sm:text-lg">
              If you're buying industrial land in India, you're not afraid of spending the money. You're afraid of spending it wrong.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {horrors.map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative bg-[#111113] rounded-3xl border border-[#27272A] overflow-hidden hover:border-[#EA580C]/40 transition-[border-color] duration-500 shadow-xl flex flex-col h-full"
            >
              <div className="absolute top-4 right-4 z-20">
                <span className="badge bg-[#09090B]/80 text-[#EA580C] border border-[#27272A] backdrop-blur-md px-3 py-1 shadow-sm uppercase tracking-wide text-[10px]">{h.tag}</span>
              </div>
              <div className="relative h-48 w-full overflow-hidden bg-[#18181B]">
                <Image src={h.img} alt={h.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 w-10 h-10 bg-[#18181B]/80 backdrop-blur-md rounded-xl border border-[#27272A] flex items-center justify-center z-10 transition-colors">
                  <AlertTriangle size={18} className="text-[#EA580C]" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="font-serif font-bold text-xl text-[#FAFAFA] mb-1 leading-snug">{h.title}</div>
                <div className="text-[11px] text-[#71717A] mb-4 font-mono font-medium uppercase tracking-wider">{h.sub}</div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mt-auto font-sans">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111113] border border-[#27272A] rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/gallery-images/26.jpg')] bg-cover bg-center mix-blend-overlay" />
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 relative z-10">
            <h3 className="font-serif font-bold text-[#FAFAFA] text-2xl lg:text-3xl mb-4 leading-tight">
              You're afraid of<br /><span className="text-[#EA580C] italic">what you don't know:</span>
            </h3>
            <p className="text-[#A1A1AA] text-sm lg:text-base leading-relaxed mb-6 font-sans">
              Paperwork is where deals die. Missing documents, unclear zoning, or false promises from unregistered brokers cost buyers millions every year in India.
            </p>
             <a href="#contact" className="btn-primary inline-flex py-3.5 px-7 text-sm shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
               Protect Your Investment <ArrowRight size={16} />
             </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 relative z-10">
            <div className="bg-[#09090B]/80 backdrop-blur-xl border border-[#27272A] rounded-2xl p-6 lg:p-8">
              <ul className="space-y-5">
                {fears.map((fear, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-lg bg-[#EA580C]/10 border border-[#EA580C]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#EA580C]/20 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    </div>
                    <span className="text-sm lg:text-base text-[#A1A1AA] leading-relaxed font-sans">{fear}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
