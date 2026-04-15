'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Users, Building2, FileText, Settings, LayoutDashboard, 
  LogOut, Menu, X, ChevronRight, Bell, Search,
  ExternalLink
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  if (pathname === '/admin/login') return children

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-[#E8E8ED] sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/admin" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-[#E8720C] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#E8720C]/20 group-hover:scale-105 transition-transform">MD</span>
            <div>
              <span className="block text-[#1D1D1F] font-bold tracking-tight text-sm">Maruti Developers</span>
              <span className="block text-[#86868B] text-[10px] font-bold uppercase tracking-wider">Advisor Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group",
                  isActive 
                    ? "bg-[#F5F5F7] text-[#1D1D1F]" 
                    : "text-[#86868B] hover:bg-[#F5F5F7]/50 hover:text-[#1D1D1F]"
                )}
              >
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-[#E8720C]" : "text-[#86868B] group-hover:text-[#1D1D1F]")} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-[#86868B]" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-[#F5F5F7]">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all mb-2"
          >
            <ExternalLink size={18} />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-[#E01B2F] hover:bg-[#FFF1F0] transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-[#E8E8ED] h-16 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-[#1D1D1F]">
              <Menu size={22} />
            </button>
            <span className="font-bold text-[#1D1D1F] tracking-tight">Maruti Developers</span>
          </div>

          <div className="hidden sm:flex items-center bg-[#F5F5F7] rounded-full px-4 py-1.5 w-full max-w-sm border border-transparent focus-within:border-[#E8E8ED] transition-all">
            <Search size={14} className="text-[#86868B]" />
            <input 
              type="text" 
              placeholder="Search leads, records..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 placeholder:text-[#86868B]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-[#86868B] hover:text-[#1D1D1F] relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#E8720C] rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-[#E8E8ED] mx-2 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-xs font-bold">VJ</div>
              <span className="hidden sm:block text-sm font-bold text-[#1D1D1F]">Vinod Jaiswal</span>
            </div>
          </div>
        </header>

        {/* Dynamic content */}
        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-80 bg-white flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#E8720C] text-white flex items-center justify-center font-bold text-sm">MD</span>
                <span className="text-[#1D1D1F] font-bold text-sm tracking-tight">Panel</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#86868B]">
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 px-4 space-y-1.5 pt-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all",
                      isActive ? "bg-[#F5F5F7] text-[#1D1D1F]" : "text-[#86868B]"
                    )}
                  >
                    <item.icon size={20} className={isActive ? "text-[#E8720C]" : ""} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="p-6 mt-auto border-t border-[#F5F5F7]">
               <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold bg-[#FFF1F0] text-[#E01B2F] active:scale-95 transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
