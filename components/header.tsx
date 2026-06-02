"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl"
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="/d-logo.svg" alt="Logo" width={24} height={24} />
          </a>
          <nav className="flex items-center gap-8">
            <a href="#projects" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#experience" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Experience
            </a>
            <a
              href="mailto:davis@rukitis.com"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
