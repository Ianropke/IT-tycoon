// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    title: "Implementering af AI-Billedanalyse",
    shortDesc: "Få patologiafdelingen til at bruge AI til hurtigere og mere præcise analyser.",
    logicLong: "Patologiafdelingen ønsker at implementere AI-teknologi til billedanalyse for at reducere svartider og forbedre diagnostisk nøjagtighed. Dette kræver en analyse af afdelingens behov, en vurdering af leverandørernes tilbud, en juridisk gennemgang af databrug og en detaljeret dokumentation til CAB.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Indsamling af afdelingens krav og behov til AI-billedanalyse.",
        choiceA: {
          label: "Detaljeret behovsanalyse",
          text: "Hold møder med afdelingens ledere og læger for at få en komplet forståelse af deres krav. (+3 tid; +2 Stabilitet)",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk behovsanalyse",
          text: "Saml krav hurtigt via en spørgeskemaundersøgelse, men risikér at overse væsentlige behov. (+1 tid; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Vurdering af infrastrukturens kapacitet til AI-løsningen.",
        choiceA: {
          label: "Komplet vurdering",
          text: "Test hele infrastrukturen for at sikre, at den kan håndtere de nye krav. (+3 tid, -150 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "Lav en hurtig analyse og fokuser kun på de vigtigste områder, men risikér flaskehalse. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikring af databeskyttelse og compliance for AI-løsningen.",
        choiceA: {
          label: "Fuld juridisk gennemgang",
          text: "Få en ekstern ekspert til at gennemgå alle juridiske aspekter. (+2 tid, -100 kr; +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal juridisk gennemgang",
          text: "Brug standard juridiske skabeloner, men øg risikoen for fremtidige problemer. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport til CAB om AI-billedanalysen.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "Udarbejd en udførlig rapport, der dækker alle aspekter af implementeringen. (+2 tid; +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "Skriv en kort rapport for at spare tid, men øg CAB-skepsis. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Etablering af Nyt Laboratorieinformationssystem (LIMS)",
    shortDesc: "Implementér et moderne LIMS til at optimere laboratoriearbejde.",
    logicLong: "Hospitalets nuværende LIMS er forældet og ineffektivt. Det nye system skal sikre hurtigere databehandling og bedre integration med andre systemer.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Definer afdelingens behov for et nyt LIMS.",
        choiceA: {
          label: "Omfattende behovsanalyse",
          text: "Afhold workshops med laboratoriepersonalet for at kortlægge deres behov. (+3 tid; +2 Stabilitet)",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk behovsanalyse",
          text: "Lav en hurtig spørgeskemaundersøgelse og fokuser kun på kernefunktioner. (+1 tid; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Vælg en leverandør til det nye LIMS.",
        choiceA: {
          label: "Vælg en anerkendt leverandør",
          text: "Vælg en leverandør med gode anbefalinger, men som koster mere. (+3 tid, -200 kr; +2 Udvikling)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Vælg en billig leverandør",
          text: "Vælg en billig leverandør med begrænset erfaring. (+1 tid, -50 kr; +1 Udvikling, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Undersøg kompatibiliteten mellem det nye LIMS og eksisterende systemer.",
        choiceA: {
          label: "Komplet kompatibilitetstest",
          text: "Gennemfør en fuld test for at sikre problemfri integration. (+3 tid, -150 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "Test kun de vigtigste integrationer og spar tid, men øg risikoen for fejl. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport om LIMS-implementeringen.",
        choiceA: {
          label: "Fuld rapport",
          text: "Dokumentér hele implementeringen for at sikre godkendelse fra CAB. (+2 tid; +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "Skriv en kort rapport og spar tid, men øg risikoen for afvisning. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Multi-sprog i LIMS",
    shortDesc: "Gøre det muligt at skifte sprog, fx engelsk, til internationale ansatte.",
    logicLong: "Hospitalet ønsker at tilføje flere sprogpakker til LIMS for at understøtte internationalt personale.",
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér behovet for sprogpakker i hospitalets afdelinger.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "Lav en analyse af, hvilke sprog der er mest nødvendige. (+3 tid, +2 Udvikling)",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "Lav en hurtig vurdering baseret på personalets nationaliteter. (+1 tid, +1 Udvikling, +5% risiko)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Vurder leverandørens muligheder for at implementere sprogpakker.",
        choiceA: {
          label: "Grundig vurdering",
          text: "Undersøg leverandørens erfaring med sprogpakker. (+3 tid, -150 kr; +2 Udvikling)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "Stol på leverandørens reklamer for at spare tid og penge. (+1 tid, -50 kr; +1 Udvikling, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sikre, at infrastrukturen kan håndtere flere sprogpakker.",
        choiceA: {
          label: "Omfattende test",
          text: "Test infrastrukturen for at sikre ydeevnen med de nye sprog. (+3 tid, -200 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "Antag, at infrastrukturen kan håndtere ændringen, men tag risikoen. (+1 tid, -50 kr; +1 Stabilitet, +10% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.1, statChange: { stability: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér implementeringen af de nye sprogpakker.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "Lav en detaljeret rapport for CAB. (+2 tid, +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Lav kun en kort rapport. (0 tid, +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  }
];
