// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: "Installer IDS/IPS for tidlig opdagelse af angreb.",
    logicLong: "Implementér et IDS/IPS-system for at opdage og forebygge hackerangreb, så du kan reagere hurtigt i henhold til NIS2.",
    narrativeIntro: "Der er mistænkelig trafik og rapporter om portscanninger. Personalet frygter, at hackere kan få adgang til systemet.",
    learningInfo: "Læringspunkt: Et IDS/IPS overvåger netværkstrafikken og giver tidlig advarsel om uautoriseret aktivitet. Det er essentielt for at beskytte systemet.",
    knowledgeRecap: "Et effektivt IDS/IPS reducerer risikoen for hackerangreb og hjælper med at overholde NIS2-krav.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér sårbare netsegmenter og planlæg en scanning.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr, +2 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr, +1 security, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrér IDS/IPS uden at skabe flaskehalse i netværket.",
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr, +2 stability",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+1 tid, -50 kr, +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS/IPS-implementeringen til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid, +5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Phishing- og ransomware-forsvar",
    shortDesc: "Træn personalet mod phishing og implementer EDR.",
    logicLong: "Phishing-angreb og ransomware er reelle trusler, som kræver både uddannelse og teknologisk beskyttelse via EDR.",
    narrativeIntro: "Flere medarbejdere har modtaget mistænkelige e-mails, og en kollega har klikket på et farligt link. Risikoen for ransomware stiger.",
    learningInfo: "Læringspunkt: Effektiv træning og implementering af <span class='hoverTooltip' data-tooltip='EDR: Endpoint Detection & Response'>EDR</span> reducerer risikoen for angreb betydeligt.",
    knowledgeRecap: "Ved at uddanne personalet og anvende EDR kan du tidligt opdage og blokere angreb, hvilket mindsker den samlede risiko.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg en phishing-kampagne med EDR-udrulning.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr, +2 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Begrænset indsats",
          text: "+1 tid, -20 kr, +1 security, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold træningssessioner for at øge personalets sikkerhedsbevidsthed.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid, +2 hospitalSatisfaction",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 tid, +1 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér trænings- og EDR-tiltag til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid, +5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Zero trust-strategi",
    shortDesc: "Implementér en zero trust-tilgang for maksimal sikkerhed.",
    logicLong: "Zero trust-strategien kræver, at alle adgangsanmodninger valideres, hvilket reducerer risikoen for kompromitteringer.",
    narrativeIntro: "Interne møder viser, at selvom personalet er trætte af flere logintrin, mindsker zero trust risikoen betydeligt.",
    learningInfo: "Læringspunkt: Zero trust sikrer, at ingen får automatisk tillid – alle anmodninger skal verificeres. Det kræver en solid politik og dokumentation.",
    knowledgeRecap: "Zero trust reducerer risikoen for sikkerhedsbrud, men kræver omfattende dokumentation for at overbevise CAB.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Udarbejd en politik for zero trust med segmentering og mindste privilegier.",
        choiceA: {
          label: "Omfattende politik",
          text: "+3 tid, +2 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal politik",
          text: "+1 tid, +1 security, +5% risk",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold interne møder for at forklare de nye sikkerhedsprocedurer.",
        choiceA: {
          label: "Udførlig briefing",
          text: "+2 tid, +2 hospitalSatisfaction",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen briefing",
          text: "0 tid, -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér zero trust-tilgangen til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
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
