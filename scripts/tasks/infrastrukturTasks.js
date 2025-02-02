window.infrastrukturTasks = [

  // OPGAVE 1 (3 trin)
  {
    title: "Opgradering af Netværkskerne",
    shortDesc: "Det centrale netværksudstyr er forældet, hvilket skaber flaskehalse.",
    narrativeIntro: `
      "IT-afdelingen konstaterer, at det nuværende core switch-udstyr ikke kan håndtere
       den stigende trafik, hvilket resulterer i forsinkelser og nedetid."
    `,
    digDeeperLinks: [
      { label: "Netværkskerne Opgradering", text: "En solid netværkskerne er afgørende for høj hastighed og stabil drift." }
    ],
    architectAdvice: `
      Arkitekten anbefaler at fokusere på trin 2 for at få det rigtige udstyr
      og undgå flaskehalse i kerneinfrastrukturen.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser nuværende trafikmønstre og kapacitetsbehov.",
        choiceA: {
          label: "Detaljeret trafikanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent og vælg nyt core switch-udstyr.",
        choiceA: {
          label: "High-end switches",
          text: "+3 tid, -150 kr, +3 security",
          recommended: true,  // Arkitekten fremhæver dette valg
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billige switches",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksplan og dokumentation.",
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

  // OPGAVE 2 (4 trin)
  {
    title: "Udrulning af Virtualiseret Servermiljø",
    shortDesc: "Fysiske servere er dyre i drift og pladskrævende. Virtualisering ønskes.",
    narrativeIntro: `
      "En analyse viser at serverparken er for stor og ineffektiv. Virtualisering
       kan frigøre ressourcer og lette vedligeholdelse."
    `,
    digDeeperLinks: [
      { label: "Servervirtualisering", text: "Virtualisering kan reducere hardwareomkostninger og forbedre skalérbarheden." }
    ],
    architectAdvice: `
      Arkitekten anbefaler trin 4, hvor dokumentationen er afgørende for en sikker og stabil drift.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer hvilke eksisterende servere egner sig til virtualisering.",
        choiceA: {
          label: "Detaljeret kapacitetstest",
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
        stepDescription: "Indfør sikkerhedslag i hypervisor-laget.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+3 tid, -80 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek licensaftaler og compliance ved brug af virtualisering.",
        choiceA: {
          label: "Grundigt licens- og compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Spring detaljer over",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér hele virtualiseringsprocessen og nye procedurer.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: true,  // Arkitekten pointerer dette som kritisk
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

  // OPGAVE 3 (5 trin)
  {
    title: "Styrkelse af netværkssikkerhed ved perimeter",
    shortDesc: "Firewalls og perimeter-sikkerhed er forældet og kan udnyttes af angribere.",
    narrativeIntro: `
      "Sårbarheder i perimeter-forsvaret øger risikoen for hacking og nedbrud. 
       IT-afdelingen vil opgradere firewall og IDS-løsning."
    `,
    digDeeperLinks: [
      { label: "Perimeter Sikkerhed", text: "Et robust perimeter forsinker eller stopper eksterne trusler effektivt." }
    ],
    architectAdvice: `
      Arkitekten nævner trin 2 som altafgørende – valget af leverandør for firewall-løsningen er kritisk.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Gennemgå nuværende opsætning og find hullerne i perimeter.",
        choiceA: {
          label: "Grundig gaps-analyse",
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
        stepDescription: "Vælg ny firewall-løsning og IDS/IPS med eksterne parter.",
        choiceA: {
          label: "High-end firewall + IDS",
          text: "+3 tid, -120 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard firewall",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer og konfigurer ny perimeter-løsning.",
        choiceA: {
          label: "Omfattende konfiguration",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basiskonfiguration",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Overvåg og test perimeter med penetrationstests.",
        choiceA: {
          label: "Grundige tests",
          text: "+3 tid, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ingen test",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksplan og security-dokumentation.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid",
          recommended: false,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen opdatering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // OPGAVE 4 (6 trin)
  {
    title: "Robustgørelse af Remote-arbejdspladser",
    shortDesc: "Flere medarbejdere arbejder hjemmefra; den eksterne adgang er ustabil.",
    narrativeIntro: `
      "Hjemmearbejde bliver mere udbredt, men VPN-forbindelsen er ustabil og mangler opdateringer, 
       hvilket hæmmer produktiviteten og skaber sikkerhedsrisici."
    `,
    digDeeperLinks: [
      { label: "VPN & Remote-løsninger", text: "En robust, sikker forbindelse forbedrer medarbejdernes mulighed for hjemmearbejde." }
    ],
    architectAdvice: `
      Arkitekten fremhæver, at trin 3 (cybersikkerhed) er kritisk for at beskytte data eksternt.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Overblik over, hvor mange medarbejdere har brug for fjernadgang.",
        choiceA: {
          label: "Detaljeret oversigt",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Grov optælling",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader VPN-server og netværksudstyr til stabil performance.",
        choiceA: {
          label: "High-performance VPN",
          text: "+3 tid, -100 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billig VPN-løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for kryptering og to-faktoradgang for remote-brugere.",
        choiceA: {
          label: "Avanceret sikring",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal adgang",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek compliance ved dataadgang uden for hospitalets net.",
        choiceA: {
          label: "Grundig compliance-check",
          text: "+2 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorér detaljer",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent ekstra licenser eller supportaftaler for VPN-løsningen.",
        choiceA: {
          label: "Fuld support",
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
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer for hjemmearbejde og remoteadgang.",
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

  // OPGAVE 5 (3 trin)
  {
    title: "Energieffektivisering af serverrum",
    shortDesc: "Højt energiforbrug i serverrummet øger omkostninger og temperaturproblemer.",
    narrativeIntro: `
      "Strømforbruget er stigende, og kølingen kan ikke følge med, hvilket
       fører til hyppige overophedningsalarmer i serverrummet."
    `,
    digDeeperLinks: [
      { label: "Green IT-løsninger", text: "Optimeret køling og energistyring reducerer omkostninger og giver stabil drift." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2 for at få en langsigtet infrastruktur, der er
      skalerbar og energibesparende.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Mål og evaluer det nuværende energiforbrug i serverrummet.",
        choiceA: {
          label: "Detaljeret energianalyse",
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
        stepDescription: "Opgrader kølesystemet og strømstyring.",
        choiceA: {
          label: "Energieffektiv køling",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard-løsning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér nye procedurer for energistyring og vedligehold.",
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

  // OPGAVE 6 (4 trin)
  {
    title: "Automatisering af netværkskonfiguration",
    shortDesc: "Hyppige fejl sker ved manuelle ændringer i netværkskonfigurationen.",
    narrativeIntro: `
      "Netværksteamet bruger meget tid på at konfigurere switche og routere manuelt, 
       og fejl sker ofte ved tastebommerter."
    `,
    digDeeperLinks: [
      { label: "Network Automation", text: "Ved at automatisere netværksændringer mindsker man risikoen for fejl." }
    ],
    architectAdvice: `
      Arkitekten peger på trin 3 (it-jura) for at sikre, at kritisk netværksinfrastruktur
      overholder relevant lovgivning vedr. logging og ansvar.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Kortlæg nuværende manuelle konfigurationsprocesser.",
        choiceA: {
          label: "Detaljeret procesanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk kig",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementer rollebaserede adgange og logs for konfig-ændringer.",
        choiceA: {
          label: "Avanceret logging",
          text: "+3 tid, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal logning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre lovkrav vedr. logging og ansvarlighed i netværksændringer.",
        choiceA: {
          label: "Grundig compliance",
          text: "+2 tid, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorér detaljer",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv den nye automatiserede proces og uddan netværksteamet.",
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
    title: "Migration fra kabelført net til delvist trådløst net",
    shortDesc: "Hospitalets netværk er kun kablet, men man ønsker trådløst i udvalgte områder.",
    narrativeIntro: `
      "Personale vil kunne tilgå systemer trådløst. Men at udvide netværket med Wi-Fi 
       kræver planlægning, sikkerhed og ny infrastruktur."
    `,
    digDeeperLinks: [
      { label: "Wi-Fi i hospitaler", text: "Trådløst net giver fleksibilitet, men øger også kravene til sikkerhed." }
    ],
    architectAdvice: `
      Arkitekten påpeger, at trin 2 (cybersikkerhed) er kritisk for at sikre, at trådløs 
      trafik ikke kompromitterer systemet.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Undersøg, hvor Wi-Fi skal dække, og hvilke områder der kan forblive kablet.",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Opsæt WPA3-kryptering, adskilte SSID'er og netværkssegmentering.",
        choiceA: {
          label: "Avanceret Wi-Fi sikkerhed",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal kryptering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Køb trådløse access points og vedligeholdelsesaftale.",
        choiceA: {
          label: "Kvalitets-AP og service",
          text: "+2 tid, -80 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Billige APs uden service",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer trådløst net i den eksisterende netværksinfrastruktur.",
        choiceA: {
          label: "Fuldt integreret",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Løsrevet opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv nyt Wi-Fi-setup og uddan personalet i brugen.",
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
    title: "Opdatering af failover-løsning for kritiske systemer",
    shortDesc: "Hospitalet har en gammel failover, som sjældent testes. Mulig høj risiko ved nedbrud.",
    narrativeIntro: `
      "I et kritisk nedbrud skal systemerne failover til backup. Men nuværende løsning er ikke testet 
       og kan være ustabil."
    `,
    digDeeperLinks: [
      { label: "Failover-løsninger", text: "Regelmæssig test og opdatering af failover minimerer nedetid ved fejl." }
    ],
    architectAdvice: `
      Arkitekten anbefaler, at trin 3 (it-jura) er vigtigt, fordi lovgivningen kræver
      redundans for kritiske patientdata.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér hvilke systemer skal have failover, og hvor de er mest sårbare.",
        choiceA: {
          label: "Omfattende sårbarhedsanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk tjek",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader failover-hardware, så backup-servere kan overtage driften.",
        choiceA: {
          label: "Avanceret failover",
          text: "+4 tid, -150 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 4, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis-hardware",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for at redundans opfylder lovpligtige krav for kritiske systemer.",
        choiceA: {
          label: "Grundigt compliance-tjek",
          text: "+2 tid, +2 security",
          recommended: true,  // Arkitekten pointerer dette
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
        location: "cybersikkerhed",
        stepDescription: "Test failover-sikkerhed mod hackerangreb under skift.",
        choiceA: {
          label: "Penetrationstest i failover-scenarie",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen failover-test",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Indhent aftale om hurtig udskiftning af defekt hardware.",
        choiceA: {
          label: "Service on-site 24/7",
          text: "+2 tid, -50 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen aftale",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater failover-plan, testprocedurer og vedligeholdelsesplan.",
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
    title: "Øg båndbredden til hospitalets cloud-tjenester",
    shortDesc: "Cloud-løsninger bliver flaskehals pga. lav WAN-kapacitet.",
    narrativeIntro: `
      "Flere systemer er cloud-baserede, men hospitalets internetforbindelse har ikke
       kapacitet til at håndtere den stigende trafik, hvilket giver langsom drift."
    `,
    digDeeperLinks: [
      { label: "Cloud-Båndbredde", text: "Tilstrækkelig kapacitet er kritisk for at sikre flydende brug af cloud-tjenester." }
    ],
    architectAdvice: `
      Arkitekten fremhæver trin 2, hvor leverandøren skal levere en ordentlig WAN-forbindelse.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg forbruget af båndbredde og identificér peakperioder.",
        choiceA: {
          label: "Detaljeret netanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Opgradér WAN-forbindelsen med højere båndbredde.",
        choiceA: {
          label: "Større WAN-aftale",
          text: "+2 tid, -100 kr, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Fortsæt med nuværende",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksmanualen og informér personale om ny kapacitet.",
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

  // OPGAVE 10 (4 trin)
  {
    title: "Central logning af infrastrukturhændelser",
    shortDesc: "Manglende logning gør det svært at fejlfinde og spore angreb på netværket.",
    narrativeIntro: `
      "Supporten bruger lang tid på at lede efter logs spredt i forskellige enheder. 
       En central logserver kan gøre fejlsøgning og sikkerhedsanalyse nemmere."
    `,
    digDeeperLinks: [
      { label: "Central Logning", text: "Logkonsolidering giver overblik og muliggør hurtig fejlfinding." }
    ],
    architectAdvice: `
      Arkitekten understreger at trin 3 (cybersikkerhed) er afgørende for at beskytte 
      logs, så de ikke manipuleres.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Undersøg behov for logning og identificér kritiske enheder.",
        choiceA: {
          label: "Grundig kortlægning",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Implementer central logserver og opsæt logindsamling.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, -80 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Beskyt logserver mod manipulation og uautoriseret adgang.",
        choiceA: {
          label: "Avanceret sikring",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ingen særlige tiltag",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér logpolitikker og retningslinjer for analyser.",
        choiceA: {
          label: "Grundig dokumentation",
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
