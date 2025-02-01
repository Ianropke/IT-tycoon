// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [

  {
    title: "Immunologi – LIMS udvidelse",
    shortDesc: "Immunologiafdelingen ønsker bedre integration med stainers og flowcytometri.",
    logicLong: `
      Immunologiafdelingen udfører mange autoantistof-tests (ANA, ANCA) samt flowcytometri-analyser. De vil have data direkte ind i LIMS for at undgå manuelle fejl og spare tid.
    `,
    narrativeIntro: `
      I laboratoriet står en ny autoimmun stainer klar, men personalet mangler en fuld integration til LIMS. De håber, at en bedre integration kan lette den daglige drift.
    `,
    learningInfo: `
      Læringspunkt: En fuld integration mellem laboratorieudstyr og LIMS er afgørende for at sikre datakvalitet og effektivitet. Ved at automatisere dataoverførslen mindskes risikoen for menneskelige fejl. Vigtige termer: <span class="hoverTooltip" data-tooltip="LIMS: Laboratory Information Management System – et system til styring af laboratoriedata">LIMS</span> og <span class="hoverTooltip" data-tooltip="Flowcytometri: Teknologi til at analysere celler">flowcytometri</span>.
    `,
    knowledgeRecap: `
      Manglende integration kan føre til forkerte data og tidskrævende manuelle indtastninger. En solid integration øger kvaliteten og opfylder standarder som ISO 27799.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft behovet for integration med overlægen og laboratoriepersonalet.",
        choiceA: {
          label: "Grundig workshop",
          text: "+3 tid => +2 development (alle krav afdækkes).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid => +1 development, +5% risk (nogle krav overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for stabil dataoverførsel via en dedikeret server – evt. med HPC.",
        choiceA: {
          label: "Dedikeret server",
          text: "+2 tid, -100 kr => +2 stability (sikker datahåndtering).",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Genbrug eksisterende",
          text: "+1 tid => +5% risk (mulige kapacitetsproblemer).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér integrationsprocessen til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Patologi – digital patologi",
    shortDesc: "Patologien vil digitalisere vævssnit og bruge AI til hurtigere diagnose.",
    logicLong: `
      Afdelingen håndterer vævsprøver ved makroskopisk udskæring, embedding, mikrotom og autostainer. Målet er at digitalisere snittene og anvende AI til diagnostik, hvilket kræver stor serverkapacitet.
    `,
    narrativeIntro: `
      En ny skanner er installeret til digitalisering af histologiske snit, men systemet kæmper med at håndtere de store billedfiler.
    `,
    learningInfo: `
      Læringspunkt: Digitalisering af patologi kan fremskynde diagnoseprocessen og reducere manuel håndtering. Det er vigtigt, at de store billedfiler behandles effektivt for at sikre hurtige svar.
    `,
    knowledgeRecap: `
      Digital patologi reducerer fysisk slid og øger hastigheden, men kræver en robust infrastruktur for at undgå langsomme svartider.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Drøft workflow fra snit til scanning med patologerne.",
        choiceA: {
          label: "Udførlig flowgennemgang",
          text: "+3 tid => +2 stability (undgår flaskehalse).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort interview",
          text: "+1 tid, +5% risk (nogle trin overses).",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér storage og GPU for store billedfiler og AI-kapacitet.",
        choiceA: {
          label: "Køb HPC-løsning",
          text: "+2 tid, -150 kr => +2 development (systemet er AI-klar).",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 150, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende server",
          text: "+5% risk (mulig langsom scanning).",
          applyEffect: { riskyPlus: 0.05, synergyEffect: { lackInfra: true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér workflow og AI-validering til CAB.",
        choiceA: {
          label: "Fuld workflow-dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Ingen dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Klinikledelsen ønsker dashboards",
    shortDesc: "Direktionen vil have LIMS-dashboards til TAT og KPI.",
    logicLong: `
      Ledelsen mangler et overblik over prøveflow, turn-around times (TAT) og fejlprocenter. Dashboards skal hjælpe med at fordele ressourcer og reagere hurtigt.
    `,
    narrativeIntro: `
      På et møde efterlyser direktøren farverige grafer, men personalet er bekymrede for, at for meget dataeksponering kan stride mod GDPR.
    `,
    learningInfo: `
      Læringspunkt: Dashboards giver et hurtigt overblik over systemets ydeevne. Det er vigtigt at balancere information med databeskyttelse, så følsomme data ikke udleveres.
    `,
    knowledgeRecap: `
      Realtids-dashboards hjælper med at fange forsinkelser, men uden ordentlig dokumentation kan det være svært at håndtere databeskyttelse og vedligehold.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Definér de vigtigste KPI'er med ledelsen.",
        choiceA: {
          label: "Grundig workshop",
          text: "+3 tid => +2 development (de reelle behov afdækkes).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Prototype hurtigt",
          text: "+1 tid, +5% risk (vigtige krav overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sikre, at dashboards ikke viser persondata i strid med GDPR.",
        choiceA: {
          label: "Dyb juridisk gennemgang",
          text: "+2 tid, -50 kr => +1 security (mindre risiko).",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 50, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Overfladisk check",
          text: "Spar tid, +5% risk (vigtige data overses).",
          applyEffect: { statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér KPI-strukturen og GDPR-hensyn til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Multi-sprog i LIMS",
    shortDesc: "Flere udenlandske specialister efterspørger engelske og franske menuer.",
    logicLong: `
      Hospitalet har udenlandsk sundhedspersonale, som ikke forstår danske menuer. LIMS skal understøtte flere sprog med oversættelser og passende serveropsætning.
    `,
    narrativeIntro: `
      En fransk overlæge har svært ved at navigere i de danske menuer, hvilket fører til misforståelser.
    `,
    learningInfo: `
      Læringspunkt: Et flersproget LIMS reducerer fejl og øger effektiviteten. Det er vigtigt at sikre, at serveren håndterer unicode og sprogpakker korrekt.
    `,
    knowledgeRecap: `
      Flersproget support er afgørende for udenlandske medarbejdere. Uden korrekt opsætning kan der opstå problemer med tegnsætning og encoding.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificer de vigtigste sprog (fx engelsk og fransk) med personalet.",
        choiceA: {
          label: "Grundig sprogundersøgelse",
          text: "+3 tid => +2 development (kvalificerede valg).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Gæt ud fra personalelister",
          text: "+1 tid, +5% risk (vigtige sprog overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér serveren til at håndtere sprogpakker og unicode.",
        choiceA: {
          label: "Opgradér systemet",
          text: "+2 tid, -100 kr => +2 stability (klar til i18n).",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Behold eksisterende server",
          text: "+1 tid, +5% risk (oversættelser kan fejle).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér oversættelsesprocessen til CAB.",
        choiceA: {
          label: "Detaljeret plan",
          text: "+2 tid => ingen risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Weekendservernedluk",
    shortDesc: "Hospitalet vil lukke systemerne i en weekend for store opgraderinger.",
    logicLong: `
      For at undgå driftstop i hverdagen samler hospitalet opgraderinger og lukker systemerne i en weekend. Laboratorierne kører dog 24/7, så hasteprøver er en udfordring.
    `,
    narrativeIntro: `
      Det er fredag eftermiddag, og en plan om weekendnedlukning skaber blandede reaktioner: Nogle håber på ro, mens andre frygter kaos mandag morgen.
    `,
    learningInfo: `
      Læringspunkt: En planlagt nedlukning kan samle opgraderinger, men det er afgørende at kommunikere klart til personalet og have fallback-planer for kritiske processer.
    `,
    knowledgeRecap: `
      En velkoordineret nedlukning minimerer forstyrrelser, men kræver omhyggelig planlægning og dokumentation for at undgå langvarig nedetid.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Aftal med personalet, om LIMS kan undværes i 48 timer.",
        choiceA: {
          label: "Hold møder",
          text: "+3 tid => +2 stability (alle er forberedte).",
          recommended: true,
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
        stepDescription: "Udfør større opgraderinger i nedlukningsperioden.",
        choiceA: {
          label: "Omfattende pakke",
          text: "+3 tid, -150 kr => +2 stability, +1 development",
          recommended: true,
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
        stepDescription: "Dokumentér nedlukningsplanen med fallback til CAB.",
        choiceA: {
          label: "Grundig rapport",
          text: "+2 tid => ingen extra risk.",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Blodprøveautomatisering",
    shortDesc: "Automatisér håndtering af blodprøver med pipetteringsrobotter og autoanalyser.",
    logicLong: `
      Laboratoriet ønsker at fjerne manuelle pipetteringer og anvende robotter til at øge kvaliteten. LIMS skal styre stregkoder og batch, så alt kører gnidningsfrit.
    `,
    narrativeIntro: `
      Teknikerne gentager den samme procedure utallige gange. En robot kan lette det monotone arbejde, men systemet skal fungere fejlfrit.
    `,
    learningInfo: `
      Læringspunkt: Automatisering kan øge hastigheden og reducere fejl i blodprøvehåndtering. Det er vigtigt, at robotten integreres korrekt med LIMS, og at kvalitetssikring (QC) er en del af systemet.
    `,
    knowledgeRecap: `
      Automatisering øger effektiviteten, men uden en stabil infrastruktur eller tilstrækkelig dokumentation kan man risikere systemfejl.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Tal med laboratoriepersonalet om robotteknologi og QC.",
        choiceA: {
          label: "Dybt interview",
          text: "+3 tid => +2 stability (du forstår detaljerne).",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid, +5% risk (kritiske trin overses).",
          applyEffect: { timeCost: 1, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for et dedikeret netværk til robotter – evt. et sub-net.",
        choiceA: {
          label: "Robot-netværk",
          text: "+2 tid, -100 kr => +2 stability",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Brug eksisterende",
          text: "+1 tid, +5% risk (kapacitetsproblemer).",
          applyEffect: { timeCost: 1, synergyEffect: { lackInfra: true }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér robotintegrationen og QC-procedurer til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Biokemi – reagenshåndtering",
    shortDesc: "Biokemilab vil tracke reagenser i LIMS: lot-numre, QC og forbrug.",
    logicLong: `
      Biokemi benytter reagenser til mange analyser. De ønsker digital sporing af reagensforbrug og automatisk alarm, når lageret nærmer sig udtømning.
    `,
    narrativeIntro: `
      En bioanalytiker udtrykker frustration over at løbe tør for reagens midt i en kørsel. Personalet håber på et system, der automatisk kan spore og bestille nye reagenser.
    `,
    learningInfo: `
      Læringspunkt: Effektiv sporing af reagenser forhindrer forsinkelser og sikrer kontinuiteten i laboratorieprocesser. Digital sporing hjælper med at holde styr på forbruget og bestille nye reagenser til tiden.
    `,
    knowledgeRecap: `
      Et effektivt reagensmodul minimerer spild og sikrer sporbarhed. Uden ordentlig dokumentation ved ingen, hvordan systemet skal vedligeholdes på sigt.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Interview bioanalytikerne om deres behov og QC-tjek.",
        choiceA: {
          label: "Dybt interview",
          text: "+3 tid => +2 development",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "+1 tid, +5% risk (vigtige krav overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "leverandor",
        stepDescription: "Vurder om leverandøren kan udvikle et reagensmodul med automatiseret QC.",
        choiceA: {
          label: "Premium-løsning",
          text: "+2 tid, -120 kr => +2 stability",
          recommended: true,
          applyEffect: { timeCost: 2, moneyCost: 120, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Billigt plugin",
          text: "+1 tid, -50 kr => +1 development, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér reagenssporing og QC til CAB.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid => ingen risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Klinisk genetik – variantdatabase",
    shortDesc: "Genetik vil have en variantdatabase med HPC og replikering.",
    logicLong: `
      Afdelingen arbejder med genetiske prøver og ønsker at håndtere store datamængder med HPC og replikering. Sikkerhed og GDPR er afgørende.
    `,
    narrativeIntro: `
      Genetikerne modtager flere prøver dagligt og frygter, at en almindelig server ikke kan håndtere de store datasæt.
    `,
    learningInfo: `
      Læringspunkt: For at håndtere store genomiske data er det essentielt med HPC og replikering. Dette sikrer datasikkerhed og overholdelse af GDPR.
    `,
    knowledgeRecap: `
      Store datamængder kræver avancerede løsninger. Uden replikering risikerer man datatab, og dokumentationen er nødvendig for sporbarhed.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Koordiner med genetikere om HPC-behov og mulige AI-udvidelser.",
        choiceA: {
          label: "Genetik-workshop",
          text: "+3 tid => +2 development",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Antag lille datamængde",
          text: "+1 tid, +5% risk (behov undervurderes).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt HPC og replikering, så data ikke tabes ved nedbrud.",
        choiceA: {
          label: "Ny HPC-løsning",
          text: "+2 tid, -150 kr => +2 stability, +1 security",
          recommended: true,
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
        stepDescription: "Dokumentér datasikkerheden til CAB pga. GDPR.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 tid => +1 security",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  {
    title: "Nyt mikrobiologi-lab",
    shortDesc: "Mikrobiologi vil have MALDI-TOF og PCR-hood integreret i LIMS.",
    logicLong: `
      Laboratoriet dyrker bakterier og analyserer antibiotikaresistens. De ønsker en integreret løsning, der håndterer MALDI-TOF data og PCR-resultater effektivt.
    `,
    narrativeIntro: `
      Et nyt MALDI-TOF-apparat er ankommet, og lab-personalet er begejstrede for hurtige artsbestemmelser, men de oplever, at resultaterne ofte bliver forsinkede.
    `,
    learningInfo: `
      Læringspunkt: Integration af MALDI-TOF og PCR-data i LIMS fremskynder diagnostik og forbedrer datakvaliteten. Det er vigtigt, at data overføres direkte og uden fejl.
    `,
    knowledgeRecap: `
      En effektiv integration fremskynder diagnosesvar og mindsker fejl. Manglende dokumentation kan medføre manuelle løsninger og dataproblemer.
    `,
    steps: [
      {
        location: "hospital",
        stepDescription: "Tal med mikrobiologerne om integration af PCR og MALDI-TOF.",
        choiceA: {
          label: "Grundig behovsafdækning",
          text: "+3 tid => +2 development",
          recommended: true,
          applyEffect: { timeCost: 3, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort samtale",
          text: "+1 tid, +5% risk (vigtige krav overses).",
          applyEffect: { timeCost: 1, statChange: { development: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opsæt et dedikeret interface til MALDI-TOF og PCR-hood.",
        choiceA: {
          label: "Avanceret integration",
          text: "+2 tid, -120 kr => +2 stability",
          recommended: true,
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
        stepDescription: "Dokumentér integrationsprocessen til CAB.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "+5% risk (docSkipCount++).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }

];
