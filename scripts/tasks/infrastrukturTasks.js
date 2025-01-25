// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [

  {
    title:"Serverpark Genopgradering",
    shortDesc:`
      Moderniser den aldrende 
      <span class="hoverTooltip" data-tooltip="Fysiske servere i datacenter.">serverpark</span>
      for at sikre kontinuerlig drift.
    `,
    logicLong:`
      Hospitalets servere er slidte og viser nedbrudstegn. 
      Du planlægger en større opgradering, men 
      <span class="hoverTooltip" data-tooltip="CAB: De vil gerne vide risiko for nedetid.">CAB</span>
      er skeptisk overfor omkostninger og tidsforbrug.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Foretag en detaljeret evaluering af hardware.",
        choiceA:{
          label:"Grundig evaluering",
          text:"+3 tid, -150 kr => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Hurtig overfladeinspektion",
          text:"+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Koordiner servicevindue med hospitalet.",
        choiceA:{
          label:"Planlagt nedetid",
          text:"+2 tid => +2 hospitalSatisfaction (alle informeres).",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Uplanlagt",
          text:"0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Dokumentér opgraderingsprocessen.",
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
      Opgradér netværket i laboratorierne for hurtigere data 
      og bedre stabilitet.
    `,
    logicLong:`
      Laboratorierne oplever udfald og klager over langsom datahåndtering. 
      Du vil modernisere switches og kabling.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Evaluer nuværende netværksudstyr (kabler, switches).",
        choiceA:{
          label:"Detaljeret netværksdiagnose",
          text:"+3 tid, -150 kr => +3 stability",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Hurtig vurdering",
          text:"+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Koordiner nedetid med laboratorieledelsen.",
        choiceA:{
          label:"Planlagt nedbrud",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Uplanlagt opgradering",
          text:"0 tid => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Dokumentér netopgraderingen til CAB.",
        choiceA:{
          label:"Fuld dokumentation",
          text:"+2 tid => ingen ekstra risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Kort rapport",
          text:"0 tid => +5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Datacenter Opgradering",
    shortDesc:`
      Omlæg 
      <span class="hoverTooltip" data-tooltip="Datacenter: Fysiske serverrum, køling, racks.">datacenteret</span>
      for bedre kapacitet og køling.
    `,
    logicLong:`
      Hospitalets datacenter er presset på køling og plads. 
      Du vil opgradere racks og køleanlæg for bedre stabilitet.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Gennemfør en kapacitetsanalyse (køling, strøm).",
        choiceA:{
          label:"Stor analyse",
          text:"+3 tid, -120 kr => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Overfladisk check",
          text:"+1 tid, -40 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér hospitalet om mulig nedetid under anlægsskifte.",
        choiceA:{
          label:"Detaljeret plan",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen forklaring",
          text:"0 tid => -10 hospital, +5% risk (de bliver overraskede).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB kræver detaljer om køling og redundans.",
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
      Opgradér 
      <span class="hoverTooltip" data-tooltip="Backup: Daglig kopiering af data til eksternt medie.">backup-løsningen</span>
      for mere robust datahåndtering.
    `,
    logicLong:`
      Hospitalet kører forældet båndbackup. 
      Du vil skifte til en moderne disk/cloud-løsning for hurtigere restore.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg backup-løsning: diskbaseret, cloud, etc.",
        choiceA:{
          label:"Disk + Cloud Hybrid",
          text:"+3 tid, -120 kr => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Behold bånd + lille disk",
          text:"+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Planlæg hvornår backups sker uden at forstyrre drift.",
        choiceA:{
          label:"Detajleret plan",
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
        stepDescription:"CAB vil se backup-strategi.",
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
      Implementér 
      <span class="hoverTooltip" data-tooltip="Kør flere virtuelle maskiner på én fysisk server.">virtualisering</span>
      for at optimere serverbrug.
    `,
    logicLong:`
      Hospitalet har mange fysiske servere. 
      Ved at virtualisere kan du spare plads og strøm, men 
      <span class="hoverTooltip" data-tooltip="CAB: De vil tjekke for nye fejlrisici.">CAB</span> 
      vil se en robust plan.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg hypervisor og planlæg migrering.",
        choiceA:{
          label:"Grundig migreringsplan",
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
        stepDescription:"Informér afdelinger om mulig midlertidig nedetid.",
        choiceA:{
          label:"God kommunikation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ingen større info",
          text:"0 tid => -10 hospital, +5% risk (frustration).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Virtualiseringsrapport til CAB.",
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
      Adskil netværk i zoner for højere driftssikkerhed. 
    `,
    logicLong:`
      Hospitalets net er i én stor flad zone. 
      Du vil segmentere for at undgå at en fejl spreder sig til hele netværket.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Konfigurer VLANs og routere.",
        choiceA:{
          label:"Grundig net-opdeling",
          text:"+3 tid, -120 kr => +2 stability, +1 security",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Mindre opdeling",
          text:"+1 tid, -40 kr => +1 stability, +5% risk (mulig fejlspredning).",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér afdelinger om IP-ændringer.",
        choiceA:{
          label:"Detajleret info",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Kort mail",
          text:"0 tid => -10 hospital, +5% risk (afdelinger forstår ikke).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se netværksdiagrammer.",
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
      Optimer 
      <span class="hoverTooltip" data-tooltip="Dataoverførsel: speed mellem LIMS-komponenter.">data-hastighed</span>
      i netværk og serveropsætning.
    `,
    logicLong:`
      LIMS-brugere oplever forsinkelse i store filoverførsler (fx scanningsdata). 
      Du vil optimere netopsætning og server-til-server-båndbredde.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Skift til 10Gbit netkort og switches?",
        choiceA:{
          label:"Køb 10G-hardware",
          text:"+3 tid, -200 kr => +3 stability",
          applyEffect:{ timeCost:3, moneyCost:200, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Behold 1G men tun justering",
          text:"+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Forklar brugere om vedligeholdsvindue for net.",
        choiceA:{
          label:"God kommunikation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Tavshed",
          text:"0 tid => -10 hospital, +5% risk (frustration).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se en redegørelse for hastighedsforbedringer.",
        choiceA:{
          label:"Grundig doc",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Spar doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Integration af Cloud-Løsninger",
    shortDesc:`
      Flyt nogle servere til 
      <span class="hoverTooltip" data-tooltip="Cloud: eksternt datacenter, typisk AWS/Azure.">clouden</span>
      for bedre skalerbarhed.
    `,
    logicLong:`
      Hospitalet overvejer at køre dele af LIMS i en cloud-løsning. 
      Kræver netværks- og sikkerhedstjek, og 
      <span class="hoverTooltip" data-tooltip="CAB: De vil se, om data er beskyttet i cloud.">CAB</span>
      er bekymret for compliance.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Konfigurer VPN/DirectConnect til cloud.",
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
        stepDescription:"Informér om cloud-løsningens fordele/ulemper.",
        choiceA:{
          label:"Grundig præsentation",
          text:"+2 tid => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Kort mail",
          text:"0 tid => -10 hospital, +5% risk (manglende buy-in).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB kræver en cloud-compliance-rapport.",
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
  }

];
