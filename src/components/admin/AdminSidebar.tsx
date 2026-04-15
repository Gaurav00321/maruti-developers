'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, FileText, BarChart3, Settings, LogOut, MessageCircle } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside className="w-60 flex-shrink-0 bg-[#050A05] border-r border-[#1A2E1A] flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-[#1A2E1A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center font-display font-800 text-white text-xs">MD</div>
          <div>
            <div className="font-display font-700 text-white text-sm">Maruti Admin</div>
            <div className="text-[#4b7c55] text-xs">Control Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans font-500 transition-all ${
              isActive(item.href, item.exact)
                ? 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/20'
                : 'text-[#4b7c55] hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#1A2E1A] space-y-2">
        <a
          href="https://wa.me/919898610678"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#25D366] hover:bg-[#25D366]/10 transition-all"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4b7c55] hover:text-white hover:bg-white/5 transition-all">
          View Site ↗
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  )
}
