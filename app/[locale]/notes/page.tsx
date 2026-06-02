import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NoteCard } from "@/components/note-card"
import { SiteFooter } from "@/components/site-footer"
import { notes } from "@/content/notes"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type NotesPageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${dictionary.notes.title} — ${siteConfig.name}`,
    description: dictionary.notes.intro,
    alternates: {
      canonical: `/${localeParam}/notes`,
      languages: {
        en: "/en/notes",
        lv: "/lv/notes",
      },
    },
  }
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dictionary = getDictionary(locale)

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <div className="bg-background">
        <section className="mx-auto max-w-screen-xl px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-32">
          <p className="text-sm italic text-muted-foreground">{dictionary.notes.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
            {dictionary.notes.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {dictionary.notes.intro}
          </p>
        </section>

        <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 px-4 pb-24 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} href={`/${locale}/notes/${note.slug}`} />
          ))}
        </section>
      </div>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}
