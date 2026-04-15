'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppBubble() {
  const [expanded, setExpanded] = useState(false)
  const waNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919898610678'

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-[#0C0C10] border border-[#1E1E28] rounded-2xl p-5 w-72 shadow-card"
          >
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#25D366] to-transparent rounded-t-2xl" />
            <p className="text-sm font-display font-600 text-white mb-1">Hi there! 👋</p>
            <p className="text-xs text-[#4b7c55] mb-4">
              Vinod Jaiswal is available on WhatsApp. Tell us your requirement and get a verified property shortlist in 2 hours.
            </p>
            <a
              href={`https://wa.me/${waNum}?text=${encodeURIComponent('Hi! I want to enquire about industrial property.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center py-3 text-sm"
              onClick={() => {
                if ((window as any).gtag) {
                  ;(window as any).gtag('event', 'whatsapp_click', { location: 'floating_bubble' })
                }
              }}
            >
              <MessageCircle size={16} />
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#1EA855] transition-all duration-200 hover:scale-110 active:scale-95 animate-pulse-green"
        aria-label="Chat on WhatsApp"
      >
        {expanded ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
