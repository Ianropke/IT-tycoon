// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [

  {
    title: "Serverpark Genopgradering",
    shortDesc: "Modernisér en aldrende serverpark med HPC og failover for stabil drift.",
    logicLong: `
      Hospitalets servere er gamle og ustabile. Du vil tilføje HPC 
      til tunge beregninger (AI, billedanalyse) samt failover-løsninger 
      for at undgå kritiske nedbrud.
    `,
    narrativeIntro: `
      Du træder ind i datacentret og ser rækker af larmende, ældre servere. En tekniker fortæller, at de genstarter ret ofte. HPC kan give ekstra kraft, men budgettet er stramt.
    `,
    learningInfo: `
      Læringspunkt: Ved at modernisere serverparken med HPC og failover-løsninger sikres en stabil drift. 
      <span class="hoverTooltip" data-tooltip="High Performance Computing: Avanceret beregningskapacitet til tunge beregninger">HPC</span> giver ekstra regnekraft, mens en korrekt implementeret failover forhindrer nedbrud og driftstab.
      Det er vigtigt at dokumentere, hvordan systemet kan genoprettes ved fejl.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Lav en grundig kapacitetsanalyse (strøm, køling, HPC-krav).",
        choiceA: {
          label: "Dybt tjek",
          text: "+3 tid, -150 kr => +2 stability (gennemarbejdet plan).",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, -50 kr => +1 stability, +5% risk (overser problemer).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Afklar servicevindue med afdelingerne, når servere skal opgraderes.",
        choiceA: {
          label: "Planlagt nedetid",
          text: "+2 tid => +2 hospitalSatisfaction (alle informeres).",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen forklaring",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (stor utilfredshed).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér HPC og failover-design til CAB, evt. ift. NIS2.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Netværksmodernisering i Laboratoriet",
    shortDesc: "Opgradér netværket (DNS, AD) i laboratorierne for hurtigere data og stabil login.",
    logicLong: `
      Laboratorierne oplever forsinkelser og ustabile logins. Du vil modernisere switches, DNS-konfiguration og AD-integration for at optimere arbejdsgangene.
    `,
    narrativeIntro: `
      En bioanalytiker bander over, at systemet ofte mister forbindelse til AD. DNS-fejl gør login langsomt. Laboratoriechefen vil have netværket på højt niveau.
    `,
    learningInfo: `
      Læringspunkt: En stabil netværksinfrastruktur er afgørende for et velfungerende laboratorium. 
      Ved at optimere <span class="hoverTooltip" data-tooltip="Domain Name System: System til oversættelse af domænenavne til IP-adresser">DNS</span> og 
      <span class="hoverTooltip" data-tooltip="Active Directory: Microsofts katalogtjeneste til at håndtere brugere og ressourcer">AD</span> sikres hurtige logins og en robust drift.
      Korrekt konfiguration forhindrer flaskehalse og nedbrud.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Undersøg netværksudstyr (switches, routere) samt DNS-opsætning og AD.",
        choiceA: {
          label: "Grundig netanalyse",
          text: "+3 tid, -150 kr => +3 stability (alle flaskehalse rettes).",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+1 tid, -50 kr => +1 stability, +5% risk (noget forbliver ustabilt).",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner evt. nedetid med laboratorieledelsen ved DNS/AD-omlægning.",
        choiceA: {
          label: "Planlagt nedbrud",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér netopgraderingen til CAB (evt. ISO 27001 henvisning).",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort memo",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Datacenter Opgradering",
    shortDesc: "Forbedr køling, reoler og replikering i datacenter for sikker drift.",
    logicLong: `
      Hospitalets datacenter er presset på plads og køling. Du vil opgradere rack, strøm og indføre replikering, så data ikke går tabt ved fejl.
    `,
    narrativeIntro: `
      Datacentret er hedt, og en ventilator summer anstrengt. Personalet advarer om risiko for overophedning. En reel opgradering er på høje tid.
    `,
    learningInfo: `
      Læringspunkt: En effektiv opgradering af datacenteret, herunder forbedret køling og replikering, er afgørende for datasikkerheden.
      Ved at sikre, at data kan replikere og systemet kan genoprettes, opfyldes NIS2-kravene – og risikoen for nedbrud minimeres.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Gennemfør kapacitetsanalyse (rack, køleanlæg, replikering).",
        choiceA: {
          label: "Stor analyse",
          text: "+3 tid, -120 kr => +2 stability (grundigt overblik).",
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "+1 tid, -40 kr => +1 stability, +5% risk (risiko for oversete fejl).",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Fortæl om mulig nedetid under rack/strømopgraderinger.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen forklaring",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se design med replikering + failover.",
        choiceA: {
          label: "Omfattende rapport",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Backup-løsning Modernisering",
    shortDesc: "Skift fra båndbackup til disk/cloud + replikering for hurtigere restore.",
    logicLong: `
      Hospitalet kører ældre båndbackup. Ved genskabelse tager det lang tid. Du vil have disk/cloud og evt. replikering, så data nemt kan hentes tilbage.
    `,
    narrativeIntro: `
      En akut situation førte til, at en kritisk fil måtte gendannes fra bånd. Det tog alt for lang tid. Ledelsen kræver en hurtigere løsning.
    `,
    learningInfo: `
      Læringspunkt: Overgangen fra båndbackup til en disk/cloud-løsning med replikering kan drastisk reducere genskabelsestiden. 
      En veldokumenteret backup-strategi er nøglen til at opfylde NIS2-kravene og sikre, at data hurtigt kan hentes tilbage i tilfælde af fejl.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg ny backupmetode (disk, cloud, replikering).",
        choiceA: {
          label: "Disk + Cloud Hybrid",
          text: "+3 tid, -120 kr => +2 stability (robust gendannelse).",
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Behold bånd + lidt disk",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg tidspunkt for større backupkørsler uden at forstyrre drift.",
        choiceA: {
          label: "Detaljeret tidsplan",
          text: "+2 tid => +1 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 1 } }
        },
        choiceB: {
          label: "Bare kør om natten",
          text: "0 tid => +5% risk (ingen test).",
          applyEffect: { riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver backup-strategi med replikering beskrevet.",
        choiceA: {
          label: "Fuld doc",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Virtualiseringsprojekt",
    shortDesc: "Kør LIMS på virtuelle maskiner, evt. med live migration og testmiljø.",
    logicLong: `
      Mange fysiske servere er underudnyttet. Ved virtualisering sparer man ressourcer og kan let flytte VM’er. Personalet frygter dog nye fejlscenarier.
    `,
    narrativeIntro: `
      En netadmin peger på en stak gamle servere. Vi kunne nedbringe strømforbruget og øge driftssikkerheden, men hvis noget går galt under migreringen, bliver det rod.
    `,
    learningInfo: `
      Læringspunkt: Virtualisering kan reducere hardwareomkostninger og øge fleksibiliteten. 
      En detaljeret migrationsplan og et testmiljø er nødvendige for at sikre en glidende overgang og minimere nedetid.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg hypervisor (VMware, Hyper-V) og planlæg migrering af LIMS.",
        choiceA: {
          label: "Detaljeret migrationsplan",
          text: "+3 tid, -100 kr => +2 stability, +1 development",
          applyEffect: { timeCost: 3, moneyCost: 100, statChange: { stability: 2, development: 1 } }
        },
        choiceB: {
          label: "Hurtig migrering",
          text: "+1 tid, -30 kr => +1 stability, +5% risk (konfigurationsfejl?).",
          applyEffect: { timeCost: 1, moneyCost: 30, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informér afdelinger om mulig kort nedetid under VM-flyt.",
        choiceA: {
          label: "God kommunikation",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen info",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en VM-plan med testmiljø og fallback.",
        choiceA: {
          label: "Omfattende doc",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Netværkssegmentering",
    shortDesc: "Opdel netværket i VLAN for bedre stabilitet og sikkerhed.",
    logicLong: `
      Hospitalets net er en flad struktur, så en fejl eller et angreb kan sprede sig vidt. Ved at segmentere med VLAN og IP-opdeling mindsker man risiko og nedbrudsomfang.
    `,
    narrativeIntro: `
      En driftsvagt fortæller, at en lille netfejl førte til stort nedbrud i en anden afdeling. VLAN kan begrænse spredningen, men folk klager ofte over IP-ændringer.
    `,
    learningInfo: `
      Læringspunkt: Netværkssegmentering med VLAN reducerer risikoen for, at fejl spreder sig. 
      Det forudsætter, at medarbejderne lærer de nye <span class="hoverTooltip" data-tooltip="Virtual LAN: En metode til at opdele et fysisk netværk i flere logiske netværk">VLAN</span>‑konfigurationer og IP-adresser, så de kan tilpasse sig den nye struktur.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Opsæt VLAN, routere og nye IP-adresser til LIMS og afdelinger.",
        choiceA: {
          label: "Dybt net-opdeling",
          text: "+3 tid, -120 kr => +2 stability, +1 security (mindre risiko).",
          applyEffect: { timeCost: 3, moneyCost: 120, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Minimal segmentering",
          text: "+1 tid, -40 kr => +1 stability, +5% risk (stor spredning mulig).",
          applyEffect: { timeCost: 1, moneyCost: 40, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Forklar afdelinger om nye IP-adresser og login-flow.",
        choiceA: {
          label: "Detaljeret info",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort mail",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (afdelinger forstår ikke ændringen).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se netværksdiagrammer for VLAN og routerregler.",
        choiceA: {
          label: "Fuld diag",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Forbedring af Dataoverførselshastighed",
    shortDesc: "Opgradér net til 10Gbit og tilføj loadbalancering for hurtigere LIMS.",
    logicLong: `
      Brugerklager om langsom dataoverførsel. Ved at indføre 10Gbit net og loadbalancering af servere kan man undgå flaskehalse.
    `,
    narrativeIntro: `
      Lab-personalet siger, at store billedfiler tager en evighed at uploade. En 10Gbit-forbindelse og loadbalancer vil potentielt løfte farten, men koster.
    `,
    learningInfo: `
      Læringspunkt: Opgradering til 10Gbit-netværk og implementering af <span class="hoverTooltip" data-tooltip="Loadbalancering: Fordeling af trafik mellem flere servere for optimal ydelse">loadbalancering</span> kan fjerne flaskehalse. 
      Det er afgørende at kommunikere ændringerne klart til brugerne, så de forstår, hvorfor systemet ændres, og hvordan de kan tilpasse sig.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Installer 10Gbit netkort/switche og opsæt loadbalancer på servere.",
        choiceA: {
          label: "Køb 10G-hardware",
          text: "+3 tid, -200 kr => +3 stability (hurtig dataflow).",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Bliv på 1G og lidt tuning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Fortæl brugerne om nedetid og ny URL ved loadbalancer.",
        choiceA: {
          label: "Grundig info",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen melding",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver plan for loadbalancer og 10G net samt eventuel SLA.",
        choiceA: {
          label: "Grundig dokumentation",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Integration af Cloud-Løsninger",
    shortDesc: "Flyt dele af infrastrukturen til cloud (AWS/Azure) med AD og compliance.",
    logicLong: `
      Hospitalet overvejer at køre dele af LIMS i skyen for bedre skalerbarhed. Men der skal sikres VPN/DirectConnect, AD-trust, samt NIS2-lignende krav opfyldes.
    `,
    narrativeIntro: `
      En cloudleverandør lover fleksibilitet og prisfordele. Men personalet frygter latency, og der skal laves en robust AD/dns-løsning.
    `,
    learningInfo: `
      Læringspunkt: En vellykket cloud-integration kræver, at VPN/DirectConnect, <span class="hoverTooltip" data-tooltip="AD-trust: Tillid mellem on-premise og cloud Active Directory">AD-trust</span> og DNS er korrekt konfigureret. 
      En solid løsning kan reducere on-premise omkostninger og sikre, at systemet opfylder både GDPR og NIS2.
    `,
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Konfigurer VPN/DirectConnect, AD-trust og DNS mellem cloud og lokalt net.",
        choiceA: {
          label: "Forbedret netforbindelse",
          text: "+3 tid, -150 kr => +2 stability, +1 security",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Brug eksisterende net",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk (usikkert).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Fortæl afdelinger om ny cloud-løsning, mulig latency og ændrede URL'er.",
        choiceA: {
          label: "Grundig gennemgang",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort mail",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (manglende buy-in).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver en compliance-rapport om cloud, inkl. Databehandleraftale.",
        choiceA: {
          label: "Fuld doc",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
