// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    category:"infrastruktur",
    title:"Serverpark Modernisering",
    shortDesc:"Gamle servere larmer, hospitalet klager.",
    logicLong:`Du besøger serverrummet, 
    hvor gamle kasser brummer og 
    spytter varme. En tekniker siger: 
    "Skal vi købe topudstyr eller 
    nøjes med lidt patch?" 
    Beslutningen er din!`,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vil du satse på topmoderne eller billigere servere?",
        choiceA:{ 
          label:"Topmoderne",
          text:"+2 tid, +100 kr => +2 Stabilitet, +1 Development",
          applyEffect:{
            timeCost:2,
            moneyCost:100,
            statChange:{stability:2, development:1}
          }
        },
        choiceB:{ 
          label:"Billigere servere",
          text:"+5% kapacitetsknap => +1 Stability, -1 Security (billig HW).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1, security:-1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Hvordan vil du koordinere driftforstyrrelse?",
        choiceA:{
          label:"Gradvis migrering",
          text:"+2 tid => +1 Stability, +2 Hospital (færre nedbrud).",
          applyEffect:{
            timeCost:2,
            statChange:{stability:1, hospitalSatisfaction:2}
          }
        },
        choiceB:{
          label:"Stor weekend-cutover",
          text:"-10 tid => +8% fejl => +2 Development (du sparer tid).",
          applyEffect:{
            timeCost:-10,
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"leverandør",
        stepDescription:"Leverandøren vil gerne teste softwaren grundigt eller køre en generisk driver.",
        choiceA:{
          label:"Grundige tests",
          text:"+2 tid => +2 Stability, +1 Security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Antag alt er ok",
          text:"+10% softwarefejl => +2 Development (fritager team).",
          applyEffect:{
            riskyPlus:0.1,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Serverpark-rapport til sidst?",
        choiceA:{
          label:"Detaljeret dok",
          text:"+2 tid => +1 Stability, +1 Security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:1, security:1}
          }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis => +2 Development (du skriver kort).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"NetværksOpgradering (10 GbE)",
    shortDesc:"Forøg båndbredden kraftigt",
    logicLong:`Laboratorierne klager over 
    sløve svartider. Du kan opgradere 
    netværket til 10 Gbit. Men kabler, 
    switche og sikkerhed skal 
    håndteres. Vil du køre 
    en stor opgradering eller 
    spare lidt?`,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Installér netudstyr – fuld eller delvis?",
        choiceA:{
          label:"Fuldt switche/kabler",
          text:"+2 tid, +80 kr => +3 Stability, +1 Development",
          applyEffect:{
            timeCost:2,
            moneyCost:80,
            statChange:{stability:3, development:1}
          }
        },
        choiceB:{
          label:"Kun kerneswit",
          text:"+5% latens => +1 Stability, +1 Security (mindre netflade).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1, security:1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Skal du lave en pilotafdeling eller rulle alt på én gang?",
        choiceA:{
          label:"Pilot i én afd",
          text:"+2 tid => +2 Hospital, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Alt på én gang",
          text:"+8% driftforstyrrelse => +2 Development (tid spares).",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Opsæt VLAN/firewalls til 10GbE. Grundig config eller minimal?",
        choiceA:{
          label:"Grundig net-sikkerhed",
          text:"+2 tid => +2 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Minimal config",
          text:"+10% sårbarhed => +2 Development",
          applyEffect:{
            riskyPlus:0.1,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Net-upgrade-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis => +2 Development",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      }
    ]
  },

  // ... 8 more infrastruktur tasks with similar statChange + narratives ...
];
