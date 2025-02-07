window.cybersikkerhedTasks = [
  {
    title: "Opdatering af Antivirus-løsning",
    shortDesc: "Det nuværende antivirusprogram fanger ikke moderne trusler.",
    narrativeIntro: `
      Flere systemer er blevet inficeret med malware, og det nuværende antivirus er forældet. En opdatering er nødvendig for at beskytte netværket mod nye trusler.
    `,
    glossaryTerms: ["Antivirus", "Malware", "Heuristik"],
    digDeeperLinks: [
      { 
        label: "Antivirus Teknologi", 
        text: "Moderne antivirusprogrammer anvender heuristik og maskinlæring til at opdage nye trusler, hvilket giver en langt højere beskyttelsesrate end traditionelle signaturbaserede systemer." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Udfør en grundig analyse af den nuværende antivirusløsning.",
        stepContext: "En detaljeret analyse kan afdække, hvor systemet fejler, og hvilke trusler der ikke bliver opdaget af den nuværende løsning.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og implementer en opdateret antivirusløsning baseret på moderne trusselsdetektion.",
        stepContext: "Det er afgørende at vælge en løsning, der kan opdatere sig selv og håndtere både kendte og ukendte trusler effektivt.",
        choiceA: {
          label: "Avanceret antivirus",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard antivirus",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater antiviruspolitikker og brugervejledninger.",
        stepContext: "Grundig dokumentation sikrer, at personalet forstår de nye procedurer og korrekt implementerer den opdaterede antivirusløsning.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Implementering af SIEM",
    shortDesc: "Hospitalet mangler et effektivt SIEM-system til realtidsanalyse af logfiler.",
    narrativeIntro: `
      Sikkerhedsanalyser viser, at logfiler ikke bliver analyseret i realtid, hvilket fører til forsinket trusselsopdagelse. Et moderne SIEM-system kan samle og analysere logdata hurtigt.
    `,
    glossaryTerms: ["SIEM", "Log Management", "Realtidsanalyse"],
    digDeeperLinks: [
      { 
        label: "SIEM Funktioner", 
        text: "Moderne SIEM-systemer integrerer data fra flere kilder og bruger avancerede algoritmer til at opdage anomalier i realtid, hvilket muliggør hurtig respons." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et SIEM-system baseret på de nyeste teknologier.",
        stepContext: "Det rigtige SIEM-system skal kunne håndtere store mængder data og hurtigt opdage potentielle trusler.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard SIEM",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer SIEM-systemet med eksisterende netværk og servere.",
        stepContext: "En god integration sikrer, at data fra alle kilder bliver samlet og analyseret, hvilket forbedrer trusselsopdagelsen.",
        choiceA: {
          label: "Omfattende integration",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér SIEM-konfigurationen og procedurerne for alarmering.",
        stepContext: "Detaljeret dokumentation sikrer, at systemet anvendes korrekt og kan vedligeholdes i fremtiden.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Opgradering af IDS-system",
    shortDesc: "Det nuværende IDS overser trusler, hvilket skaber sårbarheder.",
    narrativeIntro: `
      Systemet til indtrængningsdetektion (IDS) er forældet og opdager ikke alle angreb. En opgradering med moderne sensorer er nødvendig for at øge netværkets sikkerhed.
    `,
    glossaryTerms: ["IDS", "Intrusion Detection", "Overvågning"],
    digDeeperLinks: [
      { 
        label: "Moderne IDS", 
        text: "Nye IDS-systemer benytter avancerede algoritmer og maskinlæring for at opdage anomalier i netværkstrafikken." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Evaluer det nuværende IDS for at identificere sårbarheder.",
        stepContext: "En grundig evaluering kan afdække, hvor IDS'en fejler, og hvad der skal forbedres for at beskytte systemet bedre.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader IDS-systemet med moderne sensorer og software.",
        stepContext: "Opgradering af IDS'en vil øge systemets evne til at opdage og reagere på angreb, men kræver investering i nyt udstyr.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisopgradering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen for IDS-konfiguration og vedligeholdelse.",
        stepContext: "God dokumentation er afgørende for at sikre, at den opgraderede IDS fungerer korrekt og kan vedligeholdes over tid.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Phishing-kampagne og Træning",
    shortDesc: "Medarbejdere klikker på falske links, hvilket øger risikoen for angreb.",
    narrativeIntro: `
      Hospitalet har oplevet flere phishing-angreb. En målrettet kampagne kombineret med træning kan reducere risikoen for social engineering.
    `,
    glossaryTerms: ["Phishing", "Social Engineering", "Awareness Training"],
    digDeeperLinks: [
      { 
        label: "Phishing Forebyggelse", 
        text: "Målrettet træning kan øge medarbejdernes evne til at genkende phishing-forsøg og dermed reducere risikoen for angreb." 
      }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål medarbejdernes nuværende viden om phishing gennem tests.",
        stepContext: "En evaluering kan afdække, hvor stor risikoen er, og hvor meget træning der er nødvendig for at reducere phishing-angreb.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemfør en phishing-simuleringskampagne for at træne medarbejderne.",
        stepContext: "Simuleringer kan hjælpe medarbejdere med at genkende mistænkelige e-mails og undgå klik på falske links.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis kampagne",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd og distribuer træningsmateriale mod phishing-angreb.",
        stepContext: "Detaljerede materialer og retningslinjer øger medarbejdernes bevidsthed og reducerer risikoen for angreb.",
        choiceA: {
          label: "Omfattende materialer",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Ransomware-forsvar: Offline Backups",
    shortDesc: "Online backups er sårbare over for ransomware-angreb.",
    narrativeIntro: `
      Ved et ransomware-angreb kan online backups blive krypteret. En offline backup-løsning sikrer, at kritiske data forbliver utilgængelige for angribere.
    `,
    glossaryTerms: ["Ransomware", "Backup", "Offline"],
    digDeeperLinks: [
      { 
        label: "Offline Backup", 
        text: "Offline eller immutable backups kan ikke ændres, selv hvis systemet kompromitteres, og sikrer dermed data kontinuitet." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de systemer, der kræver offline backup.",
        stepContext: "En detaljeret analyse sikrer, at de mest kritiske data bliver beskyttet mod ransomware-angreb.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer en dedikeret offline backup-løsning med specialiseret hardware.",
        stepContext: "En robust offline løsning beskytter data, selv hvis online systemerne kompromitteres.",
        choiceA: {
          label: "Omfattende løsning",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér backupprocedurer og lav regelmæssige tests af systemet.",
        stepContext: "Grundig dokumentation sikrer, at backup-processen overholdes og at systemet er testet for effektivitet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Implementering af MFA",
    shortDesc: "En opgradering til multifaktorautentificering øger beskyttelsen mod uautoriseret adgang.",
    narrativeIntro: `
      Hospitalet ønsker at styrke sikkerheden ved at implementere en avanceret MFA-løsning med flere autentificeringsfaktorer.
    `,
    glossaryTerms: ["MFA", "Two-Factor Authentication", "Access Control"],
    digDeeperLinks: [
      { 
        label: "MFA Fordele", 
        text: "Moderne MFA-løsninger kombinerer flere faktorer (fx mobilbekræftelse, biometrik) for at sikre, at kun autoriserede brugere får adgang til systemerne." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Evaluer den nuværende MFA-løsning og identificer forbedringsmuligheder.",
        stepContext: "En grundig evaluering kan afdække, hvor den nuværende løsning fejler i at beskytte mod uautoriseret adgang.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en avanceret MFA-løsning med flere autentificeringsmetoder.",
        stepContext: "En robust MFA-løsning integrerer flere faktorer, hvilket markant øger beskyttelsen mod angreb.",
        choiceA: {
          label: "Avanceret MFA",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard MFA",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér MFA-implementeringen og træn personalet i brugen af systemet.",
        stepContext: "Grundig dokumentation og oplæring sikrer, at MFA-løsningen anvendes korrekt og effektivt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Penetrationstest af Kritiske Systemer",
    shortDesc: "En ekstern penetrationstest kan afdække skjulte sårbarheder.",
    narrativeIntro: `
      Hospitalet ønsker at teste robustheden af sine systemer ved at få udført en eksternt ledet penetrationstest af de mest kritiske systemer.
    `,
    glossaryTerms: ["Penetrationstest", "Sårbarhedsscanning", "Ethical Hacking"],
    digDeeperLinks: [
      { 
        label: "Penetrationstest Metoder", 
        text: "Eksterne penetrationstestere anvender avancerede teknikker til at afdække sårbarheder, der ellers forbliver skjulte i systemet." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest kritiske systemer, der skal testes.",
        stepContext: "En detaljeret identifikation sikrer, at de mest sårbare systemer bliver underkastet en grundig test.",
        choiceA: {
          label: "Detaljeret identifikation",
          text: "+3 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig identifikation",
          text: "+1 sikkerhed, -2 udvikling",
          timeCost: 2,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemfør en ekstern penetrationstest af de udvalgte systemer.",
        stepContext: "En grundig test kan afdække sårbarheder, men kræver både tid og ressourcer.",
        choiceA: {
          label: "Ekstern test",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Intern test",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér testresultaterne og udarbejd en handlingsplan for sårbarheder.",
        stepContext: "En klar rapport sikrer, at de fundne sårbarheder bliver adresseret og udbedret hurtigt.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+0 sikkerhed, -1 udvikling",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 }, tradeOff: { development: -1 } }
        }
      }
    ]
  },
  {
    title: "Overvågning af Logfiler",
    shortDesc: "Effektiv logovervågning kan opdage trusler, før de udvikler sig til angreb.",
    narrativeIntro: `
      Hospitalet mangler et system til kontinuerligt at overvåge logfiler, hvilket gør det svært at opdage sikkerhedshændelser i tide.
    `,
    glossaryTerms: ["Log Management", "Anomalidetektion", "Overvågning"],
    digDeeperLinks: [
      { 
        label: "Log Overvågning", 
        text: "Avanceret logovervågning anvender algoritmer til at opdage uregelmæssigheder, så trusler kan identificeres og afhjælpes hurtigt." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer et system til kontinuerlig overvågning af logfiler.",
        stepContext: "En avanceret løsning kan identificere anomalier i realtid og advare om potentielle trusler.",
        choiceA: {
          label: "Avanceret overvågning",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard overvågning",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer logovervågning med eksisterende systemer for samlet dataanalyse.",
        stepContext: "Integration sikrer, at data fra alle kilder bliver analyseret, hvilket øger chancen for at opdage trusler tidligt.",
        choiceA: {
          label: "Fuld integration",
          text: "+2 sikkerhed, -1 udvikling",
          timeCost: 4,
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en manual for logovervågning og hændelsesrespons.",
        stepContext: "Detaljeret dokumentation sikrer, at overvågningsdata bliver brugt korrekt ved sikkerhedshændelser.",
        choiceA: {
          label: "Omfattende manual",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort manual",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Håndtering af Zero-Day Sårbarheder",
    shortDesc: "Zero-day sårbarheder kan udnyttes, før en patch er tilgængelig.",
    narrativeIntro: `
      Hospitalets systemer er sårbare over for ukendte zero-day angreb. En hurtig scanning og respons er nødvendig for at minimere risikoen.
    `,
    glossaryTerms: ["Zero-Day", "Exploit", "Patch Management"],
    digDeeperLinks: [
      { 
        label: "Zero-Day Strategi", 
        text: "En effektiv zero-day strategi involverer kontinuerlig scanning og hurtig patching, så selv ukendte sårbarheder opdages og adresseres." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer løbende scanning for at opdage zero-day trusler.",
        stepContext: "En detaljeret scanning kan identificere sårbarheder, før de udnyttes af angribere.",
        choiceA: {
          label: "Regelmæssig scanning",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Manuel tjek",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemfør en compliance-check for zero-day håndtering.",
        stepContext: "Compliance-check kan sikre, at alle sikkerhedsforanstaltninger er på plads, selvom det kan tage ekstra tid.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en handlingsplan for hurtig patching ved zero-day angreb.",
        stepContext: "En klar plan sikrer, at opdagede sårbarheder hurtigt bliver adresseret og rettet.",
        choiceA: {
          label: "Omfattende plan",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort plan",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Kryptering af Data under Transport",
    shortDesc: "Følsomme data sendes ofte uden kryptering.",
    narrativeIntro: `
      Data, der sendes i klartekst, udgør en stor sikkerhedsrisiko. En stærk krypteringsløsning sikrer, at data kun kan tilgås af autoriserede parter.
    `,
    glossaryTerms: ["Kryptering", "TLS/SSL", "End-to-End Encryption"],
    digDeeperLinks: [
      { 
        label: "Krypteringsmetoder", 
        text: "Stærk kryptering beskytter data under transport ved at sikre, at information kun kan dekrypteres af autoriserede brugere." 
      }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de dataoverførsler, der sker uden kryptering.",
        stepContext: "En detaljeret analyse kan afdække, hvilke forbindelser der skal sikres med kryptering.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer TLS/SSL eller en anden krypteringsprotokol til dataoverførsler.",
        stepContext: "Valget af krypteringsprotokol skal matche datatypen og være robust nok til at modstå angreb.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+3 sikkerhed, -2 udvikling",
          timeCost: 5,
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis TLS",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye krypteringsprocedurer og opdater sikkerhedspolitikker.",
        stepContext: "Omfattende dokumentation sikrer, at krypteringsløsningen bliver korrekt implementeret og vedligeholdt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          timeCost: 3,
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          timeCost: 1,
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  }
];
