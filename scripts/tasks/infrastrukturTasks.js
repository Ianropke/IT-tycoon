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

    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser netværksbehov og kapacitet ved spidsbelastning.",
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

    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer hvilke servere egner sig bedst til virtualisering.",
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
      "Hospitalet vil flytte visse ikke-kritiske systemer til Cloud, 
       men drift og sikkerhed skal sikres."
    `,
    glossaryTerms: ["Cloud-løsninger", "WAN", "Load Balancer", "CAB"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér hvilke systemer der egner sig til cloud-drift.",
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
        choiceA: {
          label: "Avanceret Cloud-sikkerhed",
          text: "+3 tid, +3 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard-sikkerhed",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek databehandleraftaler og lovkrav ved cloud-hosting.",
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

    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér kritiske systemer og hvor de er mest sårbare ved nedbrud.",
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
      "Hospitalets forbindelse mod internettet er ikke dimensioneret til 
       stigende brug af cloud og videomøder."
    `,
    glossaryTerms: ["WAN","CAB","Cloud-løsninger"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Overvåg båndbreddeforbrug og identificér peak-perioder.",
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
      "Hospitalet driver flere eksterne webservices for samarbejdspartnere, men 
       en enkelt server bliver let overbelastet."
    `,
    glossaryTerms: ["Load Balancer","High Availability","CAB","WAN"],

    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Opsæt en load balancer i DMZ til at fordele trafikken.",
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
        choiceA: {
          label: "Avanceret DDoS-beskyttelse",
          text: "+3 tid, +2 security",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Ingen speciel beskyttelse",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek licensaftaler og regler for drift af eksterne services.",
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
      "Hospitalet har to datacentre i forskellige bygninger, 
       men vil samle ressourcer for enklere administration."
    `,
    glossaryTerms: ["High Availability","WAN","Virtualisering","CAB"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Afklar krav til oppetid, hastighed og georedundans.",
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
        choiceA: {
          label: "Virtualiser + centralisér",
          text: "+3 tid, +2 development",
          recommended: false,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Manuel flytning + ingen virt.",
          text: "+5% risk",
          recommended: false,
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for fysisk og logisk sikkerhed i det nye centrale datacenter.",
        choiceA: {
          label: "Avanceret adgangskontrol + netværkssegmentering",
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
      "For at behandle store mængder billeddata vil hospitalet sætte 
       et HPC cluster op, men det kræver god infrastruktur og sikkerhed."
    `,
    glossaryTerms: ["High Availability","WAN","Integration"],

    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Indkøb hardware til HPC (GPU'er, high-speed netværk).",
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
    glossaryTerms: ["Load Balancer","Integration","CAB"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Analyser trafikmønstre ved vagtskifte, hvornår peak opstår.",
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
    glossaryTerms: ["Cloud-løsninger","HPC","High Availability","WAN"],

    steps: [
      {
        location: "hospital",
        stepDescription: "Vurder hvilke HPC-opgaver egner sig til cloud (datamængder, latency).",
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
