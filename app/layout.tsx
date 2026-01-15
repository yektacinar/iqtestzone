import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

// Root layout is now handled by [locale]/layout.tsx
// This root layout provides basic HTML structure for routes that don't go through locale routing
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-white">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
