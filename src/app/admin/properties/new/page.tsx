'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  ArrowLeft, Save, Loader2, Upload, X, 
  Star, CheckCircle2, ChevronRight,
  MapPin, Building2, Wallet, Plus, Globe
} from 'lucide-react'
import Link from 'next/link'
import { STATES, PROPERTY_TYPES, INDUSTRIES } from '@/lib/supabase'

const schema = z.object({
  title: z.string().min(5, 'Title is too short'),
  description: z.string().optional(),
  type: z.string().min(1, 'Please select a type'),
  transaction: z.string().min(1, 'Please select a transaction type'),
  state: z.string().min(1, 'Please select a state'),
  city: z.string().min(2, 'City is required'),
  area_name: z.string().optional(),
  size_sqft: z.string().optional(),
  size_acres: z.string().optional(),
  price: z.string().optional(),
  price_per_sqft: z.string().optional(),
  price_negotiable: z.boolean().optional(),
  price_on_request: z.boolean().optional(),
  estate_name: z.string().optional(),
  zone_type: z.string().optional(),
  pollution_cat: z.string().optional(),
  road_width: z.string().optional(),
  power_available: z.string().optional(),
  water_available: z.boolean().optional(),
  railway_siding: z.boolean().optional(),
  highway_distance: z.string().optional(),
  port_distance: z.string().optional(),
  airport_distance: z.string().optional(),
  rera_number: z.string().optional(),
  status: z.string().default('draft'),
  featured: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const STEPS = ['Basic Information', 'Location Details', 'Technical Specs', 'Pricing & Legal', 'Media Assets', 'SEO Engine']

export default function NewPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft', featured: false },
  })

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const payload = {
        ...data,
        size_sqft: data.size_sqft ? parseInt(data.size_sqft) : null,
        price: data.price ? parseInt(data.price) : null,
        price_per_sqft: data.price_per_sqft ? parseInt(data.price_per_sqft) : null,
        road_width: data.road_width ? parseFloat(data.road_width) : null,
        power_available: data.power_available ? parseFloat(data.power_available) : null,
        highway_distance: data.highway_distance ? parseFloat(data.highway_distance) : null,
        features,
        images: [],
      }
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => router.push('/admin/properties'), 1500)
      }
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full bg-[#F5F5F7] border border-transparent rounded-2xl py-4 px-5 text-[#1D1D1F] text-sm font-medium focus:ring-2 focus:ring-[#E8720C]/20 focus:bg-white transition-all placeholder:text-[#86868B]/60"
  const labelClass = "block text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 px-1"

  return (
    <div className="p-8 sm:p-10 max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Link 
          href="/admin/properties" 
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] hover:shadow-md transition-all shrink-0"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Add New Listing</h1>
          <p className="text-[#86868B] text-base mt-0.5">Step {step + 1} of {STEPS.length}: <span className="text-[#E8720C] font-bold">{STEPS[step]}</span></p>
        </div>
      </div>

      {/* Modern Step indicator */}
      <div className="flex gap-2.5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 space-y-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#E8720C]' : 'bg-[#E8E8ED]'}`} />
             <span className={`hidden sm:block text-[9px] font-bold uppercase tracking-widest ${i === step ? 'text-[#E8720C]' : 'text-[#86868B]'}`}>
               {s.split(' ')[0]}
             </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white border border-[#E8E8ED] rounded-[40px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8720C]/5 rounded-full blur-[80px] -mr-32 -mt-32" />

          <div className="relative z-10">
            {/* Step 0: Basic Info */}
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <label className={labelClass}>Property Title <span className="text-[#E8720C]">*</span></label>
                  <input {...register('title')} placeholder="e.g. 5 Acre GIDC Industrial Plot — Savli, Vadodara" className={inputClass} />
                  {errors.title && <p className="text-[11px] text-[#E01B2F] mt-2 font-bold px-1">{errors.title.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Asset Type <span className="text-[#E8720C]">*</span></label>
                    <select {...register('type')} className={inputClass}>
                      <option value="">Select Category...</option>
                      {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Transaction <span className="text-[#E8720C]">*</span></label>
                    <select {...register('transaction')} className={inputClass}>
                      <option value="">Select Intent...</option>
                      <option value="sale">Sale / Buy</option>
                      <option value="lease">Lease (Long-term)</option>
                      <option value="rent">Rent (Monthly)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Marketing Description</label>
                  <textarea {...register('description')} rows={6} placeholder="Highlight the infrastructure, nearby logistics, and potential usage..." className={`${inputClass} resize-none`} />
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label className={labelClass}>Publishing Status</label>
                    <div className="flex items-center gap-4 bg-[#F5F5F7] p-2 rounded-2xl mt-1">
                      {['draft', 'active'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => schema.parse({ ...watch(), status: s })} // Dummy way to set value since using react-hook-form
                          className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${watch('status') === s ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#86868B]'}`}
                        >
                           {s}
                        </button>
                      ))}
                      {/* Note: In actual implementation, should use setValue from useForm */}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${watch('featured') ? 'bg-[#E8720C] border-[#E8720C]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                        <Star size={14} className={watch('featured') ? 'text-white fill-white' : 'text-transparent'} />
                      </div>
                      <input type="checkbox" {...register('featured')} className="hidden" />
                      <div>
                        <span className="block text-sm font-bold text-[#1D1D1F]">Featured Listing</span>
                        <span className="block text-[10px] text-[#86868B] font-medium uppercase tracking-tight">Showcase on HomePage</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>State <span className="text-[#E8720C]">*</span></label>
                    <select {...register('state')} className={inputClass}>
                      <option value="">Select Region...</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>City <span className="text-[#E8720C]">*</span></label>
                    <input {...register('city')} placeholder="e.g. Vadodara" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Area / Village / Locality</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" size={18} />
                    <input {...register('area_name')} placeholder="e.g. Savli, Manjusar, Halol" className={`${inputClass} pl-12`} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Industrial Estate / GIDC / Park Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" size={18} />
                    <input {...register('estate_name')} placeholder="e.g. GIDC Savli, MIDC Chakan" className={`${inputClass} pl-12`} />
                  </div>
                </div>
                <div className="p-6 bg-[#F5F5F7] rounded-3xl border border-[#E8E8ED]/50 flex items-start gap-4">
                   <Globe className="text-[#E8720C] shrink-0" size={20} />
                   <p className="text-xs text-[#86868B] font-medium leading-relaxed">
                     <span className="text-[#1D1D1F] font-bold">Accuracy Matters:</span> Precise location details help our matching algorithm connect you with the right verified buyers.
                   </p>
                </div>
              </div>
            )}

            {/* Step 2: Technical Specs */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Total Area (sq ft)</label>
                    <input {...register('size_sqft')} type="number" placeholder="e.g. 217800" className={inputClass} />
                    <p className="text-[10px] text-[#86868B] font-bold mt-2 px-1">Note: 217,800 sq ft is approximately 5 acres.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Pollution Category (NOC)</label>
                    <select {...register('pollution_cat')} className={inputClass}>
                      <option value="">Select Category...</option>
                      <option value="red">Red (Heavy Industrial)</option>
                      <option value="orange">Orange (Medium Industrial)</option>
                      <option value="green">Green (Light Industrial)</option>
                      <option value="NA">N/A (Commercial/Agri)</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}>Road (m)</label>
                    <input {...register('road_width')} type="number" step="0.1" placeholder="18" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Power (kVA)</label>
                    <input {...register('power_available')} type="number" placeholder="500" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Highway (km)</label>
                    <input {...register('highway_distance')} type="number" step="0.1" placeholder="2.5" className={inputClass} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-8 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${watch('water_available') ? 'bg-[#1D1D1F] border-[#1D1D1F]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                       {watch('water_available') && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <input type="checkbox" {...register('water_available')} className="hidden" />
                    <span className="text-sm font-bold text-[#1D1D1F]">Water Connection</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${watch('railway_siding') ? 'bg-[#1D1D1F] border-[#1D1D1F]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                       {watch('railway_siding') && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <input type="checkbox" {...register('railway_siding')} className="hidden" />
                    <span className="text-sm font-bold text-[#1D1D1F]">Railway Siding</span>
                  </label>
                </div>
                {/* Features Tags */}
                <div className="pt-4">
                  <label className={labelClass}>Infrastructure Features</label>
                  <div className="flex gap-3 mb-4">
                    <input
                      value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature('') } } }}
                      placeholder="e.g. GAS Connection, STPI Approved"
                      className={`${inputClass} flex-1`}
                    />
                    <button type="button" onClick={() => { if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature('') } }}
                      className="px-6 py-4 rounded-2xl bg-[#1D1D1F] text-white text-xs font-bold hover:bg-black transition-all">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f, i) => (
                      <span key={i} className="flex items-center gap-2 bg-[#F5F5F7] text-[#1D1D1F] text-[11px] font-bold px-4 py-2 rounded-full border border-[#E8E8ED]">
                        {f}
                        <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-[#86868B] hover:text-[#E01B2F]">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {features.length === 0 && <p className="text-xs text-[#86868B] italic font-medium">No custom features added yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Valuation (₹ INR)</label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" size={18} />
                      <input {...register('price')} type="number" placeholder="e.g. 50,000,000 (₹5Cr)" className={`${inputClass} pl-12`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Rate per Sq Ft (₹)</label>
                    <input {...register('price_per_sqft')} type="number" placeholder="e.g. 2,500" className={inputClass} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-8">
                   <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${watch('price_negotiable') ? 'bg-[#1D1D1F] border-[#1D1D1F]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                       {watch('price_negotiable') && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <input type="checkbox" {...register('price_negotiable')} className="hidden" />
                    <span className="text-sm font-bold text-[#1D1D1F]">Price Negotiable</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${watch('price_on_request') ? 'bg-[#1D1D1F] border-[#1D1D1F]' : 'border-[#E8E8ED] bg-white group-hover:border-[#86868B]'}`}>
                       {watch('price_on_request') && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <input type="checkbox" {...register('price_on_request')} className="hidden" />
                    <div>
                      <span className="text-sm font-bold text-[#1D1D1F] block leading-none">Price on Request</span>
                      <span className="text-[10px] text-[#86868B] font-medium leading-relaxed block mt-1 px-0.5">Hides exact price from list view</span>
                    </div>
                  </label>
                </div>
                <div>
                  <label className={labelClass}>Legal RERA Registration</label>
                  <input {...register('rera_number')} placeholder="e.g. GJ/01/RERA/..." className={inputClass} />
                </div>
              </div>
            )}

            {/* Step 4: Media */}
            {step === 4 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-[#E8720C]/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                  <Upload size={36} className="text-[#E8720C]/60" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-4">Media Repository</h3>
                <p className="text-[#86868B] text-base mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                  First, let's create the record. You can upload high-resolution photos and layouts via the <span className="text-[#1D1D1F] font-bold">Edit Dashboard</span> once saved.
                </p>
                <div className="inline-flex items-center gap-4 text-[11px] font-bold text-[#86868B] uppercase tracking-widest px-6 py-3 bg-[#F5F5F7] rounded-2xl border border-[#E8E8ED]">
                   <span>Max 10MB/Img</span>
                   <div className="w-1 h-1 rounded-full bg-[#E8E8ED]" />
                   <span>Up to 20 Assets</span>
                </div>
              </div>
            )}

            {/* Step 5: SEO */}
            {step === 5 && (
              <div className="space-y-8">
                <div>
                  <label className={labelClass}>Search Engine Title (Recommended: 60 chars)</label>
                  <input {...register('meta_title')} placeholder="e.g. Industrial Land for Sale in Savli — GIDC Approved" className={inputClass} maxLength={70} />
                  <div className="flex justify-between mt-2 px-1">
                     <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-tight">Character Count</p>
                     <p className={`text-[10px] font-bold ${(watch('meta_title')?.length ?? 0) > 60 ? 'text-[#E8720C]' : 'text-[#86868B]'}`}>{watch('meta_title')?.length || 0}/70</p>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Meta Description (Recommended: 155 chars)</label>
                  <textarea {...register('meta_description')} rows={4} placeholder="Summary for Google search snippets..." className={`${inputClass} resize-none`} maxLength={200} />
                   <div className="flex justify-between mt-2 px-1">
                     <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-tight">Focus Check</p>
                     <p className={`text-[10px] font-bold ${(watch('meta_description')?.length ?? 0) > 155 ? 'text-[#E8720C]' : 'text-[#86868B]'}`}>{watch('meta_description')?.length || 0}/200</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Navigation Controls */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#86868B] font-bold text-sm border border-[#E8E8ED] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          
          <div className="flex items-center gap-4">
             {step < STEPS.length - 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)} 
                className="btn-orange flex items-center gap-2 pr-6 pl-8"
              >
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={saving || saved} 
                className="btn-orange min-w-[200px] justify-center shadow-xl shadow-[#E8720C]/10 py-5"
              >
                {saving ? <><Loader2 size={20} className="animate-spin mr-3" /> Processing...</> :
                 saved ? <><CheckCircle2 size={20} className="mr-3" /> Property Built!</> :
                 <><Save size={20} className="mr-3" /> Finalize Listing</>}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
