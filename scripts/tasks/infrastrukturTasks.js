// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    title: "Serverpark genopgradering",
    shortDesc: "Modernisér en aldrende serverpark med HPC og failover for stabil drift.",
    logicLong: `
      Hospitalets servere er gamle og ustabile. Du skal tilføje HPC til tunge beregninger (f.eks. AI og billedanalyse) samt implementere failover-løsninger for at undgå kritiske nedbrud.
    `,
    narrativeIntro: `
      Når du træder ind i datacentret, ser du rækker af gamle, larmende servere, der genstarter ofte. Personalet er bekymrede for driftstab, hvis der ikke foretages en opgradering.
    `,
    learningInfo: `
      Læringspunkt: En opgradering af serverparken med <span class="hoverTooltip" data-tooltip="HPC: High Performance Computing, som øger beregningskapaciteten">HPC</span> og failover sikrer en stabil drift. En detaljeret kapacitetsanalyse er afgørende for en succesfuld opgradering.
    `,
    knowledgeRecap: `
      Forældede servere kan føre til driftsproblemer. En moderne serverpark med failover reducerer risikoen for nedbrud og understøtter de krævende opgaver.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret kapacitetsanalyse af serverparken (strøm, køling, HPC-krav).",
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
        stepDescription: "Koordiner med IT-afdelingen for at planlægge en opgradering uden for normal drift.",
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
        stepDescription: "Udarbejd en detaljeret opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Netværksmodernisering i laboratoriet",
    shortDesc: "Opgradér netværket (DNS, AD) for hurtigere data og stabil login.",
    logicLong: `
      Laboratorierne oplever forsinkelser og ustabile logins pga. forældede netværkskomponenter. Du skal modernisere udstyret og konfigurere DNS og AD korrekt.
    `,
    narrativeIntro: `
      En bioanalytiker klager over, at forbindelsen til AD ofte mistes, og DNS-fejl forårsager langsomme logins. Ledelsen ønsker et mere pålideligt netværk.
    `,
    learningInfo: `
      Læringspunkt: En opgradering af netværket, inklusiv korrekt opsætning af <span class="hoverTooltip" data-tooltip="DNS: Oversætter domænenavne til IP-adresser">DNS</span> og <span class="hoverTooltip" data-tooltip="AD: Active Directory til styring af netværksressourcer">AD</span>, er essentiel for hurtig og stabil drift.
    `,
    knowledgeRecap: `
      Et robust netværk sikrer hurtige logins og minimal nedetid. Det kræver en grundig analyse og dokumentation for at sikre, at personalet kan tilpasse sig.
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
        stepDescription: "Koordiner med laboratorieledelsen om nedetid ved netopgraderingen.",
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Datacenter opgradering",
    shortDesc: "Opgrader køling, racks og strømforsyning for at sikre kontinuerlig drift.",
    logicLong: `
      Datacenterets nuværende anlæg er forældet, og kølesystemet er ineffektivt. Du skal implementere moderne racks og energibesparende køleteknologier.
    `,
    narrativeIntro: `
      Når du træder ind i datacentret, mærker du varmen og ser slidte serverracks. Personalet er bekymrede for overophedning og nedbrud.
    `,
    learningInfo: `
      Læringspunkt: En opgradering af datacenteret med moderne kølesystemer og racks øger robustheden og sikrer kontinuerlig drift. Effektiv energiudnyttelse er afgørende.
    `,
    knowledgeRecap: `
      En moderne datacenterløsning reducerer risikoen for overophedning og nedbrud. Dokumentation er nødvendig for at vise, hvordan systemet kan gendannes ved fejl.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret analyse af datacenterets kapacitet, herunder køling og strømforsyning.",
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
        stepDescription: "Koordiner med driftsafdelingen for at planlægge opgraderingen uden nedetid.",
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Backup-løsning modernisering",
    shortDesc: "Skift fra båndbackup til en disk/cloud-løsning med replikering.",
    logicLong: `
      Den nuværende båndbackup er langsom ved genskabelse. Du skal implementere en moderne backup-løsning, der kombinerer disk og cloud med replikering for hurtig restore.
    `,
    narrativeIntro: `
      En nylig filgendannelse tog alt for lang tid, hvilket skabte frustration. Personalet kræver en hurtigere og mere pålidelig backup-løsning.
    `,
    learningInfo: `
      Læringspunkt: Moderne backup-teknologier med replikering reducerer nedetid og øger datasikkerheden. Det er essentielt med en detaljeret strategi og dokumentation.
    `,
    knowledgeRecap: `
      Opgradering af backup-systemet mindsker risikoen for datatab og forbedrer restore-tiderne. Dokumentationen er afgørende for at demonstrere backup-strategiens effektivitet.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg den nye backupmetode og udarbejd en plan for overgangen.",
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
        stepDescription: "Dokumentér backup-strategien til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Virtualiseringsprojekt",
    shortDesc: "Overfør fysiske servere til virtuelle maskiner for bedre ressourceudnyttelse.",
    logicLong: `
      Mange fysiske servere er underudnyttede. Ved virtualisering kan ressourcerne optimeres, og systemet kan skaleres mere fleksibelt – forudsætter en detaljeret migrationsplan.
    `,
    narrativeIntro: `
      Du bemærker, at gamle servere kører ineffektivt, og der er et stort potentiale for at reducere omkostninger og øge driftssikkerheden ved at virtualisere.
    `,
    learningInfo: `
      Læringspunkt: Virtualisering kan øge fleksibiliteten og reducere hardwareomkostninger, men kræver en veldefineret migrationsplan og et testmiljø for at sikre en glidende overgang.
    `,
    knowledgeRecap: `
      Virtualisering optimerer ressourceudnyttelsen, men kræver omhyggelig planlægning og dokumentation.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en hypervisor (f.eks. VMware eller Hyper-V) og udarbejd en migrationsplan.",
        choiceA: {
          label: "Detaljeret migrationsplan",
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
          label: "Ingen information",
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Netværkssegmentering",
    shortDesc: "Opdel netværket i VLAN for bedre stabilitet og sikkerhed.",
    logicLong: `
      Hospitalets netværk er fladt, hvilket øger risikoen for udbredte nedbrud. Implementering af VLAN kan begrænse spredningen af fejl.
    `,
    narrativeIntro: `
      En driftsvagt fortæller, at en lille netfejl for nylig førte til et omfattende nedbrud i en afdeling. Personalet er bekymrede over de nye IP-adresser.
    `,
    learningInfo: `
      Læringspunkt: Netværkssegmentering med VLAN mindsker risikoen for, at fejl spreder sig. Det er vigtigt at informere personalet klart om de nye IP-strukturer.
    `,
    knowledgeRecap: `
      Segmentering reducerer nedbrudsomfanget, men kræver detaljeret dokumentation for at sikre, at alle forstår de nye netværksregler.
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "SD-WAN implementering",
    shortDesc: "Opgrader netværket med SD-WAN for bedre trafikstyring og fleksibilitet.",
    logicLong: `
      SD-WAN muliggør effektiv styring af netværkstrafik, optimerer båndbreddeudnyttelsen og øger forbindelsens stabilitet.
    `,
    narrativeIntro: `
      Du hører, at andre hospitaler har haft stor succes med SD-WAN, og personalet er nysgerrige efter at se, hvordan det kan forbedre netværksydelsen her.
    `,
    learningInfo: `
      Læringspunkt: SD-WAN forbedrer netværksadministrationen ved at fordele trafikken optimalt. Det er vigtigt med en detaljeret implementeringsplan for at integrere SD-WAN med den eksisterende infrastruktur.
    `,
    knowledgeRecap: `
      SD-WAN optimerer trafikken, men kræver omhyggelig planlægning og dokumentation for at sikre en problemfri integration.
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
        stepDescription: "Koordiner med netværksteamet for implementering.",
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
        stepDescription: "Dokumentér SD-WAN implementeringen til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Infrastruktur-overvågning",
    shortDesc: "Implementér et overvågningssystem til servere og netværk.",
    logicLong: `
      Et robust overvågningssystem giver realtidsindsigt i infrastrukturens ydeevne og kan advare om potentielle nedbrud.
    `,
    narrativeIntro: `
      Du bemærker, at visse servere kører ineffektivt, og personalet ønsker et bedre overblik over systemets tilstand.
    `,
    learningInfo: `
      Læringspunkt: Infrastruktur-overvågning er afgørende for tidlig identifikation af problemer. Et system med realtidsdata kan forhindre større nedbrud.
    `,
    knowledgeRecap: `
      Et godt overvågningssystem øger driftsikkerheden. Det er nødvendigt med en detaljeret dokumentation af systemet for at sikre compliance.
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Energioptimering i datacenter",
    shortDesc: "Reducer energiforbruget ved at opgradere kølesystemer og hardware.",
    logicLong: `
      Datacenterets energiforbrug er højt på grund af forældet køleteknologi og ineffektive servere. Du skal implementere energibesparende tiltag.
    `,
    narrativeIntro: `
      Ved ankomsten bemærker du, at datacentret er overophedet og bruger meget energi, hvilket skaber bekymring for driftsomkostningerne.
    `,
    learningInfo: `
      Læringspunkt: Energioptimering i datacentret kan reducere omkostninger og forbedre systemets miljømæssige fodaftryk. Moderne kølesystemer og effektiv hardware er nøglen.
    `,
    knowledgeRecap: `
      Energibesparende tiltag reducerer driftsomkostninger og øger bæredygtigheden. Det er vigtigt med detaljeret dokumentation af de implementerede løsninger.
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
        stepDescription: "Informer driftsafdelingen om de planlagte energibesparende tiltag.",
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
        stepDescription: "Dokumentér de energibesparende tiltag til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Cloud-infrastruktur integration",
    shortDesc: "Integrér den lokale infrastruktur med cloud-tjenester for øget skalerbarhed.",
    logicLong: `
      Hospitalet ønsker at udnytte cloud-teknologier for at forbedre fleksibilitet og skalerbarhed i infrastrukturen. Du skal integrere lokale systemer med cloud-løsninger.
    `,
    narrativeIntro: `
      Du bemærker, at den nuværende infrastruktur er begrænset, og at en hybrid løsning med cloud kan tilbyde bedre ressourceudnyttelse og fleksibilitet.
    `,
    learningInfo: `
      Læringspunkt: Integration med cloud-tjenester kan øge fleksibiliteten og reducere omkostningerne. En vellykket hybrid infrastruktur kræver en robust plan for sikker dataoverførsel.
    `,
    knowledgeRecap: `
      Cloud-integration giver øget skalerbarhed, men kræver detaljeret planlægning og dokumentation for at sikre sikkerhed og driftssikkerhed.
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
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }
];
