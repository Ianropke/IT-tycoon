window.hospitalTasks = [

  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Det nuværende journalsystem er forældet og ineffektivt.",
    narrativeIntro: `
      "Patientjournalerne skaber flaskehalse og fejl i behandlingen. En opgradering er nødvendig for at sikre hurtig og nøjagtig adgang til patientdata."
    `,
    digDeeperLinks: [
      { label: "Elektronisk Patientjournal", text: "Overgangen til et digitalt journalsystem kan forbedre behandlingen og reducere fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en komplet opgradering af journalsystemet med fokus på hastighed og dataintegritet.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende ydeevne og fejlrate i journalsystemet.",
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
        location: "hospital",
        stepDescription: "Implementer et nyt, digitalt journalsystem.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal implementering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Opdater dokumentationen og uddannelsesmaterialet for det nye system.",
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
    title: "Integration af LIMS med Patientdata",
    shortDesc: "Manglende integration mellem laboratoriets LIMS og patientdata skaber fejl.",
    narrativeIntro: `
      "Fejl i dataudvekslingen mellem LIMS og patientjournaler fører til forsinkelser i behandlingen. En effektiv integration er nødvendig."
    `,
    digDeeperLinks: [
      { label: "LIMS Integration", text: "Effektiv integration sikrer hurtig adgang til laboratorieprøver og testresultater." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en strømlinet integration, der sikrer korrekt dataudveksling mellem systemerne.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg behovet for dataudveksling mellem LIMS og journalsystemet.",
        choiceA: {
          label: "Detaljeret behovsanalyse",
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
        location: "hospital",
        stepDescription: "Implementer en middleware-løsning for integration.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal løsning",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Dokumentér integrationsprocessen.",
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
    title: "Digitalisering af Patientbooking",
    shortDesc: "Manuelle bookingprocesser fører til fejl og ineffektivitet.",
    narrativeIntro: `
      "Det nuværende bookingsystem skaber dobbeltbookinger og tidskonflikter. En digital løsning er nødvendig for at optimere processen."
    `,
    digDeeperLinks: [
      { label: "Digital Booking", text: "Digitalisering af bookingprocessen øger effektiviteten og reducerer fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld digitalisering af bookingprocessen med integration til øvrige systemer.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende bookingproces og identificer flaskehalse.",
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
        location: "hospital",
        stepDescription: "Implementer et digitalt bookingsystem.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal implementering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Opdater dokumentationen og træningsmaterialet for det nye system.",
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
    title: "Forbedring af IT-support for Klinikker",
    shortDesc: "Ineffektive supportprocesser fører til lange ventetider og fejl.",
    narrativeIntro: `
      "Klinikkerne oplever dårlig IT-support, hvilket påvirker patientbehandlingen. En optimeret supportløsning er nødvendig."
    `,
    digDeeperLinks: [
      { label: "IT Support Best Practices", text: "Effektive supportprocesser reducerer ventetider og øger patienttilfredsheden." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en dybdegående evaluering af supportprocesserne med fokus på automatisering og træning af personalet.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål den nuværende responstid og supportkvalitet.",
        choiceA: {
          label: "Detaljeret evaluering",
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
        location: "hospital",
        stepDescription: "Implementer et nyt IT-supportsystem med automatisering.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Dokumentér de nye supportprocedurer og uddan personalet.",
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
    title: "Modernisering af Klinisk IT-infrastruktur",
    shortDesc: "Forældet IT-infrastruktur hæmmer effektiv patientbehandling.",
    narrativeIntro: `
      "Det nuværende IT-miljø er langsomt og ustabilt, hvilket fører til forsinkelser i behandling og diagnosticering. Modernisering er nødvendig for at sikre kontinuerlig drift."
    `,
    digDeeperLinks: [
      { label: "Klinisk IT Modernisering", text: "Opgradering af IT-infrastruktur kan forbedre behandlingsprocesserne og patientflowet." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld modernisering af infrastrukturen med fokus på hastighed og stabilitet.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende infrastruktur og identificer flaskehalse.",
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
        location: "hospital",
        stepDescription: "Opgrader hardware og software for bedre ydeevne.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+4 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal opgradering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Opdater dokumentationen og uddannelsesmaterialet.",
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
    title: "Implementering af Elektroniske Patientjournaler",
    shortDesc: "Digitalisering af patientjournaler for at øge effektiviteten.",
    narrativeIntro: `
      "Overgangen til elektroniske journaler kan forbedre datatilgængeligheden og reducere fejl i patientbehandlingen."
    `,
    digDeeperLinks: [
      { label: "Digital Patientjournal", text: "En digital løsning giver hurtig adgang til patientinformation og forbedrer behandlingskvaliteten." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld digitalisering af patientjournalerne med en brugervenlig grænseflade.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser de nuværende journalsystemer for fejl og ineffektivitet.",
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
        location: "hospital",
        stepDescription: "Implementer et nyt digitalt journalsystem.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal implementering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Opdater dokumentationen og træningsmaterialet for personalet.",
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
    shortDesc: "Manuelle processer fører til ineffektivitet og fejl.",
    narrativeIntro: `
      "Det administrative IT-miljø i hospitalet er præget af manuelle procedurer, der fører til fejl og spild af ressourcer. Digitalisering kan optimere disse processer."
    `,
    digDeeperLinks: [
      { label: "Process Automation", text: "Automatisering af processer øger effektiviteten og reducerer fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en omfattende digitalisering af de administrative processer med fokus på automatisering og integration.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de nuværende administrative processer.",
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
        location: "hospital",
        stepDescription: "Implementer digitale løsninger for automatisering.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+4 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 4, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal implementering",
          text: "+2 tid, +5% risk.",
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Dokumentér de nye processer og træn personalet.",
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
