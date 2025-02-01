window.infrastrukturTasks = [

  {
    title: "Opgradering af serverinfrastruktur",
    shortDesc: "De gamle servere kæmper med ydeevne og kræver en modernisering.",
    narrativeIntro: `
      "IT-afdelingen konstaterer, at de nuværende servere ikke lever op til moderne krav, og hyppige nedbrud påvirker driften. Direktionen kræver en hurtig opgradering."
    `,
    digDeeperLinks: [
      { label: "Serveropgradering", text: "Modernisering af servere kan øge ydeevnen og forbedre driftssikkerheden." },
      { label: "Hardware Best Practices", text: "Vedligeholdelse og opgradering af hardware er afgørende for en stabil IT-infrastruktur." }
    ],
    architectAdvice: `
      Arkitekten understreger vigtigheden af at analysere den nuværende kapacitet, før en opgradering foretages. "En simpel udskiftning løser ikke de underliggende problemer – en grundig kapacitetstest er nødvendig." 
    `,
    steps: [
      {
        location: "datacenter",
        stepDescription: "Evaluer de eksisterende serveres kapacitet og belastning.",
        choiceA: {
          label: "Detaljeret kapacitetstest",
          text: "+3 tid => +2 development (Giver et præcist overblik).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig skøn",
          text: "+1 tid, +5% risk (Måske unøjagtig).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Vælg og køb den nye serverhardware.",
        choiceA: {
          label: "Køb topmoderne hardware",
          text: "+2 tid, -200 kr => +2 security og +2 development.",
          applyEffect: { timeCost: 2, moneyCost: 200, statChange: { security: 2, development: 2 } }
        },
        choiceB: {
          label: "Genbrug eksisterende komponenter",
          text: "+1 tid, +5% risk (Risiko for fejl i fremtiden).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for servermiljøet.",
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
    title: "Netværksoptimering og båndbreddeudvidelse",
    shortDesc: "Begrænset båndbredde fører til langsomme forbindelser og flaskehalse.",
    narrativeIntro: `
      "Brugerne oplever forsinkelser og tab af forbindelser, hvilket påvirker den daglige drift. IT-afdelingen skal optimere netværket og udvide båndbredden."
    `,
    digDeeperLinks: [
      { label: "Netværksoptimering", text: "Moderne netværksudstyr og korrekt segmentering kan øge ydeevnen markant." },
      { label: "Båndbreddeudvidelse", text: "Investering i højkapacitetsudstyr sikrer en stabil forbindelse." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en detaljeret trafikmonitorering for at identificere flaskehalse, hvorefter investering i moderne routere og switches er afgørende.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg den nuværende netværkstrafik og identificér flaskehalse.",
        choiceA: {
          label: "Detaljeret trafikmonitorering",
          text: "+3 tid => +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk kontrol",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opgrader netværksudstyret med moderne routere og switches.",
        choiceA: {
          label: "Investér i high-end udstyr",
          text: "+2 tid, -150 kr => +2 security.",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Fortsæt med nuværende udstyr",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdokumentationen med de nye konfigurationer.",
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
    title: "Datacenter Modernisering",
    shortDesc: "Datacenteret er forældet med højt energiforbrug og ineffektive kølesystemer.",
    narrativeIntro: `
      "Det eksisterende datacenter kæmper med driftsomkostninger og risiko for nedbrud på grund af forældet infrastruktur. Modernisering er nødvendig for at sikre stabiliteten."
    `,
    digDeeperLinks: [
      { label: "Datacenter Modernisering", text: "Opgradering af datacenteret kan reducere energiforbruget og forbedre driftsikkerheden." },
      { label: "Energieffektivitet", text: "Moderne kølesystemer og optimeret infrastruktur sparer energi og penge." }
    ],
    architectAdvice: `
      Arkitekten fremhæver, at en grundig energianalyse og investering i moderne kølesystemer er nøglen til at modernisere datacenteret.
    `,
    steps: [
      {
        location: "datacenter",
        stepDescription: "Vurder det nuværende energiforbrug og belastningen i datacenteret.",
        choiceA: {
          label: "Detaljeret energianalyse",
          text: "+3 tid => +2 stability.",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader kølesystemet med moderne teknologi.",
        choiceA: {
          label: "Installer avanceret kølesystem",
          text: "+2 tid, -200 kr => +3 stability.",
          applyEffect: { timeCost: 2, moneyCost: 200, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Brug eksisterende system",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater al dokumentation for datacenteret.",
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
    title: "Implementering af redundans i strømforsyningen",
    shortDesc: "Manglende redundans i strømforsyningen øger risikoen for nedbrud.",
    narrativeIntro: `
      "Strømforsyningen i IT-faciliteten er sårbar – et enkelt fejltrin kan forårsage omfattende nedbrud. Backup-systemer skal implementeres hurtigst muligt."
    `,
    digDeeperLinks: [
      { label: "UPS & Generatorer", text: "Redundante strømforsyningsløsninger sikrer kontinuerlig drift ved fejl." },
      { label: "Redundans", text: "Ved at implementere redundans minimeres risikoen for driftsstop." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at installere et avanceret UPS-system og en generator, så der altid er backup ved strømsvigt.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg strømforbruget og de eksisterende backup-løsninger.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid => +2 security.",
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
        stepDescription: "Installer UPS og generatorer til redundant strømforsyning.",
        choiceA: {
          label: "Investér i avanceret UPS",
          text: "+2 tid, -150 kr => +3 stability.",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Brug standard UPS",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér backup- og redundansprocedurer.",
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
    title: "Virtualisering af IT-miljøet",
    shortDesc: "Fysisk infrastruktur skal virtualiseres for bedre udnyttelse af ressourcer.",
    narrativeIntro: `
      "Med stigende belastning og omkostninger vurderes det, at virtualisering af servere og applikationer kan optimere ressourcerne og øge fleksibiliteten."
    `,
    digDeeperLinks: [
      { label: "Virtualisering", text: "Virtualisering kan reducere omkostninger og forbedre driftsfleksibiliteten." },
      { label: "Cloud Integration", text: "En hybrid løsning kan kombinere lokal infrastruktur med skybaserede ressourcer." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en gradvis overgang til virtualisering for at minimere risikoen for nedetid og optimere ydeevnen.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vurder det nuværende fysiske IT-miljø.",
        choiceA: {
          label: "Detaljeret miljøanalyse",
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
        location: "infrastruktur",
        stepDescription: "Udarbejd en virtualiseringsstrategi.",
        choiceA: {
          label: "Omfattende planlægning",
          text: "+2 tid, -50 kr => +3 development.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig planlægning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér virtualiseringsprocessen.",
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
    title: "Opgradering af netværksudstyr",
    shortDesc: "Forældet udstyr forhindrer en optimal netværksydelse.",
    narrativeIntro: `
      "Det eksisterende netværksudstyr kan ikke håndtere den stigende trafik, hvilket medfører flaskehalse og ustabilitet. En opgradering er nødvendig."
    `,
    digDeeperLinks: [
      { label: "Moderne Netværksudstyr", text: "Investering i moderne switches og routere kan forbedre hastighed og stabilitet." },
      { label: "Hardwareopgradering", text: "Opgradering af nøglenheder er ofte den mest effektive løsning." }
    ],
    architectAdvice: `
      Arkitekten pointerer, at en investering i high-end netværksudstyr er en langsigtet løsning, der kan reducere driftsomkostninger og forbedre sikkerheden.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluér det nuværende netværksudstyr.",
        choiceA: {
          label: "Detaljeret evaluering",
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
        stepDescription: "Køb nyt netværksudstyr.",
        choiceA: {
          label: "Invester i high-end udstyr",
          text: "+2 tid, -150 kr => +3 security.",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Vælg budgetudstyr",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for netværksudstyret.",
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
    title: "Optimering af kabelføring og fysisk infrastruktur",
    shortDesc: "Rettet kabelføring kan minimere interferens og forbedre driftssikkerheden.",
    narrativeIntro: `
      "Det fysiske IT-miljø er rodet, og gamle kabler skaber potentielle interferensproblemer. En omstrukturering er nødvendig for at sikre optimal drift."
    `,
    digDeeperLinks: [
      { label: "Kabelføring", text: "Korrekt kabelføring reducerer interferens og letter vedligeholdelsen." },
      { label: "Datacenter Best Practices", text: "Et organiseret serverrum øger både ydeevnen og sikkerheden." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuldstændig reorganisation af kabelføringen for at opnå bedre ydeevne og driftssikkerhed.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Inspektion af den eksisterende kabelføring.",
        choiceA: {
          label: "Detaljeret inspektion",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig inspektion",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Planlæg en omstrukturering af kabelføringen.",
        choiceA: {
          label: "Omfattende planlægning",
          text: "+2 tid, -50 kr => +2 development.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig planlægning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen med den nye kabelføring.",
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
    title: "Implementering af skybaserede løsninger",
    shortDesc: "Integration af skyen kan øge fleksibiliteten og reducere omkostninger.",
    narrativeIntro: `
      "Med stigende krav til skalerbarhed overvejer IT-afdelingen at flytte dele af infrastrukturen til skyen for at opnå bedre fleksibilitet og omkostningseffektivitet."
    `,
    digDeeperLinks: [
      { label: "Cloud Computing", text: "Skybaserede løsninger kan reducere kapitaludgifter og øge skalerbarheden." },
      { label: "Hybrid Cloud", text: "En hybrid model kombinerer fordelene ved lokal infrastruktur og skyen." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en hybrid løsning, hvor kun de systemer, der bedst egner sig til skyen, migreres, mens kritiske systemer forbliver on-premise.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér systemer, der kan migreres til skyen.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Udvælg en skyudbyder og planlæg migreringen.",
        choiceA: {
          label: "Omfattende planlægning",
          text: "+2 tid, -100 kr => +3 development.",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér skystrategien og migreringsplanen.",
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
    title: "Fejlfinding og vedligeholdelse af infrastruktur",
    shortDesc: "Regelmæssig vedligeholdelse er afgørende for at undgå nedbrud.",
    narrativeIntro: `
      "Periodiske fejl i den fysiske infrastruktur skaber risiko for nedbrud. En systematisk vedligeholdelsesplan er nødvendig for at sikre kontinuerlig drift."
    `,
    digDeeperLinks: [
      { label: "Preventivt Vedligehold", text: "Regelmæssig vedligeholdelse forhindrer større fejl og nedbrud." },
      { label: "Fejlfindingsteknikker", text: "Tidlig detektion af fejl kan spare omkostninger og tid." }
    ],
    architectAdvice: `
      Arkitekten understreger, at en systematisk vedligeholdelsesplan med periodiske kontroller kan minimere risikoen for nedbrud.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Planlæg og implementer en vedligeholdelsesplan.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+3 tid, +2 stability.",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig plan",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-sikkerhed",
        stepDescription: "Implementer fejldiagnostiske værktøjer.",
        choiceA: {
          label: "Avanceret værktøj",
          text: "+2 tid, -50 kr, +2 stability.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Standard værktøj",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for vedligeholdelsesprocedurer.",
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
    title: "Energioptimering i datacenteret",
    shortDesc: "Højt energiforbrug øger driftsomkostninger og miljøpåvirkning.",
    narrativeIntro: `
      "Det nuværende datacenter lider af ineffektive kølesystemer og højt energiforbrug, hvilket både øger omkostninger og miljøpåvirkningen."
    `,
    digDeeperLinks: [
      { label: "Energioptimering", text: "Optimering af energiforbruget kan reducere driftsomkostningerne betydeligt." },
      { label: "Green IT", text: "Bæredygtige løsninger er essentielle for moderne datacentre." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at investere i energieffektive systemer og opgradere kølesystemet for at reducere energiforbruget og omkostningerne.
    `,
    steps: [
      {
        location: "datacenter",
        stepDescription: "Analyser energiforbruget i datacenteret.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 tid, +2 stability.",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader kølesystemet med energieffektive løsninger.",
        choiceA: {
          label: "Moderne kølesystem",
          text: "+2 tid, -100 kr, +3 stability.",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Behold eksisterende system",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de implementerede energibesparende tiltag.",
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
  }

];
