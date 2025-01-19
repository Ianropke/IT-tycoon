// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    category:"hospital",
    title:"Biokemi Lab-automatisering",
    shortDesc:"Robotter og auto-dispensere",
    logicLong:"Personalet er trætte af manuelt pipetteri. Indfør lab-automation!",
    steps:[
      {
        location:"hospital",
        stepDescription:"Lav en detaljeret plan eller basal auto-flow?",
        choiceA:{
          label:"Detaljeret plan",
          text:"+2 tid => +2 dev, +1 hospital",
          applyEffect:{
            timeCost:2,
            statChange:{development:2, hospitalSatisfaction:1}
          }
        },
        choiceB:{
          label:"Basal auto-flow",
          text:"+5% loops => +1 stability",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1}
          }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Fuld integration eller hurtig opsætning?",
        choiceA:{
          label:"Fuld integration",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Hurtig opsætning",
          text:"+8% konflikt => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Skal dataflow krypteres?",
        choiceA:{
          label:"Krypter link",
          text:"+2 tid => +2 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Basal sikring",
          text:"+5% databrud => +2 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Lab-auto-rapport?",
        choiceA:{
          label:"Fyldig dok",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Kort notits",
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
    category:"hospital",
    title:"Patologi Billedanalyse-Plugin",
    shortDesc:"AI til scanning af vævsprøver",
    logicLong:"Patologiafdelingen vil have AI til at spotte abnorme celler.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér AI-krav i detaljer eller minimal liste?",
        choiceA:{
          label:"Detaljeret",
          text:"+2 tid => +2 dev, +1 hospital",
          applyEffect:{
            timeCost:2,
            statChange:{development:2, hospitalSatisfaction:1}
          }
        },
        choiceB:{
          label:"Minimal liste",
          text:"+5% fejl => +2 stability (færre ændringer).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:2}
          }
        }
      },
      {
        location:"leverandor",
        stepDescription:"Udvikle plugin – omfattende test eller basis-plugin?",
        choiceA:{
          label:"Omfattende test",
          text:"+3 tid => +2 security, +1 dev",
          applyEffect:{
            timeCost:3,
            statChange:{security:2, development:1}
          }
        },
        choiceB:{
          label:"Basis-plugin",
          text:"+8% fejl i analyser => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Databehandleraftale?",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Genbrug gammel aftale",
          text:"+5% hul => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Plugin-beskrivelse?",
        choiceA:{
          label:"Grundig dok",
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
  },
  {
    category:"hospital",
    title:"MobilApp til Lab-gange",
    shortDesc:"Tablet-ordre til analyser",
    logicLong:"Hospitalet vil bestille blodprøver via en app. Er du klar til at udvikle?",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér store krav eller basalt flow?",
        choiceA:{
          label:"Omfattende liste",
          text:"+2 tid => +2 dev, +1 hospital",
          applyEffect:{
            timeCost:2,
            statChange:{development:2, hospitalSatisfaction:1}
          }
        },
        choiceB:{
          label:"Basalt flow",
          text:"+5% savnede features => +1 stability",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1}
          }
        }
      },
      {
        location:"leverandor",
        stepDescription:"Kod app grundigt eller quick fix?",
        choiceA:{
          label:"Dedikeret mobilapp",
          text:"+3 tid => +2 dev, +1 security",
          applyEffect:{
            timeCost:3,
            statChange:{development:2, security:1}
          }
        },
        choiceB:{
          label:"Simpel webapp",
          text:"+8% wifi-problem => +2 dev",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Skal devices sikres med MDM eller basal?",
        choiceA:{
          label:"MDM-løsning",
          text:"+2 tid => +2 security, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Basal sikring",
          text:"+10% data-læk => +2 dev",
          applyEffect:{
            riskyPlus:0.1,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Mobil-app-rapport?",
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
