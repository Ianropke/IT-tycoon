window.hospitalTasks = [

  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Det nuværende journalsystem er langsomt og forældet.",
    narrativeIntro: `
      "Hospitalets nuværende patientjournaler er papirbaserede og digitale systemer er langsomme, hvilket skaber frustration blandt læger og sygeplejersker. Direktionen kræver en hurtig modernisering for at sikre effektiv behandling."
    `,
    digDeeperLinks: [
      { label: "Elektronisk Patientjournal", text: "Overgangen til elektroniske patientjournaler øger både hastigheden og nøjagtigheden i patientbehandlingen." },
      { label: "Interoperabilitet", text: "Systemer skal kunne kommunikere med hinanden for at sikre en glidende patientrejse gennem hospitalet." }
    ],
    architectAdvice: `
      Arkitekten pointerer: "Den vigtigste handling her er at modernisere systemets kernefunktioner og sikre hurtig datatilgang. Uden en effektiv opgradering vil systemet fortsætte med at bremse klinikerne."
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Evaluer den nuværende ydeevne og brugertilfredshed med journalsystemet.",
        choiceA: {
          label: "Detaljeret performance-analyse",
          text: "+3 tid => +2 development (Giver et præcist billede af problemerne).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk (Risiko for at overse vigtige detaljer).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-support",
        stepDescription: "Implementer en ny softwareløsning med hurtig datatilgang.",
        choiceA: {
          label: "Omfattende systemopgradering",
          text: "+3 tid, -100 kr => +3 security og +2 development.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3, development: 2 } }
        },
        choiceB: {
          label: "Minimal opgradering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater systemdokumentationen og uddannelsesmaterialet for personalet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring dokumentation over",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Integration af Laboratorie Information System (LIMS)",
    shortDesc: "LIMS skal integreres med patientdata for at forbedre workflowet.",
    narrativeIntro: `
      "Der er behov for bedre integration mellem laboratoriets systemer og patientjournalerne, så testresultater hurtigt kan tilgås af klinikerne. Uden en god integration opstår der forsinkelser og fejl i behandlingen."
    `,
    digDeeperLinks: [
      { label: "LIMS Integration", text: "En tæt integration mellem LIMS og journalsystemet forbedrer datakvaliteten og patientforløbet." },
      { label: "Data Synkronisering", text: "Automatisk synkronisering minimerer risikoen for fejl og manglende data." }
    ],
    architectAdvice: `
      Arkitekten anbefaler: "En robust integrationsplatform er nøglen. Sørg for at datakvaliteten er høj, og at systemerne kommunikerer problemfrit."
    `,
    steps: [
      {
        location: "laboratorium",
        stepDescription: "Analyser de nuværende integrationsbehov mellem systemerne.",
        choiceA: {
          label: "Detaljeret behovsanalyse",
          text: "+3 tid => +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-support",
        stepDescription: "Implementer en middleware-løsning til dataudveksling.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -100 kr => +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal løsning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér integrationsprocessen og testresultater.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Optimering af IT-support for klinikker",
    shortDesc: "Forbedr responstiden og supportkvaliteten for de kliniske afdelinger.",
    narrativeIntro: `
      "Klinikkerne klager over lange ventetider og lav supportkvalitet, hvilket påvirker patientbehandlingen. Der skal implementeres nye procedurer og værktøjer for at øge supporteffektiviteten."
    `,
    digDeeperLinks: [
      { label: "IT Support Best Practices", text: "Effektive supportstrategier sikrer hurtigere respons og højere brugertilfredshed." },
      { label: "Ticketing Systems", text: "Moderne ticketing-systemer kan automatisere og optimere supportprocesserne." }
    ],
    architectAdvice: `
      Arkitekten anbefaler: "En dybdegående evaluering af de nuværende supportprocesser er essentiel. Investér i træning og nye værktøjer for at opnå hurtigere responstider."
    `,
    steps: [
      {
        location: "it-support",
        stepDescription: "Mål og evaluer de nuværende support-metrics.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Træn supportpersonalet og implementer et nyt ticketing-system.",
        choiceA: {
          label: "Omfattende træning",
          text: "+3 tid, -50 kr => +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 50, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Begrænset træning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye supportprocedurer.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Digitalisering af patientbooking",
    shortDesc: "Manuelle bookingsystemer fører til fejl og ineffektivitet.",
    narrativeIntro: `
      "Patientbookinger bliver håndteret manuelt, hvilket resulterer i dobbeltbookinger og forkerte tidsplaner. En digital løsning er nødvendig for at optimere flowet og reducere administrative fejl."
    `,
    digDeeperLinks: [
      { label: "Digital Booking Systems", text: "Automatiserede bookingsystemer øger præcisionen og sparer tid." },
      { label: "Patient Scheduling", text: "Effektive tidsplanlægningsværktøjer sikrer en bedre patientoplevelse." }
    ],
    architectAdvice: `
      Arkitekten siger: "En velintegreret digital bookingsløsning kan reducere administrative byrder og forbedre patientoplevelsen. Fokusér på integration med eksisterende systemer."
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg den nuværende bookingproces og identificer problemerne.",
        choiceA: {
          label: "Detaljeret procesanalyse",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-support",
        stepDescription: "Udvikl og implementer en digital bookingløsning.",
        choiceA: {
          label: "Omfattende udvikling",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal udvikling",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér den nye bookingsløsning og uddannelsesmateriale for personalet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Forbedring af driftsikkerhed i Operationsstuen",
    shortDesc: "Operationsstuen kræver pålidelig IT-support for kritiske procedurer.",
    narrativeIntro: `
      "Systemfejl i operationsstuen kan have livstruende konsekvenser. Der skal implementeres ekstra sikkerheds- og redundansforanstaltninger for at sikre kontinuerlig drift under operationer."
    `,
    digDeeperLinks: [
      { label: "Surgical IT Systems", text: "Høj driftsikkerhed er afgørende for operationsstuer." },
      { label: "Critical Infrastructure", text: "Redundans og backup-systemer minimerer risikoen for nedbrud." }
    ],
    architectAdvice: `
      Arkitekten understreger: "I operationsstuen er ingen fejl acceptable. Fokusér på redundans og hurtig fejlfinding for at sikre patienternes sikkerhed."
    `,
    steps: [
      {
        location: "operationsstue",
        stepDescription: "Audit af nuværende IT-systemer i operationsstuen.",
        choiceA: {
          label: "Detaljeret audit",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig audit",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementér redundante systemer og backup-løsninger.",
        choiceA: {
          label: "Fuld redundans",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Delvis redundans",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye procedurer og udfør tests.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Opdatering af Medicinsk Udstyrsregistrering",
    shortDesc: "Registreringssystemet for medicinsk udstyr er forældet og ineffektivt.",
    narrativeIntro: `
      "En nøjagtig registrering af medicinsk udstyr er afgørende for både vedligeholdelse og drift. Det nuværende system skaber fejl og unødvendige omkostninger."
    `,
    digDeeperLinks: [
      { label: "Asset Management", text: "Effektiv registrering af udstyr mindsker omkostninger og fejl." },
      { label: "Medical Equipment Tracking", text: "Moderne systemer kan spore udstyr i realtid." }
    ],
    architectAdvice: `
      Arkitekten anbefaler: "Moderniser udstyrsregistreringen med et digitalt system, så du altid har styr på, hvilket udstyr der er tilgængeligt, og hvornår vedligeholdelse er nødvendig."
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg det nuværende registreringssystem og identificer mangler.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-support",
        stepDescription: "Implementer et nyt digitalt registreringssystem.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -100 kr => +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater al dokumentation og uddannelsesmateriale.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Implementering af IoT Overvågning i Hospitalet",
    shortDesc: "IoT-enheder kan optimere overvågningen af kritisk udstyr og miljøforhold.",
    narrativeIntro: `
      "Med stigende krav til driftsstabilitet overvejes implementeringen af IoT-enheder, der kontinuerligt overvåger alt fra temperatur til udstyrsstatus i hele hospitalet."
    `,
    digDeeperLinks: [
      { label: "IoT in Healthcare", text: "IoT-teknologi kan skabe smartere, mere effektive hospitaler." },
      { label: "Smart Hospital", text: "Integration af IoT øger sikkerheden og effektiviteten i hospitalsdriften." }
    ],
    architectAdvice: `
      Arkitekten siger: "Implementer IoT i et pilotområde og udvid herefter, hvis resultaterne er positive. Vær særligt opmærksom på dataintegrationen."
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Vurder hvilke områder, der har størst behov for overvågning.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Installer IoT-sensorer i de udvalgte områder.",
        choiceA: {
          label: "Pilotinstallation",
          text: "+2 tid, -100 kr => +2 security.",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Begrænset installation",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér installation og opfølgningsprocedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Forbedring af Kommunikationsinfrastruktur",
    shortDesc: "Kommunikationssystemerne mellem afdelingerne skal moderniseres.",
    narrativeIntro: `
      "Interne kommunikationskanaler er fragmenterede, hvilket fører til misforståelser og forsinkelser i beslutningsprocessen. En samlet løsning kan effektivisere kommunikationen og øge patientbehandlingen."
    `,
    digDeeperLinks: [
      { label: "Unified Communications", text: "Sammenkædte kommunikationssystemer forbedrer samarbejdet." },
      { label: "Hospital Networking", text: "Moderne netværk sikrer hurtig og pålidelig kommunikation." }
    ],
    architectAdvice: `
      Arkitekten understreger: "En centraliseret kommunikationsplatform vil ikke kun forbedre intern kommunikation, men også øge sikkerheden ved at samle alle data på ét sted."
    `,
    steps: [
      {
        location: "it-support",
        stepDescription: "Audit af de nuværende kommunikationssystemer.",
        choiceA: {
          label: "Detaljeret audit",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer en unified communication platform.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -100 kr => +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Træn personalet og dokumentér de nye systemer.",
        choiceA: {
          label: "Omfattende træning og dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sikkerhedsopdatering for Patientdata",
    shortDesc: "Patientdata skal beskyttes bedre mod uautoriseret adgang.",
    narrativeIntro: `
      "Hospitalet har modtaget advarsler om, at de nuværende sikkerhedsforanstaltninger ikke er tilstrækkelige til at beskytte patientdata. Dette kan føre til alvorlige brud på fortroligheden."
    `,
    digDeeperLinks: [
      { label: "Data Security in Healthcare", text: "Sikker håndtering af patientdata er afgørende for at opretholde tilliden." },
      { label: "HIPAA Compliance", text: "Overholdelse af lovgivning sikrer en standardiseret datasikkerhed." }
    ],
    architectAdvice: `
      Arkitekten anbefaler: "Implementer kryptering og strammere adgangskontrol for at sikre, at patientdata ikke kan tilgås uautoriseret."
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Evaluer de nuværende sikkerhedsforanstaltninger for patientdata.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-sikkerhed",
        stepDescription: "Implementer kryptering og styrkede adgangskontroller.",
        choiceA: {
          label: "Fuld implementering",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Delvis implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater sikkerhedspolitikker og procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Effektivisering af Administrative IT-processer",
    shortDesc: "Manuelle processer skaber flaskehalse i den administrative drift.",
    narrativeIntro: `
      "Det administrative IT-miljø i hospitalet er præget af manuelle procedurer, der fører til fejl og ineffektivitet. Digitalisering og automatisering er nøglen til at spare tid og reducere omkostninger."
    `,
    digDeeperLinks: [
      { label: "Process Automation", text: "Automatisering af processer øger effektiviteten og reducerer fejl." },
      { label: "Digital Workflow", text: "Digitalisering af administrative opgaver skaber en mere strømlinet drift." }
    ],
    architectAdvice: `
      Arkitekten siger: "En grundig analyse af de administrative processer og en strategisk implementering af automatiseringsværktøjer kan frigive værdifuld tid og reducere fejl."
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg og identificér flaskehalse i de administrative processer.",
        choiceA: {
          label: "Detaljeret procesanalyse",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-support",
        stepDescription: "Implementer automatiseringsværktøjer til de mest tidskrævende processer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -100 kr, +3 development.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Delvis implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye digitale processer og træn personalet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
