// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    category: "cybersikkerhed",
    title: "NetværksPenTest (ekstern firma)",
    shortDesc: "Hyre eksterne specialister til penTest.",
    logicLong: "Først Cybersikkerhed (planlæg), så IT Jura (kontrakt), Hospital (nedetid), Dokumentation. Pas på postCAB driftfejl!",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg penTest (detaljeret vs. standard).",
        choiceA: {
          label: "Detaljeret kravspec",
          text: "Mere tid, men sikr dyb test",
          applyEffect: { timeCost:2, moneyCost:50, riskyPlus:0 }
        },
        choiceB: {
          label: "Hurtig penTest",
          text: "+5% rest-risiko",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Kontrakt med eksternt firma",
        choiceA: {
          label: "Formel kontrakt + NDA",
          text: "+2 tid, ingen jura-huller",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Standardskabelon",
          text: "+5% fejlrisiko i jura",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner nedetid under test",
        choiceA: {
          label: "Informer afdelinger",
          text: "+2 tid, færre klager",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "Spar tid, -5 hospital",
          applyEffect: { statChange:{ hospitalSatisfaction:-5 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "PenTest-rapport til CAB",
        choiceA: {
          label: "Fuldt dok",
          text: "+2 tid, ingen CAB-skepsis",
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
    category: "cybersikkerhed",
    title: "Opdatering af Firewall-regler",
    shortDesc: "Revidér forældede firewall-regler.",
    logicLong: "Først Informationssikkerhed, så Cybersikkerhed, Hospital, Dokumentation. Mulig driftfejl efter CAB.",
    steps: [
      {
        location: "informationssikkerhed",
        stepDescription: "Analyse af nuværende firewall/logs",
        choiceA: {
          label: "Detaljeret log-tjek",
          text: "+2 tid, finder små huller",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+5% overset hul",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Design nye firewall-politikker",
        choiceA: {
          label: "Ny arkitektur",
          text: "+3 tid, men robust",
          applyEffect: { timeCost:3 }
        },
        choiceB: {
          label: "Akut fix",
          text: "+5% rest-risiko",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer om net-snit",
        choiceA: {
          label: "Planlagt vindue",
          text: "+2 tid, mindre sure medarbejdere",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Implementer straks",
          text: "Ingen tid, -5 hospital",
          applyEffect: { statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Firewall-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "CAB glade, +2 tid",
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
    category: "cybersikkerhed",
    title: "Kryptering af interne databaser",
    shortDesc: "Fuld diskkryptering + streng adgangsstyring.",
    logicLong: "Først Cybersikkerhed (metode), Infrastruktur, Hospital test, Dokumentation. Driftfejl kan ske!",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg krypteringsmetode",
        choiceA: {
          label: "Avanceret AES256",
          text: "+2 tid, +50 kr, meget sikker",
          applyEffect: { timeCost:2, moneyCost:50 }
        },
        choiceB: {
          label: "Basal kryptering",
          text: "+5% rest-risiko",
          applyEffect: { riskyPlus:0.05, timeCost:1 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer kryptering",
        choiceA: {
          label: "Kontrolleret migrering",
          text: "+3 tid, minimer fejl",
          applyEffect: { timeCost:3 }
        },
        choiceB: {
          label: "On-the-fly",
          text: "+8% data-korrupt risiko",
          applyEffect: { riskyPlus:0.08 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Test i afdelingerne",
        choiceA: {
          label: "Flere pilot-afdelinger",
          text: "+2 tid, men grundig test",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Rul bredt",
          text: "+5% hospital klager",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Krypterings-rapport",
        choiceA: {
          label: "Fuld dok",
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
  // ... 7 flere cybersikkerhed-opgaver ...
  // (Two-Factor Auth, Phishing, SOC-overvågning, Patch Mgmt,
  //  Adgangsbegr. leverandør, Log Mgmt & SIEM, Segmentering af LIMS)
];
