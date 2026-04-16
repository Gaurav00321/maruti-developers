'use client'
import { motion } from 'framer-motion'
import { FileText, SearchCheck, Factory, Banknote, Users, Wrench, Globe, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const differentiators = [
  { num: '01', icon: FileText, title: 'Full Landed-Cost Sheet Before You Commit', body: 'Land price + stamp duty + registration + NA/CLU + development charges + pollution board + electricity + shed construction. One PDF.', tag: 'Transparency', img: '/images/gallery-images/34.jpg' },
  { num: '02', icon: SearchCheck, title: 'Title & Document Verification Pack', body: '7/12, patta, khata, encumbrance certificate, NA order, CLU, mutation, zoning certificate. Sent to your lawyer in a ZIP.', tag: 'Legal Safety', img: '/images/gallery-images/35.jpg' },
  { num: '03', icon: Factory, title: 'Zone-to-Industry Compatibility', body: 'Tell us your NIC code. We\'ll tell you which estates — GIDC, MIDC, SIPCOT, KIADB, RIICO — you can legally operate in.', tag: 'Compliance', img: '/images/gallery-images/36.jpg' },
  { num: '04', icon: Banknote, title: 'White-Cheque Transactions Only', body: 'We do not structure black-money deals. Most of our buyers tell us it\'s the reason they chose us.', tag: 'Integrity', img: '/images/gallery-images/37.jpg' },
  { num: '05', icon: Users, title: 'Local Verified Experts', body: 'On-ground partners — lawyers, title verifiers, liaison specialists — in every state we operate.', tag: 'Local Depth', img: '/images/gallery-images/38.jpg' },
  { num: '06', icon: Wrench, title: 'Post-Sale Handholding', body: 'Pollution board consent, factory license, power connection. We stay until your first unit ships.', tag: 'End-to-End', img: '/images/gallery-images/39.jpg' },
  { num: '07', icon: Globe, title: 'NRI-Safe Process', body: 'Registered SPA, video walkthroughs, FEMA-compliant routing, repatriation clarity.', tag: 'NRI-Ready', img: '/images/gallery-images/40.jpg' },
]

export function DifferentiatorGrid() {
  return (
    <section className="py-24 lg:py-32 bg-[#09090B] border-t border-[#27272A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20 sm:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label justify-center">
              <span className="w-6 h-px bg-[#10B981]" /> 03 — Why Us <span className="w-6 h-px bg-[#10B981]" />
            </p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-6">
              Things most brokers won't do.<br /><span className="gradient-text italic">We do them first.</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-base sm:text-lg">
              We operate exclusively in the industrial sector. Our processes are designed for manufacturers and 3PLs who cannot afford a legal mistake.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.slice(0, 6).map((d, i) => (
            <motion.div key={d.num} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group flex flex-col bg-[#111113] rounded-3xl border border-[#27272A] overflow-hidden hover:border-[#10B981]/50 transition-colors duration-500 shadow-xl relative"
            >
              <div className="absolute top-5 right-5 z-20">
                <span className="badge bg-[#09090B]/80 text-[#10B981] border border-[#27272A] backdrop-blur-md px-3 py-1 shadow-sm uppercase tracking-wide text-[10px]">{d.tag}</span>
              </div>
              <div className="relative h-60 overflow-hidden w-full bg-[#18181B]">
                <Image src={d.img} alt={d.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-4 z-10">
                  <div className="w-12 h-12 bg-[#09090B] rounded-xl flex items-center justify-center border border-[#27272A] group-hover:border-[#10B981]/50 transition-colors duration-300">
                    <d.icon size={20} className="text-[#10B981]" />
                  </div>
                  <span className="font-mono text-sm text-[#71717A] tracking-wider">{d.num}</span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col pt-2">
                <h3 className="font-serif font-bold text-[#FAFAFA] text-xl mb-3 leading-snug group-hover:text-[#10B981] transition-colors">{d.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans mt-auto">{d.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 7th — Full-width special */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-12 bg-[#111113] border border-[#27272A] hover:border-[#10B981]/40 transition-colors rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 z-0 bg-[#18181B]">
             <Image src={differentiators[6].img} alt="" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#111113] via-[#111113]/90 to-transparent" />
             <div className="absolute inset-0 bg-[#09090B] mix-blend-color" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex items-center lg:items-start gap-5 flex-shrink-0 lg:flex-col lg:w-48">
              <div className="w-16 h-16 bg-[#10B981]/20 rounded-2xl flex items-center justify-center border border-[#10B981]/30">
                <Globe size={28} className="text-[#10B981]" />
              </div>
              <div>
                <span className="font-mono text-xl text-[#71717A] block mb-1">07</span>
                <span className="badge bg-[#18181B] border-[#27272A] text-[#10B981] px-3 font-mono">{differentiators[6].tag}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-serif font-bold text-2xl lg:text-3xl text-[#FAFAFA] mb-4">{differentiators[6].title}</h3>
              <p className="text-base lg:text-lg text-[#A1A1AA] leading-relaxed font-sans max-w-2xl">{differentiators[6].body}</p>
            </div>
            
            <a href="/contact" className="btn-primary flex-shrink-0 !px-8 h-14 justify-center whitespace-nowrap">
              Book Advisory Call <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
