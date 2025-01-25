// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [

  // 1) Netværksovervågning (IDS/IPS)
  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: "Installer Intrusion Detection/Prevention for at fange hackerforsøg.",
    logicLong: `
      Angreb på hospitalets netværk stiger.
      Du vil opsætte et IDS/IPS-system til at opdage ondsindet trafik
      og blokere potentielle hackere.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest udsatte segmenter i netværket.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:80, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "IDS/IPS skal integreres uden at hindre ydeevnen.",
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr => +2 stability (minimal nedetid).",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Lynopsætning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect: { timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS/IPS-setup til CAB.",
        choiceA: {
          label: "Fuld doc",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 2) Phishing- og Ransomware-Forsvar
  {
    title: "Phishing- og Ransomware-Forsvar",
    shortDesc: `
      Træn personalet i at spotte 
      <span class="hoverTooltip" data-tooltip="Social engineering via mail, der narrer brugeren.">phishing</span> 
      og forebyg 
      <span class="hoverTooltip" data-tooltip="Skadelig software, der krypterer filer mod løsepenge.">ransomware</span>.
    `,
    logicLong: `
      Cyberkriminelle bruger ofte 
      <span class="hoverTooltip" data-tooltip="Falske mails, der lokker login-oplysninger ud.">phishing</span>
      og 
      <span class="hoverTooltip" data-tooltip="Malware, der låser data mod betaling.">ransomware</span>
      for at ramme hospitalet. 
      Du vil køre træningskampagne og installere anti-ransomware-løsning.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg phishing-kampagne for at teste personalets reaktion.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:80, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Lille kampagne",
          text: "+1 tid, -20 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:20, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold kurser om at genkende mailsvindel.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 tid => +1 hospitalSatisfaction, +5% risk (ikke alle deltager).",
          applyEffect: { statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lav anti-ransomware-procedurer til CAB.",
        choiceA: {
          label: "Udførlig vejledning",
          text: "+2 tid => +1 security",
          applyEffect: { timeCost:2, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Overfladisk doc",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 3) Zero Trust-Strategi
  {
    title: "Zero Trust-Strategi",
    shortDesc: "Indfør 'Stol ikke på noget, verificér alt' i netværket.",
    logicLong: `
      Zero Trust betyder streng segmentering og kontrol af alle enheder. 
      Hospitalspersonalet synes, det kan blive bureaukratisk.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Design Zero Trust-policies med mindst privilegier.",
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid => +2 security (segmentering).",
          applyEffect: { timeCost:3, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk",
          applyEffect: { timeCost:1, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Personalet klager over mange logintrin.",
        choiceA: {
          label: "Afhold dialogmøder",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Ignorér brok",
          text: "0 tid => -10 hospital, +5% risk",
          applyEffect: { statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se segmenteringsregler.",
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring delvist over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 4) Firewall-opgradering
  {
    title: "Firewall-opgradering",
    shortDesc: "Udskift forældede firewalls med en moderne løsning.",
    logicLong: `
      Hospitalets firewall-regler er forældede. 
      Du vil implementere en ny, men frygter nedetid.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg nuværende firewall-sårbarheder.",
        choiceA: {
          label: "Dybdegående inspektion",
          text: "+3 tid, -100 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Test firewall-kompatibilitet med servers.",
        choiceA: {
          label: "Omfattende test",
          text: "+2 tid, -80 kr => +2 stability",
          applyEffect: { timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "+1 tid, -20 kr => +1 stability, +5% risk",
          applyEffect: { timeCost:1, moneyCost:20, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 5) Dataovervågning & Log-analyse
  {
    title: "Dataovervågning & Log-analyse",
    shortDesc: "Implementér central logserver for at opdage unormale hændelser.",
    logicLong: `
      For at fange brud og unormale aktiviteter 
      vil cybersikkerhedsteamet centralisere alle logfiler.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg log-management-løsning (SIEM).",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Billig logserver",
          text: "+1 tid, -40 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Fortæl personalet, at deres handlinger bliver logget.",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:1 } }
        },
        choiceB: {
          label: "Fortæl kun it-afdelingen",
          text: "0 tid => +5% risk (personalet overraskes).",
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

  // 6) Penetrationstest af LIMS
  {
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre eksterne hackere til at teste systemets forsvar.",
    logicLong: `
      For at sikre 
      <span class="hoverTooltip" data-tooltip="Laboratory Information Management System.">LIMS</span>
      bedst muligt vil du køre en penetrationstest.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg scope for pentest: Hvilke dele angribes?",
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
          text: "+2 tid, -80 kr => synergyEffect:{ rushedJura:false } (aftaler alt).",
          applyEffect: { timeCost:2, moneyCost:80, synergyEffect:{ rushedJura:false } }
        },
        choiceB: {
          label: "Test kun hospitalets egne dele",
          text: "+1 tid => +5% risk (leverandørdelen usikret).",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lav en pentest-rapport til CAB.",
        choiceA: {
          label: "Detaljeret",
          text: "+2 tid => ingen ekstra risk, +1 security",
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

  // 7) Multi-factor Authentication (MFA)
  {
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør tofaktorløsning for at mindske kontotyveri.",
    logicLong: `
      Brug af 
      <span class="hoverTooltip" data-tooltip="Ekstra logintrin, fx sms-kode eller app.">MFA</span>
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
          text: "+1 tid, -30 kr => +1 security, +5% risk",
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
        stepDescription: "CAB kræver en beskrivelse af MFA-løsningen.",
        choiceA: {
          label: "Udførlig doc",
          text: "+2 tid => ingen ekstra risk",
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

  // 8) Monitoring og Alerting System
  {
    title: "Monitoring og Alerting System",
    shortDesc: "Automatiseret alarm ved unormale hændelser i realtid.",
    logicLong: `
      For at opdage brud i realtid vil cybersikkerhedsteamet 
      opsætte en automatiseret alarmplatform (PagerDuty/Slack).
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg alarmplatform (Slack, SMS, etc.).",
        choiceA: {
          label: "Avanceret Alarm",
          text: "+3 tid, -120 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Simpel mail-alert",
          text: "+1 tid, -40 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Check netværkets belastning ved konstant monitorering.",
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
        stepDescription: "CAB vil se alarmkonfiguration.",
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
  },

  // 9) Cloud-Sårbarhedsscanning
  {
    title: "Cloud-Sårbarhedsscanning",
    shortDesc: "Scanner eksterne cloud-løsninger for at sikre LIMS-data.",
    logicLong: `
      Hospitalet bruger cloud til nogle moduler. 
      Du vil lave en 
      <span class="hoverTooltip" data-tooltip="Scanning for sårbarheder i cloud-miljøet.">sårbarhedsscanning</span>
      men leverandørens lovkrav kan gøre det besværligt.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg scanning af cloud-miljø (AWS, Azure...).",
        choiceA: {
          label: "Grundig scanning",
          text: "+3 tid, -100 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Få leverandøren til at give fuld scanningstilladelse?",
        choiceA: {
          label: "Forhandle fuld adgang",
          text: "+2 tid => synergyEffect:{rushedJura:false}, +1 security",
          applyEffect: { timeCost:2, synergyEffect:{ rushedJura:false }, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Accepter begrænset adgang",
          text: "0 tid => +5% risk (du ser ikke alt).",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Cloud-scan rapport til CAB.",
        choiceA: {
          label: "Udførlig dok",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 10) Adgangsstyring for eksterne
  {
    title: "Adgangsstyring (eksterne samarbejdspartnere)",
    shortDesc:`
      Begræns eksternes adgang via streng segmentering og roller.
    `,
    logicLong:`
      Hospitalet har mange eksterne konsulenter. 
      De har for bred adgang. Du vil oprette fine-grained roller 
      og opdele systemet for sikkerhed.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér, hvilke moduler eksterne faktisk skal tilgå.",
        choiceA: {
          label: "Dybt policy-check",
          text: "+3 tid => +2 security (du finder overflødige rettigheder).",
          applyEffect: { timeCost:3, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Kvik scanning",
          text: "+1 tid => +1 security, +5% risk",
          applyEffect: { timeCost:1, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Eksterne aftaler kan kræve 
          <span class="hoverTooltip" data-tooltip="GDPR-lignende krav, data-processor-aftale.">revidering</span>.
        `,
        choiceA: {
          label: "Detaljeret juridisk gennemgang",
          text: "+2 tid, -60 kr => +1 security, +1 stability",
          applyEffect: { timeCost:2, moneyCost:60, statChange:{ security:1, stability:1 } }
        },
        choiceB: {
          label: "Standardvilkår",
          text: "0 tid => +5% risk, synergyEffect:{rushedJura:true}",
          applyEffect: { riskyPlus:0.05, synergyEffect:{ rushedJura:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB efterspørger dokumentation for ekstern adgang.",
        choiceA: {
          label: "Fuld rapport",
          text: "+2 tid => ingen ekstra risk, +1 stability",
          applyEffect: { timeCost:2, statChange:{ stability:1 } }
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
