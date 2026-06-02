export const locales = ["en", "lv"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "lv" : "en"
}

export function getLocalizedPath(locale: Locale, path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`
}

export function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/").filter(Boolean)

  if (parts.length === 0) {
    return `/${nextLocale}`
  }

  if (isLocale(parts[0])) {
    parts[0] = nextLocale
    return `/${parts.join("/")}`
  }

  return `/${nextLocale}/${parts.join("/")}`
}
