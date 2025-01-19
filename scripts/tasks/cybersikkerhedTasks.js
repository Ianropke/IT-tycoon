// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    category:"cybersikkerhed",
    title:"NetværksPenTest (ekstern firma)",
    shortDesc:"Hyre eksterne specialister til at teste netværket",
    logicLong:"Du vil bestille en ekstern penetrationstest. Hospitalet er nervøse for nedetid...",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Planlæg penTest dybde eller hurtig?",
        choiceA:{
          label:"Avanceret test",
          text:"+2 tid, +50 kr => +2 security, +5% risk",
          applyEffect:{ timeCost:2, moneyCost:50, riskyPlus:0.05, statChange:{security:2} }
        },
        choiceB:{
          label:"Hurtig test",
          text:"+5% overset hul => +1 security",
          applyEffect:{ riskyPlus:0.05, statChange:{security:1} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Kontrakt med eksternt firma?",
        choiceA:{
          label:"Grundig kontrakt",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{ timeCost:2, statChange:{security:1, stability:1} }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% jura-hul => +1 development",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"hospital",
        stepDescription:"Nedetid. Informér afdelinger eller ej?",
        choiceA:{
          label:"Informer bredden",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2, stability:1} }
        },
        choiceB:{
          label:"Ingen varsel",
          text:"Spar tid, men -5 hospital",
          applyEffect:{ statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"PenTest-rapport til CAB?",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 security, ingen skepsis",
          applyEffect:{ timeCost:2, statChange:{security:1} }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis => +1 development",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Firewall-regler Opdatering",
    shortDesc:"Forældede ACL-lister. Reparer dem.",
    logicLong:"Informationssikkerhed har fundet huller i firewall. Vil du lave stor eller lille opgradering?",
    steps:[
      {
        location:"informationssikkerhed",
        stepDescription:"Sårbarhedsscanning i logfiler?",
        choiceA:{
          label:"Dybt log-check",
          text:"+2 tid => +2 security, +1 stability",
          applyEffect:{ timeCost:2, statChange:{security:2, stability:1} }
        },
        choiceB:{
          label:"Hurtig scan",
          text:"+5% overset hul => +1 development",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Nye firewall-regler – stor ombygning eller nødløsning?",
        choiceA:{
          label:"Ombygning",
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
        stepDescription:"Servicevindue eller straks implementering?",
        choiceA:{
          label:"Planlagt vindue",
          text:"+2 tid => +2 hospital, +1 stability",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2, stability:1} }
        },
        choiceB:{
          label:"Straks",
          text:"0 tid => -5 hospital",
          applyEffect:{ statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Firewall-rapport?",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{ timeCost:2, statChange:{security:1, stability:1} }
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
    category:"cybersikkerhed",
    title:"2FA Implementering",
    shortDesc:"Sikre logins via 2FA",
    logicLong:"Hospitalet har haft lækager pga. nemme logins. Du vil indføre 2FA. Hvor grundigt?",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning?",
        choiceA:{
          label:"Robust tokensystem",
          text:"+3 tid, +50 kr => +3 security, -1 dev",
          applyEffect:{ timeCost:3, moneyCost:50, statChange:{security:3, development:-1} }
        },
        choiceB:{
          label:"Basal SMS",
          text:"+5% rest-risiko => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér brugerne eller rul pludseligt?",
        choiceA:{
          label:"Træning & mail",
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
        stepDescription:"Opdatér login-betingelser i kontrakter?",
        choiceA:{
          label:"Grundig jura-check",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{ timeCost:2, statChange:{security:1, stability:1} }
        },
        choiceB:{
          label:"Standardparagraf",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"2FA-dokumentation?",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => +1 security, +1 stability",
          applyEffect:{ timeCost:2, statChange:{security:1, stability:1} }
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
