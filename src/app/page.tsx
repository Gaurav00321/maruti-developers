import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ProblemSection } from '@/components/home/ProblemSection'
import { DifferentiatorGrid } from '@/components/home/DifferentiatorGrid'
import { CoverageSection, NextGenSection, WarehouseSection, FounderSection, FAQSection, FinalCTA } from '@/components/home/HomeSections'
import FeaturedPropertiesList from '@/components/home/FeaturedPropertiesList'
import { Suspense } from 'react'
import { FeaturedPropertiesSkeleton } from '@/components/home/PropertySkeleton'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
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
