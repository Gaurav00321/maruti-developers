import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react'

const services = [
  'Industrial Land Development', 'Industrial Property Advisory',
  'Commercial Property', 'Real Estate Consulting',
  'Warehouse & Godowns', 'NRI Investment Advisory',
]

const states = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Karnataka', 'NCR', 'Telangana/AP']

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/clients', label: 'Our Clients' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-[#27272A]">
      {/* CTA Band */}
      <div className="border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_50%)] pointer-events-none" />
          <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[#FAFAFA] mb-4 leading-tight relative z-10">
            Let's Make Your Property Move <span className="gradient-text italic">Easy</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base mb-8 max-w-lg mx-auto font-sans relative z-10">
            Contact us today and experience a smooth, stress-free real estate process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/about" className="btn-secondary py-3.5 px-8 text-sm justify-center">
              About Maruti Developers
            </Link>
            <Link href="/contact" className="btn-primary py-3.5 px-8 text-sm justify-center shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center font-extrabold text-[#FAFAFA] text-sm font-serif shadow-[0_4px_15px_rgba(16,185,129,0.3)]">M</div>
              <div>
                <div className="font-serif font-bold text-[#FAFAFA] text-base">Maruti Developers<sup className="text-[#10B981] text-[8px] ml-0.5">®</sup></div>
                <div className="text-[#A1A1AA] text-xs font-sans">Since 1998</div>
              </div>
            </div>
            <p className="text-sm text-[#71717A] leading-relaxed mb-6 font-sans">
              Industrial Land Developers & Real Estate Advisors. 25+ years. 2,500+ clients. Pan-India. White-money only.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-all hover:scale-105 active:scale-95">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:marutideveloper78@gmail.com" className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-all hover:scale-105 active:scale-95">
                <Mail size={18} />
              </a>
              <a href="https://www.marutilanddevelopers.com" className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-all hover:scale-105 active:scale-95">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-[#FAFAFA] text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#71717A] hover:text-[#10B981] transition-colors font-sans">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="font-serif font-bold text-[#FAFAFA] text-sm mb-6 uppercase tracking-wider">Coverage</h4>
            <ul className="space-y-4">
              {states.map(s => (
                <li key={s}>
                  <Link href={`/properties?state=${s}`} className="text-sm text-[#71717A] hover:text-[#10B981] transition-colors font-sans">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-[#FAFAFA] text-sm mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center flex-shrink-0 mt-0.5"><Phone size={14} className="text-[#10B981]" /></div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919898610678" className="text-sm text-[#A1A1AA] hover:text-[#10B981] block font-medium font-sans">+91 98986 10678</a>
                  <a href="tel:+917878610678" className="text-sm text-[#71717A] hover:text-[#10B981] block font-sans">+91 78786 10678</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center flex-shrink-0 mt-0.5"><Mail size={14} className="text-[#10B981]" /></div>
                <div className="mt-1"><a href="mailto:marutideveloper78@gmail.com" className="text-sm text-[#71717A] hover:text-[#10B981] break-all font-sans">marutideveloper78@gmail.com</a></div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin size={14} className="text-[#10B981]" /></div>
                <address className="not-italic text-sm text-[#71717A] leading-relaxed font-sans mt-0.5">
                  Atlantic K-10, Office 225, 2nd Floor,<br />
                  Opp. Vadodara Central Mall,<br />
                  Vadodara, Gujarat — 390023
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#27272A] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#52525B] font-sans">
            <span>© {new Date().getFullYear()} Maruti Developers. All rights reserved.</span>
            <span>25+ Years · Vadodara, Gujarat</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#52525B] hover:text-[#10B981] transition-colors font-sans">Privacy</Link>
            <Link href="/contact" className="text-xs text-[#52525B] hover:text-[#10B981] transition-colors font-sans">Contact</Link>
            <Link href="/admin" className="text-xs text-[#27272A] hover:text-[#3F3F46] transition-colors font-sans">Admin</Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-[#52525B] text-center font-sans tracking-wide">
          All transactions are white-money, RERA-compliant. Maruti Developers acts as a facilitator. All property details subject to verification.
        </p>
      </div>
    </footer>
  )
}
