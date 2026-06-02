import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { getNoteBySlug, notes } from "@/content/notes"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type NotePageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) => notes.map((note) => ({ locale, slug: note.slug })))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const note = getNoteBySlug(slug)

  if (!note) {
    return {}
  }

  return {
    title: `${note.title} — ${siteConfig.name}`,
    description: note.description,
    alternates: {
      canonical: `/${localeParam}/notes/${slug}`,
      languages: {
        en: `/en/notes/${slug}`,
        lv: `/lv/notes/${slug}`,
      },
    },
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const note = getNoteBySlug(slug)

  if (!note) {
    notFound()
    return null
  }

  const dictionary = getDictionary(locale)

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <article className="bg-background">
        <section className="mx-auto max-w-screen-xl px-4 pb-24 pt-24 sm:px-6 md:pt-32">
          <p className="text-sm italic text-muted-foreground">
            {note.type} / {note.year}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
            {note.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {note.description}
          </p>

          <div className="mt-12 max-w-2xl rounded-[2rem] bg-neutral-100 p-6">
            <h2 className="text-xl font-semibold">{dictionary.notes.emptyTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dictionary.notes.emptyBody}</p>
          </div>
        </section>
      </article>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}
