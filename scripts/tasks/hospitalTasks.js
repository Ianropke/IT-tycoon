// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    category: "hospital",
    title: "Biokemi Lab-automatisering",
    shortDesc: "Automatisere prøvehåndtering i LIMS.",
    logicLong: "Først Hospital, så Infrastruktur, Cybersikkerhed, Dokumentation. Driftfejl postCAB.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Definér nye arbejdsgange",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid, færre fejl",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Basal auto-flow",
          text: "+5% manuelle loops",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Koble robotter, opsæt integration",
        choiceA: {
          label: "Fuld integration",
          text: "+2 tid, stabil",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+8% net/hw konflikt",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre dataflows",
        choiceA: {
          label: "Krypteret link",
          text: "+2 tid, men tryghed",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Basal sikring",
          text: "+5% brudfare",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lab-automation-rapport",
        choiceA: {
          label: "Dyb dok",
          text: "+2 tid, CAB roser dig",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category: "hospital",
    title: "Patologi Billedanalyse-Plugin",
    shortDesc: "AI-baseret billedanalyse for patologiafdeling.",
    logicLong: "Hospital (AI-krav), Leverandør (udvikling), IT Jura (databehandleraftale), Dokumentation, drift-check.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Lav AI-kravspec",
        choiceA: {
          label: "Detaljeret krav",
          text: "+2 tid, færre misforståelser",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal liste",
          text: "+5% fejl i plugin",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Udvikle AI-plugin",
        choiceA: {
          label: "Omfattende test",
          text: "+3 tid, stabil AI",
          applyEffect: { timeCost:3 }
        },
        choiceB: {
          label: "Basis-plugin",
          text: "+8% fejl i analyser",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Databehandleraftale (AI)",
        choiceA: {
          label: "Dyb jura-check",
          text: "+2 tid, ingen hul",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Genbrug gammel aftale",
          text: "+5% hul i nye datatyper",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv plugin",
        choiceA: {
          label: "Grundig dok",
          text: "+2 tid, CAB roser dig",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category: "hospital",
    title: "Klinisk Genetik BigData Integration",
    shortDesc: "Forbinde LIMS med ekstern gen-database.",
    logicLong: "Først Hospital (krav), Leverandør (interface), Cybersikkerhed (gen-data sikring), Dokumentation. Tjek driftfejl!",
    steps: [
      {
        location: "hospital",
        stepDescription: "Definér genetik-krav",
        choiceA: {
          label: "Detaljeret variantliste",
          text: "+2 tid, præcis integration",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Basal kravliste",
          text: "+5% fejlfortolkning",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Byg interface til ekstern gen-database",
        choiceA: {
          label: "Robust interface",
          text: "+3 tid, fewer mis-match",
          applyEffect: { timeCost:3 }
        },
        choiceB: {
          label: "Hurtig patch",
          text: "+8% misfortolkede keys",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre følsomme gen-data",
        choiceA: {
          label: "Krypter & streng log",
          text: "+2 tid, men tryghed",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Basal sikring",
          text: "+5% data-læk",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Genetik-integrationsrapport",
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid, CAB glade",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  // ... 7 flere hospital-opgaver ...
];
