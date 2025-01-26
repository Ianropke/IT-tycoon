// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [

  {
    title: "Immunologi-LIMS Udvidelse",
    shortDesc: `
      Immunology wants extended LIMS integration 
      with autoimmun stainer & flow cytometry data.
    `,
    logicLong: `
      The immunology lab handles autoantibody tests (ANA, ANCA) 
      and uses flow cytometers. They want direct data capture 
      in LIMS to reduce manual entry and errors.
    `,
    narrativeIntro: `
      "Immunology staff are excited about the new stainer 
       that automates certain assays. They worry about 
       integration issues with older LIMS modules, 
       but trust you'll handle it."
    `,
    digDeeperLinks: [
      { label: "Autoimmun Stainer Info", url: "https://example.com/autoimmune-stainer" },
      { label: "Flow Cytometry Basics", url: "https://example.com/flow-cytometry" }
    ],
    knowledgeRecap: `
      In real immunology labs, failing to integrate instruments 
      can cause data transcription errors. 
      Proper interface setup ensures reliability, speeds up results, 
      and reduces staff workload significantly.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Discuss staff's demands for full instrument integration 
          (flow data, autoimmun stainer logs).
        `,
        choiceA:{
          label: "Detailed workshop",
          text: "+3 time => +2 development. 
                 You identify all needed instrument interfaces.",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label: "Brief conversation",
          text: "+1 time => +1 dev, +5% risk (some requirements missed).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Ensure stable data transfer from stainer & flow cytometer 
          to LIMS. Could require new server resources.
        `,
        choiceA:{
          label: "Dedicated integration server",
          text: "+2 time, -100 money => +2 stability 
                 (reliable data capture).",
          applyEffect:{ timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB:{
          label: "Reuse existing infra",
          text: "+1 time => synergyEffect:{ lackInfra:true }, +5% risk.",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Document new immunology workflows for CAB, 
          including reference to autoantibody panels.
        `,
        choiceA:{
          label: "Full protocol doc",
          text: "+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Patologi – Digital Pathology",
    shortDesc: `
      Pathology wants to implement digital scanning 
      & AI analysis of histology slides.
    `,
    logicLong: `
      The pathology lab handles tissue samples via 
      macroscopic grossing, embedding, microtomy, and stainers. 
      They want to scan slides and use AI for faster reads.
    `,
    narrativeIntro: `
      "Pathologists are anxious to reduce physical slide handling 
       and dream of remote consultations with specialists. 
       But the new digital scanners produce large image files 
       that need HPC or robust storage."
    `,
    digDeeperLinks: [
      { label: "Digital Pathology Primer", url: "https://example.com/digital-pathology" },
      { label: "AI in Histology", url: "https://example.com/ai-histology" }
    ],
    knowledgeRecap: `
      Many modern pathology labs transition to digital scanning. 
      If you skip HPC or large storage, performance can degrade, 
      and pathologists might revert to physical slides, 
      losing the AI benefits.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Talk with pathology about end-to-end digitization 
          from grossing to scanning.
        `,
        choiceA:{
          label: "Detailed flow analysis",
          text: "+3 time => +2 stability 
                 (identifying potential bottlenecks).",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label: "Quick interview",
          text: "+1 time => +1 stability, +5% risk (some steps overlooked).",
          applyEffect:{ timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Plan HPC or robust storage for large scanned images 
          and potential AI inference.
        `,
        choiceA:{
          label: "Buy GPU server & big disk",
          text: "+2 time, -150 money => +2 development (AI ready).",
          applyEffect:{ timeCost:2, moneyCost:150, statChange:{ development:2 } }
        },
        choiceB:{
          label: "Stick to existing CPU & disk",
          text: "+5% risk => synergyEffect:{ lackInfra:true } 
                 (slow AI).",
          applyEffect:{ riskyPlus:0.05, synergyEffect:{ lackInfra:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB requires 
          workflow documentation for digital pathology & 
          how AI results are validated.
        `,
        choiceA:{
          label: "Comprehensive doc",
          text: "+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label: "Skip doc",
          text: "+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Dashboards for Clinic Leadership",
    shortDesc: `
      Hospital directors want user-friendly 
      LIMS dashboards to track TAT & KPI.
    `,
    logicLong: `
      They lack real-time stats on test volumes, 
      turn-around times (TAT), and sample backlog. 
      LIMS-based dashboards can help them allocate resources quickly.
    `,
    narrativeIntro: `
      "A group of directors is eager to see colorful graphs 
       that highlight any testing delays. 
       They also want automatic weekly reports 
       emailed to department heads."
    `,
    digDeeperLinks: [
      { label: "HL7 & Dashboarding", url: "https://example.com/hl7-dash" },
      { label: "TAT (Turn-Around Time) Concepts", url: "https://example.com/tat-concepts" }
    ],
    knowledgeRecap: `
      Providing real-time dashboards helps management address 
      bottlenecks. But if you ignore GDPR or show personal data 
      in broad dashboards, compliance issues can occur. 
      Always confirm the minimal data principle.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: `
          Work with leadership to define dashboard metrics 
          (TAT, sample flow, error rates).
        `,
        choiceA:{
          label: "Full workshop",
          text: "+3 time => +2 development 
                 (you find what truly matters).",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label: "Prototype quickly",
          text: "+1 time => +1 dev, +5% risk 
                 (some leadership demands missed).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Ensure dashboards comply with 
          GDPR minimal data approach. 
          Possibly do a small DPIA.
        `,
        choiceA:{
          label: "DPIA & thorough check",
          text: "+2 time, -50 money => +1 security.",
          applyEffect:{ timeCost:2, moneyCost:50, statChange:{ security:1 } }
        },
        choiceB:{
          label: "Minimal check",
          text: "Saves time => +1 dev, +5% risk 
                 (possible data overexposure).",
          applyEffect:{ statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Document the new dashboard approach 
          (metrics, privacy, disclaimers) for CAB.
        `,
        choiceA:{
          label: "Full doc",
          text: "+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label: "Skip doc",
          text: "+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Multi-Language LIMS",
    shortDesc: `
      International staff wants LIMS in multiple languages (English, French…).
    `,
    logicLong: `
      The hospital hires many foreign specialists. 
      They want language pack expansions for menus, 
      instrument data fields, and PDF reports.
    `,
    narrativeIntro: `
      "You see confusion as some doctors guess at Danish menu labels. 
       A multi-lingual solution might reduce errors 
       and frustration but requires thorough translation."
    `,
    digDeeperLinks: [
      { label: "ISO 27799 & Language Issues", url: "https://example.com/iso-27799-lang" }
    ],
    knowledgeRecap: `
      Providing multi-language support helps staff 
      avoid misunderstandings in critical lab results. 
      But skipping server upgrades can cause partial translations 
      or encoding issues, leading to confusion.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Identify top-needed languages (English, French, etc.).",
        choiceA:{
          label: "Detailed survey",
          text: "+3 time => +2 development 
                 (you map real staff language needs).",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label: "Guess based on memory",
          text: "+1 time => +1 dev, +5% risk 
                 (some needed languages missed).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Ensure server handles multiple 
          <span class="hoverTooltip" data-tooltip="UTF-8, resource files.">language packs</span>.
        `,
        choiceA:{
          label: "Upgrade system",
          text: "+2 time, -100 money => +2 stability (multi-locale ready).",
          applyEffect:{ timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB:{
          label: "Keep existing setup",
          text: "+1 time => synergyEffect:{ lackInfra:true }, +5% risk (partial translations break).",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB needs a plan for multi-lingual LIMS maintenance.",
        choiceA:{
          label: "Detailed translation plan",
          text: "+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label: "Minimal doc",
          text: "+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"WeekendServerNedluk",
    shortDesc:"Hospital wants to shut down systems over a weekend for major upgrades.",
    logicLong:`
      Management aims to avoid weekday disruptions by using weekend downtime, 
      but labs (patologi, mikrobiologi) run tests 24/7. 
      They worry about time-critical samples.
    `,
    narrativeIntro:`
      "It's Friday afternoon. Some staff fear losing half their weekend 
       if the upgrade goes awry. Others hope Monday won't bring chaos."
    `,
    digDeeperLinks:[
      { label:"IT Beredskabsplan Sample", url:"https://example.com/it-beredskabsplan" }
    ],
    knowledgeRecap:`
      Coordinating a planned downtime can ensure minimal impact, 
      but if the plan is forced on staff last minute, 
      morale and trust suffer. 
      Thorough doc helps everyone prepare for possible rollback.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Check if labs can manage without LIMS for 48 hours.",
        choiceA:{
          label:"Hold staff meetings",
          text:"+3 time => +2 stability (everyone on same page).",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Force the plan",
          text:"0 time => -10 hospitalSatisfaction, staff is upset.",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 } }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Perform big infra upgrades during weekend-lukketid.",
        choiceA:{
          label:"Large upgrade package",
          text:"+3 time, -150 money => +2 stability, +1 development",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2, development:1 } }
        },
        choiceB:{
          label:"Only critical fixes",
          text:"+1 time, -50 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Create a weekend-upgrade report for CAB, referencing fallback approach.",
        choiceA:{
          label:"Thorough report",
          text:"+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal note",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"BlodprøveAutomatisering",
    shortDesc:"Automate blood sample handling with robots & autoanalyzers.",
    logicLong:`
      The lab wants to reduce manual pipetting and rely on 
      pipetteringsrobot & autoanalyzers. 
      LIMS must manage barcodes, batch, result retrieval.
    `,
    narrativeIntro:`
      "You see staff constantly labeling tubes by hand, 
       risking repetitive strain injuries. 
       A new robot could revolutionize throughput, 
       but only if LIMS is set up properly."
    `,
    digDeeperLinks:[
      { label:"Robot Implementation in Lab", url:"https://example.com/lab-robot" },
      { label:"Autoanalyzers 101", url:"https://example.com/autoanalyzers" }
    ],
    knowledgeRecap:`
      Lab automation can drastically improve efficiency 
      and reduce human error. 
      But ignoring infrastructure or skipping doc can lead 
      to partial integrations that still require manual backups.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Discuss with lab staff who want max automation for sample handling.",
        choiceA:{
          label:"Thorough interviews",
          text:"+3 time => +2 stability (understand real workflow).",
          applyEffect:{ timeCost:3, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Short talk",
          text:"+1 time => +1 stability, +5% risk (some details missed).",
          applyEffect:{ timeCost:1, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Robots need new net or dedicated sub-lan, or might overload existing traffic.",
        choiceA:{
          label:"Dedicated robot net",
          text:"+2 time, -100 money => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:100, statChange:{ stability:2} }
        },
        choiceB:{
          label:"Reuse existing cables",
          text:"+1 time => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true}, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Write an automation report for CAB, covering robot-flow & QC.",
        choiceA:{
          label:"Detailed doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Skip doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"Biokemi – ReagensHåndtering",
    shortDesc:"Biochemistry wants reagens-lot tracking in LIMS (QC checks).",
    logicLong:`
      The lab uses many reagents for HPLC, Ion Selective Electrodes, etc. 
      They need LIMS to track lot usage and trigger reorder 
      before critical items run out.
    `,
    narrativeIntro:`
      "Lab staff scramble to find a missing reagens bottle 
       labeled incorrectly last week. 
       They beg for a digital system that ensures 
       every reagens is tracked meticulously."
    `,
    digDeeperLinks:[
      { label:"HPLC Basics", url:"https://example.com/hplc-intro" },
      { label:"QC in Biochemistry", url:"https://example.com/qc-biochem" }
    ],
    knowledgeRecap:`
      Proper reagens tracking prevents costly test repeats or false results. 
      LIMS-based reordering can avoid downtime. 
      Thorough doc is key for ISO 27799 compliance.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Interview biochemists about reagens usage, QC & reorder thresholds.",
        choiceA:{
          label:"Deep interview",
          text:"+3 time => +2 development",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Quick notes",
          text:"+1 time => +1 dev, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"leverandor",
        stepDescription:"See if vendor can develop reagens-tracking module for LIMS.",
        choiceA:{
          label:"Premium solution",
          text:"+2 time, -120 money => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Cheaper plugin",
          text:"+1 time, -50 money => +1 development, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Reagens-lot doc for CAB, detailing QC & usage logs.",
        choiceA:{
          label:"Thorough doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"Klinisk Genetik – VariantDatabase",
    shortDesc:"Genetics dept. wants a big variant database with HPC, replikering.",
    logicLong:`
      They handle gene variant analysis, 
      want HPC for large dataset processing 
      and ensure data is secure (GDPR) 
      with replikering for fail-safety.
    `,
    narrativeIntro:`
      "A wave of new patient samples hits the genetics lab. 
       They fret about HPC capacity. 
       'We cannot do partial analysis, 
        or we might miss a crucial mutation,' they say."
    `,
    digDeeperLinks:[
      { label:"HPC for Genomics", url:"https://example.com/hpc-genomics" },
      { label:"Replikering & GDPR", url:"https://example.com/repl-gdpr" }
    ],
    knowledgeRecap:`
      Genetic labs generate huge data. 
      HPC or GPU-based solutions help speed up variant calls. 
      Skipping HPC or replikering can hamper efficiency 
      and risk data loss for critical patient results.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Coordinate with genetics about HPC & big data needs, mention possible AI expansions.",
        choiceA:{
          label:"Genetics workshop",
          text:"+3 time => +2 development",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Assume normal data",
          text:"+1 time => +1 dev, +5% risk (underestimate data).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Database could exceed existing server capacity. 
                         HPC & replikering required for stable ops.",
        choiceA:{
          label:"Buy HPC solution",
          text:"+2 time, -150 money => +2 stability, +1 security",
          applyEffect:{ timeCost:2, moneyCost:150, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Use existing disk",
          text:"+5% risk => synergyEffect:{lackInfra:true}",
          applyEffect:{ riskyPlus:0.05, synergyEffect:{lackInfra:true} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB demands strict data security doc, referencing GDPR & HPC usage.",
        choiceA:{
          label:"Comprehensive doc",
          text:"+2 time => +1 security",
          applyEffect:{ timeCost:2, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Partial doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title:"New Mikrobiologi Lab",
    shortDesc:"Microbiology wants MALDI-TOF, PCR integration, track antibioticresistens.",
    logicLong:`
      The mikrobiologi lab does PCR, MALDI-TOF for ID, BACTEC for 
      blood cultures, antibioticresistens. LIMS integration is essential 
      to keep track of runs & results quickly.
    `,
    narrativeIntro:`
      "An antibioticresistens outbreak is being monitored. 
       They must process dozens of samples daily, 
       so manual data entry won't scale."
    `,
    digDeeperLinks:[
      { label:"MALDI-TOF Basics", url:"https://example.com/maldi-tof" },
      { label:"Antibioticresistens Data", url:"https://example.com/ab-resist" }
    ],
    knowledgeRecap:`
      In many microbiology labs, MALDI-TOF 
      drastically speeds up organism ID. 
      If you fail to integrate with LIMS, 
      staff might do repeated or manual steps, risking delayed diagnoses.
    `,
    steps:[
      {
        location:"hospital",
        stepDescription:"Discuss with mikrobiologi staff about large runs (PCR-hood, MALDI-TOF, BACTEC).",
        choiceA:{
          label:"Full needs analysis",
          text:"+3 time => +2 development (capture all device data).",
          applyEffect:{ timeCost:3, statChange:{ development:2 } }
        },
        choiceB:{
          label:"Quick conversation",
          text:"+1 time => +1 dev, +5% risk (some lab requirements missed).",
          applyEffect:{ timeCost:1, statChange:{ development:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Integrate MALDI & PCR devices with LIMS for direct data feed.",
        choiceA:{
          label:"Dedicated interface solution",
          text:"+2 time, -120 money => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Reuse old interface",
          text:"+1 time => synergyEffect:{ lackInfra:true }, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants protocols for PCR, MALDI, antibioticresistens logging.",
        choiceA:{
          label:"Full doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05 }
        }
      }
    ]
  }

];
