window.cybersikkerhedTasks = [

  // Opgave 1 (3 trin)
  {
    title: "Opdatering af Antivirus-løsning",
    shortDesc: "Det nuværende antivirus er forældet og fanger ikke nye trusler.",
    narrativeIntro: `
      "Flere pc'er er blevet inficeret med malware på hospitalet. 
       IT-afdelingen ønsker en bedre og mere moderne antivirus-løsning."
    `,
    glossaryTerms: ["Antivirus", "Malware", "Signature", "CAB"],
    digDeeperLinks: [
      { label: "AV-scanningsmetoder", text: "Signaturbaseret scanning vs. heuristisk og AI-baseret scanning." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analysér udbredelsen af det gamle antivirus på hospitalets maskiner.",
        stepContext: "I dette trin skal du indsamle data om, hvor mange maskiner der kører den forældede antivirus. Det omfatter både interne og eksterne klienter, og en dybdegående analyse kan afsløre omfanget af problemet.",
        choiceA: {
          label: "Grundig undersøgelse",
          text: "+3 tid, +2 development (bedre overblik).",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig stikprøve",
          text: "+1 tid, +5% risk (Risiko for oversete huller).",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Vælg og køb ny antivirus-løsning med hyppige signaturopdateringer.",
        stepContext: "Her skal du evaluere markedet for antivirusløsninger. Overvej pris, opdateringsfrekvens og support. En high-end løsning vil typisk levere bedre sikkerhed, men til en højere omkostning.",
        choiceA: {
          label: "High-end antivirus",
          text: "+3 tid, -100 kr, +3 security (god beskyttelse).",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal antivirus",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv de nye AV-politikker og opdater personalet.",
        stepContext: "Dokumentationen skal indeholde de nye procedurer for antivirusopdateringer, samt retningslinjer for, hvordan personalet skal reagere ved mistanke om infektion. Dette sikrer en ensartet og sikker drift.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 2 (4 trin)
  {
    title: "Implementering af SIEM & Realtids-Logning",
    shortDesc: "Mangel på central logning gør det svært at opdage hackingforsøg.",
    narrativeIntro: `
      "Hospitalet har brug for et SIEM-system, der kan samle alle logs og levere alarmer i realtid ved mistænkelig aktivitet."
    `,
    glossaryTerms: ["SIEM", "IDS", "CAB", "Malware"],
    digDeeperLinks: [
      { label: "SIEM-fordele", text: "En SIEM samler logs og alarmerer ved afvigelser. Kan reducere reaktionstid." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et SIEM-system, der kan håndtere hospitalets mange logs.",
        stepContext: "Her skal du vurdere systemets kapacitet og funktioner, herunder hvor mange logs der forventes, og om systemet kan integreres med eksisterende IT-infrastruktur.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr, +3 security.",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal logserver",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt integration til netværksudstyr, servere og klienter.",
        stepContext: "Dette trin omfatter opsætning af forbindelser mellem SIEM-systemet og alle relevante IT-komponenter, så logdata automatisk sendes til centralenheden.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek compliance og logging af persondata i realtid.",
        stepContext: "I dette trin skal du sikre, at den nye logning overholder GDPR og andre relevante regler for persondata. Dette reducerer juridisk risiko.",
        choiceA: {
          label: "Grundigt lov- og GDPR-check",
          text: "+2 tid, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv reaktionsprocedurer og loghåndtering i SIEM.",
        stepContext: "Dokumentationen skal indeholde, hvordan systemet reagerer på alarmer, og hvem der er ansvarlig for at tage handling, når der opstår mistænkelig aktivitet.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 3 (3 trin)
  {
    title: "Patch Management-proces",
    shortDesc: "Sygehusets systemer mangler rettidige opdateringer.",
    narrativeIntro: `
      "En intern revision viser, at flere systemer er bagud med opdateringer, hvilket giver hackere en åben dør."
    `,
    glossaryTerms: ["Patch management", "CAB", "Compliance", "Malware"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér systemer med kritiske ubesvarede opdateringer.",
        stepContext: "Her skal du kortlægge, hvilke systemer der har lange opdateringsintervaller, og hvor det kan skabe sikkerhedsrisici.",
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig stikprøve",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt automatiseret patch management-løsning.",
        stepContext: "Implementér en løsning, der automatisk ruller patches ud og sikrer, at opdateringer sker uden manuel indgriben.",
        choiceA: {
          label: "Automatiseret patch-rulning",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Manuel patching",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv retningslinjer for patch-cyklus og compliance.",
        stepContext: "Dokumentationen skal beskrive, hvor ofte systemerne skal opdateres, hvem der er ansvarlig, og hvordan man skal reagere, hvis en patch fejler.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 4 (4 trin)
  {
    title: "Phishing-kampagne & træning",
    shortDesc: "Flere medarbejdere klikker på falske links og mails.",
    narrativeIntro: `
      "Hospitalet har oplevet phishing-angreb, hvor brugere afslørede loginoplysninger. Der ønskes en kampagne for at sænke klikraten."
    `,
    glossaryTerms: ["Phishing", "Malware", "CAB", "Compliance"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemfør testphishing-kampagne for at måle klikrate.",
        stepContext: "Testkampagnen skal simulere rigtige phishing-angreb for at identificere, hvilke medarbejdere der er sårbare og træningsbehovet.",
        choiceA: {
          label: "Omfattende testkampagne",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Lille stikprøve",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opsæt avanceret spamfilter mod kendte phishing-domæner.",
        stepContext: "Et avanceret spamfilter vil blokere de fleste phishing-mails, men kan være dyrt. Overvej omkostningerne vs. sikkerhedsforbedringen.",
        choiceA: {
          label: "Avanceret spamfilter",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal spamfilter",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek GDPR-aspekter i mail-logging og medarbejderovervågning.",
        stepContext: "Det er vigtigt at sikre, at overvågning af e-mails og logging ikke krænker medarbejdernes persondata og overholder GDPR.",
        choiceA: {
          label: "Omhyggelig compliance-gennemgang",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring compliance over",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv ny anti-phishing-politik og vejledning.",
        stepContext: "Dokumentationen skal forklare de nye procedurer, hvordan man genkender phishing og hvad man skal gøre, hvis man modtager mistænkelige mails.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 5 (3 trin)
  {
    title: "Ransomware-forsvar: Offline-backups",
    shortDesc: "Hospitalet er sårbart for ransomware, fordi backupen er online.",
    narrativeIntro: `
      "Ved et ransomware-angreb kan online-backups også krypteres. IT vil have en offline eller immutable backup-løsning."
    `,
    glossaryTerms: ["Ransomware", "Backup", "Malware", "CAB"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer offline/immutable backup, så angribere ikke kan slette/kryptere den.",
        stepContext: "Her skal du sikre, at backupen opbevares på et medie eller et system, der ikke er tilgængeligt for hackere, fx fysiske diske eller et separat netværk.",
        choiceA: {
          label: "Sikker backup-løsning",
          text: "+3 tid, -120 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Fortsat online backup",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt en dedikeret server eller tapesystem til offline-lager.",
        stepContext: "Dette trin fokuserer på den fysiske eller dedikerede lagringsinfrastruktur, som sikrer, at backuppen er isoleret fra netværk, der kan angribes.",
        choiceA: {
          label: "Dedikeret offline-løsning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Recycled server",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv rutiner for backup-test og gendannelsesprocedurer.",
        stepContext: "Dokumentationen skal indeholde, hvordan backuppen testes regelmæssigt, og hvordan data kan gendannes hurtigt ved et angreb.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 6 (4 trin)
  {
    title: "MFA-implementering på kritiske systemer",
    shortDesc: "Flere systemer bruger kun password, men bruteforce-angreb er stigende.",
    narrativeIntro: `
      "For at forhindre uautoriseret adgang vil hospitalet indføre Multi-Factor Authentication (MFA) på kritiske systemer."
    `,
    glossaryTerms: ["MFA", "CAB", "Penetrationstest"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Vurder hvilke brugergrupper og systemer har mest kritisk adgang.",
        stepContext: "Her skal du identificere, hvilke systemer og brugerroller, der kræver ekstra sikkerhed, så du kan prioritere MFA-implementeringen.",
        choiceA: {
          label: "Grundig analyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer MFA-løsning med fx mobil-app og engangskoder.",
        stepContext: "Her vælger du en MFA-løsning, hvor brugerne skal bekræfte deres identitet via en mobilapp eller engangskode, hvilket øger sikkerheden betragteligt.",
        choiceA: {
          label: "Fuldt integreret MFA",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal 2FA (SMS)",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek databeskyttelse og logging af MFA-brug.",
        stepContext: "Dette trin skal sikre, at implementeringen af MFA overholder alle lovkrav, og at logningen af MFA-hændelser sker korrekt for at kunne spore eventuelle misbrug.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater vejledning om MFA-login for personalet.",
        stepContext: "Dokumentationen skal beskrive, hvordan MFA skal bruges, og hvad medarbejderne skal gøre, hvis de har problemer med den nye metode.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 7 (5 trin)
  {
    title: "Penetrationstest af kritiske systemer",
    shortDesc: "Hospitalet vil aktivt opspore sårbarheder via pentest.",
    narrativeIntro: `
      "Flere kritiske systemer er i drift, men har sjældent været testet af eksterne sikkerhedskonsulenter. En pentest kan afsløre svagheder."
    `,
    glossaryTerms: ["Penetrationstest", "Sårbarhedsscanning", "CAB", "Compliance"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg, hvilke systemer er mest kritiske at teste.",
        stepContext: "Identificér de systemer, som vil have den største indvirkning, hvis de kompromitteres. Denne analyse er afgørende for en fokuseret testindsats.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Bestil ekstern penetrationstest og sårbarhedsscanning.",
        stepContext: "Her skal du vælge en ekstern partner, der kan udføre en grundig penetrationstest, og som kan levere en rapport med anbefalinger.",
        choiceA: {
          label: "Fuld eksternt pentest-forløb",
          text: "+3 tid, -150 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis intern scanning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Lav en kontrolleret test-miljøopsætning for at undgå driftspåvirkning.",
        stepContext: "Opsæt et testmiljø, der replikerer produktionsforholdene, så testen kan udføres uden risiko for forstyrrelser i den daglige drift.",
        choiceA: {
          label: "Separate testservere",
          text: "+2 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Test i produktionsmiljø",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Afklar juridiske forhold ved pentest (GDPR, aftaler, etc.).",
        stepContext: "Sørg for, at der er klare aftaler med testfirmaet, og at alle juridiske krav overholdes, så data og personfølsomme oplysninger beskyttes.",
        choiceA: {
          label: "Dybdegående compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer formaliteter",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opsaml resultater og anbefalinger fra pentesten.",
        stepContext: "Dokumentationen skal indeholde en detaljeret rapport, der beskriver de opdagede sårbarheder og anbefalede forbedringer for at afhjælpe dem.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 8 (4 trin)
  {
    title: "Forbedring af Firewall-regler",
    shortDesc: "Nuværende firewallregler er rodede og tillader for meget trafik.",
    narrativeIntro: `
      "Sårbarheder i perimeteret gør, at angribere kan nå interne systemer. En strammere firewall-strategi er nødvendig."
    `,
    glossaryTerms: ["Firewall", "CAB", "IDS", "Malware"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér netværkssegmenter og risikozoner.",
        stepContext: "Kortlæg hvilke dele af netværket, der har den højeste risiko for angreb. Dette giver et godt udgangspunkt for at opdatere firewall-reglerne.",
        choiceA: {
          label: "Grundig netværksanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opstram firewall-regler og segmentér netværket.",
        stepContext: "Her skal du opdatere reglerne, så kun autoriseret trafik tillades. Dette kan involvere at blokere kendte ondsindede IP-adresser og anvende regler for trafikfiltrering.",
        choiceA: {
          label: "Strenge firewall-regler",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Behold nuværende regler",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt IDS/IPS i perimeter-laget for at fange angreb.",
        stepContext: "Implementér et Intrusion Detection/Prevention System, der kan advare om eller blokere angreb, før de når de interne systemer.",
        choiceA: {
          label: "Avanceret IDS/IPS",
          text: "+3 tid, -80 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen indtrængningsdetektering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv de nye firewall-regler og procedurer.",
        stepContext: "Dokumentationen skal beskrive, hvordan reglerne er blevet opdateret, og hvilke procedurer der skal følges for at vedligeholde og teste dem regelmæssigt.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 9 (3 trin)
  {
    title: "Håndtering af Zero-day sårbarheder",
    shortDesc: "Nye sårbarheder opstår jævnligt, men hospitalet har ingen plan.",
    narrativeIntro: `
      "Zero-day sårbarheder kan ramme hospitalets systemer før en officiel patch findes.
       En reaktionsplan er nødvendig."
    `,
    glossaryTerms: ["Sårbarhedsscanning", "Malware", "CAB", "Compliance"],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer løbende sårbarhedsscanning for nye exploits.",
        stepContext: "Her skal du etablere et system, der automatisk scanner for nyopståede sårbarheder og potentielle exploits, for at reducere risikoen for zero-day angreb.",
        choiceA: {
          label: "Regelmæssige scanninger",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Kun manuel tjek",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek juridisk ansvar for at informere om potentielle databrud.",
        stepContext: "Sørg for, at der findes en plan for, hvordan man hurtigt informerer myndigheder og berørte parter, hvis en zero-day fører til et databrud, for at overholde lovkrav.",
        choiceA: {
          label: "Grundigt compliance-tjek",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer lovkrav",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer for zero-day håndtering og alarmprocedurer.",
        stepContext: "Dokumentationen skal indeholde en detaljeret plan for, hvordan man reagerer på en zero-day hændelse, inklusive intern kommunikation og eksterne rapporteringskrav.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // Opgave 10 (4 trin)
  {
    title: "Kryptering af data under transport",
    shortDesc: "Hospitalet sender ofte følsomme data uden stærk kryptering.",
    narrativeIntro: `
      "Personfølsomme data sendes via netværket, men uden ordentlig kryptering. 
       Hospitalet vil implementere stærk ende-til-ende-kryptering."
    `,
    glossaryTerms: ["Encryption", "Compliance", "CAB", "MFA"],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér workflows og systemer, hvor data transporteres i klartekst.",
        stepContext: "Kortlæg hvilke data, der overføres uden kryptering. Dette kan omfatte patientjournaler, økonomidata og andre følsomme oplysninger.",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer TLS/SSL eller end-to-end-kryptering.",
        stepContext: "Her skal du vælge en krypteringsprotokol, der beskytter data under transmission, og sørge for, at certifikater og nøgler håndteres sikkert.",
        choiceA: {
          label: "Avanceret ende-til-ende-kryptering",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis TLS",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek lovkrav (GDPR) for kryptering af følsomme patientdata.",
        stepContext: "Det er vigtigt at overholde GDPR-krav, når data krypteres. Her skal du sikre, at krypteringsløsningen opfylder alle juridiske krav.",
        choiceA: {
          label: "Dybdegående compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer for sikker datatransport.",
        stepContext: "Dokumentationen skal beskrive, hvordan krypteringen implementeres, og hvilke procedurer der skal følges for at sikre data under transport.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
