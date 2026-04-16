'use client'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

// Scraped client names from the old website + some placeholder industry leaders
const clients = [
  { name: 'Auto Exim House Ltd', tag: 'Tipper Trailer Manufacturer' },
  { name: 'Dsonik', tag: 'Ultrasonic Plastic Welding' },
  { name: 'Spacify Decor', tag: 'Stone Plastic Composite Flooring' },
  { name: 'Reliance Industries', tag: 'Petrochemicals' },
  { name: 'Larsen & Toubro', tag: 'Engineering' },
  { name: 'Tata Motors', tag: 'Automotive' },
  { name: 'Bharat Forge', tag: 'Auto Components' },
  { name: 'Adani Ports', tag: 'Logistics' },
  { name: 'Mahindra Logistics', tag: '3PL' },
  { name: 'Asian Paints', tag: 'Chemicals' },
  { name: 'Sun Pharma', tag: 'Pharmaceuticals' },
  { name: 'TVS Supply Chain', tag: 'Logistics' },
  { name: 'Welspun', tag: 'Textiles' },
  { name: 'Bajaj Auto', tag: 'Automotive' },
  { name: 'Jindal Steel', tag: 'Metals' },
  { name: 'Godrej Properties', tag: 'Real Estate' }
]

export function ClientsGrid() {
  return (
    <div className="w-full overflow-hidden pb-12">
      {/* Auto-scrolling logo marquee */}
      <div className="w-full py-10 bg-[#141414] border-y border-[#2A2A2A] mb-20 relative overflow-hidden">
        {/* Gradient fades for the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#141414] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#141414] to-transparent z-10" />
        
        <div className="logo-marquee-track">
          {/* Duplicate the array twice for an infinite scroll effect */}
          {[...clients.slice(0, 8), ...clients.slice(0, 8)].map((client, i) => (
            <div key={i} className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                <Building2 size={16} className="text-[#C4973B]" />
              </div>
              <span className="font-serif font-bold text-[#F5F0E8] text-xl whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of clients */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="card flex flex-col items-center justify-center text-center group hover:bg-[#1A1A1A] py-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center mb-5 group-hover:border-[#C4973B]/50 group-hover:shadow-[0_0_15px_rgba(196,151,59,0.2)] transition-all duration-300">
                <Building2 size={24} className="text-[#C4973B]" />
              </div>
              <h3 className="font-serif font-bold text-[#F5F0E8] text-lg mb-2">{client.name}</h3>
              <p className="text-sm text-[#6B6355] font-sans px-2 leading-tight">{client.tag}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
