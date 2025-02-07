window.hospitalTasks = [
  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Nuværende patientjournal er langsom og ineffektiv.",
    narrativeIntro: `
      Hospitalet kæmper med en forældet EPJ, der ofte fejler ved spidsbelastning. En modernisering er nødvendig for at forbedre patientbehandling og informationsflow.
    `,
    glossaryTerms: ["Patientjournal", "EPJ", "Integration"],
    digDeeperLinks: [
      { label: "EPJ Best Practices", text: "Læs om moderne løsninger og workflows for elektroniske patientjournaler." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende patientjournal for ineffektivitet og fejl.",
        stepContext: "En dybdegående analyse kan afsløre flaskehalse og forældede processer, som forhindrer hurtig adgang til patientdata.",
        choiceA: {
          label: "Detaljeret systemgennemgang",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader servere og netværk, så EPJ-systemet kan køre hurtigere.",
        stepContext: "Opgradering af infrastrukturen sikrer, at systemet kan håndtere en højere belastning og forbedrer responstiden.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Minimal opgradering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye procedurer og opdater patientjournalens brugervejledninger.",
        stepContext: "Grundig dokumentation sikrer, at alle brugere hurtigt kan tilpasse sig de nye systemer og processer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Integration af LIMS og EPJ",
    shortDesc: "Systemerne for LIMS og patientjournalen er adskilte.",
    narrativeIntro: `
      Fejl i dataoverførslen mellem laboratoriet og patientjournalen fører til misforståelser af testresultater. En fuld integration kan forbedre informationsflowet og sikre korrekt databehandling.
    `,
    glossaryTerms: ["LIMS", "EPJ", "Integration", "Kliniske data"],
    digDeeperLinks: [
      { label: "Integrationseksempler", text: "Lær, hvordan moderne hospitaler integrerer laboratorie- og journalsystemer." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de nuværende datamodeller i LIMS og EPJ.",
        stepContext: "En detaljeret kortlægning kan afsløre overlappende felter og uensartede dataformater, der forårsager fejl.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en integrationsplan og definer datastandarder.",
        stepContext: "En klar integrationsplan sikrer, at data overføres korrekt og reducerer risikoen for fejl.",
        choiceA: {
          label: "Omfattende plan",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Grundlæggende plan",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at den nye integrationsløsning overholder GDPR og patientlovgivning.",
        stepContext: "Compliance-checks forhindrer juridiske problemer og sikrer, at patientdata håndteres korrekt.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Digital Booking for Akutmodtagelsen",
    shortDesc: "Papirbaseret booking skaber kaos og fejl i akutmodtagelsen.",
    narrativeIntro: `
      Akutmodtagelsen oplever lange ventetider og forvirring, fordi bookingprocessen er manuel. Digitalisering kan effektivisere triagen og patientflowet.
    `,
    glossaryTerms: ["Booking", "Triage", "Digitalisering"],
    digDeeperLinks: [
      { label: "Digital Booking", text: "Se eksempler på, hvordan digitale booking-systemer forbedrer akutte processer." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér flaskehalse i den manuelle bookingproces.",
        stepContext: "En detaljeret analyse af patientstrømmen kan afsløre, hvor forsinkelser opstår og hvilke processer der skal automatiseres.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt bookingsystem med realtidsopdatering.",
        stepContext: "Et moderne system kan automatisere booking og minimere ventetider, men kræver en vis implementeringstid.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for, at bookingsystemet er beskyttet mod uautoriseret adgang.",
        stepContext: "Sikkerhed i et bookingsystem er afgørende for at beskytte patientdata og undgå misbrug.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen særlig sikring",
          text: "+0 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 0 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at den digitale løsning overholder patientlovgivningen (GDPR).",
        stepContext: "Overholdelse af lovgivning er kritisk for at beskytte patientdata og undgå juridiske konsekvenser.",
        choiceA: {
          label: "Fuld compliance-check",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Telemedicin til Kroniske Patienter",
    shortDesc: "Fjernmonitorering kan reducere unødvendige besøg, men kræver en stabil digital infrastruktur.",
    narrativeIntro: `
      Telemedicin giver mulighed for fjernopfølgning af kroniske patienter, men kræver både sikre kommunikationskanaler og klare procedurer.
    `,
    glossaryTerms: ["Telemedicin", "Remote Monitoring", "Compliance"],
    digDeeperLinks: [
      { label: "Telemedicin Løsninger", text: "Læs om, hvordan telemedicin kan forbedre patientopfølgning og reducere besøg." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de patienter, der er egnede til telemedicin.",
        stepContext: "En grundig analyse af patientdata sikrer, at kun de mest egnede patienter vælges til fjernopfølgning.",
        choiceA: {
          label: "Grundig patientanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en sikker telemedicinsk platform med kryptering.",
        stepContext: "Kryptering og sikker kommunikation er afgørende for at beskytte patientdata i telemedicin.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard platform",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt serverkapacitet til at håndtere store mængder telemedicinsk data.",
        stepContext: "Et robust infrastruktursystem sikrer, at telemedicinsk data håndteres uden forsinkelser.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Faseopdelt opsætning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér procedurer og retningslinjer for telemedicin.",
        stepContext: "En klar dokumentation sikrer, at personalet forstår og følger de nye procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Elektronisk Rekvisition af Blodprøver",
    shortDesc: "Manuelle bestillinger fører til fejl i blodprøvebestillinger.",
    narrativeIntro: `
      Papirbaserede rekvisitioner skaber forvirring og fejl. Digitalisering kan forbedre nøjagtigheden og hastigheden i blodprøvebestillinger.
    `,
    glossaryTerms: ["Rekvisition", "Digitalisering", "Patientdata"],
    digDeeperLinks: [
      { label: "Digital Rekvisition", text: "Læs om, hvordan digitalisering kan eliminere fejl i bestillingsprocessen." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende proces for blodprøvebestillinger.",
        stepContext: "En grundig analyse kan afdække flaskehalse og årsager til fejl i den manuelle proces.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en digital rekvisitionsløsning med sikker adgang.",
        stepContext: "En sikker digital løsning kan minimere fejl og beskytte følsomme data.",
        choiceA: {
          label: "Avanceret digital løsning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basal løsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en procedure for den nye digitale rekvisition og træn personalet.",
        stepContext: "God dokumentation og oplæring sikrer, at overgangen til digital rekvisition forløber uden fejl.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Effektivisering af Administrative IT-processer",
    shortDesc: "Manuelle procedurer skaber fejl og spild af tid.",
    narrativeIntro: `
      Administrationen håndteres manuelt, hvilket fører til unødvendige fejl og tidsforbrug. Digitalisering kan optimere processerne og øge effektiviteten.
    `,
    glossaryTerms: ["Administration", "Digitalisering", "Workflow"],
    digDeeperLinks: [
      { label: "Effektive Processer", text: "Se eksempler på, hvordan digitalisering kan strømlinet administrative opgaver." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de mest tidskrævende manuelle processer.",
        stepContext: "En detaljeret analyse kan afsløre flaskehalse og ineffektiviteter, der bremser den administrative drift.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Implementer et digitalt sagsbehandlingssystem.",
        stepContext: "Et effektivt system kan automatisere mange manuelle processer, men kræver en vis investering og tid.",
        choiceA: {
          label: "Omfattende system",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Minimal løsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at de nye systemer overholder relevante love og regler.",
        stepContext: "Compliance er afgørende for at undgå juridiske problemer, men kan medføre ekstra tidsforbrug.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye digitale processer og uddan admin-personalet.",
        stepContext: "Omfattende dokumentation sikrer, at systemerne bruges korrekt og effektivt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af IT-support for Kliniske Afdelinger",
    shortDesc: "Lang ventetid på IT-support påvirker patientbehandlingen.",
    narrativeIntro: `
      Kliniske afdelinger oplever utilstrækkelig IT-support, hvilket fører til driftsforstyrrelser og længere ventetid på løsninger. En ny supportstrategi er nødvendig.
    `,
    glossaryTerms: ["IT-support", "Brugeroplevelse", "Service Level Agreement"],
    digDeeperLinks: [
      { label: "Support Strategier", text: "Lær hvordan moderne IT-support kan øge både sikkerhed og effektivitet." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål nuværende responstid og kvalitet af IT-support.",
        stepContext: "En grundig evaluering kan identificere svage punkter i supportprocessen og muligheder for forbedring.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et automatiseret IT-supportsystem med realtidsmonitorering.",
        stepContext: "Et effektivt supportsystem kan reducere ventetid og forbedre driftsstabiliteten, men kræver en vis integration med eksisterende systemer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for, at supportsystemet beskytter følsomme data via rollebaseret adgang.",
        stepContext: "En sikker supportsystem sikrer, at kun autoriserede personer har adgang, hvilket mindsker risikoen for datalæk.",
        choiceA: {
          label: "Sikker rollebaseret adgang",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard adgangskontrol",
          text: "+0 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 0 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at IT-support processerne overholder GDPR og interne politikker.",
        stepContext: "Compliance er afgørende for at sikre, at alle data håndteres korrekt og sikkert i supportsystemet.",
        choiceA: {
          label: "Omhyggeligt lovtjek",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen yderligere tjek",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye supportsystemer og uddan brugerne i korrekt brug.",
        stepContext: "En grundig dokumentation hjælper med at reducere fejl og sikre, at systemet bruges optimalt.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Modernisering af Klinisk IT-infrastruktur",
    shortDesc: "Forældet hardware og netværk hæmmer den kliniske drift.",
    narrativeIntro: `
      Kliniske systemer lider under langsom ydeevne og hyppige nedetider. Modernisering er nødvendig for at sikre en stabil og effektiv drift.
    `,
    glossaryTerms: ["Klinisk IT", "Hardware", "Netværk"],
    digDeeperLinks: [
      { label: "Moderne Infrastruktur", text: "Lær, hvordan opdateret hardware og netværk kan øge systemets ydeevne." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de største flaskehalse i den kliniske drift.",
        stepContext: "En detaljeret kortlægning af de kliniske processer kan afsløre, hvor ineffektivitet opstår, og hvilke systemer der skal opgraderes.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader netværksudstyr og servere til moderne standarder.",
        stepContext: "Opgradering af den tekniske infrastruktur kan øge sikkerheden og reducere nedetid, men kræver investering i nyt udstyr.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisopgradering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer sikkerhedsforanstaltninger for at beskytte den nye infrastruktur.",
        stepContext: "Sikkerhedsløsninger som firewalls og IDS skal opdateres samtidig med infrastrukturen for at sikre maksimal beskyttelse.",
        choiceA: {
          label: "Avancerede sikkerhedsforanstaltninger",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard sikkerhed",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye systemer og opdater driftsprocedurerne.",
        stepContext: "Korrekt dokumentation er afgørende for, at de nye systemer kan vedligeholdes og bruges korrekt af personalet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Administrativ Forbedring af Patientindlæggelser",
    shortDesc: "Papirarbejde og ineffektive processer øger ventetider ved indlæggelser.",
    narrativeIntro: `
      Patientindlæggelser lider under bureaukrati og manuelle processer, hvilket skaber unødvendige forsinkelser. Digitalisering kan strømline processerne.
    `,
    glossaryTerms: ["Indlæggelse", "Digitalisering", "Workflow"],
    digDeeperLinks: [
      { label: "Digital Indlæggelse", text: "Lær, hvordan digitalisering kan forbedre patientflowet ved indlæggelse." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg den nuværende indlæggelsesprocedure for at identificere flaskehalse.",
        stepContext: "En detaljeret gennemgang af patientflowet kan afsløre, hvor ineffektiviteten opstår.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt indlæggelsessystem for at automatisere processen.",
        stepContext: "En digital platform kan reducere fejl og forkorte ventetider ved indlæggelser.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre at det nye system beskytter patientdata mod uautoriseret adgang.",
        stepContext: "Sikkerhedsforanstaltninger er afgørende for at beskytte patientdata, især i et digitalt system.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard sikkerhed",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at den nye indlæggelsesløsning overholder alle patientdata-regler (GDPR).",
        stepContext: "Compliance sikrer, at patientdata håndteres korrekt og sikkert.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen gennemgang",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye processer og uddan personalet i brugen af det digitale system.",
        stepContext: "Grundig dokumentation og træning sikrer en glidende overgang til de nye procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Elektronisk Lægemiddelordination",
    shortDesc: "Manuelle ordinationer fører til fejl i medicindosering.",
    narrativeIntro: `
      Papirordinationer og usikre systemer medfører fejl i medicindoseringen. En digital ordinationsløsning kan øge sikkerheden og reducere fejl.
    `,
    glossaryTerms: ["Ordination", "Digitalisering", "Patientdata"],
    digDeeperLinks: [
      { label: "Digital Ordination", text: "Læs om, hvordan digital ordination kan forbedre nøjagtigheden i medicinbestillinger." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende ordinationsproces og identificer fejl.",
        stepContext: "En detaljeret analyse af ordinationsprocessen kan afdække, hvor fejl opstår og hvad der skal forbedres.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt ordinationssystem med automatiserede kontroller.",
        stepContext: "Et moderne system minimerer fejl og sikrer, at medicinen ordineres korrekt.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd detaljerede procedurer for den nye digitale ordination og træn personalet.",
        stepContext: "Grundig dokumentation og oplæring sikrer en sikker og effektiv implementering af den nye ordinationsløsning.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at den digitale ordinationsløsning overholder gældende lovgivning og standarder.",
        stepContext: "Compliance-check er afgørende for at beskytte patientdata og undgå juridiske problemer.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  }
];
