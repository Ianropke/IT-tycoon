// scripts/infrastrukturTasks.js
// 3 opgaver, 4 steps. location= "infrastruktur", "hospital", "it-jura", "dokumentation" etc.

window.infrastrukturTasks = [
  {
    title:"Serverpark Modernisering",
    shortDesc:"Gamle servere => Ustabil drift",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Udskift servere med nye?",
        choiceA:{
          label:"Topmoderne",
          text:"+2 tid, +80 kr => +2 stability, +1 dev",
          applyEffect:{
            timeCost:2, moneyCost:80,
            statChange:{stability:2, development:1}
          }
        },
        choiceB:{
          label:"Billige servere",
          text:"+5% kapacitetsknap => +1 stability, -1 security",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1, security:-1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Planlæg nedetid?",
        choiceA:{
          label:"Informer bredt",
          text:"+2 tid => +2 hospital",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2}
          }
        },
        choiceB:{
          label:"Ingen varsel",
          text:"-5 hospital => +1 dev",
          applyEffect:{
            statChange:{hospitalSatisfaction:-5, development:1}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Licensaftaler til nye server OS?",
        choiceA:{
          label:"Grundig check",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Antag ok",
          text:"+5% jura-hul => +2 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Server-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 stability",
          applyEffect:{
            timeCost:2, 
            statChange:{stability:1}
          }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% skepsis => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      }
    ]
  },
  {
    title:"NetværksOpgradering (10 GbE)",
    shortDesc:"Sløvt net => Opgiv 1 Gbit, giv 10 Gbit",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Installér netudstyr",
        choiceA:{
          label:"Fuldt switche & kabler",
          text:"+2 tid => +3 stability, +1 dev",
          applyEffect:{
            timeCost:2,
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
          text:"+8% drift => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Ny net-løsning, licenser?",
        choiceA:{
          label:"Forhandle alt",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Antag open",
          text:"+5% tvist => +2 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Net-upgrade-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{stability:1}
          }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% skepsis => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      }
    ]
  },
  {
    title:"Energioptimering i datacenter",
    shortDesc:"Forbedre køling og PSU",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg energitiltag",
        choiceA:{
          label:"Detaljeret plan",
          text:"+3 tid => +2 stability, +1 security",
          applyEffect:{
            timeCost:3,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Skift kun PSU i store servere",
          text:"+5% rest => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Varsl serviceafbrydelse?",
        choiceA:{
          label:"Weekend-ombyg",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Dagtimer",
          text:"+8% klager => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Tjek hardwarekontrakt",
        choiceA:{
          label:"Firmware-check",
          text:"+2 tid => +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{security:1}
          }
        },
        choiceB:{
          label:"Antag ok",
          text:"+5% rets-problem => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Energiprojekt-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{stability:1}
          }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% CAB-skepsis => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      }
    ]
  }
];
