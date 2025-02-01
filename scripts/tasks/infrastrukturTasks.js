window.infrastrukturTasks = [

  {
    title: "Opgradering af Netværksinfrastruktur",
    shortDesc: "Forældet netværksudstyr begrænser hastigheden og stabiliteten.",
    narrativeIntro: `
      "IT-afdelingen konstaterer, at de nuværende routere og switches ikke lever op til kravene i et moderne netværk, hvilket fører til flaskehalse og ustabilitet."
    `,
    digDeeperLinks: [
      { label: "Netværksoptimering", text: "Opgradering af netværksudstyret kan forbedre hastigheden og sikre en mere stabil forbindelse." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en komplet udskiftning af det forældede udstyr med moderne enheder for at sikre optimal netværksydelse.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluér den nuværende netværkshastighed og identificér flaskehalse.",
        choiceA: { label: "Detaljeret netværksanalyse", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "leverandor",
        stepDescription: "Investér i moderne routere og switches.",
        choiceA: { label: "Køb high-end udstyr", text: "+2 tid, -150 kr, +3 security.", applyEffect: { timeCost: 2, moneyCost: 150, statChange: { security: 3 } } },
        choiceB: { label: "Genbrug eksisterende udstyr", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdokumentationen.",
        choiceA: { label: "Omfattende dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Spring dokumentation over", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Modernisering af Serverpark",
    shortDesc: "Gamle servere fører til lav ydeevne og hyppige nedbrud.",
    narrativeIntro: `
      "Serverparken er forældet og kan ikke følge med de stigende krav i en moderne it-drift. En modernisering er nødvendig for at sikre driftssikkerheden."
    `,
    digDeeperLinks: [
      { label: "Server Modernisering", text: "En modernisering af serverparken kan øge ydeevnen og reducere nedetid." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld udskiftning af de ældre servere med nyere, mere effektive modeller.
    `,
    steps: [
      {
        location: "datacenter",
        stepDescription: "Udfør en kapacitetstest på de nuværende servere.",
        choiceA: { label: "Detaljeret kapacitetstest", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig test", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "infrastruktur",
        stepDescription: "Planlæg og køb nye servere.",
        choiceA: { label: "Omfattende planlægning", text: "+3 tid, -200 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 200, statChange: { security: 3 } } },
        choiceB: { label: "Hurtig beslutning", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for serverparken.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Optimering af Datacenter Drift",
    shortDesc: "Ineffektiv drift i datacenteret skaber nedbrud og høje omkostninger.",
    narrativeIntro: `
      "Datacenteret lider af ineffektiv drift, hvilket fører til højt energiforbrug og ustabilitet. Der kræves optimering for at forbedre driftsikkerheden."
    `,
    digDeeperLinks: [
      { label: "Datacenter Optimering", text: "En optimering af datacenterdriften kan reducere omkostninger og øge stabiliteten." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en gennemgribende optimering af processerne i datacenteret for at minimere nedbrud og spare energi.
    `,
    steps: [
      {
        location: "datacenter",
        stepDescription: "Udfør en detaljeret analyse af datacenterets drift.",
        choiceA: { label: "Detaljeret driftanalyse", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer optimeringsmuligheder (fx bedre kølesystemer og energistyring).",
        choiceA: { label: "Omfattende optimering", text: "+3 tid, -150 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } } },
        choiceB: { label: "Minimal optimering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for driftsoptimering.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Forbedring af Redundans i Infrastruktur",
    shortDesc: "Manglende redundans gør infrastrukturen sårbar over for nedbrud.",
    narrativeIntro: `
      "Der er identificeret en mangel på redundans i kritiske systemer, hvilket øger risikoen for driftsnedbrud."
    `,
    digDeeperLinks: [
      { label: "Redundans", text: "Implementering af redundans sikrer, at systemer fortsætter med at køre ved fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at opbygge redundante systemer og backup-løsninger for at øge driftssikkerheden.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Gennemfør en detaljeret analyse af den nuværende redundans.",
        choiceA: { label: "Detaljeret analyse", text: "+3 tid, +2 security.", applyEffect: { timeCost: 3, statChange: { security: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "leverandor",
        stepDescription: "Implementer redundante systemer og backup-løsninger.",
        choiceA: { label: "Omfattende implementering", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Delvis implementering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér redundansprocedurerne.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Implementering af Cloud Integration",
    shortDesc: "Cloud-løsninger kan øge fleksibiliteten og reducere omkostninger.",
    narrativeIntro: `
      "Infrastrukturen har potentiale til at integrere cloud-teknologi, hvilket kan optimere ressourcernes udnyttelse og reducere kapitaludgifter."
    `,
    digDeeperLinks: [
      { label: "Cloud Integration", text: "En hybrid cloud-strategi kombinerer fordelene ved lokal infrastruktur og skyen." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en gradvis implementering af cloud-løsninger, hvor ikke-kritiske systemer migreres til skyen.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér systemer, der egner sig til cloud-migrering.",
        choiceA: { label: "Detaljeret analyse", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "it-jura",
        stepDescription: "Planlæg og implementer cloud integration for udvalgte systemer.",
        choiceA: { label: "Omfattende implementering", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Delvis implementering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér cloud-integrationsstrategien.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Opgradering af Kabelføring",
    shortDesc: "Uorganiseret kabelføring skaber interferens og øger fejlrisikoen.",
    narrativeIntro: `
      "Den fysiske kabelføring i datacenteret er rodet og ineffektiv, hvilket forårsager signalforringelse og vedligeholdelsesproblemer."
    `,
    digDeeperLinks: [
      { label: "Kabelføring", text: "Korrekt organiseret kabelføring reducerer interferens og letter vedligeholdelsen." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en komplet omstrukturering af kabelføringen for at optimere ydeevnen og lette vedligeholdelsen.
    `,
    steps: [
      {
        location: "leverandor",
        stepDescription: "Inspicér den nuværende kabelføring og identificér problemerne.",
        choiceA: { label: "Detaljeret inspektion", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig inspektion", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "infrastruktur",
        stepDescription: "Planlæg og implementer en ny kabelføringsstruktur.",
        choiceA: { label: "Omfattende planlægning", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Hurtig løsning", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for den nye kabelføring.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Energieffektivisering af Infrastruktur",
    shortDesc: "Højt energiforbrug øger omkostninger og belastningen på systemerne.",
    narrativeIntro: `
      "Højt energiforbrug i it-infrastrukturen fører til høje driftsomkostninger og miljømæssige udfordringer. Energieffektivisering er afgørende."
    `,
    digDeeperLinks: [
      { label: "Energieffektivitet", text: "Implementering af energieffektive løsninger kan reducere omkostninger og forbedre systemets levetid." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at implementere moderne, energieffektive teknologier og optimere driftsprocesserne.
    `,
    steps: [
      {
        location: "it-jura",
        stepDescription: "Udfør en detaljeret energianalyse af infrastrukturen.",
        choiceA: { label: "Detaljeret energianalyse", text: "+3 tid, +2 stability.", applyEffect: { timeCost: 3, statChange: { stability: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer energieffektive løsninger (fx LED-belysning, optimeret køling).",
        choiceA: { label: "Omfattende implementering", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Minimal implementering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for de nye energieffektive tiltag.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Implementering af Virtualisering",
    shortDesc: "Virtualisering optimerer udnyttelsen af hardware og reducerer omkostninger.",
    narrativeIntro: `
      "Overgangen til virtualisering kan optimere ressourceudnyttelsen og forenkle administrationen af infrastrukturen."
    `,
    digDeeperLinks: [
      { label: "Virtualisering", text: "Virtualisering muliggør bedre udnyttelse af hardware og øger fleksibiliteten." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en gradvis implementering af virtualisering, så overgangen sker med minimal nedetid.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg den nuværende fysiske hardware og udnyttelsesgraden.",
        choiceA: { label: "Detaljeret analyse", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "datacenter",
        stepDescription: "Implementer virtualiseringssoftware og migrér systemer.",
        choiceA: { label: "Omfattende implementering", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Delvis implementering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér virtualiseringsprocessen.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Sikkerhedsopdatering af Infrastrukturudstyr",
    shortDesc: "Opdatering af firmware og software på infrastrukturkomponenter er nødvendig.",
    narrativeIntro: `
      "Mange infrastrukturelementer kører på forældet firmware, hvilket kan udnyttes af angribere. En regelmæssig opdatering er nødvendig for at øge sikkerheden."
    `,
    digDeeperLinks: [
      { label: "Firmware Update", text: "Opdatering af firmware sikrer, at systemerne er beskyttede mod kendte sårbarheder." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en systematisk opdatering af firmware og software på alle infrastrukturkomponenter.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér udstyr med forældet firmware.",
        choiceA: { label: "Detaljeret evaluering", text: "+3 tid, +2 security.", applyEffect: { timeCost: 3, statChange: { security: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "leverandor",
        stepDescription: "Udfør firmware- og softwareopdateringer.",
        choiceA: { label: "Omfattende patching", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Hurtig opdatering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opdateringsprocessen.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  },

  {
    title: "Digitalisering af Infrastrukturvedligeholdelse",
    shortDesc: "Manuelle vedligeholdelsesprocesser skaber ineffektivitet og fejl.",
    narrativeIntro: `
      "Manuelle vedligeholdelsesprocedurer fører til fejl og høje omkostninger. Digitalisering kan optimere processerne og øge driftssikkerheden."
    `,
    digDeeperLinks: [
      { label: "Process Automation", text: "Digitalisering af vedligeholdelse reducerer fejl og sparer tid." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld digitalisering af vedligeholdelsesprocedurerne for at sikre en mere effektiv drift.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg nuværende vedligeholdelsesprocedurer.",
        choiceA: { label: "Detaljeret analyse", text: "+3 tid, +2 development.", applyEffect: { timeCost: 3, statChange: { development: 2 } } },
        choiceB: { label: "Hurtig evaluering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "leverandor",
        stepDescription: "Implementer et digitalt vedligeholdelsessystem.",
        choiceA: { label: "Omfattende implementering", text: "+3 tid, -100 kr, +3 security.", applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } } },
        choiceB: { label: "Minimal implementering", text: "+1 tid, +5% risk.", applyEffect: { timeCost: 1, riskyPlus: 0.05 } }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér det nye system og træn vedligeholdelsesteamet.",
        choiceA: { label: "Detaljeret dokumentation", text: "+2 tid.", applyEffect: { timeCost: 2 } },
        choiceB: { label: "Ingen dokumentation", text: "+5% risk.", applyEffect: { riskyPlus: 0.05 } }
      }
    ]
  }
];
