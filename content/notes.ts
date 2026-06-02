export type NoteMediaType = "photo" | "video" | "touchdesigner" | "visual"

export type NoteEntry = {
  slug: string
  title: string
  type: NoteMediaType
  year: string
  status: "collecting" | "draft" | "published"
  description: string
  cover?: string
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }[]
}

export const notes: NoteEntry[] = [
  {
    slug: "photo-scraps",
    title: "Photo scraps",
    type: "photo",
    year: "ongoing",
    status: "collecting",
    description: "A future place for small photo sets, walks, textures, places, and loose visual memories.",
  },
  {
    slug: "touchdesigner-recordings",
    title: "TouchDesigner recordings",
    type: "touchdesigner",
    year: "ongoing",
    status: "collecting",
    description: "Recorded patches, visual loops, generative tests, failed experiments, and things worth revisiting.",
  },
  {
    slug: "video-fragments",
    title: "Video fragments",
    type: "video",
    year: "ongoing",
    status: "collecting",
    description: "Short videos, analog-looking scraps, event visuals, camera tests, and motion leftovers.",
  },
  {
    slug: "visual-odds-and-ends",
    title: "Visual odds & ends",
    type: "visual",
    year: "ongoing",
    status: "collecting",
    description: "A drawer for anything that does not need to become a project but should not disappear.",
  },
]

export function getNoteBySlug(slug: string): NoteEntry | null {
  return notes.find((note) => note.slug === slug) ?? null
}
