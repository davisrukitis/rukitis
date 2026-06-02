import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { getAllProjectEntries } from "@/content/projects"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type ProjectsPageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${dictionary.projects.title} — ${siteConfig.name}`,
    description: dictionary.projects.intro,
    alternates: {
      canonical: `/${localeParam}/projects`,
      languages: {
        en: "/en/projects",
        lv: "/lv/projects",
      },
    },
  }
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dictionary = getDictionary(locale)
  const projects = getAllProjectEntries()

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <div className="bg-background">
        <section className="mx-auto max-w-screen-xl px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-32">
          <p className="text-sm italic text-muted-foreground">{dictionary.projects.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
            {dictionary.projects.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {dictionary.projects.intro}
          </p>
        </section>

        <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 pb-24 sm:grid-cols-2 sm:px-6 md:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              href={`/${locale}/projects/${project.id}`}
              index={index}
              actionLabel={dictionary.projects.openProject}
            />
          ))}
        </section>
      </div>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}
