// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    title:"Serverpark Genopgradering",
    shortDesc:`
      Opgradér 
      <span class="hoverTooltip" data-tooltip="Fysiske servere i datacenter.">serverparken</span>
      med ny hardware og <span class="hoverTooltip" data-tooltip="Extra HPC-kraft til tunge LIMS-opgaver.">HPC</span>.
    `,
    logicLong:`
      Hospitalets datacenter er fyldt med forældede servere, der ofte fejler. 
      Du vil indføre HPC-kapacitet for store analyser og 
      <span class="hoverTooltip" data-tooltip="Failover: at kunne skifte hurtigt til en anden server, hvis primær fejler.">failover</span>
      til at minimere nedetid.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Gennemfør en <span class="hoverTooltip" data-tooltip="Evaluering af hardware, køling, HPC-krav.">kapacitetsanalyse</span> 
          og planlæg HPC-indkøb.
        `,
        choiceA:{
          label:"Grundig evaluering",
          text:"+3 tid, -150 kr => +2 stability (solid plan).",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Overfladisk check",
          text:"+1 tid, -50 kr => +1 stability, +5% risk (du overser måske fejl).",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:`
          Koordiner <span class="hoverTooltip" data-tooltip="Nedetid i produktionsmiljø skal varsles for personalet.">servicevindue</span> 
          med alle afdelinger.
        `,
        choiceA:{
          label:"Planlagt nedetid",
          text:"+2 tid => +2 hospitalSatisfaction (god kommunikation).",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen forklaring",
          text:"0 tid => -10 hospital, +5% risk (stor utilfredshed).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Dokumentér opgraderingsprocessen og HPC-arkitektur til CAB.",
        choiceA:{
          label:"Detaljeret rapport",
          text:"+2 tid => ingen ekstra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Netværksmodernisering i Laboratoriet",
    shortDesc:`
      Opgradér 
      <span class="hoverTooltip" data-tooltip="Lab-netværk, inkl. DNS/AD for brugerstyring.">netværket</span>
      i laboratorierne for hurtigere data og bedre stabilitet.
    `,
    logicLong:`
      Laboratorierne oplever udfald og forsinkelser. 
      Du vil modernisere switches, 
      <span class="hoverTooltip" data-tooltip="Domain Name System: Omsætter navne til IP-adresser.">DNS</span> 
      og 
      <span class="hoverTooltip" data-tooltip="Active Directory: central brugerstyring.">AD</span>
      for at sikre god login-oplevelse.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Kortlæg 
          <span class="hoverTooltip" data-tooltip="Fx IP-adresser, DNS-opsætning, AD integration.">netværksopbygning</span>
          og udfald.
        `,
        choiceA:{
          label:"Detaljeret netanalyse",
          text:"+3 tid, -150 kr => +3 stability (du finder alle flaskehalse).",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Hurtig vurdering",
          text:"+1 tid, -50 kr => +1 stability, +5% risk.",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Planlæg nedetid for DNS/AD-omlægning med laboratorieledelsen.",
        choiceA:{
          label:"Planlagt nedbrud",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen varsel",
          text:"0 tid => -10 hospital, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Dokumentér netmoderniseringen (DNS/AD) til CAB.",
        choiceA:{
          label:"Fuld dokumentation",
          text:"+2 tid => ingen ekstra risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Kort rapport",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Datacenter Opgradering",
    shortDesc:`
      Omlæg 
      <span class="hoverTooltip" data-tooltip="Fysiske serverrum, racks, køleanlæg.">datacenteret</span>
      til større kapacitet, replikering og failover.
    `,
    logicLong:`
      Hospitalets datacenter er presset på køling og plads. 
      Du vil opgradere racks, strøm og lave 
      <span class="hoverTooltip" data-tooltip="At kopiere data (evt. real-time) til sekundær lokation.">replikering</span> 
      for failover.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Gennemfør kapacitetsanalyse af racks, køleanlæg og 
          <span class="hoverTooltip" data-tooltip="Failover: skift til et sekundært datacenter hvis primært fejler.">failover-løsning</span>.
        `,
        choiceA:{
          label:"Stor analyse",
          text:"+3 tid, -120 kr => +2 stability (grundig plan).",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Overfladisk check",
          text:"+1 tid, -40 kr => +1 stability, +5% risk (overser muligvis fejl).",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér om mulig nedetid under racks/strømomlægning.",
        choiceA:{
          label:"Detaljeret plan",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen forklaring",
          text:"0 tid => -10 hospital, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se failover & replikering-design.",
        choiceA:{
          label:"Omfattende rapport",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Backup-løsning Modernisering",
    shortDesc:`
      Skift fra 
      <span class="hoverTooltip" data-tooltip="Ældre teknik til backup, langsom restore.">båndbackup</span>
      til disk/cloud og replikering.
    `,
    logicLong:`
      Hospitalet bruger forældet båndbackup. 
      Du vil indføre replikering til en 
      <span class="hoverTooltip" data-tooltip="Produktion (prod) er det rigtige miljø, replikering til et sekundært site.">sekundær lokation</span>
      for hurtigere restore.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg ny backup-strategi (disk, cloud, replikering).",
        choiceA:{
          label:"Disk + Cloud Hybrid",
          text:"+3 tid, -120 kr => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Behold bånd + minimal disk",
          text:"+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Planlæg hvornår man kan køre store replikeringer uden driftforstyrrelser.",
        choiceA:{
          label:"Detaljeret tidsplan",
          text:"+2 tid => +1 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:1 } }
        },
        choiceB:{
          label:"Bare kør om natten",
          text:"0 tid => +5% risk (ingen test).",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se backup + replikering-strategi.",
        choiceA:{
          label:"Fuld backup-doc",
          text:"+2 tid => ingen risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Sparsom doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Virtualiseringsprojekt",
    shortDesc:`
      Kør LIMS på virtuelle maskiner med 
      <span class="hoverTooltip" data-tooltip="Failover eller live migration kan undgå nedetid.">live migration</span>.
    `,
    logicLong:`
      Hospitalets fysiske servere er underudnyttet. 
      Du vil virtualisere for bedre udnyttelse, 
      <span class="hoverTooltip" data-tooltip="Hvis én VM fejler, kan en anden overtage.">failover</span>
      og staging/test-miljø.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg hypervisor (VMware, Hyper-V) og planlæg migrering.",
        choiceA:{
          label:"Grundig migrationsplan",
          text:"+3 tid, -100 kr => +2 stability, +1 development",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ stability:2, development:1 } }
        },
        choiceB:{
          label:"Hurtig migrering",
          text:"+1 tid, -30 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér afdelinger om mulig downtime for VM-flyt.",
        choiceA:{
          label:"God kommunikation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen info",
          text:"0 tid => -10 hospital, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se <span class='hoverTooltip' data-tooltip='Testmiljø før man rykker til prod.'>staging-plan</span> for VM’er.",
        choiceA:{
          label:"Omfattende doc",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Lille doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Netværkssegmentering",
    shortDesc:`
      Adskil netværket i <span class="hoverTooltip" data-tooltip="VLAN = Virtual LAN.">VLAN</span> 
      for sikkerhed og oppetid.
    `,
    logicLong:`
      Hospitalets net er fladt – en fejl kan sprede sig til hele netværket. 
      Ved segmentering i VLAN kan man begrænse skader, men det kræver IP-plan, DNS-justering og AD-opsætning.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Opsæt VLAN, routere, IP-adresser til LIMS/afdelinger.",
        choiceA:{
          label:"Grundig net-opdeling",
          text:"+3 tid, -120 kr => +2 stability, +1 security",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Mindre opdeling",
          text:"+1 tid, -40 kr => +1 stability, +5% risk (fejl kan stadig brede sig).",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Fortæl afdelinger om nye IP-adresser og login-flow.",
        choiceA:{
          label:"Detaljeret info",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Kort mail",
          text:"0 tid => -10 hospital, +5% risk (afdelinger forstår ikke IP-ændringer).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se netværksdiagram og VLAN-regler.",
        choiceA:{
          label:"Fuld diag",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Sparsom doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Forbedring af Dataoverførselshastighed",
    shortDesc:`
      Opgradér net og 
      <span class="hoverTooltip" data-tooltip="Loadbalancering: fordele trafik på flere servere.">loadbalancering</span> 
      for hurtigere LIMS.
    `,
    logicLong:`
      LIMS-brugere klager over langsom overførsel af scanningsdata. 
      Du vil opgradere net til 10Gbit og indføre loadbalancering på servere for bedre ydelse.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Skift til 10Gbit udstyr og opsæt 
          <span class="hoverTooltip" data-tooltip="Loadbalancering: Fordeler forespørgsler på flere servere.">loadbalancer</span>.
        `,
        choiceA:{
          label:"Køb 10G-hardware",
          text:"+3 tid, -200 kr => +3 stability",
          applyEffect:{ timeCost:3, moneyCost:200, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Behold 1G og lav minimalt tun",
          text:"+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Forklar brugere om nedetid og ny loginURL ved loadbalancer.",
        choiceA:{
          label:"Grundig info",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen melding",
          text:"0 tid => -10 hospital, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB kræver en redegørelse for loadbalancer, net og IP.",
        choiceA:{
          label:"Grundig doc",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Spar doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"Integration af Cloud-Løsninger",
    shortDesc:`
      Flyt dele af LIMS til 
      <span class="hoverTooltip" data-tooltip="AWS, Azure etc.">cloud</span> 
      med AD-login, men pas på compliance.
    `,
    logicLong:`
      Hospitalet overvejer en 
      <span class="hoverTooltip" data-tooltip="Production environment i skyen.">cloud-baseret LIMS</span>
      for at skalerere brugen. Du skal sikre AD-integration, DNS-peering og 
      <span class="hoverTooltip" data-tooltip="Regler for datasikkerhed, GDPR-lov.">compliance</span>.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Konfigurer VPN/DirectConnect til cloud, AD-trust og DNS-opslag.",
        choiceA:{
          label:"Opgradér netforbindelse",
          text:"+3 tid, -150 kr => +2 stability, +1 security",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Brug eksisterende net",
          text:"+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér afdelinger om nye URL’er og cloud-løsningens latency.",
        choiceA:{
          label:"Grundig præsentation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Kort mail",
          text:"0 tid => -10 hospital, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB kræver en compliance-rapport for cloud-løsning.",
        choiceA:{
          label:"Fuld compliance-doc",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"DNS- og AD-Revision",
    shortDesc:`
      Revider 
      <span class="hoverTooltip" data-tooltip="Domain Name System.">DNS</span> 
      og 
      <span class="hoverTooltip" data-tooltip="Active Directory.">AD</span>
      opsætning, for at LIMS-brugere får stabil login.
    `,
    logicLong:`
      Loginfejl sker ofte fordi DNS peger forkert eller AD ikke har korrekte grupper. 
      Du vil revidere zoner, <span class="hoverTooltip" data-tooltip="DNS-records, fx A, CNAME, SRV.">DNS-records</span> 
      og AD-gruppepolitikker for LIMS.
    `,
    steps: [
      {
        location:"infrastruktur",
        stepDescription: "Scannér DNS-zoner og AD-grupper. Lav IP-liste for LIMS.",
        choiceA:{
          label:"Omfattende scanning",
          text:"+3 tid, -80 kr => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+1 tid, -30 kr => +1 stability, +5% risk (du overser måske forkerte records).",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription: "Fortæl personalet om evt. nye loginmetoder og DNS-navne.",
        choiceA:{
          label:"Udsend retningslinjer",
          text:"+2 tid => +1 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:1 } }
        },
        choiceB:{
          label:"Ingen info",
          text:"0 tid => -10 hospital, +5% risk (folk forstår ikke nye navne).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription: "CAB vil se en rapport over DNS/AD-ændringer.",
        choiceA:{
          label:"Fuld doc",
          text:"+2 tid => ingen risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"Failover Test i Production",
    shortDesc: `
      Test failover fra 
      <span class="hoverTooltip" data-tooltip="Primær Prod server.">prod</span>
      til 
      <span class="hoverTooltip" data-tooltip="Sekundær server eller DR-site.">sekundær</span>
      for at sikre LIMS-oppetid.
    `,
    logicLong:`
      Du vil køre en failover-test i produktion. 
      Afdelingerne er nervøse for nedetid, men du skal sikre replikering og 
      <span class="hoverTooltip" data-tooltip="Hvor man tester om replikering virker i realtid.">live-switchover</span>.
    `,
    steps: [
      {
        location:"infrastruktur",
        stepDescription:"Planlæg failover-scenario: klargør replikering, check DNS-peger om.",
        choiceA:{
          label:"Grundig failover-plan",
          text:"+3 tid, -100 kr => +2 stability, +1 security (du dækker alt).",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Hurtig test",
          text:"+1 tid, -30 kr => +1 stability, +5% risk (kan give ukendt nedetid).",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Oplys alle afdelinger om den planlagte failover-test i prod.",
        choiceA:{
          label:"God kommunikation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Minimal info",
          text:"0 tid => -10 hospital, +5% risk (panik under failover).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se en post-mortem rapport over failover-testen.",
        choiceA:{
          label:"Omfattende doc",
          text:"+2 tid => ingen risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Kort notits",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  }

];
