window.cyberSecurityTasks = [

  {
    title: "Opdatering af adgangskontrol",
    shortDesc: "Hospitalets adgangskontrolsystem har gamle tilladelser og kræver en opdatering.",
    narrativeIntro: `
      "Systemadministratorerne opdager, at mange tidligere ansatte stadig har adgang til kritiske systemer.
       Risikoen for sikkerhedsbrud er høj, og direktionen kræver en løsning."
    `,
    digDeeperLinks: [
      { label: "Adgangskontrol - Best Practices", text: "Effektiv adgangsstyring forhindrer uautoriseret adgang og datalækage." },
      { label: "RBAC (Role-Based Access Control)", text: "Med RBAC kan adgangsrettigheder baseres på roller, ikke enkeltpersoner." }
    ],
    architectAdvice: `
      Arkitekten analyserer systemet og advarer:  
      "Den vigtigste handling i denne opgave er at revidere adgangsrettigheder 
       og fjerne forældede konti. Hvis dette overses, kan gamle medarbejdere stadig tilgå systemet."
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Gennemgå adgangsrettigheder for gamle brugere og roller.",
        choiceA: {
          label: "Fuld adgangsgennemgang",
          text: "+3 tid => +2 security (Sikrer, at kun relevante personer har adgang).",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Automatisk script-oprydning",
          text: "+1 tid => +1 security, +5% risk (Kan slette vigtige konti).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Indfør RBAC for at forhindre ukontrolleret adgang.",
        choiceA: {
          label: "Implementer RBAC med logning",
          text: "+2 tid, -50 kr => +2 security (Gør det lettere at styre adgang).",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Behold nuværende system",
          text: "+5% risk => synergyEffect:{ lackInfra:true } (Svært at spore adgangsændringer).",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater politikker for adgangskontrol og sikkerhed.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => Ingen ekstra risiko.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring dokumentation over",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "SIEM-logning og hændelsesovervågning",
    shortDesc: "Hospitalet har brug for bedre overvågning af sikkerhedshændelser.",
    narrativeIntro: `
      "En sikkerhedsanalyse afslører, at hospitalet ikke har et centralt system 
       til at opdage hackingforsøg. IT-afdelingen ønsker at implementere SIEM."
    `,
    digDeeperLinks: [
      { label: "SIEM Forklaring", text: "SIEM (Security Information and Event Management) samler logs og opdager trusler." },
      { label: "Brug af logs i cybersikkerhed", text: "Logning gør det muligt at spore og analysere mistænkelig aktivitet." }
    ],
    architectAdvice: `
      Arkitekten siger: "Den vigtigste handling her er at vælge det rigtige SIEM-system 
      og sikre, at logfiler bliver analyseret i realtid."
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Vælg og konfigurer et SIEM-system.",
        choiceA: {
          label: "Implementer et avanceret SIEM",
          text: "+3 tid, -100 kr => +3 security (Bedre hændelsesovervågning).",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Brug eksisterende logserver",
          text: "+1 tid => +1 security, +5% risk (Kan overse vigtige angreb).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt et dashboard for realtids-overvågning.",
        choiceA: {
          label: "Tilpasset dashboard",
          text: "+2 tid, -50 kr => +2 security (Lettere at opdage angreb).",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard dashboards",
          text: "+1 tid => +1 security, +5% risk (Begrænset visning).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér hændelseshåndtering og rapportering.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+2 tid => Ingen risiko.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring dokumentation over",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Firewall Konfiguration og Overvågning",
    shortDesc: "Hospitalets firewall-regler er forældede og kan potentielt tillade ondsindet trafik.",
    narrativeIntro: `
      "IT-sikkerhedsteamet har opdaget, at firewall'en ikke blokerer for visse indkommende forbindelser, hvilket øger risikoen for angreb."
    `,
    digDeeperLinks: [
      { label: "Firewall Best Practices", text: "Korrekt konfigurerede firewall-regler beskytter mod uautoriseret adgang." },
      { label: "Intrusion Prevention Systems", text: "IPS kan aktivt blokere mistænkelig trafik." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at revidere firewall-reglerne og implementere dynamisk trafikfiltrering for at sikre netværket.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Gennemgå eksisterende firewall-regler.",
        choiceA: {
          label: "Manuel revision",
          text: "+3 tid, -50 kr, +2 security.",
          applyEffect: { timeCost: 3, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Automatisk regelopdatering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer overvågning af firewall-logfiler.",
        choiceA: {
          label: "Opsæt avanceret logning",
          text: "+2 tid, -30 kr, +2 security.",
          applyEffect: { timeCost: 2, moneyCost: 30, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard logning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye firewall-regler og overvågningsprocedurer.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Undlad dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sikkerhed for Wi‑Fi netværk",
    shortDesc: "Det trådløse netværk er ikke segmenteret, hvilket kan føre til uautoriseret adgang.",
    narrativeIntro: `
      "IT-teamet har bemærket, at det trådløse netværk dækker hele hospitalet uden segmentering, hvilket udgør en sikkerhedsrisiko."
    `,
    digDeeperLinks: [
      { label: "Wi‑Fi Sikkerhed", text: "Sikring af trådløse netværk er afgørende for at beskytte mod uautoriseret adgang." },
      { label: "Netværkssegmentering", text: "Segmentering kan begrænse adgangen til kritiske systemer." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at segmentere Wi‑Fi-netværket og implementere WPA3‑kryptering for at styrke sikkerheden.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Evaluér det nuværende Wi‑Fi-netværk for sårbarheder.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Segmentér netværket og implementer WPA3‑kryptering.",
        choiceA: {
          label: "Implementer segmentering",
          text: "+2 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Behold nuværende struktur",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater sikkerhedspolitikker for Wi‑Fi.",
        choiceA: {
          label: "Opdater dokumentation",
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
    title: "Kryptering af data",
    shortDesc: "Kritiske patientdata er ikke krypteret, hvilket kan udgøre en risiko.",
    narrativeIntro: `
      "IT-afdelingen har opdaget, at data lagret i systemet ikke er krypteret. Dette kan føre til datatyveri ved et brud."
    `,
    digDeeperLinks: [
      { label: "Data Kryptering", text: "Kryptering beskytter data mod uautoriseret adgang." },
      { label: "AES Standard", text: "AES er en af de mest anvendte krypteringsstandarder." }
    ],
    architectAdvice: `
      Arkitekten understreger, at implementering af stærk kryptering er afgørende for at beskytte patientdata.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Identificér dataområder, der skal krypteres.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig identifikation",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer krypteringsløsninger.",
        choiceA: {
          label: "Brug AES‑256",
          text: "+3 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Brug standard kryptering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér krypteringsprocedurer og nøglerotation.",
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
    title: "Implementering af Multi‑Factor Authentication (MFA)",
    shortDesc: "Brugerkonti er sårbare, da de kun er beskyttet af et enkelt password.",
    narrativeIntro: `
      "IT-sikkerheden kræver en styrkelse af autentificeringsprocessen, da mange konti er udsat for brute-force angreb."
    `,
    digDeeperLinks: [
      { label: "MFA Fordele", text: "Multi‑Factor Authentication øger sikkerheden ved at tilføje et ekstra lag af beskyttelse." },
      { label: "Implementeringsguiden", text: "En trinvis guide til implementering af MFA i organisationer." }
    ],
    architectAdvice: `
      Arkitekten anbefaler omgående implementering af MFA for alle kritiske systemer for at forhindre uautoriseret adgang.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Vurder den nuværende autentificeringsmetode.",
        choiceA: {
          label: "Detaljeret vurdering",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer MFA-løsninger på alle kritiske systemer.",
        choiceA: {
          label: "Fuldt implementeret MFA",
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
        stepDescription: "Opdater politikker for autentificering.",
        choiceA: {
          label: "Detaljeret politik",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen ændringer",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sårbarhedsscanning og Patch Management",
    shortDesc: "Systemer scannes ikke regelmæssigt for sårbarheder, og patches bliver forsinket.",
    narrativeIntro: `
      "En intern revision afslører, at systemerne ikke opdateres regelmæssigt, hvilket øger risikoen for angreb."
    `,
    digDeeperLinks: [
      { label: "Patch Management", text: "Regelmæssig opdatering af systemer mindsker sårbarheder." },
      { label: "Sårbarhedsscanning", text: "Scanning hjælper med at identificere sikkerhedshuller i systemerne." }
    ],
    architectAdvice: `
      Arkitekten pointerer, at regelmæssige scanninger og hurtig patching er essentielle for at opretholde et sikkert miljø.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Udfør en sårbarhedsscanning af alle systemer.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer et automatiseret patch management system.",
        choiceA: {
          label: "Automatiseret patching",
          text: "+2 tid, -80 kr, +3 security.",
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Manuel patching",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér patching-processen og historik.",
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
    title: "Overvågning af netværkstrafik",
    shortDesc: "Mangel på overvågning kan skjule ondsindet aktivitet.",
    narrativeIntro: `
      "En gennemgang af netværkstrafikken afslører, at der ikke er etableret effektive overvågningsværktøjer, hvilket øger risikoen for uopdagede angreb."
    `,
    digDeeperLinks: [
      { label: "Netværksovervågning", text: "Kontinuerlig overvågning kan opdage anomalier og trusler i tide." },
      { label: "Anomalidetektion", text: "Avancerede værktøjer kan identificere uregelmæssig trafik." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at implementere et avanceret overvågningssystem, der konstant analyserer netværkstrafikken for at identificere potentielle trusler.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Implementer overvågningsværktøjer til netværkstrafik.",
        choiceA: {
          label: "Avanceret overvågning",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard overvågning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt alarmer for mistænkelig trafik.",
        choiceA: {
          label: "Detaljerede alarmer",
          text: "+2 tid, +2 security.",
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basale alarmer",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér overvågningsprocedurer og hændelsesrespons.",
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
    title: "Incident Response Plan",
    shortDesc: "Hospitalet mangler en effektiv plan for håndtering af sikkerhedshændelser.",
    narrativeIntro: `
      "En nylig hændelse afslørede, at der ikke findes en formel plan for, hvordan man skal reagere på sikkerhedsbrud, hvilket øger risikoen for langvarige nedbrud."
    `,
    digDeeperLinks: [
      { label: "Incident Response", text: "En veldefineret plan kan minimere skader ved sikkerhedshændelser." },
      { label: "Best Practices for IR", text: "Kend dine roller og procedurer ved et brud." }
    ],
    architectAdvice: `
      Arkitekten understreger, at en detaljeret incident response plan er afgørende for hurtig og effektiv krisehåndtering.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Udarbejd en grundig plan for incident response.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel plan",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Træn medarbejderne i krisehåndtering.",
        choiceA: {
          label: "Omfattende træning",
          text: "+2 tid, -50 kr, +3 security.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal træning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér planen og kommunikationsstrategien.",
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
    title: "Trusselsintelligens og Cyber Threat Hunting",
    shortDesc: "Hospitalet mangler proaktiv overvågning af trusselslandskabet.",
    narrativeIntro: `
      "IT-sikkerhedsteamet bemærker, at de udelukkende reagerer på hændelser, i stedet for at forudse dem. Proaktiv trusselsintelligens kan være nøglen til at forhindre angreb før de sker."
    `,
    digDeeperLinks: [
      { label: "Cyber Threat Hunting", text: "Aktiv søgning efter trusler kan identificere potentielle angreb før de manifesterer sig." },
      { label: "Trusselsintelligens", text: "Indsamling og analyse af data om trusler hjælper med at forudse angreb." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at etablere et dedikeret team til trusselsintelligens, der løbende analyserer trusselsdata og udarbejder handlingsplaner.
    `,
    steps: [
      {
        location: "it-sikkerhed",
        stepDescription: "Opsæt systemer til at indsamle trusselsdata.",
        choiceA: {
          label: "Avanceret opsætning",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basisopsætning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Analyser de indsamlede data for anomalier.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+2 tid, +2 security.",
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér jeres trusselsintelligens-procedurer og resultater.",
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
