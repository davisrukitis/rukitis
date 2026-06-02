"use client"

import Link from "next/link"

import type { NoteEntry } from "@/content/notes"

type NoteCardProps = {
  note: NoteEntry
  href: string
}

export function NoteCard({ note, href }: NoteCardProps) {
  return (
    <Link href={href} className="group block rounded-[2rem] bg-neutral-100 p-5 transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {note.type} / {note.year}
          </p>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight">{note.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.description}</p>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700">{note.status}</span>
      </div>
    </Link>
  )
}
