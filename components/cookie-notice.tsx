"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import type { Locale } from "@/lib/i18n"

type CookieNoticeCopy = {
  body: string
  ok: string
  privacy: string
}

type CookieNoticeProps = {
  locale: Locale
  copy: CookieNoticeCopy
}

const STORAGE_KEY = "privacy-notice-dismissed:v1"

export function CookieNotice({ locale, copy }: CookieNoticeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(STORAGE_KEY) !== "true")
  }, [])

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "true")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <aside className="fixed bottom-24 left-4 z-[60] w-[min(28rem,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-white/65 p-4 text-neutral-950 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:bottom-6 md:left-6">
      <p className="max-w-[22rem] text-sm leading-relaxed">{copy.body}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link href={`/${locale}/privacy`} className="text-xs font-medium underline underline-offset-4">
          {copy.privacy}
        </Link>

        <button
          type="button"
          onClick={dismiss}
          className="rounded-2xl bg-black px-7 py-3 text-3xl font-black uppercase leading-none tracking-tight text-white transition-transform hover:scale-[1.03]"
        >
          {copy.ok}
        </button>
      </div>
    </aside>
  )
}
