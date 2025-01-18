// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    category: "cybersikkerhed",
    title: "NetværksPenTest (ekstern firma)",
    shortDesc: "Hyre eksterne specialister til penTest.",
    logicLong: "Først Cybersikkerhed, dernæst IT Jura, osv. ...",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Planlæg penTest (detaljeret vs. standard).",
        choiceA: {
          label: "Detaljeret kravspec",
          text: "Bruger mere tid, men sikrere",
          applyEffect: { timeCost:2, moneyCost:50, riskyPlus:0 }
        },
        choiceB: {
          label: "Hurtig penTest",
          text: "+5% rest-risiko",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      // ... step 2, 3, 4 ...
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Opdatering af Firewall-regler",
    shortDesc: "Revidér firewall og netsegmentering.",
    logicLong: "Først Inf.sikkerhed, dernæst Cybersikkerhed, så Hospital, slut Dok...",
    steps: [
      // 4 steps ...
    ]
  },
  // ... i alt 10 opgaver ...
];
