window.hospitalTasks = [

  // Opgave 1 (3 trin)
  {
    title: "Patientjournalsystem for sengeafsnit",
    shortDesc: "Forældede patientjournaler gør arbejdet besværligt på sengeafsnittet.",
    narrativeIntro: `
      "Det nuværende journalsystem for sengeafsnittet er ustabilt. Personalet oplever lange svartider og uoverskuelig data."
    `,
    digDeeperLinks: [
      { label: "Elektronisk Journalfordele", text: "Mere effektiv dokumentation, bedre overblik og færre fejl i patientdata." }
    ],
    architectAdvice: `
      Arkitekten fremhæver især trin 2, hvor systemet skal implementeres sikkert for at undgå nedetid.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg fejl og svartider i det nuværende journalsystem.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk evaluering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Implementer et nyt digitalt journalsystem.",
        choiceA: {
          label: "Fuldt implementeret system",
          text: "+4 tid, -100 kr, +3 security",
          recommended: true,  // Arkitekthjælp fremhæver dette
          applyEffect: { timeCost: 4, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig install",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Koordinér med ekstern leverandør om supportaftale.",
        choiceA: {
          label: "Fuld support",
          text: "+2 tid, -50 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen supportaftale",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 2 (4 trin)
  {
    title: "Integration af laboratorium-opgaver med hospitalets LIMS",
    shortDesc: "Laboratoriet bruger eget system, som ikke er synkroniseret med hospitalets centrale LIMS.",
    narrativeIntro: `
      "Hospitalet vil samle data i ét LIMS, men laboratoriet kører et separat system. 
       Mangel på integration forsinker svar og giver fejl i patientbehandlingen."
    `,
    digDeeperLinks: [
      { label: "LIMS-fordele", text: "Et LIMS kan håndtere laboratorieopgaver effektivt og integrere med patientjournalsystemer." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 4 for at sikre korrekt dokumentation af de nye processer.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg dataflows mellem laboratoriet og hospitalet.",
        choiceA: {
          label: "Detaljeret behovsanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for sikker dataoverførsel og krypterede laboratorieresultater.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+3 tid, -80 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis sikkerhed",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt netværksforbindelse mellem lab-system og hospitalets servere.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+2 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye integrationsprocesser og testresultater.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid",
          recommended: true, // Arkitekten fremhæver dette trin
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 3 (5 trin)
  {
    title: "Undersøgelse af kritiske fejl på operationsafsnittet",
    shortDesc: "Operationspersonale oplever systemnedbrud under procedurer.",
    narrativeIntro: `
      "Flere operationer har været forsinket pga. IT-nedbrud, hvilket skaber stor frustration.
       Hospitalet ønsker at finde årsagen og fikse det hurtigt."
    `,
    digDeeperLinks: [
      { label: "Systemfejl i hospitaler", text: "Hyppige nedbrud kan udsætte patienter for risici og koste hospitalet dyrt." }
    ],
    architectAdvice: `
      Arkitekten pointerer, at trin 2 er altafgørende for at undgå gentagne nedbrud.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemgå fejlrapporter fra de sidste måneders operationer.",
        choiceA: {
          label: "Omfattende review",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtigt kig i loggen",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Forstærk netværksstabilitet og serverkapacitet ved operationsafsnittet.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+4 tid, -120 kr, +3 security",
          recommended: true, // Arkitekten
          applyEffect: { timeCost: 4, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billig løsning",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Undersøg mulige hackerangreb eller malware.",
        choiceA: {
          label: "Grundig scanning",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for lovpligtig rapportering af kritiske incidents.",
        choiceA: {
          label: "Rapportér efter reglerne",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring rapportering over",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer for driftsstabilitet i operationsafsnittet.",
        choiceA: {
          label: "Opdater alt",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen ajourføring",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 4 (6 trin)
  {
    title: "Overhaul af bookingprocedurer i akutmodtagelsen",
    shortDesc: "Flaskehalse og forkerte prioriteringer skaber kaos i akutmodtagelsen.",
    narrativeIntro: `
      "Akutmodtagelsen oplever overbelastning og vil indføre nye booking- og triageprocedurer
       for at sikre hurtigere behandling."
    `,
    digDeeperLinks: [
      { label: "Akut triageprincipper", text: "Rette patient i rette tid kan redde liv og ressourcer." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 3 som kritisk for den samlede bookingløsning.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser de nuværende procedurer i akutmodtagelsen.",
        choiceA: {
          label: "Dybtgående procesanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Lyn-evaluering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Køb eller udvikl et dedikeret triagesystem.",
        choiceA: {
          label: "Køb standardløsning",
          text: "+3 tid, -150 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hjemmelavet løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for krypteret datahåndtering i det nye booking/triagesystem.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+3 tid, +3 security",
          recommended: true,  // Arkitekten kritisk
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal sikkerhed",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt serverkapacitet til triagesystemet.",
        choiceA: {
          label: "Fuldt skaleret opsætning",
          text: "+2 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Minimal kapacitet",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at løsningen overholder GDPR ved akut datahåndtering.",
        choiceA: {
          label: "Grundigt compliance-tjek",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring dette over",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer og dokumentation for akutbooking.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 5 (3 trin)
  {
    title: "Digital blodprøvebestilling",
    shortDesc: "Personalet bruger manuelle rekvisitioner, hvilket forårsager fejl i blodprøver.",
    narrativeIntro: `
      "Manuelle papirsedler gør, at der opstår fejl i bestilling af blodprøver.
       Digitalisering kan minimere fejlkilder og spare tid."
    `,
    digDeeperLinks: [
      { label: "Digitale bestillinger", text: "Elektroniske rekvisitioner reducerer tastefejl og sikrer hurtig overførsel." }
    ],
    architectAdvice: `
      Arkitekten anbefaler trin 2 for sikkerhed og korrekt forbindelse til laboratoriedata.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér hvor papirsedler fører til mest forsinkelse og fejl.",
        choiceA: {
          label: "Dybtgående analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort oversigt",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer et digitalt bestillingssystem med sikker dataoverførsel.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér processen og uddan personalet i digital rekvisition.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 6 (4 trin)
  {
    title: "Reduktion af fejl i medicinordination",
    shortDesc: "Fejl opstår pga. mangelfuld IT-støtte til medicinbestilling.",
    narrativeIntro: `
      "Afdelingen har oplevet fejl i medicindosering, da IT-systemet ikke giver advarsler eller tjek ved ordination."
    `,
    digDeeperLinks: [
      { label: "Medicin-it-systemer", text: "Automatiske tjek for interaktioner kan forhindre medicinfejl." }
    ],
    architectAdvice: `
      Arkitekten mener, at trin 3 (it-jura) er kritisk pga. regler for medicinhåndtering.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser nuværende proces for ordination.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt system for medicinchecks ved ordination.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, -100 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for overholdelse af medicinlovgivning og patientsikkerhed.",
        choiceA: {
          label: "Grundigt compliance-tjek",
          text: "+2 tid, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal kontrol",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater vejledning i medicinbestilling og dokumentér nye procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen ændringer",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 7 (3 trin)
  {
    title: "Optimering af patienttransport internt i hospitalet",
    shortDesc: "Manglende digital oversigt over transport-ressourcer fører til ventetid.",
    narrativeIntro: `
      "Portører og senge er i konstant bevægelse, men der er ingen digital opfølgning,
       så patienter venter for længe på transport mellem afsnit."
    `,
    digDeeperLinks: [
      { label: "Transport-IT", text: "Et overskueligt system kan fordele transportressourcer bedre." }
    ],
    architectAdvice: `
      Arkitekten peger på trin 2 som nøglen for at sikre driftsikkerheden ved transport.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér hvor transportflaskehalsene opstår.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementér digitalt bookingsystem til portører og senge.",
        choiceA: {
          label: "Fuldt system",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billig løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér arbejdsgange og opdater personalets rutiner.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 8 (4 trin)
  {
    title: "Implementering af telemedicin til kroniske patienter",
    shortDesc: "Hospitalet vil tilbyde telemedicinsk opfølgning for patienter med kroniske lidelser.",
    narrativeIntro: `
      "Mange patienter med kroniske sygdomme kan monitoreres hjemmefra,
       men hospitalet mangler en sikker telemedicin-løsning."
    `,
    digDeeperLinks: [
      { label: "Telemedicin Fordele", text: "Sparer tid for både patienter og hospital, og giver hurtigere indsats ved forværring." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 3 for at sikre at telemetriedata er ordentligt krypteret.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér patientgrupper egnede til telemedicinsk opfølgning.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtigt skøn",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Vælg ekstern leverandør af telemedicinsk udstyr og software.",
        choiceA: {
          label: "Grundig leverandørvurdering",
          text: "+2 tid, -80 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Vælg billigste tilbud",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre krypteret kommunikation af vitale målinger fra hjemmet.",
        choiceA: {
          label: "Avanceret krypteringsopsætning",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Almindelig SSL",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér telemedicinske procedurer og ansvar.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 9 (5 trin)
  {
    title: "Overvågning af vitale målinger i intensivafsnittet",
    shortDesc: "Intensivafsnittet ønsker IT-løsning til at holde øje med vitale data 24/7.",
    narrativeIntro: `
      "Patienter på intensiv skal monitoreres konstant, men personalet klager over,
       at data spredes i flere systemer uden samlet overblik."
    `,
    digDeeperLinks: [
      { label: "Overvågningssystemer", text: "Helst realtidsmonitorering, der advarer personalet ved kritiske ændringer." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2 som kritisk, da systemet skal være pålidelig for kritiske patienter.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér det nuværende workflow på intensivafsnittet.",
        choiceA: {
          label: "Omfattende workflow-analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig gennemgang",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et stabilt overvågningssystem for vitale data.",
        choiceA: {
          label: "Avanceret, redundant system",
          text: "+4 tid, -120 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 4, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Enkel løsning",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for at overvågningsdata ikke kan tilgås af uautoriserede.",
        choiceA: {
          label: "Opsæt strenge adgangskrav",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basal adgang",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek overholdelse af patientlovgivning, da data er meget følsomt.",
        choiceA: {
          label: "Grundig compliance",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig tjek",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye overvågningsprocedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 10 (6 trin)
  {
    title: "Optimering af medicoteknisk udstyrs vedligeholdelse",
    shortDesc: "Medicoteknisk udstyr kræver jævnlig vedligehold, men systemet herfor er ineffektivt.",
    narrativeIntro: `
      "Mange apparater i hospitalet får ikke rettidig service, hvilket
       øger risikoen for fejl og nedbrud, især i kritiske situationer."
    `,
    digDeeperLinks: [
      { label: "Udstyrservice", text: "Regelmæssig vedligehold og serviceforløb forlænger apparaters levetid og minimerer fejl." }
    ],
    architectAdvice: `
      Arkitekten påpeger, at trin 4 (cybersikkerhed) er kritisk for at sikre, at
      software på udstyret ikke kan kompromitteres.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Registrer alt medicoteknisk udstyr og dets servicehistorik.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Foreløbig registrering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent serviceaftaler fra diverse udstyrsleverandører.",
        choiceA: {
          label: "Fuld serviceaftale",
          text: "+2 tid, -80 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen servicekontrakt",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt IT-løsning, der overvåger apparatets tilstand.",
        choiceA: {
          label: "Moderne IoT-overvågning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Manuel kontrol",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for softwareopdateringer og beskyttelse mod hacking.",
        choiceA: {
          label: "Avancerede sikkerhedstjek",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basisopdateringer",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overholdelse af regler for medicoteknisk udstyr (fx CE-mærkning).",
        choiceA: {
          label: "Grundigt compliance-tjek",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér serviceprocedurer og ansvar for vedligeholdelse.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
