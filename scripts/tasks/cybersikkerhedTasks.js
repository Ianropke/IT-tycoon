// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title:"NetværksPenTest",
    shortDesc:"Eksternt firma tester netværket for sårbarheder",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Planlæg test (dyb/hurtig)",
        choiceA:{
          label:"Dyb scanning",
          text:"+2 tid => +2 security, +5% risk",
          applyEffect:{ 
            timeCost:2, 
            riskyPlus:0.05, 
            statChange:{security:2} 
          }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+1 tid => +1 security, +3% overset hul",
          applyEffect:{ 
            timeCost:1,
            riskyPlus:0.03,
            statChange:{security:1}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Kontrakt med PenTest-firma",
        choiceA:{
          label:"Grundig aftale",
          text:"+2 tid => +1 stability, +1 security",
          applyEffect:{ 
            timeCost:2, 
            statChange:{stability:1, security:1} 
          }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{ 
            riskyPlus:0.05, 
            statChange:{development:1} 
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informer lab om nedetid?",
        choiceA:{
          label:"Planlagt vindue",
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
        location:"dokumentation",
        stepDescription:"PenTest-rapport til CAB",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => ingen skepsis",
          applyEffect:{ timeCost:2 }
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
    title:"Firewall-Opdatering",
    shortDesc:"Forældet ACL-lister i firewall",
    steps:[
      {
        location:"informationssikkerhed",
        stepDescription:"Scan logs for brud",
        choiceA:{
          label:"Dyb log-check",
          text:"+2 tid => +2 security",
          applyEffect:{
            timeCost:2,
            statChange:{security:2}
          }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+5% overset hul => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Implementér nye firewall-regler",
        choiceA:{
          label:"Omfattende ombygning",
          text:"+3 tid => +2 security, -1 dev",
          applyEffect:{
            timeCost:3,
            statChange:{security:2, development:-1}
          }
        },
        choiceB:{
          label:"Akut fix",
          text:"+5% rest-risiko => +2 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:2}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Servicevindue?",
        choiceA:{
          label:"Planlagt",
          text:"+2 tid => +2 hospital",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2}
          }
        },
        choiceB:{
          label:"Straks",
          text:"-5 hospital => +1 dev",
          applyEffect:{
            statChange:{hospitalSatisfaction:-5, development:1}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Opdater firewall-dok",
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
    title:"2FA Implementering",
    shortDesc:"Styrk login-sikkerhed med tofaktor",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning (robust/basal)",
        choiceA:{
          label:"Robust token",
          text:"+3 tid => +3 security, -1 dev",
          applyEffect:{
            timeCost:3,
            statChange:{security:3, development:-1}
          }
        },
        choiceB:{
          label:"Basal SMS",
          text:"+5% risk => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"hospital",
        stepDescription:"Oplys personalet",
        choiceA:{
          label:"Træningskampagne",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{
            timeCost:2,
            statChange:{hospitalSatisfaction:2, stability:1}
          }
        },
        choiceB:{
          label:"Pludselig indførsel",
          text:"-5 hospital => +1 dev",
          applyEffect:{
            statChange:{hospitalSatisfaction:-5, development:1}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Opdatér login-aftale",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid => +1 security",
          applyEffect:{
            timeCost:2,
            statChange:{security:1}
          }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{
            riskyPlus:0.05,
            statChange:{development:1}
          }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"2FA-dokumentation",
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
  }
];
