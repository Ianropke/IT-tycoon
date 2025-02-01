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
      En driftstekniker har bemærket mistænkelig trafik. Hackere scanner åbne porte, og personalet håber, at du kan sikre netværket, så patientdata ikke kompromitteres.
    `,
    learningInfo: `
      Læringspunkt: Et IDS/IPS-system er essentielt for tidlig opdagelse af ondsindet trafik. Ved at implementere et sådant system reduceres risikoen for, at hackere udnytter sårbarheder. Det er også vigtigt at dokumentere installationen for at opfylde NIS2-kravene.
    `,
    knowledgeRecap: `
      Et IDS/IPS hjælper med at fange ondsindet trafik tidligt. Hvis man ignorerer det, kan hackere udnytte sårbarheder ubemærket. God dokumentation letter compliance ved fx NIS2-inspektion.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest sårbare netsegmenter og planlæg en scanning.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security (flere huller afsløres).",
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
        stepDescription: "Dokumentér IDS/IPS implementeringen (NIS2 + GDPR art.32) til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
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
    title: "Phishing- og Ransomware-forsvar",
    shortDesc: "Træn personalet mod phishing og undgå ransomware (GDPR-compliance).",
    logicLong: `
      Kriminelle bruger ofte phishing til at snige ransomware ind. Du planlægger en træningskampagne og EDR (Endpoint Detection & Response) for at minimere risiko.
    `,
    narrativeIntro: `
      Flere medarbejdere rapporterer mistænkelige mails. En kollega har klikket på et link, og nu frygter de ransomware.
    `,
    learningInfo: `
      Læringspunkt: Ved at træne personalet i at genkende phishing-mails og implementere EDR, kan man hurtigt opdage og blokere ransomware-angreb. Det er vigtigt at have en klar kommunikationsplan og dokumentere de trufne foranstaltninger.
    `,
    knowledgeRecap: `
      Ved at træne personale i at spotte phishing og have EDR installeret, kan man opdage og blokere ransomware tidligt. Uden dokumentation ved CAB ikke, hvordan man håndterer hændelserne.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg phishing-kampagne og udrul EDR på arbejdsstationer.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security (flere afdelinger dækkes).",
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Begrænset indsats",
          text: "+1 tid, -20 kr => +1 security, +5% risk (nogle overses).",
          applyEffect: { timeCost: 1, moneyCost: 20, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afhold kurser om phishing- og ransomware-risiko, informér om EDR.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction (trygge medarbejdere).",
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
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Overfladisk dokumentation",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Zero Trust-strategi",
    shortDesc: "Indfør Zero Trust med segmentering og 'mindste privilegie' (NIS2/GDPR).",
    logicLong: `
      Zero Trust betyder, at ingen enheder eller brugere automatisk får tillid. Alt kontrolleres. Selvom personalet klager over flere logintrin, stiger sikkerheden markant.
    `,
    narrativeIntro: `
      Nogle afdelinger føler sig tynget af strenge adgangsregler, men erfaringer fra andre hospitaler viser, at Zero Trust kan begrænse skader ved angreb.
    `,
    learningInfo: `
      Læringspunkt: Zero Trust kræver, at alle anmodninger valideres. Dette mindsker risikoen for store kompromitteringer, men det er vigtigt at have en klar dokumentation, så både interne og eksterne audits kan gennemføres.
    `,
    knowledgeRecap: `
      Ved Zero Trust segmenteres netværket og al adgang kontrolleres. Dette mindsker risikoen for store kompromitteringer, men kræver nøje dokumentation for at bestå audits.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg net-segmentering og mindste priviliegeregler for alle brugere.",
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid => +2 security (stærk segmentering).",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk (dele af net er åbne).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Hold info-møder med personalet om de nye adgangskrav.",
        choiceA: {
          label: "Udførlig information",
          text: "+2 tid => +2 hospitalSatisfaction (bedre forståelse).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen information",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (folk omgår systemet).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér Zero Trust-design og eventuel DPIA til CAB.",
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen ekstra risk.",
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
      Et nyligt forsøg på indbrud viste, at den gamle firewall ikke kan blokere moderne trusler. Personalet oplever også periodiske nedetider, som en HA-løsning kunne mindske.
    `,
    learningInfo: `
      Læringspunkt: Opgradering af firewalls med moderne DPI-teknologi øger systemets sikkerhed betydeligt. En grundig test er nødvendig for at undgå utilsigtede åbninger, og en detaljeret dokumentation er afgørende for at opfylde NIS2.
    `,
    knowledgeRecap: `
      En opdateret firewall med DPI kan forhindre mange angreb. Uden en ordentlig test risikerer man utilsigtede porte. Dokumentation viser, hvordan systemet er konfigureret.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg firewall-sårbarheder og kør en sårbarhedsscanning.",
        choiceA: {
          label: "Dyb inspektion",
          text: "+3 tid, -100 kr => +2 security (flere fejl rettes).",
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
    title: "Dataovervågning & Log-analyse (SIEM)",
    shortDesc: "Implementér SIEM for realtidslogning og overhold NIS2.",
    logicLong: `
      Et SIEM samler logs fra netværk, servere og applikationer, så du kan opdage unormale mønstre hurtigt. NIS2 kræver bedre indsigt i hændelser.
    `,
    narrativeIntro: `
      Du får besked om mystiske netforbindelser – et SIEM-system kunne have givet alarm i realtid, men det kræver betydelige ressourcer.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SIEM-system centraliserer logdata og muliggør hurtig respons på hændelser. Dokumentation af logstrategien er afgørende for compliance og effektiv fejlfinding.
    `,
    knowledgeRecap: `
      Med central loganalyse fanger du mistænkelige aktiviteter hurtigt. Uden dokumentation ved man ikke, hvilke logs der opsamles, og compliance bliver svær at demonstrere.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en SIEM-løsning og definer de primære logkilder (net, endpoints, AD).",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr => +2 security (realtidsanalyse).",
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
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre etisk hackerteam til at teste LIMS. Undgå ukendte huller.",
    logicLong: `
      For at afsløre reelle sårbarheder hyrer du et eksternt penetrationstest-hold, som kan simulere angreb på LIMS og netværk. Leverandørmoduler skal også tjekkes.
    `,
    narrativeIntro: `
      Rygtet siger, at en tidligere pen-test fandt kritiske fejl. Personalet er nervøse, men det er bedre at vide det nu end at vente på hackere.
    `,
    learningInfo: `
      Læringspunkt: Penetrationstests er essentielle for at afdække skjulte sårbarheder. En detaljeret rapport hjælper med at prioritere sikkerhedsforbedringer og sikre, at alle områder er dækket.
    `,
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. Hvis omfanget er for snævert, kan vigtige moduler overses. Dokumentation er kritisk for at rette fejlene.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test med et bredt scope (web, net, OS, social engineering).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du afdækker alt).",
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
        stepDescription: "Lav en detaljeret pen-test rapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk, +1 security (fejl rettes).",
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
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør MFA for at opfylde NIS2/GDPR om stærk godkendelse.",
    logicLong: `
      Hospitalets ansatte bruger kun password. MFA mindsker risikoen for kompromittering af konti, men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      En overlæge har vist, at simple kodeord kan udgøre en stor risiko. MFA forhindrer, at kun password stjæles.
    `,
    learningInfo: `
      Læringspunkt: Implementering af MFA tilføjer et ekstra lag sikkerhed. Ved at vælge en robust løsning (f.eks. en app) kan man betydeligt reducere risikoen for phishing-angreb og kontobrud.
    `,
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed. Uden korrekt dokumentation risikerer man, at systemet fejler, og CAB afviser løsningen.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (app, token, SMS) til hospitalets ansatte.",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security (meget robust).",
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
        stepDescription: "Dokumentér MFA-planen til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid => ingen ekstra risk",
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
    title: "Monitoring og Alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtidslogning og overhold NIS2.",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, fordi de overser dem. Et effektivt SOC-system kan redde situationen.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SOC-system centraliserer alarmer og logdata, så man hurtigt kan reagere på trusler. En god strategi og dokumentation er nøglen til compliance.
    `,
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, kan stoppe hændelser før de eskalerer. Uden dokumentation ved man ikke, hvilke logs der opsamles, og compliance bliver svær at demonstrere.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg system for realtidsalarmer (Slack, sms, XDR?) koblet til SOC.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security (opdager alt i realtid).",
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
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrund).",
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
        stepDescription: "Dokumentér log-strategien til CAB.",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
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
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre etisk hackerteam til at teste LIMS. Undgå ukendte huller.",
    logicLong: `
      For at afsløre reelle sårbarheder hyrer du et eksternt penetrationstest-hold, som kan simulere angreb på LIMS og netværk. Leverandørmoduler skal også tjekkes.
    `,
    narrativeIntro: `
      Rygtet siger, at en tidligere pen-test fandt kritiske fejl. Personalet er nervøse, men det er bedre at vide det nu end at vente på hackere.
    `,
    learningInfo: `
      Læringspunkt: Penetrationstest er en vigtig metode til at identificere skjulte sårbarheder. En detaljeret rapport hjælper med at prioritere sikkerhedsforbedringer.
    `,
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. Hvis omfanget er for snævert, kan vigtige moduler overses. Dokumentation er kritisk for at rette fejlene.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test med et bredt scope (web, net, OS, social engineering).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du afdækker alt).",
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
        stepDescription: "Lav en detaljeret pen-test rapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk, +1 security (fejl rettes).",
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
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør MFA for at opfylde NIS2/GDPR om stærk godkendelse.",
    logicLong: `
      Hospitalets ansatte bruger kun password. MFA mindsker risiko for kompromittering af konti, men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      En overlæge har demonstreret, at simple kodeord udgør en stor risiko. MFA forhindrer, at kun password stjæles.
    `,
    learningInfo: `
      Læringspunkt: MFA tilføjer et ekstra lag af sikkerhed. Ved at vælge en løsning med f.eks. en autentificeringsapp reduceres risikoen for phishing-angreb markant. Dokumentationen skal vise, hvordan MFA integreres i systemet.
    `,
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed, men uden korrekt dokumentation risikerer systemet at blive afvist af CAB.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (app, token, SMS) til hospitalets ansatte.",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security (meget robust).",
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
        stepDescription: "Dokumentér MFA-planen til CAB med detaljerede retningslinjer.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid => ingen ekstra risk",
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
    title: "Monitoring og Alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtidslogning og overhold NIS2.",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, og derfor kan et effektivt SOC-system redde situationen ved kritiske hændelser.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SOC-system centraliserer logdata og alarmer, hvilket gør det muligt hurtigt at reagere på sikkerhedstrusler. Det er vigtigt at have en detaljeret plan og dokumentation.
    `,
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, kan stoppe hændelser før de eskalerer. Uden dokumentation ved man ikke, hvilke logs der opsamles, og compliance bliver svær at demonstrere.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg system for realtidsalarmer (Slack, sms, XDR?) koblet til SOC.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security (opdager alt i realtid).",
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
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrund).",
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
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre etisk hackerteam til at teste LIMS. Undgå ukendte huller.",
    logicLong: `
      For at afsløre reelle sårbarheder hyrer du et eksternt penetrationstest-hold, som kan simulere angreb på LIMS og netværk. Leverandørmoduler skal også tjekkes.
    `,
    narrativeIntro: `
      Rygtet siger, at en tidligere pen-test fandt kritiske fejl. Personalet er nervøse, men det er bedre at vide det nu end at vente på hackere.
    `,
    learningInfo: `
      Læringspunkt: En grundig penetrationstest afslører skjulte sårbarheder og hjælper med at prioritere sikkerhedsforbedringer. Det er vigtigt at udarbejde en detaljeret rapport, der dokumenterer alle fund.
    `,
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. Afgrænset scope kan medføre, at vigtige områder overses. Dokumentationen er essentiel for at rette fejl.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test med et bredt scope (web, net, OS, social engineering).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du afdækker alt).",
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
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør MFA for at opfylde NIS2/GDPR om stærk godkendelse.",
    logicLong: `
      Hospitalets ansatte bruger kun password. MFA mindsker risiko for kompromittering af brugerkonti markant, men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      En overlæge har vist, at simple kodeord udgør en stor risiko. MFA forhindrer, at kun password stjæles.
    `,
    learningInfo: `
      Læringspunkt: Ved implementering af MFA tilføjes et ekstra sikkerhedslag. Det er vigtigt at vælge en løsning, der balancerer brugervenlighed og sikkerhed, og at dokumentere integrationen grundigt.
    `,
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed, men uden korrekt dokumentation kan implementeringen blive problematisk.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (app, token, SMS) til hospitalets ansatte.",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security (meget robust).",
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
    title: "Monitoring og Alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtidslogning og overhold NIS2.",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, og et effektivt SOC-system kan derfor redde situationen ved kritiske hændelser.
    `,
    learningInfo: `
      Læringspunkt: Et velfungerende SOC-system centraliserer alarmer og logdata, hvilket gør det muligt hurtigt at reagere på trusler. En detaljeret plan og dokumentation er afgørende for compliance.
    `,
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, kan stoppe hændelser før de eskalerer. Uden dokumentation ved man ikke, hvilke logs der opsamles, og compliance bliver svær at demonstrere.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg system for realtidsalarmer (Slack, sms, XDR?) koblet til SOC.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security (opdager alt i realtid).",
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
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrund).",
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
    title: "Penetrationstest af LIMS",
    shortDesc: "Hyre etisk hackerteam til at teste LIMS. Undgå ukendte huller.",
    logicLong: `
      For at afsløre reelle sårbarheder hyrer du et eksternt penetrationstest-hold, som kan simulere angreb på LIMS og netværk. Leverandørmoduler skal også tjekkes.
    `,
    narrativeIntro: `
      Rygtet siger, at en tidligere pen-test fandt kritiske fejl. Personalet er nervøse, men det er bedre at vide det nu end at vente på hackere.
    `,
    learningInfo: `
      Læringspunkt: En grundig penetrationstest afdækker skjulte sårbarheder og er essentiel for at styrke systemets sikkerhed. En detaljeret rapport sikrer, at alle fund bliver adresseret.
    `,
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. Hvis omfanget er for snævert, overses vigtige moduler. Dokumentation er afgørende for at rette fejlene.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test med et bredt scope (web, net, OS, social engineering).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du afdækker alt).",
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
    title: "Multi-factor Authentication (MFA)",
    shortDesc: "Indfør MFA for at opfylde NIS2/GDPR om stærk godkendelse.",
    logicLong: `
      Hospitalets ansatte bruger kun password. MFA mindsker risiko for kompromittering af brugerkonti markant, men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      En overlæge har vist, at simple kodeord udgør en stor risiko. MFA forhindrer, at kun password stjæles.
    `,
    learningInfo: `
      Læringspunkt: Implementering af MFA tilføjer et ekstra sikkerhedslag. Det er vigtigt at vælge en brugervenlig løsning, der samtidig øger sikkerheden, og at dokumentationen er detaljeret.
    `,
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed. Uden korrekt dokumentation kan implementeringen blive problematisk, hvilket kan medføre afvisning af CAB.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg MFA-metode (app, token, SMS) til hospitalets ansatte.",
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security (meget robust).",
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
    title: "Monitoring og Alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtidslogning og overhold NIS2.",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      Personalet modtager sjældent alarmer, og et effektivt SOC-system kan derfor redde kritiske situationer.
    `,
    learningInfo: `
      Læringspunkt: Et effektivt SOC-system centraliserer logdata og alarmer, så sikkerhedshændelser hurtigt kan identificeres og håndteres. Dokumentationen af strategien er central for compliance.
    `,
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, kan stoppe hændelser, før de eskalerer. Uden dokumentation ved man ikke, hvilke logs der opsamles.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg system for realtidsalarmer (Slack, sms, XDR?) koblet til SOC.",
        choiceA: {
          label: "Avanceret platform",
          text: "+3 tid, -120 kr => +2 security (opdager alt i realtid).",
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
