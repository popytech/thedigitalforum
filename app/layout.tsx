import type { Metadata } from 'next'
import { Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://thedigitalforum.gn'),
  title: {
    default: 'The Digital Forum — Entrepreneuriat Digital en Guinée',
    template: '%s | The Digital Forum',
  },
  description:
    'La première série d\'événements trimestriels dédiés à l\'entrepreneuriat digital en Guinée. Speakers · Networking · Certification · Impact réel.',
  keywords: ['digital forum', 'guinée', 'entrepreneuriat', 'conakry', 'popy tech', 'digital africa'],
  authors: [{ name: 'Popy Traoré', url: 'https://www.popytech.com' }],
  openGraph: {
    type: 'website',
    locale: 'fr_GN',
    url: 'https://thedigitalforum.gn',
    siteName: 'The Digital Forum',
    title: 'The Digital Forum — Entrepreneuriat Digital en Guinée',
    description: 'La première série d\'événements trimestriels dédiés à l\'entrepreneuriat digital en Guinée.',
    images: [{ url: '/images/og/home.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Digital Forum',
    description: 'Entrepreneuriat Digital en Guinée',
    images: ['/images/og/home.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-body bg-dark-bg text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
