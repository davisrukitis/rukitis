"use client"

import { ArrowUpRight, Copy } from "lucide-react"
import Link from "next/link"
import { forwardRef, useState, type ReactNode } from "react"

import { siteConfig } from "@/content/site"
import type { Locale } from "@/lib/i18n"

type SiteFooterCopy = {
  label: string
  email: string
  linkedin: string
  privacy: string
  copied: string
  copyEmail: string
  quote: string
}

type SiteFooterProps = {
  locale: Locale
  copy: SiteFooterCopy
}

export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(function SiteFooter({ locale, copy }, ref) {
  const [copied, setCopied] = useState(false)
  const year = new Date().getFullYear()

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer
      ref={ref}
      data-footer-nav-stop
      className="relative overflow-hidden bg-[#0B63FF] text-sky-50"
      aria-labelledby="footer-contact-heading"
    >
      <div className="relative z-10 mx-auto flex min-h-[280px] max-w-5xl flex-col justify-center gap-8 px-4 py-12 sm:px-6 md:min-h-[320px] md:gap-12 md:px-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] md:items-start md:gap-10">
          <div className="text-sm text-sky-100/90 md:text-base">
            <p id="footer-contact-heading" className="italic">
              {copy.label}
            </p>
          </div>

          <dl className="space-y-3 text-sm md:text-base">
            <FooterRow label={copy.email}>
              <div className="flex items-center gap-2">
                <a href={`mailto:${siteConfig.email}`} className="truncate text-sky-50 hover:text-white">
                  {siteConfig.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-100/40 text-[10px] text-sky-50/90 transition-colors hover:bg-sky-50 hover:text-[#0B63FF]"
                  aria-label={copy.copyEmail}
                >
                  <Copy className="h-3 w-3" />
                </button>
                {copied && <span className="text-[10px] text-sky-100/80">{copy.copied}</span>}
              </div>
            </FooterRow>

            <FooterRow label={copy.linkedin}>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-50 hover:text-white"
              >
                <span className="hidden sm:inline">{siteConfig.linkedinLabel}</span>
                <span className="sm:hidden">@davisrukitis</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </FooterRow>

            <FooterRow label={copy.privacy}>
              <Link href={`/${locale}/privacy`} className="inline-flex items-center gap-1 text-sky-50 hover:text-white">
                {copy.privacy}
              </Link>
            </FooterRow>
          </dl>
        </div>

        <div className="space-y-4 text-sm text-sky-50/90 md:space-y-6">
          <p className="text-xs italic sm:text-sm">{copy.quote}</p>

          <div className="flex items-center justify-between gap-4 text-[10px] text-sky-100/80 sm:text-[11px]">
            <div className="h-px flex-1 bg-sky-200/70" />
            <span>© {year} Davis Rukitis</span>
          </div>
        </div>
      </div>
    </footer>
  )
})

function FooterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
      <dt className="w-20 flex-shrink-0 text-sky-50/90 sm:w-24">{label}</dt>
      <div className="flex flex-1 items-center gap-2">
        <div className="hidden h-px flex-1 bg-sky-200/60 sm:block" />
        <dd>{children}</dd>
      </div>
    </div>
  )
}
