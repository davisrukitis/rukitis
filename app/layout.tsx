import type React from "react"
import type { Metadata } from "next"
import { Cedarville_Cursive, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { siteConfig } from "@/content/site"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cedarville",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} — Digital Operations, Events & Design`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "A quiet personal archive of event, digital operations, web, production, and creative work by Dāvis Rūķītis.",
  openGraph: {
    title: `${siteConfig.name} — Digital Operations, Events & Design`,
    description:
      "A quiet personal archive of event, digital operations, web, production, and creative work by Dāvis Rūķītis.",
    type: "website",
    url: siteConfig.baseUrl,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cedarville.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
