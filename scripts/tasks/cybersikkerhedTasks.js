// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: "Installer IDS/IPS for at opdage hackerangreb og opfylde NIS2.",
    logicLong: `
      Hospitalets netværk er udsat for gentagne indtrængningsforsøg. Du skal implementere et IDS/IPS-system for tidlig opdagelse og forebyggelse af angreb.
    `,
    narrativeIntro: `
      En driftstekniker har observeret mistænkelig trafik, og der er rapporteret om portscanninger. Personalet er bekymrede for, at hackere kan få adgang til kritiske systemer.
    `,
    learningInfo: `
      Læringspunkt: Et IDS/IPS-system overvåger netværkstrafikken og advarer om uautoriseret aktivitet. Det er afgørende for at minimere risikoen for hackerangreb.
    `,
    knowledgeRecap: `
      Et effektivt IDS/IPS beskytter netværket ved at opdage trusler tidligt, og god dokumentation er nødvendig for at opfylde NIS2.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest sårbare netsegmenter og planlæg en scanning.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrér IDS/IPS i netværket uden at forårsage flaskehalse.",
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS/IPS-implementeringen til CAB (NIS2/GDPR).",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Phishing- og ransomware-forsvar",
    shortDesc: "Træn personalet mod phishing og implementer EDR.",
    logicLong: `
      Phishing-angreb og ransomware er reelle trusler. Du skal implementere en træningskampagne samt udrulle EDR (Endpoint Detection & Response) for at beskytte systemet.
    `,
    narrativeIntro: `
      Flere medarbejdere har modtaget mistænkelige e-mails, og en kollega har klikket på et farligt link. Sikkerhedsrisikoen er høj.
    `,
    learningInfo: `
      Læringspunkt: Uddannelse af personalet og implementering af EDR reducerer risikoen for ransomware. Effektiv træning og dokumentation er nøglen.
    `,
    knowledgeRecap: `
      Ved at træne personalet og anvende EDR kan man tidligt opdage og blokere angreb, hvilket mindsker risikoen for store skader.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg og udfør en phishing-kampagne med udrulning af EDR.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Begrænset indsats",
          text: "+1 tid, -20 kr => +1 security, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold træningssessioner for at øge personalets bevidsthed.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 tid => +1 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de anti-phishing tiltag og EDR-implementeringen til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Zero trust-strategi",
    shortDesc: "Implementér en zero trust-tilgang for maksimal sikkerhed.",
    logicLong: `
      Zero trust-strategien kræver, at al adgang kontrolleres, hvilket mindsker risikoen for sikkerhedsbrud – selvom det betyder flere logintrin.
    `,
    narrativeIntro: `
      Nogle afdelinger klager over de strenge adgangskrav, men erfaringer viser, at zero trust kan minimere sikkerhedsrisici betydeligt.
    `,
    learningInfo: `
      Læringspunkt: Zero trust sikrer, at ingen antages at være pålidelige – alle anmodninger skal valideres. Det kræver omfattende dokumentation og intern kommunikation.
    `,
    knowledgeRecap: `
      Zero trust minimerer risikoen for kompromitteringer, men kræver en solid dokumentation for at bestå eksterne audits.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Udarbejd en politik for zero trust med segmentering og mindste privilegier.",
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid => +2 security.",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk.",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold interne møder for at forklare de nye sikkerhedsprocedurer.",
        choiceA: {
          label: "Udførlig briefing",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen briefing",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér zero trust-tilgangen til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
  },
  {
    title: "Firewall-opgradering",
    shortDesc: "Udskift forældede firewalls med en next-gen løsning med DPI og HA.",
    logicLong: `
      Den nuværende firewall er forældet og kan ikke håndtere moderne trusler. Du skal installere en next-gen firewall med <span class="hoverTooltip" data-tooltip="DPI: Deep Packet Inspection – en metode til at inspicere data i realtid">DPI</span> og høj tilgængelighed.
    `,
    narrativeIntro: `
      Et nyligt forsøg på indbrud viste, at den gamle firewall ikke er tilstrækkelig, og personalet oplever regelmæssige nedbrud.
    `,
    learningInfo: `
      Læringspunkt: En moderne firewall med DPI øger systemets sikkerhed, men kræver grundig test og dokumentation for at undgå utilsigtede åbninger.
    `,
    knowledgeRecap: `
      Opgradering af firewalls kan drastisk forbedre sikkerheden, men den skal testes nøje og dokumenteres korrekt.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg firewall-sårbarheder og kør en sårbarhedsscanning.",
        choiceA: {
          label: "Dyb inspektion",
          text: "+3 tid, -100 kr => +2 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Test den nye firewall i et HA-cluster.",
        choiceA: {
          label: "Omfattende test",
          text: "+2 tid, -80 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "+1 tid, -20 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér firewall-opgraderingen til CAB (ISO 27001/NIS2).",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Monitoring og alerting (SOC-integration)",
    shortDesc: "Implementér et alarmsystem med SOC-overvågning.",
    logicLong: `
      Et velfungerende SOC-system centraliserer logdata og advarer i realtid, hvilket er afgørende for at stoppe sikkerhedshændelser.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, og det nuværende system er utilstrækkeligt til at opdage trusler i tide.
    `,
    learningInfo: `
      Læringspunkt: Et effektivt SOC-system gør det muligt at reagere hurtigt på sikkerhedstrusler. Det er vigtigt med en detaljeret strategi og dokumentation.
    `,
    knowledgeRecap: `
      SOC-integration kan forhindre alvorlige hændelser, men kræver en klar log-strategi og detaljeret dokumentation.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et system for realtidsalarmer, f.eks. med Slack eller SMS.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel mail-alert",
          text: "+1 tid, -40 kr => +1 security, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer personalet om, at alle handlinger logges (GDPR).",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Kun intern info",
          text: "0 tid => +5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en log-strategi til CAB (NIS2, databeskyttelse, retention).",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }
];
