window.cybersikkerhedTasks = [
  {
    title:"NetværksPenTest",
    shortDesc:"Eksternt firma, stor scanning, koster penge",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Planlæg penTest",
        choiceA:{
          label:"Avanceret scanning",
          text:"+2 tid, -150 kr => +2 security, +5% risk",
          applyEffect:{
            timeCost:2,
            moneyCost:150,
            riskyPlus:0.05,
            statChange:{security:2}
          }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+1 tid => +1 security, +2% overset hul",
          applyEffect:{
            timeCost:1,
            riskyPlus:0.02,
            statChange:{security:1}
          }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Kontrakt med eksternt firma",
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
        stepDescription:"PenTest-rapport",
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
    title:"Firewall-Ombygning",
    shortDesc:"Forældede ACL-lister, dyr at renovere",
    steps:[
      {
        location:"informationssikkerhed",
        stepDescription:"Dyb log-check?",
        choiceA:{
          label:"Grundig scanning",
          text:"+2 tid, -100 kr => +2 security",
          applyEffect:{
            timeCost:2,
            moneyCost:100,
            statChange:{security:2}
          }
        },
        choiceB:{
          label:"Overfladisk",
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
          text:"+3 tid, -150 kr => +2 security, -1 dev",
          applyEffect:{
            timeCost:3,
            moneyCost:150,
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
        stepDescription:"Firewall-dok",
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
    shortDesc:"Giver ekstra login-sikkerhed",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning (robust/basal)",
        choiceA:{
          label:"Robust token",
          text:"+3 tid, -200 kr => +3 security, -1 dev",
          applyEffect:{
            timeCost:3,
            moneyCost:200,
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
          text:"+2 tid, -50 kr => +1 security",
          applyEffect:{
            timeCost:2,
            moneyCost:50,
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
