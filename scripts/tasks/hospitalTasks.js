window.hospitalTasks = [
  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Nuværende patientjournal er langsom og ineffektiv.",
    narrativeIntro: `
      Hospitalet kæmper med en forældet EPJ, der ofte fejler ved spidsbelastning. En modernisering er nødvendig for at forbedre patientbehandlingen og informationsflowet.
    `,
    glossaryTerms: ["Patientjournal", "EPJ", "Integration"],
    digDeeperLinks: [
      { label: "EPJ Best Practices", text: "Moderne EPJ-løsninger sikrer hurtig adgang til patientdata og optimerer arbejdsgange." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende patientjournal for ineffektivitet og fejl.",
        stepContext: "En dybdegående analyse kan afsløre flaskehalse og forældede processer, der hindrer effektiv behandling.",
        choiceA: {
          label: "Detaljeret systemgennemgang",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader servere og netværk for at forbedre systemets ydeevne.",
        stepContext: "Opgradering af infrastrukturen sikrer, at systemet kan køre hurtigere og mere stabilt under belastning.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+2 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Minimal opgradering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen og brugervejledninger for det nye system.",
        stepContext: "Grundig dokumentation sikrer, at personalet hurtigt kan sætte sig ind i de nye processer og systemer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Integration af LIMS og Patientdata",
    shortDesc: "Lab-systemet og patientjournalen er adskilte.",
    narrativeIntro: `
      Fejl i dataoverførslen mellem laboratoriet og patientjournalen fører til forkerte testresultater. Integration kan sikre korrekt og rettidig dataudveksling.
    `,
    glossaryTerms: ["LIMS", "EPJ", "Integration", "Kliniske data"],
    digDeeperLinks: [
      { label: "Integrationseksempler", text: "Se, hvordan en tæt integration mellem LIMS og EPJ kan reducere fejl i patientdata." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de nuværende datamodeller for at identificere uoverensstemmelser.",
        stepContext: "En detaljeret kortlægning kan afsløre uensartede datafelter, der forårsager fejl i overførslen.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at den nye integrationsløsning overholder GDPR og patientlovgivning.",
        stepContext: "Compliance er afgørende for at beskytte patientdata og undgå juridiske problemer.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret integrationsplan med dataflow-diagrammer.",
        stepContext: "En klar plan sikrer, at integrationen implementeres korrekt og effektivt.",
        choiceA: {
          label: "Omfattende plan",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Grundlæggende plan",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      }
    ]
  },
  {
    title: "Digital Booking for Akutmodtagelsen",
    shortDesc: "Papirbaseret booking skaber forvirring og forsinkelser.",
    narrativeIntro: `
      Akutmodtagelsen oplever lange ventetider på grund af manuelle bookingprocesser. Digitalisering kan automatisere og optimere processen.
    `,
    glossaryTerms: ["Booking", "Triage", "Digitalisering"],
    digDeeperLinks: [
      { label: "Digital Booking", text: "Digitalisering af bookingprocesser kan reducere ventetider og forbedre patientflowet." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den manuelle bookingproces for at identificere flaskehalse.",
        stepContext: "En detaljeret analyse kan afsløre, hvilke dele af processen der forårsager de længste ventetider.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt bookingsystem med automatisering.",
        stepContext: "Et digitalt system kan automatisere bookingprocessen og reducere fejl, men kræver en robust infrastruktur.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre, at det digitale bookingsystem er beskyttet mod uautoriseret adgang.",
        stepContext: "En stærk sikkerhed forhindrer datalæk og misbrug af systemet.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen særlig sikring",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek, at bookingsystemet overholder GDPR og patientdata-regler.",
        stepContext: "Compliance sikrer, at patientdata behandles korrekt og sikkert i det nye system.",
        choiceA: {
          label: "Fuld compliance-check",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Telemedicin til Kroniske Patienter",
    shortDesc: "Fjernmonitorering kan reducere antallet af unødvendige besøg.",
    narrativeIntro: `
      Telemedicin giver mulighed for fjernopfølgning, men kræver sikre kommunikationskanaler og klare procedurer.
    `,
    glossaryTerms: ["Telemedicin", "Remote Monitoring", "Compliance"],
    digDeeperLinks: [
      { label: "Telemedicin Løsninger", text: "Moderne telemedicin-systemer kombinerer sikker kommunikation med effektiv patientopfølgning." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de patienter, der er egnede til telemedicin.",
        stepContext: "En grundig patientanalyse sikrer, at kun de mest egnede patienter vælges til fjernmonitorering.",
        choiceA: {
          label: "Grundig patientanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en sikker telemedicinsk platform med kryptering.",
        stepContext: "En robust platform med kryptering beskytter patientdata under fjernmonitorering.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard platform",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt den nødvendige serverkapacitet til at håndtere telemedicinsk data.",
        stepContext: "En opgradering af infrastrukturen sikrer, at data behandles effektivt uden forsinkelser.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Faseopdelt opsætning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér retningslinjer og procedurer for telemedicin.",
        stepContext: "Grundig dokumentation sikrer, at den nye løsning anvendes korrekt og effektivt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
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
      Papirordinationer kan skabe forvirring og føre til alvorlige fejl i medicindoseringen. En digital løsning kan øge nøjagtigheden.
    `,
    glossaryTerms: ["Ordination", "Digitalisering", "Patientdata"],
    digDeeperLinks: [
      { label: "Digital Ordination", text: "Se, hvordan en digital ordinationsløsning kan eliminere fejl og forbedre patientbehandlingen." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende ordinationsproces for at identificere fejl og flaskehalse.",
        stepContext: "En detaljeret analyse kan afdække, hvor den manuelle proces fejler, og hvad der skal digitaliseres.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt ordinationssystem med automatiske kontroller.",
        stepContext: "En robust digital løsning kan eliminere fejl, men kræver en vis integration med eksisterende systemer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd procedurer for den nye digitale ordination og træn personalet.",
        stepContext: "Grundig dokumentation og oplæring sikrer en glidende overgang og minimal fejlrate.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at systemet overholder GDPR og andre lovkrav for patientdata.",
        stepContext: "Compliance er afgørende for at beskytte patientdata og undgå juridiske problemer.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Effektivisering af Administrative IT-processer",
    shortDesc: "Manuelle processer skaber fejl og spild af tid i administrationen.",
    narrativeIntro: `
      Administrationen er ineffektiv og rodet, hvilket fører til fejl og spild af ressourcer. Digitalisering kan optimere processerne, men kræver en klar plan og dokumentation.
    `,
    glossaryTerms: ["Administration", "Digitalisering", "Workflow"],
    digDeeperLinks: [
      { label: "Effektive Processer", text: "Moderne digitale systemer kan strømline administrative opgaver og reducere fejl." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de mest tidskrævende manuelle processer i administrationen.",
        stepContext: "En detaljeret analyse kan identificere ineffektive arbejdsgange, der bremser processen.",
        choiceA: {
          label: "Grundig procesanalyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Implementer et digitalt sagsbehandlingssystem for at automatisere processerne.",
        stepContext: "Et effektivt system kan spare tid og reducere fejl, men skal tilpasses hospitalets workflow.",
        choiceA: {
          label: "Omfattende system",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre, at systemet overholder alle relevante love og regler.",
        stepContext: "Compliance-check er nødvendig for at undgå juridiske problemer, men kan tage ekstra tid.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye processer og uddan admin-personalet i systemet.",
        stepContext: "Omfattende dokumentation sikrer en glidende overgang og korrekt anvendelse af det nye system.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af IT-support for Kliniske Afdelinger",
    shortDesc: "Utilstrækkelig IT-support øger ventetider og forringer patientbehandlingen.",
    narrativeIntro: `
      Kliniske afdelinger oplever lang ventetid og ineffektiv support, hvilket påvirker patientflowet negativt. En ny IT-support strategi kan øge effektiviteten.
    `,
    glossaryTerms: ["IT-support", "Service Level Agreement", "Brugeroplevelse"],
    digDeeperLinks: [
      { label: "Support Strategier", text: "Moderne IT-supportsystemer kan reducere ventetider og forbedre den samlede drift." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål nuværende responstid og evaluér kvaliteten af IT-support.",
        stepContext: "En grundig evaluering kan identificere, hvor supporten svigter, og hvilke forbedringer der er nødvendige.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt supportsystem med automatisering og realtidsmonitorering.",
        stepContext: "Et effektivt supportsystem kan reducere responstiden og forbedre systemdriften, men kræver integration med eksisterende IT.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre, at supportsystemet har robust adgangskontrol til beskyttelse af følsomme data.",
        stepContext: "En sikker adgangskontrol mindsker risikoen for datalæk og sikrer, at kun autoriserede personer får adgang.",
        choiceA: {
          label: "Avanceret adgangskontrol",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard adgangskontrol",
          text: "+0 sikkerhed, -1 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 0 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at supportsystemet overholder GDPR og interne politikker.",
        stepContext: "Compliance er afgørende for at sikre, at supporten håndterer data korrekt og undgår juridiske problemer.",
        choiceA: {
          label: "Omhyggeligt lovtjek",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen tjek",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye supportsystemer og uddan personalet i deres anvendelse.",
        stepContext: "Grundig dokumentation sikrer, at supportsystemet anvendes korrekt og effektivt, hvilket reducerer fejl og ventetider.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
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
      Kliniske systemer lider under langsom ydeevne og hyppige nedetider. En modernisering af infrastrukturen er nødvendig for at sikre en stabil drift.
    `,
    glossaryTerms: ["Klinisk IT", "Hardware", "Netværk"],
    digDeeperLinks: [
      { label: "Moderne Infrastruktur", text: "Opdateret hardware og netværk kan reducere nedetid og øge systemets ydeevne." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de største flaskehalse i de kliniske systemer.",
        stepContext: "En detaljeret analyse kan afsløre, hvor systemerne halter, og hvilke opgraderinger der er nødvendige.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader netværksudstyr og servere til moderne standarder.",
        stepContext: "En opgradering af infrastrukturen kan øge systemets kapacitet og driftssikkerhed, men kræver investering og omhyggelig planlægning.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisopgradering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer opdaterede sikkerhedsforanstaltninger for at beskytte de nye systemer.",
        stepContext: "Sikkerhedsforanstaltninger som opdaterede firewalls og IDS skal følge med infrastrukturændringerne for maksimal beskyttelse.",
        choiceA: {
          label: "Avancerede sikkerhedsforanstaltninger",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard sikkerhed",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye systemer og opdater driftsmanualer.",
        stepContext: "Grundig dokumentation sikrer, at de nye systemer vedligeholdes korrekt og kan fejlfinding udføres effektivt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Administrativ Forbedring af Patientindlæggelser",
    shortDesc: "Manuelle processer skaber unødvendige forsinkelser ved patientindlæggelser.",
    narrativeIntro: `
      Patientindlæggelser er ineffektive pga. manuelle procedurer. Digitalisering kan optimere processerne og reducere ventetiden.
    `,
    glossaryTerms: ["Indlæggelse", "Digitalisering", "Workflow"],
    digDeeperLinks: [
      { label: "Digital Indlæggelse", text: "Digitalisering af indlæggelsesprocessen kan reducere ventetider og forbedre patientflowet." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg den nuværende indlæggelsesprocedure for at identificere flaskehalse.",
        stepContext: "En detaljeret gennemgang kan afsløre, hvor ineffektiviteten opstår, og hvilke processer der skal automatiseres.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt system for automatisering af patientindlæggelser.",
        stepContext: "Et digitalt system kan strømligne processen og reducere fejl, men kræver integration med eksisterende systemer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre at det digitale system beskytter patientdata mod uautoriseret adgang.",
        stepContext: "Et sikkert system er nødvendigt for at beskytte følsomme patientdata, især ved digital indlæggelse.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Standard sikkerhed",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at den digitale løsning overholder GDPR og andre patientdata-regler.",
        stepContext: "Compliance er kritisk for at undgå juridiske problemer og sikre, at patientdata håndteres korrekt.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
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
      Papirordinationer fører ofte til forvirring og alvorlige fejl i medicindosering. Digitalisering kan øge nøjagtigheden og sikkerheden.
    `,
    glossaryTerms: ["Ordination", "Digitalisering", "Patientdata"],
    digDeeperLinks: [
      { label: "Digital Ordination", text: "En digital løsning eliminerer fejl og sikrer, at medicinen ordineres korrekt." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende ordinationsproces for at identificere fejl og ineffektivitet.",
        stepContext: "En detaljeret analyse kan afdække, hvor fejl opstår, og hvilke processer der skal digitaliseres.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et digitalt ordinationssystem med automatiske kontroller.",
        stepContext: "En robust digital løsning kan reducere fejl, men kræver integration med eksisterende systemer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd procedurer for den nye digitale ordination og træn personalet.",
        stepContext: "Grundig dokumentation sikrer en glidende overgang og minimal fejlrate i ordinationsprocessen.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at den digitale ordinationsløsning overholder GDPR og andre relevante regler.",
        stepContext: "Compliance-check er afgørende for at beskytte patientdata og undgå juridiske problemer.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  }
];
