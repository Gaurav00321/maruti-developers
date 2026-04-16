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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-[#09090B]/90 backdrop-blur-xl" onClick={() => setIsVisible(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-[130] flex items-center justify-center p-4 xl:p-0 pointer-events-none">
            <div className="relative w-full max-w-md pointer-events-auto" role="dialog" aria-modal="true">
              <div className="bg-[#111113]/90 backdrop-blur-2xl border border-[#10B981]/30 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981]/15 rounded-full blur-[64px] -z-10 pointer-events-none" />
                
                <div className="p-8 sm:p-10 relative z-10">
                  <button onClick={() => setIsVisible(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B] border border-transparent hover:border-[#27272A] transition-all" aria-label="Close"><X size={18} /></button>

                  {!isSubmitted ? (
                    <>
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-[#09090B]/60 backdrop-blur border border-[#10B981]/20 text-[#10B981] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 font-mono shadow-sm">Free Advisory</div>
                        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAFAFA] leading-tight mb-3">
                          Get your free<br /><span className="gradient-text italic">plot shortlist</span> in 2 hours
                        </h2>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans mt-4">Tell us what you need. We'll WhatsApp you verified options with a complete landed-cost breakdown.</p>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative group">
                          <input {...register('name')} placeholder="Your Full Name" className="w-full px-5 py-4 rounded-xl bg-[#09090B]/60 backdrop-blur border border-[#27272A] text-[#FAFAFA] placeholder-[#71717A] text-sm focus:outline-none focus:border-[#10B981] transition-colors" autoComplete="name" />
                          {errors.name && <p className="text-[10px] text-red-500 mt-1 absolute -bottom-5">{errors.name.message}</p>}
                        </div>
                        <div className="relative group">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10B981] text-sm font-mono font-bold">+91</span>
                            <input {...register('whatsapp')} placeholder="WhatsApp Number" type="tel" className="w-full pl-12 pr-5 py-4 rounded-xl bg-[#09090B]/60 backdrop-blur border border-[#27272A] text-[#FAFAFA] placeholder-[#71717A] text-sm focus:outline-none focus:border-[#10B981] transition-colors" maxLength={10} autoComplete="tel" />
                          </div>
                          {errors.whatsapp && <p className="text-[10px] text-red-500 mt-1 absolute -bottom-5">{errors.whatsapp.message}</p>}
                        </div>
                        <div className="relative pt-2">
                          <select {...register('industry')} className="w-full px-5 py-4 rounded-xl bg-[#09090B]/60 backdrop-blur border border-[#27272A] text-[#A1A1AA] text-sm appearance-none focus:outline-none focus:border-[#10B981] cursor-pointer transition-colors">
                             <option value="" className="bg-[#111113]">Industry (Optional)</option>{INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#111113]">{i}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#10B981] pointer-events-none" />
                        </div>
                        <div className="relative">
                           <select {...register('preferred_state')} className="w-full px-5 py-4 rounded-xl bg-[#09090B]/60 backdrop-blur border border-[#27272A] text-[#A1A1AA] text-sm appearance-none focus:outline-none focus:border-[#10B981] cursor-pointer transition-colors">
                             <option value="" className="bg-[#111113]">Preferred State (Optional)</option>{STATES.map(s => <option key={s} value={s} className="bg-[#111113]">{s}</option>)}
                           </select>
                           <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#10B981] pointer-events-none" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center h-14 mt-4 shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
                          {isSubmitting ? <><Loader2 size={16} className="animate-spin mr-2" /> Submitting...</> : 'Get My Free Plot Shortlist'}
                        </button>
                        <p className="text-[10px] text-[#71717A] text-center font-mono uppercase tracking-wide mt-3">No spam. One WhatsApp from a senior advisor.</p>
                      </form>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                      <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#25D366]/30">
                         <CheckCircle2 size={32} className="text-[#25D366]" />
                      </div>
                      <h3 className="font-serif font-bold text-2xl text-[#FAFAFA] mb-2">Got it, {submittedData?.name?.split(' ')[0]}!</h3>
                      <p className="text-sm text-[#A1A1AA] mb-8 font-sans">Our advisor will WhatsApp you within 2 hours.</p>
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center h-12 shadow-[0_4px_20px_rgba(37,211,102,0.2)]"><MessageCircle size={18} /> Send a Quick WhatsApp</a>
                      <button onClick={() => setIsVisible(false)} className="btn-ghost w-full justify-center mt-4 text-xs">Close Window</button>
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
