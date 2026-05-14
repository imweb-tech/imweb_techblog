import Link from "next/link"
import { useState, useEffect } from "react"
import { withBasePath } from "@/lib/utils/withBasePath"

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/symbol.webp")}
            alt={CONFIG.blog.title}
            className="h-7 w-auto"
          />
          <span className="text-[1.05rem] tracking-tight">
            {CONFIG.blog.title}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          {CONFIG.nav.map(
            (item: { label: string; href: string; external?: boolean }) => {
              const className =
                "rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-surface transition-colors"
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {item.label}
                  </a>
                )
              }
              return (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              )
            }
          )}
        </nav>
      </div>
    </header>
  )
}
