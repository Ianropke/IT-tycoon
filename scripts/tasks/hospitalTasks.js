// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [

  {
    title: "Immunologi-LIMS Udvidelse",
    shortDesc: `
      Immunologiafdelingen oplever forsinkelser. De ønsker en 
      <span class="hoverTooltip" data-tooltip="Laboratory Information Management System.">LIMS</span>
      -udvidelse med bedre test-moduler.
    `,
    logicLong: `
      Immunologiafdelingen klager over langsom datahåndtering. 
      Du vil installere nye moduler, men 
      <span class="hoverTooltip" data-tooltip="CAB: Change Advisory Board, der checker risici.">CAB</span>
      kræver risikovurdering.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Tal med immunologernes overlæge om performancekrav.",
        choiceA: {
          label: "Grundig behovsanalyse",
          text: "+3 tid => +2 stability",
          applyEffect: { timeCost:3, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Hurtig snak",
          text: "+1 tid => +1 stability, +5% risk",
          applyEffect: { timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Opsæt server-ressourcer til immunologi. 
          Skal du købe ny hardware?
        `,
        choiceA: {
          label: "Nye servere",
          text: "+2 tid, -100 kr => +2 stability (massiv kapacitet).",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Behold eksisterende",
          text: "+1 tid => synergyEffect:{ lackInfra:true } (overbelastning).",
          applyEffect: { timeCost:1, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Skriv en rapport om immunologi-udvidelsen til CAB.",
        choiceA: {
          label: "Grundig dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Patologi – Billedanalyse",
    shortDesc: `
      Patologiafdelingen vil integrere 
      <span class="hoverTooltip" data-tooltip="Kunstig intelligens til at tolke vævsbilleder.">AI-billedanalyse</span>
      i LIMS.
    `,
    logicLong: `
      Patologi håndterer vævsprøver og ønsker 
      <span class="hoverTooltip" data-tooltip="Avanceret computer-vision, der hjælper med diagnose.">AI</span>
      til at spotte abnormiteter. 
      Stor chance for fejl, hvis ikke infrastruktur er klar.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft AI-behov med patologiafdelingens læger.",
        choiceA: {
          label: "Interview lægerne",
          text: "+3 tid => +2 development",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Overfladisk snak",
          text: "+1 tid => +1 dev, +5% risk",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér GPU-servere til AI-billedanalyse?",
        choiceA: {
          label: "Køb GPU-løsning",
          text: "+2 tid, -150 kr => +2 stability",
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
    shortDesc: `
      Direktionen ønsker 
      <span class="hoverTooltip" data-tooltip="Interaktive oversigter for KPI'er.">dashboards</span>
      i LIMS for overblik.
    `,
    logicLong: `
      De mangler overblik og vil have 
      <span class="hoverTooltip" data-tooltip="Grafiske oversigter over kritiske data.">dashboards</span>. 
      Personalet frygter, at interface bliver for tungt.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Mød med ledelsen for at definere dashboard-indhold.",
        choiceA: {
          label: "Workshop",
          text: "+3 tid => +2 development (grundigt design).",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Prototype hurtigt",
          text: "+1 tid => +1 dev, +5% risk (risiko for misforståelser).",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Nye dashboards viser muligvis persondata. 
          <span class="hoverTooltip" data-tooltip="EU-lov for databeskyttelse.">GDPR</span> 
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
    shortDesc: `
      Flere internationale læger ønsker 
      <span class="hoverTooltip" data-tooltip="Sprogpakker i LIMS UI.">multisprog</span>.
    `,
    logicLong: `
      Hospitalet har udenlandske ansatte, der vil have menuer på fx engelsk. 
      Oversættelse kan være dyr og give nye tekniske krav.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Find ud af, hvilke sprog der er vigtigst.",
        choiceA: {
          label: "Kravworkshop",
          text: "+3 tid => +2 development",
          applyEffect: { timeCost:3, statChange:{ development:2 } }
        },
        choiceB: {
          label: "Skøn baseret på personalet",
          text: "+1 tid => +1 dev, +5% risk",
          applyEffect: { timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér server for at håndtere ekstra sprog.",
        choiceA: {
          label: "Fuld opgradering",
          text: "+2 tid, -100 kr => +2 stability",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Behold eksisterende",
          text: "+1 tid => synergyEffect:{ lackInfra:true}",
          applyEffect: { timeCost:1, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se plan for sproghåndtering.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => ingen risk",
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
    shortDesc: `
      Hospitalet vil 
      <span class="hoverTooltip" data-tooltip="Lukke serverne i en weekend for en stor opgradering.">weekend-nedluk</span>
      for store opgraderinger.
    `,
    logicLong: `
      For at undgå driftforstyrrelser i hverdagen, 
      planlægges en weekendservernedluk. Personalet er skeptiske.
    `,
    steps: [
      {
        location:"hospital",
        stepDescription:"Drøft med personalet, om de kan undvære systemet en weekend.",
        choiceA:{
          label:"Sæt møder op",
          text:"+3 tid => +2 stability (man sikrer enighed).",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Tving plan igennem",
          text:"0 tid => -10 hospitalSatisfaction, personalet er sure.",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 } }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Udfør opgraderinger i weekend-lukketiden.",
        choiceA:{
          label:"Stor infrastrukturpakke",
          text:"+3 tid, -150 kr => +2 stability, +1 development",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2, development:1 } }
        },
        choiceB:{
          label:"Kun kritiske fixes",
          text:"+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Skriv weekend-rapport til CAB.",
        choiceA:{
          label:"Grundig rapport",
          text:"+2 tid => ingen ekstra risk",
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
    shortDesc:`
      Automatiske robotter til 
      <span class="hoverTooltip" data-tooltip="Automatisk håndtering af blodprøver.">blodprøvehåndtering</span>
      i lab.
    `,
    logicLong:`
      Hospitalets lab vil automatisere blodprøvehåndtering med robotter. 
      Men 
      <span class="hoverTooltip" data-tooltip="CAB: Tjekker for mekaniske risici.">CAB</span>
      ser stor risiko for fejl.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Mød med lab-personale, der er spændte på robotter.",
        choiceA:{
          label:"Grundig interviewrunde",
          text:"+3 tid => +2 stability",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Kort snak",
          text:"+1 tid => +1 stability, +5% risk",
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
    shortDesc:`
      Biokemilab ønsker 
      <span class="hoverTooltip" data-tooltip="Modul der sporer reagenser.">reagens-overblik</span>
      i LIMS.
    `,
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
          text:"+3 tid => +2 development",
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
        stepDescription:"Kan leverandøren udvikle reagens-modulet?",
        choiceA:{
          label:"Premium-løsning",
          text:"+2 tid, -120 kr => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Billig plugin",
          text:"+1 tid, -50 kr => +1 development, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Reagens-rapport til CAB.",
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
    shortDesc:`
      Genetik vil have en 
      <span class="hoverTooltip" data-tooltip="Database for genvarianter i LIMS.">VariantDatabase</span>
      til arvelige mutationer.
    `,
    logicLong:`
      Klinisk Genetik sporer arvelige mutationer og vil have en 
      <span class="hoverTooltip" data-tooltip="Samling af geninformationer, meget data.">variantdatabase</span>.
      Datamængden kan blive stor.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Koordiner med genetikere om store datamængder.",
        choiceA:{
          label:"Genetik-workshop",
          text:"+3 tid => +2 development",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Antag normal mængde",
          text:"+1 tid => +1 dev, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Databasekrav kan sprænge serverne?",
        choiceA:{
          label:"Ny HPC-løsning",
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
        stepDescription:"Genetik-projekt kræver streng datasikkerhed i rapport til CAB.",
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
    shortDesc:`
      Akut vil integrere 
      <span class="hoverTooltip" data-tooltip="Blodprøver og vitale parametre i LIMS.">hurtige blodprøver</span>
      i LIMS.
    `,
    logicLong:`
      Akutafdelingen modtager patienter 24/7. 
      De kræver hurtigere blodprøvesvar i LIMS. 
      Stor driftpåvirkning, men stor gevinst.
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
        stepDescription:`
          Akut-data er følsomt. Tjek lovkrav! 
          <span class="hoverTooltip" data-tooltip="GDPR-lignende regler for akutte data.">Datalov</span>
        `,
        choiceA:{
          label:"Juridisk specialtjek",
          text:"+2 tid, -60 kr => +1 security",
          applyEffect:{ timeCost:2, moneyCost:60, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Antag alt OK",
          text:"+5% risk => synergyEffect:{ rushedJura:true}",
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
