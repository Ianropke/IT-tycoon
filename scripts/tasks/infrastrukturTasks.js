window.infrastrukturTasks = [

  // Opgave 1 (3 trin)
  {
    title: "Opgradering af Netværkskerne",
    shortDesc: "Det centrale netværksudstyr er forældet og skaber flaskehalse.",
    narrativeIntro: `
      "IT-afdelingen konstaterer, at netværkskernen er overbelastet, 
       hvilket fører til langsom trafik for hele hospitalet."
    `,
    glossaryTerms: ["Netværkskerne", "WAN", "CAB", "Load Balancer"],
    digDeeperLinks: [
      { label: "Netværksopgraderinger", text: "En modernisering af netværkskernen kan øge hastigheden og reducere flaskehalse." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser netværksbehov og kapacitet ved spidsbelastning.",
        stepContext: "Her skal du kortlægge trafikken under peak-perioder og vurdere, om den nuværende netværksinfrastruktur kan håndtere belastningen. Overvej både interne og eksterne faktorer.",
        choiceA: {
          label: "Detaljeret kapacitetsanalyse",
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
        location: "leverandor",
        stepDescription: "Indhent tilbud på ny netværkskerne med høj kapacitet.",
        stepContext: "Sammenlign tilbud fra flere leverandører og vurder, hvilken løsning der giver den bedste balance mellem pris og ydeevne. Overvej omkostninger, garantier og opdateringsfrekvens.",
        choiceA: {
          label: "High-end netværksudstyr",
          text: "+3 tid, -120 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Billig opgradering",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksplan og beskrivelser.",
        stepContext: "Dokumentationen skal opdateres med de nye specifikationer, placeringer og procedurer for den opgraderede netværkskerne, så alle IT-medarbejdere kan følge de nye standarder.",
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
    title: "Virtualiseret Servermiljø",
    shortDesc: "Fysiske servere fylder og er dyre; man ønsker virtualisering.",
    narrativeIntro: `
      "Hospitalets serverrum er fyldt, og strømforbruget er højt. 
       Virtualisering kan frigøre ressourcer og lette vedligeholdelse."
    `,
    glossaryTerms: ["Virtualisering", "High Availability", "CAB"],
    digDeeperLinks: [
      { label: "Virtualiseringsfordele", text: "Virtualisering kan reducere hardwareomkostninger og øge fleksibiliteten." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer hvilke servere egner sig bedst til virtualisering.",
        stepContext: "Undersøg den nuværende serverpark for at identificere, hvilke servere der har overskydende kapacitet eller er ældre og bør udskiftes med virtualiserede løsninger.",
        choiceA: {
          label: "Grundig kapacitetstest",
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
        location: "cybersikkerhed",
        stepDescription: "Beskyt hypervisor-laget mod angreb og isolér VM'er.",
        stepContext: "Implementér sikkerhedsforanstaltninger for hypervisoren, så den er beskyttet mod angreb. Det kan inkludere adgangskontrol og overvågning af de virtuelle maskiner.",
        choiceA: {
          label: "Avanceret sikkerhed",
          text: "+3 tid, -80 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal sikring",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek licensaftaler og compliance ved brug af virtualisering.",
        stepContext: "Gennemgå alle licensaftaler for de virtualiseringssoftwareprodukter, og sikr at brugen overholder lovkrav og interne regler.",
        choiceA: {
          label: "Grundigt licenscheck",
          text: "+2 tid, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ignorer licenskrav",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv driftsprocedurer for det nye virtualiserede miljø.",
        stepContext: "Udarbejd en detaljeret guide til, hvordan det virtualiserede miljø skal drives, overvåges og vedligeholdes, samt hvordan fejlhåndtering skal foregå.",
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

  // Opgave 3 (5 trin)
  {
    title: "Implementering af Cloud-integration",
    shortDesc: "Nogle systemer skal køre i skyen for fleksibel skalering.",
    narrativeIntro: `
      "Hospitalet vil flytte visse ikke-kritiske systemer til Cloud, men drift og sikkerhed skal sikres."
    `,
    glossaryTerms: ["Cloud-løsninger", "WAN", "Load Balancer", "CAB"],
    digDeeperLinks: [
      { label: "Cloud-fordele", text: "En vellykket cloud-integration kan øge skalerbarheden og reducere omkostninger." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér hvilke systemer der egner sig til cloud-drift.",
        stepContext: "Kortlæg systemer baseret på deres krav til oppetid og belastning. Vurder, om de kan drage fordel af den fleksibilitet, cloud-løsninger tilbyder.",
        choiceA: {
          label: "Omfattende behovsanalyse",
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
        stepDescription: "Opsæt hybrid-cloud løsning med sikre forbindelser (VPN/WAN).",
        stepContext: "Design en hybridløsning, der forbinder on-premise infrastruktur med cloud-resurser via sikre forbindelser. Vurder både omkostninger og sikkerhed.",
        choiceA: {
          label: "Omfattende opsætning",
          text: "+3 tid, -120 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Beskyt data, der går til/fra Cloud (kryptering, access control).",
        stepContext: "Sikre at dataoverførslen mellem cloud og lokale systemer er krypteret, og implementér adgangskontrol for at forhindre uautoriseret adgang.",
        choiceA: {
          label: "Avanceret Cloud-sikkerhed",
          text: "+3 tid, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
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
        stepDescription: "Tjek databehandleraftaler og lovkrav ved cloud-hosting.",
        stepContext: "Gennemgå alle juridiske dokumenter for at sikre, at cloud-hosting opfylder alle krav, herunder databeskyttelse og ansvar.",
        choiceA: {
          label: "Fuld compliance-gennemgang",
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
        stepDescription: "Dokumentér hybrid-løsning, ansvarsfordeling og procedurer.",
        stepContext: "Udarbejd en detaljeret dokumentation, der beskriver hele cloud-integrationsprocessen, herunder de tekniske og organisatoriske aspekter.",
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

  // Opgave 4 (6 trin)
  {
    title: "Failover-løsning for kritiske systemer",
    shortDesc: "Nuværende failover er ikke testet og kan være ustabil ved nedbrud.",
    narrativeIntro: `
      "Ved et kritisk nedbrud skal systemet failover til backup, men 
       nuværende setup er sjældent testet og muligvis ude af sync."
    `,
    glossaryTerms: ["Failover", "High Availability", "CAB", "WAN"],
    digDeeperLinks: [
      { label: "Failover-strategier", text: "En velfungerende failover-strategi minimerer nedetid og sikrer kontinuerlig drift." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér kritiske systemer og hvor de er mest sårbare ved nedbrud.",
        stepContext: "Kortlæg systemernes sårbarheder og identificer de punkter, hvor en nedbrud kan have størst konsekvens for hospitalets drift.",
        choiceA: {
          label: "Omfattende sårbarhedsanalyse",
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
        stepDescription: "Opgradér hardware og software, så backupserverne kan overtage drift.",
        stepContext: "Vurder og implementér den nødvendige hardware og software, så et hurtigt failover kan ske ved nedbrud. Dette inkluderer test af systemet for at sikre, at backupserverne er synkroniserede.",
        choiceA: {
          label: "Avanceret failover",
          text: "+4 tid, -120 kr, +3 security",
          recommended: false,
          applyEffect: { timeCost: 4, moneyCost: 120, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Enkel failover",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Test sikkerheden i failover-situationen, fx om hackere kan udnytte skift.",
        stepContext: "Gennemfør en test, der simulerer et nedbrud og vurder, om systemet kan skifte uden sikkerhedsbrister. Testresultaterne skal dokumenteres og bruges til at optimere løsningen.",
        choiceA: {
          label: "Penetrationstest i failover",
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
        location: "it-jura",
        stepDescription: "Sørg for at redundans opfylder krav for kritiske patientdata.",
        stepContext: "Gennemgå de juridiske krav til datasikkerhed og redundans, og sørg for, at den nye failover-løsning lever op til disse krav for at undgå lovbrud.",
        choiceA: {
          label: "Grundigt compliance-check",
          text: "+2 tid, +2 security",
          recommended: true,
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
        location: "leverandor",
        stepDescription: "Forhandl on-site support til hurtig udskiftning af defekt hardware.",
        stepContext: "Sikre en serviceaftale med leverandøren, der garanterer hurtig udskiftning af hardware ved nedbrud, for at minimere nedetid.",
        choiceA: {
          label: "24/7 serviceaftale",
          text: "+2 tid, -50 kr, +2 security",
          recommended: false,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen udvidet service",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater failover-plan, testprocedurer og vedligeholdelsesrutiner.",
        stepContext: "Udarbejd en fuldstændig dokumentation, der beskriver failover-processen, hyppige tests og vedligeholdelsesplaner, så alle IT-medarbejdere ved, hvad der skal gøres ved nedbrud.",
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
    title: "Forbedring af WAN-båndbredde",
    shortDesc: "Flaskehalse mod cloud-services og eksterne systemer pga. lav WAN-kapacitet.",
    narrativeIntro: `
      "Hospitalets forbindelse mod internettet er ikke dimensioneret til stigende brug af cloud og videomøder."
    `,
    glossaryTerms: ["WAN", "CAB", "Cloud-løsninger"],
    digDeeperLinks: [
      { label: "WAN-udvidelse", text: "Opgradering af WAN-kapaciteten kan sikre hurtigere dataoverførsel og bedre kommunikation med eksterne systemer." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Overvåg båndbreddeforbrug og identificér peak-perioder.",
        stepContext: "Analyser netværkets trafikmønstre, og find ud af, hvornår belastningen er på sit højeste, for at identificere behovet for opgradering.",
        choiceA: {
          label: "Grundig netværksanalyse",
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
        location: "leverandor",
        stepDescription: "Opgradér WAN-forbindelsen med højere båndbredde.",
        stepContext: "Undersøg markedet for WAN-forbindelser, og vælg en løsning, der kan håndtere den øgede trafik med bedre hastighed og stabilitet.",
        choiceA: {
          label: "Større WAN-aftale",
          text: "+2 tid, -80 kr, +2 security",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Fortsæt med nuværende linje",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksmanualen og informér personale om ny kapacitet.",
        stepContext: "Dokumentationen skal indeholde ændringer i netværksinfrastrukturen og information om, hvordan de nye kapaciteter skal anvendes af personalet.",
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
    title: "Implementering af Load Balancer i DMZ",
    shortDesc: "Ustabil drift for eksterne services pga. ujævn belastning.",
    narrativeIntro: `
      "Hospitalet driver flere eksterne webservices for samarbejdspartnere, men en enkelt server bliver let overbelastet."
    `,
    glossaryTerms: ["Load Balancer", "High Availability", "CAB", "WAN"],
    digDeeperLinks: [
      { label: "LB-strategier", text: "Load balancing kan fordele trafikken jævnt og sikre høj tilgængelighed." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Opsæt en load balancer i DMZ til at fordele trafikken.",
        stepContext: "Dette trin kræver en vurdering af den nuværende trafik og valg af en løsning, der kan håndtere belastningen effektivt.",
        choiceA: {
          label: "Avanceret load balancing-løsning",
          text: "+3 tid, -80 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Simpel round-robin proxy",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Beskyttelse mod DDoS og scanningstrusler via load balancer.",
        stepContext: "Implementér sikkerhedsforanstaltninger som DDoS-beskyttelse for at forhindre, at load balanceren selv bliver et angrebsmål.",
        choiceA: {
          label: "Avanceret DDoS-beskyttelse",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen speciel beskyttelse",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek licensaftaler og regler for drift af eksterne services.",
        stepContext: "Gennemgå alle kontrakter og lovkrav for at sikre, at den nye load balancing-løsning opfylder alle juridiske forpligtelser.",
        choiceA: {
          label: "Licens- og compliance-check",
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
        stepDescription: "Opdater netværksdiagram og driftsvejledning for load balancing.",
        stepContext: "Udarbejd en detaljeret dokumentation, der beskriver den nye load balancing-løsning, herunder implementeringsdetaljer og vedligeholdelsesprocedurer.",
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
    title: "Sammenlægning af Datacentre",
    shortDesc: "Flere spredte datacentre skaber kompleks drift, vil centralisere.",
    narrativeIntro: `
      "Hospitalet har to datacentre i forskellige bygninger, men vil samle ressourcer for enklere administration."
    `,
    glossaryTerms: ["High Availability", "WAN", "Virtualisering", "CAB"],
    digDeeperLinks: [
      { label: "Datacentersammenlægning", text: "Centralisering af datacentre kan reducere driftsomkostninger og forenkle administration." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Afklar krav til oppetid, hastighed og georedundans.",
        stepContext: "Kortlæg de kritiske krav til systemets ydeevne og redundans, så du kan designe en løsning, der minimerer nedetid og sikrer kontinuerlig drift.",
        choiceA: {
          label: "Detaljeret kravspecifikation",
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
        stepDescription: "Indhent tilbud på fælles server- og storage-løsning.",
        stepContext: "Sammenlign tilbud fra flere leverandører for at finde en løsning, der kan centralisere drift og optimere omkostningerne.",
        choiceA: {
          label: "Avanceret SAN/NAS-løsning",
          text: "+3 tid, -100 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Behold spredte systemer",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Flyt servere til det centrale datacenter (evt. virtualization).",
        stepContext: "Planlæg og implementér en flytning af servere, hvor virtualisering kan hjælpe med at konsolidere ressourcerne og øge effektiviteten.",
        choiceA: {
          label: "Virtualiser + centralisér",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Manuel flytning uden virtualisering",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for fysisk og logisk sikkerhed i det nye centrale datacenter.",
        stepContext: "Implementér stærke adgangskontroller og segmentering for at sikre, at det centraliserede datacenter er beskyttet mod både fysiske og cybertrusler.",
        choiceA: {
          label: "Avanceret adgangskontrol + segmentering",
          text: "+3 tid, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ingen ekstra sikring",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater drift- og beredskabsplaner efter centraliseringen.",
        stepContext: "Udarbejd en komplet plan, der beskriver den nye struktur, roller, ansvar og procedurer for drift og nødberedskab i det centraliserede datacenter.",
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

  // Opgave 8 (3 trin)
  {
    title: "Opsætning af HPC cluster til billedanalyse",
    shortDesc: "Højtydende computekraft til MRI/CT-analyser og AI-modeller.",
    narrativeIntro: `
      "For at behandle store mængder billeddata vil hospitalet sætte et HPC cluster op, 
       men det kræver god infrastruktur og sikkerhed."
    `,
    glossaryTerms: ["High Availability", "WAN", "Integration"],
    digDeeperLinks: [
      { label: "HPC i praksis", text: "Et HPC cluster kan accelerere billedanalyse og AI-modeller, hvilket forbedrer diagnosticeringsprocessen." }
    ],
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Indkøb hardware til HPC (GPU'er, high-speed netværk).",
        stepContext: "Vurder hvilke hardwarekomponenter (GPU'er, CPU'er og netværksudstyr) der er nødvendige for at bygge et effektivt HPC cluster, og indhent tilbud fra leverandører.",
        choiceA: {
          label: "Avanceret HPC-løsning",
          text: "+3 tid, -150 kr, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basal servercluster",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Beskyt HPC-moduler og sikr, at data er krypteret ved overførsel.",
        stepContext: "Implementér sikkerhedsforanstaltninger specifikt rettet mod HPC-miljøet, herunder kryptering af dataoverførsler og sikker adgangskontrol til clusteren.",
        choiceA: {
          label: "Avanceret HPC-sikkerhed",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basis HPC-sikkerhed",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv HPC-opsætningen og rutiner for vedligeholdelse.",
        stepContext: "Dokumentationen skal indeholde specifikationer for hardware, software, vedligeholdelsesprocedurer og backup-planer for HPC clusteren.",
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

  // Opgave 9 (4 trin)
  {
    title: "Load Balancing af Intern Applikation",
    shortDesc: "Intern applikation til personalet er ofte overbelastet pga. spidsbelastning.",
    narrativeIntro: `
      "Personalet klager over langsom performance i en intern portal ved vagtskiftet. 
       IT vil indføre load balancing mellem flere app-servere."
    `,
    glossaryTerms: ["Load Balancer", "Integration", "CAB"],
    digDeeperLinks: [
      { label: "LB-konfiguration", text: "Load balancing kan sikre en jævn fordeling af trafikken og reducere responstider." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser trafikmønstre ved vagtskifte, hvornår peak opstår.",
        stepContext: "Indsaml og analyser trafikdata for at bestemme, hvornår belastningen er højest, så løsningen kan designes optimalt.",
        choiceA: {
          label: "Detaljeret trafficanalyse",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk kig i logs",
          text: "+1 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 1, riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre at load balanceren ikke blot åbner en ny angrebsflade.",
        stepContext: "Implementér ekstra sikkerhedstiltag, såsom DDoS-beskyttelse, for at forhindre, at load balanceren udgør et nyt sikkerhedsproblem.",
        choiceA: {
          label: "Avanceret LB-sikkerhed + DDoS-beskyttelse",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Ingen ekstra sikring",
          text: "+2 tid, +5% risk",
          recommended: false,
          applyEffect: { timeCost: 2, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt flere app-servere bag load balanceren.",
        stepContext: "Planlæg en skaleringsstrategi, der fordeler trafikken på tværs af flere servere for at øge applikationens ydeevne.",
        choiceA: {
          label: "Horizontal skalering",
          text: "+2 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Fortsæt single server",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Beskriv nye driftsprocedurer og failover-strategi.",
        stepContext: "Udarbejd en komplet manual, der beskriver den nye load balancing-løsning, procedurer for vedligeholdelse og hvad der skal gøres i tilfælde af fejl.",
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
    title: "Opsætning af HPC til store datasæt i Cloud",
    shortDesc: "Vil køre HPC i Cloud for fleksibel skalering.",
    narrativeIntro: `
      "Hospitalet overvejer at køre HPC i skyen for at håndtere spidsbelastninger 
       uden at investere i dyrt lokalt hardware."
    `,
    glossaryTerms: ["Cloud-løsninger", "HPC", "High Availability", "WAN"],
    digDeeperLinks: [
      { label: "Cloud HPC", text: "Cloud-baserede HPC-løsninger kan tilbyde høj skalerbarhed og fleksibilitet." }
    ],
    steps: [
      {
        location: "hospital",
        stepDescription: "Vurder hvilke HPC-opgaver egner sig til cloud (datamængder, latency).",
        stepContext: "Analyser hvilke typer af beregninger og datahåndtering, der kan flyttes til skyen uden at påvirke kritiske operationer. Fokuser på ikke-kritiske, men ressourcekrævende opgaver.",
        choiceA: {
          label: "Detaljeret HPC-analyse",
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
        location: "cybersikkerhed",
        stepDescription: "Beskyt data, der uploades/downloades fra HPC i skyen.",
        stepContext: "Implementér end-to-end kryptering og identitetsstyring (IAM) for at sikre, at alle dataoverførsler mellem clusteren og skyen er beskyttet.",
        choiceA: {
          label: "End-to-end kryptering + IAM",
          text: "+3 tid, +3 security",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard TLS",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek compliance ved håndtering af store datasæt (fx scanningsbilleder).",
        stepContext: "Foretag et grundigt check af de juridiske krav til håndtering og lagring af store datasæt i skyen, med fokus på databeskyttelse og GDPR.",
        choiceA: {
          label: "Fuld lovtjek",
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
        stepDescription: "Dokumentér HPC-løsning i skyen, ansvar og driftsprocedurer.",
        stepContext: "Udarbejd en detaljeret dokumentation, der beskriver hele cloud-HPC løsningen, inklusive backup, vedligeholdelse og ansvarsfordeling.",
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
