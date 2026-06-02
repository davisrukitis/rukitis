"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { RotateCcw, ZoomIn, ZoomOut, Grid3X3, Maximize2, Minimize2, Move } from "lucide-react"

// The 2 exact SVG paths provided
const INNER_PATH_ORIGINAL =
  "M1310 1771H1464V1694H1541V1617H1618V1463H1695V847H1464V770H1233V1001H1156V1309H1079V1617H1002V1848H1310V1771ZM1387 1925H771V1848H848V1617H925V1309H1002V1001H1079V770H1002V693H1618V770H1772V847H1849V1463H1772V1617H1695V1694H1618V1771H1541V1848H1387V1925Z"

const OUTER_PATH_ORIGINAL =
  "M1619 77H1850V154H2004V231H2158V308H2235V385H2312V462H2389V539H2466V693H2543V847H2620V1386H2619V1771H2542V1925H2465V2079H2388V2156H2311V2233H2234V2310H2157V2387H2003V2464H1849V2541H1618V2618H1002V2541H771V2464H617V2387H463V2310H386V2233H309V2156H232V2079H155V1925H78V1771H1V1386H0V847H77V693H154V539H231V462H308V385H385V308H462V231H616V154H770V77H1001V0H1619V77ZM1001 231H770V308H616V385H539V462H462V539H385V616H308V770H231V924H154V1386H155V1694H232V1848H309V2002H386V2079H463V2156H540V2233H617V2310H771V2387H1002V2464H1618V2387H1849V2310H2003V2233H2080V2156H2157V2079H2234V2002H2311V1848H2388V1694H2465V1386H2466V924H2389V770H2312V616H2235V539H2158V462H2081V385H2004V308H1850V231H1619V154H1001V231Z"

type Point = { x: number; y: number }

type ShapeState = {
  id: string
  name: string
  color: string
  points: Point[][] // Array of subpaths, each containing points
}

// Normalize path to absolute L commands, returning array of subpaths (for M...Z segments)
function normalizePathToPoints(pathD: string): Point[][] {
  const subpaths: Point[][] = []
  let currentPath: Point[] = []
  let currentX = 0
  let currentY = 0

  const regex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(pathD)) !== null) {
    const cmd = match[1].toUpperCase()
    const args = match[2]
      .trim()
      .split(/[\s,]+/)
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => !isNaN(n))

    if (cmd === "M") {
      if (currentPath.length > 0) {
        subpaths.push(currentPath)
        currentPath = []
      }
      for (let i = 0; i < args.length; i += 2) {
        if (i + 1 < args.length) {
          currentX = args[i]
          currentY = args[i + 1]
          currentPath.push({ x: currentX, y: currentY })
        }
      }
    } else if (cmd === "L") {
      for (let i = 0; i < args.length; i += 2) {
        if (i + 1 < args.length) {
          currentX = args[i]
          currentY = args[i + 1]
          currentPath.push({ x: currentX, y: currentY })
        }
      }
    } else if (cmd === "H") {
      for (let i = 0; i < args.length; i++) {
        currentX = args[i]
        currentPath.push({ x: currentX, y: currentY })
      }
    } else if (cmd === "V") {
      for (let i = 0; i < args.length; i++) {
        currentY = args[i]
        currentPath.push({ x: currentX, y: currentY })
      }
    } else if (cmd === "Z") {
      // Close path - don't add point, just mark end of subpath
      if (currentPath.length > 0) {
        subpaths.push(currentPath)
        currentPath = []
      }
    }
    // Skip C, Q, etc. for now - these paths only use M, L, H, V, Z
  }

  if (currentPath.length > 0) {
    subpaths.push(currentPath)
  }

  return subpaths
}

// Convert points back to path string
function pointsToPath(subpaths: Point[][]): string {
  return subpaths
    .map((subpath) => {
      if (subpath.length === 0) return ""
      const first = subpath[0]
      const rest = subpath.slice(1)
      return `M${Math.round(first.x)} ${Math.round(first.y)}${rest.map((p) => `L${Math.round(p.x)} ${Math.round(p.y)}`).join("")}Z`
    })
    .join("")
}

// Initialize shapes with normalized points
function initializeShapes(): ShapeState[] {
  return [
    {
      id: "outer",
      name: "Outer Border",
      color: "#2563eb",
      points: normalizePathToPoints(OUTER_PATH_ORIGINAL),
    },
    {
      id: "inner",
      name: "Inner D",
      color: "#dc2626",
      points: normalizePathToPoints(INNER_PATH_ORIGINAL),
    },
  ]
}

export function SvgPlayground() {
  const [mounted, setMounted] = useState(false)
  const [shapes, setShapes] = useState<ShapeState[]>(initializeShapes)
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const [draggingPoint, setDraggingPoint] = useState<{
    shapeId: string
    subpathIdx: number
    pointIdx: number
  } | null>(null)
  const [dragCoords, setDragCoords] = useState<{ x: number; y: number } | null>(null)

  const [zoom, setZoom] = useState(0.85)
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 })
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const gridSize = 77

  const [deviceType, setDeviceType] = useState<"mac" | "windows" | "other">("other")

  useEffect(() => {
    setMounted(true)
    // Detect OS
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes("mac")) {
      setDeviceType("mac")
    } else if (ua.includes("win")) {
      setDeviceType("windows")
    }
  }, [])

  const scrollInstruction = useMemo(() => {
    switch (deviceType) {
      case "mac":
        return "Scroll to zoom · Option+drag to pan"
      case "windows":
        return "Scroll to zoom · Alt+drag to pan"
      default:
        return "Scroll to zoom · Alt+drag to pan"
    }
  }, [deviceType])

  const containerSize = useMemo(() => {
    if (typeof window === "undefined") {
      return expanded ? { width: 900, height: 800 } : { width: 600, height: 640 }
    }

    const w = window.innerWidth
    const h = window.innerHeight

    if (expanded) {
      // Use viewport dimensions with padding, capped at reasonable sizes
      return {
        width: Math.min(w - 48, 1200),
        height: Math.min(h - 120, 900),
      }
    }

    // Normal mode - responsive
    if (w < 640) return { width: Math.min(360, w - 32), height: 400 }
    if (w < 1024) return { width: 500, height: 520 }
    return { width: 600, height: 640 }
  }, [expanded])

  const selectedShape = shapes.find((s) => s.id === selectedShapeId)
  const flattenedPoints = useMemo(() => {
    if (!selectedShape) return []
    const result: { x: number; y: number; subpathIdx: number; pointIdx: number }[] = []
    selectedShape.points.forEach((subpath, subpathIdx) => {
      subpath.forEach((pt, pointIdx) => {
        result.push({ ...pt, subpathIdx, pointIdx })
      })
    })
    return result
  }, [selectedShape])

  const getSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current
      if (!svg) return { x: 0, y: 0 }
      const rect = svg.getBoundingClientRect()

      // Get the center of the SVG element
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Position relative to SVG element
      const relX = clientX - rect.left
      const relY = clientY - rect.top

      // Position relative to center (since transform-origin is center)
      const fromCenterX = relX - centerX
      const fromCenterY = relY - centerY

      // Reverse the zoom
      const unzoomedX = fromCenterX / zoom
      const unzoomedY = fromCenterY / zoom

      // Add back center and convert to viewBox coordinates
      const baseScaleX = 2620 / rect.width
      const baseScaleY = 2618 / rect.height

      // Apply pan offset (also needs to be scaled)
      let x = (unzoomedX + centerX - panOffset.x) * baseScaleX
      let y = (unzoomedY + centerY - panOffset.y) * baseScaleY

      if (snapToGrid) {
        x = Math.round(x / gridSize) * gridSize
        y = Math.round(y / gridSize) * gridSize
      }

      return { x, y }
    },
    [zoom, panOffset, snapToGrid, gridSize],
  )

  const getCurrentPointCoords = useCallback(() => {
    if (!draggingPoint || !selectedShape) return null
    const subpath = selectedShape.points[draggingPoint.subpathIdx]
    if (!subpath) return null
    const point = subpath[draggingPoint.pointIdx]
    return point || null
  }, [draggingPoint, selectedShape])

  const onPointPointerDown = (e: React.PointerEvent, subpathIdx: number, pointIdx: number, shapeId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    const shape = shapes.find((s) => s.id === shapeId)
    if (shape) {
      const point = shape.points[subpathIdx]?.[pointIdx]
      if (point) {
        const clickCoords = getSvgCoords(e.clientX, e.clientY)
        dragOffsetRef.current = {
          x: point.x - clickCoords.x,
          y: point.y - clickCoords.y,
        }
        setDragCoords({ x: point.x, y: point.y })
      }
    }

    setDraggingPoint({ shapeId, subpathIdx, pointIdx })
    setSelectedShapeId(shapeId)
  }

  const onShapeClick = (e: React.MouseEvent, shapeId: string) => {
    e.stopPropagation()
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setSelectedShapeId((prev) => (prev === shapeId ? null : shapeId))
  }

  const onShapeEnter = (shapeId: string) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    if (!selectedShapeId && !draggingPoint) {
      setSelectedShapeId(shapeId)
    }
  }

  const onShapeLeave = () => {
    if (draggingPoint) return
    hideTimeoutRef.current = setTimeout(() => {
      if (!draggingPoint) {
        setSelectedShapeId(null)
      }
    }, 2000)
  }

  const onPointEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }

  useEffect(() => {
    if (!draggingPoint) return

    const onMove = (e: PointerEvent) => {
      const rawCoords = getSvgCoords(e.clientX, e.clientY)
      // Apply the offset so point doesn't jump
      const coords = {
        x: rawCoords.x + dragOffsetRef.current.x,
        y: rawCoords.y + dragOffsetRef.current.y,
      }

      // Apply snap after offset
      let finalX = coords.x
      let finalY = coords.y
      if (snapToGrid) {
        finalX = Math.round(finalX / gridSize) * gridSize
        finalY = Math.round(finalY / gridSize) * gridSize
      }

      setDragCoords({ x: Math.round(finalX), y: Math.round(finalY) })

      setShapes((prev) =>
        prev.map((shape) => {
          if (shape.id !== draggingPoint.shapeId) return shape
          const newPoints = shape.points.map((subpath, si) =>
            si === draggingPoint.subpathIdx
              ? subpath.map((pt, pi) => (pi === draggingPoint.pointIdx ? { x: finalX, y: finalY } : pt))
              : subpath,
          )
          return { ...shape, points: newPoints }
        }),
      )
    }

    const onUp = () => {
      setDraggingPoint(null)
      setDragCoords(null)
      dragOffsetRef.current = { x: 0, y: 0 }
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [draggingPoint, getSvgCoords, snapToGrid, gridSize])

  // Handle canvas panning
  useEffect(() => {
    if (!isPanning) return

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - panStartRef.current.x
      const dy = e.clientY - panStartRef.current.y
      setPanOffset({
        x: panStartRef.current.offsetX + dx,
        y: panStartRef.current.offsetY + dy,
      })
    }

    const onUp = () => {
      setIsPanning(false)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [isPanning])

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const onReset = () => {
    setShapes(initializeShapes())
    setSelectedShapeId(null)
    setDraggingPoint(null)
    setDragCoords(null)
    setZoom(0.85)
    setPanOffset({ x: 0, y: 0 })
  }

  const onRecenter = () => {
    setPanOffset({ x: 0, y: 0 })
    setZoom(0.85)
  }

  const onCanvasPointerDown = (e: React.PointerEvent) => {
    if (e.button === 1 || e.button === 2 || e.altKey) {
      e.preventDefault()
      setIsPanning(true)
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: panOffset.x,
        offsetY: panOffset.y,
      }
    }
  }

  const onCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).tagName === "svg") {
      setSelectedShapeId(null)
    }
  }

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((z) => Math.max(0.25, Math.min(4, z + delta)))
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      container.removeEventListener("wheel", onWheel)
    }
  }, [onWheel])

  if (!mounted) {
    return (
      <div
        className="bg-white rounded-xl border border-neutral-200 shadow-lg flex items-center justify-center"
        style={{ width: 560, height: 600 }}
      >
        <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative select-none"
      style={{ width: containerSize.width, height: containerSize.height }}
    >
      <div className="relative bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-lg w-full h-full flex flex-col">
        {/* Title bar */}
        <div className="h-9 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between px-3 shrink-0 relative z-20">
          <span className="text-xs font-medium text-neutral-400">d-logo-v3-FINAL-v2.svg</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-neutral-400 mr-2">{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative flex-1 bg-white overflow-hidden"
          style={{
            backgroundImage: snapToGrid ? "none" : "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
            backgroundSize: snapToGrid ? "none" : "16px 16px",
            cursor: isPanning ? "grabbing" : draggingPoint ? "grabbing" : "crosshair",
          }}
          onClick={onCanvasClick}
          onPointerDown={onCanvasPointerDown}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="absolute inset-0 z-10">
            <svg
              ref={svgRef}
              viewBox="0 0 2620 2618"
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                overflow: "visible",
              }}
            >
              {snapToGrid && (
                <g>
                  <defs>
                    <pattern id="snapGrid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                      <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#d4d4d4" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="2620" height="2618" fill="url(#snapGrid)" />
                </g>
              )}

              {/* Render shapes */}
              {shapes.map((shape) => (
                <path
                  key={shape.id}
                  d={pointsToPath(shape.points)}
                  fill="black"
                  fillRule="evenodd"
                  className="cursor-pointer"
                  onClick={(e) => onShapeClick(e, shape.id)}
                  onPointerEnter={() => onShapeEnter(shape.id)}
                  onPointerLeave={onShapeLeave}
                  style={{
                    stroke: selectedShapeId === shape.id ? shape.color : "transparent",
                    strokeWidth: selectedShapeId === shape.id ? 24 / zoom : 0,
                  }}
                />
              ))}

              {/* Points for selected shape */}
              {selectedShape &&
                flattenedPoints.map((pt, idx) => (
                  <circle
                    key={`point-${idx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={Math.max(24, 32 / zoom)}
                    fill={selectedShape.color}
                    stroke="white"
                    strokeWidth={Math.max(2, 4 / zoom)}
                    className="cursor-grab active:cursor-grabbing"
                    style={{
                      opacity:
                        draggingPoint?.subpathIdx === pt.subpathIdx && draggingPoint?.pointIdx === pt.pointIdx
                          ? 1
                          : 0.85,
                    }}
                    onPointerDown={(e) => onPointPointerDown(e, pt.subpathIdx, pt.pointIdx, selectedShape.id)}
                    onPointerEnter={onPointEnter}
                  />
                ))}
            </svg>
          </div>

          {/* Toolbar */}
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-30">
            <button
              onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
              className="p-2 bg-white/95 hover:bg-white border border-neutral-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
              className="p-2 bg-white/95 hover:bg-white border border-neutral-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={() => setSnapToGrid((s) => !s)}
              className={`p-2 border rounded-lg shadow-sm transition-all hover:shadow-md ${
                snapToGrid
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "bg-white/95 hover:bg-white border-neutral-200 text-neutral-600"
              }`}
              title="Snap to grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={onRecenter}
              className="p-2 bg-white/95 hover:bg-white border border-neutral-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              title="Recenter view"
            >
              <Move className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="p-2 bg-white/95 hover:bg-white border border-neutral-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              title={expanded ? "Shrink" : "Expand"}
            >
              {expanded ? (
                <Minimize2 className="w-4 h-4 text-neutral-600" />
              ) : (
                <Maximize2 className="w-4 h-4 text-neutral-600" />
              )}
            </button>
            <button
              onClick={onReset}
              className="p-2 bg-white/95 hover:bg-white border border-neutral-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              title="Reset to original"
            >
              <RotateCcw className="w-4 h-4 text-neutral-600" />
            </button>
          </div>

          {/* Selection indicator with XY coords */}
          {(selectedShapeId || draggingPoint) && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 border border-neutral-200 rounded-lg shadow-sm z-30 flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedShape?.color || "#2563eb" }}
              />
              <span className="text-xs font-mono text-neutral-600">
                {dragCoords
                  ? `X: ${dragCoords.x} Y: ${dragCoords.y}`
                  : getCurrentPointCoords()
                    ? `X: ${Math.round(getCurrentPointCoords()!.x)} Y: ${Math.round(getCurrentPointCoords()!.y)}`
                    : "Select a point"}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
