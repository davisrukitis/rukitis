"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

function InteractiveLetter({
  letter,
  index,
  offsetY,
}: {
  letter: string
  index: number
  offsetY: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const colors = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#eab308", // yellow
    "#22c55e", // green
    "#f97316", // orange
    "#a855f7", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
  ]

  if (letter === " ") {
    return <span className="inline-block w-3 md:w-5" />
  }

  return (
    <motion.span
      className="inline-block cursor-pointer select-none"
      style={{
        fontFamily: "var(--font-cedarville), cursive",
        color: isHovered ? colors[index % colors.length] : "inherit",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -12 : offsetY,
        rotate: isHovered ? [-5, 5, -5, 0] : 0,
        scale: isHovered ? 1.15 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
    >
      {letter}
    </motion.span>
  )
}

function CurvedText() {
  const mainText = "That's all Folks!"

  const getCurveOffset = (index: number, total: number) => {
    const mid = (total - 1) / 2
    const distance = Math.abs(index - mid) / mid
    return distance * distance * 20
  }

  return (
    <div className="flex items-end justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
      {mainText.split("").map((letter, index) => (
        <InteractiveLetter key={index} letter={letter} index={index} offsetY={getCurveOffset(index, mainText.length)} />
      ))}
    </div>
  )
}

function FlowerComposition() {
  return (
    <div className="flex items-end justify-center gap-0">
      {/* Left leaf - closer on desktop, less on mobile/tablet */}
      <motion.div
        className="relative w-12 h-20 sm:w-16 sm:h-24 md:w-20 md:h-32 -mr-4 sm:-mr-6 lg:-mr-14"
        style={{ transformOrigin: "bottom center" }}
        animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Image src="/svg-flower/left-leaf.svg" alt="" fill className="object-contain object-bottom" />
      </motion.div>

      {/* Left flower */}
      <motion.div
        className="relative w-16 h-24 sm:w-20 sm:h-32 md:w-28 md:h-40 -mr-2 sm:-mr-3 lg:-mr-6"
        style={{ transformOrigin: "bottom center" }}
        animate={{ rotate: [0, 1, 0, -1, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      >
        <Image src="/svg-flower/left-flower.svg" alt="" fill className="object-contain object-bottom" />
      </motion.div>

      {/* Right flower - very close to left flower */}
      <motion.div
        className="relative w-16 h-24 sm:w-20 sm:h-32 md:w-28 md:h-40 -ml-2 sm:-ml-3 lg:-ml-6"
        style={{ transformOrigin: "bottom center" }}
        animate={{ rotate: [0, -1, 0, 1, 0] }}
        transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src="/svg-flower/right-flower.svg" alt="" fill className="object-contain object-bottom" />
      </motion.div>

      {/* Right leaf - closer on desktop, less on mobile/tablet */}
      <motion.div
        className="relative w-12 h-20 sm:w-16 sm:h-24 md:w-20 md:h-32 -ml-4 sm:-ml-6 lg:-ml-14"
        style={{ transformOrigin: "bottom center" }}
        animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
        transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.7 }}
      >
        <Image src="/svg-flower/right-leaf.svg" alt="" fill className="object-contain object-bottom" />
      </motion.div>
    </div>
  )
}

export function ContactCTA() {
  return (
    <section className="py-12 md:py-16 lg:py-24 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-16 items-center">
          {/* Left side - Curved interactive text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            <CurvedText />
            <motion.p
              className="text-muted-foreground mt-4 font-medium italic text-sm md:text-sm ml-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              (for now, at least)
            </motion.p>
          </motion.div>

          {/* Right side - Flower composition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end justify-center"
          >
            <FlowerComposition />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
