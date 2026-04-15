import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Building2, ArrowLeft, MessageCircle, Phone, CheckCircle2, Zap, Droplets, TrainFront, Factory, FileCheck, Share2, Ruler, Route, Map } from 'lucide-react'

export const revalidate = 300

interface Props { params: { id: string } }

function formatPrice(price?: number | null, onRequest?: boolean) {
  if (onRequest || !price) return 'Price on Request'
  if (price >= 10000000) return `?${(price / 10000000).toFixed(2)} Crore`
  if (price >= 100000) return `?${(price / 100000).toFixed(0)} Lakh`
  return `?${price.toLocaleString('en-IN')}`
}
function formatSize(sqft?: number | null) {
  if (!sqft) return null
  const acres = (sqft / 43560).toFixed(2)
  return { sqft: sqft.toLocaleString('en-IN'), acres }
}

async function getProperty(id: string) {
  const supabase = createSupabaseAdminClient()
  let { data } = await supabase.from('properties').select('*').eq('slug', id).eq('status', 'active').single()
  if (!data) {
    const res = await supabase.from('properties').select('*').eq('id', id).eq('status', 'active').single()
    data = res.data
  }
  return data
}

export async function generateMetadata({ params }: Props) {
  const p = await getProperty(params.id)
  if (!p) return {}
  return {
    title: p.meta_title || p.title,
    description: p.meta_description || p.description?.substring(0, 155),
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getProperty(params.id)
  if (!property) notFound()

  const supabase = createSupabaseAdminClient()
  supabase.from('properties').update({ view_count: (property.view_count || 0) + 1 }).eq('id', property.id).then(() => {})

  const size = formatSize(property.size_sqft)
  const waMsg = encodeURIComponent(`Hi! I'm interested in: ${property.title} (${property.city}, ${property.state}). Please share more details and pricing.`)
  const waLink = `https://wa.me/919898610678?text=${waMsg}`

  const TYPE_LABELS: Record<string, string> = {
    industrial_land: 'Industrial Land', warehouse: 'Warehouse', shed: 'Industrial Shed',
    commercial: 'Commercial', agricultural: 'Agricultural', office: 'Office',
  }

  return (
    <main className="min-h-screen bg-white text-[#1D1D1F]">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-4 sm:py-6 flex items-center gap-3">
            <Link href="/properties" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors font-medium">
              <ArrowLeft size={14} /> All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="lg:hidden mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-[#F5F5F7] text-[#1D1D1F] text-[10px] sm:text-xs font-bold border-transparent px-2.5 py-1 uppercase tracking-wider">{TYPE_LABELS[property.type] || property.type}</span>
                  {property.verified && <span className="badge bg-[#0071E3] text-white text-[10px] sm:text-xs font-bold border-transparent px-2.5 py-1 uppercase tracking-wider">Verified</span>}
                </div>
                <h1 className="font-extrabold text-2xl sm:text-3xl text-[#1D1D1F] mb-2 leading-[1.1] tracking-tight">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-[#6E6E73] text-sm">
                  <MapPin size={14} /> {property.city}, {property.state}
                  {property.estate_name && <><span className="mx-1">·</span><span className="text-[#E8720C] font-semibold">{property.estate_name}</span></>}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F5F5F7] shadow-sm">
                  {property.images?.[0]?.url ? (
                    <Image src={property.images[0].url} alt={property.images[0].alt || property.title} fill className="object-cover" priority />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={64} className="text-[#D2D2D7]" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 hidden lg:flex gap-2">
                    <span className="badge bg-white/90 backdrop-blur text-[10px] text-[#1D1D1F] font-bold border-transparent px-3 py-1 uppercase tracking-wider shadow-sm">{TYPE_LABELS[property.type] || property.type}</span>
                    {property.verified && <span className="badge bg-[#0071E3] text-white text-[10px] font-bold border-transparent px-3 py-1 uppercase tracking-wider shadow-sm">Verified</span>}
                  </div>
                </div>

                {property.images?.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {property.images.slice(1, 5).map((img: any, i: number) => (
                      <div key={i} className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#E8E8ED] cursor-pointer hover:border-[#D2D2D7] transition-colors">
                        <Image src={img.url} alt={img.alt || `Property image ${i+2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-10 sm:space-y-12">
                <section>
                  <h2 className="font-bold text-lg sm:text-xl text-[#1D1D1F] mb-4 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#E8720C] rounded-full" />
                    Property Overview
                  </h2>
                  <p className="text-[#424245] leading-relaxed text-base sm:text-lg">
                    {property.description}
                  </p>
                </section>

                <section>
                  <h2 className="font-bold text-lg sm:text-xl text-[#1D1D1F] mb-6 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#E8720C] rounded-full" />
                    Key Specifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { icon: Ruler, label: 'Area (sq ft)', value: size?.sqft ? `${size.sqft} sq ft` : null },
                      { icon: Map, label: 'Area (acres)', value: size?.acres ? `${size.acres} acres` : null },
                      { icon: Route, label: 'Road Width', value: property.road_width ? `${property.road_width}m` : null },
                      { icon: Zap, label: 'Power', value: property.power_available ? `${property.power_available} kVA` : null },
                      { icon: Factory, label: 'Pollution', value: property.pollution_cat?.toUpperCase() },
                      { icon: MapPin, label: 'Hwy Distance', value: property.highway_distance ? `${property.highway_distance} km` : null },
                    ].filter(s => s.value).map(spec => (
                      <div key={spec.label} className="bg-[#F5F5F7] rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-transform hover:scale-[1.02] cursor-default">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                          <spec.icon size={18} className="text-[#1D1D1F]" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-[#86868B] uppercase font-bold tracking-wider mb-0.5">{spec.label}</div>
                          <div className="font-mono text-sm sm:text-base text-[#1D1D1F] font-bold">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 sm:gap-8 mt-8 py-6 border-t border-[#F5F5F7]">
                    {property.water_available && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]">
                        <Droplets size={16} className="text-[#34C759]" /> Water Connection
                      </div>
                    )}
                    {property.railway_siding && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]">
                        <TrainFront size={16} className="text-[#34C759]" /> Railway Siding
                      </div>
                    )}
                    {property.power_available && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]">
                        <Zap size={16} className="text-[#34C759]" /> Power Approved
                      </div>
                    )}
                  </div>
                </section>

                {property.features?.length > 0 && (
                  <section>
                    <h2 className="font-bold text-lg sm:text-xl text-[#1D1D1F] mb-6 tracking-tight flex items-center gap-2">
                       <span className="w-1.5 h-6 bg-[#E8720C] rounded-full" />
                       Highlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {property.features.map((f: string) => (
                        <div key={f} className="flex items-center gap-3 p-4 bg-white border border-[#E8E8ED] rounded-xl shadow-sm group hover:border-[#D2D2D7] transition-all">
                          <div className="w-6 h-6 rounded-full bg-[#34C759]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#34C759] transition-colors">
                            <CheckCircle2 size={12} className="text-[#34C759] group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm sm:text-base text-[#424245] font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="hidden lg:block mb-6">
                   <h1 className="font-extrabold text-3xl text-[#1D1D1F] mb-3 leading-[1.1] tracking-tight">{property.title}</h1>
                   <div className="flex items-center gap-1.5 text-[#6E6E73] text-sm">
                     <MapPin size={14} /> {property.city}, {property.state}
                   </div>
                   {property.estate_name && <div className="mt-2 inline-block badge-gold text-[10px]">{property.estate_name}</div>}
                </div>

                <div className="bg-white border border-[#E8E8ED] rounded-3xl p-6 sm:p-8 shadow-apple-xl">
                  <div className="mb-8">
                    <div className="text-[10px] sm:text-xs text-[#86868B] uppercase font-bold tracking-widest mb-1">Asking Price</div>
                    <div className="font-mono font-extrabold text-3xl sm:text-4xl text-[#1D1D1F] mb-1">
                      {formatPrice(property.price, property.price_on_request)}
                    </div>
                    {property.price_per_sqft && (
                      <div className="text-sm text-[#86868B] font-medium">Approx. ?{property.price_per_sqft.toLocaleString('en-IN')}/sq ft</div>
                    )}
                    {property.price_negotiable && (
                      <span className="mt-2 inline-block text-[10px] sm:text-xs font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full">Price Negotiable</span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: 'Type', val: TYPE_LABELS[property.type] || property.type },
                      { label: 'Status', val: property.transaction },
                      { label: 'Total Size', val: size?.sqft ? `${size.sqft} sq ft` : '—' },
                      { label: 'RERA', val: property.rera_number || 'Applied for' },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center text-sm border-b border-[#F5F5F7] pb-3 last:border-0 last:pb-0">
                        <span className="text-[#86868B]">{item.label}</span>
                        <span className="text-[#1D1D1F] font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="btn-whatsapp w-full justify-center py-4 text-base shadow-lg shadow-[#34C759]/20 hover:shadow-[#34C759]/30 transition-shadow">
                      <MessageCircle size={20} /> Enquire on WhatsApp
                    </a>
                    <a href="tel:+919898610678" className="btn-secondary w-full justify-center py-4 border-[#1D1D1F] text-[#1D1D1F]">
                      <Phone size={18} /> Call +91 98986 10678
                    </a>
                  </div>

                  <div className="mt-6 flex items-start gap-2 text-xs text-[#86868B] leading-relaxed">
                    <FileCheck size={14} className="text-[#34C759] mt-0.5 flex-shrink-0" />
                    <span>White-money transaction only. Title verified before token money. RERA compliant advisory.</span>
                  </div>
                </div>

                <div className="bg-[#F5F5F7] rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-[#1D1D1F]">Share Property</h3>
                    <Share2 size={16} className="text-[#6E6E73]" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Check out this property: ${property.title} — ${property.city}, ${property.state}. View details: `)}https://marutilanddevelopers.com/properties/${property.slug || property.id}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 btn-secondary bg-white py-2 text-[11px] justify-center shadow-sm"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
