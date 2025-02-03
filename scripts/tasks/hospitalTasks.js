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
    digDeeperLinks: [
      { label: "EPJ-udfordringer", text: "En forældet EPJ kan skabe fejl i patientdata og øge svartider." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér den nuværende EPJ for fejl og svartider.",
        stepContext: "I dette trin skal du gennemgå systemets logfiler og performance-data for at identificere flaskehalse og fejl. Dette giver et overblik over, hvilke aspekter der skal opgraderes.",
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
        stepContext: "Her skal du vurdere, om eksisterende hardware kan håndtere den nye software, eller om der kræves en komplet opgradering af serverkapaciteten.",
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
        stepContext: "Det er vigtigt at dokumentere de ændringer, der foretages. Dette omfatter detaljerede beskrivelser af opgraderingerne og procedurer for vedligeholdelse, så alle IT-medarbejdere og ledelsen er informeret.",
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
    digDeeperLinks: [
      { label: "Dataflow", text: "En vellykket integration sikrer et gnidningsfrit dataflow mellem systemerne." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg datamodeller for LIMS og EPJ, og identificér overlap.",
        stepContext: "Gennemgå de eksisterende datastrukturer og processer for at finde, hvor de to systemer kan forbindes og synkroniseres automatisk.",
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
        stepContext: "I dette trin skal du implementere sikkerhedsforanstaltninger som kryptering for at beskytte data under overførslen mellem LIMS og EPJ.",
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
        stepContext: "Sørg for, at integrationen overholder alle juridiske krav, herunder sikkerhedskrav og databeskyttelse, for at undgå lovbrud.",
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
        stepContext: "Udarbejd en detaljeret plan for, hvordan data skal flyde mellem systemerne, og hvem der er ansvarlig for de enkelte processer.",
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
    digDeeperLinks: [
      { label: "Digitalisering", text: "En digital bookingløsning kan automatisere og effektivisere patientflowet." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér flaskehalse i den nuværende manuelle bookingproces.",
        stepContext: "Analyser den nuværende proces, og find ud af, hvor der opstår de største fejl og forsinkelser, så løsningen kan målrettes.",
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
        stepContext: "Vælg en platform, der understøtter automatisk opdatering af bookinger og reducerer ventetiderne ved akutmodtagelsen.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for at bookingsystemet ikke kan misbruges (MFA, logging).",
        stepContext: "Sikkerhedstiltag som MFA og logning skal implementeres for at beskytte mod uautoriseret adgang og datalækage.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+3 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen særlig sikring",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at bookingdata overholder patientlovgivning (GDPR).",
        stepContext: "Undersøg de juridiske krav for håndtering af patientdata og sørg for, at den digitale løsning er compliant med GDPR.",
        choiceA: {
          label: "Fuld compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv nye retningslinjer for digital booking og triage.",
        stepContext: "Dokumentationen skal forklare den nye digitale proces, herunder roller og ansvarsområder for at sikre en glidende overgang fra manuelle til digitale processer.",
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

  // Opgave 4 (6 trin)
  {
    title: "Telemedicin til Kroniske Patienter",
    shortDesc: "Hospitalet ønsker at tilbyde fjernmonitorering for kronikere.",
    narrativeIntro: `
      "Kroniske patienter kan spare mange besøg ved telemedicinsk opfølgning, 
       men IT-løsningen skal være sikker og lovlig."
    `,
    glossaryTerms: ["Telemedicin", "Kliniske data", "Compliance", "Integration"],
    digDeeperLinks: [
      { label: "Telemedicinfordele", text: "Telemedicin kan reducere unødvendige konsultationer og spare ressourcer." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér patientgrupper egnede til telemedicin.",
        stepContext: "Analyser patientdata for at finde ud af, hvilke patienter der med fordel kan monitoreres hjemmefra, og hvordan dette kan optimere behandlingen.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtigt skøn",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Vælg ekstern leverandør af telemedicinsk udstyr og software.",
        stepContext: "Vurder markedet for telemedicinsk teknologi og find en leverandør, der kan tilbyde en pålidelig og sikker løsning, der matcher hospitalets behov.",
        choiceA: {
          label: "Grundig leverandørvurdering",
          text: "+2 tid, -80 kr, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Vælg hurtigst mulige tilbud",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre krypteret kommunikation af vitale målinger hjemmefra.",
        stepContext: "Implementér en sikker kommunikationskanal, så patientdata overføres krypteret til hospitalets systemer, og oprethold sporbarhed via logging.",
        choiceA: {
          label: "Avanceret kryptering + logging",
          text: "+3 tid, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Kun basis-sikkerhed",
          text: "+2 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt kapacitet til at modtage store mængder telemetriedata.",
        stepContext: "Der skal etableres en robust infrastruktur, som kan håndtere den øgede datamængde fra fjernmonitorering uden at påvirke den daglige drift negativt.",
        choiceA: {
          label: "Skaleret serverløsning",
          text: "+2 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Minimal kapacitet",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overholdelse af GDPR ved fjernmonitorering af sundhedsdata.",
        stepContext: "Sørg for, at alle telemedicinske løsninger overholder GDPR og andre lovkrav, og at data behandles fortroligt og sikkert.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring detaljer over",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udfør dokumentation af processer, ansvar og driftsaftaler.",
        stepContext: "Dokumentationen skal redegøre for hele telemedicin-processen, herunder hvordan systemet monitoreres, og hvem der er ansvarlig for vedligeholdelse og support.",
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

  // Opgave 5 (3 trin)
  {
    title: "Elektronisk Rekvisition af Blodprøver",
    shortDesc: "Afdelingen bruger papirsedler til blodprøvebestilling, hvilket medfører fejl.",
    narrativeIntro: `
      "Manuelle bestillinger fører til forkerte patientdata og dobbelthåndtering. 
       En digital løsning kan reducere fejl."
    `,
    glossaryTerms: ["Kliniske data", "Integration"],
    digDeeperLinks: [
      { label: "Digitalisering", text: "Digitalisering af blodprøvebestillinger kan øge nøjagtigheden og reducere administrative fejl." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér hvor papirprocessen giver flest fejl og forsinkelser.",
        stepContext: "Undersøg de manuelle processer, identificer flaskehalse og områder med hyppige fejl for at kunne målrette den digitale løsning bedst muligt.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer sikker digital bestilling for blodprøver.",
        stepContext: "Sørg for, at den digitale løsning har tilstrækkelige sikkerhedsforanstaltninger, så følsomme patientdata beskyttes mod uautoriseret adgang.",
        choiceA: {
          label: "Avanceret E-rekvisition",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal digital løsning",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv den nye procedure og lær personalet op.",
        stepContext: "Udarbejd en detaljeret manual, som forklarer den digitale proces, og afhold oplæring for at sikre, at overgangen fra papirsystem til digital løsning forløber gnidningsfrit.",
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

  // Opgave 6 (4 trin)
  {
    title: "Effektivisering af Administrative IT-processer",
    shortDesc: "Manuelle procedurer medfører fejl og forsinkelser i administrationen.",
    narrativeIntro: `
      "Administrationsteamet håndterer forsikringer og økonomi manuelt, 
       hvilket koster tid og skaber papirbunker."
    `,
    glossaryTerms: ["Compliance", "Integration"],
    digDeeperLinks: [
      { label: "Digital transformation", text: "Digitalisering af administrative processer kan øge effektiviteten og reducere fejl." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de mest tunge manuelle arbejdsgange.",
        stepContext: "Identificér de processer, der spilder mest tid, og vurder potentialet for digitalisering.",
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
        location: "leverandor",
        stepDescription: "Indkøb eller udvikling af digital sagsbehandlingsløsning.",
        stepContext: "Undersøg markedet for løsninger, der kan automatisere administrative processer, og vælg en løsning der matcher hospitalets behov og budget.",
        choiceA: {
          label: "Omfattende system",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal løsning",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overhold licensaftaler og persondataregler for administrative data.",
        stepContext: "Sørg for at den nye løsning opfylder alle lovkrav og at datahåndteringen er i overensstemmelse med GDPR og andre relevante regler.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer formaliteter",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye procesflows og uddan admin-personale.",
        stepContext: "Udarbejd detaljeret dokumentation, der beskriver den nye digitale arbejdsgang, og afhold workshops for at sikre, at alle forstår de nye processer.",
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

  // Opgave 7 (5 trin)
  {
    title: "Forbedring af IT-support for Kliniske Afdelinger",
    shortDesc: "Lang ventetid på IT-support påvirker patientbehandling.",
    narrativeIntro: `
      "Klinikkerne oplever ringe IT-support, hvilket går ud over patientflowet. 
       Hospitalet ønsker en hurtigere og automatiseret supportløsning."
    `,
    glossaryTerms: ["Kliniske data", "CAB", "Compliance"],
    digDeeperLinks: [
      { label: "IT-support trends", text: "Moderne IT-support involverer automatisering og selvbetjeningsløsninger." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål nuværende responstid og kvalitet i IT-support.",
        stepContext: "Indsaml data om nuværende responstider, og identificer hvilke afdelinger, der har det største behov for forbedret IT-support.",
        choiceA: {
          label: "Detaljeret evaluering",
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
        stepDescription: "Implementer nyt IT-supportsystem med automatisering.",
        stepContext: "Vælg et system, der kan automatisere mange af supportopgaver og give hurtig respons til klinikkerne.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for, at supportsystemet ikke afslører følsomme data til uautoriserede.",
        stepContext: "Implementér adgangskontrol og logging i det nye supportsystem, så kun autoriserede brugere har adgang til patientdata.",
        choiceA: {
          label: "Role-based Access + logging",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen sikkerhedsforanstaltninger",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek krav om korrekt registrering af patientdata (GDPR).",
        stepContext: "Gennemfør et compliance-check for at sikre, at alle data håndteres i overensstemmelse med lovgivningen.",
        choiceA: {
          label: "Fuld compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring dette over",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye supportprocedurer og uddan personalet.",
        stepContext: "Udarbejd en detaljeret vejledning for IT-support, der beskriver nye procedurer og ansvarsområder, så alle afdelinger er klar over ændringerne.",
        choiceA: {
          label: "Detaljeret dokumentation",
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

  // Opgave 8 (4 trin)
  {
    title: "Modernisering af Klinisk IT-infrastruktur",
    shortDesc: "Forældet hardware og netværk giver ustabil drift i flere klinikker.",
    narrativeIntro: `
      "Lange svartider og hyppige nedbrud i klinikken gør, at patientbehandlingen forsinkes. 
       Hospitalet vil modernisere den kliniske IT-infrastruktur."
    `,
    glossaryTerms: ["Integration", "CAB", "Kliniske data"],
    digDeeperLinks: [
      { label: "Infrastrukturfordele", text: "Modernisering kan øge systemets hastighed og pålidelighed, hvilket forbedrer patientplejen." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de største flaskehalse i den kliniske drift.",
        stepContext: "Gennemgå performance-data og brugeranmeldelser for at fastslå, hvilke dele af infrastrukturen der er mest problematiske.",
        choiceA: {
          label: "Omfattende kortlægning",
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
        stepDescription: "Opgradér netværksudstyr og serverkapacitet for bedre ydeevne.",
        stepContext: "Vurder den nuværende hardware og identificér de komponenter, der skal udskiftes for at sikre en stabil og hurtig drift.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 tid, -100 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opgradering",
          text: "+2 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre, at nye systemer er beskyttet mod uautoriseret adgang.",
        stepContext: "Implementér sikkerhedsprotokoller og adgangskontrol for at forhindre, at uautoriserede får adgang til de opgraderede systemer.",
        choiceA: {
          label: "Stærke adgangskrav",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard logins",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentation om den nye infrastruktur og driftsprocedurer.",
        stepContext: "Udarbejd en detaljeret beskrivelse af de nye systemer, opgraderinger og de procedurer, der skal følges for at sikre en stabil drift.",
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

  // Opgave 9 (5 trin)
  {
    title: "Administrativ Forbedring af Patientindlæggelser",
    shortDesc: "Flaskehalse og papirarbejde ved indlæggelse øger ventetider.",
    narrativeIntro: `
      "Patientindlæggelse er bureaukratisk og langsomt. Hospitalet vil digitalisere og automatisere processerne."
    `,
    glossaryTerms: ["Booking", "Integration", "Compliance"],
    digDeeperLinks: [
      { label: "Digitalisering", text: "Digitalisering af patientindlæggelser kan øge effektiviteten og reducere fejl." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg nuværende indlæggelsesprocedure.",
        stepContext: "Identificér de trin, hvor papirprocessen skaber flaskehalse og fejl, og kortlæg de primære problemområder.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt en digital indlæggelsesplatform.",
        stepContext: "Implementér et system, der automatiserer patientindlæggelsen, mindsker fejl og forbedrer flowet i akutte situationer.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal digital opsætning",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre patientdata og hindre uautoriseret adgang i det nye system.",
        stepContext: "Implementér sikkerhedsforanstaltninger som MFA og logging, så kun autoriserede får adgang til følsomme data.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard login",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at bookingdata overholder patientlovgivning (GDPR).",
        stepContext: "Foretag et compliance-check for at sikre, at de nye digitale processer håndteres i overensstemmelse med lovgivningen.",
        choiceA: {
          label: "Fuld compliance-check",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér og uddan om nye indlæggelsesprocedurer.",
        stepContext: "Udarbejd en detaljeret vejledning, der beskriver den nye digitale proces, og afhold oplæring for at sikre, at personalet er klar over de ændrede procedurer.",
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

  // Opgave 10 (4 trin)
  {
    title: "Elektronisk Lægemiddelordination",
    shortDesc: "Fejl i medicindosering pga. manuelle ordinationer.",
    narrativeIntro: `
      "Papirordinationer og usikre systemer fører til medicindoseringsfejl. 
       Hospitalet vil digitalisere og validere ordinationer automatisk."
    `,
    glossaryTerms: ["Kliniske data", "Integration", "Compliance"],
    digDeeperLinks: [
      { label: "Digital ordination", text: "En digital ordinationsproces kan reducere fejl og sikre korrekte doser." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser nuværende proces for medicinordination og fejl.",
        stepContext: "Undersøg de manuelle processer og identificér de mest hyppige fejl, så du kan målrette den digitale løsning bedst muligt.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development.",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort scanning",
          text: "+1 tid, +5% risk.",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer digital ordinationssystem med kontrolmoduler.",
        stepContext: "Vælg et system, der sikrer, at medicinordinationer bliver verificeret automatisk for at minimere fejl.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -80 kr, +3 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal løsning",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre, at ordinationssystemet ikke kan manipuleres.",
        stepContext: "Implementér sikkerhedsforanstaltninger, såsom logging og rollebaseret adgang, for at forhindre manipulation af medicinordinationer.",
        choiceA: {
          label: "Avancerede logs + rollebaseret adgang",
          text: "+2 tid, +2 security.",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen ekstra sikring",
          text: "+5% risk.",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv nye procedurer og undervise i digital ordination.",
        stepContext: "Dokumentationen skal omfatte en detaljeret beskrivelse af den nye ordinationsproces samt oplæring af personalet for at sikre en korrekt implementering.",
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
  }

];
