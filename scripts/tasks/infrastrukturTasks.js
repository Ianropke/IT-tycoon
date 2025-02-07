window.infrastrukturTasks = [
  {
    title: "Opgradering af Netværkskerne",
    shortDesc: "Det centrale netværksudstyr er forældet og skaber flaskehalse.",
    narrativeIntro: `
      "Hospitalets netværkskerne er overbelastet, hvilket medfører langsom trafik og nedsat driftssikkerhed. En opgradering er nødvendig for at øge kapaciteten og stabiliteten."
    `,
    glossaryTerms: ["Netværkskerne", "WAN", "Load Balancer"],
    digDeeperLinks: [
      { label: "Moderne Netværksløsninger", text: "Læs om, hvordan moderne netværkskerner optimerer trafikken og forbedrer driftssikkerheden." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser den nuværende kapacitet og identificer flaskehalse i netværkskernen.",
        stepContext: "En detaljeret kapacitetsanalyse kan afsløre, hvor netværket flaskehalses, og hvilke komponenter der skal opgraderes.",
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
        stepDescription: "Opgrader netværksudstyret (switches, routere) med high‑performance komponenter.",
        stepContext: "En opgradering af udstyret sikrer bedre behandling af datatrafik og højere driftssikkerhed, men kan kræve længere implementeringstid.",
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
        stepDescription: "Opdater netværksdiagrammer og udarbejd en ny driftsmanual for den opgraderede kerne.",
        stepContext: "God dokumentation er nøglen til at sikre, at alle ændringer forstås og vedligeholdes korrekt.",
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
    shortDesc: "Fysiske servere belaster datacentret – virtualisering kan øge effektiviteten.",
    narrativeIntro: `
      "Hospitalets fysiske servere bruger for meget plads og energi. Ved at virtualisere kan ressourcerne udnyttes mere effektivt, og driftssikkerheden forbedres."
    `,
    glossaryTerms: ["Virtualisering", "Hypervisor", "Resource Management"],
    digDeeperLinks: [
      { label: "Virtualisering Benefits", text: "Læs om, hvordan virtualisering kan spare plads og omkostninger." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér hvilke servere, der egner sig til virtualisering.",
        stepContext: "En grundig evaluering af serverkapaciteten kan bestemme, hvilke fysiske maskiner der kan konsolideres.",
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
        stepDescription: "Implementer virtualiseringssoftware og migrér de udvalgte servere.",
        stepContext: "En fuld virtualisering kan optimere driften, men kræver nøje planlægning og test.",
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
        stepDescription: "Opdater dokumentationen for det nye virtuelle miljø og driftsprocedurer.",
        stepContext: "Detaljeret dokumentation sikrer, at virtualiseringen fungerer gnidningsfrit, og at systemet kan vedligeholdes.",
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
    title: "Cloud-Integration",
    shortDesc: "Flytning af visse systemer til skyen for bedre skalerbarhed.",
    narrativeIntro: `
      "Hospitalet ønsker at udnytte skyteknologi til at øge fleksibiliteten og skalerbarheden. En hybrid cloud-løsning kan optimere driften, hvis den implementeres korrekt."
    `,
    glossaryTerms: ["Cloud", "Hybrid Cloud", "Integration"],
    digDeeperLinks: [
      { label: "Cloud Integration", text: "Læs om fordelene ved hybrid cloud og integration med eksisterende systemer." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér hvilke systemer, der kan migreres til skyen.",
        stepContext: "En detaljeret analyse af de nuværende systemer kan hjælpe med at afgøre, hvilke løsninger der bedst egner sig til skyen.",
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
        stepDescription: "Implementer en hybrid cloud-løsning med sikre forbindelser (fx VPN).",
        stepContext: "En sikker og robust cloud-løsning kræver en omhyggelig implementering af forbindelserne.",
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
        stepDescription: "Dokumentér arkitekturen for cloud-integrationen og procedurerne for dataoverførsel.",
        stepContext: "Grundig dokumentation er vigtig for at sikre, at migreringen sker uden fejl og at systemet er let at vedligeholde.",
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
    title: "Netværksmonitorering",
    shortDesc: "Forbedr overvågningen af netværkstrafikken for at sikre en stabil drift.",
    narrativeIntro: `
      "En avanceret netværksmonitorering kan identificere flaskehalse og problemer, før de påvirker driften. Implementeringen af et nyt overvågningssystem er nødvendig."
    `,
    glossaryTerms: ["Monitorering", "SNMP", "Driftssikkerhed"],
    digDeeperLinks: [
      { label: "Netværksmonitorering", text: "Læs om, hvordan overvågning af netværkstrafik kan forebygge nedbrud." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Implementer et overvågningssystem til at monitorere netværkstrafikken i realtid.",
        stepContext: "Et detaljeret overvågningssystem kan advare om potentielle problemer, før de eskalerer.",
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
        stepDescription: "Udarbejd en manual for netværksmonitorering og fejlfinding.",
        stepContext: "Dokumentation hjælper med hurtig respons og vedligeholdelse, når der opstår problemer.",
        choiceA: {
          label: "Omfattende manual",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort manual",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Integrer overvågningssystemet med sikkerhedsløsninger for tidlig advarsel.",
        stepContext: "Sikker integration sikrer, at overvågningsdata bliver brugt til at forebygge angreb.",
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
    title: "Load Balancing Implementering",
    shortDesc: "Forbedr netværkets ydelse ved at implementere load balancing.",
    narrativeIntro: `
      "En enkelt server kan blive overbelastet under spidsbelastning. Load balancing kan fordele trafikken og sikre en mere stabil drift."
    `,
    glossaryTerms: ["Load Balancer", "Horizontal Scaling", "Netværkstrafik"],
    digDeeperLinks: [
      { label: "Load Balancing", text: "Lær, hvordan load balancing fordeler trafikken og forhindrer overbelastning." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en load balancing-løsning, der optimerer trafikken.",
        stepContext: "En detaljeret evaluering af netværkstrafikken kan bestemme, hvilken load balancing-teknologi der passer bedst.",
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
        stepDescription: "Integrer load balancing med den eksisterende netværksinfrastruktur.",
        stepContext: "En god integration sikrer, at systemet kan håndtere spidsbelastninger uden at blive overbelastet.",
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
        stepDescription: "Dokumentér load balancing-opsætningen og vedligeholdelsesprocedurer.",
        stepContext: "Omfattende dokumentation sikrer, at systemet nemt kan vedligeholdes og fejlfinding sker hurtigt.",
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
    title: "Data Center Konsolidering",
    shortDesc: "Flere spredte datacentre skaber ineffektivitet og øgede omkostninger.",
    narrativeIntro: `
      "Ved at konsolidere datacentrene kan hospitalet opnå bedre ressourceudnyttelse og forbedre driftssikkerheden. En centralisering kræver dog nøje planlægning."
    `,
    glossaryTerms: ["Data Center", "Konsolidering", "Virtualisering"],
    digDeeperLinks: [
      { label: "Centralisering", text: "Læs om, hvordan centralisering af datacentre kan reducere omkostninger og øge effektiviteten." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg placeringen og kapaciteten af de nuværende datacentre.",
        stepContext: "En detaljeret analyse er nødvendig for at identificere redundans og ineffektivitet i de nuværende datacentre.",
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
        stepDescription: "Planlæg en konsolideringsstrategi for at samle datacentrene.",
        stepContext: "En klar plan sikrer en effektiv migration og reducerer driftskompleksiteten.",
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
        stepDescription: "Dokumentér konsolideringsplanen og opdater driftsmanualer.",
        stepContext: "Grundig dokumentation er afgørende for en vellykket konsolidering og fremtidig vedligeholdelse.",
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
    title: "Forbedring af WiFi-Netværk",
    shortDesc: "Et ustabilt WiFi-netværk påvirker både patientkommunikation og interne processer.",
    narrativeIntro: `
      "Hospitalets trådløse netværk oplever døde zoner og dårlig signalstyrke. En opgradering af WiFi-adgangspunkter og konfiguration af et mesh-netværk kan øge netværkets effektivitet."
    `,
    glossaryTerms: ["WiFi", "Mesh Network", "Trådløst"],
    digDeeperLinks: [
      { label: "WiFi Forbedringer", text: "Lær om moderne teknologier, der forbedrer trådløs dækning og hastighed." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Mål signalstyrken og identificér døde zoner i det nuværende WiFi-netværk.",
        stepContext: "En detaljeret måling kan hjælpe med at lokalisere problemer og bestemme, hvor opgraderinger er nødvendige.",
        choiceA: {
          label: "Detaljeret måling",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader WiFi-adgangspunkter og implementér et mesh-netværk.",
        stepContext: "Et moderne mesh-netværk kan sikre en mere ensartet dækning og bedre båndbredde.",
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
        stepDescription: "Dokumentér den nye WiFi-konfiguration og vedligeholdelsesrutiner.",
        stepContext: "Grundig dokumentation sikrer, at netværket vedligeholdes korrekt og problemer hurtigt kan identificeres.",
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
    title: "Netværkssegmentering",
    shortDesc: "Mangel på segmentering øger risikoen for, at angreb spredes i hele netværket.",
    narrativeIntro: `
      "Ved at opdele netværket i segmenter kan man begrænse spredningen af angreb og øge sikkerheden. Dette kræver en omhyggelig planlægning af VLAN og sikkerhedszoner."
    `,
    glossaryTerms: ["Segmentering", "VLAN", "Sikkerhedszone"],
    digDeeperLinks: [
      { label: "Netværkssegmentering", text: "Læs om, hvordan segmentering kan beskytte mod spredning af angreb." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg den nuværende netværksarkitektur for at identificere muligheder for segmentering.",
        stepContext: "En detaljeret kortlægning kan afsløre, hvor netværket er sårbart, og hvordan det kan opdeles for bedre sikkerhed.",
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
        stepDescription: "Implementer VLAN for at opdele netværket i sikkerhedszoner.",
        stepContext: "Opdeling via VLAN kan isolere kritiske systemer og forhindre, at en enkelt kompromittering spreder sig.",
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
        stepDescription: "Dokumentér den nye segmenteringsplan og opdater netværksdiagrammerne.",
        stepContext: "Grundig dokumentation er nødvendig for at sikre, at segmenteringen implementeres korrekt og vedligeholdes over tid.",
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
    title: "Implementering af Backup og Redundans",
    shortDesc: "Sikring af systemdriften via backup og redundans er afgørende for kontinuitet.",
    narrativeIntro: `
      "For at forhindre nedbrud skal systemerne have en solid backup- og redundansplan. Dette reducerer risikoen for tab af data og nedetid ved hardwarefejl."
    `,
    glossaryTerms: ["Backup", "Redundans", "Failover"],
    digDeeperLinks: [
      { label: "Backup Strategier", text: "Lær om moderne backup- og redundansstrategier for at sikre kontinuerlig drift." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificer kritiske systemer, der kræver backup og redundans.",
        stepContext: "En detaljeret analyse kan afgøre, hvilke systemer der skal have prioritet, når det kommer til backup.",
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
        stepDescription: "Implementer automatiserede backup-løsninger og redundans på kritiske systemer.",
        stepContext: "Automatisering af backup sikrer, at data bliver gemt korrekt, mens redundans sikrer fortsat drift ved fejl.",
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
        stepDescription: "Dokumentér backup- og redundansprocedurer og uddan personalet i deres anvendelse.",
        stepContext: "Omfattende dokumentation sikrer, at procedurerne følges, og at systemet hurtigt kan gendannes ved nedbrud.",
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
    title: "Opgradering af Kommunikationsinfrastruktur",
    shortDesc: "Effektiv kommunikation er essentiel for hospitalets drift.",
    narrativeIntro: `
      "Forældede kommunikationssystemer skaber flaskehalse og forsinkelser. En opgradering kan øge hastigheden og pålideligheden i dataudvekslingen."
    `,
    glossaryTerms: ["Kommunikationsinfrastruktur", "VoIP", "Netværk"],
    digDeeperLinks: [
      { label: "Moderne Kommunikationsløsninger", text: "Lær om, hvordan opdaterede kommunikationssystemer kan forbedre intern og ekstern kommunikation." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer den nuværende kommunikationsinfrastruktur for ineffektiviteter.",
        stepContext: "En detaljeret evaluering kan identificere flaskehalse i dataudvekslingen, som kan hæmme både patientbehandling og interne processer.",
        choiceA: {
          label: "Detaljeret evaluering",
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
        stepDescription: "Implementer en opgradering med nye kommunikationsprotokoller og VoIP-teknologi.",
        stepContext: "En ny løsning kan reducere ventetider og forbedre dataflowet, men kræver tilpasning af eksisterende systemer.",
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
        stepDescription: "Dokumentér de nye kommunikationsprocedurer og træn personalet i den opgraderede teknologi.",
        stepContext: "Grundig dokumentation sikrer, at den nye infrastruktur anvendes korrekt og effektivt.",
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
