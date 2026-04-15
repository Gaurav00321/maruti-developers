'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, ChevronDown, Building2, Home, Warehouse, Handshake, Search } from 'lucide-react'

const services = [
  { href: '/services/industrial-real-estate', label: 'Industrial Real Estate', icon: Building2, desc: 'GIDC, MIDC, SIPCOT land advisory' },
  { href: '/services/sell-property', label: 'Sell Property', icon: Home, desc: 'List & sell your industrial assets' },
  { href: '/services/buying-property', label: 'Buying Property', icon: Search, desc: 'Find verified industrial plots' },
  { href: '/services/rental-property', label: 'Rental Property', icon: Warehouse, desc: 'Warehouse & shed lease solutions' },
  { href: '/services/property-consultant', label: 'Property Consultant', icon: Handshake, desc: 'End-to-end advisory & due diligence' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Find Property' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setMobileServicesOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED] py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1D1D1F] flex items-center justify-center font-extrabold text-white text-[10px] sm:text-xs tracking-tight">
            MD
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1D1D1F] text-xs sm:text-sm leading-tight tracking-tight">Maruti Developers</span>
            <span className="text-[#86868B] text-[9px] sm:text-[10px] hidden sm:block">Since 1998 • Industrial Real Estate</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                pathname === link.href
                  ? 'text-[#1D1D1F] bg-[#F5F5F7]'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1 ${
                pathname.startsWith('/services')
                  ? 'text-[#1D1D1F] bg-[#F5F5F7]'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
              }`}
            >
              Our Services
              <ChevronDown size={13} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl border border-[#E8E8ED] shadow-2xl overflow-hidden"
                >
                  <div className="p-2">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors duration-150 group"
                      >
                        <div className="w-8 h-8 bg-[#F5F5F7] group-hover:bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                          <s.icon size={14} className="text-[#1D1D1F]" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1D1D1F] text-[13px]">{s.label}</div>
                          <div className="text-[11px] text-[#86868B] mt-0.5">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919898610678" className="flex items-center gap-2 text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors font-medium">
            <Phone size={13} />
            <span className="hidden xl:inline">+91 98986 10678</span>
            <span className="xl:hidden">Call</span>
          </a>
          <a
            href={`https://wa.me/919898610678?text=${encodeURIComponent('Hi, I need a property shortlist.')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary py-2 px-4 text-xs"
          >
            <MessageCircle size={13} />
            Free Shortlist
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F5F7] text-[#1D1D1F] active:scale-95 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-[#E8E8ED]"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-[#1D1D1F] bg-[#F5F5F7]'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center justify-between w-full"
              >
                Our Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    {services.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-3 px-8 py-2.5 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                      >
                        <s.icon size={14} />
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-3 border-t border-[#E8E8ED] grid grid-cols-2 gap-2 mt-2">
                <a href="tel:+919898610678" className="btn-secondary py-2.5 text-xs justify-center">
                  <Phone size={13} /> Call Now
                </a>
                <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-2.5 text-xs justify-center">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
