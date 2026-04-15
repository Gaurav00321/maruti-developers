'use client'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, ArrowRight, Phone, MessageCircle, Building2, Home, Warehouse, Handshake, Search, Loader2, MapPin, Shield, FileText, Users, ChevronDown } from 'lucide-react'

const serviceData: Record<string, {
  title: string
  headline: string
  subtitle: string
  icon: any
  features: string[]
  details: { title: string; desc: string; icon: any }[]
  cta: string
}> = {
  'industrial-real-estate': {
    title: 'Industrial Real Estate Agent & Consultant',
    headline: 'Industrial Real Estate\nAdvisory That Works.',
    subtitle: 'From GIDC to MIDC to SIPCOT — we help businesses find the right industrial land, sheds, and commercial plots with complete due diligence across India.',
    icon: Building2,
    features: ['GIDC / MIDC / SIPCOT / KIADB land advisory', 'Title verification & documentation', 'Zone-to-industry compatibility check', 'Pollution board consent guidance', 'NA/CLU conversion assistance', 'Post-purchase handholding'],
    details: [
      { title: 'Pan-India Network', desc: 'On-ground partners in 7+ states with deep knowledge of each industrial estate.', icon: MapPin },
      { title: 'White-Money Only', desc: 'Every transaction is fully on the record — stamp duty on actual value.', icon: Shield },
      { title: 'Full Documentation', desc: '7/12, patta, EC, NA order, CLU — complete document verification pack.', icon: FileText },
      { title: '2,500+ Clients', desc: 'Trusted by manufacturers, NRIs, and investors across India since 1998.', icon: Users },
    ],
    cta: 'Get Industrial Land Advisory',
  },
  'sell-property': {
    title: 'Sell Industrial Property',
    headline: 'Sell Your Industrial\nProperty Faster.',
    subtitle: 'List your industrial land, shed, warehouse, or commercial property with Maruti Developers. Get qualified buyers, fair valuation, and smooth documentation.',
    icon: Home,
    features: ['Free property valuation', 'Professional listing & marketing', 'Qualified buyer matching', 'Documentation & registry support', 'White-money transactions only', 'Pan-India buyer network'],
    details: [
      { title: 'Market Valuation', desc: 'Comparable transacted rates in the same estate — no guesswork.', icon: FileText },
      { title: 'Buyer Verification', desc: 'Every buyer is vetted for genuine intent and financial capability.', icon: Shield },
      { title: 'Wide Reach', desc: 'Your property reaches serious industrial buyers across 7+ states.', icon: MapPin },
      { title: 'Smooth Closure', desc: 'End-to-end support from listing to registry completion.', icon: Users },
    ],
    cta: 'List My Property for Sale',
  },
  'buying-property': {
    title: 'Buy Industrial Property',
    headline: 'Buy Industrial Property\nWithout the Risk.',
    subtitle: 'Verified industrial plots, sheds, and warehouses across India. Complete due diligence, landed-cost sheets, and honest advisory before you commit.',
    icon: Search,
    features: ['Verified property shortlist in 2 hours', 'Landed-cost sheet before commitment', 'Title & document verification', 'State-vs-state comparison', 'Lease vs freehold guidance', 'NRI-safe transaction process'],
    details: [
      { title: 'Quick Shortlist', desc: 'WhatsApp shortlist within 2 hours of your enquiry.', icon: MapPin },
      { title: 'Full Transparency', desc: 'Landed-cost PDF covering all charges before you visit.', icon: FileText },
      { title: 'Legal Safety', desc: 'Independent title opinion + complete document verification.', icon: Shield },
      { title: 'Expert Guidance', desc: '25+ years of experience guiding first-time and repeat buyers.', icon: Users },
    ],
    cta: 'Find Properties to Buy',
  },
  'rental-property': {
    title: 'Industrial Rental Property',
    headline: 'Rent Warehouses &\nIndustrial Sheds.',
    subtitle: 'Ready-to-move industrial sheds, godowns, and warehouses on rent across major industrial corridors. Short-term and long-term lease options.',
    icon: Warehouse,
    features: ['Warehouses from 5,000 to 5,00,000 sq ft', 'Ready-to-move sheds & godowns', 'Lease-term flexibility (3–15 years)', '3PL-grade facilities available', 'Highway-connected locations', 'Built-to-suit on request'],
    details: [
      { title: 'Prime Locations', desc: 'Bhiwandi, Chakan, Hosur, Por-Padra, and 20+ logistics corridors.', icon: MapPin },
      { title: 'Yield Advisory', desc: 'For investors — 8–10% gross yield models with tenant profiles.', icon: FileText },
      { title: 'Flexible Terms', desc: 'Lock-in periods, escalation clauses, and exit terms explained upfront.', icon: Shield },
      { title: 'Tenant Matching', desc: 'We match landlords with creditworthy tenants (Amazon, DHL, Flipkart grade).', icon: Users },
    ],
    cta: 'Find Rental Properties',
  },
  'property-consultant': {
    title: 'Industrial Property Consultant',
    headline: 'Your Industrial\nReal Estate Advisor.',
    subtitle: 'End-to-end consulting — from site selection and due diligence to factory license and pollution board consent. One advisor, one accountable team.',
    icon: Handshake,
    features: ['Site selection consulting', 'Due diligence & title verification', 'State incentive & subsidy guidance', 'Factory license assistance', 'Pollution board consent support', 'NRI advisory & FEMA compliance'],
    details: [
      { title: 'Industry Expert', desc: '25+ years of hands-on industrial real estate experience.', icon: Users },
      { title: 'State Comparison', desc: 'Honest Gujarat-vs-Maharashtra-vs-TN comparison for your industry.', icon: MapPin },
      { title: 'Subsidy Guidance', desc: 'Help navigate state industrial policy incentives and subsidies.', icon: FileText },
      { title: 'Trusted Advisor', desc: 'We say no to deals that don\'t work for you. That\'s our guarantee.', icon: Shield },
    ],
    cta: 'Book Advisory Consultation',
  },
}

const enquirySchema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit number required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  city: z.string().optional(),
  message: z.string().max(500).optional(),
})
type EnquiryData = z.infer<typeof enquirySchema>

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = serviceData[slug]
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryData>({
    resolver: zodResolver(enquirySchema),
  })

  if (!service) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 text-center py-40">
          <h1 className="font-extrabold text-3xl text-[#1D1D1F] mb-4">Service Not Found</h1>
          <p className="text-[#6E6E73]">The requested service page does not exist.</p>
        </div>
        <Footer />
      </main>
    )
  }

  const Icon = service.icon

  const onSubmit = async (data: EnquiryData) => {
    await fetch('/api/service-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, service: service.title }),
    })
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        {/* Hero */}
        <div className="py-12 sm:py-20 bg-[#F5F5F7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="badge-gold text-[10px] sm:text-xs mb-4 sm:mb-6">{service.title}</div>
                <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 sm:mb-6 whitespace-pre-line">
                  {service.headline}
                </h1>
                <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  {service.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#enquiry" className="btn-primary py-3.5 px-6 justify-center"><ArrowRight size={16} /> {service.cta}</a>
                  <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3.5 px-6 justify-center">
                    <MessageCircle size={16} /> WhatsApp Us
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8ED] shadow-lg"
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-[#1D1D1F]" />
                  </div>
                  <h2 className="font-bold text-[#1D1D1F] text-base sm:text-lg">What&apos;s Included</h2>
                </div>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#424245]">{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="py-12 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-16">
               <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Our Promise<span className="w-6 h-px bg-[#E8720C]" /></p>
              <h2 className="section-title text-3xl sm:text-4xl">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {service.details.map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#E8E8ED] rounded-2xl p-6 text-center hover:shadow-apple-lg hover:border-[#D2D2D7] transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <d.icon size={20} className="text-[#1D1D1F]" />
                  </div>
                  <h3 className="font-bold text-[#1D1D1F] text-sm sm:text-base mb-2">{d.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry" className="py-12 sm:py-20 lg:py-24 bg-[#F5F5F7]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12">
              <p className="section-label justify-center mb-3 sm:mb-4"><span className="w-6 h-px bg-[#E8720C]" />Enquire Now<span className="w-6 h-px bg-[#E8720C]" /></p>
              <h2 className="section-title text-3xl sm:text-4xl text-[#1D1D1F]">Get Expert Advice</h2>
              <p className="text-[#6E6E73] mt-3 text-sm sm:text-base px-2">Fill the form below and our advisor will reach you within 2 hours.</p>
            </div>

            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#E8E8ED] shadow-xl space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2 sm:mb-3">Full Name *</label>
                    <input {...register('name')} className="input" placeholder="Vinod Jaiswal" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2 sm:mb-3">Phone / WhatsApp *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AEAEB2] text-sm font-bold">+91</span>
                      <input {...register('phone')} className="input pl-12" placeholder="9898610678" type="tel" maxLength={10} />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2 sm:mb-3">Email Address</label>
                    <input {...register('email')} className="input" placeholder="you@company.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2 sm:mb-3">City / Location</label>
                    <input {...register('city')} className="input" placeholder="Vadodara" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2 sm:mb-3">Your Requirement</label>
                  <textarea {...register('message')} className="input min-h-[120px] resize-none py-4" placeholder="Tell us about your property requirement..." rows={4} />
                </div>

                <div className="bg-[#F5F5F7] rounded-xl p-4 flex items-center justify-center gap-2 border border-[#E8E8ED]">
                  <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Service: </span>
                  <span className="text-xs font-extrabold text-[#1D1D1F]">{service.title}</span>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 sm:py-5 text-sm sm:text-base shadow-lg shadow-[#1D1D1F]/10">
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin inline mr-2" /> Submitting...</> : <>{service.cta} <ArrowRight size={18} className="inline ml-2" /></>}
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-10 sm:p-14 border border-[#E8E8ED] shadow-xl text-center">
                <div className="w-16 h-16 bg-[#34C759]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-[#34C759]" />
                </div>
                <h3 className="font-extrabold text-2xl text-[#1D1D1F] mb-3">Enquiry Submitted!</h3>
                <p className="text-[#6E6E73] text-base leading-relaxed mb-10">Our senior advisor will contact you within 2 hours on WhatsApp to discuss your requirement.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+919898610678" className="btn-primary py-4 px-8 text-sm sm:text-base shadow-lg shadow-black/10"><Phone size={18} /> Call Advisor Now</a>
                  <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-4 px-8 text-sm sm:text-base shadow-lg shadow-[#25D366]/20">
                    <MessageCircle size={18} /> Instant WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

            <p className="text-center text-xs text-[#AEAEB2] mt-8 font-medium">
              Immediate requirement? Call directly: <a href="tel:+919898610678" className="text-[#E8720C] font-bold hover:underline transition-all">+91 98986 10678</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
