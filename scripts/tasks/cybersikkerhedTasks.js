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
        choiceA: {
          label: "High-end antivirus",
          text: "+3 tid, -100 kr, +3 security (god beskyttelse).",
          recommended: true, // Arkitekten vil typisk fremhæve dette
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
      "Hospitalet har brug for et SIEM-system, der kan samle alle logs og 
       levere alarmer i realtid ved mistænkelig aktivitet."
    `,
    glossaryTerms: ["SIEM", "IDS", "CAB", "Malware"],

    digDeeperLinks: [
      { label: "SIEM-fordele", text: "En SIEM samler logs og alarmerer ved afvigelser. Kan reducere reaktionstid." }
    ],
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg et SIEM-system, der kan håndtere hospitalets mange logs.",
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
        choiceA: {
          label: "Grundigt lov- og GDPR-check",
          text: "+2 tid, +2 security",
          recommended: true,  // Arkitekten fremhæver vigtigheden
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
      "En intern revision viser, at flere systemer er bagud med opdateringer, 
       hvilket giver hackere en åben dør."
    `,
    glossaryTerms: ["Patch management", "CAB", "Compliance", "Malware"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér systemer med kritiske ubesvarede opdateringer.",
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
      "Hospitalet har oplevet phishing-angreb, hvor brugere afslørede loginoplysninger. 
       Der ønskes en kampagne for at sænke klikraten."
    `,
    glossaryTerms: ["Phishing", "Malware", "CAB", "Compliance"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemfør testphishing-kampagne for at måle klikrate.",
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
      "Ved et ransomware-angreb kan online-backups også krypteres. 
       IT vil have en offline eller immutable backup-løsning."
    `,
    glossaryTerms: ["Ransomware", "Backup", "Malware", "CAB"],

    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer offline/immutable backup, så angriber ikke kan slette/kryptere den.",
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
      "For at forhindre uautoriseret adgang vil hospitalet indføre Multi-Factor Authentication (MFA) 
       på kritiske systemer."
    `,
    glossaryTerms: ["MFA", "CAB", "Penetrationstest"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Vurder hvilke brugergrupper og systemer har mest kritisk adgang.",
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
      "Flere kritiske systemer er i drift, men har sjældent været testet af 
       eksterne sikkerhedskonsulenter. En pentest kan afsløre svagheder."
    `,
    glossaryTerms: ["Penetrationstest","Sårbarhedsscanning","CAB","Compliance"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg, hvilke systemer er mest kritiske at teste.",
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
      "Sårbarheder i perimeteret gør, at angribere kan nå interne systemer. 
       En strammere firewall-strategi er nødvendig."
    `,
    glossaryTerms: ["Firewall","CAB","IDS","Malware"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér netværkssegmenter og risikozoner.",
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
    glossaryTerms: ["Sårbarhedsscanning","Malware","CAB","Compliance"],

    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer løbende sårbarhedsscanning for nye exploits.",
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
    glossaryTerms: ["Encryption","Compliance","CAB","MFA"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér workflows og systemer, hvor data transporteres i klartekst.",
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
