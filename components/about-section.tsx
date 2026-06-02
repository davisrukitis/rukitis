"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LocationMapCard } from "./location-map-card"
import { TimeClockCard } from "./time-clock-card"
import { ImageLightbox } from "./image-lightbox"

export function AboutSection() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState("")

  const hobbies = [
    "Digital odds & ends",
    "Padel",
    "Bouldering",
    "Art",
    "Hiking",
    "Analog Videography",
    "Running",
    "Outdoors",
    "Gym",
    "Photography",
    "Cinnamon rolls",
    "Formula 1 (maybe a little too much)",
  ]

  const images = [
    {
      src: "https://0.gravatar.com/userimage/272446670/3c377474f09fa13ef78dd654ce48b4e1?size=512&axis=min",
      alt: "Personal photo",
    },
    {
      src: "https://2.gravatar.com/userimage/272446670/0e561e42f7af848365662dcf02d28b83?size=512&axis=min",
      alt: "Padel",
    },
    {
      src: "https://1.gravatar.com/userimage/272446670/d380e4513d1dde1bbb6525dcb67d0755?size=512&axis=min",
      alt: "Bouldering",
    },
    {
      src: "https://0.gravatar.com/userimage/272446670/bd4628ae1d3b1559d5541a0d54f9831b?size=512&axis=min",
      alt: "Art",
    },
  ]

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxAlt(alt)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxAlt("")
  }

  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Get to know me</h2>
        </motion.div>

        <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
          {/* Row 1: About Me + Time Clock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {/* About Me Text Block - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sm:col-span-2 bg-[#f5f5f7] rounded-2xl md:rounded-[32px] p-5 md:p-6 lg:p-8 flex flex-col justify-end min-h-[180px] sm:min-h-[220px] md:h-[300px] lg:h-[320px]"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 md:mb-3">About Me</p>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                Dāvis Rūķītis
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 md:mt-3 leading-relaxed">
                Driven by creativity, collaboration, and innovation, I find inspiration in the outdoors and have a deep
                passion for the arts, which fuels my work and personal life alike.
              </p>
            </motion.div>

            {/* Time & Clock Block - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="sm:col-span-2 min-h-[180px] sm:min-h-[220px] md:h-[300px] lg:h-[320px]"
            >
              <TimeClockCard />
            </motion.div>
          </div>

          {/* Row 2: 2 Images + Map */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 rounded-2xl md:rounded-[32px] overflow-hidden aspect-square md:aspect-auto md:h-[300px] lg:h-[320px] cursor-pointer"
              onClick={() => openLightbox(images[0].src, images[0].alt)}
            >
              <img
                src={images[0].src || "/placeholder.svg"}
                alt={images[0].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="col-span-1 rounded-2xl md:rounded-[32px] overflow-hidden aspect-square md:aspect-auto md:h-[300px] lg:h-[320px] cursor-pointer"
              onClick={() => openLightbox(images[1].src, images[1].alt)}
            >
              <img
                src={images[1].src || "/placeholder.svg"}
                alt={images[1].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-2 min-h-[200px] md:h-[300px] lg:h-[320px]"
            >
              <LocationMapCard />
            </motion.div>
          </div>

          {/* Row 3: What I Love + 2 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {/* What I Love Block - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="col-span-2 bg-[#1c1c1e] rounded-2xl md:rounded-[32px] p-5 md:p-6 lg:p-8 flex flex-col min-h-[220px] md:h-[300px] lg:h-[320px]"
            >
              <p className="text-xs text-white/50 uppercase tracking-wider mb-3 md:mb-4">What I Love</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 lg:gap-3 flex-1 content-start overflow-y-auto">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-white/10 rounded-full text-white font-medium whitespace-nowrap h-fit text-sm sm:text-xs"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-1 rounded-2xl md:rounded-[32px] overflow-hidden aspect-square md:aspect-auto md:h-[300px] lg:h-[320px] cursor-pointer"
              onClick={() => openLightbox(images[2].src, images[2].alt)}
            >
              <img
                src={images[2].src || "/placeholder.svg"}
                alt={images[2].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Image 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="col-span-1 rounded-2xl md:rounded-[32px] overflow-hidden aspect-square md:aspect-auto md:h-[300px] lg:h-[320px] cursor-pointer"
              onClick={() => openLightbox(images[3].src, images[3].alt)}
            >
              <img
                src={images[3].src || "/placeholder.svg"}
                alt={images[3].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <ImageLightbox src={lightboxImage || "/placeholder.svg"} alt={lightboxAlt} onClose={closeLightbox} />
      )}
    </section>
  )
}
