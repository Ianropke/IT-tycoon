// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    title: "Immunologi – LIMS udvidelse",
    shortDesc: "Forbedr integration med stainers og flowcytometri.",
    logicLong: "Integration af laboratorieudstyr med LIMS minimerer manuelle fejl og øger effektiviteten.",
    narrativeIntro: "I laboratoriet står en ny stainer klar, men integrationen til LIMS mangler. Personalet er bekymrede for fejl i dataoverførslen.",
    learningInfo: "Læringspunkt: En effektiv integration sikrer, at data automatisk overføres til LIMS. <span class='hoverTooltip' data-tooltip='LIMS: Laboratory Information Management System – systemet der styrer laboratoriedata'>LIMS</span> er afgørende for at undgå manuelle fejl.",
    knowledgeRecap: "En vellykket integration øger datakvaliteten og effektiviteten i laboratoriet.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft integrationsbehovet med overlægen og laboratoriepersonalet.",
        choiceA: {
          label: "Grundig workshop",
          text: "+3 tid, +2 development",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid, +1 development, +5% risk",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for stabil dataoverførsel via en dedikeret server.",
        choiceA: {
          label: "Dedikeret server",
          text: "+2 tid, -100 kr, +2 stability",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Genbrug eksisterende",
          text: "+1 tid, +5% risk",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér integrationsprocessen til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Patologi – digital patologi",
    shortDesc: "Digitaliser vævssnit og implementer AI til diagnose.",
    logicLong: "Digital patologi reducerer manuelle processer og muliggør hurtigere diagnose ved brug af AI.",
    narrativeIntro: "En ny skanner er installeret, men personalet kæmper med store billedfiler og langsom behandling.",
    learningInfo: "Læringspunkt: Effektiv digitalisering og AI-integration øger hastigheden og præcisionen i patologien.",
    knowledgeRecap: "Digital patologi øger effektiviteten, men kræver god infrastruktur og dokumentation.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft workflow fra snit til scanning med patologerne.",
        choiceA: {
          label: "Udførlig flowgennemgang",
          text: "+3 tid, +2 stability",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort interview",
          text: "+1 tid, +1 stability, +5% risk",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader storage og GPU til at håndtere store billedfiler.",
        choiceA: {
          label: "Køb HPC-løsning",
          text: "+2 tid, -150 kr, +2 development",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér workflow og AI-validering til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }
];
