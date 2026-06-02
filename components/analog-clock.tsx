"use client"

import { useEffect, useState } from "react"

interface AnalogClockProps {
  timezone?: string
  size?: number
}

export function AnalogClock({ timezone = "Europe/Riga", size = 120 }: AnalogClockProps) {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted || !time) {
    return (
      <svg viewBox="-50 -50 100 100" width={size} height={size}>
        <circle r="48" fill="white" stroke="#333" strokeWidth="1" />
      </svg>
    )
  }

  // Get time in specified timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })

  const parts = formatter.formatToParts(time)
  const hours = Number.parseInt(parts.find((p) => p.type === "hour")?.value || "0")
  const minutes = Number.parseInt(parts.find((p) => p.type === "minute")?.value || "0")
  const seconds = Number.parseInt(parts.find((p) => p.type === "second")?.value || "0")

  // Calculate rotation angles
  const hourRotation = 30 * hours + minutes / 2
  const minuteRotation = 6 * minutes + seconds / 10
  const secondRotation = 6 * seconds

  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className="drop-shadow-lg">
      {/* Clock face */}
      <circle r="48" fill="white" stroke="#333" strokeWidth="1" className="clock-face" />

      {/* Minute/second markers */}
      {Array.from({ length: 60 }).map((_, i) => {
        const isMajor = i % 5 === 0
        return (
          <line
            key={i}
            x1="0"
            y1={isMajor ? "-40" : "-43"}
            x2="0"
            y2="-46"
            stroke={isMajor ? "#333" : "#999"}
            strokeWidth={isMajor ? 1 : 0.5}
            transform={`rotate(${6 * i})`}
          />
        )
      })}

      {/* Hour hand */}
      <line
        x1="0"
        y1="4"
        x2="0"
        y2="-22"
        stroke="#333"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${hourRotation})`}
      />

      {/* Minute hand */}
      <line
        x1="0"
        y1="6"
        x2="0"
        y2="-32"
        stroke="#666"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${minuteRotation})`}
      />

      {/* Second hand with counterweight */}
      <g transform={`rotate(${secondRotation})`}>
        <line x1="0" y1="0" x2="0" y2="-40" stroke="rgb(180, 0, 0)" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="12" stroke="rgb(180, 0, 0)" strokeWidth="3" />
        <circle r="2.5" fill="rgb(180, 0, 0)" />
      </g>

      {/* Center dot */}
      <circle r="1.5" fill="#333" />
    </svg>
  )
}
