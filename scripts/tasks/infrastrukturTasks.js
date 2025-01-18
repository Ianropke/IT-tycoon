// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    category: "infrastruktur",
    title: "Serverpark Modernisering",
    shortDesc: "Udskifte gamle servere med nye, strømbesparende.",
    logicLong: "Først Infrastruktur (valg), Hospital, Leverandør, Dokumentation. Tjek driftfejl postCAB.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Plan & Indkøb servere",
        choiceA: {
          label: "Topmoderne",
          text: "+2 tid, +100 kr, men fremtidssikret",
          applyEffect: { timeCost:2, moneyCost:100 }
        },
        choiceB: {
          label: "Mellemklasse-løsning",
          text: "+5% kapacitetsknaphed senere",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Accepter driftforstyrrelse",
        choiceA: {
          label: "Gradvis migrering",
          text: "+2 tid, mindre risiko",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Stor weekend-cutover",
          text: "-10 tid, +8% migrationsfejl",
          applyEffect: { timeCost:-10, riskyPlus:0.08 }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Tilpas software til ny platform",
        choiceA: {
          label: "Grundige tests",
          text: "+2 tid, robust",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Antag out-of-box",
          text: "+10% softwarefejl",
          applyEffect: { riskyPlus:0.1 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Hardware-udskiftningsrapport",
        choiceA: {
          label: "Detaljeret dok",
          text: "+2 tid, CAB roser dig",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "NetværksOpgradering (10 GbE)",
    shortDesc: "Opgradere net fra 1 Gbit til 10 Gbit.",
    logicLong: "Først Infrastruktur, Hospital test, Cybersikkerhed for VLAN, Dokumentation. Driftfejl muligt.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Installér nyt netudstyr",
        choiceA: {
          label: "Opgradér switche/kabler",
          text: "+2 tid, +80 kr",
          applyEffect: { timeCost:2, moneyCost:80 }
        },
        choiceB: {
          label: "Kun kerneswit",
          text: "+5% latens",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afdelingstest / feedback",
        choiceA: {
          label: "Pilot i én afd",
          text: "+2 tid, sikr forløb",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Alt på én gang",
          text: "+8% driftforstyrrelse",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opsæt VLAN/firewalls",
        choiceA: {
          label: "Grundig net-sikkerhed",
          text: "+2 tid, robust",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal config",
          text: "+10% potentiel sårbarhed",
          applyEffect: { riskyPlus:0.1 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Net-upgrade-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid, CAB glade",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Konsolidering af sjældent brugte moduler",
    shortDesc: "Lukke/udfase LIMS-moduler, der ikke længere bruges.",
    logicLong: "Først Infrastruktur (analyse), Hospital (bekræft?), IT Jura (licenser), Dokumentation. Fejl i drift kan ske!",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Systematisk analyse",
        choiceA: {
          label: "Brugersporing",
          text: "+2 tid, men sikkert overblik",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Uofficiel liste",
          text: "+8% fejl-luk",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Bekræft om moduler er kritiske",
        choiceA: {
          label: "Brugerhøring",
          text: "+2 tid, færre klager",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Luk hurtigt",
          text: "+10% klager",
          applyEffect: { riskyPlus:0.1 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Opsig licensaftaler",
        choiceA: {
          label: "Ordentlig opsigelse",
          text: "+2 tid, ingen bod",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Hurtig opsigelse",
          text: "+5% juridisk efterspil",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lukningsrapport",
        choiceA: {
          label: "Detaljeret dok",
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
  // ... 7 flere infrastruktur-opgaver ...
];
