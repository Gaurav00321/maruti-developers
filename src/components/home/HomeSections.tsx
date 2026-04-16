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

// ─── BACKGROUND GLOW UTILITY ────────────────────────────────────────────────
const GlowBackground = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
)

// ─── COVERAGE ──────────────────────────────────────────────────────────────
const states = [
  { name: 'Gujarat', estate: 'GIDC', cities: 'Vadodara, Ahmedabad, Surat, Bharuch, Sanand', industries: 'Chemical · Pharma · Engineering', hot: true },
  { name: 'Maharashtra', estate: 'MIDC', cities: 'Pune, Chakan, Nashik, Aurangabad', industries: 'Auto · Engineering · Electronics' },
  { name: 'Rajasthan', estate: 'RIICO', cities: 'Jaipur, Bhiwadi, Neemrana', industries: 'Auto Ancillary · Electronics' },
  { name: 'Tamil Nadu', estate: 'SIPCOT', cities: 'Chennai, Hosur, Coimbatore', industries: 'Auto · Electronics · Engineering' },
  { name: 'Karnataka', estate: 'KIADB', cities: 'Bengaluru, Hosur, Tumakuru', industries: 'Electronics · Aerospace' },
  { name: 'NCR', estate: 'HSIIDC', cities: 'Manesar, Bawal, Rohtak', industries: 'Logistics · Auto' },
  { name: 'Telangana/AP', estate: 'TSIIC', cities: 'Hyderabad, Visakhapatnam', industries: 'Pharma · Life Sciences' },
  { name: 'Other States', estate: 'On Request', cities: 'MP, Odisha, West Bengal', industries: 'Strategic partnerships' },
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
    <section className="py-24 lg:py-32 bg-[#111113] border-t border-[#27272A] relative">
      <GlowBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <motion.div {...fadeInUp}>
            <p className="section-label justify-center">
              <span className="w-6 h-px bg-[#10B981]" /> 04 — Coverage <span className="w-6 h-px bg-[#10B981]" />
            </p>
            <h2 className="section-title text-3xl sm:text-[2.75rem] md:text-[3.5rem] mb-6">
              Pan-India coverage.<br /><span className="gradient-text italic">Local depth.</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-base sm:text-lg">
              Industrial, warehousing, and commercial real estate across India's major manufacturing corridors.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {states.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.98 : 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`relative bg-[#09090B] rounded-3xl p-8 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer border ${s.hot ? 'border-[#10B981]/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-[#27272A]'}`}
            >
              {s.hot && <span className="absolute -top-3 right-6 badge badge-accent px-4 py-1.5 shadow-md">HQ State</span>}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif font-bold text-[#FAFAFA] text-xl tracking-wide">{s.name}</h3>
                <span className="badge bg-[#18181B] border border-[#27272A] text-[#A1A1AA] px-3 py-1 font-mono uppercase tracking-wider text-[10px]">{s.estate}</span>
              </div>
              <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed font-sans">{s.cities}</p>
              <p className="text-xs text-[#71717A] font-sans uppercase tracking-wider font-semibold">{s.industries}</p>
              <Link href={`/properties?state=${encodeURIComponent(s.name)}`} className="mt-6 text-sm text-[#10B981] flex items-center gap-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity font-sans">
                View inventory <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: mounted ? 0 : 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14 px-4">
          <Link href="/properties" className="btn-primary inline-flex h-12 shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
            Show Me Live Inventory <ArrowRight size={18} />
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
    <section className="py-24 lg:py-32 bg-[#09090B] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
             <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#27272A] shadow-2xl">
               <Image src="/images/gallery-images/17.jpg" alt="Due Diligence Review" fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-[#111113]/80 backdrop-blur-xl border border-[#27272A] shadow-xl">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center border border-[#10B981]/30">
                       <Database size={20} className="text-[#10B981]" />
                    </div>
                    <div>
                       <h4 className="font-serif font-bold text-[#FAFAFA] text-lg">The Advisory Room</h4>
                       <p className="text-xs text-[#A1A1AA] uppercase tracking-widest font-mono">Real-Time Data</p>
                    </div>
                 </div>
                 <p className="text-sm text-[#A1A1AA] font-sans leading-relaxed">
                   Every legal document is vetted. We send you the clear Title Opinion PDF, not just a bunch of loose photos on WhatsApp.
                 </p>
               </div>
             </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
            <p className="section-label mb-5">
              <span className="w-6 h-px bg-[#10B981]" /> 05 — Full Diligence
            </p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-[3.5rem] mb-6">
              Your father signs.<br /><span className="gradient-text italic">You vet.</span><br />We respect that.
            </h2>
            <p className="text-[#A1A1AA] mb-6 leading-relaxed text-base sm:text-lg text-justify pr-0 lg:pr-8">
              You're the one Googling "GIDC vs MIDC vs SIPCOT." You're the one who has to sit across from Papa and tell him whether this deal is clean.
            </p>
            <p className="text-[#FAFAFA] font-bold text-sm sm:text-base mb-6 font-serif tracking-wide">We'll give you what you actually need:</p>
            <ul className="space-y-4 mb-12">
              {dataRoomItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0 mt-2.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-base text-[#A1A1AA]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary justify-center"><Database size={18} /> Get Data Room Access</Link>
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
    <section className="py-24 lg:py-32 bg-[#111113] border-t border-[#27272A] relative">
      <GlowBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div {...fadeInUp} className="order-1">
             <p className="section-label mb-5">
              <span className="w-6 h-px bg-[#10B981]" /> 06 — Grade-A Yields
            </p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-[3.5rem] mb-6">
              Want Amazon or Flipkart<br /><span className="gradient-text italic">paying you rent</span><br />every month?
            </h2>
            <p className="text-[#A1A1AA] mb-8 leading-relaxed text-base sm:text-lg">
              Built-to-suit warehouses across India's top logistics corridors. 30,000 to 5,00,000+ sq ft. Targeting 8–10% gross yield.
            </p>
            
            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 mb-10 shadow-dark-md">
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                     <TrendingUp size={20} className="text-[#10B981]" />
                     <span className="font-serif font-bold text-[#FAFAFA] text-lg">Warehouse Yield Model</span>
                   </div>
                   <span className="badge badge-accent px-3 py-1">8–10% Gross</span>
                 </div>
                 <div className="space-y-1">
                   {[
                     { label: 'CapEx (construction + land)', val: '₹X crore' },
                     { label: 'Monthly Rent (3PL tenant)', val: '₹X / sq ft' },
                     { label: 'Lease Term', val: '3–9 years' },
                   ].map((row) => (
                     <div key={row.label} className="flex justify-between items-center py-3 border-b border-[#27272A] last:border-0">
                       <span className="text-sm text-[#A1A1AA]">{row.label}</span>
                       <span className="font-mono text-sm text-[#FAFAFA] font-bold">{row.val}</span>
                     </div>
                   ))}
                 </div>
            </div>

            <Link href="/contact?type=warehouse" className="btn-primary inline-flex justify-center w-full sm:w-auto h-12 shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
              Get Yield Model Details <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="order-2">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#27272A] shadow-2xl">
               <Image src="/images/gallery-images/19.jpg" alt="Grade-A Warehouse Portfolio" fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-10 inset-x-10">
                 <div className="flex flex-wrap gap-2.5">
                   {warehouseLocations.map(loc => (
                     <span key={loc} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#111113]/80 backdrop-blur-md text-[#FAFAFA] border border-[#27272A] hover:border-[#10B981]/50 transition-colors uppercase tracking-wide">
                       {loc}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
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
    <section className="py-24 lg:py-32 bg-[#09090B] border-t border-[#27272A] relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div {...fadeInUp} className="card-glass overflow-hidden !p-0 border-[#10B981]/20">
          <div className="p-10 sm:p-16 lg:p-20 grid md:grid-cols-12 gap-12 items-center relative">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/gallery-images/22.jpg')] bg-cover mix-blend-overlay" />

            <div className="md:col-span-4 flex flex-col items-center text-center relative z-10">
              <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-[2rem] bg-[#18181B] border border-[#10B981]/30 flex items-center justify-center p-2 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                 <Image src="/images/gallery-images/11.jpg" alt="Vinod Jaiswal" fill className="object-cover rounded-[1.5rem]" />
              </div>
              <div className="font-serif font-bold text-[#FAFAFA] text-2xl tracking-tight mb-1">Vinod Jaiswal</div>
              <div className="text-xs text-[#10B981] font-bold mb-4 uppercase tracking-widest font-mono">Director & Founder</div>
              <div className="badge badge-accent px-5 py-1.5 shadow-sm">Industrial Specialist</div>
            </div>

            <div className="md:col-span-8 text-center md:text-left relative z-10">
              <div className="text-7xl sm:text-9xl text-[#10B981]/10 leading-none mb-4 select-none font-serif h-12">&ldquo;</div>
              <blockquote className="text-[#FAFAFA] leading-relaxed mb-10 text-lg lg:text-2xl italic font-serif opacity-95 relative z-10">
                I've been in Indian industrial real estate for 25 years. I've seen enough wrecked deals — forged titles, vanishing brokers — to know this business needs advisors who pick up the phone when something goes wrong six months after the registry.
                <br /><br />
                <span className="text-[#10B981] font-bold underline decoration-[#10B981]/30 underline-offset-4">Risk should be your business — not the paperwork.</span>
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="tel:+919898610678" className="btn-secondary px-8 h-12 flex items-center"><Phone size={16} className="mr-2" /> Call Vinod</a>
                <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-8 h-12 flex items-center"><MessageCircle size={16} className="mr-2" /> WhatsApp Directly</a>
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
  if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} Ac`
  return `${sqft.toLocaleString('en-IN')} sq ft`
}

const TYPE_LABELS: Record<string, string> = {
  industrial_land: 'Industrial Land', warehouse: 'Warehouse', shed: 'Industrial Shed', commercial: 'Commercial', agricultural: 'Agricultural',
}

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!properties.length) return null
  return (
    <section className="py-24 lg:py-32 bg-[#111113] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label mb-5"><span className="w-6 h-px bg-[#10B981]" /> 07 — Live Inventory</p>
            <h2 className="section-title text-4xl text-[#FAFAFA]">Featured Properties</h2>
          </div>
          <Link href="/properties" className="btn-secondary flex w-max items-center h-12 px-6">View All Portfolio <ArrowRight size={16} className="ml-2" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.98 : 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="h-full">
              <Link href={`/properties/${p.slug || p.id}`} className="group block h-full">
                <div className="card h-full !p-0 overflow-hidden flex flex-col group-hover:border-[#10B981]/50 transition-all duration-300 shadow-dark-md group-hover:shadow-2xl bg-[#09090B]">
                  <div className="relative h-56 bg-[#18181B] overflow-hidden">
                    {p.images?.[0]?.url ? (
                      <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Building2 size={32} className="text-[#3F3F46]" /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                      <span className="badge bg-[#111113]/80 backdrop-blur-md text-xs text-[#FAFAFA] border border-[#27272A] px-3 py-1 shadow-sm">{TYPE_LABELS[p.type] || p.type}</span>
                      {p.verified && <span className="badge badge-accent px-3 py-1 text-xs shadow-sm">Verified</span>}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#10B981] text-xs mb-3 truncate font-mono uppercase tracking-widest font-semibold"><MapPin size={12} /> {p.city}, {p.state}</div>
                    <h3 className="font-serif font-bold text-[#FAFAFA] text-lg leading-snug mb-5 line-clamp-2 group-hover:text-[#10B981] transition-colors">{p.title}</h3>
                    <div className="mt-auto flex items-end justify-between border-t border-[#27272A] pt-5">
                      <div>
                        <div className="text-[11px] text-[#71717A] font-mono mb-1 uppercase tracking-widest">{formatSize(p.size_sqft)}</div>
                        <div className="font-mono font-bold text-[#10B981] text-xl">{formatPrice(p.price)}</div>
                      </div>
                      {p.estate_name && <span className="badge bg-[#18181B] border-[#27272A] text-[#A1A1AA] text-[10px] sm:text-xs px-2.5 py-1 whitespace-nowrap">{p.estate_name}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
    <div className="border-b border-[#27272A] last:border-0 hover:bg-[#18181B]/50 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 sm:p-8 text-left group gap-4">
        <span className={`font-serif font-bold text-lg sm:text-xl pr-4 transition-colors ${open ? 'text-[#10B981]' : 'text-[#FAFAFA] group-hover:text-[#10B981]'}`}>{q}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${open ? 'bg-[#10B981] border-[#10B981] text-[#fff]' : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] group-hover:border-[#10B981] group-hover:text-[#10B981]'}`}>
           <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && <div className="px-6 sm:px-8 pb-8 pt-0 text-base text-[#A1A1AA] leading-relaxed scale-y-100 origin-top animate-fade-in font-sans">{a}</div>}
    </div>
  )
}

export function FAQSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#09090B] border-t border-[#27272A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <p className="section-label justify-center mb-5"><span className="w-6 h-px bg-[#10B981]" /> 08 — FAQ</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[3.5rem] leading-tight mb-6">
            Common questions,<br /><span className="gradient-text italic">straight answers.</span>
          </h2>
        </div>
        <div className="bg-[#111113] rounded-[2rem] border border-[#27272A] shadow-2xl overflow-hidden">
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
    <section id="contact" className="py-24 lg:py-32 bg-[#111113] overflow-hidden relative border-t border-[#27272A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label justify-center mb-6"><span className="w-6 h-px bg-[#10B981]" /> Get Started <span className="w-6 h-px bg-[#10B981]" /></p>
          <h2 className="font-serif font-bold text-4xl md:text-[4.5rem] text-[#FAFAFA] leading-tight tracking-tight mb-8">
            Stop scrolling.<br /><span className="gradient-text italic">Start with a call.</span>
          </h2>
          <p className="text-lg text-[#A1A1AA] mb-14 leading-relaxed font-sans max-w-2xl mx-auto">
            Tell us your industry, budget, preferred state. We'll tell you — honestly — whether now is the right time to buy.
          </p>

          {!submitted ? (
            <div className="bg-[#09090B]/80 backdrop-blur-2xl border border-[#10B981]/20 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_40px_rgba(16,185,129,0.1)] max-w-3xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/gallery-images/22.jpg')] mix-blend-overlay" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input {...register('name')} placeholder="Full Name *" className="input h-14 bg-[#18181B] border-[#27272A]" />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1.5 text-left absolute -bottom-5 font-medium">{errors.name.message}</p>}
                  </div>
                  <div className="relative group">
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10B981] text-sm font-mono font-bold">+91</span>
                      <input {...register('whatsapp')} placeholder="WhatsApp *" type="tel" className="input h-14 bg-[#18181B] border-[#27272A] pl-14" maxLength={10} />
                    </div>
                    {errors.whatsapp && <p className="text-[10px] text-red-500 mt-1.5 text-left absolute -bottom-5 font-medium">{errors.whatsapp.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="relative">
                    <select {...register('industry')} className="input h-14 bg-[#18181B] border-[#27272A] appearance-none cursor-pointer">
                      <option value="" className="bg-[#111113]">Select Industry</option>{INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#111113]">{i}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#10B981] pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select {...register('preferred_state')} className="input h-14 bg-[#18181B] border-[#27272A] appearance-none cursor-pointer">
                      <option value="" className="bg-[#111113]">Preferred State</option>{STATES.map(s => <option key={s} value={s} className="bg-[#111113]">{s}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#10B981] pointer-events-none" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full h-14 justify-center text-base mt-6 shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin inline mr-2" /> Submitting...</> : <>Get My Free Plot Shortlist <ArrowRight size={18} className="inline ml-1" /></>}
                </button>
              </form>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#09090B] border border-[#25D366]/30 rounded-[2.5rem] p-12 shadow-[0_0_40px_rgba(37,211,102,0.1)] max-w-2xl mx-auto">
              <CheckCircle2 size={64} className="text-[#25D366] mx-auto mb-6" />
              <h3 className="font-serif font-bold text-3xl text-[#FAFAFA] mb-4">You're on our shortlist!</h3>
              <p className="text-[#A1A1AA] mb-8 text-lg font-sans">One of our senior advisors will reach out via WhatsApp within 2 hours.</p>
              <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex justify-center h-14 px-10 text-base shadow-[0_8px_30px_rgba(37,211,102,0.3)]"><MessageCircle size={20} className="mr-2" /> Message Us Now</a>
            </motion.div>
          )}

          <div className="mt-20 flex flex-col items-center gap-8">
            <p className="text-sm text-[#71717A] font-mono tracking-wide uppercase">
               Immediate requirement? Call <a href="tel:+919898610678" className="text-[#10B981] font-bold hover:underline ml-1">+91 98986 10678</a>
            </p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col items-center">
                <span className="font-serif font-bold text-3xl text-[#10B981]">25+</span>
                <span className="text-[#71717A] text-[10px] uppercase font-bold tracking-widest mt-2">Years</span>
              </div>
              <div className="w-px h-12 bg-[#27272A]" />
              <div className="flex flex-col items-center">
                <span className="font-serif font-bold text-3xl text-[#10B981]">2.5k</span>
                <span className="text-[#71717A] text-[10px] uppercase font-bold tracking-widest mt-2">Clients</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
