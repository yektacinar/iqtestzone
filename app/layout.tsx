import './globals.css'

// Root layout is now handled by [locale]/layout.tsx
// This root layout provides basic HTML structure for routes that don't go through locale routing
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
