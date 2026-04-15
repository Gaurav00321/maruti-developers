'use client'

import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { STATES, INDUSTRIES } from '@/lib/supabase'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
  industry: z.string().optional(),
  preferred_state: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const STORAGE_KEY = 'md_popup_last_shown'
const COOLDOWN_DAYS = 7

export function LeadMagnetPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const triggeredRef = useRef(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const lastShown = localStorage.getItem(STORAGE_KEY)
    if (lastShown) {
      const diff = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24)
      if (diff < COOLDOWN_DAYS) return
    }
    const trigger = () => {
      if (triggeredRef.current) return
      triggeredRef.current = true
      setIsVisible(true)
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    }
    const timer = setTimeout(trigger, 30000)
    const onScroll = () => { if (window.scrollY / (document.body.scrollHeight - window.innerHeight) > 0.6) trigger() }
    const onMouseOut = (e: MouseEvent) => { if (e.clientY < 0) trigger() }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseOut)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); document.removeEventListener('mouseleave', onMouseOut) }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsVisible(false) }
    if (isVisible) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible])

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source: 'popup' }) })
      setSubmittedData(data)
      setIsSubmitted(true)
      if ((window as any).gtag) (window as any).gtag('event', 'lead_submit', { source: 'popup' })
    } catch (err) { console.error('Lead submission failed:', err) }
  }

  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919898610678'}?text=${encodeURIComponent(`Hi! I'm interested in industrial property. My name is ${submittedData?.name}.`)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsVisible(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="relative w-full max-w-md pointer-events-auto" role="dialog" aria-modal="true">
              <div className="bg-white rounded-3xl shadow-apple-xl border border-[#E8E8ED] overflow-hidden">
                <div className="p-8">
                  <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#AEAEB2] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all" aria-label="Close"><X size={16} /></button>

                  {!isSubmitted ? (
                    <>
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] text-[#6E6E73] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">Free — No Obligation</div>
                        <h2 className="font-extrabold text-2xl text-[#1D1D1F] leading-tight mb-2 tracking-tight">
                          Get your free<br /><span className="gradient-text">plot shortlist</span> in 2 hours
                        </h2>
                        <p className="text-sm text-[#86868B]">Tell us what you need. We&apos;ll WhatsApp you verified options with landed-cost breakdown.</p>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                          <input {...register('name')} placeholder="Your Full Name" className="input" autoComplete="name" />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AEAEB2] text-sm">+91</span>
                          <input {...register('whatsapp')} placeholder="WhatsApp Number" type="tel" className="input pl-14" maxLength={10} autoComplete="tel" />
                          {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp.message}</p>}
                        </div>
                        <select {...register('industry')} className="input appearance-none"><option value="">Industry (Optional)</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select>
                        <select {...register('preferred_state')} className="input appearance-none"><option value="">Preferred State (Optional)</option>{STATES.map(s => <option key={s} value={s}>{s}</option>)}</select>
                        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base">
                          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Get My Free Plot Shortlist'}
                        </button>
                        <p className="text-xs text-[#AEAEB2] text-center">No spam. One WhatsApp from a senior advisor.</p>
                      </form>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                      <div className="w-16 h-16 bg-[#34C759]/10 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="text-[#34C759]" size={32} /></div>
                      <h3 className="font-bold text-xl text-[#1D1D1F] mb-2">Got it, {submittedData?.name?.split(' ')[0]}!</h3>
                      <p className="text-sm text-[#86868B] mb-6">Our advisor will WhatsApp you within 2 hours.</p>
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center py-4"><MessageCircle size={18} /> Send a Quick WhatsApp</a>
                      <button onClick={() => setIsVisible(false)} className="btn-ghost w-full justify-center mt-3 text-xs">Close</button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
