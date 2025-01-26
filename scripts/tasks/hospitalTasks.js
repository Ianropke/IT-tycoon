// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [

  {
    title: "Immunologi-LIMS Udvidelse",
    shortDesc: `
      Immunologiafdelingen ønsker bedre integration af 
      <span class="hoverTooltip" data-tooltip="Autoimmun stainer og flow-løsninger.">autoimmunt lab</span>
      og <span class="hoverTooltip" data-tooltip="Fx Flowcytometri, ELISA-læser.">instrumenter</span>.
    `,
    logicLong: `
      Immunologerne laver analyser af autoantistoffer (ANA, ANCA) 
      og bruger fx 
      <span class="hoverTooltip" data-tooltip="Maskine til at farve autoantistoffer.">autoimmun stainer</span>
      og 
      <span class="hoverTooltip" data-tooltip="Flowcytometri: laserbaseret celletælling og -profilering.">flowcytometre</span>.
      De vil have LIMS til at fange alle data automatiseret.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Drøft med immunologiens overlæge, der ønsker 
          <span class="hoverTooltip" data-tooltip="ELISA, flow, autoimmun stainer.">instrumentintegration</span> 
          og resultatoverførsel.
        `,
        choiceA: {
          label: "Detaljeret kravworkshop",
          text: "+3 tid => +2 development (du opdager alle ønsker).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overfladisk samtale",
          text: "+1 tid => +1 dev, +5% risk (du overser måske vigtige ønsker).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Sikre dataoverførsel fra 
          <span class="hoverTooltip" data-tooltip="Flowcytometer, stainer, etc.">immunologiske instrumenter</span>
          til LIMS.
        `,
        choiceA: {
          label: "Opsæt dedikeret integrationsserver",
          text: "+2 tid, -100 kr => +2 stability",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende infrastruktur",
          text: "+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Skriv 
          <span class="hoverTooltip" data-tooltip="Protokoller for autoimmun stainer, flow-indstillinger.">protokoldokumentation</span> 
          til CAB.
        `,
        choiceA: {
          label: "Fuld rapport",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Patologi – Digital Arbejdsgang",
    shortDesc: `
      Patologi vil skifte til 
      <span class="hoverTooltip" data-tooltip="Scanning af histosnit, AI for diagnostik.">digital patologi</span> 
      med <span class="hoverTooltip" data-tooltip="Makroskopisk udskæring, embedding station, mikrotom, autostainer.">automatiserede processer</span>.
    `,
    logicLong: `
      Afdelingen har 
      <span class="hoverTooltip" data-tooltip="Vævskassetter, snit, farvning.">makroskopisk udskæring</span>, 
      embedding station, 
      <span class="hoverTooltip" data-tooltip="Maskine der skærer tynde paraffinsnit.">mikrotom</span>
      og autostainer. 
      De vil scanne snittene digitalt og bruge AI. LIMS skal fange alle skridt.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Mød med patologiens overlæge og teknikere, 
          der ønsker <span class="hoverTooltip" data-tooltip="Registrering af alle skridt, fra udskæring til scanning.">komplet sporing</span>.
        `,
        choiceA: {
          label: "Detaljeret flowgennemgang",
          text: "+3 tid => +2 stability (man finder flaskehalse).",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort interview",
          text: "+1 tid => +1 stability, +5% risk",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Planlæg 
          <span class="hoverTooltip" data-tooltip="Digitale scannere kan generere store billedfiler.">storage</span>
          og 
          <span class="hoverTooltip" data-tooltip="AI-analyse kræver HPC eller GPU.">AI-kapacitet</span>
          for scannede snit.
        `,
        choiceA: {
          label: "Køb GPU-server + stor disk",
          text: "+2 tid, -150 kr => +2 development (AI-ready).",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende CPU + disk",
          text: "+5% risk => synergyEffect:{ lackInfra:true}",
          applyEffect: { synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB kræver 
          <span class="hoverTooltip" data-tooltip="Hvordan håndterer man snit, farver, scanning, AI-output.">arbejdsgangs-dokumentation</span>.
        `,
        choiceA: {
          label: "Fuld workflow-doc",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Klinikledelsen vil have Dashboards",
    shortDesc: `
      Direktionen ønsker 
      <span class="hoverTooltip" data-tooltip="Brugervenlige oversigter for KPI'er, fx TAT, sample flow.">LIMS-dashboards</span>
      for analyser.
    `,
    logicLong: `
      Ledelsen savner overblik over 
      <span class="hoverTooltip" data-tooltip="Turn Around Time: Tid fra prøve modtagelse til svar.">TAT</span>, 
      sample flow og 
      <span class="hoverTooltip" data-tooltip="Hvor mange prøver, hvilke analyser er forsinkede.">KPI’er</span>. 
      De vil have et dashboard i LIMS, så de kan styre ressourcer bedre.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Mød med direktionsgruppen for at definere 
          <span class="hoverTooltip" data-tooltip="Hvilke målinger? fx TAT, fejlrate, reagensforbrug.">dashboardets indhold</span>.
        `,
        choiceA: {
          label: "Workshop med ledelsen",
          text: "+3 tid => +2 development (grundig kravafdækning).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Prototype hurtigt",
          text: "+1 tid => +1 dev, +5% risk (misforståelser).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Nye dashboards viser måske 
          <span class="hoverTooltip" data-tooltip="Patientdata eller medarbejderperformance. Skal overholde GDPR.">personfølsomme data</span>.
        `,
        choiceA: {
          label: "Dyb jura-check",
          text: "+2 tid, -50 kr => +1 security",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal check",
          text: "Spar tid => +1 dev, +5% risk pga. mulig lovbrud.",
          applyEffect: { statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Skriv 
          <span class="hoverTooltip" data-tooltip="GDPR, datasikkerhed, hvad lagres i dashboard.">GDPR & dashboard-dokumentation</span>.
        `,
        choiceA: {
          label: "Fuld dok",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Multi-sprog i LIMS",
    shortDesc: `
      Flere udenlandske ansatte ønsker LIMS på fx engelsk, 
      <span class="hoverTooltip" data-tooltip="Tysk, fransk, spansk, alt efter personalets behov.">tysk</span> 
      eller fransk.
    `,
    logicLong: `
      Hospitalet har mange internationale læger. 
      De ønsker menuer og rapporter i flere sprog. 
      Det kan kræve oversættelse af f.eks. 
      <span class="hoverTooltip" data-tooltip="Instrumentnavne, pipetteringsrobot, flowcytometer.">instrument-felter</span> 
      i LIMS.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Find ud af, hvilke sprog der reelt er mest nødvendige.",
        choiceA: {
          label: "Kravworkshop",
          text: "+3 tid => +2 development (prioriterer korrekte sprog).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Skøn baseret på personalelister",
          text: "+1 tid => +1 dev, +5% risk (du overser noget).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Sikre at <span class="hoverTooltip" data-tooltip="Serveren skal have flere sprogpakker til interface.">serveren</span> 
          håndterer sprogpakkernes ressourcer.
        `,
        choiceA: {
          label: "Opgrader system",
          text: "+2 tid, -100 kr => +2 stability (klar til multi-lingual).",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Behold eksisterende",
          text: "+1 tid => synergyEffect:{ lackInfra:true}",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB vil se en 
          <span class="hoverTooltip" data-tooltip="Plan for sprogversioner, vedligehold.">oversættelsesplan</span>.
        `,
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Projekt: WeekendServerNedluk",
    shortDesc: `
      Hospitalet vil lukke systemet en weekend for store 
      <span class="hoverTooltip" data-tooltip="Opdatering af servers, net, LIMS-version.">opgraderinger</span>.
    `,
    logicLong: `
      For at undgå driftforstyrrelser i hverdagen, 
      vil ledelsen køre en weekend-nedluk. 
      Fx 
      <span class="hoverTooltip" data-tooltip="Patologi har autostainere i gang, microbiologi har MALDI-TOF testruns, etc.">afdelinger</span>
      er dog nervøse.
    `,
    steps: [
      {
        location:"hospital",
        stepDescription:"Drøft med personalet, om de kan undvære LIMS i en hel weekend.",
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
        stepDescription:"Udfør planlagte server- og netopgraderinger i weekend-lukketiden.",
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
        stepDescription:"Skriv weekend-rapport til CAB om alt, inkl. patologi-løsninger.",
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
      Automatisér blodprøvehåndtering med 
      <span class="hoverTooltip" data-tooltip="Robot kan sortere, centrifugere, tjekke stregkoder.">robotudstyr</span>,
      pipetteringsrobot & autoanalyser.
    `,
    logicLong:`
      Hospitalets lab vil automatisere processer med pipetteringsrobot og
      <span class="hoverTooltip" data-tooltip="Store maskiner, fx til CRP, leverprøver, nyretal.">autoanalyser</span>.
      LIMS skal styre stregkoder, batchhåndtering og resultatoverførsel.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:`
          Mød med lab-personalet, der har travlt og vil 
          <span class="hoverTooltip" data-tooltip="Færre manuelle pipetteringer, mindre risiko for fejl.">automatisere</span>
          blodprøver mest muligt.
        `,
        choiceA:{
          label:"Grundig interviewrunde",
          text:"+3 tid => +2 stability (du forstår workflowet).",
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
        stepDescription:`
          Robotter kræver ny 
          <span class="hoverTooltip" data-tooltip="Koordinering med autoanalyser, stregkodescannere.">integration</span>
          og sikring mod overbelastning.
        `,
        choiceA:{
          label:"Dedikeret robot-net",
          text:"+2 tid, -100 kr => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:100, statChange:{ stability:2} }
        },
        choiceB:{
          label:"Brug eksisterende kabling",
          text:"+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:`
          Lav 
          <span class="hoverTooltip" data-tooltip="Beskrivelse af robot-flow, autoanalysers interface, QC.">automationsrapport</span> 
          til CAB.
        `,
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
      Biokemilab vil styre 
      <span class="hoverTooltip" data-tooltip="Fx reagenser til autoanalyser, HPLC, Ion Selective Electrode.">reagenser</span>
      i LIMS.
    `,
    logicLong:`
      Biokemilab bruger mange reagenser (fx til hormonanalyser, 
      <span class="hoverTooltip" data-tooltip="High-Performance Liquid Chromatography.">HPLC</span>, 
      <span class="hoverTooltip" data-tooltip="Ion Selective Electrode: måler Na+, K+ i blod.">ISE</span>, autoanalyser). 
      De vil have LIMS til at tracke reagensbeholdning og kvalitet (QC).
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:`
          Interview biokemikere om reagens-forbrug, QC-kontroller og 
          <span class="hoverTooltip" data-tooltip="TDM, hormoner, enzymer, elektrolytter.">analysetyper</span>.
        `,
        choiceA:{
          label:"Dybt interview",
          text:"+3 tid => +2 development (du opdager nye features).",
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
        stepDescription:`
          Kan leverandøren udvikle 
          <span class="hoverTooltip" data-tooltip="Automatisk reagens-lot track, QC, forbrugsalarmer.">reagens-modul</span> 
          til LIMS?
        `,
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
        stepDescription:`
          Reagens-rapport: 
          <span class="hoverTooltip" data-tooltip="Hvordan trackes lot-numre, QC checks, forbrug pr. dag.">modulbeskrivelse</span> 
          til CAB.
        `,
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
      Genetik vil have 
      <span class="hoverTooltip" data-tooltip="Samling af geninformationer (mutationer).">VariantDatabase</span>
      i LIMS.
    `,
    logicLong:`
      Klinisk Genetik sporer arvelige mutationer og vil integrere 
      <span class="hoverTooltip" data-tooltip="Fx HPC-løsning til BigData, AI til variantfortolkning.">større dataanalyse</span> 
      i LIMS. De har brug for HPC-kapacitet, replikering.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Koordiner med genetikere om store datasæt, HPC og AI-ønsker.",
        choiceA:{
          label:"Genetik-workshop",
          text:"+3 tid => +2 development",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Antag normal mængde",
          text:"+1 tid => +1 dev, +5% risk (du undervurderer data).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:`
          Databasekrav kan sprænge serverne. 
          Opsæt HPC og replikering for 
          <span class="hoverTooltip" data-tooltip="DNA-data, stor variation, BigData.">genvarianter</span>.
        `,
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
        stepDescription:"CAB kræver streng datasikkerhed for geninfo (GDPR).",
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
    title:"Nyt Mikrobiologi-Lab",
    shortDesc:`
      Mikrobiologien skal have 
      <span class="hoverTooltip" data-tooltip="PCR-hood, MALDI-TOF, BACTEC, dyrkninger.">udstyr</span>
      integreret i LIMS.
    `,
    logicLong:`
      Mikrobiologi-lab udfører 
      <span class="hoverTooltip" data-tooltip="Bakteriedyrkning, virusPCR, mykologi, resistens.">dybdegående analyser</span> 
      og vil have LIMS til MALDI-TOF, PCR-hood, BACTEC. 
      Desuden <span class="hoverTooltip" data-tooltip="Antibiogram-tests for resistens.">antibiogram</span> 
      skal logges i LIMS.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Tal med mikrobiologerne om analyser (PCR, mykologi, MALDI).",
        choiceA:{
          label:"Grundig behovsafdækning",
          text:"+3 tid => +2 development (du fanger alt).",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Hurtig samtale",
          text:"+1 tid => +1 dev, +5% risk (noget glemmes).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:`
          Integrér MALDI-TOF og 
          <span class="hoverTooltip" data-tooltip="PCR-hood, BACTEC.">mikrobiologiapparater</span> 
          med LIMS (dataoverførsel).
        `,
        choiceA:{
          label:"Opsæt dedikeret interface",
          text:"+2 tid, -120 kr => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Genbrug eksisterende interface",
          text:"+1 tid => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB vil se protokoller for dyrkning, PCR, MALDI.",
        choiceA:{
          label:"Omfattende dok",
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
  }

];
