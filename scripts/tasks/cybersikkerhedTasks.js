window.cybersikkerhedTasks = [
  {
    title: "Opdatering af Firewall Regler",
    shortDesc: "Nuværende firewall-regler er forældede og mangler korrekt segmentering.",
    narrativeIntro: `
      Hospitalets firewall beskytter ikke mod de nyeste trusler. En grundig revision af reglerne er nødvendig for at lukke sikkerhedshuller.
    `,
    glossaryTerms: ["Firewall", "Segmentering", "IDS", "Compliance"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Undersøg og kortlæg de eksisterende firewall-regler for at finde svage punkter.",
        choiceA: {
          label: "Grundig revision",
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
        location: "dokumentation",
        stepDescription: "Opdater firewall-politikker og dokumentér ændringerne grundigt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at de nye regler opfylder compliance-krav.",
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
    title: "Implementering af SIEM",
    shortDesc: "Hospitalet mangler et effektivt SIEM-system til logovervågning og trusselsdetektion.",
    narrativeIntro: `
      En omfattende gennemgang af logfiler viser, at systemet mangler evnen til at opdage og reagere på trusler i tide.
    `,
    glossaryTerms: ["SIEM", "Log Management", "Real-time Analysis"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og implementer et SIEM-system med avancerede alarmregler.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard SIEM",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer SIEM-systemet med netværksudstyr og servere.",
        choiceA: {
          label: "Omfattende integration",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opsætning og procedurer for SIEM-systemet.",
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
    title: "IDS-Opgradering",
    shortDesc: "Det nuværende IDS er forældet og skal opgraderes for bedre indtrængningsdetektion.",
    narrativeIntro: `
      Forældet IDS medfører, at uautoriserede adgangsforsøg ikke opdages i tide.
    `,
    glossaryTerms: ["IDS", "Intrusion Detection", "Overvågning"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Evaluer og vælg et moderne IDS-system.",
        choiceA: {
          label: "Avanceret IDS",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Basalt IDS",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer IDS-systemet med netværksudstyr for realtidsmonitorering.",
        choiceA: {
          label: "Fuldt integreret IDS",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér konfiguration og overvågningsprocedurer for IDS.",
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
    title: "Netværkssårbarhedsanalyse",
    shortDesc: "Identificér potentielle sårbarheder i hospitalets netværk.",
    narrativeIntro: `
      Der er tegn på skjulte netværkssårbarheder, der kan udnyttes af angribere. En detaljeret analyse er påkrævet.
    `,
    glossaryTerms: ["Sårbarhedsanalyse", "Penetrationstest", "Netværkssikkerhed"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Udfør en detaljeret scanning af netværkstrafikken for sårbarheder.",
        choiceA: {
          label: "Detaljeret scanning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér fund og udarbejd en handlingsplan.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre, at alle fund opfylder compliance-kravene.",
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
      }
    ]
  },
  {
    title: "Overvågning af Logfiler",
    shortDesc: "Forbedr overvågningen af systemlogfiler for tidlig opdagelse af trusler.",
    narrativeIntro: `
      Problemer i logovervågningen fører til, at sikkerhedstrusler ikke fanges rettidigt. En ny overvågningsløsning skal implementeres.
    `,
    glossaryTerms: ["Log Management", "Anomalidetektion", "Overvågning"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en løsning til kontinuerlig overvågning af logfiler.",
        choiceA: {
          label: "Avanceret overvågning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard overvågning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd detaljerede retningslinjer for loghåndtering.",
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
        location: "infrastruktur",
        stepDescription: "Integrer overvågningen med netværks- og serverudstyr for hurtig respons.",
        choiceA: {
          label: "Fuld integration",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      }
    ]
  },
  {
    title: "DDoS Beskyttelse",
    shortDesc: "Opgrader beskyttelsen mod DDoS-angreb for at sikre netværksstabilitet.",
    narrativeIntro: `
      Hospitalets netværk udsættes for hyppige DDoS-angreb, som kan lamme systemerne. En avanceret DDoS-beskyttelse er nødvendig.
    `,
    glossaryTerms: ["DDoS", "Load Balancing", "Netværkssikkerhed"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en avanceret DDoS-beskyttelsesløsning.",
        choiceA: {
          label: "Avanceret DDoS-beskyttelse",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader netværksudstyret, så det kan håndtere større trafikmængder.",
        choiceA: {
          label: "Opgradering af hardware",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen opgradering",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye sikkerhedsforanstaltninger og procedurer for DDoS-beskyttelse.",
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
    title: "Krypteringsopgradering",
    shortDesc: "Opgrader krypteringsprotokollerne for at beskytte følsomme data under transmission.",
    narrativeIntro: `
      Med forældede krypteringsmetoder er følsomme data udsat for aflytning. En opgradering er påkrævet for at sikre dataintegriteten.
    `,
    glossaryTerms: ["Encryption", "TLS/SSL", "Data Protection"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og implementer en opdateret krypteringsprotokol.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard kryptering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader netværksudstyret, så det understøtter den nye krypteringsprotokol.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
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
        stepDescription: "Dokumentér de nye krypteringsstandarder og procedurer for databeskyttelse.",
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
    title: "Multi-Factor Authentication Forbedring",
    shortDesc: "Forbedr sikkerheden ved at implementere en stærkere MFA-løsning for kritiske systemer.",
    narrativeIntro: `
      De nuværende MFA-metoder er for simple og gør systemerne sårbare for angreb. En opgradering kan styrke sikkerheden markant.
    `,
    glossaryTerms: ["MFA", "Two-Factor Authentication", "Access Control"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en avanceret MFA-løsning med flere godkendelsesmetoder.",
        choiceA: {
          label: "Avanceret MFA",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard MFA",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer MFA-løsningen med eksisterende systemer og netværk.",
        choiceA: {
          label: "Omfattende integration",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér implementeringen af den nye MFA-løsning.",
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
    title: "Sikkerhedsbevidsthedstræning",
    shortDesc: "Øg medarbejdernes sikkerhedsbevidsthed for at reducere interne risici.",
    narrativeIntro: `
      Medarbejderne mangler tilstrækkelig træning i at genkende phishing og andre angreb. En struktureret træningssession kan reducere interne trusler.
    `,
    glossaryTerms: ["Phishing", "Social Engineering", "Awareness Training"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Afhold en grundig træningssession i sikkerhedsbevidsthed.",
        choiceA: {
          label: "Omfattende træning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Kort session",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd og distribuer sikkerhedspolitikker og -procedurer til personalet.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort oversigt",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at træningsmaterialet er compliant med gældende regler.",
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
      }
    ]
  },
  {
    title: "Incident Response Plan",
    shortDesc: "Udarbejd en handlingsplan for hurtig reaktion på sikkerhedshændelser.",
    narrativeIntro: `
      Hospitalet mangler en struktureret plan for, hvordan man håndterer sikkerhedshændelser, hvilket kan forværre konsekvenserne af angreb.
    `,
    glossaryTerms: ["Incident Response", "Crisis Management", "Security Policy"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de kritiske elementer i en incident response plan.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en fuldstændig og detaljeret incident response plan.",
        choiceA: {
          label: "Omfattende plan",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort plan",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at planen er compliant med lovgivning og best practices.",
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
      }
    ]
  }
];
