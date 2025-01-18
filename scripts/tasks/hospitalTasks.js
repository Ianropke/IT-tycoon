// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    category:"hospital",
    title:"Biokemi Lab-automatisering",
    shortDesc:"Automatisere prøvehåndtering",
    logicLong:"Først Hospital, Infrastruktur, Cybersikkerhed, Dok. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér nye arbejdsgange",
        choiceA:{ label:"Detaljeret plan", text:"+2 tid, færre fejl", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal auto-flow", text:"+5% manuelle loops", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"infrastruktur",
        stepDescription:"Koble robotter",
        choiceA:{ label:"Fuld integration", text:"+2 tid, stabil", applyEffect:{timeCost:2} },
        choiceB:{ label:"Hurtig opsætning", text:"+8% netkonflikt", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Sikre data",
        choiceA:{ label:"Krypteret link", text:"+2 tid, tryghed", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal sikring", text:"+5% brudfare", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Lab-auto-rapport",
        choiceA:{ label:"Dyb dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Kort notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"Patologi Billedanalyse-Plugin",
    shortDesc:"AI-baseret billedanalyse.",
    logicLong:"Først Hospital (AI-krav), Leverandør, IT Jura, Dok. PostCAB fejl muligt.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Lav AI-krav",
        choiceA:{ label:"Detaljeret", text:"+2 tid, færre misforståelser", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal kravliste", text:"+5% fejl i plugin", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Udvikle plugin",
        choiceA:{ label:"Omfattende test", text:"+3 tid, stabil AI", applyEffect:{timeCost:3} },
        choiceB:{ label:"Basis-plugin", text:"+8% fejl i analyser", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"it-jura",
        stepDescription:"Databehandleraftale (AI)",
        choiceA:{ label:"Dyb jura-check", text:"+2 tid, ingen hul", applyEffect:{timeCost:2} },
        choiceB:{ label:"Genbrug gammel aftale", text:"+5% hul i nye datatyper", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Beskriv plugin",
        choiceA:{ label:"Grundig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"Klinisk Genetik BigData Integration",
    shortDesc:"Forbind LIMS med gen-database.",
    logicLong:"Først Hospital (krav), Leverandør, Cybersikkerhed, Dok. PostCAB driftfejl.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér gen-krav",
        choiceA:{ label:"Detaljeret varianter", text:"+2 tid, præcis integration", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal kravliste", text:"+5% fejlfortolkning", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Byg interface",
        choiceA:{ label:"Robust interface", text:"+3 tid, fewer mis-match", applyEffect:{timeCost:3} },
        choiceB:{ label:"Hurtig patch", text:"+8% misfortolkede keys", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Sikre gen-data",
        choiceA:{ label:"Krypter + log", text:"+2 tid, tryghed", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal sikring", text:"+5% datalæk", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Genetik-rapport",
        choiceA:{ label:"Fuld dok", text:"+2 tid, CAB glade", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"Immunologi DataDashboard",
    shortDesc:"Dashboard for igangværende tests.",
    logicLong:"Først Hospital (UI-design), Infrastruktur (realtid), Cybersikkerhed (adgang), Dok. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Design UI",
        choiceA:{ label:"Detaljeret mockup", text:"+2 tid, god brugeroplevelse", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal listevisning", text:"+5% dårlig UX", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"infrastruktur",
        stepDescription:"Realtidsopsætning",
        choiceA:{ label:"Websockets", text:"+2 tid, live data", applyEffect:{timeCost:2} },
        choiceB:{ label:"Poll-løsning", text:"+10% forsinkelse", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Adgangsstyring",
        choiceA:{ label:"Stram login + log", text:"+2 tid, sikkert", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal sikring", text:"+5% uberettiget adgang", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Dashboard-rapport",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB glade", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"MobilApp til Lab-gange",
    shortDesc:"Bestil analyser fra tablet/mobil.",
    logicLong:"Først Hospital (krav), Leverandør (udvikling), Cybersikkerhed (device sikring), Dok. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér app-funktioner",
        choiceA:{ label:"Omfattende liste", text:"+2 tid, få klager", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal funkliste", text:"+5% savnede features", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Kod app",
        choiceA:{ label:"Dedikeret mobilapp", text:"+3 tid, stabil", applyEffect:{timeCost:3} },
        choiceB:{ label:"Simpel webapp", text:"+8% wifi-ustabil", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Device-sikring",
        choiceA:{ label:"Mobil device mgmt", text:"+2 tid, tryghed", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal sikring", text:"+10% data på stjålne enheder", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"dokumentation",
        stepDescription:"Mobil-app-rapport",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"Quick-View for akutte patienter",
    shortDesc:"Hurtig-liste til vigtige resultater.",
    logicLong:"Først Hospital (hvad prioriteres), Leverandør (funktion), Infrastruktur (ydelse), Dok. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér akut-liste",
        choiceA:{ label:"Præcis udvalgte patienter", text:"+2 tid, velfungerende", applyEffect:{timeCost:2} },
        choiceB:{ label:"Bred akut-liste", text:"+5% overload af irrelevante", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Implementér funktionen",
        choiceA:{ label:"Rød markering + prioritet", text:"+2 tid, overskueligt", applyEffect:{timeCost:2} },
        choiceB:{ label:"Simpel sortering", text:"+8% personale er utilfredse", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"infrastruktur",
        stepDescription:"Tjek serverbelastning",
        choiceA:{ label:"Kapacitetsudvidelse", text:"+2 tid, stabil drift", applyEffect:{timeCost:2} },
        choiceB:{ label:"Eksisterende server", text:"+5% sløv performance", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Quick-view-rapport",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB glade", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"Automatiseret rapportskabelon",
    shortDesc:"Standardrapporter (onkologi etc.)",
    logicLong:"Først Hospital (skabeloner), Leverandør (udvikling), IT Jura, Dok. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Definér skabeloner",
        choiceA:{ label:"Fagområder", text:"+2 tid, præcis", applyEffect:{timeCost:2} },
        choiceB:{ label:"Én generisk", text:"+5% mismatch", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Implementér modul",
        choiceA:{ label:"Grundig test af datafelter", text:"+2 tid, fewer fejl", applyEffect:{timeCost:2} },
        choiceB:{ label:"Quick fix", text:"+8% forkerte rapportfelter", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"it-jura",
        stepDescription:"Tjek dataopbevaring",
        choiceA:{ label:"Dyb jura-check", text:"+2 tid, ingen klage", applyEffect:{timeCost:2} },
        choiceB:{ label:"Standard paragraf", text:"+5% tvetydighed", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Rapportskabelon-dok",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"hospital",
    title:"LIMS-UI Forbedring i KBA",
    shortDesc:"Forenkle menuer, hurtig-søg.",
    logicLong:"Først Hospital (brugernes ønsker), Leverandør (UI), IT Jura (licens), Dokumentation. Driftfejl mulig.",
    steps:[
      {
        location:"hospital",
        stepDescription:"Afdæk UI-problemer",
        choiceA:{ label:"Interviews", text:"+2 tid, præcis feedback", applyEffect:{timeCost:2} },
        choiceB:{ label:"Gæt forbedringer", text:"+5% rammer forkert", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"UI-implementering",
        choiceA:{ label:"Omfattende redesign", text:"+3 tid, brugertest", applyEffect:{timeCost:3} },
        choiceB:{ label:"Lille 'skin'", text:"+8% fejl i menustruktur", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"it-jura",
        stepDescription:"Licensaftaler v store UI-ændringer",
        choiceA:{ label:"Grundig check", text:"+2 tid, ingen konflikt", applyEffect:{timeCost:2} },
        choiceB:{ label:"Antag OK", text:"+5% licenskonflikt", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"UI-projekt-dok",
        choiceA:{ label:"Fuld dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Kort notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  }
];
