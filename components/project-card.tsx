"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import type { ProjectArchiveEntry } from "@/content/projects"

type ProjectCardProps = {
  project: ProjectArchiveEntry
  href: string
  index: number
  actionLabel: string
}

export function ProjectCard({ project, href, index, actionLabel }: ProjectCardProps) {
  const accentColor = project.brandColors?.primary ?? "#0B63FF"

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0, 1],
        delay: index * 0.08,
      }}
      className="group block"
      aria-label={`${actionLabel}: ${project.name}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
        <div className="absolute left-0 top-0 h-full w-1.5 opacity-90" style={{ backgroundColor: accentColor }} />

        {project.logo && (
          <div className="absolute bottom-4 left-4 max-w-[68%] rounded-lg bg-gradient-to-r from-white/95 to-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="h-5 max-w-full object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
              {project.detail.period}
            </span>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
              {project.type}
            </span>
          </div>

          <h3 className="text-lg font-medium transition-colors group-hover:text-muted-foreground">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>

        <div className="hidden items-center gap-1 text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
          <span>{actionLabel}</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}
