// Centralized event data management

export interface Event {
  id: string
  name: string
  type: string
  description: string
  image: string
  logo: string
  date?: string
  link?: string
  startDate?: string // Full date in ISO format
  endDate?: string // End date for multi-day events
  yearStarted?: number
  annualParticipants?: string
  youtubeUrl?: string
  officialSiteUrl?: string
  longDescription?: string
  brandColors?: {
    primary: string
    secondary?: string
    tertiary?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
  }
  isToBeAnnounced?: boolean
  eventCategory?: "sports" | "food-drinks" | "music" | "awards" | "other"
  showInNavigation?: boolean
  showOnHomepage?: boolean
  isOneTimeEvent?: boolean
}

// Main events for display in navigation and cards
export const displayEvents: Event[] = [
  {
    id: "rimi-riga-marathon",
    name: "Rimi Riga Marathon",
    type: "Sports",
    description: "The most impactful and international annual running event in the Baltics!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-3.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/02/RRM-logo-black.png",
    startDate: "1991-07-27T09:00:00",
    yearStarted: 1991,
    annualParticipants: "46,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/loWG5xVfToA?si=ZCnhTOjir3cp7tFU",
    officialSiteUrl: "https://rimirigamarathon.com/",
    longDescription:
      "The Rimi Riga Marathon is the most internationally recognized running event in the Baltic States. It attracts thousands of runners from all over the world (116 countries in 2026) to a full marathon, half-marathon, 10k, 6k, a DPD mile, Signet Bank Relays and even a huge Kids’ Day. The course runs through the heart of Riga, offering stunning views of the city's historic architecture and the Daugava River.",
    brandColors: {
      primary: "#cc2128",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/rimirigamarathon",
      facebook: "https://www.facebook.com/RimiRigaMarathon",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "pink-noise-riga",
    name: "Pink Noise Riga",
    type: "Music",
    description:
      "A new kid on the Baltic music scene - a cocktail of world-class jazz, pop-rock, fusion, and contemporary improvised music!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/11/Pink-Noise-Riga-2024.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/02/Pink-Noise-Riga-black.svg",
    startDate: "2024-11-09T18:00:00",
    yearStarted: 2024,
    annualParticipants: "4,000+",
    officialSiteUrl: "https://pinknoiseriga.com/",
    longDescription:
      "Inaugurated in 2024 by the legendary jazz musician Branford Marsalis, Pink Noise Riga music festival offers a cocktail of world-class jazz, pop-rock, fusion, and contemporary improvised music. Festival’s main idea is to help Riga stand out & shine bright in Europe’s music scene.",
    brandColors: {
      primary: "#fa4100",
      secondary: "#73b6ff",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/riga.pinknoise",
      facebook: "https://www.facebook.com/PinkNoiseRiga",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "riga-wine-champagne",
    name: "Riga Wine & Champagne",
    type: "Food & Drinks",
    description: "The Baltic's most decadent celebration of wine, champagne and gastronomy!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-2.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/02/RWCH-Logo-Text-black.png",
    startDate: "2012-11-23T17:00:00",
    yearStarted: 2012,
    annualParticipants: "8,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/NifqOUXiTgc?si=u2C4Vgwso3S-cBwJ",
    officialSiteUrl: "https://rigawinechampagne.lv/",
    longDescription:
      "Riga Wine & Champagne is the most decadent wine and gastronomy festival in the Baltic region taking place two times a year. This sophisticated event showcases Champagne and exceptional wines from around the world, paired with exquisite culinary creations from top chefs, offering an unparalleled tasting & learning experience.",
    brandColors: {
      primary: "#e40521",
      secondary: "#f5f5f5",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/rigawinechamp",
      facebook: "https://www.facebook.com/RigaWineChampagne",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "riga-whisky-friends",
    name: "Riga Whisky & Friends",
    type: "Food & Drinks",
    description: "Riga's annual gathering of fine spirits and drinks at the legendary Riga Circus!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/02/rwf-logo.svg",
    startDate: "2024-09-21T16:00:00",
    yearStarted: 2024,
    annualParticipants: "1,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/-jVeUXAanik?si=SnWcvdwsDYOlPSY2",
    officialSiteUrl: "https://rigawhiskyfriends.com/",
    longDescription:
      "Riga Whisky & Friends is an exclusive gathering for whisky enthusiasts and connoisseurs. The event features rare and exceptional spirits from renowned distilleries worldwide, complemented by masterclasses and tastings led by industry experts.",
    brandColors: {
      primary: "#023047",
      secondary: "#ff792c",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/riga.whiskyfriends",
      facebook: "https://www.facebook.com/rigawhisky",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "baltic-wine-drinks-awards",
    name: "Baltic Wine & Drinks Awards",
    type: "Food & Drinks",
    description:
      "An insider's guide to the best Baltic restaurants, bars, retailers with good, great, and extraordinary wine lists, drinks programmes, and portfolios!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/02/web-0-1.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/02/BWDA-logo.svg",
    startDate: "2018-03-09T19:00:00",
    yearStarted: 2018,
    youtubeUrl: "https://www.youtube-nocookie.com/embed/UnqE9E981E8?si=1kia80iakMPeMVsR",
    officialSiteUrl: "https://balticwinelists.com/",
    longDescription:
      "The Baltic Wine & Drinks Awards recognizes and celebrates the finest wine programs across the Baltic region. This prestigious event honors restaurants, bars, and hotels that demonstrate exceptional wine knowledge, curation, and service excellence.",
    brandColors: {
      primary: "#231F20",
      secondary: "#fad0c5",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/balticwinedrinksawards",
      facebook: "https://www.facebook.com/BalticWineDrinksAwards",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "world-athletics-road-running-championships-riga23",
    name: "World Athletics Road Running Championships Riga23",
    type: "Sports",
    description: "The Inaugural World Champs of Riga, the World Road Running Capital!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/12/MEDAL50-1.webp",
    logo: "https://rimirigamarathon.com/wp-content/uploads/2025/12/R23_H_Black.svg",
    startDate: "2023-09-30T09:00:00",
    yearStarted: 2023,
    youtubeUrl: "https://www.youtube.com/embed/iBbepfFzAiM?si=WsajxzIspSq0tKvG",
    longDescription:
      "We’re very proud of the fact that Riga (and us) became the hosts of the first ever World Athletics Road Running Championships Riga 23, the world’s premier road running event! The legacy of the event lives on – we’ve put Riga on the world’s running map forever, and the courses developed for the World Champs can still be experienced when running the annual Rimi Riga marathon!",
    brandColors: {
      primary: "#A5FA64",
      secondary: "#69d7e1",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/wariga23/",
      facebook: "https://www.facebook.com/WARiga23/",
    },
    showInNavigation: false,
    showOnHomepage: true,
    isOneTimeEvent: true,
  },
  {
    id: "baltic-brand-forum",
    name: "Baltic Brand Forum",
    type: "Marketing",
    description: "The leading inspirational platform for marketing & brand professionals in the Baltics!",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/12/BBF-26.09-FIRST-LOOK2-13_websize.jpg",
    logo: "https://balticbrands.eu/storage/app/media/2025/logo.png",
    startDate: "2019-10-03T09:00:00",
    yearStarted: 2019,
    youtubeUrl: "https://www.youtube.com/embed/BG3G1SjuxlE?si=BxAO8044hXlwPoKB",
    longDescription:
      "Created by our friends Magic Agency (https://www.magicagency.lv/), Baltic Brand Forum has become the leading inspirational platform for marketing & brand professionals in the Baltics. And we've certainly helped by producing the event since forever...",
    brandColors: {
      primary: "#1f2937",
      secondary: "#6366f1",
    },
    showInNavigation: false,
    showOnHomepage: false,
  },
]

// Upcoming events for calendar/footer display (legacy)
export const upcomingEvents: Event[] = [
    {
    id: "riga-whisky-friends-2026",
    name: "Riga Whisky & Friends",
    type: "Food & Drinks",
    description: "Gourmet beloved whisky culture festival",
    image: "",
    logo: "",
    date: "September 11 - 12, 2026",
    startDate: "2026-09-11",
    endDate: "2026-09-12",
    link: "https://rigawhiskyfriends.com/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "wine-of-the-year-2026",
    name: "Annual 'Wine of the Year' competition",
    type: "Food & Drinks",
    description: "A guide to wines imported into Latvia",
    image: "",
    logo: "",
    date: "August 26 - 30, 2026",
    startDate: "2026-07-26",
    endDate: "2026-07-30",
    link: "https://rigawinechampagne.lv/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "top-100-wines-chefs-2026",
    name: "TOP 100 Wines + Chefs",
    type: "Food & Drinks",
    description: "Premium wine and culinary event",
    image: "",
    logo: "",
    date: "November 18 - 21, 2026",
    startDate: "2026-11-18",
    endDate: "2026-11-21",
    link: "https://rigawinechampagne.lv/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "pink-noise-riga-fall-2026",
    name: "Pink Noise Riga",
    type: "Music",
    description: "Electronic music festival",
    image: "",
    logo: "",
    date: "November 27 - 29, 2026",
    startDate: "2026-11-27",
    endDate: "2026-11-29",
    link: "https://pinknoiseriga.com/",
    isToBeAnnounced: false,
    eventCategory: "music",
  },

]

// Calendar events for 2026 with proper date parsing
export const calendarEvents2026: Event[] = [
  {
    id: "riga-whisky-friends-2026",
    name: "Riga Whisky & Friends",
    type: "Food & Drinks",
    description: "Gourmet beloved whisky culture festival",
    image: "",
    logo: "",
    date: "11.-12.09.",
    startDate: "2026-09-11",
    endDate: "2026-09-12",
    link: "https://rigawhiskyfriends.com/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "wine-of-the-year-2026",
    name: "Annual 'Wine of the Year' competition",
    type: "Food & Drinks",
    description: "A guide to wines imported into Latvia",
    image: "",
    logo: "",
    date: "",
    startDate: "2026-07-26",
    endDate: "2026-07-30",
    link: "https://rigawinechampagne.lv/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "top-100-wines-chefs-2026",
    name: "TOP 100 Wines + Chefs",
    type: "Food & Drinks",
    description: "Premium wine and culinary event",
    image: "",
    logo: "",
    date: "18.-21.11.",
    startDate: "2026-11-18",
    endDate: "2026-11-21",
    link: "https://rigawinechampagne.lv/",
    isToBeAnnounced: false,
    eventCategory: "food-drinks",
  },
  {
    id: "pink-noise-riga-fall-2026",
    name: "Pink Noise Riga",
    type: "Music",
    description: "Electronic music festival",
    image: "",
    logo: "",
    date: "27.-29.11.",
    startDate: "2026-11-27",
    endDate: "2026-11-29",
    link: "https://pinknoiseriga.com/",
    isToBeAnnounced: false,
    eventCategory: "music",
  },
  {
    id: "rimi-riga-marathon-2027",
    name: "Rimi Riga Marathon",
    type: "Sports",
    description: "The biggest running event in the Baltics",
    image: "",
    logo: "",
    date: "14.-16.05.",
    startDate: "2027-05-14",
    endDate: "2027-05-16",
    link: "https://rimirigamarathon.com/",
    isToBeAnnounced: false,
    eventCategory: "sports",
  },
]

export function getSortedUpcomingEvents(events: Event[] = upcomingEvents): Event[] {
  return [...events].sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0
    return dateA - dateB
  })
}

export function getSortedCalendarEvents(year?: number): Event[] {
  const events = calendarEvents2026 // In the future, can filter by year
  return [...events].sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0
    return dateA - dateB
  })
}

export function getEventCategoryColor(category?: string): string {
  switch (category) {
    case "sports":
      return "#cc2128" // Red for sports
    case "food-drinks":
      return "#8B5CF6" // Purple for food & drinks
    case "music":
      return "#fa4100" // Orange for music
    case "awards":
      return "#fad0c5" // Pink for awards
    default:
      return "#6B7280" // Gray for TBA/other
  }
}

export function getNextUpcomingEvent(): Event | null {
  const now = new Date()
  const sortedEvents = getSortedCalendarEvents()

  for (const event of sortedEvents) {
    if (event.startDate && !event.isToBeAnnounced) {
      const eventDate = new Date(event.startDate)
      if (eventDate > now) {
        return event
      }
    }
  }
  return sortedEvents[0] || null
}

export function getDaysUntilEvent(startDate: string): number {
  const now = new Date()
  const eventDate = new Date(startDate)
  const diffTime = eventDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

// Helper functions for filtering events
export function getNavigationEvents(): Event[] {
  return displayEvents.filter((e) => e.showInNavigation !== false)
}

export function getHomepageEvents(): Event[] {
  return displayEvents.filter((e) => e.showOnHomepage !== false)
}

export function getAllEvents(): Event[] {
  return displayEvents
}
