'use client'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight } from 'lucide-react'

const horrors = [
  { title: '₹10.7 Crore Lost', sub: 'Gurugram NRI', desc: 'Forged gift deed. Money transferred. Developer vanished.', tag: 'Forged Title' },
  { title: 'Broker Vanished', sub: 'Indore Buyer', desc: 'Token cheque cleared. Broker phone switched off.', tag: 'Broker Scam' },
  { title: '₹10.5Cr in Cash', sub: '₹14Cr Farmland', desc: 'IT notice arrived 3 years later. Business shut.', tag: 'Black Money' },
  { title: '13 Months Waiting', sub: 'Maharashtra', desc: 'NA conversion still pending. Factory setup delayed.', tag: 'NA Scam' },
]

const fears = [
  '"Proposed NA" plots that stay proposed for 20 years',
  'Broker quietly asking "kitna cash chalega?" — IT notice arrives 3 years later',
  'Buying a chemical-use plot in a green-zone park and losing your pollution consent',
  '40% of the plot disappearing into setbacks, FAR, and green belt after you\'ve paid',
  'Your file sitting in state secretariat while broker\'s phone is switched off',
  'Buying in a state whose rules you don\'t know — and learning the hard way',
]

export function ProblemSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />The Reality<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-4 leading-tight sm:leading-tight">
              You&apos;ve read the<br /><span className="text-red-500">horror stories.</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-base sm:text-lg">
              If you&apos;re buying industrial land in India, you&apos;re not afraid of spending the money. You&apos;re afraid of spending it wrong.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {horrors.map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-red-50/50 border border-red-100 rounded-2xl p-5 sm:p-6 group hover:shadow-apple-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <span className="badge-red text-[10px]">{h.tag}</span>
              </div>
              <div className="font-extrabold text-lg sm:text-xl text-[#1D1D1F] mb-1 tracking-tight">{h.title}</div>
              <div className="text-[11px] sm:text-xs text-[#86868B] mb-2 sm:mb-3">{h.sub}</div>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-[#F5F5F7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h3 className="font-bold text-[#1D1D1F] text-base sm:text-lg mb-4 sm:mb-6">You&apos;re afraid of:</h3>
          <ul className="space-y-3">
            {fears.map((fear, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                <span className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{fear}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center px-4">
          <p className="font-bold text-xl sm:text-2xl text-[#1D1D1F] mb-5 sm:mb-6 tracking-tight">
            We built Maruti Developers for <span className="gradient-text">exactly this buyer.</span>
          </p>
          <a href="#contact" className="btn-primary inline-flex py-3.5 sm:py-4 px-6 sm:px-8 text-sm sm:text-base">
            Tell Us What You Need <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
