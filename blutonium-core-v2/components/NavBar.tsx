"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  const links = [
    { href: "/releases", label: "Releases" },
    { href: "/merchandise", label: "Merchandise" },
    { href: "/samples", label: "Samples" },
    { href: "/videos", label: "Videos" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Blutonium Records Logo"
            width={36}
            height={36}
            priority
            className="rounded"
          />
          <span className="hidden sm:inline text-sm font-bold tracking-wide text-white">
            Blutonium Records
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm sm:text-base hover:text-cyan-300 transition ${
                pathname === link.href ? "text-cyan-400 font-semibold" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <button className="ml-4 text-sm px-2 py-1 rounded bg-white/10 hover:bg-white/20">
            DE/EN
          </button>
        </div>
      </div>
    </nav>
  )
}
