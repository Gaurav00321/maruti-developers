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
    <div ref={ref} className="font-extrabold text-4xl text-[#1D1D1F] tracking-tight">
      {count.toLocaleString('en-IN')}{suffix}
    </div>
  )
}

export function TrustBar() {
  return (
    <section className="py-20 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group text-center lg:text-left lg:flex items-start gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8E8ED] shadow-apple-sm flex items-center justify-center flex-shrink-0 mx-auto lg:mx-0 mb-4 lg:mb-0">
                <stat.icon size={22} className="text-[#1D1D1F]" />
              </div>
              <div>
                <Counter target={stat.num} suffix={stat.suffix} />
                <div className="font-semibold text-sm text-[#1D1D1F] mt-1">{stat.label}</div>
                <div className="text-xs text-[#86868B] mt-0.5">{stat.sub}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#D2D2D7]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
