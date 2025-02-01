// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    title: "Immunologi – LIMS udvidelse",
    shortDesc: "Forbedr integration med stainers og flowcytometri.",
    logicLong: "Opgaven kræver en fuld integration mellem laboratoriets udstyr og LIMS, hvilket reducerer manuelle fejl og sparer tid.",
    narrativeIntro: "I laboratoriet står en ny stainer klar, men integrationen til LIMS mangler. Personalet er bekymrede for, at manuelle processer vil føre til fejl.",
    learningInfo: "Læringspunkt: En god integration sikrer, at data overføres automatisk og nøjagtigt. <span class='hoverTooltip' data-tooltip='LIMS: Laboratory Information Management System – systemet der styrer laboratoriedata'>LIMS</span> er nøglen til at undgå fejl og spare tid.",
    knowledgeRecap: "En vellykket integration øger datakvaliteten og overholder standarder som ISO 27799.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft behovet for integration med overlægen og laboratoriepersonalet.",
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
  }
];
