import Link from "next/link"
import { useState, useEffect } from "react"

const CONFIG = require("../../../site.config")

// 상단 헤더. 얇고 가벼운 네비게이션, 스크롤 시 살짝 진해집니다.
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-smooth ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm">
            i
          </span>
          <span className="text-[1.05rem] tracking-tight">
            {CONFIG.blog.title}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          {CONFIG.nav.map((item: { label: string; href: string }) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-surface transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-surface transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
