'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Users, Globe, Shield } from 'lucide-react'

const stats = [
  { icon: Award, num: 25, suffix: '+', label: 'Years of Building Industrial India', sub: 'Established 1998' },
  { icon: Users, num: 2500, suffix: '+', label: 'Clients Served', sub: 'Across industries' },
  { icon: Globe, num: 7, suffix: '+', label: 'States Covered', sub: 'Pan-India network' },
  { icon: Shield, num: 100, suffix: '%', label: 'White-Money Deals', sub: 'RERA-compliant' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="font-serif font-extrabold text-[2.5rem] lg:text-[3rem] text-[#FAFAFA] leading-tight flex items-baseline gap-1">
      {count.toLocaleString('en-IN')}<span className="text-[#10B981]">{suffix}</span>
    </div>
  )
}

export function TrustBar() {
  return (
    <section className="py-24 lg:py-32 relative bg-[#111113] border-t border-[#27272A] overflow-hidden">
      {/* Background Image Parallax layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/gallery-images/22.jpg')] bg-cover bg-center bg-fixed opacity-[0.03] scale-105" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#09090B] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center flex flex-col items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#09090B]/80 backdrop-blur-md border border-[#27272A] shadow-dark-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#10B981]/50 group-hover:bg-[#10B981]/10 transition-all duration-300">
                <stat.icon size={26} className="text-[#10B981]" />
              </div>
              <div className="flex-1 flex flex-col items-center">
                <Counter target={stat.num} suffix={stat.suffix} />
                <div className="font-bold text-sm lg:text-base text-[#FAFAFA] mt-3 font-sans max-w-[180px] leading-tight">{stat.label}</div>
                <div className="text-xs text-[#71717A] mt-2 font-mono uppercase tracking-widest">{stat.sub}</div>
              </div>
              
              {/* Divider lines for desktop */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-[-2rem] top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#27272A] to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
