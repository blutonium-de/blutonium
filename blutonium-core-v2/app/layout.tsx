// app/layout.tsx
import "./globals.css"
import Link from "next/link"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Blutonium Records",
  description: "Since 1995 — Hardstyle / Hardtrance",
}

// WICHTIG: sorgt für korrekte mobile Darstellung
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-techno-1 text-white antialiased">
        <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-zinc-800">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/de" className="font-bold tracking-widest text-blutonium-500">
              BLUTONIUM
            </Link>
            <div className="flex-1" />
            <Link href="/de/releases">Releases</Link>
            <Link href="/de/merch">Merchandise</Link>
            <Link href="/de/samples">Samples</Link>
            <Link href="/de/videos">Videos</Link>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-zinc-800 py-10 mt-16 text-sm opacity-80">
          <div className="max-w-6xl mx-auto px-4">
            © {new Date().getFullYear()} Blutonium Records — Since 1995
          </div>
        </footer>
      </body>
    </html>
  )
}
