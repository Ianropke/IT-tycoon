// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    category:"infrastruktur",
    title:"Serverpark Modernisering",
    shortDesc:"Gamle servere larmer og varmer",
    logicLong:"Teknikerne anbefaler en udskiftning. Vil du købe top eller spare?",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Køb topmoderne eller billig?",
        choiceA:{
          label:"Topmoderne",
          text:"+2 tid, +100 kr => +2 stability, +1 dev",
          applyEffect:{ 
            timeCost:2, moneyCost:100,
            statChange:{stability:2, development:1}
          }
        },
        choiceB:{
          label:"Billig server",
          text:"+5% kapacitetsknap => +1 stability, -1 security",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1, security:-1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Migrer gradvis eller stor cutover?",
        choiceA:{
          label:"Gradvis migrering",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Weekend-cutover",
          text:"-10 tid => +8% fejl => +2 dev",
          applyEffect:{
            timeCost:-10, riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"leverandør",
        stepDescription:"Softwaretilpasning?",
        choiceA:{
          label:"Grundige tests",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Antag alt ok",
          text:"+10% softwarefejl => +2 dev",
          applyEffect:{
            riskyPlus:0.1,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Serverpark-rapport?",
        choiceA:{
          label:"Detaljeret dok",
          text:"+2 tid => +1 stability, +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:1, security:1}
          }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% skepsis => +2 dev",
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
    title:"NetværksOpgradering (10GbE)",
    shortDesc:"Sløvt net i laboratorier",
    logicLong:"Opgradér netværket for hurtigere svartider. Vil du investere i full-løsning?",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Installér fuldt switche/kabler eller kun kerneswit?",
        choiceA:{
          label:"Fuldt",
          text:"+2 tid, +80 kr => +3 stability, +1 dev",
          applyEffect:{
            timeCost:2, moneyCost:80,
            statChange:{stability:3, development:1}
          }
        },
        choiceB:{
          label:"Kun kerneswit",
          text:"+5% latens => +1 stability, +1 security",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1, security:1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Pilot i én afd eller alt på én gang?",
        choiceA:{
          label:"Pilot",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Alt på én gang",
          text:"+8% driftforstyrrelse => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Opsæt VLAN/firewalls grundigt eller minimal config?",
        choiceA:{
          label:"Grundig",
          text:"+2 tid => +2 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Minimal config",
          text:"+10% sårbarhed => +2 dev",
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
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% skepsis => +2 dev",
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
    title:"Afvikling af ældre software (OS-versioner)",
    shortDesc:"Gamle OS'er giver driftfejl",
    logicLong:"Fjern legacy-OS, men hospitalets afdelinger kan brokke sig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Lister du forældede OS grundigt eller gæt?",
        choiceA:{
          label:"Detaljeret inventar",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Gæt fra doc",
          text:"+8% overset server => +1 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Afklar erstatning via brugermøder eller luk alt?",
        choiceA:{
          label:"Brugermøder",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Luk alt",
          text:"+10% klager => +2 dev",
          applyEffect:{
            riskyPlus:0.1,
            statChange:{development:2}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Opsig supportaftaler pænt eller brutalt?",
        choiceA:{
          label:"Ordentlig opsigelse",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Hurtigt opsig",
          text:"+5% bod => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Migrationsrapport",
        choiceA:{
          label:"Fyldig dok",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% skepsis => +2 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      }
    ]
  }
];
