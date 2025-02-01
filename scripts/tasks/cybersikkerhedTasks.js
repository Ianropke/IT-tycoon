// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [

  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: "Installer IDS/IPS for at opdage hackerangreb og opfylde NIS2.",
    logicLong: `
      Hospitalets netværk er udsat for flere indtrængningsforsøg. 
      Du vil opsætte et IDS/IPS-system (Intrusion Detection/Prevention) 
      for at reagere hurtigt på angreb, i tråd med NIS2-krav.
    `,
    narrativeIntro: `
      En driftstekniker har observeret mistænkelig trafik. Hackere scanner åbne porte, og personalet håber, at du kan sikre netværket, så patientdata forbliver sikre.
    `,
    learningInfo: `
      Læringspunkt: Et IDS/IPS-system er essentielt for tidlig opdagelse af ondsindet trafik. Implementeringen reducerer risikoen for angreb og hjælper med at opfylde NIS2-kravene. 
      Vigtige termer: <span class="hoverTooltip" data-tooltip="Intrusion Detection System: Et system der opdager uautoriseret aktivitet">IDS</span> og 
      <span class="hoverTooltip" data-tooltip="Intrusion Prevention System: Et system der forhindrer angreb i realtid">IPS</span>.
    `,
    knowledgeRecap: `
      Et IDS/IPS hjælper med at fange ondsindet trafik tidligt. Uden det kan hackere udnytte sårbarheder ubemærket. God dokumentation letter compliance ved fx NIS2-inspektion.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest sårbare netsegmenter og planlæg en scanning.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security (flere huller afsløres).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (du misser noget).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrér IDS/IPS i netværket uden at skabe flaskehalse.",
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr => +2 stability (mindre nedetid).",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk (konfigurationsfejl).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér IDS/IPS implementeringen (NIS2 og GDPR art.32) til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Phishing- og ransomware-forsvar",
    shortDesc: "Træn personalet mod phishing og undgå ransomware (GDPR-compliance).",
    logicLong: `
      Kriminelle benytter phishing for at indsætte ransomware. Du planlægger en træningskampagne og udrulning af EDR (Endpoint Detection & Response) for at minimere risiko.
    `,
    narrativeIntro: `
      Flere medarbejdere har modtaget mistænkelige e-mails, og en kollega har klikket på et farligt link – hvilket skaber stor bekymring.
    `,
    learningInfo: `
      Læringspunkt: Ved at træne personalet i at genkende phishing og implementere EDR kan du hurtigt opdage og blokere ransomware-angreb. Det er afgørende at dokumentere de trufne sikkerhedsforanstaltninger.
    `,
    knowledgeRecap: `
      Træning og EDR reducerer risikoen for ransomware. Uden dokumentation ved CAB ikke, hvordan man håndterer hændelserne.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg en phishing-kampagne og implementer EDR på arbejdsstationer.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security (flere afdelinger dækkes).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Begrænset indsats",
          text: "+1 tid, -20 kr => +1 security, +5% risk (nogle mails overses).",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold kurser om phishing- og ransomware-risiko og informér om EDR.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction (trygge medarbejdere).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 tid => +1 hospitalSatisfaction, +5% risk (lavt engagement).",
          applyEffect: { statChange: { hospitalSatisfaction: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv anti-ransomware procedurer til CAB (GDPR art.32).",
        choiceA: {
          label: "Udførlig vejledning",
          text: "+2 tid => +1 security (CAB roser indsatsen).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Overfladisk dokumentation",
          text: "0 tid => +5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Zero trust-strategi",
    shortDesc: "Indfør zero trust med segmentering og mindste privilegie (NIS2/GDPR).",
    logicLong: `
      Zero trust betyder, at ingen enheder eller brugere automatisk får tillid – alt skal verificeres. Selvom personalet klager over flere logintrin, er fordelene i form af øget sikkerhed store.
    `,
    narrativeIntro: `
      Nogle afdelinger klager over de strenge adgangskrav, men erfaringer fra andre hospitaler viser, at en zero trust-strategi betydeligt mindsker sikkerhedsrisikoen.
    `,
    learningInfo: `
      Læringspunkt: Zero trust-strategien sikrer, at alle anmodninger kontrolleres. Dette mindsker risikoen for store sikkerhedsbrud, men kræver omhyggelig dokumentation og kommunikation til personalet.
    `,
    knowledgeRecap: `
      Med zero trust kontrolleres al adgang nøje, hvilket reducerer risikoen for kompromitteringer. Det kræver dog omfattende dokumentation for at bestå audits.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg netsegmentering og udarbejd politik for mindste privilegier.",
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid, - (ingen omkostning) => +2 security (stærk kontrol).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk (nogle rettigheder forbliver åbne).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold info-møder med personalet om de nye sikkerhedsprocedurer.",
        choiceA: {
          label: "Udførlig information",
          text: "+2 tid => +2 hospitalSatisfaction (god forståelse).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen information",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (systemet omgås).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér zero trust-design og udarbejd evt. en DPIA til CAB.",
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Firewall-opgradering",
    shortDesc: "Udskift forældede firewalls med next-gen firewall (NGFW) og opnå HA.",
    logicLong: `
      Hospitalets nuværende firewall er forældet med begrænsede regler. Du vil installere en next-gen firewall med DPI (deep packet inspection) og høj tilgængelighed (HA).
    `,
    narrativeIntro: `
      Et nyligt forsøg på indbrud viste, at den gamle firewall ikke kunne blokere moderne trusler. Personalet oplever desuden periodiske nedetider, som en HA-løsning kunne afhjælpe.
    `,
    learningInfo: `
      Læringspunkt: En opgradering til en moderne firewall med DPI-teknologi øger systemets sikkerhed markant. En grundig test og dokumentation er afgørende for at opfylde NIS2-kravene.
    `,
    knowledgeRecap: `
      En opdateret firewall med DPI kan forhindre mange angreb. Uden tilstrækkelig test kan utilsigtede porte åbnes, hvilket dokumentationen skal afklare.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg firewall-sårbarheder og kør en sårbarhedsscanning.",
        choiceA: {
          label: "Dyb inspektion",
          text: "+3 tid, -100 kr => +2 security (flere fejl rettes).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (noget forbliver åbent).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Test den nye firewall mod servere, evt. i et HA-cluster.",
        choiceA: {
          label: "Omfattende test",
          text: "+2 tid, -80 kr => +2 stability",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "+1 tid, -20 kr => +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér firewall-opgraderingen til CAB (ISO 27001/NIS2).",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Dataovervågning & log-analyse (SIEM)",
    shortDesc: "Implementér SIEM for realtidslogning og overhold NIS2.",
    logicLong: `
      Et SIEM samler logs fra netværk, servere og applikationer, så du kan opdage unormale mønstre hurtigt. NIS2 kræver bedre indsigt i hændelser.
    `,
    narrativeIntro: `
      Du modtager rapporter om uregelmæssig netaktivitet – et SIEM-system kunne have udløst alarmer i realtid, men det kræver betydelige ressourcer.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SIEM-system centraliserer logdata, hvilket gør det muligt hurtigt at identificere og reagere på sikkerhedshændelser. Dokumentationen af logstrategien er nøglen til compliance.
    `,
    knowledgeRecap: `
      Central loganalyse gør det muligt at opdage mistænkelig aktivitet hurtigt. Uden dokumentation ved man ikke, hvilke logs der opsamles, og compliance bliver vanskelig.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en SIEM-løsning og definer de primære logkilder (net, endpoints, AD).",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr => +2 security (realtidsanalyse).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Mindre logserver",
          text: "+1 tid, -40 kr => +1 security, +5% risk (begrænset indsigt).",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer personalet om, at alle handlinger logges for GDPR.",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrunden).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Kun intern info",
          text: "0 tid => +5% risk (personalet overraskes).",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér log-strategien til CAB (NIS2, databeskyttelse, retention).",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Penetrationstest af lims",
    shortDesc: "Hyre etisk hackerteam til at teste LIMS. Undgå ukendte huller.",
    logicLong: `
      For at afdække reelle sårbarheder hyrer du et eksternt penetrationstest-hold, som kan simulere angreb på LIMS og netværk. Også leverandørmoduler skal testes.
    `,
    narrativeIntro: `
      Rygtet siger, at en tidligere pen-test fandt kritiske fejl. Personalet er nervøse, men det er bedre at vide det nu end at vente på hackere.
    `,
    learningInfo: `
      Læringspunkt: En grundig penetrationstest afdækker skjulte sårbarheder og prioriterer sikkerhedsforbedringer. En detaljeret rapport sikrer, at alle fund bliver håndteret korrekt.
    `,
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. Hvis omfanget er for begrænset, overses vigtige moduler. Dokumentation er afgørende for at rette fejlene.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test med et bredt scope (web, net, OS, social engineering).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du afdækker alt).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Smalt scope",
          text: "+1 tid, -50 kr => +1 security, +5% risk (vigtige områder overses).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Test leverandørmoduler for supply chain-risiko.",
        choiceA: {
          label: "Kræv medvirken",
          text: "+2 tid, -80 kr => synergyEffect: { rushedJura: false }, +1 security",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 80, synergyEffect: { rushedJura: false }, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Kun internt",
          text: "+1 tid => +5% risk (leverandørdelen er usikret).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret pen-test rapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk, +1 security (fejl rettes).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Multi-factor authentication (MFA)",
    shortDesc: "Indfør MFA for at opfylde NIS2/GDPR om stærk godkendelse.",
    logicLong: `
      Hospitalets ansatte bruger kun password. MFA mindsker risikoen for kompromittering af konti, men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      En overlæge har vist, at simple kodeord udgør en stor sikkerhedsrisiko. MFA forhindrer, at angribere kun stjæler passwordet.
    `,
    learningInfo: `
      Læringspunkt: Implementering af MFA tilføjer et ekstra sikkerhedslag. Ved at vælge en robust løsning (fx autentificeringsapp) kan man markant reducere risikoen for phishing-angreb. Det er vigtigt at dokumentere, hvordan MFA integreres.
    `,
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed, men uden korrekt dokumentation kan systemet blive afvist af CAB.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (app, token, SMS) til hospitalets ansatte.",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security (meget robust).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel (SMS)",
          text: "+1 tid, -30 kr => +1 security, +5% risk (muligt SIM-misbrug).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Forklar personalet vigtigheden af MFA.",
        choiceA: {
          label: "Træningssessioner",
          text: "+2 tid => +2 hospitalSatisfaction (bedre forståelse).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Send en mail",
          text: "0 tid => +1 hospitalSatisfaction, +5% risk (nogle ignorerer).",
          applyEffect: { statChange: { hospitalSatisfaction: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret MFA-plan til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid => ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Monitoring og alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtidslogning og overhold NIS2.",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, og et effektivt SOC-system kan derfor redde kritiske situationer.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SOC-system centraliserer logdata og alarmer, så man hurtigt kan reagere på sikkerhedstrusler. En detaljeret strategi og grundig dokumentation er afgørende for compliance.
    `,
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, kan stoppe hændelser, før de eskalerer. Uden dokumentation ved man ikke, hvilke logs der opsamles.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et system for realtidsalarmer (f.eks. Slack, sms, XDR) koblet til SOC.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security (opdager alt i realtid).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel mail-alert",
          text: "+1 tid, -40 kr => +1 security, +5% risk (mails glemmes ofte).",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer personalet om, at alle handlinger logges (GDPR).",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrunden).",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Kun intern info",
          text: "0 tid => +5% risk (personalet overraskes).",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en log-strategi til CAB (NIS2, databeskyttelse, retention).",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
