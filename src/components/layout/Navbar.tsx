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
  { href: '/properties', label: 'Properties' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/clients', label: 'Our Clients' },
  { href: '/reviews', label: 'Reviews' },
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
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setMenuOpen(false); setMobileServicesOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#09090B]/90 backdrop-blur-xl border-b border-[#27272A] py-2.5' : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#10B981] flex items-center justify-center font-extrabold text-white text-xs sm:text-sm tracking-tight font-serif shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-white text-sm sm:text-base leading-tight">Maruti Developers<sup className="text-[#10B981] text-[8px] ml-0.5">®</sup></span>
            <span className="text-[#52525B] text-[9px] sm:text-[10px] hidden sm:block font-sans">Since 1998 · Industrial Real Estate</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 font-sans ${
                pathname === link.href ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]'
              }`}
            >{link.label}</Link>
          ))}
          <div className="relative" ref={servicesRef}>
            <button onClick={() => setServicesOpen(!servicesOpen)}
              className={`px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 font-sans ${
                pathname.startsWith('/services') ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]'
              }`}
            >Services <ChevronDown size={13} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} /></button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-72 bg-[#111113] rounded-2xl border border-[#27272A] shadow-2xl overflow-hidden"
                >
                  <div className="p-2">
                    {services.map(s => (
                      <Link key={s.href} href={s.href} onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#18181B] transition-colors group"
                      >
                        <div className="w-8 h-8 bg-[#18181B] group-hover:bg-[#10B981]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                          <s.icon size={14} className="text-[#10B981]" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-[13px] font-sans">{s.label}</div>
                          <div className="text-[11px] text-[#52525B] mt-0.5 font-sans">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919898610678" className="flex items-center gap-2 text-[13px] text-[#52525B] hover:text-[#10B981] transition-colors font-medium font-sans">
            <Phone size={13} /><span className="hidden xl:inline">+91 98986 10678</span><span className="xl:hidden">Call</span>
          </a>
          <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-5 text-xs">
            <MessageCircle size={13} /> Free Shortlist
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#18181B] border border-[#27272A] text-white active:scale-95 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
        >{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed inset-0 top-0 z-40 bg-[#09090B] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#27272A]">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#10B981] flex items-center justify-center font-extrabold text-white text-xs font-serif">M</div>
                <span className="font-serif font-bold text-white text-sm">Maruti Developers<sup className="text-[#10B981] text-[8px] ml-0.5">®</sup></span>
              </Link>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#18181B] border border-[#27272A] text-white"
                onClick={() => setMenuOpen(false)}><X size={18} /></button>
            </div>
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all font-sans ${
                    pathname === link.href ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]'
                  }`}
                >{link.label}</Link>
              ))}
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="px-4 py-3.5 rounded-xl text-base font-medium text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-all flex items-center justify-between w-full font-sans"
              >Our Services <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    {services.map(s => (
                      <Link key={s.href} href={s.href} className="flex items-center gap-3 px-8 py-3 text-sm text-[#52525B] hover:text-[#10B981] transition-colors font-sans">
                        <s.icon size={14} className="text-[#10B981]" />{s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="pt-6 border-t border-[#27272A] grid grid-cols-2 gap-3 mt-4">
                <a href="tel:+919898610678" className="btn-secondary py-3 text-xs justify-center"><Phone size={14} /> Call Now</a>
                <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3 text-xs justify-center"><MessageCircle size={14} /> WhatsApp</a>
              </div>
              <div className="mt-6 pt-6 border-t border-[#27272A] space-y-3">
                <p className="text-xs text-[#52525B] font-sans">marutideveloper78@gmail.com</p>
                <p className="text-xs text-[#52525B] font-sans">Atlantic K-10, Vadodara, Gujarat — 390023</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
