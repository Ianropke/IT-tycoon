// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [

  {
    title: "Immunologi – LIMS Udvidelse",
    shortDesc: "Immunologiafdelingen ønsker bedre integration med stainers og flowcytometri.",
    logicLong: `
      Immunologiafdelingen udfører mange autoantistof-tests (ANA, ANCA)
      samt flowcytometri-analyser. De vil have data direkte ind i LIMS
      for at undgå manuelle fejl og spare tid.
    `,
    narrativeIntro: `
      I laboratoriet står en ny autoimmun stainer klar, 
      men personalet mangler en fuld integration til LIMS. 
      De er spændte på, om det kan lette hverdagen markant.
    `,
    digDeeperLinks: [
      { label: "Autoimmun Stainer Indblik", url: "https://example.com/autoimmun-stainer-dk" },
      { label: "Flowcytometri: Grundprincipper", url: "https://example.com/flowcytometri-dk" }
    ],
    knowledgeRecap: `
      I virkeligheden kan manglende instrument-integration give forkerte 
      data i patientjournaler. En fuld integration sikrer kvalitet 
      og hurtigere svar til læger. Dokumentation er afgørende 
      for fremtidig fejlfinding og efterlevelse af ISO 27799.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft behov for instrumentintegration (stainer + flowcytometer) med overlægen.",
        choiceA: {
          label: "Grundig workshop",
          text: "+3 tid => +2 development (du opdager alle krav).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid => +1 development, +5% risk (noget glemmes).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for stabil dataoverførsel til LIMS. Kræver måske ekstra server eller HPC.",
        choiceA: {
          label: "Dedikeret server",
          text: "+2 tid, -100 kr => +2 stability (sikker datahåndtering).",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Genbrug eksisterende",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk (mulige kapacitetsproblemer).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér workflow for stainer/flow i LIMS til CAB.",
        choiceA: {
          label: "Fuld protokol",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Patologi – Digital Patologi",
    shortDesc: "Patologien vil scanne vævssnit og bruge AI til hurtigere diagnose.",
    logicLong: `
      Afdelingen håndterer vævsprøver ved makroskopisk udskæring, 
      embedding station, mikrotom og autostainer. De vil digitalisere 
      snittene og bruge AI til at støtte diagnostik. Det kræver 
      stor serverkapacitet.
    `,
    narrativeIntro: `
      En ny skanner står klar til at digitalisere histologiske snit. 
      Patologerne håber på fjernkonsultation og AI, men systemet 
      producerer enorme billedfiler.
    `,
    digDeeperLinks: [
      { label: "Digital Patologi i Danmark", url: "https://example.com/digital-patologi-dk" },
      { label: "AI i Histopatologi", url: "https://example.com/ai-histopatologi" }
    ],
    knowledgeRecap: `
      Digital patologi reducerer fysisk slide-håndtering 
      og muliggør hurtigere svar. Uden en god HPC- eller stor-lager-løsning 
      kan man dog få langsomme svartider og fald i kvalitet. 
      Husk at dokumentere for fremtidig fejlfinding og ISO 27001.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft med patologerne om workflow fra snit til scanning og AI-analyse.",
        choiceA: {
          label: "Udførlig flowgennemgang",
          text: "+3 tid => +2 stability (man undgår flaskehalse).",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort interview",
          text: "+1 tid => +1 stability, +5% risk (vigtige trin overses).",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér storage/GPU for de store scanningsfiler og AI-kapacitet.",
        choiceA: {
          label: "Køb HPC-løsning",
          text: "+2 tid, -150 kr => +2 development (AI-klar).",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende server",
          text: "+5% risk => synergyEffect: { lackInfra: true } (mulig langsom scanning).",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver beskrivelse af digital patologi-workflow og AI-validering.",
        choiceA: {
          label: "Fuld workflow-dok",
          text: "+2 tid => ingen risk.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Klinikledelsen ønsker Dashboards",
    shortDesc: "Direktionen vil have LIMS-dashboards til TAT og KPI.",
    logicLong: `
      Ledelsen mangler overblik over prøveflow, turn-around times (TAT) 
      og fejlprocenter. Med dashboards kan de fordele ressourcer og 
      reagere på flaskehalse i realtid.
    `,
    narrativeIntro: `
      På et møde efterlyser direktøren farverige grafer, 
      der viser spidsbelastninger. Personalet frygter dog 
      for meget data-eksponering, hvis GDPR ikke overholdes.
    `,
    digDeeperLinks: [
      { label: "HL7 & Dashboard-løsninger", url: "https://example.com/dash-hl7-dk" },
      { label: "TAT (Turn-Around Time)", url: "https://example.com/tat-forklaring" }
    ],
    knowledgeRecap: `
      Realtids-dashboards hjælper ledelsen med at fange forsinkelser. 
      Hvis man overser GDPR og viser for mange persondata, 
      kan det give klager og sanktioner fra Datatilsynet. 
      Husk dokumentation for at sikre gennemsigtighed.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Definér de vigtigste KPI'er (TAT, backlog, fejlrate) med ledelsen.",
        choiceA: {
          label: "Grundig workshop",
          text: "+3 tid => +2 development (du fanger de reelle behov).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Prototype hurtigt",
          text: "+1 tid => +1 development, +5% risk (mange krav overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek at dashboards ikke viser persondata i strid med GDPR.",
        choiceA: {
          label: "Dyb juridisk gennemgang",
          text: "+2 tid, -50 kr => +1 security (mindre risiko for databrud).",
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Spar tid => +1 development, +5% risk (datalæk mulig).",
          applyEffect: { statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér GDPR-hensyn og KPI-struktur til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk",
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
    shortDesc: "Flere udenlandske specialister efterspørger engelske og franske menuer.",
    logicLong: `
      Hospitalet har rekrutteret udenlandsk sundhedspersonale, 
      som ikke forstår danske menuer. 
      De vil gerne have LIMS på flere sprog, hvilket kræver 
      oversættelser og serveropsætning.
    `,
    narrativeIntro: `
      En fransk overlæge fumler rundt i danske menupunkter 
      og klager over misforståelser. Personale håber, 
      at et flersproget LIMS kan løfte effektiviteten.
    `,
    digDeeperLinks: [
      { label: "Sprogpakker & Server Encoding", url: "https://example.com/i18n-dk" },
      { label: "Eksempler på Multi-sprog", url: "https://example.com/multisprog-lims" }
    ],
    knowledgeRecap: `
      Flersproget LIMS mindsker fejl for udenlandske ansatte. 
      Men glemmer man serveropgradering, kan der opstå 
      tegnsætnings- eller encodingproblemer. 
      Dokumentation sikrer langsigtet vedligehold.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Find ud af hvilke sprog, der faktisk er vigtigst (engelsk, fransk osv.).",
        choiceA: {
          label: "Grundig sprogundersøgelse",
          text: "+3 tid => +2 development (kvalificerede valg).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Gæt ud fra personalelister",
          text: "+1 tid => +1 development, +5% risk (overser vigtige sprog).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Serveren skal kunne håndtere sprogpakker og unicode-tegn.",
        choiceA: {
          label: "Opgradér systemet",
          text: "+2 tid, -100 kr => +2 stability (klar til i18n).",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Behold eksisterende server",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk (fejl i oversættelser).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se en oversættelsesplan, inkl. vedligehold.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "WeekendServerNedluk",
    shortDesc: "Hospitalet vil lukke systemerne en weekend for store opgraderinger.",
    logicLong: `
      Ledelsen ønsker at undgå hverdagens driftstop 
      ved at samle opgraderinger i en weekend-lukning. 
      Men laboratorierne kører delvist 24/7 og er bekymrede 
      for hasteprøver.
    `,
    narrativeIntro: `
      Det er fredag eftermiddag, og en plan om weekend-lukning 
      ryster de ansatte. Nogle håber på ro, 
      andre frygter at møde kaos mandag morgen.
    `,
    digDeeperLinks: [
      { label: "IT Beredskabsplan Eksempel", url: "https://example.com/it-beredskabsplan-dk" },
      { label: "CAB Tjekliste for Nedlukning", url: "https://example.com/cab-check-dk" }
    ],
    knowledgeRecap: `
      Koordinering med afdelingerne sikrer minimal gene. 
      Uden plan og dokumentation 
      kan frustration og fejl opstå, 
      og opgraderingen kan ende i forlænget nedtid. 
      Husk fallback-planer (NIS2-krav).
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Aftal med personale, om LIMS kan undværes i 48 timer.",
        choiceA: {
          label: "Hold møder",
          text: "+3 tid => +2 stability (alle er forberedte).",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Tving planen igennem",
          text: "0 tid => -10 hospitalSatisfaction (vredt personale).",
          applyEffect: { statChange: { hospitalSatisfaction: -10 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Udfør store server- og netopgraderinger i lukketiden.",
        choiceA: {
          label: "Omfattende pakke",
          text: "+3 tid, -150 kr => +2 stability, +1 development",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2, development: 1 } }
        },
        choiceB: {
          label: "Kun kritiske fixes",
          text: "+1 tid, -50 kr => +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Lav weekend-rapport til CAB, inkl. fallbackplan ved fejl.",
        choiceA: {
          label: "Grundig rapport",
          text: "+2 tid => ingen extra risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "BlodprøveAutomatisering",
    shortDesc: "Automatisér blodprøvehåndtering via pipetteringsrobot og autoanalyser.",
    logicLong: `
      Laboratoriet vil fjerne manuelle pipetteringer 
      og bruge pipetteringsrobotter + autoanalyser for at øge kvaliteten. 
      LIMS skal styre stregkoder og batch, 
      så alt kører gnidningsfrit.
    `,
    narrativeIntro: `
      Teknikerne gentager den samme håndtering hundrede gange om dagen. 
      En robot kan lette monotont arbejde, 
      men opsætningen skal fungere i praksis.
    `,
    digDeeperLinks: [
      { label: "Robotter i Blodprøvelab", url: "https://example.com/lab-robot-dk" },
      { label: "Autoanalyser Forklaring", url: "https://example.com/autoanalysers-dk" }
    ],
    knowledgeRecap: `
      Automatisering kan øge hastighed og minimere fejl. 
      Men hvis infrastrukturen er svag, 
      eller dokumentation mangler, 
      risikerer man at stå uden support 
      når robotten pludselig går i fejl.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Tal med laboratoriepersonalet, som er spændte på robotter.",
        choiceA: {
          label: "Dybt interview",
          text: "+3 tid => +2 stability (du forstår detaljerne).",
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid => +1 stability, +5% risk (kan overse kritiske trin).",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Robotter kræver net- og kapacitetscheck. Evt. dedikeret sub-net.",
        choiceA: {
          label: "Robot-netværk",
          text: "+2 tid, -100 kr => +2 stability",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Skriv automationsrapport til CAB med QC og fallback.",
        choiceA: {
          label: "Detaljeret",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Spring doc over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Biokemi – ReagensHåndtering",
    shortDesc: "Biokemilab vil tracke reagenser i LIMS: lot-numre, QC og forbrug.",
    logicLong: `
      Biokemi benytter reagenser til mange analyser (HPLC, Ion Selective, 
      enzymer). De ønsker digital sporing af reagens-forbrug 
      og automatisk alarm, når noget er ved at løbe tør.
    `,
    narrativeIntro: `
      En bioanalytiker bander over at have løbet tør for reagens 
      midt i en kørsel. De drømmer om en LIMS-løsning, 
      der holder styr på lager og QC-resultater.
    `,
    digDeeperLinks: [
      { label: "QC i Biokemi", url: "https://example.com/qc-biokemi-dk" },
      { label: "Reagenslot & LIMS", url: "https://example.com/reagens-lot-dk" }
    ],
    knowledgeRecap: `
      Et effektivt reagens-modul hindrer spild, 
      sikrer kvalitet og sporbarhed (ISO 27799). 
      Uden dokumentation ved ingen præcis, hvordan systemet 
      skal vedligeholdes på sigt.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Interview bioanalytikerne om reagens-behov, QC-tjek og lagerstyring.",
        choiceA: {
          label: "Dybt interview",
          text: "+3 tid => +2 development",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Lille notits",
          text: "+1 tid => +1 development, +5% risk (kan mangle vigtige ønsker).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Kan leverandøren udvikle et reagens-modul med automatisk QC?",
        choiceA: {
          label: "Premium-løsning",
          text: "+2 tid, -120 kr => +2 stability",
          applyEffect: { timeCost: 2, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Billig plugin",
          text: "+1 tid, -50 kr => +1 development, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Reagensrapport til CAB: sporing af lot-numre og QC-resultater.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Klinisk Genetik – VariantDatabase",
    shortDesc: "Genetik vil have en VariantDatabase med HPC og replikering.",
    logicLong: `
      Afdelingen arbejder med genetiske prøver og ønsker 
      at kunne håndtere store datamængder i en database 
      med HPC og replikering. Sikkerhed og GDPR er kritisk.
    `,
    narrativeIntro: `
      Genetikerne får flere og flere prøver hver dag. 
      De frygter, at en almindelig server 
      ikke kan håndtere de store datasets. HPC og 
      replikering kan give robusthed, men kræver en plan.
    `,
    digDeeperLinks: [
      { label: "HPC til Genetik", url: "https://example.com/hpc-genetik-dk" },
      { label: "Replikering & GDPR", url: "https://example.com/repl-gdpr-dk" }
    ],
    knowledgeRecap: `
      Store genomiske datamængder kræver HPC eller GPU-løsninger. 
      Uden replikering kan vitale gen-data tabes ved fejl, 
      hvilket strider mod GDPR om datasikkerhed. 
      Dokumentation sikrer sporbarhed og compliance.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Koordiner med genetikere om HPC-behov og mulig AI-udvidelse fremover.",
        choiceA: {
          label: "Genetik-workshop",
          text: "+3 tid => +2 development (du forstår big data krav).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Antag lille datamængde",
          text: "+1 tid => +1 development, +5% risk (undervurderer behov).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt HPC + replikering, så data ikke tabes ved nedbrud.",
        choiceA: {
          label: "Ny HPC-løsning",
          text: "+2 tid, -150 kr => +2 stability, +1 security",
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { stability: 2, security: 1 } }
        },
        choiceB: {
          label: "Behold eksisterende disk",
          text: "+5% risk => synergyEffect: { lackInfra: true } (mulig flaskehals).",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB kræver streng datasikkerhed pga. GDPR.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid => +1 security",
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
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
    title: "Nyt Mikrobiologi-Lab",
    shortDesc: "Mikrobiologi vil have MALDI-TOF og PCR-hood integreret i LIMS.",
    logicLong: `
      Mikrobiologi-lab dyrker bakterier, analyserer antibiotikaresistens 
      og bruger MALDI-TOF til hurtig ID. De vil have LIMS-integration 
      til at håndtere store datakørsler effektivt.
    `,
    narrativeIntro: `
      Et nyt MALDI-TOF-apparat er ankommet, 
      og lab-personalet jubler over hurtige artsbestemmelser. 
      Men uden LIMS-interface kan resultater blive forsinkede 
      eller fejlindtastede.
    `,
    digDeeperLinks: [
      { label: "MALDI-TOF i Mikrobiologi", url: "https://example.com/maldi-tof-dk" },
      { label: "PCR-hood & Resistens", url: "https://example.com/pcr-hood-dk" }
    ],
    knowledgeRecap: `
      Integration af MALDI-TOF og PCR-data i LIMS 
      fremskynder diagnosesvar. Hvis man overser infrastruktur 
      eller dokumentation, risikerer man manuelle lappeløsninger 
      og fejl i resistensdata.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Tal med mikrobiologerne om PCR, MALDI og resistensprocedurer.",
        choiceA: {
          label: "Grundig behovsafdækning",
          text: "+3 tid => +2 development (alle analyser dækkes).",
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Hurtig samtale",
          text: "+1 tid => +1 development, +5% risk (nogle krav glemmes).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt dedikeret interface til MALDI-TOF og PCR-hood, så data flyder direkte i LIMS.",
        choiceA: {
          label: "Avanceret integration",
          text: "+2 tid, -120 kr => +2 stability",
          applyEffect: { timeCost: 2, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Genbrug gammel interface",
          text: "+1 tid => synergyEffect: { lackInfra: true }, +5% risk",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "CAB vil se protokoller for dyrkning, PCR, MALDI-logging.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
