import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type AboutPageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${dictionary.about.eyebrow} — ${siteConfig.name}`,
    description: dictionary.about.body,
    alternates: {
      canonical: `/${localeParam}/about`,
      languages: {
        en: "/en/about",
        lv: "/lv/about",
      },
    },
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dictionary = getDictionary(locale)

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <section className="min-h-[72vh] bg-background">
        <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-24 sm:px-6 md:pt-32">
          <p className="text-sm italic text-muted-foreground">{dictionary.about.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
            {dictionary.about.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {dictionary.about.body}
          </p>
        </div>
      </section>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}
