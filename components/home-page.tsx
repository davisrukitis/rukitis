"use client"

import { useEffect, useRef, useState } from "react"

import { AboutSection } from "@/components/about-section"
import { ContactCTA } from "@/components/contact-cta"
import { ExperienceSection } from "@/components/experience-section"
import { FeaturedEvent } from "@/components/featured-event"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { SiteFooter } from "@/components/site-footer"
import { getDictionary } from "@/content/site"
import type { Locale } from "@/lib/i18n"

type HomePageProps = {
  locale: Locale
}

export function HomePage({ locale }: HomePageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const footerRef = useRef<HTMLElement | null>(null)
  const dictionary = getDictionary(locale)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const footerEl = footerRef.current

      if (!footerEl) {
        return
      }

      const rect = footerEl.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const start = viewportHeight
      const end = viewportHeight * 0.3
      const raw = (start - rect.top) / (start - end)
      const clamped = Math.max(0, Math.min(1, raw))

      setScrollProgress(clamped)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) {
        return
      }

      window.requestAnimationFrame(updateProgress)
      ticking = true
    }

    updateProgress()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const contentRadius = 23.977 * scrollProgress
  const contentScale = 1 - (1 - 0.950048) * scrollProgress

  return (
    <main className="min-h-screen bg-[#0B63FF]">
      <div
        className="relative overflow-hidden bg-background"
        style={{
          transform: scrollProgress === 0 ? "none" : `scale(${contentScale})`,
          transformOrigin: "center bottom",
          borderBottomLeftRadius: `${contentRadius}px`,
          borderBottomRightRadius: `${contentRadius}px`,
          transition: "transform 300ms ease-out, border-radius 300ms ease-out",
        }}
      >
        <Hero />
        <FeaturedEvent />
        <ProjectsSection locale={locale} label={dictionary.home.selectedProjects} actionLabel={dictionary.projects.openProject} />
        <AboutSection />
        <ExperienceSection />
        <ContactCTA />
      </div>

      <SiteFooter ref={footerRef} locale={locale} copy={dictionary.footer} />
    </main>
  )
}
