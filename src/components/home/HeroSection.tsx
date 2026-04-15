'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle, Phone, ChevronDown, Loader2, MessageCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit number'),
})
type FormData = z.infer<typeof schema>

const trustItems = [
  '25+ Years in Indian Industrial Real Estate',
  'Pan-India Coverage · Local Verified Experts',
  'RERA-Compliant Transactions',
  'Direct Owner Deals — No Layered Broker Chain',
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // Animation variants to simplify
  const fadeInUp = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'hero' }),
      })
    } catch {}
    setSubmitted(true)
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'lead_submit', { source: 'hero' })
    }
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-16 bg-white">
      {/* Subtle warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-b from-[#E8720C]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              {...fadeInUp}
              className="inline-flex items-center gap-2 bg-[#F5F5F7] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              <span className="text-[#6E6E73] text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                Since 1998 · 2,500+ Clients · Pan-India
              </span>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-extrabold text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-[#1D1D1F] leading-[1.2] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6"
            >
              Industrial Land.{' '}
              <span className="gradient-text">Warehouses.</span>{' '}
              Commercial Property.
            </motion.h1>

            <motion.p
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#424245] text-base sm:text-xl leading-relaxed mb-3 sm:mb-4 font-normal"
            >
              Across India — without the broker games, black-money traps, or &quot;proposed NA&quot; regret.
            </motion.p>
            <motion.p
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#86868B] text-sm sm:text-base leading-relaxed mb-6 sm:mb-10"
            >
              Gujarat · Maharashtra · Rajasthan · Tamil Nadu · Karnataka · NCR · Telangana.
            </motion.p>

            {/* Trust strip — hidden on mobile, shown on sm+ */}
            <motion.div initial={{ opacity: mounted ? 0 : 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="hidden sm:flex flex-col gap-3 mb-10">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#34C759] flex-shrink-0" />
                  <span className="text-sm text-[#6E6E73] font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: mounted ? 0 : 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="tel:+919898610678" className="btn-secondary py-3 sm:py-3.5 justify-center sm:justify-start text-sm">
                <Phone size={16} /> +91 98986 10678
              </a>
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3 sm:py-3.5 justify-center sm:justify-start text-sm">
                <MessageCircle size={16} /> WhatsApp Now
              </a>
            </motion.div>
          </div>

          {/* Right — Lead Form */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.15 }} className="relative">
            <div className="bg-white border border-[#E8E8ED] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl sm:shadow-2xl">
              {!submitted ? (
                <>
                  <div className="mb-5 sm:mb-8">
                    <h2 className="font-bold text-xl sm:text-2xl text-[#1D1D1F] mb-1.5 sm:mb-2 tracking-tight">
                      Get My Free Plot Shortlist
                    </h2>
                    <p className="text-xs sm:text-sm text-[#86868B]">
                      WhatsApp response in <span className="text-[#E8720C] font-semibold">2 hours</span> from a senior advisor
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div>
                      <input {...register('name')} placeholder="Your Full Name *" className="input" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#AEAEB2] text-sm">+91</span>
                        <input {...register('whatsapp')} placeholder="WhatsApp Number *" type="tel" className="input pl-12 sm:pl-14" maxLength={10} />
                      </div>
                      {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3.5 sm:py-4 text-sm sm:text-base">
                      {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <>Get My Free Plot Shortlist <ArrowRight size={16} /></>}
                    </button>
                  </form>

                  <p className="text-[10px] sm:text-xs text-[#AEAEB2] text-center mt-4 sm:mt-5">
                    No spam. One WhatsApp from a senior advisor. NRI? We&apos;ll handle it right.
                  </p>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 sm:py-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#34C759]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-[#34C759]" size={28} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#1D1D1F] mb-2">Thank you!</h3>
                  <p className="text-xs sm:text-sm text-[#86868B] mb-5 sm:mb-6">Our senior advisor will WhatsApp you within 2 hours.</p>
                  <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center py-3">
                    <MessageCircle size={16} /> Send WhatsApp Now
                  </a>
                </motion.div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#E8E8ED]">
                {[['25+', 'Years'], ['2,500+', 'Clients'], ['7+', 'States']].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-extrabold text-[#1D1D1F] text-lg sm:text-2xl tracking-tight">{num}</div>
                    <div className="text-[#AEAEB2] text-[10px] sm:text-xs font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="text-xs text-[#AEAEB2]">Scroll to explore</span>
        <ChevronDown className="text-[#D2D2D7] animate-bounce" size={16} />
      </motion.div>
    </section>
  )
}
