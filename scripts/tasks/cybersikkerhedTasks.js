// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    category: "cybersikkerhed",
    title: "NetværksPenTest (ekstern firma)",
    shortDesc: "Hyre eksterne specialister.",
    logicLong: "Først Cybersikkerhed, så IT Jura, Hospital, Dokumentation. Tekniske fejl kan ske efter CAB.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg penTest",
        choiceA: {
          label: "Detaljeret",
          text: "Mere tid, +50 kr",
          applyEffect: { timeCost:2, moneyCost:50 }
        },
        choiceB: {
          label: "Hurtig",
          text: "+5% rest-risiko",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Kontrakt med firma",
        choiceA: {
          label: "Formel + NDA",
          text: "+2 tid, ingen jura-hul",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Standardskabelon",
          text: "+5% juridisk fejl",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner nedetid",
        choiceA: {
          label: "Informer afdelinger",
          text: "+2 tid, færre klager",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "Spar tid, -5 hospital",
          applyEffect: { statChange:{ hospitalSatisfaction:-5} }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "PenTest-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid, ingen CAB-skepsis",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Opdatering af Firewall-regler",
    shortDesc: "Revidér firewall/netsegmentering",
    logicLong: "Først InfoSikkerhed, så Cybersikkerhed, Hospital, Dokumentation. Driftfejl mulig.",
    steps: [
      {
        location: "informationssikkerhed",
        stepDescription: "Analyse af firewall/logs",
        choiceA:{
          label:"Detaljeret log-tjek",
          text:"+2 tid, finder små huller",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Hurtig scanning",
          text:"+5% overset hul",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Nye firewall-politikker",
        choiceA:{
          label:"Ny arkitektur",
          text:"+3 tid, robust",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"Akut fix",
          text:"+5% rest-risiko",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informer om net-snit",
        choiceA:{
          label:"Planlagt vindue",
          text:"+2 tid, mindre sure folk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Implementer straks",
          text:"Ingen tid, -5 hospital",
          applyEffect:{ statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Firewall-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB glade",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Kryptering af interne databaser",
    shortDesc:"Fuld diskkryptering.",
    logicLong:"Først Cybersikkerhed (valg), Infrastruktur, Hospital, Dok. Driftfejl kan ske.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg kryptering",
        choiceA:{
          label:"AES256",
          text:"+2 tid, +50 kr",
          applyEffect:{ timeCost:2, moneyCost:50 }
        },
        choiceB:{
          label:"Basal",
          text:"+5% rest-risiko",
          applyEffect:{ timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Implementer kryptering",
        choiceA:{
          label:"Kontrolleret migrering",
          text:"+3 tid, minimer fejl",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"On-the-fly",
          text:"+8% datakorrupt",
          applyEffect:{ riskyPlus:0.08 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Test i afdelinger",
        choiceA:{
          label:"Flere pilot-afd",
          text:"+2 tid, men sikker",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Rul bredt",
          text:"+5% klager",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Krypterings-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB roser dig",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Two-Factor Authentication (2FA)",
    shortDesc:"Obligatorisk 2FA for brugere",
    logicLong:"Først Cybersikkerhed, Hospital (uddannelse), IT Jura, Dokumentation. Driftfejl mulig.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning",
        choiceA:{
          label:"Robust token",
          text:"+3 tid, +80 kr",
          applyEffect:{ timeCost:3, moneyCost:80 }
        },
        choiceB:{
          label:"Basal SMS",
          text:"+5% rest-risiko",
          applyEffect:{ timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Oplys personalet",
        choiceA:{
          label:"Oplæringskampagne",
          text:"+2 tid, +5 hospital",
          applyEffect:{ timeCost:2, statChange:{hospitalSatisfaction:5} }
        },
        choiceB:{
          label:"Pludselig indførsel",
          text:"-5 hospital, men hurtigere",
          applyEffect:{ statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Retningslinjer login",
        choiceA:{
          label:"Dyb jura-check",
          text:"+2 tid, ingen hul",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Standard paragraf",
          text:"+5% fejlrisiko i jura",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"2FA-dokumentation",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB roser dig",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal dok",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Phishing-awareness Kampagne",
    shortDesc:"Testmails og e-læring mod phishing",
    logicLong:"Først Cybersikkerhed, Hospital (HR), IT Jura, Dokumentation. Driftfejl efter CAB.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Design kampagne",
        choiceA:{
          label:"Omfattende plan",
          text:"+2 tid, høj effekt",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Én testmail",
          text:"+10% lavere læring",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Involver HR",
        choiceA:{
          label:"Formel koordinering",
          text:"+2 tid, bedre opbakning",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Ingen forvarsel",
          text:"+10% personaleklager",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Lovpligtig info",
        choiceA:{
          label:"Tydelig info",
          text:"+2 tid, ingen klage",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimalt jura-check",
          text:"+5% fagforeningsklage",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Kampagnens rapport",
        choiceA:{
          label:"Fyldig rapport",
          text:"+2 tid, CAB glade",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Kort notits",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"SOC-overvågning (Security Operation Center)",
    shortDesc:"24/7 overvågning af logs",
    logicLong:"Først Cybersikkerhed, Infrastruktur (logserver), Hospital (eskalering), Dokumentation. Driftfejl mulig.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Plan SOC (deltid vs fuldtid)",
        choiceA:{
          label:"Fuld 24/7",
          text:"+3 tid, topbeskyttelse",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"Deltid",
          text:"+10% overset natangreb",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt logserver",
        choiceA:{
          label:"Dedikeret server",
          text:"+2 tid, +50 kr, stabil",
          applyEffect:{ timeCost:2, moneyCost:50 }
        },
        choiceB:{
          label:"Eksisterende server",
          text:"+5% flaskehals",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Eskalering ved alarmer",
        choiceA:{
          label:"Formel plan",
          text:"+2 tid, effektiv respons",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Ingen plan",
          text:"+10% langsom reaktion",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"SOC-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB glade",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Automatisk Patch Management",
    shortDesc:"Auto-patch OS/app/firmware",
    logicLong:"Først Cybersikkerhed (valg), Infrastruktur (opsæt), Hospital (servicevinduer), Dokumentation. Driftfejl postCAB.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg patch-løsning",
        choiceA:{
          label:"Avanceret prioritering",
          text:"+2 tid, +3 kr, bedre",
          applyEffect:{ timeCost:2, moneyCost:3 }
        },
        choiceB:{
          label:"Standard autotool",
          text:"+5% oversete patch",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt patch-jobs",
        choiceA:{
          label:"Testserver først",
          text:"+2 tid, færre fejl",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Direkte i prod",
          text:"+10% nedbrud",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Book servicevinduer",
        choiceA:{
          label:"Formel plan",
          text:"+2 tid, forudsigeligt",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Patch løbende",
          text:"+10% utilfredshed",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Patch-historik",
        choiceA:{
          label:"Fuld rapport",
          text:"+2 tid, CAB glade",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Kort notits",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Adgangsbegrænsning til leverandørportaler",
    shortDesc:"Sikre leverandørs fjernadgang",
    logicLong:"Først Cybersikkerhed (VPN/segment), IT Jura (kontrakt), Leverandør, Dokumentation. Driftfejl mulig.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Krav til VPN/segment",
        choiceA:{
          label:"Dedikeret VPN",
          text:"+2 tid, +50 kr, mere sikkert",
          applyEffect:{ timeCost:2, moneyCost:50 }
        },
        choiceB:{
          label:"Basal SSL",
          text:"+5% lækrisiko",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"it-jura",
        stepDescription:"Opdatér kontrakt",
        choiceA:{
          label:"Streng access-aftale",
          text:"+2 tid, solid jura",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal klausul",
          text:"+5% tvister",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"leverandør",
        stepDescription:"Ny tilgang",
        choiceA:{
          label:"Detaljeret onboarding",
          text:"+2 tid, færre fejl",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Hurtig opsætning",
          text:"+10% user-fejl",
          
