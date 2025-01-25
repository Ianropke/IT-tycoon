// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: "Installer Intrusion Detection/Prevention for at fange hackerforsøg.",
    logicLong: `
      Angreb på hospitalets netværk stiger. 
      Du vil opsætte et IDS/IPS-system til at opdage og blokere forsøg. 
      Men det kræver koordinering med både infrastruktur og hospital.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest udsatte segmenter i netværket.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security (du finder de fleste huller).",
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (du risikerer at overse sårbarheder).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "IDS/IPS skal integreres i netværket uden at hæmme ydeevnen.",
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr => +2 stability (du sikrer minimal nedetid).",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Lynopsætning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk (konfigurationsfejl kan opstå).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS/IPS-implementering for CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk. CAB vil kunne se al konfiguration.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Phishing- og Ransomware-Forsvar",
    shortDesc: "Træn personalet i at spotte phishing og forebyg ransomware.",
    logicLong: `
      Cyberkriminelle går ofte via e-mails og dokumenter. 
      Cybersikkerhedsafdelingen vil køre kampagner og installere anti-ransomware-løsning. 
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg phishing-kampagne (simulerede angreb) for at måle personalets reaktion.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security (du dækker alle afdelinger).",
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Lille kampagne",
          text: "+1 tid, -20 kr => +1 security, +5% risk (ikke alle informeres).",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner træningssessioner med personalet om at spotte phishing.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction (personalet føler sig trygge).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "+1 tid => +1 hospitalSatisfaction, +5% risk (ikke alle deltager seriøst).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { hospitalSatisfaction: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv anti-ransomware-procedurer til CAB.",
        choiceA: {
          label: "Udførlig vejledning",
          text: "+2 tid => +1 security, CAB roser indsatsen.",
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Overfladisk",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Zero Trust-Strategi",
    shortDesc: "Implementér Zero Trust i netværket, så ingen kan frit tilgå ressourcer.",
    logicLong: `
      Et moderne princip: "Stol ikke på noget, verifikér alt". 
      Men hospitalets personale kan føle det som bureaukrati. 
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Design Zero Trust-policies, brug mindst privilegier i LIMS.",
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid => +2 security (grundig segmentering).",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk (dele af netværket forbliver åbne).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Personalet er utilfredse med mange login-skridt.",
        choiceA: {
          label: "Afhold dialogmøder",
          text: "+2 tid => +2 hospitalSatisfaction (de forstår vigtigheden).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ignorér brok",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (brugerne omgår sikkert systemet).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en liste over de nye segmenteringsregler.",
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring delvist over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Firewall-opgradering",
    shortDesc: "Opgrader forældede firewalls med moderne løsninger.",
    logicLong: `
      Hospitalets firewall-regler er forældede. 
      Du vil implementere en moderne løsning, men hospitalet frygter nedetid. 
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg svagheder i de nuværende firewall-regler.",
        choiceA: {
          label: "Dybdegående inspektion",
          text: "+3 tid, -100 kr => +2 security.",
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
        stepDescription: "Test firewall-kompatibilitet med eksisterende systemer.",
        choiceA: {
          label: "Omfattende test",
          text: "+2 tid, -80 kr => +2 stability.",
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
        stepDescription: "Opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring over det meste",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Dataovervågning & Log-analyse",
    shortDesc: "Implementér et centraliseret logsystem for at opdage uregelmæssigheder.",
    logicLong: `
      For at fange unormale aktiviteter i LIMS, vil cybersikkerhedsteamet 
      samle alle logfiler et sted. 
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en log-management-løsning og opsæt retningslinjer.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr => +2 security (real-time analyse).",
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Billig logserver",
          text: "+1 tid, -40 kr => +1 security, +5% risk (mindre indsigt).",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Forklar personalet om, at deres handlinger bliver logget.",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction:1 } }
        },
        choiceB: {
          label: "Fortæl kun it-afdelingen",
          text: "0 tid => +5% risk (personalet kan blive overrasket).",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en log-strategi.",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Mangelfuld doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre eksterne hackere til at teste systemets forsvar.",
    logicLong: `
      For at sikre hospitalets LIMS bedst muligt, vil du køre en 
      <span class="hoverTooltip" data-tooltip="Pentest: Etisk hacking.">penetrationstest</span>.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg scope for pentest: Hvilke dele af LIMS angribes?",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:150, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Smalt scope",
          text: "+1 tid, -50 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:50, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Involver leverandøren for at teste eksterne moduler.",
        choiceA: {
          label: "Kræv leverandørens medvirken",
          text: "+2 tid, -80 kr => synergyEffect:{ rushedJura:false }, alt aftales ordentligt.",
          applyEffect: { timeCost:2, moneyCost:80, synergyEffect:{ rushedJura:false } }
        },
        choiceB: {
          label: "Test kun hospitalets egne dele",
          text: "+1 tid => +5% risk (leverandørdelen forbliver usikret).",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lav en pentest-rapport til CAB.",
        choiceA: {
          label: "Detaljeret",
          text: "+2 tid => ingen ekstra risk, +1 security (fund udbedres).",
          applyEffect: { timeCost:2, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Minimal",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør tofaktorløsning for at begrænse kontotyveri.",
    logicLong: `
      Brug af 
      <span class="hoverTooltip" data-tooltip="MFA: Ekstra logintrin, fx SMS-kode eller app.">MFA</span>
      kan forhindre phishing-angreb i at kompromittere brugerkonti. 
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (sms, app, tokens?).",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Simpel (sms)",
          text: "+1 tid, -30 kr => +1 security, +5% risk (falske numre?).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Forklar personalet vigtigheden af MFA.",
        choiceA: {
          label: "Træningssessions",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Mail til alle",
          text: "0 tid => +1 hospital, +5% risk (mange ignorerer mail).",
          applyEffect: { statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver en beskrivelse af den nye MFA.",
        choiceA: {
          label: "Udførlig doc",
          text: "+2 tid => ingen ekstra risk, CAB forstår alt.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring doc over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Monitoring og Alerting System",
    shortDesc: "Implementer et automatiseret alarmsystem for unormale hændelser.",
    logicLong: `
      For at opdage brud og unormale begivenheder i realtid, 
      vil cybersikkerhedsteamet indføre et 
      <span class="hoverTooltip" data-tooltip="Monitoring & Alerting: Overvågning døgnet rundt.">monitoring system</span>.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et system til realtidsalarmer (PagerDuty, Slack-integration?).",
        choiceA: {
          label: "Avanceret Alarmplatform",
          text: "+3 tid, -120 kr => +2 security, du fanger det meste.",
          applyEffect: { timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Simpel mail-alert",
          text: "+1 tid, -40 kr => +1 security, +5% risk (mails kan overses).",
          applyEffect: { timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Check om netværket kan håndtere konstant monitorering.",
        choiceA: {
          label: "Ydelsestest",
          text: "+2 tid, -80 kr => +2 stability",
          applyEffect: { timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Ingen test",
          text: "0 tid => synergyEffect:{lackInfra:true}, +5% risk",
          applyEffect: { synergyEffect:{lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se, hvordan alarmsystemet er konfigureret.",
        choiceA: {
          label: "Fuld beskrivelse",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  }
];
