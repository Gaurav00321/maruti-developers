'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

// Using all 35 gallery images
const images = Array.from({ length: 35 }, (_, i) => ({
  id: i + 6,
  src: `/images/gallery-images/${i + 6}.jpg`,
  alt: `Maruti Developers Industrial Premium Portfolio Property ${i + 6}`,
}))

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Masonry Grid */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 10) * 0.05 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl border border-[#27272A] mb-3 bg-[#111113]"
            onClick={() => setSelectedImage(img.src)}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-2 text-[#10B981] mb-2 bg-[#09090B]/80 backdrop-blur rounded-full px-3 py-1.5 w-max border border-[#27272A]">
                <ZoomIn size={14} /> <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#FAFAFA]">Enlarge</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090B]/95 backdrop-blur-xl p-4 sm:p-8"
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981] transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-[#111113] border border-[#27272A]"
              onClick={e => e.stopPropagation()}
            >
              <Image 
                src={selectedImage} 
                alt="Gallery preview" 
                fill 
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
