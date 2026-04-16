'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppBubble() {
  const [expanded, setExpanded] = useState(false)
  const waNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919898610678'

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-[#111113]/95 backdrop-blur-md border border-[#27272A] rounded-2xl p-6 w-80 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-80" />
            <p className="font-serif font-bold text-lg text-[#FAFAFA] mb-2 leading-tight">Expert Advisory 👋</p>
            <p className="text-sm text-[#A1A1AA] mb-5 font-sans leading-relaxed">
              Vinod Jaiswal is available on WhatsApp. Tell us your requirement and get a verified property shortlist in 2 hours.
            </p>
            <a
              href={`https://wa.me/${waNum}?text=${encodeURIComponent('Hi! I want to enquire about industrial property.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center py-3.5 text-sm shadow-[0_4px_15px_rgba(37,211,102,0.2)]"
              onClick={() => {
                if ((window as any).gtag) {
                  ;(window as any).gtag('event', 'whatsapp_click', { location: 'floating_bubble' })
                }
              }}
            >
              <MessageCircle size={18} className="mr-2" />
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#1EA855] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {expanded ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
