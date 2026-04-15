'use client'
import { useEffect, useState } from 'react'
import { Save, Loader2, CheckCircle2 } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    whatsapp_number: '',
    whatsapp_number_2: '',
    admin_email: '',
    popup_delay_ms: '30000',
    popup_cooldown_days: '7',
    site_announcement: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#050A05] border border-[#1A2E1A] text-white text-sm placeholder-[#4b7c55] focus:outline-none focus:border-[#22c55e]/50 transition-all"
  const labelClass = "block text-xs font-display font-600 text-[#4b7c55] uppercase tracking-wider mb-2"

  const save = async () => {
    setSaving(true)
    // In production: iterate settings object and PATCH each key
    // For now simulate
    await new Promise(r => setTimeout(r, 800))
    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-800 text-2xl text-white">Settings</h1>
          <p className="text-[#4b7c55] text-sm">Configure your site settings</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary py-2.5 text-sm">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> :
           saved ? <><CheckCircle2 size={14} /> Saved!</> :
           <><Save size={14} /> Save Settings</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Contact Settings */}
        <div className="bg-[#0C160C] border border-[#1A2E1A] rounded-2xl p-6">
          <h2 className="font-display font-700 text-white text-base mb-5">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Primary WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b7c55] text-sm">+</span>
                <input value={settings.whatsapp_number} onChange={e => setSettings(s => ({ ...s, whatsapp_number: e.target.value }))}
                  placeholder="919898610678" className={`${inputClass} pl-8`} />
              </div>
              <p className="text-xs text-[#2a3e2a] mt-1">Include country code, no spaces or dashes</p>
            </div>
            <div>
              <label className={labelClass}>Secondary WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b7c55] text-sm">+</span>
                <input value={settings.whatsapp_number_2} onChange={e => setSettings(s => ({ ...s, whatsapp_number_2: e.target.value }))}
                  placeholder="917878610678" className={`${inputClass} pl-8`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Admin Email (receives lead notifications)</label>
              <input type="email" value={settings.admin_email} onChange={e => setSettings(s => ({ ...s, admin_email: e.target.value }))}
                placeholder="marutideveloper78@gmail.com" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Lead Popup Settings */}
        <div className="bg-[#0C160C] border border-[#1A2E1A] rounded-2xl p-6">
          <h2 className="font-display font-700 text-white text-base mb-5">Lead Popup Settings</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Trigger Delay (milliseconds)</label>
              <input type="number" value={settings.popup_delay_ms} onChange={e => setSettings(s => ({ ...s, popup_delay_ms: e.target.value }))}
                className={inputClass} />
              <p className="text-xs text-[#2a3e2a] mt-1">30000 = 30 seconds</p>
            </div>
            <div>
              <label className={labelClass}>Cooldown (days)</label>
              <input type="number" value={settings.popup_cooldown_days} onChange={e => setSettings(s => ({ ...s, popup_cooldown_days: e.target.value }))}
                className={inputClass} />
              <p className="text-xs text-[#2a3e2a] mt-1">Days before popup re-shows to same visitor</p>
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-[#0C160C] border border-[#1A2E1A] rounded-2xl p-6">
          <h2 className="font-display font-700 text-white text-base mb-2">Announcement Banner</h2>
          <p className="text-xs text-[#4b7c55] mb-4">Optional text shown at the top of every page (leave blank to hide)</p>
          <input value={settings.site_announcement} onChange={e => setSettings(s => ({ ...s, site_announcement: e.target.value }))}
            placeholder="e.g. New GIDC plots available in Savli — enquire now" className={inputClass} />
        </div>

        {/* Danger Zone */}
        <div className="bg-[#150808] border border-[#2E1A1A] rounded-2xl p-6">
          <h2 className="font-display font-700 text-red-400 text-base mb-2">Admin Account</h2>
          <p className="text-sm text-[#6b4444] mb-4">Admin passwords are managed securely via Supabase Auth. Never store credentials here.</p>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
            className="btn-secondary py-2.5 text-sm text-red-400 border-red-500/20 hover:border-red-500/40 inline-flex">
            Manage in Supabase Dashboard ↗
          </a>
        </div>
      </div>
    </div>
  )
}
