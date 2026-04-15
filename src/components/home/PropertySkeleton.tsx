import { MapPin, Building2 } from 'lucide-react'

export function PropertySkeleton() {
  return (
    <div className="bg-white border border-[#E8E8ED] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
      <div className="relative h-40 sm:h-44 bg-[#F5F5F7] animate-pulse" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-1.5 h-3 bg-[#F5F5F7] rounded w-2/3 animate-pulse" />
        <div className="h-5 bg-[#F5F5F7] rounded w-full animate-pulse" />
        <div className="flex items-center justify-between border-t border-[#F5F5F7] pt-3">
          <div className="space-y-2">
            <div className="h-4 bg-[#F5F5F7] rounded w-16 animate-pulse" />
            <div className="h-3 bg-[#F5F5F7] rounded w-20 animate-pulse" />
          </div>
          <div className="w-12 h-4 bg-[#F5F5F7] rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedPropertiesSkeleton() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div className="space-y-2">
             <div className="h-4 bg-[#F5F5F7] rounded w-24 animate-pulse" />
             <div className="h-8 bg-[#F5F5F7] rounded w-64 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array(4).fill(0).map((_, i) => <PropertySkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}
