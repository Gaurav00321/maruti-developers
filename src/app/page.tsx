import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ProblemSection } from '@/components/home/ProblemSection'
import { DifferentiatorGrid } from '@/components/home/DifferentiatorGrid'
import { CoverageSection } from '@/components/home/CoverageSection'
import { NextGenSection } from '@/components/home/NextGenSection'
import { WarehouseSection } from '@/components/home/WarehouseSection'
import { FounderSection } from '@/components/home/FounderSection'
import FeaturedPropertiesList from '@/components/home/FeaturedPropertiesList'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Suspense } from 'react'
import { FeaturedPropertiesSkeleton } from '@/components/home/PropertySkeleton'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <DifferentiatorGrid />
      <CoverageSection />
      <NextGenSection />
      <WarehouseSection />
      <FounderSection />
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedPropertiesList />
      </Suspense>
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
