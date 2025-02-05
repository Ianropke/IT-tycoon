window.infrastrukturTasks = [
  {
    title: "Opgradering af Netværkskerne",
    shortDesc: "Det centrale netværksudstyr er forældet og skaber flaskehalse.",
    narrativeIntro: `
      "Hospitalets netværkskerne er overbelastet og fører til langsom trafik. En opgradering er nødvendig for at øge netværkets kapacitet og robusthed."
    `,
    glossaryTerms: ["Netværkskerne", "WAN", "Load Balancer"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser den nuværende netværkskapacitet og identificer flaskehalse.",
        choiceA: {
          label: "Detaljeret kapacitetsanalyse",
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
        stepDescription: "Opgrader de centrale netværkskomponenter (switches, routere) med high‑performance udstyr.",
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
        location: "dokumentation",
        stepDescription: "Dokumentér de nye netværksprocedurer og opdater netværksdiagrammer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Virtualisering af Servermiljø",
    shortDesc: "Fysiske servere belaster datacentret – virtualisering kan frigøre ressourcer.",
    narrativeIntro: `
      "Hospitalets fysiske servere er dyre i drift og kræver fornyelse. Virtualisering kan konsolidere ressourcer og forbedre driftssikkerheden."
    `,
    glossaryTerms: ["Virtualisering", "Hypervisor", "Resource Management"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluér hvilke servere der egner sig til virtualisering.",
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
        stepDescription: "Implementér virtualiseringssoftware og migrér udvalgte servere.",
        choiceA: {
          label: "Omfattende migration",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Faseopdelt migration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentation for servermigrering og nye driftsprocedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Cloud-Integration",
    shortDesc: "Visse systemer skal flyttes til skyen for bedre skalerbarhed.",
    narrativeIntro: `
      "Hospitalet ønsker at flytte dele af IT-infrastrukturen til skyen for at opnå højere skalerbarhed og fleksibilitet."
    `,
    glossaryTerms: ["Cloud", "Hybrid Cloud", "Integration"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg hvilke systemer, der er egnede til cloud-migrering.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer en hybrid cloud-løsning med sikre forbindelser.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Delvis implementering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér cloud-arkitekturen og integration med eksisterende systemer.",
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
    title: "Netværksovervågning og Fejldetektion",
    shortDesc: "Forbedr overvågningen af netværkstrafikken for at opdage problemer tidligt.",
    narrativeIntro: `
      "Overvågning af netværkstrafik er essentiel for at opdage potentielle fejl og angreb. Et avanceret overvågningssystem kan sikre en stabil drift."
    `,
    glossaryTerms: ["Overvågning", "Fejldetektion", "SNMP"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Implementer et overvågningssystem, der monitorerer netværkstrafik.",
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
        location: "infrastruktur",
        stepDescription: "Integrer overvågningen med eksisterende netværksudstyr.",
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
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en overvågningsmanual og procedurer for netværksfejlfinding.",
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
    title: "Failover og Redundans",
    shortDesc: "Implementér failover-systemer for at sikre kontinuerlig drift ved hardwarefejl.",
    narrativeIntro: `
      "Et robust failover-system er afgørende for at forhindre nedbrud, hvis der opstår hardwarefejl. En effektiv redundansløsning skal implementeres."
    `,
    glossaryTerms: ["Failover", "Redundans", "Høj Tilgængelighed"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér kritiske komponenter og planlæg redundans.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig plan",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer redundans via failover-servere og alternative netværksforbindelser.",
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
        stepDescription: "Dokumentér failover-procedurer og test dem regelmæssigt.",
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
    title: "Load Balancing",
    shortDesc: "Forbedr netværkets ydelse ved at implementere load balancing.",
    narrativeIntro: `
      "En enkelt server kan blive overbelastet under spidsbelastning. Load balancing kan fordele trafikken og forbedre systemets respons."
    `,
    glossaryTerms: ["Load Balancer", "Horizontal Scaling", "Network Traffic"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en load balancing-løsning, der kan fordele trafikken optimalt.",
        choiceA: {
          label: "Avanceret load balancing",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis load balancing",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer load balancing med eksisterende netværksinfrastruktur.",
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
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér den nye load balancing-løsning og procedurer for vedligeholdelse.",
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
    title: "Netværksinfrastruktur Audit",
    shortDesc: "Gennemfør en omfattende audit af netværkets infrastruktur for at identificere svagheder.",
    narrativeIntro: `
      "En audit af netværket kan afsløre fejl og potentielle sikkerhedsrisici. Resultaterne danner grundlag for forbedringer."
    `,
    glossaryTerms: ["Audit", "Compliance", "Network Security"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret audit af alle netværkskomponenter.",
        choiceA: {
          label: "Detaljeret audit",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Overfladisk audit",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport med fund og anbefalinger.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre, at auditresultaterne overholder alle compliance-krav.",
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
    title: "Data Center Konsolidering",
    shortDesc: "Flere spredte datacentre skaber ineffektivitet. Konsolidering kan reducere driftsomkostninger.",
    narrativeIntro: `
      "Ved at samle datacentrene kan hospitalet opnå bedre ressourceudnyttelse og øge netværkets effektivitet."
    `,
    glossaryTerms: ["Data Center", "Konsolidering", "Virtualisering"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg nuværende datacentres placering og kapacitet.",
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
        location: "infrastruktur",
        stepDescription: "Planlæg konsolidering og migrering til et centraliseret datacenter.",
        choiceA: {
          label: "Omfattende plan",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisplan",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér konsolideringsplanen og uddan personalet i nye procedurer.",
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
    title: "Optimering af WiFi-Netværk",
    shortDesc: "Dårligt WiFi kan påvirke både patientkommunikation og interne processer.",
    narrativeIntro: `
      "Hospitalets WiFi-netværk er ustabilt, hvilket skaber frustration og nedsætter effektiviteten i både kliniske og administrative afdelinger."
    `,
    glossaryTerms: ["WiFi", "Trådløst netværk", "Signalstyrke"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Mål signalstyrken og identificér døde zoner i WiFi-netværket.",
        choiceA: {
          label: "Detaljeret måling",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk test",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader adgangspunkter og konfigurer et mesh-netværk for bedre dækning.",
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
        location: "dokumentation",
        stepDescription: "Udarbejd en guide til vedligeholdelse og fejlfinding af WiFi-netværket.",
        choiceA: {
          label: "Omfattende guide",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort guide",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af Netværkssegmentering",
    shortDesc: "Mangel på segmentering øger risikoen for spredning af angreb.",
    narrativeIntro: `
      "En ensartet netværksstruktur gør det nemmere for trusler at sprede sig. Ved at segmentere netværket kan hospitalet begrænse angreb og forbedre sikkerheden."
    `,
    glossaryTerms: ["Segmentering", "VLAN", "Sikkerhedszone"],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg nuværende netværksarkitektur og identificer segmenteringsmuligheder.",
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
        stepDescription: "Implementer VLAN og opret separate sikkerhedszone for kritiske systemer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisopdeling",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér segmenteringsplanen og opdater netværksdiagrammerne.",
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
  }
];
