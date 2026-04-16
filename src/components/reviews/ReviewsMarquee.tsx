'use client'
import { Star } from 'lucide-react'

// Original testimonials generated + styled per Propertiva
const allReviews = [
  { name: 'Alex Morgan', role: 'CEO at Nestify', text: 'Maruti Developers made buying our first warehouse simple, transparent, and stress-free with expert guidance and trustworthy support throughout the entire process.' },
  { name: 'Sarah Collins', role: 'Property Investor', text: 'Their team understood our unique industrial needs, suggested ideal GIDC options, and managed negotiations professionally saving us immense time and stress.' },
  { name: 'Nasir Nawaz', role: 'CEO at Designhaus', text: 'Selling our industrial plot was smooth and fast thanks to accurate pricing, strong marketing, and constant communication from the experts team always.' },
  { name: 'Laura Bennett', role: 'Logistics Director', text: 'Their property advisory service is reliable, responsive, and professional, ensuring our operations team was happy while we enjoyed a stress-free acquisition.' },
  { name: 'Ryan Parker', role: 'Operations Head', text: 'From consultation to closing, the team guided us clearly, answered every zoning question, and delivered a smooth, confident buying experience for our new factory.' },
  { name: 'Angline Julie', role: 'CEO at Realestic', text: 'Excellent service from start to finish, helping us find a commercial property while handling all NA/CLU paperwork and follow-ups efficiently and professionally.' },
  { name: 'Vikram Singh', role: 'Managing Director', text: 'The landed-cost sheet they provided before we committed completely changed our perspective. Transparency at its absolute finest.' },
  { name: 'Rahul Desai', role: 'Plant Head', text: 'We were struggling with pollution board compliance for another plot. Maruti Developers found us a green-zone compatible plot within 2 weeks.' },
  { name: 'Amit Shah', role: 'NRI Investor', text: 'As an NRI, buying industrial land in India seemed daunting. Their secure, white-money clear process gave me complete peace of mind.' },
  { name: 'Priya Patel', role: 'Supply Chain Manager', text: 'We leased a 50,000 sq ft warehouse in Padra. The turnaround time from viewing to signing was incredibly fast. Highly recommended.' },
  { name: 'Sanjay Reddy', role: 'Manufacturing VP', text: 'Their understanding of MIDC and RIICO rules is unparalleled. They saved us from making a ₹5 Crore mistake in land zoning.' },
  { name: 'Rajiv Mehta', role: 'Founder', text: 'The entire title verification pack sent to our lawyer was comprehensive. It made the legal due diligence phase incredibly smooth.' },
  { name: 'Arjun Gupta', role: 'Expansion Lead', text: 'We wanted a built-to-suit facility. Vinod ji not only found the land but connected us with reliable local contractors. True end-to-end service.' },
  { name: 'Kavita Iyer', role: 'CFO', text: 'No hidden costs, no last-minute broker surprises. The financial integrity of Maruti Developers is a breath of fresh air in this industry.' },
  { name: 'Rohan Verma', role: 'Director', text: 'Their state-vs-state analysis for our new chemical plant was eye-opening. We ended up choosing Gujarat over Maharashtra based on their data.' },
  { name: 'Prakash Rao', role: 'Logistics Head', text: 'Finding a warehouse with the right dock heights and turning radius for our trailers was tough until we met this team. They know industrial.' },
  { name: 'Nitin Bajaj', role: 'Industrialist', text: 'They stayed with us even after the sale, helping coordinate the power supply connection. That level of handholding is extremely rare.' },
  { name: 'Sunita Sharma', role: 'Operations Director', text: 'The site visits were highly curated. They didn\'t waste our time showing us plots that didn\'t meet our strict power and water requirements.' },
  { name: 'Gaurav Jain', role: 'Investor', text: 'Their warehouse yield model is highly accurate. My CapEx investment is now yielding exactly the 9.5% gross they projected.' },
  { name: 'Vikash Kumar', role: 'E-commerce Lead', text: 'Secured a prime Grade-A warehouse space near the highway. The proximity to our distribution network has cut our transport costs by 15%.' },
]

export function ReviewsMarquee() {
  // Split into two rows
  const topRow = allReviews.slice(0, 10)
  const bottomRow = allReviews.slice(10, 20)

  const renderCard = (review: any, i: number) => (
    <div key={i} className="card-glass p-6 sm:p-8 w-[350px] sm:w-[400px] flex-shrink-0 flex flex-col h-full border-[#2A2A2A] hover:border-[#C4973B]/50 transition-colors">
      <div className="flex gap-1 mb-6 stars">
        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-current text-[#C4973B]" />)}
      </div>
      <p className="text-[#B8B0A0] text-sm sm:text-base leading-relaxed font-sans mb-8 flex-1 italic relative">
        <span className="text-4xl text-[#C4973B]/20 absolute -top-4 -left-2 font-serif">"</span>
        {review.text}
      </p>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center font-serif font-bold text-[#C4973B]">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-serif font-bold text-[#F5F0E8] text-sm">{review.name}</div>
          <div className="text-xs text-[#6B6355] font-sans">{review.role}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full overflow-hidden py-4 flex flex-col gap-6 relative">
      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Top Row - Scrolls Right */}
      <div className="marquee-right w-full overflow-hidden">
        <div className="marquee-track px-4 py-2">
          {/* Double array for infinite scroll */}
          {[...topRow, ...topRow].map((review, i) => renderCard(review, i))}
        </div>
      </div>

      {/* Bottom Row - Scrolls Left */}
      <div className="marquee-left w-full overflow-hidden">
        <div className="marquee-track px-4 py-2">
          {/* Double array for infinite scroll */}
          {[...bottomRow, ...bottomRow].map((review, i) => renderCard(review, i))}
        </div>
      </div>
    </div>
  )
}
