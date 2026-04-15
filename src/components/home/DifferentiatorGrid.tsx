'use client'
import { motion } from 'framer-motion'
import { FileText, SearchCheck, Factory, Banknote, Users, Wrench, Globe, ArrowRight } from 'lucide-react'

const differentiators = [
  { num: '01', icon: FileText, title: 'Full Landed-Cost Sheet Before You Commit', body: 'Land price + stamp duty + registration + NA/CLU + development charges + pollution board + electricity + shed construction estimate. One PDF.', tag: 'Transparency' },
  { num: '02', icon: SearchCheck, title: 'Title & Document Verification Pack', body: '7/12, patta, khata, encumbrance certificate, NA order, CLU, mutation, zoning certificate. Sent to your lawyer in a ZIP.', tag: 'Legal Safety' },
  { num: '03', icon: Factory, title: 'Zone-to-Industry Compatibility', body: 'Tell us your NIC code. We\'ll tell you which estates — GIDC, MIDC, SIPCOT, KIADB, RIICO — you can legally operate in.', tag: 'Compliance' },
  { num: '04', icon: Banknote, title: 'White-Cheque Transactions Only', body: 'We do not structure black-money deals. Most of our buyers tell us it\'s the reason they chose us.', tag: 'Integrity' },
  { num: '05', icon: Users, title: 'Local Verified Experts', body: 'On-ground partners — lawyers, title verifiers, liaison specialists — in every state we operate.', tag: 'Local Depth' },
  { num: '06', icon: Wrench, title: 'Post-Sale Handholding', body: 'Pollution board consent, factory license, power connection. We stay until your first unit ships.', tag: 'End-to-End' },
  { num: '07', icon: Globe, title: 'NRI-Safe Process', body: 'Registered SPA, video walkthroughs, FEMA-compliant routing, repatriation clarity.', tag: 'NRI-Ready' },
]

export function DifferentiatorGrid() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Why Us<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-4 leading-tight sm:leading-tight">
              Seven things most brokers<br />won&apos;t do. <span className="gradient-text">We do them first.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {differentiators.slice(0, 6).map((d, i) => (
            <motion.div key={d.num} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E8E8ED] hover:shadow-apple-lg hover:border-[#D2D2D7] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center group-hover:bg-[#1D1D1F] transition-colors duration-300">
                    <d.icon size={18} className="text-[#1D1D1F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs text-[#AEAEB2]">{d.num}</span>
                </div>
                <span className="badge-green text-[9px] sm:text-[10px]">{d.tag}</span>
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-sm sm:text-base mb-2 sm:mb-3 leading-snug tracking-tight">{d.title}</h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{d.body}</p>
            </motion.div>
          ))}
        </div>

        {/* 7th — Full-width special */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6 bg-[#1D1D1F] rounded-2xl p-6 sm:p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <span className="font-mono text-xs text-white/40">07</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2 text-sm">
                <h3 className="font-bold text-white pr-2">{differentiators[6].title}</h3>
                <span className="badge bg-white/10 text-white/80 border-white/20 text-[9px] sm:text-[10px]">{differentiators[6].tag}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">{differentiators[6].body}</p>
            </div>
            <a href="/contact" className="inline-flex items-center justify-center md:justify-start gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex-shrink-0">
              Book Advisory Call <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
