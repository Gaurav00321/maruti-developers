import { Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PropertiesClientPage } from './PropertiesClient'

export const metadata = {
  title: 'Industrial Properties — Maruti Developers',
  description: 'Browse industrial land, warehouses, sheds and commercial properties across Gujarat, Maharashtra, Rajasthan, Tamil Nadu, Karnataka, NCR and more. Filter by state, type, budget and size.',
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-10">
            <p className="section-label justify-center mb-4"><span className="w-6 h-px bg-[#E8720C]" />Live Inventory<span className="w-6 h-px bg-[#E8720C]" /></p>
            <h1 className="section-title mb-3">Browse Properties</h1>
            <p className="text-[#6E6E73] text-base max-w-xl mx-auto">
              Verified industrial land, warehouses, sheds &amp; commercial properties across India
            </p>
          </div>
          <Suspense fallback={<div className="text-[#86868B] text-center py-20">Loading properties...</div>}>
            <PropertiesClientPage />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}
