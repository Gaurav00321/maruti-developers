import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { LeadMagnetPopup } from '@/components/LeadMagnetPopup'
import { WhatsAppBubble } from '@/components/WhatsAppBubble'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Maruti Developers — Industrial Land, Warehouses & Commercial Property Across India',
    template: '%s | Maruti Developers',
  },
  description:
    'Maruti Developers — 25+ years, 2,500+ clients. Industrial Land, Warehouses & Commercial Property across Gujarat, Maharashtra, Rajasthan, Tamil Nadu, Karnataka, NCR & more. RERA-compliant. White-money transactions. Free plot shortlist in 2 hrs.',
  keywords: [
    'industrial land Gujarat', 'GIDC plot', 'warehouse lease India',
    'industrial property Vadodara', 'MIDC plot Maharashtra', 'industrial shed rent',
    'Maruti Developers', 'Vinod Jaiswal', 'NRI industrial investment India',
    'Dholera SIR plot', 'SIPCOT Tamil Nadu', 'RIICO Rajasthan',
  ],
  authors: [{ name: 'Vinod Jaiswal', url: 'https://marutilanddevelopers.com' }],
  creator: 'Maruti Developers',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://marutilanddevelopers.com',
    siteName: 'Maruti Developers',
    images: [{
      url: 'https://marutilanddevelopers.com/og-image.jpg',
      width: 1200, height: 630,
      alt: 'Maruti Developers — Industrial Real Estate India',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MarutiDevelopers',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://marutilanddevelopers.com' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0A0A0A] text-[#B8B0A0] font-sans antialiased">
        {children}
        <LeadMagnetPopup />
        <WhatsAppBubble />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
