// hospitalTasks.js

const hospitalTasks = [
  {
    title: "Nyt LIMS",
    shortDesc: "Implementer et nyt Laboratorie Informations Management System for at forbedre workflowet.",
    narrativeIntro: "Opdatering af LIMS vil optimere dataflow og reducere fejl i patientjournaler.",
    focus: "udvikling",
    riskProfile: 5,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser eksisterende system og patientjournaler for ineffektivitet.",
        stepContext: "Gennemgå patientdata for at identificere de vigtigste flaskehalse og datakvalitetsproblemer.",
        choiceA: {
          label: "Grundig analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret kravspecifikation for det nye system.",
        stepContext: "Beskriv de nødvendige funktioner og integration med eksisterende systemer.",
        choiceA: {
          label: "Detaljeret kravspecifikation",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort kravspecifikation",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Gennemgå it-juridiske krav og kontrakter for systemimplementeringen.",
        stepContext: "Sikre overholdelse af lovgivning og interne retningslinjer.",
        choiceA: {
          label: "Omfattende juridisk gennemgang",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basis juridisk gennemgang",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Opgradering af Patientdata System",
    shortDesc: "Forbedr dataintegration og brugergrænseflade for patientdata.",
    narrativeIntro: "En opgradering vil forbedre datakvaliteten og gøre systemet mere intuitivt for brugerne.",
    focus: "udvikling",
    riskProfile: 4,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de nuværende dataflows og identificer de primære svagheder.",
        stepContext: "Fokusér på brugergrænsefladen og dataintegrationen.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret rapport med anbefalinger til opgraderingen.",
        stepContext: "Identificer nøgleområder for forbedringer og integration.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Forhandle med leverandører om opgraderingsløsninger.",
        stepContext: "Sikre, at nye systemer kan implementeres inden for budget og tidsramme.",
        choiceA: {
          label: "Omfattende forhandling",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig forhandling",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Implementering af Elektroniske Journaler",
    shortDesc: "Overfør papirbaserede journaler til et digitalt system.",
    narrativeIntro: "Digitalisering af journaler vil modernisere hospitalets drift og forbedre datakvaliteten.",
    focus: "udvikling",
    riskProfile: 5,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser de eksisterende papirjournaler og identificer dataoverførselsbehov.",
        stepContext: "Fokuser på kritiske patientdata og informationsflow.",
        choiceA: {
          label: "Grundig analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en plan for digitalisering af journaler.",
        stepContext: "Planlæg hvordan data skal overføres og integreres.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Overfladisk plan",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Gennemgå lovkrav og it-juridiske forhold for digitalisering.",
        stepContext: "Sikre at systemet overholder gældende lovgivning.",
        choiceA: {
          label: "Omfattende juridisk gennemgang",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort juridisk gennemgang",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Opdatering af Laboratorie Software",
    shortDesc: "Forbedr funktionaliteten af det eksisterende laboratorie software.",
    narrativeIntro: "Opgraderingen skal gøre softwaren mere intuitiv og brugervenlig for laboratoriepersonalet.",
    focus: "udvikling",
    riskProfile: 4,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende software for fejl og mangler.",
        stepContext: "Identificer hovedproblemer og områder med potentiale for forbedring.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd et forslag til softwareforbedringer.",
        stepContext: "Fokuser på brugergrænseflade og funktionalitet.",
        choiceA: {
          label: "Omfattende forslag",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort forslag",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Koordinér med softwareleverandøren om opdateringerne.",
        stepContext: "Sikre, at opgraderingen kan implementeres effektivt og til en rimelig pris.",
        choiceA: {
          label: "Detaljeret koordinering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig koordinering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Udvikling af Patientportal",
    shortDesc: "Design og implementer en ny patientportal til bedre kommunikation.",
    narrativeIntro: "En ny portal vil forbedre adgangen til information og øge patienttilfredsheden.",
    focus: "udvikling",
    riskProfile: 5,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg nuværende kommunikationsflow mellem patienter og hospitalet.",
        stepContext: "Identificer flaskehalse og muligheder for digitalisering.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd et design for den nye patientportal.",
        stepContext: "Inkluder funktioner som booking, journalvisning og kommunikationsværktøjer.",
        choiceA: {
          label: "Detaljeret design",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Simpelt design",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Sikre overholdelse af databeskyttelseslovgivning i patientportalen.",
        stepContext: "Gennemgå GDPR og andre relevante regler.",
        choiceA: {
          label: "Omfattende juridisk vurdering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basis juridisk vurdering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Integration af EHR System",
    shortDesc: "Integrer et nyt Electronic Health Record system med eksisterende løsninger.",
    narrativeIntro: "Effektiv integration af EHR-systemet vil sikre bedre dataudveksling og klinisk beslutningstagning.",
    focus: "udvikling",
    riskProfile: 4,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de nuværende EHR-løsninger og identificer integrationsbehov.",
        stepContext: "Sørg for at inkludere både kliniske og administrative data.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en integrationsplan for EHR systemet.",
        stepContext: "Fokusér på dataintegration og workflowoptimering.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort plan",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Koordinér med leverandøren for at sikre en fejlfri integration.",
        stepContext: "Sikre at alle tekniske krav og standarder opfyldes.",
        choiceA: {
          label: "Omfattende koordinering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig koordinering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Opgradering af IT-Systemer",
    shortDesc: "Moderniser de eksisterende IT-systemer på hospitalet for bedre ydeevne.",
    narrativeIntro: "Opgraderinger vil øge systemernes effektivitet og bidrage til en mere moderne drift.",
    focus: "udvikling",
    riskProfile: 3,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser de nuværende IT-systemer for at identificere forbedringsmuligheder.",
        stepContext: "Fokuser på brugeroplevelse og dataintegration.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en opgraderingsplan for IT-systemerne.",
        stepContext: "Planlæg hvilke systemer der skal opgraderes, og hvordan integrationen skal foregå.",
        choiceA: {
          label: "Omfattende plan",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort plan",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Sikre, at systemopgraderingerne overholder juridiske krav.",
        stepContext: "Gennemgå kontrakter og lovgivning for at minimere risici.",
        choiceA: {
          label: "Omfattende juridisk vurdering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basis juridisk vurdering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Digitalisering af Administrationssystem",
    shortDesc: "Moderniser administrationssystemet for bedre effektivitet og databehandling.",
    narrativeIntro: "Digitalisering vil automatisere manuelle processer og reducere fejl i administrationen.",
    focus: "udvikling",
    riskProfile: 4,
    steps: [
      {
        location: "dokumentation",
        stepDescription: "Analyser de nuværende administrative processer.",
        stepContext: "Identificer ineffektive procedurer og manuelle flaskehalse.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Udarbejd en detaljeret digitaliseringsplan.",
        stepContext: "Fokuser på automatisering af manuelle processer og dataudveksling.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+4 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 4 } }
        },
        choiceB: {
          label: "Kort plan",
          text: "+2 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 2 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Forhandle med leverandører om de nye løsninger.",
        stepContext: "Sikre gode vilkår for implementering af de digitaliserede processer.",
        choiceA: {
          label: "Detaljeret forhandling",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig forhandling",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  }
];

