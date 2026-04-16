'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const heroImages = [
  '/images/gallery-images/23.jpg',
  '/images/gallery-images/24.jpg',
  '/images/gallery-images/25.jpg',
  '/images/gallery-images/26.jpg',
  '/images/gallery-images/27.jpg',
]

const stats = [
  { num: '25+', label: 'Years Experience' },
  { num: '2,500+', label: 'Happy Clients' },
  { num: '7+', label: 'States Covered' },
  { num: '99%', label: 'Client Satisfaction' },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const fadeIn = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 30 : 0 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background Image Slides */}
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={`hero-slide ${i === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Emerald accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent z-20 opacity-40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
          <div className="max-w-4xl">
            {/* Label */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6 lg:mb-8"
            >
              <span className="text-[#10B981] font-mono text-sm font-medium">01</span>
              <span className="w-8 h-[1px] bg-[#10B981]" />
              <span className="text-[#10B981] text-xs font-semibold tracking-[0.2em] uppercase font-sans">
                Industrial Real Estate
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-bold text-[2.75rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] text-[#FAFAFA] leading-[1.05] tracking-tight mb-6 lg:mb-8 text-shadow-xl"
            >
              Building Industrial{' '}
              <span className="gradient-text italic">Dreams,</span>{' '}
              One Property at a Time
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A1A1AA] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 lg:mb-12 max-w-2xl font-sans"
            >
              We connect businesses with their perfect industrial spaces through professional support & expertise across India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link href="/properties" className="btn-primary py-4 px-8 text-sm sm:text-base justify-center sm:justify-start">
                Explore Properties <ArrowRight size={18} />
              </Link>
              <Link href="#services" className="btn-secondary py-4 px-8 text-sm sm:text-base justify-center sm:justify-start">
                Our Services
              </Link>
            </motion.div>

            {/* Quick contact */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <a href="tel:+919898610678" className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#10B981] transition-colors font-sans">
                <Phone size={14} className="text-[#10B981]" /> +91 98986 10678
              </a>
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#25D366] transition-colors font-sans">
                <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp Now
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar at Bottom */}
        <motion.div
          initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-[#09090B]/80 backdrop-blur-xl border-t border-[#27272A]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {stats.map(({ num, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="font-serif font-bold text-[#10B981] text-2xl sm:text-3xl tracking-tight">{num}</div>
                  <div className="text-[#71717A] text-xs sm:text-sm font-sans mt-1 uppercase tracking-wide font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Slide Controls */}
        <div className="absolute bottom-32 right-4 sm:right-8 z-20 flex items-center gap-3">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-[#27272A] bg-[#09090B]/60 backdrop-blur-md flex items-center justify-center text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981] transition-all">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'bg-[#10B981] w-6' : 'bg-[#3F3F46] hover:bg-[#71717A]'
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-[#27272A] bg-[#09090B]/60 backdrop-blur-md flex items-center justify-center text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#71717A] font-sans tracking-wide uppercase">Scroll to explore</span>
          <ChevronDown className="text-[#71717A] animate-bounce mt-1" size={16} />
        </motion.div>
      </div>
    </section>
  )
}
