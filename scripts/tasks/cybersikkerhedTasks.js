window.cybersikkerhedTasks = [

  // OPGAVE 1 (3 trin)
  {
    title: "Opdatering af anti-virus-løsning",
    shortDesc: "Det nuværende antivirus er forældet og kan ikke fange nye trusler.",
    narrativeIntro: `
      "IT-afdelingen bemærker, at virusscanneren sjældent opdateres. 
       Nye trusler slipper muligvis igennem, hvilket øger angrebsfladen."
    `,
    digDeeperLinks: [
      { label: "Moderne AV-løsninger", text: "Med realtidsbeskyttelse og machine learning kan man fange nye trusler hurtigt." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2, hvor leverandøraftalen skal sikre hurtige signaturopdateringer.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg, hvor antivirus-løsningen er installeret, og hvor den mangler.",
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
        location: "leverandor",
        stepDescription: "Vælg en ny AV-løsning og fastlægg signaturopdateringsaftale.",
        choiceA: {
          label: "High-end AV med hyppige opdateringer",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,  // Arkitekten peger på dette
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billig, sjælden opdatering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentation for brug og retningslinjer.",
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

  // OPGAVE 2 (3 trin)
  {
    title: "SIEM-logning af kritiske systemer",
    shortDesc: "Mangel på central logning gør det svært at spore angreb.",
    narrativeIntro: `
      "Flere kritiske systemer logger kun lokalt. Ved hackerangreb går man glip af 
       vigtige spor i realtid, og reaktionen forsinkes."
    `,
    digDeeperLinks: [
      { label: "SIEM-fordele", text: "Et SIEM (Security Information & Event Management) samler logs centralt og opdager unormal aktivitet." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2 for at sikre, at selve SIEM-løsningen konfigureres robust.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér de kritiske systemer, der mangler central logning.",
        choiceA: {
          label: "Detaljeret systemsurvey",
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
        location: "infrastruktur",
        stepDescription: "Implementer en SIEM-løsning med realtidskorrelation.",
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true, 
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal logserver",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér logindsamling og reaktionsprocedurer.",
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

  // OPGAVE 3 (4 trin)
  {
    title: "Håndtering af phishing-kampagner",
    shortDesc: "Flere medarbejdere har klikket på phishing-links, hvilket kan kompromittere systemet.",
    narrativeIntro: `
      "HR har modtaget klager fra personale, der er blevet narret af falske e-mails. 
       Man ønsker at iværksætte en kampagne mod phishing for at reducere fejl."
    `,
    digDeeperLinks: [
      { label: "Phishing", text: "Phishing udgør en stor risiko, da mennesker ofte er det svageste led i sikkerhedskæden." }
    ],
    architectAdvice: `
      Arkitekten peger på trin 4, hvor man dokumenterer og vedligeholder en anti-phishing-politik.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemfør testphishing-kampagne for at se, hvor mange klikker.",
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Lille prøvetest",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Bloker kendte phishing-domæner og implementer e-mailfilter.",
        choiceA: {
          label: "Avanceret spamfilter + domæneliste",
          text: "+3 tid, -80 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal spamfilter",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek juridiske aspekter ift. logs og monitorering af medarbejder-mails.",
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
        stepDescription: "Dokumentér anti-phishing-politik og uddannelsesmateriale.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen politik",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // OPGAVE 4 (4 trin)
  {
    title: "Implementering af Multi-Factor Authentication (MFA)",
    shortDesc: "Systemer er kun beskyttet af password; bruteforce-angreb er stigende.",
    narrativeIntro: `
      "Der har været forsøg på at kompromittere konti. Et ekstra lag af sikkerhed med MFA 
       vil kunne beskytte systemet mod stjålne passwords."
    `,
    digDeeperLinks: [
      { label: "MFA-fordele", text: "Multi-Factor Authentication mindsker risikoen for uautoriseret adgang betragteligt." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2, hvor man integrerer MFA i infrastrukturen, som afgørende.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemfør en analyse af, hvor MFA er mest nødvendigt.",
        choiceA: {
          label: "Omfattende analyse",
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
        location: "infrastruktur",
        stepDescription: "Implementer MFA-løsning i login-flow for kritiske systemer.",
        choiceA: {
          label: "Fuldt integreret MFA",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal MFA",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Konfigurer regler for to-faktor, fx engangskoder og godkendelses-apps.",
        choiceA: {
          label: "Avancerede MFA-metoder",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kun SMS-kode",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udgiv retningslinjer for MFA og hjælp til brugerne.",
        choiceA: {
          label: "Detaljeret vejledning",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen vejledning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // OPGAVE 5 (5 trin)
  {
    title: "E-mail-kryptering for patienthenvendelser",
    shortDesc: "Patienter sender ofte følsomme oplysninger via e-mail, som ikke er krypteret.",
    narrativeIntro: `
      "Hospitalet modtager henvendelser med CPR-numre og diagnoses via almindelig mail. 
       Dette udgør en stor sikkerhedsrisiko."
    `,
    digDeeperLinks: [
      { label: "Mail-kryptering", text: "Kryptering (S/MIME eller lign.) beskytter følsomme oplysninger under transport." }
    ],
    architectAdvice: `
      Arkitekten peger på trin 3 (dokumentation), da det er kritisk at personalet forstår 
      proceduren for krypterede mails.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Afdæk, hvor mange mails indeholder følsomme data.",
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
        location: "cybersikkerhed",
        stepDescription: "Implementer mailkryptering for udgående og indgående mails.",
        choiceA: {
          label: "Avanceret S/MIME-løsning",
          text: "+3 tid, -120 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis SSL/TLS",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Forklar personalet, hvordan de håndterer krypterede e-mails.",
        choiceA: {
          label: "Omfattende vejledning",
          text: "+2 tid",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen vejledning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Overhold GDPR og krav om beskyttelse af personfølsomme data.",
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
        location: "leverandor",
        stepDescription: "Aftal supplerende drift- og supportaftale med mailudbyderen.",
        choiceA: {
          label: "Fuldt service",
          text: "+2 tid, -50 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen support",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // OPGAVE 6 (5 trin)
  {
    title: "Sårbarhedsscanning af hospitalets netværk",
    shortDesc: "Scanning udføres ikke regelmæssigt, sårbarheder kan forblive uopdagede.",
    narrativeIntro: `
      "Hospitalets systemer er store og komplekse. Hvis sårbarheder ikke opdages i tide,
       kan angribere udnytte dem, før IT-personalet reagerer."
    `,
    digDeeperLinks: [
      { label: "Vuln Scan", text: "Regelmæssig sårbarhedsscanning er en hjørnesten i forebyggende cybersikkerhed." }
    ],
    architectAdvice: `
      Arkitekten peger på trin 2, hvor den automatiske scanning opsættes i infrastruktur-laget, som afgørende.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Find ud af hvilke systemer og IP-adresser, der skal scannes.",
        choiceA: {
          label: "Omfattende IP-kortlægning",
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
        location: "infrastruktur",
        stepDescription: "Implementer et system til automatisk sårbarhedsscanning.",
        choiceA: {
          label: "Automatiseret scanning",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Manuel scanning af og til",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Analysér scanningsresultater og prioriter patching.",
        choiceA: {
          label: "Grundig analyse",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk review",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Vær sikker på, at scanning overholder regler om databehandling.",
        choiceA: {
          label: "Compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer juridiske krav",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater scanningsprocedurer og logs.",
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

  // OPGAVE 7 (5 trin)
  {
    title: "Opdatering af patch management-proces",
    shortDesc: "Hospitalet oplever forsinkede patches og sårbarheder forbliver åbne.",
    narrativeIntro: `
      "En intern revision viser, at systemer ofte er bagud med softwareopdateringer, 
       hvilket giver angribere en åben dør."
    `,
    digDeeperLinks: [
      { label: "Patch Management", text: "Regelmæssige patches lukker kendte huller og forhindrer mange angreb." }
    ],
    architectAdvice: `
      Arkitekten mener, at trin 2 (infrastruktur) er centralt for at sikre automatiseret patchdistribution.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Undersøg, hvilke systemer er mest sårbare ved manglende patches.",
        choiceA: {
          label: "Prioriteret liste",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Få et overblik senere",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt automatiseret patch-løsning, der ruller opdateringer ud regelmæssigt.",
        choiceA: {
          label: "Automatisk patch management",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Manuel patching",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Overvåg patchstatus og scanning for systemer, der mangler opdatering.",
        choiceA: {
          label: "Grundig overvågning",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen opfølgning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Kontrollér licensforhold ved store softwareopdateringer.",
        choiceA: {
          label: "Licens- og compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer licens",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater patchprocedurerne og personalets vejledning.",
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

  // OPGAVE 8 (6 trin)
  {
    title: "Incident Response-plan for cybersikkerhedshændelser",
    shortDesc: "Hospitalet mangler en struktureret plan for håndtering af sikkerhedshændelser.",
    narrativeIntro: `
      "Ved hackingforsøg eller datalæk har hospitalet ingen klar procedure for,
       hvem der gør hvad, og hvornår. Dette kan forlænge nedetid og forværre skader."
    `,
    digDeeperLinks: [
      { label: "Incident Response", text: "En detaljeret plan minimerer skader og sikrer hurtig genopretning." }
    ],
    architectAdvice: `
      Arkitekten fremhæver, at trin 3 (cybersikkerhed) er kritisk for at definere 
      selve reaktions- og eskaleringsprocessen.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemgå nylige sikkerhedshændelser for at lære af fejl.",
        choiceA: {
          label: "Omfattende review",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtigt overblik",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek lovkrav for datasikkerhed ved brud, fx GDPR-anmeldelse.",
        choiceA: {
          label: "Grundig lovpligtig rapportering",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen rapportering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Definér reaktions- og eskaleringsprocedure for hacking og datalæk.",
        choiceA: {
          label: "Detaljeret IR-plan",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal plan",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for, at systemer kan isoleres hurtigt i nødsituationer.",
        choiceA: {
          label: "Segmentering og hurtig shutdown",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Ingenting",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Aftal ekstern støtte ved større sikkerhedshændelser.",
        choiceA: {
          label: "Ekstern krisehjælp",
          text: "+2 tid, -50 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen ekstern støtte",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater Incident Response-plan og del med personalet.",
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

  // OPGAVE 9 (3 trin)
  {
    title: "Optimering af adgangskontrol til serverrum",
    shortDesc: "Fysisk adgang til serverrummet er ikke tilstrækkeligt sikret.",
    narrativeIntro: `
      "Nogle medarbejdere, der ikke længere arbejder på hospitalet, har stadig 
       nøglekort til serverrummet. Dette udgør en sikkerhedstrussel."
    `,
    digDeeperLinks: [
      { label: "Fysisk Sikkerhed", text: "Fysisk adgangskontrol er lige så vigtig som digitale sikkerhedsforanstaltninger." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2 for at få en robust, elektronisk adgangskontrol 
      med logging.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemse nuværende nøglekort og fjern forældede tilgange.",
        choiceA: {
          label: "Fuld kortrevision",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig oprydning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt elektronisk låsesystem med log over adgang.",
        choiceA: {
          label: "Avanceret låsesystem",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Mekanisk nøglesystem",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér adgangsregler og vedligeholdelseskontrol.",
        choiceA: {
          label: "Detaljeret dokumentation",
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

  // OPGAVE 10 (4 trin)
  {
    title: "Opdatering af backupløsning mod ransomware",
    shortDesc: "Hospitalet har en forældet backup, sårbar for ransomware-angreb.",
    narrativeIntro: `
      "Ved et ransomware-angreb risikerer man at miste alle data, 
       hvis backupen ikke er offline eller versionsstyret."
    `,
    digDeeperLinks: [
      { label: "Ransomware Backup", text: "En offline/immutable backup kan redde data, selv når alt andet er krypteret." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 3 (cybersikkerhed) for at sikre, at backupen er konfigureret 
      robust mod ransomware.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser hvilke datasæt er kritiske og skal sikres i backup.",
        choiceA: {
          label: "Grundig dataanalyse",
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
        location: "leverandor",
        stepDescription: "Vælg backup-leverandør med versionsstyret, offline-lagring.",
        choiceA: {
          label: "Immutable, versionsstyret backup",
          text: "+3 tid, -120 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Almindelig online-backup",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Konfigurer backupen, så ransomware ikke kan slette/kryptere den.",
        choiceA: {
          label: "Robust anti-ransomware backup",
          text: "+3 tid, +3 security",
          recommended: true,  // Arkitekten
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard backup",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv backupprocedurer og gendannelsestest.",
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
