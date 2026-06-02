"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState, type ReactNode } from "react"

import { getAlternateLocale, switchLocaleInPath, type Locale } from "@/lib/i18n"

type FloatingNavLabels = {
  home: string
  projects: string
  notes: string
  about: string
  menu: string
  close: string
  language: string
}

type FloatingNavProps = {
  locale: Locale
  labels: FloatingNavLabels
}

export function FloatingNav({ locale, labels }: FloatingNavProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  const links = useMemo(
    () => [
      { href: `/${locale}/projects`, label: labels.projects },
      { href: `/${locale}/notes`, label: labels.notes },
      { href: `/${locale}/about`, label: labels.about },
    ],
    [labels.about, labels.notes, labels.projects, locale],
  )

  const nextLocale = getAlternateLocale(locale)
  const languageHref = switchLocaleInPath(pathname || `/${locale}`, nextLocale)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const footer = document.querySelector("[data-footer-nav-stop]")

    if (!footer) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.01,
      },
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [pathname])

  const isActive = (href: string) => {
    if (!pathname) {
      return false
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-fit -translate-x-1/2 transition-all duration-300 ease-out md:bottom-6 ${
        isFooterVisible ? "translate-y-20 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      aria-label="Primary navigation"
    >
      <div className="hidden items-center gap-1 rounded-2xl border border-black/10 bg-white/55 p-1 shadow-[0_16px_60px_rgba(0,0,0,0.14)] backdrop-blur-2xl md:flex">
        <HomeButton locale={locale} label={labels.home} />

        {links.map((link) => (
          <NavPill key={link.href} href={link.href} active={isActive(link.href)}>
            {link.label}
          </NavPill>
        ))}

        <NavPill href={languageHref} active={false} ariaLabel={`Switch language to ${nextLocale.toUpperCase()}`}>
          {labels.language}
        </NavPill>
      </div>

      <div className="flex flex-col items-center gap-2 md:hidden">
        {isMenuOpen && (
          <div className="w-[min(24rem,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-white/65 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <MobileNavPill key={link.href} href={link.href} active={isActive(link.href)}>
                  {link.label}
                </MobileNavPill>
              ))}

              <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white/35 p-2">
                <Link
                  href={languageHref}
                  className="rounded-full bg-black/10 px-5 py-2 text-sm font-medium tracking-wide text-neutral-900 transition-colors hover:bg-black hover:text-white"
                  aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
                >
                  {labels.language}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 p-1 shadow-[0_16px_60px_rgba(0,0,0,0.14)] backdrop-blur-2xl">
          <HomeButton locale={locale} label={labels.home} />

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="rounded-xl px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-950 transition-colors hover:bg-black/10"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? labels.close : labels.menu}
          </button>
        </div>
      </div>
    </div>
  )
}

function HomeButton({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="flex h-10 w-12 items-center justify-center rounded-xl bg-[#0B63FF] text-white shadow-sm transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black md:w-11"
      aria-label={label}
    >
      <Image src="/d-logo.svg" alt="" width={22} height={22} className="h-5 w-5 brightness-0 invert" priority />
    </Link>
  )
}

function NavPill({
  href,
  active,
  children,
  ariaLabel,
}: {
  href: string
  active: boolean
  children: ReactNode
  ariaLabel?: string
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`rounded-xl px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
        active ? "bg-black/30 text-white" : "text-neutral-950 hover:bg-black/10"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavPill({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-2xl px-4 py-4 text-center text-lg font-medium uppercase tracking-[0.14em] transition-colors ${
        active ? "bg-black/30 text-white" : "text-neutral-950 hover:bg-black/10"
      }`}
    >
      {children}
    </Link>
  )
}
