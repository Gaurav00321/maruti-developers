'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Grid3X3, List, MapPin, Building2, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { STATES, PROPERTY_TYPES, type Property } from '@/lib/supabase'

function formatPrice(price?: number | null, onRequest?: boolean) {
  if (onRequest || !price) return 'Price on Request'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

function formatSize(sqft?: number | null) {
  if (!sqft) return '—'
  if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} acres`
  return `${sqft.toLocaleString('en-IN')} sq ft`
}

const TYPE_LABELS: Record<string, string> = {
  industrial_land: 'Industrial Land', warehouse: 'Warehouse', shed: 'Industrial Shed',
  commercial: 'Commercial', agricultural: 'Agricultural', office: 'Office',
}

const CITIES = ['Vadodara', 'Ahmedabad', 'Surat', 'Bharuch', 'Pune', 'Chakan', 'Nashik', 'Jaipur', 'Chennai', 'Bengaluru', 'Hyderabad', 'Manesar', 'Noida']

function PropertyCard({ p }: { p: Property }) {
  const waMsg = encodeURIComponent(`Hi! I'm interested in the property: ${p.title} (${p.city}, ${p.state}). Please share more details.`)
  return (
    <div className="bg-white border border-[#E8E8ED] rounded-2xl overflow-hidden group hover:shadow-xl hover:border-[#D2D2D7] transition-all duration-300">
      <div className="relative h-48 bg-[#F5F5F7] overflow-hidden">
        {p.images?.[0]?.url ? (
          <Image src={p.images[0].url} alt={p.images[0].alt || p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 size={48} className="text-[#D2D2D7]" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="badge-green text-[10px]">{TYPE_LABELS[p.type] || p.type}</span>
          <span className="badge-gold text-[10px]">{p.transaction}</span>
        </div>
        {p.verified && (
          <div className="absolute top-3 right-3">
            <span className="badge-blue text-[10px]">✓ Verified</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-[#86868B] text-xs mb-2">
          <MapPin size={10} /> {p.city}, {p.state}
          {p.estate_name && <><span className="mx-1">·</span><span className="text-[#E8720C]">{p.estate_name}</span></>}
        </div>
        <h3 className="font-bold text-[#1D1D1F] text-sm leading-snug mb-3 line-clamp-2">{p.title}</h3>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-extrabold text-[#1D1D1F] text-lg">{formatPrice(p.price, p.price_on_request)}</div>
            <div className="text-[#86868B] text-xs">{formatSize(p.size_sqft)}</div>
          </div>
          {p.pollution_cat && (
            <span className={`badge text-[10px] ${
              p.pollution_cat === 'red' ? 'bg-red-50 text-red-500 border border-red-200' :
              p.pollution_cat === 'orange' ? 'bg-orange-50 text-orange-500 border border-orange-200' :
              'bg-green-50 text-green-600 border border-green-200'
            }`}>
              {p.pollution_cat.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/properties/${p.slug}`} className="btn-secondary flex-1 py-2.5 text-xs justify-center">
            View Details <ArrowRight size={12} />
          </Link>
          <a
            href={`https://wa.me/919898610678?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all"
            title="Enquire on WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export function PropertiesClientPage() {
  const searchParams = useSearchParams()

  const [properties, setProperties] = useState<Property[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Search filters matching the reference (I Want To, Property Type, City, Locality, Budget)
  const [transaction, setTransaction] = useState(searchParams.get('transaction') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [locality, setLocality] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [page, setPage] = useState(0)
  const [sortBy, setSortBy] = useState('created_at')

  // Quick state tabs
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '')

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (selectedState) params.set('state', selectedState)
    if (type) params.set('type', type)
    if (transaction) params.set('transaction', transaction)
    if (budgetMin) params.set('price_min', (parseInt(budgetMin) * 100000).toString())
    if (budgetMax) params.set('price_max', (parseInt(budgetMax) * 100000).toString())
    params.set('sort', sortBy)
    params.set('page', page.toString())

    // City and locality search via title/city fields
    if (city) params.set('city', city)

    try {
      const res = await fetch(`/api/properties?${params}`)
      if (!res.ok) {
        console.error('Properties API error:', res.status)
        setProperties([])
        setTotal(0)
        setPages(0)
        return
      }
      const text = await res.text()
      if (!text) {
        setProperties([])
        setTotal(0)
        setPages(0)
        return
      }
      const data = JSON.parse(text)
      let results = data.properties || []
      // Client-side locality filter (text search in title/area_name)
      if (locality) {
        const q = locality.toLowerCase()
        results = results.filter((p: Property) =>
          p.title.toLowerCase().includes(q) ||
          (p.area_name && p.area_name.toLowerCase().includes(q)) ||
          p.city.toLowerCase().includes(q)
        )
      }
      setProperties(results)
      setTotal(locality ? results.length : (data.total || 0))
      setPages(locality ? 1 : (data.pages || 0))
    } catch (err) {
      console.error('Failed to fetch properties:', err)
      setProperties([])
      setTotal(0)
      setPages(0)
    } finally {
      setLoading(false)
    }
  }, [selectedState, type, transaction, city, locality, budgetMin, budgetMax, sortBy, page])

  useEffect(() => { fetchProperties() }, [fetchProperties])

  const handleSearch = () => {
    setPage(0)
    fetchProperties()
  }

  const stateTabs = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Karnataka']

  return (
    <div>
      {/* Search Bar — matching reference design */}
      <div className="bg-[#F5F5F7] rounded-2xl p-6 mb-8 border border-[#E8E8ED]">
        {/* State tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => { setSelectedState(''); setPage(0) }}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${!selectedState ? 'bg-[#1D1D1F] text-white' : 'bg-white border border-[#E8E8ED] text-[#6E6E73] hover:border-[#D2D2D7]'}`}
          >
            All States
          </button>
          {stateTabs.map(s => (
            <button
              key={s}
              onClick={() => { setSelectedState(selectedState === s ? '' : s); setPage(0) }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedState === s ? 'bg-[#1D1D1F] text-white' : 'bg-white border border-[#E8E8ED] text-[#6E6E73] hover:border-[#D2D2D7]'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search fields row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1.5">I Want to</label>
            <select
              value={transaction}
              onChange={e => { setTransaction(e.target.value); setPage(0) }}
              className="input py-2.5 text-sm"
            >
              <option value="">Any</option>
              <option value="sale">Buy</option>
              <option value="lease">Lease</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1.5">Property Type</label>
            <select
              value={type}
              onChange={e => { setType(e.target.value); setPage(0) }}
              className="input py-2.5 text-sm"
            >
              <option value="">Any</option>
              {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1.5">City</label>
            <select
              value={city}
              onChange={e => { setCity(e.target.value); setPage(0) }}
              className="input py-2.5 text-sm"
            >
              <option value="">Any City</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1.5">Locality</label>
            <input
              value={locality}
              onChange={e => setLocality(e.target.value)}
              className="input py-2.5 text-sm"
              placeholder="Area name..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1.5">Budget (Lacs)</label>
            <div className="flex gap-1.5">
              <input
                value={budgetMin}
                onChange={e => setBudgetMin(e.target.value.replace(/\D/g, ''))}
                className="input py-2.5 text-sm w-1/2"
                placeholder="Min"
                type="text"
              />
              <input
                value={budgetMax}
                onChange={e => setBudgetMax(e.target.value.replace(/\D/g, ''))}
                className="input py-2.5 text-sm w-1/2"
                placeholder="Max"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button onClick={handleSearch} className="btn-primary w-full py-2.5 justify-center text-sm">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <span className="text-sm text-[#86868B]">
          {loading ? 'Loading...' : `${total.toLocaleString()} properties found`}
        </span>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={e => { setSortBy(e.target.value); setPage(0) }}
            className="bg-white border border-[#E8E8ED] text-[#6E6E73] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#E8720C]"
          >
            <option value="created_at">Latest First</option>
            <option value="price">Price: Low to High</option>
            <option value="size_sqft">Size: Large First</option>
          </select>
          <div className="flex rounded-xl overflow-hidden border border-[#E8E8ED]">
            <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1D1D1F] text-white' : 'bg-white text-[#86868B]'}`}>
              <Grid3X3 size={14} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#1D1D1F] text-white' : 'bg-white text-[#86868B]'}`}>
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-[#F5F5F7] rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <Building2 size={48} className="text-[#D2D2D7] mx-auto mb-4" />
          <h3 className="font-bold text-[#1D1D1F] text-xl mb-2">No properties found</h3>
          <p className="text-[#86868B] mb-6">Try adjusting your search or request a custom shortlist.</p>
          <a href="https://wa.me/919898610678" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            <MessageCircle size={16} /> Request Custom Shortlist
          </a>
        </div>
      ) : (
        <>
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {properties.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <PropertyCard p={p} />
              </motion.div>
            ))}
          </div>
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array(pages).fill(0).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                    page === i ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] border border-[#E8E8ED] text-[#6E6E73] hover:border-[#D2D2D7]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
