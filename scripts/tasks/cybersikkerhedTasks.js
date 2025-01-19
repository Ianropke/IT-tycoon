// scripts/cybersikkerhedTasks.js
// 3 opgaver, med 4 steps – fx location= cybersikkerhed, it-jura, hospital, dokumentation.
// Men her viser vi eksempler, husk at location i steps skal matche "cybersikkerhed", "hospital", "infrastruktur", etc.

window.cybersikkerhedTasks = [
  {
    title:"NetværksPenTest",
    shortDesc:"Ekstern firma vil teste netværket",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Planlæg penTest",
        choiceA:{
          label:"Avanceret test",
          text:"+2 tid => +2 security, +5% risk",
          applyEffect:{ timeCost:2, riskyPlus:0.05, statChange:{security:2} }
        },
        choiceB:{
          label:"Hurtig test",
          text:"+1 tid => +1 security, +2% overset hul",
          applyEffect:{ timeCost:1, riskyPlus:0.02, statChange:{security:1} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Kontrakt med firma",
        choiceA:{
          label:"Grundig aftale",
          text:"+2 tid => +1 stability",
          applyEffect:{ timeCost:2, statChange:{stability:1} }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informer om nedetid",
        choiceA:{
          label:"Stort varsel",
          text:"+2 tid => +2 hospital",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Ingen varsel",
          text:"-5 hospital => +1 dev",
          applyEffect:{ statChange:{hospitalSatisfaction:-5, development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Rapport til CAB",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => ingen skepsis",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      }
    ]
  },
  {
    title:"Firewall-regler Opdatering",
    shortDesc:"Forældet ACL, fix nu",
    steps:[
      {
        location:"informationssikkerhed",
        stepDescription:"Scan log for sårbarheder?",
        choiceA:{
          label:"Dybt log-check",
          text:"+2 tid => +2 security",
          applyEffect:{ timeCost:2, statChange:{security:2} }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+5% overset hul => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Nye firewall-regler – stor ombygning eller nødløsning?",
        choiceA:{
          label:"Stor ombygning",
          text:"+3 tid => +2 security, -1 dev",
          applyEffect:{ timeCost:3, statChange:{security:2, development:-1} }
        },
        choiceB:{
          label:"Nødløsning",
          text:"+5% rest-risiko => +2 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:2} }
        }
      },
      {
        location:"hospital",
        stepDescription:"Servicevindue eller straks?",
        choiceA:{
          label:"Planlagt vindue",
          text:"+2 tid => +2 hospital",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Straks",
          text:"-5 hospital => +1 dev",
          applyEffect:{ statChange:{hospitalSatisfaction:-5, development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Firewall-rapport?",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 stability",
          applyEffect:{ timeCost:2, statChange:{stability:1} }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% skepsis => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      }
    ]
  },
  {
    title:"2FA Implementering",
    shortDesc:"Sikre login med 2-faktor",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning",
        choiceA:{
          label:"Robust token",
          text:"+3 tid => +3 security, -1 dev",
          applyEffect:{ timeCost:3, statChange:{security:3, development:-1} }
        },
        choiceB:{
          label:"Basal SMS",
          text:"+5% risk => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér brugerne",
        choiceA:{
          label:"Træningskampagne",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2, stability:1} }
        },
        choiceB:{
          label:"Pludselig indførsel",
          text:"-5 hospital => +1 dev",
          applyEffect:{ statChange:{hospitalSatisfaction:-5, development:1} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Opdatér login-aftale",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid => +1 security",
          applyEffect:{ timeCost:2, statChange:{security:1} }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"2FA-dok",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 stability",
          applyEffect:{ timeCost:2, statChange:{stability:1} }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% skepsis => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      }
    ]
  }
];
