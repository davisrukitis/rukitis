"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"

// Path data type
type PathData = {
  id: string
  d: string
  fill: string
}

// Command types for parsing
type Command =
  | { type: "M"; x: number; y: number }
  | { type: "L"; x: number; y: number }
  | { type: "H"; x: number; prevY: number }
  | { type: "V"; y: number; prevX: number }
  | { type: "Z" }

// Initial paths from the provided SVG
const initialPaths: PathData[] = [
  {
    id: "inner",
    d: "M1310 1771H1464V1694H1541V1617H1618V1463H1695V847H1464V770H1233V1001H1156V1309H1079V1617H1002V1848H1310V1771ZM1387 1925H771V1848H848V1617H925V1309H1002V1001H1079V770H1002V693H1618V770H1772V847H1849V1463H1772V1617H1695V1694H1618V1771H1541V1848H1387V1925Z",
    fill: "black",
  },
  {
    id: "outer",
    d: "M1619 77H1850V154H2004V231H2158V308H2235V385H2312V462H2389V539H2466V693H2543V847H2620V1386H2619V1771H2542V1925H2465V2079H2388V2156H2311V2233H2234V2310H2157V2387H2003V2464H1849V2541H1618V2618H1002V2541H771V2464H617V2387H463V2310H386V2233H309V2156H232V2079H155V1925H78V1771H1V1386H0V847H77V693H154V539H231V462H308V385H385V308H462V231H616V154H770V77H1001V0H1619V77ZM1001 231H770V308H616V385H539V462H462V539H385V616H308V770H231V924H154V1386H155V1694H232V1848H309V2002H386V2079H463V2156H540V2233H617V2310H771V2387H1002V2464H1618V2387H1849V2310H2003V2233H2080V2156H2157V2079H2234V2002H2311V1848H2388V1694H2465V1386H2466V924H2389V770H2312V616H2235V539H2158V462H2081V385H2004V308H1850V231H1619V154H1001V231Z",
    fill: "black",
  },
]

// Parse path d string into commands
function parsePathD(d: string): Command[] {
  const commands: Command[] = []
  const regex = /([MLHVZ])([^MLHVZ]*)/gi
  let match
  let currentX = 0
  let currentY = 0

  while ((match = regex.exec(d)) !== null) {
    const type = match[1].toUpperCase()
    const args = match[2]
      .trim()
      .split(/[\s,]+/)
      .filter((s) => s.length > 0)
      .map(Number)

    switch (type) {
      case "M":
      case "L":
        for (let i = 0; i < args.length; i += 2) {
          commands.push({ type: type as "M" | "L", x: args[i], y: args[i + 1] })
          currentX = args[i]
          currentY = args[i + 1]
        }
        break
      case "H":
        for (const x of args) {
          commands.push({ type: "H", x, prevY: currentY })
          currentX = x
        }
        break
      case "V":
        for (const y of args) {
          commands.push({ type: "V", y, prevX: currentX })
          currentY = y
        }
        break
      case "Z":
        commands.push({ type: "Z" })
        break
    }
  }

  return commands
}

// Convert commands back to d string
function commandsToD(commands: Command[]): string {
  return commands
    .map((cmd) => {
      switch (cmd.type) {
        case "M":
          return `M${cmd.x} ${cmd.y}`
        case "L":
          return `L${cmd.x} ${cmd.y}`
        case "H":
          return `H${cmd.x}`
        case "V":
          return `V${cmd.y}`
        case "Z":
          return "Z"
      }
    })
    .join("")
}

// Get points from commands for rendering handles
function getPointsFromCommands(commands: Command[]): { x: number; y: number; cmdIndex: number }[] {
  const points: { x: number; y: number; cmdIndex: number }[] = []
  let currentX = 0
  let currentY = 0

  commands.forEach((cmd, index) => {
    switch (cmd.type) {
      case "M":
      case "L":
        points.push({ x: cmd.x, y: cmd.y, cmdIndex: index })
        currentX = cmd.x
        currentY = cmd.y
        break
      case "H":
        points.push({ x: cmd.x, y: currentY, cmdIndex: index })
        currentX = cmd.x
        break
      case "V":
        points.push({ x: currentX, y: cmd.y, cmdIndex: index })
        currentY = cmd.y
        break
    }
  })

  return points
}

type SvgLogoEditorProps = {
  editable?: boolean
  size?: number
  className?: string
}

export function SvgLogoEditor({ editable = false, size = 80, className = "" }: SvgLogoEditorProps) {
  const [paths, setPaths] = useState<PathData[]>(initialPaths)
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)
  const [draggingPoint, setDraggingPoint] = useState<{
    pathId: string
    cmdIndex: number
    startX: number
    startY: number
    originalCmd: Command
  } | null>(null)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false)
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, logoX: 0, logoY: 0 })
  const [mounted, setMounted] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const viewBox = { width: 2620, height: 2618 }
  const scale = size / Math.max(viewBox.width, viewBox.height)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle point drag
  const handlePointDragStart = useCallback(
    (e: React.PointerEvent, pathId: string, cmdIndex: number, cmd: Command) => {
      if (!editable) return
      e.stopPropagation()
      e.preventDefault()

      const svgRect = svgRef.current?.getBoundingClientRect()
      if (!svgRect) return

      setDraggingPoint({
        pathId,
        cmdIndex,
        startX: e.clientX,
        startY: e.clientY,
        originalCmd: { ...cmd },
      })
    },
    [editable],
  )

  // Handle logo drag start
  const handleLogoDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (editable && selectedPathId) return
      e.preventDefault()
      setIsDraggingLogo(true)
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        logoX: logoPosition.x,
        logoY: logoPosition.y,
      })
    },
    [editable, selectedPathId, logoPosition],
  )

  useEffect(() => {
    if (!draggingPoint && !isDraggingLogo) return

    const handleMove = (e: PointerEvent) => {
      if (draggingPoint) {
        const svgRect = svgRef.current?.getBoundingClientRect()
        if (!svgRect) return

        const deltaX = (e.clientX - draggingPoint.startX) / scale
        const deltaY = (e.clientY - draggingPoint.startY) / scale

        setPaths((prev) =>
          prev.map((path) => {
            if (path.id !== draggingPoint.pathId) return path

            const commands = parsePathD(path.d)
            const cmd = commands[draggingPoint.cmdIndex]
            const origCmd = draggingPoint.originalCmd

            if (cmd.type === "M" || cmd.type === "L") {
              cmd.x = (origCmd as { x: number }).x + deltaX
              cmd.y = (origCmd as { y: number }).y + deltaY
            } else if (cmd.type === "H") {
              cmd.x = (origCmd as { x: number }).x + deltaX
            } else if (cmd.type === "V") {
              cmd.y = (origCmd as { y: number }).y + deltaY
            }

            return { ...path, d: commandsToD(commands) }
          }),
        )
      }

      if (isDraggingLogo) {
        const deltaX = e.clientX - dragStart.x
        const deltaY = e.clientY - dragStart.y
        setLogoPosition({
          x: dragStart.logoX + deltaX,
          y: dragStart.logoY + deltaY,
        })
      }
    }

    const handleUp = () => {
      setDraggingPoint(null)
      setIsDraggingLogo(false)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)

    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }
  }, [draggingPoint, isDraggingLogo, scale, dragStart])

  const handlePathClick = useCallback(
    (e: React.MouseEvent, pathId: string) => {
      if (!editable) return
      e.stopPropagation()
      setSelectedPathId((prev) => (prev === pathId ? null : pathId))
    },
    [editable],
  )

  const handleBackgroundClick = useCallback(() => {
    if (editable) {
      setSelectedPathId(null)
    }
  }, [editable])

  if (!mounted) {
    return <div style={{ width: size, height: size }} />
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translate(${logoPosition.x}px, ${logoPosition.y}px)`,
        cursor: isDraggingLogo ? "grabbing" : "grab",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
      onPointerDown={handleLogoDragStart}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleBackgroundClick}
        style={{ overflow: "visible" }}
      >
        {paths.map((path) => {
          const isSelected = selectedPathId === path.id
          const commands = parsePathD(path.d)
          const points = getPointsFromCommands(commands)

          return (
            <g key={path.id}>
              <path
                d={path.d}
                fill={path.fill}
                onClick={(e) => handlePathClick(e, path.id)}
                style={{
                  cursor: editable ? "pointer" : "grab",
                  opacity: isSelected ? 0.8 : 1,
                }}
                stroke={isSelected ? "#3b82f6" : "none"}
                strokeWidth={isSelected ? 20 : 0}
              />

              {/* Control points when selected */}
              {editable &&
                isSelected &&
                points.map((point, idx) => (
                  <g key={idx}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={40}
                      fill="white"
                      stroke="#3b82f6"
                      strokeWidth={8}
                      style={{ cursor: "move" }}
                      onPointerDown={(e) => handlePointDragStart(e, path.id, point.cmdIndex, commands[point.cmdIndex])}
                    />
                  </g>
                ))}
            </g>
          )
        })}
      </svg>

      {editable && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className="text-[10px] text-muted-foreground">
            {selectedPathId ? "Drag points to edit" : "Click path to select"}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default SvgLogoEditor
