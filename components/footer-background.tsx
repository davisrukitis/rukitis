"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface FooterBackgroundProps {
  className?: string
  pixelSize?: number
  border?: boolean
}

// Perlin noise setup
const p = new Uint8Array(512)
const permutation = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21,
  10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149,
  56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
  122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209,
  76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
  226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
  223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
  108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179,
  162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50,
  45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
]
for (let i = 0; i < 256; i++) {
  p[i] = permutation[i]
  p[256 + i] = permutation[i]
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a)
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3
  const u = h < 2 ? x : y
  const v = h < 2 ? y : x
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const u = fade(xf)
  const v = fade(yf)
  const aa = p[p[X] + Y]
  const ab = p[p[X] + Y + 1]
  const ba = p[p[X + 1] + Y]
  const bb = p[p[X + 1] + Y + 1]
  return lerp(
    v,
    lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf)),
    lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1)),
  )
}

function fbm(x: number, y: number, octaves = 4): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let maxValue = 0
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency)
    maxValue += amplitude
    amplitude *= 0.5
    frequency *= 2
  }
  return value / maxValue
}

function getHeatmapColor(value: number): { r: number; g: number; b: number } {
  const v = Math.max(0, Math.min(1, value))
  const colors = [
    { r: 59, g: 130, b: 246 }, // blue
    { r: 6, g: 182, b: 212 }, // cyan
    { r: 34, g: 197, b: 94 }, // green
    { r: 250, g: 204, b: 21 }, // yellow
    { r: 249, g: 115, b: 22 }, // orange
    { r: 239, g: 68, b: 68 }, // red
  ]
  const segment = v * (colors.length - 1)
  const i = Math.floor(segment)
  const t = segment - i
  const c1 = colors[Math.min(i, colors.length - 1)]
  const c2 = colors[Math.min(i + 1, colors.length - 1)]
  return {
    r: Math.round(c1.r + t * (c2.r - c1.r)),
    g: Math.round(c1.g + t * (c2.g - c1.g)),
    b: Math.round(c1.b + t * (c2.b - c1.b)),
  }
}

function drawStaticPattern(ctx: CanvasRenderingContext2D, width: number, height: number, pixelSize: number) {
  const cols = Math.floor(width / pixelSize)
  const rows = Math.floor(height / pixelSize)

  // Fill with light background
  ctx.fillStyle = "#f5f5f5"
  ctx.fillRect(0, 0, width, height)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * pixelSize
      const y = row * pixelSize

      // Checkerboard base
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = "#ebebeb"
        ctx.fillRect(x, y, pixelSize, pixelSize)
      }

      // Static noise pattern
      const noiseX = col * 0.015
      const noiseY = row * 0.015

      const n1 = fbm(noiseX, noiseY, 4)
      const n2 = fbm(noiseX * 1.5 + 100, noiseY * 1.5 + 100, 3)
      const n3 = fbm(noiseX * 0.8 + 200, noiseY * 0.8 + 200, 3)

      const combined = (n1 + n2 * 0.7 + n3 * 0.5) / 2.2
      const normalized = (combined + 1) / 2

      if (normalized > 0.35) {
        const intensity = (normalized - 0.35) / 0.65
        const color = getHeatmapColor(intensity)
        const alpha = Math.min(1, intensity * 1.5)

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`

        // Draw cross shape
        const dotSize = pixelSize * 0.7
        const offset = (pixelSize - dotSize) / 2
        const crossWidth = dotSize * 0.4
        const crossOffset = (dotSize - crossWidth) / 2

        ctx.fillRect(x + offset, y + offset + crossOffset, dotSize, crossWidth)
        ctx.fillRect(x + offset + crossOffset, y + offset, crossWidth, dotSize)
      }
    }
  }
}

export function FooterBackground({ className = "", pixelSize = 6, border = true }: FooterBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 800, height: 320 })

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    handleResize()

    let resizeTimeout: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", throttledResize)
    return () => {
      window.removeEventListener("resize", throttledResize)
      clearTimeout(resizeTimeout)
    }
  }, [handleResize])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    drawStaticPattern(ctx, dimensions.width, dimensions.height, pixelSize)
  }, [mounted, dimensions, pixelSize])

  if (!mounted) {
    return (
      <div ref={containerRef} className={`absolute inset-0 -z-10 bg-neutral-100 ${className}`} aria-hidden="true" />
    )
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Top gradient for smooth transition */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />

      {border && (
        <>
          <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-300" />
          <div className="absolute inset-0 ring-1 ring-inset ring-neutral-200 pointer-events-none" />
        </>
      )}
    </div>
  )
}
