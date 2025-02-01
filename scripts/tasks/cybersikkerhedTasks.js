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
      "En driftstekniker har bemærket mistænkelig trafik. 
       Angiveligt scanner hackere åbne porte. 
       Personalet håber, du kan sikre netværket, 
       så patientdata ikke kompromitteres."
    `,
    digDeeperLinks: [
      { label: "NIS2 Direktiv Oversigt", url: "https://example.com/nis2-dk" },
      { label: "ISO 27001 & IDS", url: "https://example.com/iso27001-ids-dk" }
    ],
    knowledgeRecap: `
      Et IDS/IPS hjælper med at fange ondsindet trafik tidligt. 
      Hvis man ignorerer det, kan hackere udnytte sårbarheder ubemærket. 
      God dokumentation letter compliance ved fx NIS2-inspektion.
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
          text: "+1 tid, -50 kr => +1 stability, +5% risk (konfigurationsfejl?).",
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
          label: "Minimal doc",
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
      Kriminelle bruger ofte phishing til at snige ransomware ind. 
      Du planlægger en træningskampagne og EDR (Endpoint Detection & Response) 
      for at minimere risiko.
    `,
    narrativeIntro: `
      "Flere medarbejdere rapporterer mistænkelige mails. 
       En kollega har klikket på et link, og nu frygter de ransomware. 
       Du indfører proaktiv forsvar."
    `,
    digDeeperLinks: [
      { label: "Ransomware og GDPR", url: "https://example.com/gdpr-ransomware-dk" },
      { label: "EDR Forklaring", url: "https://example.com/edr-guide-dk" }
    ],
    knowledgeRecap: `
      Ved at træne personale i at spotte phishing 
      og have EDR installeret, kan man opdage og blokere ransomware tidligt. 
      Uden dokumentation ved CAB ikke, hvordan man håndterer hændelserne.
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
          label: "Overfladisk doc",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Zero Trust-strategi",
    shortDesc: "Indfør Zero Trust med segmentering og “mindste privilegie” (NIS2/GDPR).",
    logicLong: `
      Zero Trust betyder, at ingen enheder eller brugere 
      automatisk får tillid. Alt kontrolleres. Personalet klager over 
      flere logintrin, men sikkerheden stiger markant.
    `,
    narrativeIntro: `
      "Nogle afdelinger føler sig tynget af MFA, 
       netopdeling og strenge adgangsregler. 
       Men en nylig hændelse hos et andet hospital 
       viser, at Zero Trust kan stoppe spredning af malware."
    `,
    digDeeperLinks: [
      { label: "Zero Trust i Sundhedssektoren", url: "https://example.com/zerotrust-dk" },
      { label: "GDPR og Security by Design", url: "https://example.com/gdpr-secdes-dk" }
    ],
    knowledgeRecap: `
      Ved Zero Trust segmenterer man netværket og kræver verifikation 
      for alt. Det kan forhindre store kompromitteringer. 
      Men dokumentation skal vise præcis, hvordan segmentering er sat op,
      fx til NIS2-audit.
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
        stepDescription: "Personalet brokker sig over ekstra login - hold info-møder.",
        choiceA: {
          label: "Forklar baggrunden",
          text: "+2 tid => +2 hospitalSatisfaction (forståelse for sikkerhed).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ignorér klager",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (folk omgår systemet).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se Zero Trust-design, netopdeling og eventuel DPIA.",
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring doc over",
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
      Hospitalets nuværende firewall er forældet, 
      med begrænsede regler. Du vil installere en next-gen firewall 
      med DPI (deep packet inspection) og høj tilgængelighed (HA).
    `,
    narrativeIntro: `
      "Et nyligt forsøg på indbrud viste, at den gamle firewall 
       ikke kan blokere moderne trusler. Samtidig klager personalet 
       over periodiske nedetider, som en HA-løsning kunne mindske."
    `,
    digDeeperLinks: [
      { label: "NGFW Oversigt", url: "https://example.com/ngfw-dk" },
      { label: "NIS2 Firewall-krav", url: "https://example.com/nis2-firewall-dk" }
    ],
    knowledgeRecap: `
      En opdateret firewall med DPI kan forhindre mange angreb. 
      Uden en ordentlig test risikerer man at åbne utilsigtede porte. 
      Dokumentation gør, at CAB forstår konfigurationen 
      og at man opfylder NIS2.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg firewall-sårbarheder, kør sårbarhedsscanning.",
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
        stepDescription: "Test ny firewall mod servere, evt. i HA-cluster.",
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
        stepDescription: "Lav opgraderingsrapport til CAB (ISO 27001/NIS2).",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring dok over",
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
      Et SIEM samler logs fra netværk, servere og applikationer, 
      så du kan opdage unormale mønstre hurtigt. NIS2 kræver 
      bedre indsigt i hændelser.
    `,
    narrativeIntro: `
      "Du får besked om mystiske netforbindelser. 
       Et SIEM-system kunne have givet alarm i realtid. 
       Ledelsen bakker op, men det koster serverkraft og licenser."
    `,
    digDeeperLinks: [
      { label: "SIEM Forklaring", url: "https://example.com/siem-dk" },
      { label: "NIS2 Logningskrav", url: "https://example.com/nis2-logning-dk" }
    ],
    knowledgeRecap: `
      Med central loganalyse fanger du mistænkelige aktiviteter, 
      fx datalæk, i opløbet. Uden doc ved man ikke, 
      hvilke logs der opsamles, og compliance bliver svær at demonstrere 
      ved revision.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg SIEM-løsning og definer logkilder (net, endpoints, AD).",
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
        stepDescription: "Fortæl personale, at handlinger logges (GDPR transparens).",
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction (folk forstår baggrund).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Kun info til IT-afdeling",
          text: "0 tid => +5% risk (personalet overraskes).",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se log-strategi (NIS2, databeskyttelse, retention).",
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dok",
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
      For at afsløre reelle sårbarheder, hyrer du et eksternt 
      penetrationstest-hold. De kan simulere angreb på LIMS 
      og netværk. Forudser du leverandørmoduler, 
      skal de også tjekkes.
    `,
    narrativeIntro: `
      "Rygtet siger, at en tidligere pen-test i et andet hospital 
       fandt kritiske fejl. Personalet er nervøse, 
       men det er bedre at vide det nu end at vente på rigtige hackere."
    `,
    digDeeperLinks: [
      { label: "Pen-test Metoder", url: "https://example.com/pen-test-dk" },
      { label: "NIS2 og Etisk Hacking", url: "https://example.com/nis2-ethack-dk" }
    ],
    knowledgeRecap: `
      En pen-test belyser svagheder, før hackere udnytter dem. 
      Afgrænser du scope for meget, kan leverandørmoduler 
      forblive usikre. Dokumentation af resultaterne 
      er kritisk for at få dem rettet.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg pen-test: scope (web, net, OS, social engineering?).",
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security (du finder alt).",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Smalt scope",
          text: "+1 tid, -50 kr => +1 security, +5% risk (mange dele overses).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Test leverandørens moduler for supply chain-risiko.",
        choiceA: {
          label: "Kræv leverandørens medvirken",
          text: "+2 tid, -80 kr => synergyEffect:{ rushedJura:false}, +1 security",
          applyEffect: { timeCost: 2, moneyCost: 80, synergyEffect: { rushedJura: false }, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Kun hospitalets del",
          text: "+1 tid => +5% risk (leverandørdelen forbliver usikret).",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lav en pen-test rapport til CAB med fundne sårbarheder.",
        choiceA: {
          label: "Detaljeret",
          text: "+2 tid => ingen ekstra risk, +1 security (fund rettes).",
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal doc",
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
      Hospitalets ansatte bruger kun password. MFA mindsker risiko 
      for kompromittering af brugerkonti markant. 
      Men nogle finder det omstændeligt.
    `,
    narrativeIntro: `
      "En overlæge brugte 'hospital123' som kode. 
       Nu frygter I en potentiel læk. 
       MFA kan forhindre fremtidige brud, 
       men kræver øget login-rutine."
    `,
    digDeeperLinks: [
      { label: "MFA Oversigt", url: "https://example.com/mfa-dk" },
      { label: "NIS2 Krav om Godkendelse", url: "https://example.com/nis2-auth-dk" }
    ],
    knowledgeRecap: `
      MFA giver et ekstra lag sikkerhed. Ved phishing 
      kan hackerne kun stjæle passwordet, 
      men ikke passere MFA. Uden korrekt dok risikerer du 
      dårlig implementering og CAB-afvisning.
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
          text: "+1 tid, -30 kr => +1 security, +5% risk (muligt misbrug af SIM).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Forklar personalet vigtigheden af ekstra logintrin.",
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
        stepDescription: "CAB kræver en udførlig MFA-plan, herunder retningslinjer og fallback.",
        choiceA: {
          label: "Detaljeret doc",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Monitoring og Alerting (SOC-integration)",
    shortDesc: "Automatisér alarmer i realtid, knyt til Security Operations Center (SOC).",
    logicLong: `
      Hurtig opdagelse er afgørende for at stoppe et angreb. 
      Du vil opsætte et alert-system, der kan kontakte en SOC (24/7-overvågning). 
      NIS2 anbefaler prompt hændelseshåndtering.
    `,
    narrativeIntro: `
      "Der kommer stadig meldinger om oversete advarsler, 
       fordi personalet ikke tjekker mail. 
       Et pop-up system eller SOC-kobling kunne redde dagen 
       ved kritiske hændelser."
    `,
    digDeeperLinks: [
      { label: "SOC Opsætning", url: "https://example.com/soc-setup-dk" },
      { label: "XDR vs. SOC", url: "https://example.com/xdr-soc-dk" }
    ],
    knowledgeRecap: `
      Et automatiseret alarmsystem, integreret med en SOC, 
      kan stoppe incidents før de eskalerer. Uden doc eller 
      ordentlig net-kapacitet risikerer man fejlalarmer 
      eller ingen alarmer ved rigtige brud.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg system for realtidsalarmer (Slack, sms, XDR?), koblet til SOC.",
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
        location: "infrastruktur",
        stepDescription: "Tjek om netværket kan håndtere løbende monitorering og alarmdata.",
        choiceA: {
          label: "Ydelsestest",
          text: "+2 tid, -80 kr => +2 stability (ingen overload).",
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Ingen test",
          text: "0 tid => synergyEffect:{lackInfra:true}, +5% risk",
          applyEffect: { synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se alarmkonfiguration og SOC-aftale, relevant for NIS2.",
        choiceA: {
          label: "Fuld beskrivelse",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Cloud-sårbarhedsscanning",
    shortDesc: "Scan cloud-miljø for at undgå supply chain-angreb, opfyld NIS2.",
    logicLong: `
      Hospitalet har dele af LIMS i skyen (AWS/Azure). 
      Du vil gennemføre en grundig scanning 
      for at finde sårbarheder og undgå supply chain-risici. 
      Samt sikre databehandleraftaler.
    `,
    narrativeIntro: `
      "En nyhed om et større cloud-nedbrud får folk til at spørge: 
       'Er vores LIMS også i fare?' 
       Du vil scanne cloudmiljøet for huller, 
       så hospitalet ikke overraskes."
    `,
    digDeeperLinks: [
      { label: "Supply Chain Attack i Cloud", url: "https://example.com/supplychain-cloud-dk" },
      { label: "SBOM (Software Bill of Materials)", url: "https://example.com/sbom-dk" }
    ],
    knowledgeRecap: `
      Cloud-løsninger kan være sårbare, især hvis leverandørled 
      angribes. Grundig scanning og aftaler om databehandler 
      mindsker risiko. Uden doc er det svært at vise, 
      at man har taget tilstrækkelige skridt ift. NIS2/GDPR.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg scanning af cloud (containere, net, SBOM).",
        choiceA: {
          label: "Grundig scanning",
          text: "+3 tid, -100 kr => +2 security (du finder huller).",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scan",
          text: "+1 tid, -30 kr => +1 security, +5% risk (kan overse kritiske dele).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Opdatér databehandleraftale, få scanningstilladelse til hele cloudmiljøet.",
        choiceA: {
          label: "Fuld adgang",
          text: "+2 tid => synergyEffect:{ rushedJura:false }, +1 security",
          applyEffect: { timeCost: 2, synergyEffect: { rushedJura: false }, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Begrænset adgang",
          text: "0 tid => +5% risk (ukendte dele forbliver usikre).",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se cloud-scan rapport, evt. DPIA hvis persondata i skyen.",
        choiceA: {
          label: "Udførlig doc",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
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
    title: "Adgangsstyring for eksterne (mindste privilegie)",
    shortDesc: "Skærp ekstern adgang til LIMS, giv kun nødvendig rolle, lav audit trail.",
    logicLong: `
      Hospitalet har mange eksterne konsulenter og leverandører. 
      De har ofte for bred adgang. Du vil implementere 
      mindst mulige rettigheder og fuld logning for at opdage misbrug.
    `,
    narrativeIntro: `
      "En ekstern konsulent havde adgang til hele LIMS i sidste uge. 
       Ingen opdagede det, førend man så mystiske logins. 
       Nu vil du stramme politikken, så roller og logging 
       sikrer sporing."
    `,
    digDeeperLinks: [
      { label: "DLP for Eksterne", url: "https://example.com/dlp-eksterne-dk" },
      { label: "Databehandleraftale Krav", url: "https://example.com/data-processor-dk" }
    ],
    knowledgeRecap: `
      Ved at indføre skrap adgangsstyring for eksterne minimerer du 
      insider-trusler og lever op til GDPR/NIS2. 
      Uden dokumentation kan 
      du ikke vise, hvem der har adgang til hvad, og CAB vil sandsynligvis afvise.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér moduler de eksterne faktisk skal bruge, evt. DLP.",
        choiceA: {
          label: "Dybt policy-check",
          text: "+3 tid => +2 security (overflødige rettigheder fjernes).",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kvik scanning",
          text: "+1 tid => +1 security, +5% risk (nogle har stadig for meget adgang).",
          applyEffect: { timeCost: 1, statChange: { security: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Opdatér kontrakt og databehandleraftale, så eksternes ansvar er klart.",
        choiceA: {
          label: "Grundig juridisk gennemgang",
          text: "+2 tid, -60 kr => +1 security, +1 stability",
          applyEffect: { timeCost: 2, moneyCost: 60, statChange: { security: 1, stability: 1 } }
        },
        choiceB: {
          label: "Standardvilkår",
          text: "0 tid => +5% risk, synergyEffect:{ rushedJura:true }",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { rushedJura: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en rapport om ekstern adgangsstyring, roller og logning.",
        choiceA: {
          label: "Fuld rapport",
          text: "+2 tid => ingen ekstra risk, +1 stability",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
