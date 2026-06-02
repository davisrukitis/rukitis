"use client"

import { motion } from "framer-motion"
import { SvgPlayground } from "./svg-playground"

export function Hero() {
  return (
    <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="inline-flex items-center mb-4 md:mb-6 rounded-full bg-neutral-100 border-neutral-200 shadow-none leading-7 border-0 px-4 py-2 md:px-5 md:py-2.5"
            >
              <span className="font-medium tracking-wide text-neutral-900 text-sm md:text-base">Dāvis Rūķītis</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-3xl text-balance">
              Crafting experiences that bring people together.
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
            >
              <span className="text-xs sm:text-sm text-muted-foreground">Riga, Latvia</span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              <span className="text-xs sm:text-sm text-muted-foreground">Digital Operations, Events &amp; Design</span>
            </motion.div>
          </motion.div>

          {/* Right: Playful SVG editor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <SvgPlayground />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
