import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import Image from "next/image"

import type { ProjectArchiveEntry, RegistrationDataPoint } from "@/content/projects"

type ProjectDetailLabels = {
  externalLink: string
  year: string
  role: string
  facts: string
  media: string
  notes: string
  registrationGrowth: string
}

type ProjectDetailProps = {
  project: ProjectArchiveEntry
  labels: ProjectDetailLabels
}

export function ProjectDetail({ project, labels }: ProjectDetailProps) {
  const accentColor = project.brandColors?.primary ?? "#0B63FF"
  const externalUrl = project.detail.externalUrl || project.officialSiteUrl || project.link

  return (
    <article className="bg-background">
      <header className="mx-auto max-w-screen-xl px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                {project.type}
              </span>
              <span
                className="rounded-full px-3 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: accentColor }}
              >
                {project.detail.period}
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
              {project.name}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.detail.summary}
            </p>
          </div>

          <div className="rounded-3xl bg-neutral-100 p-5 md:p-6">
            {project.logo && (
              <div className="mb-6 rounded-2xl bg-white p-5">
                <img src={project.logo} alt={`${project.name} logo`} className="max-h-12 max-w-full object-contain" />
              </div>
            )}

            <dl className="space-y-4 text-sm">
              <InfoRow label={labels.year} value={project.detail.period} />
              <InfoRow label={labels.role} value={project.detail.role} />
            </dl>

            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              >
                {labels.externalLink}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionLabel>{labels.role}</SectionLabel>
          <ul className="grid gap-3 text-base leading-relaxed text-neutral-800 md:grid-cols-2">
            {project.detail.myPart.map((item) => (
              <li key={item} className="rounded-3xl bg-neutral-100 p-5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionLabel>{labels.facts}</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.detail.facts.map((fact) => (
              <div key={`${fact.label}-${fact.value}`} className="rounded-3xl bg-neutral-100 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{fact.label}</p>
                <p className="mt-3 text-xl font-semibold leading-tight">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.detail.registrationGrowth && (
        <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14">
          <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
            <SectionLabel>{labels.registrationGrowth}</SectionLabel>
            <RegistrationGrowthChart data={project.detail.registrationGrowth} accentColor={accentColor} />
          </div>
        </section>
      )}

      {project.detail.media.length > 0 && (
        <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14">
          <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
            <SectionLabel>{labels.media}</SectionLabel>
            <div className="grid gap-4 md:grid-cols-2">
              {project.detail.media.map((item) => {
                if (item.type === "video") {
                  return (
                    <div key={item.src} className="overflow-hidden rounded-3xl bg-neutral-100">
                      <div className="aspect-video">
                        <iframe
                          src={item.src}
                          title={item.label || `${project.name} video`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      {item.label && <p className="px-5 py-4 text-sm text-muted-foreground">{item.label}</p>}
                    </div>
                  )
                }

                return (
                  <figure key={item.src} className="overflow-hidden rounded-3xl bg-neutral-100">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={item.src}
                        alt={item.alt || project.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {item.label && <figcaption className="px-5 py-4 text-sm text-muted-foreground">{item.label}</figcaption>}
                  </figure>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {project.detail.note && (
        <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14">
          <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
            <SectionLabel>{labels.notes}</SectionLabel>
            <p className="max-w-3xl rounded-3xl bg-neutral-100 p-6 text-base leading-relaxed text-neutral-800">
              {project.detail.note}
            </p>
          </div>
        </section>
      )}
    </article>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-medium italic text-muted-foreground">{children}</h2>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-relaxed text-neutral-900">{value}</dd>
    </div>
  )
}

function RegistrationGrowthChart({ data, accentColor }: { data: RegistrationDataPoint[]; accentColor: string }) {
  const max = Math.max(...data.map((item) => item.registrations))

  return (
    <div className="rounded-3xl bg-neutral-100 p-5 md:p-6">
      <div className="space-y-4">
        {data.map((item) => {
          const width = `${Math.max(8, (item.registrations / max) * 100)}%`

          return (
            <div key={item.year} className="grid gap-2 sm:grid-cols-[4rem_minmax(0,1fr)_8rem] sm:items-center">
              <p className="text-sm font-medium">{item.year}</p>
              <div className="h-4 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full" style={{ width, backgroundColor: accentColor }} />
              </div>
              <p className="text-sm text-muted-foreground sm:text-right">
                {item.registrations.toLocaleString("en-US")}
                {item.change ? <span className="ml-1 text-xs">+{item.change.toLocaleString("en-US")}</span> : null}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
