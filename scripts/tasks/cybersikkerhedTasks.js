window.cybersikkerhedTasks = [
  {
    title: "Opdatering af Antivirus-løsning",
    shortDesc: "Det nuværende antivirusprogram fanger ikke moderne trusler.",
    narrativeIntro: `
      "Flere systemer er blevet inficeret med malware, og antivirusprogrammet er forældet. En opdatering er nødvendig for at beskytte netværket."
    `,
    glossaryTerms: ["Antivirus", "Malware", "Signature-based scanning"],
    digDeeperLinks: [
      { label: "Antivirus Teknologi", text: "Læs om de nyeste teknologier inden for antivirus og trusselsdetektion." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Udfør en grundig analyse af den nuværende antivirusløsning.",
        stepContext: "En detaljeret analyse kan afsløre sårbarheder og ineffektiviteter i det nuværende antivirusprogram.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en opdateret antivirusløsning baseret på den nyeste teknologi.",
        stepContext: "Det er vigtigt at vælge en løsning, der kan håndtere moderne malware og opdateres regelmæssigt.",
        choiceA: {
          label: "Avanceret antivirus",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard antivirus",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen og retningslinjerne for antiviruspolitikker.",
        stepContext: "God dokumentation sikrer, at systemet bliver vedligeholdt korrekt og brugerne er opdaterede.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Implementering af SIEM",
    shortDesc: "Et effektivt SIEM-system er nødvendigt for at overvåge trusler i realtid.",
    narrativeIntro: `
      "Logfiler viser, at sikkerhedstrusler ikke opdages i tide. Et moderne SIEM-system kan samle og analysere data i realtid for at reagere hurtigere."
    `,
    glossaryTerms: ["SIEM", "Log Management", "Real-time Analysis"],
    digDeeperLinks: [
      { label: "SIEM Funktioner", text: "Læs om, hvordan SIEM-systemer fungerer og deres fordele." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og implementer et SIEM-system med avancerede overvågningsfunktioner.",
        stepContext: "En dybdegående evaluering af systemkravene er nødvendig for at vælge det rigtige SIEM-system.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard SIEM",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer SIEM-systemet med netværks- og serversystemer.",
        stepContext: "Integration sikrer, at data fra alle kilder analyseres og mulige trusler identificeres hurtigt.",
        choiceA: {
          label: "Omfattende integration",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér SIEM-konfiguration og analyseprocedurer.",
        stepContext: "God dokumentation er afgørende for at sikre, at SIEM-systemet bruges korrekt og kan vedligeholdes.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "IDS-Opgradering",
    shortDesc: "Det nuværende IDS er forældet og skal opgraderes for bedre indtrængningsdetektion.",
    narrativeIntro: `
      "Det eksisterende IDS overser flere angreb. En opgradering med moderne sensorer og software er nødvendig for at øge netværkets sikkerhed."
    `,
    glossaryTerms: ["IDS", "Intrusion Detection", "Overvågning"],
    digDeeperLinks: [
      { label: "IDS Teknologi", text: "Læs om de nyeste IDS-teknologier og hvordan de kan forbedre sikkerheden." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Evaluer det nuværende IDS og identificer svagheder i overvågningen.",
        stepContext: "En detaljeret evaluering kan afsløre, hvor IDS'en fejler, og hvilke forbedringer der er nødvendige.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader IDS med moderne sensorer og software til realtidsmonitorering.",
        stepContext: "Opgradering af IDS'en kan øge evnen til at opdage angreb, men kræver en investering i nyt udstyr.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisopgradering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye sikkerhedsfunktioner og konfigurationen af IDS.",
        stepContext: "Detaljeret dokumentation sikrer, at opgraderingerne implementeres korrekt og kan vedligeholdes.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Phishing-kampagne og Medarbejdertræning",
    shortDesc: "Medarbejdere klikker på phishing-links, hvilket øger risikoen for angreb.",
    narrativeIntro: `
      "Hospitalet har oplevet flere phishing-angreb. En målrettet kampagne kombineret med medarbejdertræning kan reducere risikoen betydeligt."
    `,
    glossaryTerms: ["Phishing", "Social Engineering", "Awareness Training"],
    digDeeperLinks: [
      { label: "Phishing Forebyggelse", text: "Lær om metoder til at træne medarbejdere i at genkende phishing-forsøg." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål medarbejdernes nuværende viden om phishing.",
        stepContext: "En grundig evaluering kan afsløre, hvor stor risikoen er for interne phishing-angreb.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en phishing-simuleringskampagne for at træne medarbejderne.",
        stepContext: "Simuleringer kan øge bevidstheden og hjælpe medarbejdere med at genkende mistænkelige e-mails.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis kampagne",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd træningsmateriale og retningslinjer mod phishing.",
        stepContext: "God dokumentation og oplæring sikrer, at medarbejderne er bedre rustet til at modstå phishing-angreb.",
        choiceA: {
          label: "Omfattende materialer",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Ransomware-forsvar med Offline Backups",
    shortDesc: "Online backups er sårbare for ransomware-angreb.",
    narrativeIntro: `
      "Ved et ransomware-angreb kan online backups krypteres. Implementer en offline backup-løsning for at sikre kritiske data."
    `,
    glossaryTerms: ["Ransomware", "Backup", "Offline"],
    digDeeperLinks: [
      { label: "Offline Backup", text: "Læs om fordelene ved offline eller immutable backups." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér systemer, der kræver offline backup.",
        stepContext: "En grundig analyse sikrer, at de mest kritiske systemer får den nødvendige backup-beskyttelse.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer en dedikeret offline backup-løsning med specialiseret hardware.",
        stepContext: "En dedikeret løsning kan beskytte data mod ransomware-angreb, selv hvis online systemerne kompromitteres.",
        choiceA: {
          label: "Omfattende løsning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basisløsning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér backupprocedurer og plan for regelmæssig test af systemerne.",
        stepContext: "Grundig dokumentation sikrer, at backup-processen følges og kan revideres ved behov.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "MFA-Implementering",
    shortDesc: "Opgrader MFA for at øge beskyttelsen mod uautoriseret adgang.",
    narrativeIntro: `
      "Hospitalet ønsker at styrke adgangssikkerheden ved at implementere en avanceret MFA-løsning med flere autentificeringsfaktorer."
    `,
    glossaryTerms: ["MFA", "Two-Factor Authentication", "Access Control"],
    digDeeperLinks: [
      { label: "MFA Fordele", text: "Læs om, hvordan MFA kan øge sikkerheden og beskytte mod uautoriseret adgang." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Evaluer den nuværende MFA-løsning og identificer områder til forbedring.",
        stepContext: "En grundig evaluering kan afsløre, hvor den nuværende løsning fejler, og hvad der skal optimeres.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en avanceret MFA-løsning med flere autentificeringsmetoder.",
        stepContext: "En robust MFA-løsning kræver integration af flere faktorer for at beskytte systemet optimalt.",
        choiceA: {
          label: "Avanceret MFA",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard MFA",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér implementeringen af den nye MFA-løsning og uddan personalet.",
        stepContext: "Detaljeret dokumentation og træning sikrer, at MFA-løsningen anvendes korrekt og sikkert.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
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
      "Hospitalet ønsker at teste robustheden af sine systemer ved at få udført en eksternt ledet penetrationstest af de mest kritiske systemer."
    `,
    glossaryTerms: ["Penetrationstest", "Sårbarhedsscanning", "Ethical Hacking"],
    digDeeperLinks: [
      { label: "Penetrationstest Metoder", text: "Læs om, hvordan penetrationstest kan afdække sikkerhedssvagheder og styrke systemerne." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest kritiske systemer, der skal testes.",
        stepContext: "En detaljeret identifikation sikrer, at de mest sårbare systemer bliver testet.",
        choiceA: {
          label: "Detaljeret identifikation",
          text: "+3 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Hurtig identifikation",
          text: "+1 sikkerhed, -2 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -2 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Bestil og gennemfør en ekstern penetrationstest.",
        stepContext: "En grundig test kan afdække skjulte sårbarheder, men kræver både tid og investering.",
        choiceA: {
          label: "Ekstern penetrationstest",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Intern test",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér resultaterne og udarbejd en handlingsplan baseret på testresultaterne.",
        stepContext: "En klar rapport sikrer, at de fundne sårbarheder bliver adresseret effektivt.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+0 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 0 }, tradeOff: { development: -1 } }
        }
      }
    ]
  },
  {
    title: "Overvågning af Logfiler",
    shortDesc: "Effektiv logovervågning kan opdage trusler i tide.",
    narrativeIntro: `
      "Hospitalet mangler et system til kontinuerligt at overvåge logfiler, hvilket gør det svært at opdage sikkerhedshændelser i tide."
    `,
    glossaryTerms: ["Log Management", "Anomalidetektion", "Overvågning"],
    digDeeperLinks: [
      { label: "Log Overvågning", text: "Lær om, hvordan et avanceret overvågningssystem kan opdage uregelmæssigheder." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer en løsning til kontinuerlig overvågning af systemlogfiler.",
        stepContext: "En avanceret overvågningsløsning kan identificere trusler, før de udvikler sig til større problemer.",
        choiceA: {
          label: "Avanceret overvågning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Standard overvågning",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd retningslinjer for logovervågning og hændelsesrespons.",
        stepContext: "God dokumentation sikrer, at systemet reagerer hurtigt på sikkerhedshændelser.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer logovervågning med eksisterende sikkerhedssystemer for hurtig respons.",
        stepContext: "Sikker integration sikrer, at overvågningsdata bliver brugt effektivt til at forhindre angreb.",
        choiceA: {
          label: "Fuld integration",
          text: "+2 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 2 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      }
    ]
  },
  {
    title: "Håndtering af Zero-Day Sårbarheder",
    shortDesc: "Zero-day sårbarheder kan udnyttes, før en patch er tilgængelig.",
    narrativeIntro: `
      "Hospitalets systemer er sårbare over for ukendte zero-day angreb. En hurtig reaktion og grundig analyse er nødvendig for at reducere risikoen."
    `,
    glossaryTerms: ["Zero-Day", "Exploit", "Patch Management"],
    digDeeperLinks: [
      { label: "Zero-Day Beskyttelse", text: "Læs om, hvordan zero-day sårbarheder kan håndteres effektivt." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer løbende sårbarhedsscanning for at opdage zero-day trusler.",
        stepContext: "En detaljeret scanning kan identificere ukendte sårbarheder, før de udnyttes af angribere.",
        choiceA: {
          label: "Regelmæssig scanning",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Manuel tjek",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek juridiske forpligtelser og compliance i forbindelse med zero-day angreb.",
        stepContext: "Compliance-checks kan reducere den juridiske risiko, men kan også påvirke reaktionstiden.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater procedurer for hurtig patching og zero-day respons.",
        stepContext: "God dokumentation af incident response er kritisk for at minimere skader ved et zero-day angreb.",
        choiceA: {
          label: "Omfattende procedurer",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Kort procedurer",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  },
  {
    title: "Kryptering af Data under Transport",
    shortDesc: "Følsomme data sendes uden tilstrækkelig kryptering.",
    narrativeIntro: `
      "Data sendes ofte i klartekst, hvilket udgør en stor sikkerhedsrisiko. Implementer stærk kryptering for at beskytte data under transit."
    `,
    glossaryTerms: ["Kryptering", "TLS/SSL", "End-to-End Encryption"],
    digDeeperLinks: [
      { label: "Data Kryptering", text: "Læs om moderne krypteringsmetoder og hvordan de beskytter data under transport." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér dataoverførsler, der foregår uden kryptering.",
        stepContext: "En grundig analyse af dataflowet kan afsløre, hvilke forbindelser der skal sikres med kryptering.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer TLS/SSL eller en anden form for end-to-end kryptering for dataoverførsler.",
        stepContext: "Valget af krypteringsprotokol skal matche datatypen og være robust nok til at modstå angreb.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+3 sikkerhed, -2 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 3 }, tradeOff: { development: -2 } }
        },
        choiceB: {
          label: "Basis TLS",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: false,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér de nye krypteringsprocedurer og opdater sikkerhedspolitikker.",
        stepContext: "Omfattende dokumentation er vigtig for at sikre, at krypteringen implementeres korrekt og vedligeholdes.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+1 sikkerhed, -1 udvikling",
          recommended: true,
          applyEffect: { statChange: { security: 1 }, tradeOff: { development: -1 } }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "Ingen ændring",
          recommended: false,
          applyEffect: { statChange: { security: 0 } }
        }
      }
    ]
  }
];
