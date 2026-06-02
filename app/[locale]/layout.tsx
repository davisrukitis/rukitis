import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { CookieNotice } from "@/components/cookie-notice"
import { FloatingNav } from "@/components/floating-nav"
import { getDictionary } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dictionary = getDictionary(locale)

  return (
    <>
      {children}
      <FloatingNav locale={locale} labels={dictionary.nav} />
      <CookieNotice locale={locale} copy={dictionary.notice} />
    </>
  )
}
