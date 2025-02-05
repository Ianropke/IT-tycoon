window.hospitalTasks = [
  {
    title: "Opgradering af Patientjournal System",
    shortDesc: "Det nuværende EPJ-system er langsomt og ineffektivt.",
    narrativeIntro: `
      Hospitalet oplever hyppige fejl og langsomme svartider i patientjournalen. En modernisering er nødvendig for at sikre en hurtig og pålidelig informationsflow.
    `,
    glossaryTerms: ["Patientjournal", "EPJ", "Integration"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemgå den nuværende patientjournal for systemfejl og ineffektivitet.",
        choiceA: {
          label: "Detaljeret systemgennemgang",
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
        stepDescription: "Opgrader servere og netværk, så EPJ-systemet kan køre hurtigere.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
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
        stepDescription: "Dokumentér de nye processer og procedurer for den opgraderede EPJ.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Integration af LIMS og EPJ",
    shortDesc: "Systemerne for LIMS og patientjournalen er adskilte.",
    narrativeIntro: `
      Fejl i dataoverførslen mellem laboratoriet og patientjournalen forårsager fejlfortolkning af testresultater. En fuld integration kan forbedre informationsflowet.
    `,
    glossaryTerms: ["LIMS", "EPJ", "Integration"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg eksisterende datamodeller i LIMS og EPJ.",
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
        location: "dokumentation",
        stepDescription: "Udarbejd en integrationsplan og definer datastandarder.",
        choiceA: {
          label: "Omfattende plan",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Grundlæggende plan",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre at den nye integrationsløsning overholder GDPR og patientlovgivning.",
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
    title: "Digitalisering af Patientbestillinger",
    shortDesc: "Manuelle bestillinger skaber fejl og ineffektivitet.",
    narrativeIntro: `
      Hospitalet oplever, at papirbaserede bestillingsprocesser fører til forsinkelser og fejl i patientbehandlingen.
    `,
    glossaryTerms: ["Digitalisering", "Workflow", "Patientdata"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de manuelle processer for patientbestillinger.",
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
        stepDescription: "Implementer et digitalt bestillingssystem.",
        choiceA: {
          label: "Omfattende system",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
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
        stepDescription: "Udarbejd en procedure for digital patientbestilling og oplæring af personalet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort version",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af Patientflow i Akutmodtagelsen",
    shortDesc: "Manuelt patientflow skaber ineffektivitet og lange ventetider.",
    narrativeIntro: `
      Akutmodtagelsen oplever flaskehalse og forvirring i patientflowet, hvilket forlænger ventetiden og reducerer effektiviteten.
    `,
    glossaryTerms: ["Patientflow", "Triage", "Workflow"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser den nuværende patientstrøm for at identificere flaskehalse.",
        choiceA: {
          label: "Detaljeret procesanalyse",
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
        stepDescription: "Implementer et digitalt patientflow-system med automatiseret triage.",
        choiceA: {
          label: "Avanceret system",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
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
        stepDescription: "Dokumentér de nye flow-procedurer og træn personalet i den nye metode.",
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
    title: "Optimering af Operationsplanlægning",
    shortDesc: "Ineffektive operationsplaner fører til spildte ressourcer og forsinkelser.",
    narrativeIntro: `
      Hospitalets nuværende operationsplanlægning er manuel og rodet, hvilket medfører spild af ressourcer og lange ventetider.
    `,
    glossaryTerms: ["Operationsplanlægning", "Resource Management", "Efficiency"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Evaluer den eksisterende planlægning og identificer ineffektiviteter.",
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
        stepDescription: "Implementer et digitalt planlægningssystem for operationer.",
        choiceA: {
          label: "Avanceret system",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard system",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd detaljerede procedurer for operationsplanlægning.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort version",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af Patientkommunikation",
    shortDesc: "Ineffektiv kommunikation med patienter fører til forvirring og ventetid.",
    narrativeIntro: `
      Manglende digital kommunikation mellem hospitalet og patienter skaber misforståelser og forsinkelser i behandlingen.
    `,
    glossaryTerms: ["Kommunikation", "Patient Engagement", "Digitalisering"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser nuværende kommunikationsprocesser med patienter.",
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
        location: "leverandor",
        stepDescription: "Implementer et digitalt kommunikationssystem til patienter.",
        choiceA: {
          label: "Avanceret system",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
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
        stepDescription: "Udarbejd retningslinjer for digital patientkommunikation.",
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
    title: "Patientfeedback og Forbedringskultur",
    shortDesc: "Indsaml og analyser patientfeedback for at optimere behandling og service.",
    narrativeIntro: `
      Feedback fra patienter kan afsløre mangler i systemet og processerne. En struktureret feedbackproces vil hjælpe med at forbedre både patienttilfredsheden og de interne processer.
    `,
    glossaryTerms: ["Feedback", "Patienttilfredshed", "Kvalitetsforbedring"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Indsaml patientfeedback via digitale kanaler.",
        choiceA: {
          label: "Omfattende feedbackindsamling",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Begrænset feedback",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér feedback og udarbejd en handlingsplan.",
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
        stepDescription: "Sikre, at feedbackprocessen overholder relevante regler og standarder.",
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
    title: "Digitalisering af Ambulanceoverførsler",
    shortDesc: "Forbedr den digitale kommunikation og dataudveksling under ambulanceoverførsler.",
    narrativeIntro: `
      Manuel håndtering af ambulanceoverførsler medfører fejl og forsinkelser. Digitalisering kan optimere processen og sikre hurtigere behandling.
    `,
    glossaryTerms: ["Digitalisering", "Dataudveksling", "Integration"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér den nuværende proces for ambulanceoverførsler.",
        choiceA: {
          label: "Detaljeret procesanalyse",
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
        stepDescription: "Implementer et digitalt system til ambulanceoverførsler.",
        choiceA: {
          label: "Omfattende system",
          text: "+2 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -2 } }
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
        stepDescription: "Dokumentér nye procedurer for digital ambulanceoverførsel.",
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
