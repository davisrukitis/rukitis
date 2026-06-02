"use server"

export async function getStaticMapUrl(longitude: number, latitude: number, zoom: number): Promise<string> {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return ""
  }

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${longitude},${latitude},${zoom},0/600x300@2x?access_token=${mapboxToken}`
}
