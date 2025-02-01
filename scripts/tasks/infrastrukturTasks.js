// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    title: "Serverpark genopgradering",
    shortDesc: "Modernisér serverparken med HPC og failover.",
    logicLong: "Opgrader de gamle servere med HPC for tunge beregninger og implementer failover for at sikre driften.",
    narrativeIntro: "I datacentret er serverne gamle og ustabile, og personalet er bekymrede for driftsnedbrud.",
    learningInfo: "Læringspunkt: HPC og failover øger systemets robusthed. En detaljeret kapacitetsanalyse er nødvendig for at planlægge opgraderingen.",
    knowledgeRecap: "En opgradering af serverparken reducerer nedbrud og sikrer en stabil drift.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret kapacitetsanalyse af serverparken.",
        choiceA: {
          label: "Dybt tjek",
          text: "+3 tid, -150 kr, +2 stability",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 tid, -50 kr, +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med IT- og driftsafdelingen om opgraderingsplanen.",
        choiceA: {
          label: "Planlagt nedetid",
          text: "+2 tid, +2 hospitalSatisfaction",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "0 tid, -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Netværksmodernisering i laboratoriet",
    shortDesc: "Opgrader DNS og AD for hurtig og stabil login.",
    logicLong: "Forældede netværkskomponenter forårsager ustabile logins. En opgradering af DNS og AD er nødvendig for en pålidelig drift.",
    narrativeIntro: "En bioanalytiker klager over, at forbindelsen til AD ofte afbrydes, og DNS-fejl gør logins langsomme.",
    learningInfo: "Læringspunkt: Korrekt opsætning af <span class='hoverTooltip' data-tooltip='DNS: Domænenavnsoversætter'>DNS</span> og <span class='hoverTooltip' data-tooltip='AD: Active Directory til netværksstyring'>AD</span> sikrer en stabil netværksforbindelse.",
    knowledgeRecap: "Et robust netværk med korrekt konfigurerede DNS- og AD-systemer sikrer hurtige logins og minimal nedetid.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Udfør en detaljeret analyse af netværksudstyret og konfigurationen.",
        choiceA: {
          label: "Grundig netanalyse",
          text: "+3 tid, -150 kr, +3 stability",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Overfladisk kontrol",
          text: "+1 tid, -50 kr, +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med laboratorieledelsen om nedetid under opgraderingen.",
        choiceA: {
          label: "Planlagt nedetid",
          text: "+2 tid, +2 hospitalSatisfaction",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Ingen varsel",
          text: "0 tid, -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport over netopgraderingen til CAB.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Kort rapport",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },
  {
    title: "Datacenter opgradering",
    shortDesc: "Opgrader køling, racks og strømforsyning for bedre drift.",
    logicLong: "Datacenterets nuværende anlæg er forældet og ineffektivt. Moderne kølesystemer og nye racks er nødvendige for at undgå overophedning og nedbrud.",
    narrativeIntro: "Ved ankomsten mærker du varmen og ser slidte serverracks – personalet frygter, at systemet vil bryde sammen under belastning.",
    learningInfo: "Læringspunkt: En opgradering af datacenteret med moderne kølesystemer og hardware reducerer nedetid og øger driftssikkerheden.",
    knowledgeRecap: "Opgradering af datacenteret sikrer stabil drift og reducerer risikoen for overophedning.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret analyse af datacenterets kapacitet og kølesystem.",
        choiceA: {
          label: "Omfattende analyse",
          text: "+3 tid, -150 kr, +2 stability",
          recommended: true,
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 tid, -50 kr, +1 stability, +5% risk",
          applyEffect: { timeCost: 1, moneyCost: 50, statChange: { stability: 1 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med driftsafdelingen for at planlægge opgraderingen uden nedetid.",
        choiceA: {
          label: "Planlagt opgradering",
          text: "+2 tid, +2 hospitalSatisfaction",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Uplanlagt opgradering",
          text: "0 tid, -10 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en detaljeret opgraderingsrapport til CAB.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid, ingen ekstra risk",
          recommended: true,
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  }
];
