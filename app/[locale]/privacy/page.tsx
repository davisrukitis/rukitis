import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type PrivacyPageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${dictionary.privacy.title} — ${siteConfig.name}`,
    description: dictionary.privacy.intro,
    alternates: {
      canonical: `/${localeParam}/privacy`,
      languages: {
        en: "/en/privacy",
        lv: "/lv/privacy",
      },
    },
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dictionary = getDictionary(locale)

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <article className="bg-background">
        <section className="mx-auto max-w-screen-md px-4 pb-24 pt-24 sm:px-6 md:pt-32">
          <p className="text-sm italic text-muted-foreground">{dictionary.privacy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {dictionary.privacy.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{dictionary.privacy.updated}</p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{dictionary.privacy.intro}</p>

          <PrivacySection title={dictionary.privacy.currentTitle} items={dictionary.privacy.currentItems} />
          <PrivacySection title={dictionary.privacy.futureTitle} items={dictionary.privacy.futureItems} />

          <section className="mt-10 rounded-[2rem] bg-neutral-100 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">{dictionary.privacy.choiceTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{dictionary.privacy.choiceBody}</p>
          </section>
        </section>
      </article>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}

function PrivacySection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10 rounded-[2rem] bg-neutral-100 p-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-5 space-y-3 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
