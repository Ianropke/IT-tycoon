// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  {
    title: "Immunologi-LIMS Udvidelse",
    shortDesc: "Immunologiafdelingen har brug for nye moduler i LIMS.",
    logicLong: `
      Immunologiafdelingen oplever forsinkelser, når de håndterer patientprøver.
      De ønsker nu en stor udvidelse af LIMS.
      Men <span class="hoverTooltip" data-tooltip="CAB: Change Advisory Board, der tjekker risici.">CAB</span>
      vil se en ordentlig risikovurdering.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Tal med immunologernes overlæge, der er bekymret for performance.
          “Det må ikke gå ned midt i en kritisk <span class="hoverTooltip" data-tooltip="Fx cytokin-test.">test</span>!”
        `,
        choiceA: {
          label: "Grundig behovsanalyse",
          text: "Invester +3 tid => +2 stabilitet, du forstår alt.",
          applyEffect: { timeCost:3, statChange: { stability:2 } }
        },
        choiceB: {
          label: "Hurtig snak",
          text: "+1 tid => +1 stabilitet, +5% risiko (risiko for misforståelser).",
          applyEffect: { timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Planlæg server-ressourcer til immunologi.",
        choiceA: {
          label: "Nye servere",
          text: "+2 tid, -100 kr => +2 stabilitet.",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Brug eksisterende maskiner",
          text: "+1 tid => synergyEffect:{ lackInfra:true } (overbelastning).",
          applyEffect: { timeCost:1, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Skriv en rapport om immunologi-udvidelsen til CAB.",
        choiceA: {
          label: "Grundig dokumentation",
          text: "+2 tid => Ingen ekstra risiko, CAB bliver tilfredse.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risiko => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title: "Patologi – Billedanalyse",
    shortDesc: "Afdelingen vil integrere AI-billedanalyse.",
    logicLong: `
      Patologi behandler vævsprøver og ønsker 
      <span class="hoverTooltip" data-tooltip="AI: Kunstig intelligens, tungt for CPU/GPU.">AI</span>
      til automatisk billedanalyse.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft AI-behov med patologilæger, som frygter algoritmefejl.",
        choiceA: {
          label: "Interview lægerne",
          text: "+3 tid => +2 udvikling, du forstår AI-krav.",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Overfladisk snak",
          text: "+1 tid => +1 udvikling, +5% risk (fejl pga. manglende indsigt).",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér GPU-servere til billedanalyse?",
        choiceA: {
          label: "Køb GPU-løsning",
          text: "+2 tid, -150 kr => +2 stabilitet",
          applyEffect: { timeCost:2, moneyCost:150, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Behold CPU only",
          text: "+5% risk => synergyEffect:{ lackInfra:true }",
          applyEffect: { riskyPlus:0.05, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se dokumentation for AI-sikkerhed.",
        choiceA: {
          label: "Fuld rapport",
          text: "+2 tid => +1 security (god compliance).",
          applyEffect: { timeCost:2, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Minimal",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title: "Klinikledelsen vil have dashboards",
    shortDesc: "Direktionen ønsker pæne dashboards i LIMS.",
    logicLong: `
      De mangler overblik og vil have 
      <span class="hoverTooltip" data-tooltip="Dashboards: Interaktive oversigter over KPI'er.">dashboards</span>.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Mød med ledelsen for at definere dashboard-indhold.",
        choiceA: {
          label: "Workshop",
          text: "+3 tid => +2 udvikling, du får alle ønsker belyst.",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Prototype hurtigt",
          text: "+1 tid => +1 udvikling, +5% risk (misforståelser).",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Nye dashboards viser måske persondata.
          <span class="hoverTooltip" data-tooltip="GDPR: EU-lov om datasikkerhed.">GDPR</span>
          skal overholdes.
        `,
        choiceA: {
          label: "Dyb jura-check",
          text: "+2 tid, -50 kr => +1 security",
          applyEffect: { timeCost:2, moneyCost:50, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Minimal check",
          text: "Spar tid => +1 dev, +5% risk pga. mulig lovbrud.",
          applyEffect: { statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Skriv dokumentation om GDPR & dashboards.",
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title: "Multi-sprog i LIMS",
    shortDesc: "Mange internationale ansatte ønsker LIMS på engelsk/tysk.",
    logicLong: `
      Hospitalet har flere udenlandske læger, som vil have 
      <span class="hoverTooltip" data-tooltip="Sprogpakker: UI-oversættelser.">multisprog</span>
      i LIMS.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Find ud af, hvilke sprog der er mest kritiske.",
        choiceA: {
          label: "Kravworkshop",
          text: "+3 tid => +2 udvikling (prioriterer sprog).",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Skøn baseret på personalet",
          text: "+1 tid => +1 udvikling, +5% risk (overser noget).",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Kan serverne håndtere flere sprogpakker?",
        choiceA: {
          label: "Opgrader system",
          text: "+2 tid, -100 kr => +2 stabilitet",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Behold eksisterende",
          text: "+1 tid => synergyEffect:{ lackInfra:true }",
          applyEffect: { timeCost:1, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en plan for sproghåndtering.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => ingen risk.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title: "Projekt: WeekendServerNedluk",
    shortDesc: "Hospitalet ønsker store opgraderinger i en weekend.",
    logicLong: `
      For at undgå driftforstyrrelser i hverdagen, 
      vil ledelsen lukke serverne en weekend.
    `,
    steps: [
      {
        location:"hospital",
        stepDescription:"Drøft med personalet, om de kan undvære systemet en weekend.",
        choiceA:{
          label:"Sæt møder op",
          text:"+3 tid => +2 stabilitet (man sikrer enighed).",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Tving plan igennem",
          text:"0 tid => -10 hospital, personalet er sure.",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 } }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Udfør de planlagte opgraderinger i weekend-lukketiden.",
        choiceA:{
          label:"Stor infrastrukturpakke",
          text:"+3 tid, -150 kr => +2 stabilitet, +1 udvikling",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2, development:1 } }
        },
        choiceB:{
          label:"Kun kritiske fixes",
          text:"+1 tid, -50 kr => +1 stabilitet, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Skriv en weekend-rapport til CAB.",
        choiceA:{
          label:"Grundig rapport",
          text:"+2 tid => ingen ekstra risk.",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal notits",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title:"BlodprøveAutomatisering",
    shortDesc:"Automatiske robotter til blodprøvehåndtering",
    logicLong:`
      Hospitalets lab vil automatisere blodprøvehåndtering med robotter. 
      Men <span class='hoverTooltip' data-tooltip='CAB: De tjekker, om robotter er for risikable.'>CAB</span>
      ser stor risiko for mekaniske fejl.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Mød med lab-personale, der er spændte på robotter.",
        choiceA:{
          label:"Grundig interviewrunde",
          text:"+3 tid => +2 stabilitet, du forstår flowet.",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Kort snak",
          text:"+1 tid => +1 stabilitet, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Robotter kræver nye netværks- og strømforhold.",
        choiceA:{
          label:"Dedikeret robot-net",
          text:"+2 tid, -100 kr => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:100, statChange:{ stability:2} }
        },
        choiceB:{
          label:"Brug eksisterende kabling",
          text:"+1 tid => synergyEffect:{lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Robotprojektrapport til CAB.",
        choiceA:{
          label:"Detaljeret",
          text:"+2 tid => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Skip doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title:"Biokemi – ReagensHåndtering",
    shortDesc:"Biokemilab vil have LIMS-løsning til at tracke reagenser.",
    logicLong:`
      Biokemilab har reagenser, som ofte løber tør midt i analyser.
      De vil have LIMS til at tracke lagerbeholdning. 
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Interview biokemikere om reagens-behov.",
        choiceA:{
          label:"Dybt interview",
          text:"+3 tid => +2 udvikling (du opdager nye features).",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Hurtig seddel",
          text:"+1 tid => +1 dev, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"leverandør",
        stepDescription:"Kan leverandøren lave reagens-modulet?",
        choiceA:{
          label:"Premium-løsning",
          text:"+2 tid, -120 kr => +2 stabilitet",
          applyEffect:{ timeCost:2, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Billig plugin",
          text:"+1 tid, -50 kr => +1 udvikling, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Reagens-rapport til CAB",
        choiceA:{
          label:"Udførlig dok",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title:"Klinisk Genetik – VariantDatabase",
    shortDesc:"Genetik vil have en database til genvarianter i LIMS.",
    logicLong:`
      Klinisk Genetik sporer arvelige mutationer og vil have 
      <span class='hoverTooltip' data-tooltip='VariantDatabase: Samling af geninformationer.'>variantdatabase</span>.
      Datamængden kan blive stor!
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Koordiner med genetikere om store datamængder.",
        choiceA:{
          label:"Afhold genetik-workshop",
          text:"+3 tid => +2 udvikling",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Antag normal mængde",
          text:"+1 tid => +1 dev, +5% risk (datamængde undervurderes)",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Databasekrav kan sprænge serverne.",
        choiceA:{
          label:"Køb ny HPC-løsning",
          text:"+2 tid, -150 kr => +2 stability, +1 security",
          applyEffect:{ timeCost:2, moneyCost:150, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Brug eksisterende disk",
          text:"+5% risk => synergyEffect:{lackInfra:true}",
          applyEffect:{ riskyPlus:0.05, synergyEffect:{lackInfra:true} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Genetik-projektet kræver streng datasikkerhed.",
        choiceA:{
          label:"Omfattende dok",
          text:"+2 tid => +1 security",
          applyEffect:{ timeCost:2, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Spring delvis over",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },
  {
    title:"Overbelægning i Akutafdelingen",
    shortDesc:"Akut vil integrere hurtige blodprøver i LIMS.",
    logicLong:`
      Akutafdelingen får patienter 24/7. De vil have 
      <span class='hoverTooltip' data-tooltip='Hurtige blodprøver: Hjælper i akutte diagnoser.'>hurtige blodprøver</span>
      i LIMS.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Tal med akut-personalet om ønsket svartid.",
        choiceA:{
          label:"Detaljeret kartlægning",
          text:"+3 tid => +2 stability",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Hurtig snak",
          text:"+1 tid => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"it-jura",
        stepDescription:"Akut-data er følsomt. Tjek lovkrav!",
        choiceA:{
          label:"Juridisk specialtjek",
          text:"+2 tid, -60 kr => +1 security",
          applyEffect:{ timeCost:2, moneyCost:60, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Antag alt OK",
          text:"+5% risk => synergyEffect:{rushedJura:true}",
          applyEffect:{ riskyPlus:0.05, synergyEffect:{ rushedJura:true} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se en plan for akut-blodprøver.",
        choiceA:{
          label:"Fuld dok",
          text:"+2 tid => ingen risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Skip doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  }
];
