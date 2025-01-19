// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title: "End-to-End Kryptering",
    shortDesc: "Implementér kryptering af al datatransmission mellem hospitalets systemer.",
    logicLong: "Cybersikkerhedsafdelingen kræver, at al datatransmission er beskyttet med avanceret kryptering for at forhindre uautoriseret adgang og datalækager.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vurder, hvilke systemer der har mest brug for kryptering.",
        choiceA: {
          label: "Omfattende analyse",
          text: "Analyser alle systemer grundigt for at finde sårbarheder. (+3 tid, -100 kr; +2 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "Identificér kun de mest kritiske systemer hurtigt. (+1 tid, -50 kr; +1 Sikkerhed, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Forhandle med leverandøren om implementering af kryptering.",
        choiceA: {
          label: "Forhandle en premium-løsning",
          text: "Vælg en leverandør med dokumenteret erfaring og en omfattende løsning. (+3 tid, -200 kr; +2 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Vælg en standard løsning",
          text: "Brug en billigere løsning med færre funktioner. (+1 tid, -100 kr; +1 Sikkerhed, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 100, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sikre infrastrukturen mod kompatibilitetsproblemer med kryptering.",
        choiceA: {
          label: "Test hele infrastrukturen",
          text: "Gennemfør omfattende tests for at sikre stabiliteten. (+3 tid, -150 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Udfør minimale tests",
          text: "Test kun kritiske systemer for at spare tid og penge. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér implementeringen af krypteringssystemet.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "Udarbejd en fuld rapport med detaljer om implementeringen. (+2 tid, +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Skriv en minimal rapport for at spare tid, men risikér CAB-misforståelser. (+0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Netværkssegmentering",
    shortDesc: "Adskil kritiske systemer fra mindre vigtige for at reducere risiko.",
    logicLong: "For at forhindre malware eller hackerangreb i at sprede sig, vil cybersikkerhedsafdelingen segmentere netværket i sikre zoner.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg segmenteringen af netværket.",
        choiceA: {
          label: "Detaljeret segmenteringsplan",
          text: "Lav en detaljeret opdeling af netværket i sikkerhedszoner. (+3 tid, -100 kr; +2 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel segmenteringsplan",
          text: "Lav en hurtig opdeling af netværket med få zoner. (+1 tid, -50 kr; +1 Sikkerhed, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Gennemfør ændringer i netværksinfrastrukturen.",
        choiceA: {
          label: "Omfattende netværksopdatering",
          text: "Installer nye switches og opsæt VLANs. (+3 tid, -200 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Minimal opdatering",
          text: "Brug eksisterende udstyr og foretag mindre justeringer. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informér afdelinger om netværksændringer.",
        choiceA: {
          label: "Afhold træningssessioner",
          text: "Uddan personale om, hvordan ændringerne påvirker dem. (+2 tid, -50 kr; +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Send e-mails",
          text: "Kommunikér ændringerne hurtigt via e-mails, men risikér forvirring. (+0 tid; +1 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { riskyPlus: 0.05, statChange: { hospitalSatisfaction: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér netværkssegmenteringen for compliance.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "Lav en detaljeret rapport til revision og compliance. (+2 tid, +1 Sikkerhed)",
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Skriv kun en kort rapport, men risikér compliance-fejl. (+0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Intrusion Detection System (IDS)",
    shortDesc: "Implementér et system til at opdage og rapportere hackerforsøg.",
    logicLong: "Cybersikkerhedsafdelingen ønsker at implementere et IDS for at opdage forsøg på uautoriseret adgang.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest sårbare systemer til IDS.",
        choiceA: {
          label: "Omfattende risikoanalyse",
          text: "Analyser hele systemlandskabet for at finde svagheder. (+3 tid, -150 kr; +2 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal analyse",
          text: "Fokusér kun på kendte problemområder. (+1 tid, -50 kr; +1 Sikkerhed, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Vælg og implementér en IDS-løsning.",
        choiceA: {
          label: "Premium IDS-løsning",
          text: "Vælg en løsning med avancerede funktioner og support. (+3 tid, -250 kr; +2 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 250, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard IDS-løsning",
          text: "Vælg en billigere løsning med færre funktioner. (+1 tid, -100 kr; +1 Sikkerhed, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 100, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sikre infrastrukturen mod IDS' belastning.",
        choiceA: {
          label: "Omfattende test",
          text: "Gennemfør tests for at sikre, at systemet kan håndtere IDS. (+3 tid, -200 kr; +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "Test kun kritiske områder. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS' implementering for compliance.",
        choiceA: {
          label: "Fuld rapportering",
          text: "Lav en detaljeret compliance-rapport. (+2 tid, +1 Sikkerhed)",
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal rapportering",
          text: "Lav kun en kort rapport. (+0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  }
];
