window.infrastrukturTasks = [
  {
    title: "Opgradering af Netværkskerne",
    shortDesc: "Det centrale netværksudstyr er forældet og skaber flaskehalse.",
    narrativeIntro: `
      Hospitalets netværkskerne er overbelastet, hvilket medfører langsom trafik og nedsat driftssikkerhed. En opgradering er nødvendig for at forbedre ydeevnen.
    `,
    glossaryTerms: ["Netværkskerne", "Switches", "Routere", "Load Balancer"],
    digDeeperLinks: [
      { 
        label: "Netværksopgradering", 
        text: "Moderne netværkskerner sikrer hurtig databehandling og øger driftssikkerheden ved at anvende high‑performance komponenter." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser den nuværende netværkskapacitet for at identificere flaskehalse.",
        stepContext: "En detaljeret kapacitetsanalyse kan afdække, hvor netværket bliver flaskehalset, og hvilke komponenter der skal opgraderes.",
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
        location: "leverandor",
        stepDescription: "Indhent tilbud på high-performance netværksudstyr.",
        stepContext: "Valget af nyt udstyr kan optimere kapaciteten og sikre en stabil drift, men kræver investering og planlægning.",
        choiceA: {
          label: "Avanceret udstyr",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisudstyr",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdiagrammer og udarbejd en ny driftsmanual.",
        stepContext: "Grundig dokumentation sikrer, at alle ændringer i netværket forstås og vedligeholdes korrekt af IT-personalet.",
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
    title: "Virtualisering af Servermiljø",
    shortDesc: "Fysiske servere begrænser effektiviteten – virtualisering optimerer ressourcerne.",
    narrativeIntro: `
      Hospitalets fysiske servere fylder for meget og er ineffektive. Ved at virtualisere kan flere systemer køre på færre maskiner, hvilket sparer plads og omkostninger.
    `,
    glossaryTerms: ["Virtualisering", "Hypervisor", "Resource Management"],
    digDeeperLinks: [
      { 
        label: "Virtualiseringsfordele", 
        text: "Virtualisering øger udnyttelsen af hardware, reducerer energiforbruget og giver fleksibilitet i systemadministrationen." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer hvilke servere, der er egnede til virtualisering.",
        stepContext: "En grundig evaluering kan identificere servere med lav udnyttelse, som kan virtualiseres for at spare ressourcer.",
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
        location: "leverandor",
        stepDescription: "Vælg virtualiseringssoftware og hardware, der understøtter konsolidering.",
        stepContext: "Det rigtige virtualiseringsværktøj kan samle flere servere på færre fysiske maskiner og øge driftsikkerheden.",
        choiceA: {
          label: "Avanceret løsning",
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
        stepDescription: "Opdater driftsmanualer og dokumentation for virtualiseringsmiljøet.",
        stepContext: "God dokumentation sikrer, at den nye løsning bliver korrekt implementeret og vedligeholdt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Implementering af Cloud-Løsninger",
    shortDesc: "Flytning af visse systemer til skyen for øget skalerbarhed.",
    narrativeIntro: `
      Hospitalet ønsker at migrere udvalgte systemer til skyen for bedre fleksibilitet og skalerbarhed. En hybrid cloud-løsning kan reducere omkostninger og forbedre tilgængeligheden.
    `,
    glossaryTerms: ["Cloud", "Hybrid Cloud", "SaaS", "IaaS"],
    digDeeperLinks: [
      { 
        label: "Cloud Integration", 
        text: "Cloud-løsninger tilbyder høj tilgængelighed og skalerbarhed, hvilket kan reducere behovet for fysisk infrastruktur." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér systemer, der egner sig til sky-migration.",
        stepContext: "En detaljeret analyse af systemkrav er afgørende for at afgøre, hvilke systemer der bedst kan køre i skyen.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Vælg en cloud-udbyder og planlæg en sikker migration.",
        stepContext: "Valget af den rigtige udbyder er centralt for at sikre stabil drift og datafortrolighed.",
        choiceA: {
          label: "Omfattende plan",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Grundlæggende plan",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret cloud-migrationsplan og opdater driftsprocedurer.",
        stepContext: "En klar plan sikrer, at systemer migreres uden afbrydelse, og at de nye processer kan vedligeholdes.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Opgradering af Kommunikationsinfrastruktur",
    shortDesc: "Forældede kommunikationssystemer skaber ineffektivitet i dataudvekslingen.",
    narrativeIntro: `
      Hospitalets interne og eksterne kommunikation lider under forældet udstyr. En opgradering er nødvendig for at sikre hurtig og pålidelig dataoverførsel.
    `,
    glossaryTerms: ["VoIP", "Kommunikationssystemer", "Netværk"],
    digDeeperLinks: [
      { 
        label: "Kommunikationsinfrastruktur", 
        text: "Opdaterede kommunikationssystemer benytter digitale protokoller og VoIP for hurtig dataudveksling og bedre driftssikkerhed." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer den nuværende kommunikationsinfrastruktur for flaskehalse.",
        stepContext: "En detaljeret evaluering kan afdække ineffektive systemer, som hindrer hurtig kommunikation.",
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
        location: "leverandor",
        stepDescription: "Indhent tilbud på nye kommunikationsløsninger med VoIP-teknologi.",
        stepContext: "Moderne VoIP-løsninger kan øge hastigheden og pålideligheden i kommunikationsnetværket.",
        choiceA: {
          label: "Avanceret løsning",
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
        stepDescription: "Opdater dokumentationen for de nye kommunikationssystemer.",
        stepContext: "Grundig dokumentation sikrer, at implementeringen af de nye systemer følges op og kan vedligeholdes.",
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
    title: "Modernisering af Data Center",
    shortDesc: "Flere spredte datacentre skaber ineffektiv drift.",
    narrativeIntro: `
      Ved at centralisere og modernisere datacentrene kan hospitalet opnå bedre ressourcestyring og driftssikkerhed.
    `,
    glossaryTerms: ["Data Center", "Centralisering", "Effektivitet"],
    digDeeperLinks: [
      { 
        label: "Data Center Konsolidering", 
        text: "Centralisering af datacentre reducerer redundans og øger effektiviteten, idet ressourcerne optimeres." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg placeringen og kapaciteten af de nuværende datacentre.",
        stepContext: "En detaljeret analyse kan identificere ineffektive og overlappende systemer, som bør centraliseres.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Planlæg en konsolideringsstrategi og indhent tilbud på centraliseringsløsninger.",
        stepContext: "En klar strategi kan minimere nedetid og optimere ressourcerne ved at samle datacentrene.",
        choiceA: {
          label: "Omfattende plan",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisplan",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen og beredskabsplanerne for det centraliserede datacenter.",
        stepContext: "Grundig dokumentation sikrer en glidende overgang og muliggør effektiv vedligeholdelse.",
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
    title: "Forbedring af WiFi-Dækning",
    shortDesc: "Ustabil WiFi-dækning påvirker både intern kommunikation og patientoplevelse.",
    narrativeIntro: `
      Hospitalet oplever dårligt signal og døde zoner, hvilket forringer den trådløse kommunikation. En opgradering af WiFi-infrastrukturen er nødvendig for at sikre stabil dækning.
    `,
    glossaryTerms: ["WiFi", "Mesh Network", "Signalstyrke"],
    digDeeperLinks: [
      { 
        label: "WiFi Forbedringer", 
        text: "Moderne mesh-netværk kan give en mere ensartet dækning og højere hastigheder end traditionelle WiFi-løsninger." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Mål signalstyrken og identificer døde zoner i det nuværende WiFi-netværk.",
        stepContext: "En detaljeret måling kan afsløre, hvor netværket skal opgraderes for at sikre bedre dækning.",
        choiceA: {
          label: "Detaljeret måling",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent tilbud på nye WiFi-adgangspunkter og implementér et mesh-netværk.",
        stepContext: "Det rigtige udstyr og en veludført implementering kan sikre en stabil og hurtig trådløs dækning.",
        choiceA: {
          label: "Omfattende løsning",
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
        stepDescription: "Opdater dokumentationen for den nye WiFi-konfiguration og vedligeholdelsesrutiner.",
        stepContext: "Grundig dokumentation sikrer, at den nye løsning bliver vedligeholdt korrekt og problemer hurtigt kan lokaliseres.",
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
    title: "Netværkssegmentering",
    shortDesc: "Manglende segmentering øger risikoen for spredning af angreb.",
    narrativeIntro: `
      Ved at opdele netværket i segmenter kan man isolere kritiske systemer og begrænse spredningen af et angreb. En omhyggelig VLAN-strategi er nødvendig.
    `,
    glossaryTerms: ["Segmentering", "VLAN", "Sikkerhedszone"],
    digDeeperLinks: [
      { 
        label: "Segmentering", 
        text: "Opdeling af netværket i isolerede zoner reducerer risikoen for, at et angreb spreder sig, hvis en del af netværket kompromitteres." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg den nuværende netværksarkitektur for at identificere muligheder for segmentering.",
        stepContext: "En detaljeret kortlægning kan afsløre, hvor netværket kan opdeles for at forbedre sikkerheden.",
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
        location: "leverandor",
        stepDescription: "Planlæg og implementer VLAN for at opdele netværket i sikkerhedszoner.",
        stepContext: "En korrekt implementeret VLAN-struktur kan isolere følsomme systemer og begrænse skader ved angreb.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisimplementering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér den nye segmenteringsplan og opdater netværksdiagrammer.",
        stepContext: "Grundig dokumentation sikrer, at segmenteringen implementeres korrekt og kan vedligeholdes i fremtiden.",
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
    title: "Installation af Fiberoptisk Forbindelse",
    shortDesc: "Fiberoptik øger båndbredden og stabiliteten i netværket.",
    narrativeIntro: `
      Hospitalet ønsker at opgradere til fiberoptisk netværk for at opnå højere hastigheder og en mere pålidelig forbindelse.
    `,
    glossaryTerms: ["Fiberoptik", "Båndbredde", "Højhastighedsnetværk"],
    digDeeperLinks: [
      { 
        label: "Fiberoptik", 
        text: "Fiberoptiske kabler tilbyder langt højere båndbredde og lavere latens end traditionelle kobberkabler, hvilket resulterer i en mere stabil og hurtig netværksforbindelse." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer de nuværende netværksforbindelser og identificer flaskehalse.",
        stepContext: "En detaljeret evaluering kan afsløre, hvor netværket skal opgraderes for at opnå bedre ydeevne.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent tilbud på fiberoptiske løsninger og planlæg implementeringen.",
        stepContext: "Det rigtige fiberudstyr kan øge netværkets hastighed og stabilitet betydeligt, men kræver en velovervejet implementeringsplan.",
        choiceA: {
          label: "Omfattende plan",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisplan",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdokumentationen med den nye fiberoptiske konfiguration.",
        stepContext: "Grundig dokumentation sikrer, at den nye infrastruktur kan vedligeholdes og fejl rettes hurtigt.",
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
    title: "Implementering af Load Balancer",
    shortDesc: "Load balancing fordeler trafikken og forhindrer overbelastning af enkelte servere.",
    narrativeIntro: `
      Under spidsbelastninger kan en enkelt server blive overbelastet. En load balancer sikrer, at trafikken fordeles jævnt, hvilket øger driftssikkerheden.
    `,
    glossaryTerms: ["Load Balancer", "Horizontal Scaling", "Trafikfordeling"],
    digDeeperLinks: [
      { 
        label: "Load Balancing", 
        text: "En korrekt implementeret load balancer fordeler netværkstrafikken, hvilket forhindrer overbelastning og øger den samlede driftssikkerhed." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en passende load balancing-løsning baseret på netværkets trafikbehov.",
        stepContext: "En detaljeret analyse af netværkstrafikken kan hjælpe med at bestemme den optimale løsning.",
        choiceA: {
          label: "Avanceret løsning",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis løsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdiagrammerne med den nye load balancing-konfiguration.",
        stepContext: "God dokumentation sikrer, at systemet kan vedligeholdes og fejl identificeres hurtigt.",
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
    title: "Installation af Fiberoptisk Forbindelse",
    shortDesc: "Fiberoptik øger hastigheden og stabiliteten i netværket.",
    narrativeIntro: `
      Hospitalet ønsker at opgradere til fiberoptiske forbindelser for at opnå højere hastigheder og en mere stabil netværksinfrastruktur.
    `,
    glossaryTerms: ["Fiberoptik", "Båndbredde", "Højhastighedsnetværk"],
    digDeeperLinks: [
      { 
        label: "Fiberoptiske Forbindelser", 
        text: "Fiberoptik tilbyder langt højere båndbredde og en mere pålidelig forbindelse end traditionelle kabler." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer de nuværende netværksforbindelser for at identificere flaskehalse.",
        stepContext: "En detaljeret evaluering kan afsløre, hvor netværket skal opgraderes for at øge hastigheden.",
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
        location: "leverandor",
        stepDescription: "Indhent tilbud på fiberoptiske løsninger og planlæg implementeringen.",
        stepContext: "Det rigtige udstyr og en veludført implementering kan markant øge netværkets ydeevne.",
        choiceA: {
          label: "Omfattende plan",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisplan",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdokumentationen med den nye fiberoptiske konfiguration.",
        stepContext: "Grundig dokumentation sikrer, at opgraderingen kan vedligeholdes og at eventuelle fejl hurtigt kan rettes.",
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
    title: "Optimering af IT-Driftscenter",
    shortDesc: "Modernisering af driftscentret kan forbedre systemets ydeevne og reaktionsevne.",
    narrativeIntro: `
      Det nuværende IT-driftscenter er forældet og ineffektivt. Ved at implementere moderne overvågnings- og styringsværktøjer kan driftssikkerheden og responsen forbedres markant.
    `,
    glossaryTerms: ["Driftscenter", "Monitoring", "IT Operations"],
    digDeeperLinks: [
      { 
        label: "IT-Driftscenter", 
        text: "Et moderne driftscenter benytter avancerede overvågningsværktøjer og automatiserede processer for at optimere systemdriften." 
      }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluér det nuværende driftscenter for flaskehalse og ineffektiviteter.",
        stepContext: "En detaljeret evaluering kan afsløre, hvor systemet halter, og hvor forbedringer kan implementeres.",
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
        location: "leverandor",
        stepDescription: "Planlæg og implementer opgraderinger med nye overvågningsværktøjer.",
        stepContext: "Moderne overvågningsværktøjer kan forbedre responstiden og driftssikkerheden, men kræver en velplanlagt integration.",
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
        location: "dokumentation",
        stepDescription: "Opdater driftsmanualer og dokumentation for de nye systemer.",
        stepContext: "Grundig dokumentation sikrer, at de nye processer følges og kan vedligeholdes korrekt.",
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
  }
];
