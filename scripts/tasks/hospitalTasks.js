// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    title: "Serverpark genopgradering",
    shortDesc: "Modernisér en aldrende serverpark med HPC og failover.",
    logicLong: `
      Hospitalets servere er forældede og ustabile. Du skal tilføje HPC til tunge beregninger (f.eks. AI og billedanalyse) og implementere failover-løsninger for at sikre driften.
    `,
    narrativeIntro: `
      I datacentret ser du gamle, støjende servere, der ofte genstarter. Personalet er bekymrede for, at driftsforstyrrelser kan medføre alvorlige problemer.
    `,
    learningInfo: `
      Læringspunkt: En moderne serverpark med <span class="hoverTooltip" data-tooltip="HPC: High Performance Computing, som øger systemets beregningskapacitet">HPC</span> og failover-løsninger mindsker risikoen for nedbrud. En detaljeret kapacitetsanalyse er nøglen til en succesfuld opgradering.
    `,
    knowledgeRecap: `
      En opgradering reducerer risikoen for nedbrud og sikrer, at systemet kan håndtere moderne opgaver. Dokumentationen er essentiel for at vise, hvordan systemet genoprettes ved fejl.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret kapacitetsanalyse (strøm, køling, HPC-krav).",
        choiceA: {
          label: "Dybt tjek",
          text: "+3 tid, -150 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med IT- og driftsafdelingen om planlagt nedetid.",
        choiceA: {
          label: "Planlagt nedetid",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret rapport over opgraderingen til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Netværksmodernisering i laboratoriet",
    shortDesc: "Opgradér DNS og AD for stabil og hurtig login.",
    logicLong: `
      Forældede netværkskomponenter forårsager ustabile logins og forbindelser. Du skal opgradere udstyret og konfigurere DNS og AD korrekt.
    `,
    narrativeIntro: `
      En bioanalytiker klager over, at forbindelsen til AD ofte afbrydes, og DNS-fejl medfører langsomme logins.
    `,
    learningInfo: `
      Læringspunkt: Korrekt konfiguration af <span class="hoverTooltip" data-tooltip="DNS: Oversætter domænenavne til IP-adresser">DNS</span> og <span class="hoverTooltip" data-tooltip="AD: Active Directory – styrer netværksressourcer">AD</span> er afgørende for et stabilt netværk.
    `,
    knowledgeRecap: `
      Et robust netværk med korrekt opsatte DNS- og AD-komponenter sikrer hurtige logins og minimal nedetid.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Udfør en detaljeret analyse af netværksudstyret og konfigurationen.",
        choiceA: {
          label: "Grundig netanalyse",
          text: "+3 tid, -150 kr => +3 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Overfladisk kontrol",
          text: "+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med laboratorieledelsen om planlagt nedetid under opgraderingen.",
        choiceA: {
          label: "Planlagt nedetid",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport over netopgraderingen til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Datacenter opgradering",
    shortDesc: "Opgrader køling, racks og strømforsyning.",
    logicLong: `
      Datacenterets nuværende anlæg er forældet, med ineffektive kølesystemer og slidte racks. Du skal modernisere anlægget for at undgå overophedning og driftsnedbrud.
    `,
    narrativeIntro: `
      Ved ankomsten mærker du varmen og ser slidte serverracks. Personalet er bekymrede for, at overophedning vil føre til systemnedbrud.
    `,
    learningInfo: `
      Læringspunkt: Moderne kølesystemer og serverracks øger driftssikkerheden og reducerer risikoen for nedbrud. En detaljeret opgraderingsplan er afgørende.
    `,
    knowledgeRecap: `
      En opgradering af datacenteret sikrer, at systemet kan køre stabilt under belastning. Dokumentation viser, hvordan nedbrud kan håndteres.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret analyse af datacenterets kapacitet og kølesystem.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, -150 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med driftsafdelingen for en planlagt opgradering uden nedetid.",
        choiceA: {
          label: "Planlagt opgradering",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Uplanlagt opgradering",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Backup-løsning modernisering",
    shortDesc: "Skift fra båndbackup til en disk/cloud-løsning med replikering.",
    logicLong: `
      Den nuværende båndbackup er langsom ved genskabelse. Du skal implementere en moderne løsning, der kombinerer disk og cloud med replikering for hurtig restore.
    `,
    narrativeIntro: `
      En nylig filgendannelse tog alt for lang tid, hvilket skabte frustration. Ledelsen kræver en hurtigere backup-løsning.
    `,
    learningInfo: `
      Læringspunkt: Moderne backup-teknologier med replikering reducerer nedetid og øger datasikkerheden. En veldokumenteret backup-strategi er afgørende.
    `,
    knowledgeRecap: `
      En opgradering af backup-systemet mindsker risikoen for datatab og forbedrer restore-tiderne.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Udarbejd en plan for overgangen til en disk/cloud-løsning.",
        choiceA: {
          label: "Disk + cloud hybrid",
          text: "+3 tid, -120 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Behold bånd, tilføj disk",
          text: "+1 tid => +5% risk.",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg backupkørsler uden at forstyrre den daglige drift.",
        choiceA: {
          label: "Detaljeret tidsplan",
          text: "+2 tid => +1 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Kør om natten",
          text: "0 tid => +5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en backup-strategi til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Virtualiseringsprojekt",
    shortDesc: "Overfør fysiske servere til virtuelle maskiner.",
    logicLong: `
      Fysiske servere er underudnyttede. Virtualisering kan optimere ressourcer og øge skalerbarheden – men kræver en detaljeret migrationsplan.
    `,
    narrativeIntro: `
      Du bemærker, at gamle servere ikke kører optimalt. Der er potentiale for at reducere omkostninger og øge driftssikkerheden ved at virtualisere.
    `,
    learningInfo: `
      Læringspunkt: Virtualisering kan reducere hardwareomkostninger og øge fleksibiliteten. En detaljeret migrationsplan og et testmiljø er nødvendige for en glidende overgang.
    `,
    knowledgeRecap: `
      Virtualisering optimerer ressourcerne, men kræver omhyggelig planlægning og dokumentation.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en hypervisor (f.eks. VMware eller Hyper-V) og udarbejd en migrationsplan.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+3 tid, -100 kr => +2 stability, +1 development.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { stability: 2, development: 1 } }
        },
        choiceB: {
          label: "Hurtig migrering",
          text: "+1 tid, -30 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer afdelingerne om den forventede nedetid under migreringen.",
        choiceA: {
          label: "God kommunikation",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen info",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret plan for virtualiseringen til CAB.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Netværkssegmentering",
    shortDesc: "Opdel netværket i VLAN for at begrænse fejlspredning.",
    logicLong: `
      Et fladt netværk kan føre til, at fejl spreder sig ukontrolleret. Implementering af VLAN og IP-opdeling kan begrænse skaden.
    `,
    narrativeIntro: `
      En driftsvagt fortæller, at en lille netfejl førte til et stort nedbrud i en afdeling. Personalet er bekymrede for de nye IP-adresser.
    `,
    learningInfo: `
      Læringspunkt: Netværkssegmentering med VLAN reducerer spredningen af fejl. Det er vigtigt at informere personalet klart om de nye strukturer.
    `,
    knowledgeRecap: `
      Segmentering mindsker risikoen for omfattende nedbrud, men kræver detaljeret dokumentation.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Planlæg en detaljeret VLAN-struktur og konfigurer routere.",
        choiceA: {
          label: "Omfattende segmentering",
          text: "+3 tid, -120 kr => +2 stability, +1 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Minimal segmentering",
          text: "+1 tid, -40 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer personalet om de nye IP-adresser og loginprocedurer.",
        choiceA: {
          label: "Detaljeret info",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort info",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret netværksplan til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "SD-WAN implementering",
    shortDesc: "Opgrader netværket med SD-WAN for bedre trafikstyring.",
    logicLong: `
      SD-WAN muliggør en effektiv styring af netværkstrafik og optimerer båndbreddeudnyttelsen, hvilket øger forbindelsens stabilitet.
    `,
    narrativeIntro: `
      Andre hospitaler har haft succes med SD-WAN, og personalet er nysgerrige efter at se, hvordan det kan forbedre netværksydelsen.
    `,
    learningInfo: `
      Læringspunkt: SD-WAN forbedrer netværksadministrationen ved at optimere trafikken. En detaljeret implementeringsplan er essentiel for en problemfri integration.
    `,
    knowledgeRecap: `
      SD-WAN optimerer trafikken, men kræver nøje planlægning og dokumentation for at sikre en problemfri overgang.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser det eksisterende netværk og identificer flaskehalse.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, -100 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, -30 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med netværksteamet om implementeringen.",
        choiceA: {
          label: "Planlagt implementering",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig implementering",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret rapport over SD-WAN implementeringen.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
  },
  {
    title: "Infrastruktur-overvågning",
    shortDesc: "Implementér et system til realtidsovervågning af servere og netværk.",
    logicLong: `
      Et robust overvågningssystem giver dig mulighed for at opdage problemer, før de udvikler sig til alvorlige nedbrud.
    `,
    narrativeIntro: `
      Du bemærker, at visse servere kører ineffektivt, og personalet savner et overblik over systemets tilstand.
    `,
    learningInfo: `
      Læringspunkt: Et effektivt overvågningssystem, der indsamler realtidsdata, kan forhindre større nedbrud og hjælpe med at identificere potentielle problemer tidligt.
    `,
    knowledgeRecap: `
      Infrastruktur-overvågning øger driftsikkerheden, men kræver detaljeret dokumentation for at vise, hvordan systemet fungerer.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Installer og konfigurer overvågningssoftware til servere og netværk.",
        choiceA: {
          label: "Avanceret opsætning",
          text: "+3 tid, -100 kr => +2 stability, +1 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Basal opsætning",
          text: "+1 tid, -30 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer personalet om de nye overvågningsprocedurer.",
        choiceA: {
          label: "Detaljeret briefing",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret overvågningsplan til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Energioptimering i datacenter",
    shortDesc: "Reducer energiforbruget ved at opgradere kølesystemer og hardware.",
    logicLong: `
      Datacenterets forældede kølesystemer og ineffektive servere medfører højt energiforbrug. Du skal implementere moderne, energieffektive løsninger.
    `,
    narrativeIntro: `
      Ved ankomsten bemærker du, at datacentret er overophedet og bruger meget energi, hvilket påvirker driftsomkostningerne negativt.
    `,
    learningInfo: `
      Læringspunkt: Energioptimering reducerer omkostninger og miljøpåvirkning. Moderne kølesystemer og hardware forbedrer både stabilitet og bæredygtighed.
    `,
    knowledgeRecap: `
      Energibesparende tiltag mindsker driftsomkostninger og øger systemets robusthed. Det er vigtigt at dokumentere de implementerede løsninger.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret energianalyse af datacenteret.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, -100 kr => +2 stability.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, -30 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer driftsafdelingen om de energibesparende tiltag.",
        choiceA: {
          label: "Detaljeret briefing",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret rapport over de energibesparende tiltag.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Cloud-infrastruktur integration",
    shortDesc: "Integrér lokal infrastruktur med cloud-tjenester for øget skalerbarhed.",
    logicLong: `
      Hospitalet ønsker at udnytte cloud-teknologier for at øge fleksibiliteten og reducere omkostningerne. Du skal integrere de lokale systemer med cloud-løsninger.
    `,
    narrativeIntro: `
      Du bemærker, at den nuværende infrastruktur har begrænsninger, og en hybrid løsning med cloud kan tilbyde bedre ressourceudnyttelse.
    `,
    learningInfo: `
      Læringspunkt: En hybrid infrastruktur kombinerer det bedste fra begge verdener. Det er afgørende at planlægge sikker dataoverførsel og integration mellem lokale og cloud-baserede systemer.
    `,
    knowledgeRecap: `
      Cloud-integration øger skalerbarheden, men kræver detaljeret planlægning og dokumentation for at sikre sikkerhed og drift.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser den eksisterende infrastruktur og udarbejd en integrationsplan.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, -150 kr => +2 stability, +1 security.",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med interne teams og cloud-specialister om integrationen.",
        choiceA: {
          label: "Planlagt integration",
          text: "+2 tid => +2 hospitalSatisfaction.",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig integration",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk.",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret cloud-integrationsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk.",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }
];
