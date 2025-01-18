// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    category: "cybersikkerhed",
    title: "NetværksPenTest (ekstern firma)",
    shortDesc: "Hyre eksterne specialister.",
    logicLong: "Først Cybersikkerhed, IT Jura, Hospital, Dokumentation. Fejl i drift er mulig.",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg penTest (detaljeret vs. hurtig).",
        choiceA: {
          label: "Detaljeret",
          text: "Mere tid, +50 kr, lavere risiko",
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
        stepDescription: "Kontrakt med eksternt firma",
        choiceA: {
          label: "Formel kontrakt + NDA",
          text: "+2 tid, ingen jura-huller",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Standardkontrakt",
          text: "+5% jura-fejl",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner nedetid under test",
        choiceA: {
          label: "Informer afdelinger",
          text: "+2 tid, færre klager",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "Spar tid, -5 hospital",
          applyEffect: { statChange:{ hospitalSatisfaction:-5 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "PenTest-rapport til CAB",
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
    shortDesc: "Revidér forældede firewall-opsætninger",
    logicLong: "Først InfoSikkerhed (analyse), så Cybersikkerhed, Hospital, Dok.",
    steps: [
      {
        location: "informationssikkerhed",
        stepDescription: "Analyse af nuværende firewall/logs",
        choiceA: {
          label: "Dybt log-tjek",
          text: "+2 tid, finder små huller",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+5% overset hul",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Design nye firewall-politikker",
        choiceA: {
          label: "Ny arkitektur",
          text: "+3 tid, robust",
          applyEffect: { timeCost:3 }
        },
        choiceB: {
          label: "Akut fix",
          text: "+5% rest-risiko",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer om net-snit",
        choiceA: {
          label: "Planlagt vindue",
          text: "+2 tid, mindre sure folk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Implementer straks",
          text: "Ingen tid, -5 hospital",
          applyEffect: { statChange:{hospitalSatisfaction:-5} }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Firewall-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid, CAB glade",
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
    category:"cybersikkerhed",
    title:"Kryptering af interne databaser",
    shortDesc:"Fuld diskkryptering, streng adgang",
    logicLong:"Først Cybersikkerhed, Infrastruktur, Hospital, Dokumentation.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg krypteringsmetode",
        choiceA:{
          label:"Avanceret AES256",
          text:"+2 tid, +50 kr",
          applyEffect:{ timeCost:2, moneyCost:50 }
        },
        choiceB:{
          label:"Basal kryptering",
          text:"+5% rest-risiko",
          applyEffect:{ timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Implementer kryptering",
        choiceA:{
          label:"Kontrolleret migrering",
          text:"+3 tid, færre fejl",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"On-the-fly",
          text:"+8% data-korrupt",
          applyEffect:{ riskyPlus:0.08 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Test i afdelinger",
        choiceA:{
          label:"Flere pilot-afd",
          text:"+2 tid, sikr drift",
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
          text:"+2 tid, ingen CAB-skepsis",
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
    shortDesc:"Obligatorisk 2FA i LIMS",
    logicLong:"Først Cybersikkerhed, Hospital (træning), IT Jura, Dok.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg 2FA-løsning",
        choiceA:{
          label:"Robust token",
          text:"+3 tid, +80 kr, meget sikker",
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
          label:"Kampagne",
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
          text:"+5% jura-fejl",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"2FA-dok",
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
    shortDesc:"Testmails og e-læring",
    logicLong:"Først Cybersikkerhed, Hospital (HR), IT Jura, Dok. Fejl muligt.",
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
          label:"Én generisk testmail",
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
          label:"Min. jura-check",
          text:"+5% fagforeningsklage",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Kampagne-rapport",
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
    logicLong:"Først Cybersikkerhed, Infrastruktur, Hospital, Dok.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Plan SOC (fuld/deltid)",
        choiceA:{
          label:"Fuld 24/7",
          text:"+3 tid, topbeskyttelse",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"Deltid-SOC",
          text:"+10% overset natangreb",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt logserver",
        choiceA:{
          label:"Dedikeret server",
          text:"+2 tid, +50 kr",
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
    shortDesc:"Auto-patch OS/firmware",
    logicLong:"Først Cybersikkerhed, Infrastruktur, Hospital, Dok.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg patch-løsning",
        choiceA:{
          label:"Avanceret prioritering",
          text:"+2 tid, +3 kr",
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
    logicLong:"Først Cybersikkerhed, IT Jura, Leverandør, Dok. Driftfejl efter CAB.",
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
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Netdiagram",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB sikret",
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
    title:"Log Management & SIEM-system",
    shortDesc:"Installere SIEM til realtidslog",
    logicLong:"Først Cybersikkerhed, Infrastruktur, Hospital, Dok. Driftfejl mulig.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Vælg robust SIEM",
        choiceA:{
          label:"Custom rulesets",
          text:"+2 tid, +50 kr",
          applyEffect:{ timeCost:2, moneyCost:50 }
        },
        choiceB:{
          label:"Budget-SIEM",
          text:"+5% overset logs",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt log-forwarders",
        choiceA:{
          label:"Dedikeret server",
          text:"+2 tid, stabil",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Eksisterende server",
          text:"+8% performance-problemer",
          applyEffect:{ riskyPlus:0.08 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Informér om alarmer",
        choiceA:{
          label:"Planlæg reaktion",
          text:"+2 tid, mindre kaos",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Ingen info",
          text:"+10% klager",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"SIEM-rapport",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid, CAB glade",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal info",
          text:"+5% fejlsandsynlighed",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    category:"cybersikkerhed",
    title:"Segmentering af LIMS-moduler",
    shortDesc:"Opdele LIMS i netsegmenter",
    logicLong:"Først Cybersikkerhed, Infrastruktur, Hospital, Dokumentation.",
    steps:[
      {
        location:"cybersikkerhed",
        stepDescription:"Definér segmenteringspolitik",
        choiceA:{
          label:"Flere VLAN",
          text:"+2 tid, robust",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Simpel opdeling",
          text:"+8% rest-huller",
          applyEffect:{ riskyPlus:0.08 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Opsæt VLAN/firewall",
        choiceA:{
          label:"Grundig config",
          text:"+2 tid, stabil",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal config",
          text:"+10% opsætningsfejl",
          applyEffect:{ riskyPlus:0.1 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Test workflow",
        choiceA:{
          label:"Pilot i afdelinger",
          text:"+2 tid, trygt",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Rul alt",
          text:"+5% driftproblem",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Segmenteringsrapport",
        choiceA:{
          label:"Fyldig dok",
          text:"+3 tid, CAB roser dig",
          applyEffect:{ timeCost:3 }
        },
        choiceB:{
          label:"Kort notits",
          text:"+5% CAB-skepsis",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  }
];
