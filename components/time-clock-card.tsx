"use client"

import { useEffect, useState } from "react"
import { AnalogClock } from "./analog-clock"

export function TimeClockCard() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<string>("--:--")
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

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
  }, [mounted])

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-[32px] bg-[#1c1c1e] h-full flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 gap-4 sm:gap-0">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Left side - Text info */}
      <div className="relative z-10 flex flex-col justify-between sm:h-full py-1 text-center sm:text-left w-full sm:w-auto">
        <div>
          <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-medium">Local Time</p>
          <p className="text-xs sm:text-sm lg:text-base text-white/70 mt-1 capitalize">{date}</p>
        </div>

        <div className="mt-3 sm:mt-0">
          <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight tabular-nums">
            {time}
          </p>
          <p className="text-[10px] sm:text-xs lg:text-sm text-white/40 mt-1 uppercase tracking-wider">GMT+2</p>
        </div>
      </div>

      {/* Right side - Analog clock */}
      <div className="relative z-10 flex items-center justify-center sm:pr-2 md:pr-4 lg:pr-6">
        <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 xl:scale-110 origin-center">
          <AnalogClock timezone="Europe/Riga" size={120} />
        </div>
      </div>
    </div>
  )
}
