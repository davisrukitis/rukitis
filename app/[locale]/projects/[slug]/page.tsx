import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectDetail } from "@/components/project-detail"
import { SiteFooter } from "@/components/site-footer"
import { getProjectBySlug, getProjectSlugs } from "@/content/projects"
import { getDictionary, siteConfig } from "@/content/site"
import { isLocale, locales, type Locale } from "@/lib/i18n"

type ProjectPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    return {}
  }

  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.name} — ${siteConfig.name}`,
    description: project.detail.summary,
    alternates: {
      canonical: `/${localeParam}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        lv: `/lv/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.name} — ${siteConfig.name}`,
      description: project.detail.summary,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
    return null
  }

  const dictionary = getDictionary(locale)

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <div className="bg-background pb-16">
        <ProjectDetail project={project} labels={dictionary.projects} />
      </div>

      <SiteFooter locale={locale} copy={dictionary.footer} />
    </main>
  )
}
