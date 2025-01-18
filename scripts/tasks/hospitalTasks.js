// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    category:"hospital",
    title:"Biokemi Lab-automatisering",
    shortDesc:"Robotter og auto-dispensere i LIMS",
    logicLong:`Biokemi-lab skriger på automatisering for 
    blodprøve-analyser. De vil have robotter
    integreret i LIMS. Er du klar til at 
    bringe systemet til næste niveau?`,
    steps:[
      {
        location:"hospital",
        stepDescription:"Laboratoriets chef siger: “Skal vi planlægge i dybden eller bare køre basalt flow?”",
        choiceA:{
          label:"Detaljeret plan",
          text:"+2 tid => +2 Development, +1 Hospital",
          applyEffect:{
            timeCost:2,
            statChange:{development:2, hospitalSatisfaction:1}
          }
        },
        choiceB:{
          label:"Basal auto-flow",
          text:"+5% manuelle loops => +1 Stability (færre radikale ændr.).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:1}
          }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Du skal koble robotter fysisk på netværket. Gør du en fuld integration eller en hurtig hack?",
        choiceA:{
          label:"Fuld integration",
          text:"+2 tid => +2 Stability, +1 Security",
          applyEffect:{
            timeCost:2,
            statChange:{stability:2, security:1}
          }
        },
        choiceB:{
          label:"Hurtig opsætning",
          text:"+8% konflikt => +2 Development (du har tid).",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Robotter skal have autoriseret dataflow. Vil du kryptere link eller basal sikring?",
        choiceA:{
          label:"Krypteret link",
          text:"+2 tid => +2 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Basal sikring",
          text:"+5% brudfare => +2 Development",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Du skal fremlægge en robot-rapport for CAB. Fyldig eller minimal?",
        choiceA:{
          label:"Dyb dok",
          text:"+2 tid => +1 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Kort notits",
          text:"+5% CAB-skepsis => +1 Development",
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
    shortDesc:"AI-baseret billedgranskning for patologi.",
    logicLong:`Patologiafdelingen vil have AI, 
    der scanner vævsprøver for unormale celler. 
    Leverandøren er klar, men hospitalet frygter 
    fejlalarmer. Jura skal tjekke data. 
    Tør du kaste dig ud i stor-løsning?`,
    steps:[
      {
        location:"hospital",
        stepDescription:"Overlægen i patologi vil have en topmoderne AI. Skal du lave en detaljeret kravspec?",
        choiceA:{
          label:"Detaljeret AI-krav",
          text:"+2 tid => +2 Development, +1 Hospital",
          applyEffect:{
            timeCost:2,
            statChange:{development:2, hospitalSatisfaction:1}
          }
        },
        choiceB:{
          label:"Minimal liste",
          text:"+5% misforståelser => +2 Stability (færre nye ting).",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{stability:2}
          }
        }
      },
      {
        location:"leverandør",
        stepDescription:"Leverandøren kan teste pluginnet grundigt eller rulle en basisudgave ud.",
        choiceA:{
          label:"Omfattende test",
          text:"+3 tid => +2 Security, +1 Development",
          applyEffect:{
            timeCost:3,
            statChange:{security:2, development:1}
          }
        },
        choiceB:{
          label:"Basis-plugin",
          text:"+8% fejl i analyser => +2 Development",
          applyEffect:{
            riskyPlus:0.08,
            statChange:{development:2}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Databehandleraftale til AI? Grundig eller genbrug?",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid => +2 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:2, stability:1}
          }
        },
        choiceB:{
          label:"Genbrug gammel aftale",
          text:"+5% hul i nye datatyper => +2 Development",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Plugin-beskrivelse til CAB.",
        choiceA:{
          label:"Grundig dok",
          text:"+2 tid => +1 Security, +1 Stability",
          applyEffect:{
            timeCost:2,
            statChange:{security:1, stability:1}
          }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% CAB-skepsis => +2 Development",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      }
    ]
  },

  // ... 8 more hospital tasks similarly updated ...
];
