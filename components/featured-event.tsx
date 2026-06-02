"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, ArrowUpRight } from "lucide-react"

export function FeaturedEvent() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => setVideoLoaded(true)
    const handleError = () => setVideoError(true)

    video.addEventListener("loadeddata", handleLoaded)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadeddata", handleLoaded)
      video.removeEventListener("error", handleError)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <motion.a
          href="https://necom.lv"
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-900">
            {/* Video */}
            {!videoError && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src="https://rimirigamarathon.com/wp-content/uploads/2025/05/264-web.mp4" type="video/mp4" />
              </video>
            )}

            {/* Fallback - simple gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 transition-opacity duration-700 ${
                videoLoaded && !videoError ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Play/Pause button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                togglePlay()
              }}
              className={`absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 border border-white/20 rounded-lg backdrop-blur-sm transition-all ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>

            {/* View link */}
            <div
              className={`absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-full text-sm font-medium text-neutral-900 transition-all ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              View
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Content below video */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                Nords Event Communications
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Agency Site</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <span className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                Web Design
              </span>
              <span className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                Development
              </span>
              <span className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                Project Management
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
