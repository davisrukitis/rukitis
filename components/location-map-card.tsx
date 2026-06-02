"use client"

import { useState, useEffect } from "react"
import { LOCATION } from "@/lib/location-config"
import { getStaticMapUrl } from "@/app/actions/get-map-url"

type LocationMapCardProps = {
  locationName?: string
  regionName?: string
  latitude?: number
  longitude?: number
  zoom?: number
}

export function LocationMapCard({
  locationName = LOCATION.name,
  regionName = LOCATION.region,
  latitude = LOCATION.latitude,
  longitude = LOCATION.longitude,
  zoom = LOCATION.zoom,
}: LocationMapCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [staticMapUrl, setStaticMapUrl] = useState<string | null>(null)

  const googleMapsUrl = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

  useEffect(() => {
    getStaticMapUrl(longitude, latitude, zoom).then(setStaticMapUrl)
  }, [longitude, latitude, zoom])

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full h-full rounded-2xl md:rounded-[32px] overflow-hidden border border-white/20 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c5e8d4]/30 via-transparent to-[#b4d4e8]/30 z-[1] pointer-events-none" />

      {/* Static Map Image */}
      {staticMapUrl && (
        <img
          src={staticMapUrl || "/placeholder.svg"}
          alt={`Map of ${locationName}`}
          className="absolute inset-0 object-cover w-full h-[110%]"
          onLoad={() => setImageLoaded(true)}
        />
      )}

      {/* Fallback gradient while map loads */}
      {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4e8] via-[#d5e8f0] to-[#e5f0e5]" />}

      {/* Location Marker - Pulsing blue dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-full bg-[#007AFF]/25 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-0 rounded-full bg-[#007AFF]/25 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "1s" }}
          />
          {/* Outer white ring */}
          <div className="relative w-[18px] h-[18px] md:w-[22px] md:h-[22px] rounded-full bg-white shadow-lg flex items-center justify-center">
            {/* Inner blue dot */}
            <div className="w-[11px] h-[11px] md:w-[14px] md:h-[14px] rounded-full bg-[#007AFF]" />
          </div>
        </div>
      </div>

      {/* Clouds - hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] hidden sm:block">
        <div
          className="absolute w-[100px] h-[35px] bg-white/60 rounded-full blur-xl top-[15%]"
          style={{ animation: "drift 28s linear infinite -5s" }}
        />
        <div
          className="absolute w-[70px] h-[28px] bg-white/60 rounded-full blur-xl top-[45%]"
          style={{ animation: "drift 35s linear infinite -18s" }}
        />
        <div
          className="absolute w-[120px] h-[40px] bg-white/60 rounded-full blur-xl top-[70%]"
          style={{ animation: "drift 40s linear infinite -10s" }}
        />
      </div>

      {/* Location Label Chip */}
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl pl-1.5 pr-2 py-1.5 md:pl-2 md:pr-3 md:py-2 shadow-lg border border-white/50 flex items-center gap-1.5 md:gap-2.5 group-hover:bg-white transition-colors">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#007AFF] flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">{locationName}</span>
            {regionName && <span className="text-[10px] md:text-xs text-gray-500 leading-tight">{regionName}</span>}
          </div>
          <svg
            className="w-3 h-3 md:w-4 md:h-4 text-gray-300 group-hover:text-[#007AFF] transition-colors ml-0.5 md:ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  )
}

export default LocationMapCard
