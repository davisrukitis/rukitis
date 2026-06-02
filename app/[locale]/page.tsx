import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HomePage } from "@/components/home-page"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type LocalePageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${siteConfig.name} — ${dictionary.home.selectedProjects}`,
    alternates: {
      canonical: `/${localeParam}`,
      languages: {
        en: "/en",
        lv: "/lv",
      },
    },
  }
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale

  return <HomePage locale={locale} />
}
