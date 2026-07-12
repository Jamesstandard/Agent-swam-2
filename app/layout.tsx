import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/providers'
import { Sidebar } from '@/components/sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multi Meta Matrix - AI Agent Orchestration',
  description: 'Powerful multi-framework AI agent orchestration platform',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <div className="flex flex-col h-screen md:flex-row">
            {/* Mobile: Sidebar at bottom, Desktop: Sidebar on left */}
            <Sidebar />
            
            {/* Main content area - responsive */}
            <main className="flex-1 overflow-y-auto transition-all duration-300 pb-20 md:pb-0">
              {children}
            </main>
          </div>
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
