'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Lock, Smartphone, Eye, EyeOff, ShieldCheck } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (data.success) {
        router.push(redirect)
        router.refresh()
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-[#E8E8ED] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E8720C] to-[#FF9A44]" />

      {/* Header */}
      <div className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-6 border border-[#E8E8ED]">
          <ShieldCheck className="text-[#E8720C]" size={28} />
        </div>
        <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tight mb-2">Admin Portal</h1>
        <p className="text-[#86868B] text-sm">Secure access for Maruti Developers advisors.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 px-1">Username (Mobile)</label>
          <div className="relative group">
            <Smartphone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#E8720C] transition-colors" />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="98986 XXXXX"
              className="w-full bg-[#F5F5F7] border border-[#E8E8ED] rounded-2xl py-4 pl-12 pr-4 text-[#1D1D1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8720C]/20 focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#86868B] uppercase tracking-widest mb-2 px-1">Password</label>
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#E8720C] transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F5F5F7] border border-[#E8E8ED] rounded-2xl py-4 pl-12 pr-12 text-[#1D1D1F] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8720C]/20 focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="animate-in fade-in slide-in-from-top-2 bg-[#FFF1F0] border border-[#FFA39E]/30 rounded-2xl p-4 text-sm text-[#E01B2F] font-medium flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E01B2F]" />
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full btn-orange justify-center py-4 rounded-2xl text-base shadow-lg shadow-[#E8720C]/20 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? <><Loader2 size={18} className="animate-spin mr-2" /> Authenticating...</> : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-[#F5F5F7]">
        <p className="text-[11px] text-[#86868B] text-center leading-relaxed font-medium">
          Authorized personnel only. All access attempts are logged.<br/>
          &copy; {new Date().getFullYear()} Maruti Developers. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8720C]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="relative w-full max-w-[440px]">
        {/* Logo/Brand (Optional top centered) */}
        <div className="flex justify-center mb-8">
          <div className="group flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#E8E8ED] shadow-sm">
             <span className="w-8 h-8 rounded-lg bg-[#E8720C] text-white flex items-center justify-center font-bold text-sm tracking-tighter">MD</span>
             <span className="text-[#1D1D1F] font-bold text-sm tracking-tight">Maruti Developers</span>
          </div>
        </div>

        <Suspense fallback={<div className="bg-white border border-[#E8E8ED] rounded-3xl p-10 h-[500px] flex items-center justify-center"><Loader2 className="animate-spin text-[#86868B]" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
