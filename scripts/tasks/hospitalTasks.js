window.hospitalTasks = [

  // Opgave 1 (3 trin)
  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Nuværende patientjournal er langsom og ineffektiv.",
    narrativeIntro: `
      "Hospitalet kæmper med en forældet elektronisk patientjournal (EPJ), 
       der ofte fejler ved spidsbelastning."
    `,
    glossaryTerms: ["Patientjournal", "Integration", "CAB"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér den nuværende EPJ for fejl og svartider.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér backend og servere for at understøtte ny EPJ-software.",
        choiceA: {
          label: "Omfattende serveropgradering",
          text: "+3 tid, -100 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal serveropgradering",
          text: "+2 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udfør ændringsbeskrivelser og teknisk dokumentation.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 2 (4 trin)
  {
    title: "Integration af LIMS og Patientdata",
    shortDesc: "Laboratoriet bruger separat LIMS, som ikke taler med EPJ.",
    narrativeIntro: `
      "Fejlagtige testresultater pga. manuelle indtastninger. 
       Hospitalet ønsker en fuld integration mellem LIMS og patientjournalsystemet."
    `,
    glossaryTerms: ["LIMS", "Integration", "CAB", "Kliniske data"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg datamodeller for LIMS og EPJ, og identificér overlap.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for sikker overførsel af laboratorieresultater, evt. kryptering.",
        choiceA: {
          label: "Krypteret dataudveksling",
          text: "+3 tid, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ubeskyttet dataoverførsel",
          text: "+2 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek GDPR og patientlovgivning ift. data i laboratorieprøver.",
        choiceA: {
          label: "Fuldt compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal check",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv integrationsflow og ansvar mellem lab og klinik.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 3 (5 trin)
  {
    title: "Digital Booking for Akutmodtagelsen",
    shortDesc: "Papirsedler og telefonopkald skaber kaos i booking og triage.",
    narrativeIntro: `
      "Akutmodtagelsen oplever mangel på overblik i booking, hvilket giver lange ventetider 
       og fejlprioriteringer i triage."
    `,
    glossaryTerms: ["Booking", "Triage", "Integration"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér flaskehalse i den nuværende manuelle bookingproces.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer digital bookingplatform med realtidsopdatering.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for at bookingsystemet ikke kan misbruges (MFA, logging).",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen særlig sikring",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at bookingdata overholder patientlovgivning (GDPR).",
        choiceA: {
          label: "Fuld compliance-check",
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
        stepDescription: "Nedskriv nye retningslinjer for digital booking og triage.",
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

  // Opgave 4 (6 trin)
  {
    title: "Telemedicin til Kroniske Patienter",
    shortDesc: "Hospitalet ønsker at tilbyde fjernmonitorering for kronikere.",
    narrativeIntro: `
      "Kroniske patienter kan spare mange besøg ved telemedicinsk opfølgning, 
       men IT-løsningen skal være sikker og lovlig."
    `,
    glossaryTerms: ["Telemedicin","Kliniske data","Compliance", "Integration"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér patientgrupper egnede til telemedicin.",
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
          label: "Vælg hurtigst mulige tilbud",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre krypteret kommunikation af vitale målinger hjemmefra.",
        choiceA: {
          label: "Avanceret kryptering + logging",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Kun basis-sikkerhed",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt kapacitet til at modtage store mængder telemetriedata.",
        choiceA: {
          label: "Skaleret serverløsning",
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
        stepDescription: "Overholdelse af GDPR ved fjernmonitorering af sundhedsdata.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring detaljer over",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udfør dokumentation af processer, ansvar og driftsaftaler.",
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
    title: "Elektronisk Rekvisition af Blodprøver",
    shortDesc: "Afdelingen bruger papirsedler til blodprøvebestilling, hvilket medfører fejl.",
    narrativeIntro: `
      "Manuelle bestillinger fører til forkerte patientdata og dobbelthåndtering. 
       En digital løsning kan reducere fejl."
    `,
    glossaryTerms: ["Kliniske data", "Integration"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér hvor papirprocessen giver flest fejl og forsinkelser.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer sikker digital bestilling for blodprøver.",
        choiceA: {
          label: "Avanceret E-rekvisition",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal digital løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv den nye procedure og lær personalet op.",
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
    title: "Effektivisering af Administrative IT-processer",
    shortDesc: "Manuelle procedurer medfører fejl og forsinkelser i administrationen.",
    narrativeIntro: `
      "Administrationsteamet håndterer forsikringer og økonomi manuelt, 
       hvilket koster tid og skaber papirbunker."
    `,
    glossaryTerms: ["Compliance","Integration"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de mest tunge manuelle arbejdsgange.",
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
        location: "leverandor",
        stepDescription: "Indkøb eller udvikling af digital sagsbehandlingsløsning.",
        choiceA: {
          label: "Omfattende system",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overhold licensaftaler og persondataregler for administrative data.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer formaliteter",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye procesflows og uddan admin-personale.",
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

  // Opgave 7 (5 trin)
  {
    title: "Forbedring af IT-support for Kliniske Afdelinger",
    shortDesc: "Lang ventetid på IT-support påvirker patientbehandling.",
    narrativeIntro: `
      "Klinikkerne oplever ringe IT-support, hvilket går ud over patientflowet. 
       Hospitalet ønsker en hurtigere og automatiseret supportløsning."
    `,
    glossaryTerms: ["Kliniske data","CAB","Compliance"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Mål nuværende responstid og kvalitet i IT-support.",
        choiceA: {
          label: "Detaljeret evaluering",
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
        stepDescription: "Implementer nyt IT-supportsystem med automatisering.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for, at supportsystemet ikke afslører følsomme data til uautoriserede.",
        choiceA: {
          label: "Sikker rollebaseret adgang",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen sikkerhedsforanstaltninger",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overhold GDPR ifm. logs og sagsbehandling af kliniske fejl.",
        choiceA: {
          label: "Omhyggelig lov-tjek",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen compliance",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye supportprocedurer og undervis personalet.",
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

  // Opgave 8 (4 trin)
  {
    title: "Modernisering af Klinisk IT-infrastruktur",
    shortDesc: "Forældet hardware og netværk giver ustabil drift i flere klinikker.",
    narrativeIntro: `
      "Langsomme systemer og hyppige nedetider i klinikken. 
       Hospitalet vil modernisere den kliniske IT-infrastruktur."
    `,
    glossaryTerms: ["Integration","CAB","Kliniske data"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de største flaskehalse i den kliniske drift.",
        choiceA: {
          label: "Omfattende kortlægning",
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
        stepDescription: "Opgradér netværksudstyr og serverkapacitet for bedre ydeevne.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opgradering",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for at nye systemer er beskyttet mod uautoriseret adgang.",
        choiceA: {
          label: "Stærke adgangskrav",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard logins",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentation om den nye infrastruktur og driftsprocedurer.",
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

  // Opgave 9 (5 trin)
  {
    title: "Administrativ Forbedring af Patientindlæggelser",
    shortDesc: "Flaskehalse og papirarbejde ved indlæggelse øger ventetider.",
    narrativeIntro: `
      "Patientindlæggelse er bureaukratisk og langsomt. 
       Hospitalet vil digitalisere og automatisere processerne."
    `,
    glossaryTerms: ["Booking","Integration","Compliance"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg nuværende indlæggelsesprocedure.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt en digital indlæggelsesplatform.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal digital opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre patientdata og hindre uautoriseret adgang i det nye system.",
        choiceA: {
          label: "Role-based Access + logging",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard login",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek krav om korrekt registrering af patientdata (GDPR).",
        choiceA: {
          label: "Fuld compliance-check",
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
        stepDescription: "Dokumentér og uddan om nye indlæggelsesprocedurer.",
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

  // Opgave 10 (4 trin)
  {
    title: "Elektronisk Lægemiddelordination",
    shortDesc: "Fejl i medicindosering pga. manuelle ordinationer.",
    narrativeIntro: `
      "Papirordinationer og usikre systemer fører til medicindoseringsfejl. 
       Hospitalet vil digitalisere og validere ordinationer automatisk."
    `,
    glossaryTerms: ["Kliniske data","Integration","Compliance"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser nuværende proces for medicinordination og fejl.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer digital ordinationssystem med kontrolmoduler.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre, at ordinationssystem ikke kan manipuleres.",
        choiceA: {
          label: "Avancerede logs + rollebaseret adgang",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen ekstra sikring",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv nye procedurer og undervise i digital ordination.",
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
  }

];
