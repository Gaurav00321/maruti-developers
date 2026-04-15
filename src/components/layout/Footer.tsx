import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react'

const services = [
  'Industrial Land Development', 'Industrial Property Advisory',
  'Commercial Property', 'Real Estate Consulting',
  'Warehouse & Godowns', 'NRI Investment Advisory',
]

const states = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Karnataka', 'NCR', 'Telangana/AP']

export function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E8E8ED]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] flex items-center justify-center font-extrabold text-white text-xs">MD</div>
              <div>
                <div className="font-extrabold text-[#1D1D1F] text-base tracking-tight">Maruti Developers</div>
                <div className="text-[#86868B] text-xs">Since 1998</div>
              </div>
            </div>
            <p className="text-sm text-[#6E6E73] leading-relaxed mb-5">
              Industrial Land Developers & Real Estate Advisors. 25+ years. 2,500+ clients. Pan-India. White-money only.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-all">
                <MessageCircle size={16} />
              </a>
              <a href="mailto:marutideveloper78@gmail.com" className="w-9 h-9 rounded-full bg-[#E8E8ED] flex items-center justify-center text-[#6E6E73] hover:bg-[#D2D2D7] transition-all">
                <Mail size={16} />
              </a>
              <a href="https://www.marutilanddevelopers.com" className="w-9 h-9 rounded-full bg-[#E8E8ED] flex items-center justify-center text-[#6E6E73] hover:bg-[#D2D2D7] transition-all">
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[#1D1D1F] text-sm mb-5 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="font-bold text-[#1D1D1F] text-sm mb-5 uppercase tracking-wider">Coverage</h4>
            <ul className="space-y-3">
              {states.map(s => (
                <li key={s}>
                  <Link href={`/properties?state=${s}`} className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#1D1D1F] text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#1D1D1F] mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+919898610678" className="text-sm text-[#424245] hover:text-[#1D1D1F] block font-medium">+91 98986 10678</a>
                  <a href="tel:+917878610678" className="text-sm text-[#86868B] hover:text-[#1D1D1F] block">+91 78786 10678</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#1D1D1F] mt-1 flex-shrink-0" />
                <a href="mailto:marutideveloper78@gmail.com" className="text-sm text-[#424245] hover:text-[#1D1D1F] break-all">marutideveloper78@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#1D1D1F] mt-1 flex-shrink-0" />
                <address className="not-italic text-sm text-[#6E6E73] leading-relaxed">
                  Atlantic K-10, Office 225, 2nd Floor,<br />
                  Opp. Vadodara Central Mall,<br />
                  Vadodara, Gujarat — 390023
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#D2D2D7] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#86868B]">
            <span>© {new Date().getFullYear()} Maruti Developers. All rights reserved.</span>
            <span>18+ Years · Vadodara, Gujarat</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors">Privacy</Link>
            <Link href="/contact" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors">Contact</Link>
            <Link href="/admin" className="text-xs text-[#D2D2D7] hover:text-[#86868B] transition-colors">Admin</Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#AEAEB2] text-center">
          All transactions are white-money, RERA-compliant. Maruti Developers acts as a facilitator. All property details subject to verification.
        </p>
      </div>
    </footer>
  )
}
