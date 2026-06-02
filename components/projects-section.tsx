"use client"

import { motion } from "framer-motion"

import { ProjectCard } from "@/components/project-card"
import { getHomepageProjectEntries } from "@/content/projects"
import type { Locale } from "@/lib/i18n"

type ProjectsSectionProps = {
  locale: Locale
  label: string
  actionLabel: string
}

export function ProjectsSection({ locale, label, actionLabel }: ProjectsSectionProps) {
  const projects = getHomepageProjectEntries()

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-sm text-muted-foreground md:mb-12"
        >
          {label}
        </motion.p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              href={`/${locale}/projects/${project.id}`}
              index={index}
              actionLabel={actionLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
