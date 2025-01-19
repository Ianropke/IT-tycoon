// scripts/hospitalTasks.js
// 3 opgaver med location= "hospital", "infrastruktur", "it-jura", "dokumentation"

window.hospitalTasks = [
  {
    title:"Biokemi Lab-automatisering",
    shortDesc:"Robotter i blodprøve-håndtering",
    steps:[
      {
        location:"hospital",
        stepDescription:"Drøft robotbehov",
        choiceA:{
          label:"Interviews",
          text:"+2 tid => +2 hospital, +1 dev",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:2, development:1} }
        },
        choiceB:{
          label:"Gæt",
          text:"+5% mismatch => +1 stability",
          applyEffect:{ riskyPlus:0.05, statChange:{stability:1} }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt robot i net",
        choiceA:{
          label:"Fuld integration",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{ timeCost:2, statChange:{stability:2, security:1} }
        },
        choiceB:{
          label:"Hurtig opsætning",
          text:"+8% netfejl => +2 dev",
          applyEffect:{ riskyPlus:0.08, statChange:{development:2} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Robot licensaftale?",
        choiceA:{
          label:"Grundig check",
          text:"+2 tid => +1 security",
          applyEffect:{ timeCost:2, statChange:{security:1} }
        },
        choiceB:{
          label:"Antag alt ok",
          text:"+5% jura-problem => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Robot-rapport",
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
    title:"Patologi Billedanalyse-Plugin",
    shortDesc:"AI i patologi-lab",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér AI-krav",
        choiceA:{
          label:"Detaljeret kravspec",
          text:"+2 tid => +2 dev, +1 hospital",
          applyEffect:{ timeCost:2, statChange:{development:2, hospitalSatisfaction:1} }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% misforstå => +1 stability",
          applyEffect:{ riskyPlus:0.05, statChange:{stability:1} }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Installér billedserver?",
        choiceA:{
          label:"Ny GPU-server",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{ timeCost:2, statChange:{stability:2, security:1} }
        },
        choiceB:{
          label:"Brug eksisterende",
          text:"+8% performance => +2 dev",
          applyEffect:{ riskyPlus:0.08, statChange:{development:2} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"AI data-licens?",
        choiceA:{
          label:"Ordentlig aftale",
          text:"+2 tid => +1 security",
          applyEffect:{ timeCost:2, statChange:{security:1} }
        },
        choiceB:{
          label:"Hurtig standard",
          text:"+5% jura-hul => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Plugin-dok",
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
    title:"MobilApp til Lab-gange",
    shortDesc:"Tablets i hospitalet",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér mobil-funktioner",
        choiceA:{
          label:"Kravworkshop",
          text:"+2 tid => +2 dev, +1 hospital",
          applyEffect:{ timeCost:2, statChange:{development:2, hospitalSatisfaction:1} }
        },
        choiceB:{
          label:"Minimal liste",
          text:"+5% savnede features => +1 stability",
          applyEffect:{ riskyPlus:0.05, statChange:{stability:1} }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Sæt op wifi-løsning",
        choiceA:{
          label:"Stærk wifi",
          text:"+2 tid => +2 stability, +1 security",
          applyEffect:{ timeCost:2, statChange:{stability:2, security:1} }
        },
        choiceB:{
          label:"Brug eksisterende net",
          text:"+8% blackout => +2 dev",
          applyEffect:{ riskyPlus:0.08, statChange:{development:2} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Kontrakt for mobil-løsning?",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid => +1 security",
          applyEffect:{ timeCost:2, statChange:{security:1} }
        },
        choiceB:{
          label:"Stardard aftale",
          text:"+5% jura-problem => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"App-dok",
        choiceA:{
          label:"Fyldig",
          text:"+2 tid => +1 stability",
          applyEffect:{ timeCost:2, statChange:{stability:1} }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% skepsis => +1 dev",
          applyEffect:{ riskyPlus:0.05, statChange:{development:1} }
        }
      }
    ]
  }
];
