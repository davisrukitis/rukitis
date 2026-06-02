import type { Locale } from "@/lib/i18n"

export const siteConfig = {
  name: "Dāvis Rūķītis",
  shortName: "Dāvis",
  email: "davis@rukitis.com",
  linkedinUrl: "https://linkedin.com/in/davisrukitis",
  linkedinLabel: "linkedin.com/in/davisrukitis",
  baseUrl: "https://davisrukitis.com",
}

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      notes: "Notes",
      about: "About",
      menu: "Menu",
      close: "Close",
      language: "LV",
    },
    home: {
      selectedProjects: "Selected projects",
    },
    projects: {
      eyebrow: "Projects",
      title: "Main archive",
      intro:
        "A quiet index of events, websites, digital operations, production work, and systems I have been part of.",
      openProject: "Open archive entry",
      externalLink: "External link",
      year: "Years",
      role: "My part",
      facts: "Tiny facts",
      media: "Fragments",
      notes: "Notes",
      registrationGrowth: "Registration growth",
      noProject: "Project not found.",
    },
    notes: {
      eyebrow: "Notes",
      title: "Creative archive",
      intro:
        "A separate shelf for photos, TouchDesigner recordings, video experiments, visual scraps, and unfinished things worth keeping.",
      emptyTitle: "This note is only a placeholder for now.",
      emptyBody: "Drop images, videos, sketches, or process text here later.",
    },
    about: {
      eyebrow: "About",
      title: "Blank for now.",
      body: "This page is reserved for a slower personal introduction later.",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy & cookies",
      updated: "Last updated: launch draft",
      intro:
        "This page explains what this small archive currently uses and leaves room for future changes without pretending there is more tracking than there is.",
      currentTitle: "Currently used",
      currentItems: [
        "Vercel Analytics for lightweight, privacy-friendly page view analytics.",
        "External images and media from project websites, Gravatar, LinkedIn/CDN-hosted screenshots, and similar sources.",
        "Mapbox static map imagery if a Mapbox token is configured.",
        "YouTube or YouTube-nocookie embeds on project pages when video fragments are shown.",
        "Local browser storage only to remember that this privacy notice was dismissed.",
      ],
      futureTitle: "May be added later",
      futureItems: [
        "More embedded media, such as Vimeo, YouTube, or self-hosted video.",
        "A CMS or editing tool if this archive grows.",
        "Basic performance or error monitoring.",
      ],
      choiceTitle: "Your choice",
      choiceBody:
        "The notice can be dismissed. If future tools require consent before loading, the notice should be updated to block those tools until a choice is made.",
    },
    footer: {
      label: "Elsewhere",
      email: "Email",
      linkedin: "LinkedIn",
      privacy: "Privacy",
      copied: "Copied",
      copyEmail: "Copy email address",
      quote: "Oh, and in case I don't see ya: good afternoon, good evening, and good night.",
    },
    notice: {
      body:
        "Small privacy note: this site uses lightweight analytics, external media/images, and local storage to remember this notice.",
      ok: "OK",
      privacy: "Privacy",
    },
  },
  lv: {
    nav: {
      home: "Sākums",
      projects: "Projekti",
      notes: "Piezīmes",
      about: "Par mani",
      menu: "Izvēlne",
      close: "Aizvērt",
      language: "EN",
    },
    home: {
      selectedProjects: "Atlasītie projekti",
    },
    projects: {
      eyebrow: "Projekti",
      title: "Galvenais arhīvs",
      intro:
        "Mierīgs indekss ar pasākumiem, mājaslapām, digitālo darbu, producēšanu un sistēmām, kurās esmu piedalījies.",
      openProject: "Atvērt arhīva ierakstu",
      externalLink: "Ārējā saite",
      year: "Gadi",
      role: "Mana daļa",
      facts: "Īsi fakti",
      media: "Fragmenti",
      notes: "Piezīmes",
      registrationGrowth: "Reģistrāciju izaugsme",
      noProject: "Projekts nav atrasts.",
    },
    notes: {
      eyebrow: "Piezīmes",
      title: "Radošais arhīvs",
      intro:
        "Atsevišķs plaukts fotogrāfijām, TouchDesigner ierakstiem, video eksperimentiem, vizuāliem fragmentiem un nepabeigtām lietām.",
      emptyTitle: "Šī piezīme pagaidām ir tikai vietturis.",
      emptyBody: "Vēlāk šeit var ielikt attēlus, video, skices vai procesa tekstu.",
    },
    about: {
      eyebrow: "Par mani",
      title: "Pagaidām tukšs.",
      body: "Šī lapa ir atstāta lēnākam, personīgākam ievadam vēlāk.",
    },
    privacy: {
      eyebrow: "Privātums",
      title: "Privātums un sīkdatnes",
      updated: "Pēdējās izmaiņas: palaišanas melnraksts",
      intro:
        "Šī lapa paskaidro, ko šis nelielais arhīvs šobrīd izmanto, un atstāj vietu nākotnes izmaiņām bez liekas izlikšanās par pārmērīgu izsekošanu.",
      currentTitle: "Šobrīd tiek izmantots",
      currentItems: [
        "Vercel Analytics vieglai un privātumam draudzīgai lapu skatījumu analītikai.",
        "Ārēji attēli un mediji no projektu mājaslapām, Gravatar, LinkedIn/CDN ekrānattēliem un līdzīgiem avotiem.",
        "Mapbox statiskās kartes attēls, ja ir konfigurēts Mapbox tokens.",
        "YouTube vai YouTube-nocookie iegultie video projektu lapās, ja tiek rādīti video fragmenti.",
        "Lokālā pārlūka glabātuve tikai, lai atcerētos, ka šis paziņojums ir aizvērts.",
      ],
      futureTitle: "Vēlāk var tikt pievienots",
      futureItems: [
        "Vairāk iegultu mediju, piemēram, Vimeo, YouTube vai pašhostēts video.",
        "CMS vai rediģēšanas rīks, ja arhīvs izaugs.",
        "Pamata veiktspējas vai kļūdu monitorings.",
      ],
      choiceTitle: "Tava izvēle",
      choiceBody:
        "Paziņojumu var aizvērt. Ja nākotnē rīkiem būs nepieciešama piekrišana pirms ielādes, paziņojums jāatjauno tā, lai šie rīki netiktu ielādēti pirms izvēles.",
    },
    footer: {
      label: "Citur",
      email: "E-pasts",
      linkedin: "LinkedIn",
      privacy: "Privātums",
      copied: "Nokopēts",
      copyEmail: "Kopēt e-pasta adresi",
      quote: "Un, ja gadījumā vairs nesatiekamies: labu pēcpusdienu, labu vakaru un ar labu nakti.",
    },
    notice: {
      body:
        "Mazs privātuma paziņojums: šī lapa izmanto vieglu analītiku, ārējus medijus/attēlus un lokālo glabātuvi, lai atcerētos šo paziņojumu.",
      ok: "OK",
      privacy: "Privātums",
    },
  },
} satisfies Record<Locale, Record<string, unknown>>

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
