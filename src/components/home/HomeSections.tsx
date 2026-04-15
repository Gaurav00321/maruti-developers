'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Database, TrendingUp, Phone, MessageCircle, MapPin, Building2, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { STATES, INDUSTRIES, type Property } from '@/lib/supabase'

// ─── COVERAGE ──────────────────────────────────────────────────────────────
const states = [
  { name: 'Gujarat', estate: 'GIDC', cities: 'Vadodara, Ahmedabad, Surat, Bharuch, Sanand, Dholera SIR', industries: 'Chemical · Pharma · Engineering · Textiles', hot: true },
  { name: 'Maharashtra', estate: 'MIDC', cities: 'Pune, Chakan, Nashik, Aurangabad, Nagpur', industries: 'Auto · Engineering · Electronics' },
  { name: 'Rajasthan', estate: 'RIICO', cities: 'Jaipur, Bhiwadi, Neemrana, Alwar', industries: 'Auto Ancillary · Electronics · Food' },
  { name: 'Tamil Nadu', estate: 'SIPCOT', cities: 'Chennai, Hosur, Coimbatore, Sriperumbudur', industries: 'Auto · Electronics · Engineering' },
  { name: 'Karnataka', estate: 'KIADB', cities: 'Bengaluru, Hosur, Tumakuru', industries: 'Electronics · Aerospace · Industrial' },
  { name: 'NCR', estate: 'HSIIDC', cities: 'Manesar, Bawal, Rohtak, Gr. Noida, Ghaziabad', industries: 'Logistics · Auto · FMCG' },
  { name: 'Telangana/AP', estate: 'TSIIC/APIIC', cities: 'Hyderabad, Visakhapatnam', industries: 'Pharma · Life Sciences · Electronics' },
  { name: 'Other States', estate: 'On Request', cities: 'MP, Odisha, West Bengal, Kerala, Punjab', industries: 'We\'ll refer if we\'re not the right fit' },
]

export function CoverageSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const fadeInUp = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div {...fadeInUp}>
            <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Coverage<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-4 leading-tight sm:leading-tight">Pan-India coverage.<br /><span className="gradient-text">Local depth.</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto text-base sm:text-lg">
              Industrial, warehousing, commercial, and residential real estate across India's major manufacturing corridors.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {states.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.98 : 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`relative bg-[#F5F5F7] rounded-xl sm:rounded-2xl p-5 sm:p-6 group hover:bg-white hover:shadow-apple-lg hover:border-[#D2D2D7] transition-all duration-300 cursor-pointer border ${s.hot ? 'border-[#E8720C]/30 bg-white shadow-apple-md' : 'border-transparent'}`}
            >
              {s.hot && <span className="absolute -top-3 right-4 badge-gold text-[9px] px-2 py-0.5">HQ State</span>}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-bold text-[#1D1D1F] text-sm sm:text-base tracking-tight">{s.name}</h3>
                <span className="badge bg-[#E8E8ED] text-[#6E6E73] border-transparent text-[9px] sm:text-[10px]">{s.estate}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6E6E73] mb-2 leading-relaxed">{s.cities}</p>
              <p className="text-[10px] sm:text-xs text-[#AEAEB2]">{s.industries}</p>
              <Link href={`/properties?state=${encodeURIComponent(s.name)}`} className="mt-3 text-[10px] sm:text-xs text-[#E8720C] flex items-center gap-1 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                View inventory <ArrowRight size={10} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: mounted ? 0 : 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10 sm:mt-12 px-4">
          <Link href="/properties" className="btn-primary py-3.5 sm:py-4 px-6 sm:px-8 inline-flex text-sm sm:text-base w-full sm:w-auto justify-center">
            Show Me Live Inventory <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── NEXT-GEN ──────────────────────────────────────────────────────────────
const dataRoomItems = [
  'A data room with every document — not screenshots on WhatsApp',
  'Comparable transacted rates in the same estate',
  'State-vs-state recommendation specific to your industry',
  'Lease-vs-freehold explanation covering mortgage and transfer',
  'Honest answers to "what happens if we exit in 5 years?"',
]

export function NextGenSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const fadeInUp = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div {...fadeInUp}>
            <p className="section-label mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />For The Next-Gen Son</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl md:text-[2.75rem] text-[#1D1D1F] leading-tight sm:leading-tight tracking-tight mb-4 sm:mb-6">
              Your father signs.<br /><span className="gradient-text">You vet.</span><br />We respect that.
            </h2>
            <p className="text-[#424245] mb-4 leading-relaxed text-base sm:text-lg">
              You&apos;re the one Googling &quot;GIDC vs MIDC vs SIPCOT.&quot; You&apos;re the one who has to sit across from Papa and tell him whether this deal is clean.
            </p>
            <p className="text-[#86868B] text-sm sm:text-base mb-6 sm:mb-8">We&apos;ll give you what you actually need:</p>
            <ul className="space-y-3 mb-8 sm:mb-10">
              {dataRoomItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#424245] font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary py-3 sm:py-3.5 justify-center"><Database size={16} /> Get Data Room Access</Link>
              <Link href="/properties" className="btn-secondary py-3 sm:py-3.5 justify-center">Browse Properties</Link>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <div className="bg-white border border-[#E8E8ED] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-apple-lg">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F5F5F7] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                  <Database size={20} className="text-[#1D1D1F]" />
                </div>
                <h3 className="font-bold text-[#1D1D1F] text-base sm:text-lg mb-1 sm:mb-2">The Due-Diligence Pack</h3>
                <p className="text-[11px] sm:text-sm text-[#86868B]">Everything a smart son needs: &quot;Papa, this deal is clean.&quot;</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6">
                {['7/12 Utara / Patta / Khata', 'Encumbrance Certificate (EC)', 'NA Order + CLU Certificate', 'Zoning Certificate', 'RERA / Authority NOC', 'Mutation Extract', 'Independent Title Opinion', 'Landed-cost PDF'].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 sm:py-3 border-b border-[#E8E8ED] last:border-0">
                    <div className="w-4 h-4 rounded-full bg-[#34C759]/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-1 h-1 rounded-full bg-[#34C759]" />
                    </div>
                    <span className="text-[11px] sm:text-sm text-[#424245] font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── WAREHOUSE ─────────────────────────────────────────────────────────────
const warehouseLocations = ['Bhiwandi', 'Luhari', 'Farukhnagar', 'Hosur', 'Hoskote', 'Por-Padra', 'Chakan', 'Sriperumbudur']

export function WarehouseSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const fadeInUp = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <div className="bg-[#1D1D1F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <TrendingUp size={20} className="text-white" />
                <span className="font-bold text-white text-sm sm:text-base">Warehouse Yield Model</span>
                <span className="badge bg-white/10 text-white/80 border-white/20 text-[9px] sm:text-[10px]">8–10% Gross</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'CapEx (construction + land)', val: '₹X crore' },
                  { label: 'Monthly Rent (3PL tenant)', val: '₹X / sq ft' },
                  { label: 'Gross Yield', val: '8–10%' },
                  { label: 'Tenant Profile', val: 'Amazon / DHL / Flipkart' },
                  { label: 'Lease Term', val: '3–9 years' },
                  { label: 'Exit Cap Rate', val: 'Market-linked' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-0">
                    <span className="text-[11px] sm:text-sm text-white/50">{row.label}</span>
                    <span className="font-mono text-[11px] sm:text-sm text-white font-medium">{row.val}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/30 text-center mt-6">Actual figures shared on advisory call.</p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="order-1 lg:order-2">
            <p className="section-label mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Grade-A Warehousing</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl md:text-[2.75rem] text-[#1D1D1F] leading-tight sm:leading-tight tracking-tight mb-4 sm:mb-6">
              Want Amazon or Flipkart<br /><span className="gradient-text">paying you rent</span><br />every month?
            </h2>
            <p className="text-[#424245] mb-6 leading-relaxed text-base sm:text-lg">
              Built-to-suit warehouses across India&apos;s top logistics corridors. 30,000 to 5,00,000+ sq ft. Targeting 8–10% gross yield.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
              {warehouseLocations.map(loc => (
                <span key={loc} className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#F5F5F7] text-[#6E6E73] border border-[#E8E8ED]">{loc}</span>
              ))}
            </div>
            <Link href="/contact?type=warehouse" className="btn-primary py-3.5 sm:py-4 px-6 sm:px-8 inline-flex text-sm sm:text-base w-full sm:w-auto justify-center">
              Get Warehouse Yield Model <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FOUNDER ──────────────────────────────────────────────────────────────
export function FounderSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const fadeInUp = {
    initial: { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeInUp}
          className="bg-white border border-[#E8E8ED] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-apple-lg"
        >
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 items-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F5F5F7] border-2 border-[#E8E8ED] flex items-center justify-center mb-4 text-3xl sm:text-4xl shadow-sm">
                🏭
              </div>
              <div className="font-extrabold text-[#1D1D1F] text-base sm:text-lg tracking-tight">Vinod Jaiswal</div>
              <div className="text-[10px] sm:text-xs text-[#E8720C] font-semibold mb-2 sm:mb-3 uppercase tracking-wider">Director & Founder</div>
              <div className="badge-gold text-[9px] sm:text-[10px]">Industrial Land Developer</div>
            </div>

            <div className="md:col-span-2 text-center md:text-left">
              <div className="text-4xl sm:text-6xl text-[#E8720C]/10 leading-none mb-2 sm:mb-4 select-none">&ldquo;</div>
              <blockquote className="text-[#424245] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base italic font-medium">
                I&apos;ve been in Indian industrial real estate for 25 years. I&apos;ve seen enough wrecked deals — forged titles, vanishing brokers — to know this business needs advisors who pick up the phone when something goes wrong six months after the registry.
                <br /><br />
                <span className="text-[#E8720C] not-italic font-bold">Risk should be your business — not the paperwork.</span>
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919898610678" className="btn-primary py-3 sm:py-3.5 px-5 text-sm justify-center"><Phone size={14} /> +91 98986 10678</a>
                <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3 sm:py-3.5 px-5 text-sm justify-center"><MessageCircle size={14} /> WhatsApp Directly</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FEATURED PROPERTIES ──────────────────────────────────────────────────
function formatPrice(price?: number | null) {
  if (!price) return 'Price on Request'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`
  return `₹${price.toLocaleString('en-IN')}`
}

function formatSize(sqft?: number | null) {
  if (!sqft) return '—'
  if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} acres`
  return `${sqft.toLocaleString('en-IN')} sq ft`
}

const TYPE_LABELS: Record<string, string> = {
  industrial_land: 'Industrial Land', warehouse: 'Warehouse', shed: 'Industrial Shed',
  commercial: 'Commercial', agricultural: 'Agricultural',
}

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!properties.length) return null
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="section-label mb-2"><span className="w-6 h-px bg-[#E8720C]" />Live Inventory</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Featured Properties</h2>
          </div>
          <Link href="/properties" className="btn-ghost text-xs sm:text-sm hidden sm:flex">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {properties.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.98 : 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/properties/${p.slug || p.id}`} className="group block">
                <div className="bg-white border border-[#E8E8ED] rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-apple-lg transition-all duration-300">
                  <div className="relative h-40 sm:h-44 bg-[#F5F5F7] overflow-hidden">
                    {p.images?.[0]?.url ? (
                      <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Building2 size={32} className="text-[#E8E8ED]" /></div>
                    )}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1.5 flex-wrap">
                      <span className="badge bg-white/90 backdrop-blur-sm text-[9px] text-[#1D1D1F] font-bold border-transparent px-2 py-0.5">{TYPE_LABELS[p.type] || p.type}</span>
                      {p.verified && <span className="badge bg-[#0071E3] text-white text-[9px] font-bold border-transparent px-2 py-0.5">Verified</span>}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-[#86868B] text-[10px] sm:text-xs mb-2 truncate"><MapPin size={10} /> {p.city}, {p.state}</div>
                    <h3 className="font-bold text-[#1D1D1F] text-sm leading-snug mb-3 line-clamp-2 tracking-tight h-10">{p.title}</h3>
                    <div className="flex items-center justify-between border-t border-[#F5F5F7] pt-3">
                      <div>
                        <div className="font-mono font-bold text-[#1D1D1F] text-sm sm:text-base">{formatPrice(p.price)}</div>
                        <div className="text-[#AEAEB2] text-[10px] sm:text-xs">{formatSize(p.size_sqft)}</div>
                      </div>
                      {p.estate_name && <span className="badge-gold text-[9px] sm:text-[10px] whitespace-nowrap">{p.estate_name}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
           <Link href="/properties" className="btn-secondary w-full justify-center py-3 text-sm">View All Properties <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────
const faqs = [
  { q: "You're based in Gujarat — can you handle Tamil Nadu or NCR?", a: "Yes. Hub-and-spoke model: senior advisory team in Gujarat + vetted on-ground partners in every state. One point of contact, one accountable team." },
  { q: "GIDC vs MIDC vs SIPCOT — which state for my factory?", a: "Depends on your industry, input logistics, customer location, labour profile, and state incentives. We'll give you the honest comparison on the call." },
  { q: "What's a fair legal fee for due diligence?", a: "₹35,000–₹2,00,000 depending on deal size and state. We share a panel of independent lawyers — you pick. No referral fees from us." },
  { q: "What does a 99-year lease mean? Can I mortgage it?", a: "Yes to both. With the estate authority's standard transfer process — which differs by state. We'll walk you through the relevant sub-clauses." },
  { q: "I'm an NRI. How do you handle verification?", a: "Registered SPA (never blanket GPA), video walkthroughs, FEMA-compliant NRE/NRO routing. We'll send our NRI process document before you commit." },
  { q: "Are your deals white? We only do legal transactions.", a: "Yes. White. On the record. Stamp duty paid on actual value. If that's a dealbreaker, we're honestly not the right advisor." },
  { q: "How quickly can I see a shortlist?", a: "WhatsApp shortlist within 2 hours. Site visit within 48–72 hours in Gujarat, 3–5 days in other states." },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E8E8ED] last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 sm:py-6 text-left group">
        <span className="font-semibold text-[#1D1D1F] text-[13px] sm:text-base pr-4 group-hover:text-[#E8720C] transition-colors">{q}</span>
        <ChevronDown size={16} className={`text-[#AEAEB2] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 sm:pb-6 text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{a}</div>}
    </div>
  )
}

export function FAQSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#F5F5F7]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="section-label justify-center mb-2"><span className="w-6 h-px bg-[#E8720C]" />FAQ</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] leading-tight">Common questions,<br /><span className="gradient-text">straight answers.</span></h2>
        </div>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E8ED] px-5 sm:px-8 shadow-apple-sm">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────
const finalSchema = z.object({
  name: z.string().min(2, 'Name required'),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, 'Valid number required'),
  industry: z.string().optional(),
  preferred_state: z.string().optional(),
})
type FinalFormData = z.infer<typeof finalSchema>

export function FinalCTA() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FinalFormData>({
    resolver: zodResolver(finalSchema),
  })

  const onSubmit = async (data: FinalFormData) => {
    try {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source: 'footer' }) })
    } catch {}
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 bg-[#1D1D1F] overflow-hidden relative">
      {/* Background glow for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(232,114,12,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="inline-flex items-center gap-2 text-[#E8720C] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6"><span className="w-6 h-px bg-[#E8720C]/30" />Get Started<span className="w-6 h-px bg-[#E8720C]/30" /></p>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-[3.25rem] text-white leading-tight sm:leading-tight tracking-tight mb-4 sm:mb-6">
            Stop scrolling.<br /><span className="bg-gradient-to-r from-[#E8720C] to-[#F59E0B] bg-clip-text text-transparent">Start with a call.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 mb-8 sm:mb-12 leading-relaxed px-2">
            Tell us your industry, budget, preferred state. We&apos;ll tell you — honestly — whether now is the right time to buy.
          </p>

          {!submitted ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative group">
                    <input {...register('name')} placeholder="Full Name *" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E8720C] focus:bg-white/15 transition-all text-center sm:text-left" />
                    {errors.name && <p className="text-[10px] text-red-400 mt-1 text-center sm:text-left">{errors.name.message}</p>}
                  </div>
                  <div className="relative group">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-xs font-mono font-bold">+91</span>
                      <input {...register('whatsapp')} placeholder="WhatsApp *" type="tel" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm pl-12 focus:outline-none focus:border-[#E8720C] focus:bg-white/15 transition-all" maxLength={10} />
                    </div>
                    {errors.whatsapp && <p className="text-[10px] text-red-400 mt-1 text-center sm:text-left">{errors.whatsapp.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <select {...register('industry')} className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white/60 text-sm appearance-none focus:outline-none focus:border-[#E8720C] transition-all cursor-pointer">
                      <option value="" className="bg-[#1D1D1F]">Select Industry</option>{INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#1D1D1F]">{i}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select {...register('preferred_state')} className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white/60 text-sm appearance-none focus:outline-none focus:border-[#E8720C] transition-all cursor-pointer">
                      <option value="" className="bg-[#1D1D1F]">Preferred State</option>{STATES.map(s => <option key={s} value={s} className="bg-[#1D1D1F]">{s}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base bg-gradient-to-r from-[#E8720C] to-[#F59E0B] text-white hover:shadow-[0_0_20px_rgba(232,114,12,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 mt-2">
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin inline mr-2" /> Submitting...</> : <>Get My Free Plot Shortlist <ArrowRight size={18} className="inline ml-1" /></>}
                </button>
              </form>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-[#34C759]/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(52,199,89,0.1)]">
              <CheckCircle2 size={56} className="text-[#34C759] mx-auto mb-5" />
              <h3 className="font-bold text-xl sm:text-2xl text-white mb-2">You&apos;re on our shortlist!</h3>
              <p className="text-white/40 mb-8 max-w-sm mx-auto">One of our senior advisors will reach out via WhatsApp within 2 hours.</p>
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex py-3.5 px-8 text-sm"><MessageCircle size={18} /> Send Instant WhatsApp</a>
            </motion.div>
          )}

          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4">
            <p className="text-xs sm:text-sm text-white/30">
              Immediate requirement? Call <a href="tel:+919898610678" className="text-[#E8720C] font-bold hover:underline">+91 98986 10678</a>
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-lg">25+</span>
                <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Years</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-lg">2.5k</span>
                <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Clients</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
