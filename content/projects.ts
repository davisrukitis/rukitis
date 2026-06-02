import { displayEvents, type Event } from "@/content/events-data"

export type ProjectMedia = {
  type: "image" | "video"
  src: string
  alt?: string
  label?: string
}

export type ProjectFact = {
  label: string
  value: string
}

export type RegistrationDataPoint = {
  year: number
  registrations: number
  change?: number
}

export type ProjectDetail = {
  id: string
  period: string
  role: string
  summary: string
  myPart: string[]
  facts: ProjectFact[]
  media: ProjectMedia[]
  registrationGrowth?: RegistrationDataPoint[]
  note?: string
  externalUrl?: string
}

export type ProjectArchiveEntry = Event & {
  detail: ProjectDetail
}

const projectDetails: Record<string, ProjectDetail> = {
  "rimi-riga-marathon": {
    id: "rimi-riga-marathon",
    period: "2022–2026",
    role:
      "Web Content Management Lead, Assistant to the Head of EXPO, Marketing and Production Support, Assistant to the Head of Branding",
    summary:
      "Rimi Riga Marathon is the most internationally recognized running event in the Baltic States, bringing thousands of runners from around the world to Riga every year. My work supported both the digital and physical event experience during a major growth period, from website content and participant information to EXPO, branding, and production support.",
    myPart: [
      "Coordinated partner banners and branding logistics.",
      "Led website content management and day-to-day CMS operations.",
      "Maintained participant information, content updates, and user-facing website details.",
      "Worked with marketing and development teams on website functionality and user experience.",
      "Created the Runners’ Guide and supported EXPO organization.",
    ],
    facts: [
      { label: "Involvement", value: "2022–2026" },
      { label: "Participants", value: "46,000+ annual participants" },
      { label: "Countries", value: "116 countries represented in 2026" },
      { label: "Type", value: "Annual sports event" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-3.webp",
        alt: "Rimi Riga Marathon official hero image",
        label: "Official event image",
      },
      {
        type: "image",
        src: "https://media.licdn.com/dms/image/v2/D4D2DAQEjtS2tXdiGrQ/profile-treasury-image-shrink_1280_1280/profile-treasury-image-shrink_1280_1280/0/1697909583685?e=1781017200&v=beta&t=1n71dT479ksHeh1D5qOFDNuAS3kKnCwhR1e_WpwOKno",
        alt: "Rimi Riga Marathon 2023 website screenshot",
        label: "Website fragment",
      },
      {
        type: "image",
        src: "https://media.licdn.com/dms/image/v2/D4D2DAQFD5hnbjeRvdQ/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1697905968226?e=1781017200&v=beta&t=BgfH5YIF7ZGxBScEYSnesQ4xOrgq4giuBn3cVN8pwr8",
        alt: "Rimi Riga Marathon 2023 EXPO screenshot",
        label: "EXPO fragment",
      },
      {
        type: "video",
        src: "https://www.youtube-nocookie.com/embed/loWG5xVfToA?si=ZCnhTOjir3cp7tFU",
        label: "Video fragment",
      },
    ],
    registrationGrowth: [
      { year: 2022, registrations: 16989, change: 6907 },
      { year: 2023, registrations: 23751, change: 6762 },
      { year: 2024, registrations: 33003, change: 9252 },
      { year: 2025, registrations: 40122, change: 7119 },
      { year: 2026, registrations: 46313, change: 6191 },
    ],
    note:
      "Included here as one ongoing archive entry, because the event changes every year but the thread of work belongs together.",
    externalUrl: "https://rimirigamarathon.com/",
  },
  "world-athletics-road-running-championships-riga23": {
    id: "world-athletics-road-running-championships-riga23",
    period: "2022–2023",
    role: "Head of EXPO, Web Content Lead, Marketing and Production Support",
    summary:
      "Riga hosted the first-ever World Athletics Road Running Championships, becoming the World Road Running Capital and placing Riga permanently on the global running map. I worked across web content, participant information, digital assets, EXPO planning, press conference support, and production coordination.",
    myPart: [
      "Oversaw CMS operations and maintained website content with HTML and CSS.",
      "Created the Runners’ Guide for mass race participants.",
      "Organized and managed digital assets with content creators and developers.",
      "Planned and executed EXPO-related activities.",
      "Managed a team for smooth EXPO and main press conference execution.",
    ],
    facts: [
      { label: "Involvement", value: "2022–2023" },
      { label: "Format", value: "One-time global championship" },
      { label: "First", value: "First-ever World Athletics Road Running Championships" },
      { label: "Location", value: "Riga, Latvia" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/12/MEDAL50-1.webp",
        alt: "World Athletics Road Running Championships Riga23 official image",
        label: "Official event image",
      },
      {
        type: "image",
        src: "https://media.licdn.com/dms/image/v2/D4D2DAQGebsH6sgaSXg/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1697909121323?e=1781017200&v=beta&t=r-uV_uBHFPo353Ljf66FWrbbhj2o6F4rqPjV_fJisQc",
        alt: "World Athletics Road Running Championships press conference screenshot",
        label: "Press conference fragment",
      },
      {
        type: "image",
        src: "https://media.licdn.com/dms/image/v2/D4D2DAQGSo3MFMbpeVw/profile-treasury-image-shrink_1280_1280/profile-treasury-image-shrink_1280_1280/0/1697908675029?e=1781017200&v=beta&t=eo1DnW1JGbDMpYynCjhEg1lpM4-RkCj-TgmAAgMUNoQ",
        alt: "World Athletics Road Running Championships website screenshot",
        label: "Website fragment",
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/iBbepfFzAiM?si=WsajxzIspSq0tKvG",
        label: "Video fragment",
      },
    ],
    externalUrl:
      "https://worldathletics.org/competitions/world-athletics-road-running-championships/world-athletics-road-running-championships-7174065",
  },
  "pink-noise-riga": {
    id: "pink-noise-riga",
    period: "2024–2026",
    role: "Digital Operations & Assistant to the Event Producer",
    summary:
      "Pink Noise Riga is a new Baltic music festival combining world-class jazz, pop-rock, fusion, and contemporary improvised music. I supported the launch and development of the festival through website creation, digital operations, ticketing improvements, and event-production support.",
    myPart: [
      "Created and designed the website.",
      "Supported digital operations and event operations.",
      "Helped with ticketing setup and ticketing-partner workflows.",
      "Worked on improving organizer control around ticketing.",
    ],
    facts: [
      { label: "Involvement", value: "2024–2026" },
      { label: "Participants", value: "4,000+ annual participants" },
      { label: "Type", value: "Music festival" },
      { label: "Location", value: "Riga, Latvia" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/11/Pink-Noise-Riga-2024.webp",
        alt: "Pink Noise Riga official event image",
        label: "Official event image",
      },
    ],
    externalUrl: "https://pinknoiseriga.com/",
  },
  "riga-wine-champagne": {
    id: "riga-wine-champagne",
    period: "2022–2026",
    role: "Digital Operations & Assistant to the Event Producer",
    summary:
      "Riga Wine & Champagne is one of the Baltic region’s leading wine, champagne, and gastronomy events, bringing together exceptional wines, champagne, tastings, learning experiences, and culinary culture. My work focused on improving the event’s digital infrastructure, web content workflows, and in-house operational control.",
    myPart: [
      "Managed web content and supported digital operations.",
      "Assisted the event producer across recurring event work.",
      "Project-managed the migration to Webflow from A to Z on the project-management side.",
      "Helped make new feature development faster in-house and reduce the need for agency involvement.",
    ],
    facts: [
      { label: "Involvement", value: "2022–2026" },
      { label: "Participants", value: "8,000+ annual participants" },
      { label: "Type", value: "Wine, champagne, and gastronomy event" },
      { label: "Digital shift", value: "Webflow migration" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-2.webp",
        alt: "Riga Wine & Champagne official event image",
        label: "Official event image",
      },
      {
        type: "video",
        src: "https://www.youtube-nocookie.com/embed/NifqOUXiTgc?si=u2C4Vgwso3S-cBwJ",
        label: "Video fragment",
      },
    ],
    externalUrl: "https://rigawinechampagne.lv/",
  },
  "baltic-wine-drinks-awards": {
    id: "baltic-wine-drinks-awards",
    period: "2022–2026",
    role: "Digital Operations",
    summary:
      "Baltic Wine & Drinks Awards is an insider’s guide to the best Baltic restaurants, bars, retailers, wine lists, drinks programmes, and portfolios. My work focused on modernizing the digital side of the awards, especially operational processes around voting and partner activations.",
    myPart: [
      "Digitalized and modernized award operations.",
      "Improved voting-related workflows.",
      "Supported partner activations in the digital sphere.",
      "Helped make award operations more efficient, scalable, and easier to manage digitally.",
    ],
    facts: [
      { label: "Involvement", value: "2022–2026" },
      { label: "Type", value: "Awards / drinks culture" },
      { label: "Focus", value: "Digital operations" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-1.webp",
        alt: "Baltic Wine & Drinks Awards official event image",
        label: "Official event image",
      },
      {
        type: "video",
        src: "https://www.youtube-nocookie.com/embed/UnqE9E981E8?si=1kia80iakMPeMVsR",
        label: "Video fragment",
      },
    ],
    externalUrl: "https://balticwinelists.com/",
  },
  "riga-whisky-friends": {
    id: "riga-whisky-friends",
    period: "2024–2026",
    role: "Digital Operations & Assistant to the Event Producer",
    summary:
      "Riga Whisky & Friends is an annual gathering of fine spirits and drinks at the legendary Riga Circus. I supported both the digital and production sides of the event, helping build the online presence, manage ticketing, and keep event operations moving smoothly.",
    myPart: [
      "Created and designed the website.",
      "Supported digital operations.",
      "Helped manage ticketing setup.",
      "Assisted with event operations and production-related tasks.",
    ],
    facts: [
      { label: "Involvement", value: "2024–2026" },
      { label: "Participants", value: "1,000+ annual participants" },
      { label: "Type", value: "Fine spirits and drinks event" },
      { label: "Location", value: "Riga Circus" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0.webp",
        alt: "Riga Whisky & Friends official event image",
        label: "Official event image",
      },
      {
        type: "video",
        src: "https://www.youtube-nocookie.com/embed/-jVeUXAanik?si=SnWcvdwsDYOlPSY2",
        label: "Video fragment",
      },
    ],
    externalUrl: "https://rigawhiskyfriends.com/",
  },
  "baltic-brand-forum": {
    id: "baltic-brand-forum",
    period: "2023–2026",
    role: "Assistant to the Event Producer",
    summary:
      "Baltic Brand Forum is a leading inspirational platform for marketing and brand professionals in the Baltics. I supported the production side of the event, helping the team deliver a smooth professional experience for speakers, guests, partners, and attendees.",
    myPart: [
      "Supported the event producer in organizing and coordinating event-related activities.",
      "Supervised AV technicians during event execution.",
      "Helped keep the live event experience smooth across speakers, guests, partners, and attendees.",
    ],
    facts: [
      { label: "Involvement", value: "2023–2026" },
      { label: "Type", value: "Marketing and brand forum" },
      { label: "Focus", value: "Production support" },
    ],
    media: [
      {
        type: "image",
        src: "https://rimirigamarathon.com/wp-content/uploads/2025/12/BBF-26.09-FIRST-LOOK2-13_websize.jpg",
        alt: "Baltic Brand Forum official event image",
        label: "Official event image",
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/BG3G1SjuxlE?si=BxAO8044hXlwPoKB",
        label: "Video fragment",
      },
    ],
    externalUrl: "https://balticbrands.eu/",
  },
}

function createFallbackDetail(event: Event): ProjectDetail {
  const year = event.yearStarted ? String(event.yearStarted) : "Unknown"

  return {
    id: event.id,
    period: year,
    role: "Archive entry",
    summary: event.longDescription || event.description,
    myPart: ["A compact archive entry for this project will be added later."],
    facts: [
      { label: "Started", value: year },
      { label: "Type", value: event.type },
    ],
    media: event.image
      ? [
          {
            type: "image",
            src: event.image,
            alt: event.name,
            label: "Image fragment",
          },
        ]
      : [],
    externalUrl: event.officialSiteUrl || event.link,
  }
}

export function getProjectBySlug(slug: string): ProjectArchiveEntry | null {
  const event = displayEvents.find((item) => item.id === slug)

  if (!event) {
    return null
  }

  return {
    ...event,
    detail: projectDetails[event.id] ?? createFallbackDetail(event),
  }
}

export function getAllProjectEntries(): ProjectArchiveEntry[] {
  return displayEvents
    .map((event) => ({
      ...event,
      detail: projectDetails[event.id] ?? createFallbackDetail(event),
    }))
    .sort((a, b) => {
      const aStart = Number(a.detail.period.slice(0, 4)) || 0
      const bStart = Number(b.detail.period.slice(0, 4)) || 0
      return bStart - aStart
    })
}

export function getHomepageProjectEntries(): ProjectArchiveEntry[] {
  return getAllProjectEntries().filter((event) => event.showOnHomepage !== false)
}

export function getProjectSlugs(): string[] {
  return displayEvents.map((event) => event.id)
}
