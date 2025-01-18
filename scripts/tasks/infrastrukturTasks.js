// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    category: "infrastruktur",
    title: "Serverpark Modernisering",
    shortDesc: "Skift gamle servere.",
    logicLong: "Først Infrastruktur, Hospital, Leverandør, Dok. Mulig driftfejl postCAB.",
    steps: [
      {
        location:"infrastruktur",
        stepDescription:"Plan & indkøb servere",
        choiceA:{
          label:"Topmoderne",
          text:"+2 tid, +100 kr",
          applyEffect:{timeCost:2,moneyCost:100}
        },
        choiceB:{
          label:"Billigere servere",
          text:"+5% kapacitetsknaphed",
          applyEffect:{riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Driftforstyrrelse",
        choiceA:{
          label:"Gradvis migrering",
          text:"+2 tid, færre fejl",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Stor cutover",
          text:"-10 tid, +8% fejl",
          applyEffect:{timeCost:-10,riskyPlus:0.08}
        }
      },
      {
        location:"leverandør",
        stepDescription:"Tilpas software",
        choiceA:{
          label:"Grundige tests",
          text:"+2 tid, robust",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Antag ok",
          text:"+10% softwarefejl",
          applyEffect:{riskyPlus:0.1}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Udskiftningsrapport",
        choiceA:{
          label:"Detaljeret dok",
          text:"+2 tid, CAB roser dig",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis",
          applyEffect:{riskyPlus:0.05}
        }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"NetværksOpgradering (10 GbE)",
    shortDesc:"Opgradere net fra 1 til 10 Gbit",
    logicLong:"Først Infrastruktur, Hospital test, Cybersikkerhed, Dok. Driftfejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Installér netudstyr",
        choiceA:{
          label:"Fuldt switche/kabler",
          text:"+2 tid, +80 kr",
          applyEffect:{timeCost:2, moneyCost:80}
        },
        choiceB:{
          label:"Kun kerneswit",
          text:"+5% latens",
          applyEffect:{riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Afdelingstest",
        choiceA:{
          label:"Pilot i én afd",
          text:"+2 tid, tryg udrulning",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Alt på én gang",
          text:"+8% driftforstyrrelse",
          applyEffect:{riskyPlus:0.08}
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Opsæt VLAN/firewall",
        choiceA:{
          label:"Grundig net-sikkerhed",
          text:"+2 tid, robust",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Minimal config",
          text:"+10% sårbarhed",
          applyEffect:{riskyPlus:0.1}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Net-upgrade-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB glade",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis",
          applyEffect:{riskyPlus:0.05}
        }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Konsolidering af sjældent brugte moduler",
    shortDesc:"Lukke/udfase moduler.",
    logicLong:"Først infrastruktur (analyse), hospital, it-jura, dok. Driftfejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Systematisk analyse",
        choiceA:{
          label:"Brugersporing",
          text:"+2 tid, sikr overblik",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Uofficiel liste",
          text:"+8% fejl-luk",
          applyEffect:{riskyPlus:0.08}
        }
      },
      {
        location:"hospital",
        stepDescription:"Bekræft modulers relevans",
        choiceA:{
          label:"Brugerhøring",
          text:"+2 tid, færre klager",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Luk hurtigt",
          text:"+10% klager",
          applyEffect:{riskyPlus:0.1}
        }
      },
      {
        location:"it-jura",
        stepDescription:"Opsig licenser",
        choiceA:{
          label:"Ordentlig opsigelse",
          text:"+2 tid, ingen bod",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Hurtig opsigelse",
          text:"+5% juridisk problem",
          applyEffect:{riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Lukningsrapport",
        choiceA:{
          label:"Detaljeret dok",
          text:"+2 tid, CAB roser dig",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% CAB-skepsis",
          applyEffect:{riskyPlus:0.05}
        }
      }
    ]
  },
  // 7 mere:
  {
    category:"infrastruktur",
    title:"Overgang til Cloud-hybrid",
    shortDesc:"Flyt dele af LIMS i skyen",
    logicLong:"Først infrastruktur (cloudplan), cybersikkerhed, hospital, dok. Driftfejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Cloud-arkitektur",
        choiceA:{
          label:"Detaljeret design",
          text:"+3 tid, robust",
          applyEffect:{timeCost:3}
        },
        choiceB:{
          label:"Hurtig opsætning",
          text:"+5% migrationsfejl",
          applyEffect:{riskyPlus:0.05}
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Sikre sky-data",
        choiceA:{
          label:"Fuld kryptering",
          text:"+2 tid, minimal lækrisiko",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Basal SSL",
          text:"+10% datalæk-risiko",
          applyEffect:{riskyPlus:0.1}
        }
      },
      {
        location:"hospital",
        stepDescription:"Godkend cloud-test",
        choiceA:{
          label:"Inddrag afdelinger",
          text:"+2 tid, forankring",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Ingen inddragelse",
          text:"+5% klager",
          applyEffect:{riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Cloud-hybrid-beskrivelse",
        choiceA:{
          label:"Komplet dok",
          text:"+2 tid, CAB roser dig",
          applyEffect:{timeCost:2}
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% CAB-skepsis",
          applyEffect:{riskyPlus:0.05}
        }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"HA for kritiske systemer",
    shortDesc:"Opsæt redundante servere/failover.",
    logicLong:"Først infrastruktur (HA), hospital (failtest), leverandør, dok. Driftfejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Opsæt HA/failover",
        choiceA:{
          label:"Fuld klynge",
          text:"+3 tid, meget stabil",
          applyEffect:{timeCost:3}
        },
        choiceB:{
          label:"Lokal kluster",
          text:"+10% net splitbrain",
          applyEffect:{riskyPlus:0.1}
        }
      },
      {
        location:"hospital",
        stepDescriptio
