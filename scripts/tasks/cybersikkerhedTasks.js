window.cyberSecurityTasks = [

  {
    title: "Opdatering af adgangskontrol",
    shortDesc: "Hospitalets adgangskontrolsystem er forældet og kræver opdatering.",
    narrativeIntro: `
      "Systemadministratorer har opdaget, at gamle adgangsrettigheder udgør en alvorlig sikkerhedsrisiko."
    `,
    digDeeperLinks: [
      { label: "Adgangskontrol Best Practices", text: "Opdatering af adgangsstyring er afgørende for at forhindre uautoriseret adgang." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld revision af alle adgangsrettigheder med øjeblikkelig fjernelse af forældede konti.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemgå alle adgangsrettigheder for at fjerne forældede konti.",
        choiceA: {
          label: "Fuld revision",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig gennemgang",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer et nyt rollebaseret adgangskontrolsystem (RBAC).",
        choiceA: {
          label: "Implementer RBAC",
          text: "+2 tid, -50 kr, +2 security.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Behold nuværende system",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opdater dokumentationen for adgangskontrolpolitikkerne.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring dokumentation over",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "SIEM-logning og hændelsesovervågning",
    shortDesc: "Hospitalet mangler et centralt SIEM-system til overvågning af sikkerhedshændelser.",
    narrativeIntro: `
      "Sikkerhedsanalysekonsulenter har bemærket, at der ikke findes en central logning, hvilket fører til uopdagede angreb."
    `,
    digDeeperLinks: [
      { label: "SIEM Forklaring", text: "Et SIEM-system samler og analyserer logdata for at opdage trusler i realtid." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en avanceret SIEM-løsning med realtidsanalyse for at forbedre sikkerhedsovervågningen.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og konfigurer et SIEM-system.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Brug eksisterende løsning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opsæt et dashboard til overvågning af logs.",
        choiceA: {
          label: "Tilpasset dashboard",
          text: "+2 tid, -50 kr, +2 security.",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér SIEM-konfiguration og procedurer.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Firewall Konfiguration",
    shortDesc: "Opdater firewall-regler for at blokere mistænkelig trafik.",
    narrativeIntro: `
      "Den nuværende firewall-konfiguration lader gennem visse angreb og udgør en sikkerhedsrisiko."
    `,
    digDeeperLinks: [
      { label: "Firewall Best Practices", text: "Moderne firewall-regler er essentielle for at beskytte netværket." }
    ],
    architectAdvice: `
      Arkitekten understreger, at en detaljeret revision af firewall-reglerne er nødvendig for at forhindre uautoriseret adgang.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemgå de eksisterende firewall-regler.",
        choiceA: {
          label: "Detaljeret revision",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig gennemgang",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opdater og implementer nye firewall-regler.",
        choiceA: {
          label: "Opdater regler",
          text: "+2 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ingen ændringer",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér de nye firewall-regler.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sikkerhedsopdatering af Software",
    shortDesc: "Opdater alle kritiske softwarekomponenter for at lukke kendte sårbarheder.",
    narrativeIntro: `
      "Forældet software med kendte sårbarheder øger risikoen for angreb, og en regelmæssig opdatering er påkrævet."
    `,
    digDeeperLinks: [
      { label: "Patch Management", text: "Regelmæssige opdateringer mindsker risikoen for sikkerhedsbrud." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en fuld patch management-proces for at sikre, at alle systemer kører den nyeste version.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de softwarekomponenter, der skal opdateres.",
        choiceA: {
          label: "Detaljeret vurdering",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Udfør softwareopdateringer og patches.",
        choiceA: {
          label: "Omfattende patching",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig opdatering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér opdateringsprocessen.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Intrusion Detection System (IDS) Implementering",
    shortDesc: "Installer et IDS for at opdage uregelmæssig aktivitet og potentielle angreb.",
    narrativeIntro: `
      "Manglende intrusion detection gør det svært at opdage angreb i tide, hvilket øger risikoen for større sikkerhedsbrud."
    `,
    digDeeperLinks: [
      { label: "IDS Forklaring", text: "Et IDS overvåger netværkstrafikken for at identificere mistænkelig aktivitet." }
    ],
    architectAdvice: `
      Arkitekten understreger, at et avanceret IDS er afgørende for tidlig opdagelse af trusler.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg og konfigurer et IDS.",
        choiceA: {
          label: "Avanceret IDS",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis IDS",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opsæt alarmer og notifikationer i IDS'et.",
        choiceA: {
          label: "Detaljeret opsætning",
          text: "+2 tid, +2 security.",
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard opsætning",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér IDS-konfiguration og procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sikkerhed for IoT-enheder",
    shortDesc: "Beskyttelse af IoT-enheder mod angreb er afgørende.",
    narrativeIntro: `
      "Med et stigende antal IoT-enheder i hospitalet er der øget risiko for uautoriseret adgang, og disse enheder skal sikres ekstra godt."
    `,
    digDeeperLinks: [
      { label: "IoT Security", text: "Sikring af IoT-enheder kræver specialiserede protokoller og konfigurationer." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at implementere specifikke sikkerhedsprotokoller for alle IoT-enheder for at forhindre datalækage og uautoriseret adgang.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Kortlæg alle IoT-enheder og deres sårbarheder.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer sikkerhedsprotokoller for IoT-enheder.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér IoT-sikkerhedsprocedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Data kryptering og backup",
    shortDesc: "Kritiske data skal krypteres og regelmæssigt sikkerhedskopieres.",
    narrativeIntro: `
      "Der er stigende bekymring for datatyveri, og hospitalet skal implementere stærke krypterings- og backup-løsninger."
    `,
    digDeeperLinks: [
      { label: "Data Encryption", text: "Kryptering beskytter data mod uautoriseret adgang." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at anvende en robust krypteringsstandard kombineret med regelmæssige backups for at sikre data.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér de mest kritiske datasegmenter.",
        choiceA: {
          label: "Detaljeret identifikation",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer krypteringsløsninger og backup-procedurer.",
        choiceA: {
          label: "Omfattende implementering",
          text: "+3 tid, -150 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis implementering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér krypterings- og backup-procedurer.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Sikkerhedsuddannelse for personale",
    shortDesc: "Manglende uddannelse øger risikoen for fejl og sikkerhedsbrud.",
    narrativeIntro: `
      "Personalet er ikke opdateret på de nyeste sikkerhedsprincipper, hvilket øger risikoen for utilsigtede fejl og sårbarheder."
    `,
    digDeeperLinks: [
      { label: "Security Training", text: "Regelmæssig uddannelse i sikkerhedsprotokoller mindsker risikoen for fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler regelmæssige træningssessioner for at sikre, at personalet er opdateret og forstår vigtigheden af sikkerhed.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemfør en detaljeret behovsanalyse for sikkerhedsuddannelse.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, +2 development.",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg og implementer et træningsprogram for personalet.",
        choiceA: {
          label: "Detaljeret program",
          text: "+3 tid, -50 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 50, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basisprogram",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér træningsprogrammet og evaluer effekten.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Håndtering af Phishing-angreb",
    shortDesc: "Phishing-angreb udgør en konstant trussel mod hospitalets sikkerhed.",
    narrativeIntro: `
      "Flere medarbejdere har modtaget phishing-mails, hvilket har resulteret i kompromitterede loginoplysninger. Der skal implementeres foranstaltninger for at minimere denne trussel."
    `,
    digDeeperLinks: [
      { label: "Phishing Awareness", text: "Forstå metoderne bag phishing for at kunne modstå angreb." }
    ],
    architectAdvice: `
      Arkitekten anbefaler en kombination af tekniske foranstaltninger og uddannelse for at reducere effekten af phishing-angreb.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemfør en detaljeret analyse af phishing-angreb.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, +2 security.",
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer tekniske foranstaltninger som spamfiltre og mail-sikkerhed.",
        choiceA: {
          label: "Avancerede foranstaltninger",
          text: "+3 tid, -100 kr, +3 security.",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basisforanstaltninger",
          text: "+1 tid, +5% risk.",
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Dokumentér og uddan personalet i phishing-sikkerhed.",
        choiceA: {
          label: "Omfattende dokumentation og træning",
          text: "+2 tid.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
