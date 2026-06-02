"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { LocationMapCard } from "./location-map-card"
import { AnalogClock } from "./analog-clock"

export function LocationTime() {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const rigaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Riga",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)

      const rigaDate = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Riga",
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(now)

      setTime(rigaTime)
      setDate(rigaDate)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-4 items-stretch">
      {/* Map Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center shadow-none"
      >
        <LocationMapCard />
      </motion.div>

      {/* Time Block - redesigned with analog clock on right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-[32px] bg-[#1c1c1e] aspect-[2/1] flex items-center justify-between p-6 md:p-8 lg:p-10 xl:p-12"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        {/* Left side - Text info */}
        <div className="relative z-10 flex flex-col justify-between h-full py-1">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Local Time</p>
            <p className="text-sm lg:text-base text-white/70 mt-1 capitalize">{date}</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight tabular-nums">
              {time || "--:--"}
            </p>
            <p className="text-xs lg:text-sm text-white/40 mt-1 uppercase tracking-wider">GMT+2</p>
          </div>
        </div>

        {/* Right side - Analog clock */}
        <div className="relative z-10 flex items-center justify-center pr-2 md:pr-4 lg:pr-6 xl:pr-8">
          <div className="md:scale-125 lg:scale-[1.4] xl:scale-[1.75] origin-center">
            <AnalogClock timezone="Europe/Riga" size={140} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
