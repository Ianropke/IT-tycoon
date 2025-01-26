// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [

  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: `
      Install IDS/IPS for better detection 
      & meet NIS2 requirements.
    `,
    logicLong: `
      Attacks on the hospital network are rising. 
      You want an IDS/IPS system for real-time intrusion detection 
      and compliance with NIS2 in healthcare.
    `,
    narrativeIntro: `
      "Rumors swirl about an attempted hack 
       on a nearby hospital's unprotected network. 
       Staff hope you can secure ours before it’s too late."
    `,
    digDeeperLinks: [
      { label: "NIS2 Directive Overview", url: "https://example.com/nis2" },
      { label: "ISO 27001 & IDS", url: "https://example.com/iso27001-ids" }
    ],
    knowledgeRecap: `
      IDS/IPS helps detect malicious traffic early. 
      In a real hospital, ignoring such tools 
      can lead to silent data breaches 
      that compromise patient info and violate NIS2/GDPR.
    `,
    steps: [
      // (Same steps as the previous final version posted)
      {
        location: "cybersikkerhed",
        stepDescription: `
          Identify the most exposed segments. 
          Consider an ISMS-based risk approach.
        `,
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 time, -80 money => +2 security (find more holes).",
          applyEffect: { timeCost:3, moneyCost:80, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 time, -30 money => +1 security, +5% risk (miss some).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Integrate IDS/IPS with minimal downtime 
          & consider a robust IT beredskabsplan.
        `,
        choiceA: {
          label: "Grundig test",
          text: "+2 time, -100 money => +2 stability",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Lynopsætning",
          text: "+1 time, -50 money => +1 stability, +5% risk",
          applyEffect: { timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Document IDS/IPS for CAB, referencing GDPR Art.32 & NIS2 compliance.",
        choiceA: {
          label: "Full doc",
          text: "+2 time => no extra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal doc",
          text: "0 time => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  {
    title: "Phishing- & Ransomware-Forsvar",
    shortDesc: `
      Train staff to spot phishing, 
      and protect against ransomware (GDPR compliance).
    `,
    logicLong: `
      Cybercriminals often use phishing and ransomware 
      to target hospitals. 
      You plan a thorough staff training 
      and EDR rollout to reduce risk.
    `,
    narrativeIntro: `
      "A wave of suspicious emails hits the mail server. 
       Some staff have clicked them. 
       Could a full-blown ransomware strike be next?"
    `,
    digDeeperLinks: [
      { label: "GDPR Art.32 & Ransomware", url: "https://example.com/gdpr32-ransom" },
      { label: "EDR Explainer", url: "https://example.com/edr-guide" }
    ],
    knowledgeRecap: `
      Proper staff awareness plus an EDR solution 
      drastically lowers the chance that ransomware 
      cripples the hospital. 
      Overlooking doc or skipping training 
      can lead to chaos if an outbreak occurs.
    `,
    steps: [
      // same steps as previous final version
      {
        location: "cybersikkerhed",
        stepDescription: "Plan phishing-campaign & EDR rollout to contain ransomware.",
        choiceA: {
          label: "Omfattende campaign",
          text: "+3 time, -80 money => +2 security",
          applyEffect: { timeCost:3, moneyCost:80, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Limited campaign",
          text: "+1 time, -20 money => +1 security, +5% risk",
          applyEffect: { timeCost:1, moneyCost:20, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: "Hold courses or brief staff about phishing, EDR usage.",
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 time => +2 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 time => +1 hospitalSatisfaction, +5% risk",
          applyEffect: { statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Document anti-ransomware procedures for CAB.",
        choiceA: {
          label: "Udførlig doc",
          text: "+2 time => +1 security",
          applyEffect: { timeCost:2, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Minimal doc",
          text: "0 time => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 3) Zero Trust, ...
  // 4) Firewall-opgradering, ...
  // 5) Dataovervågning & Log-analyse (SIEM), ...
  // 6) Penetrationstest, ...
  // 7) MFA, ...
  // 8) Monitoring & Alerting, ...
  // 9) Cloud-Sårbarhedsscanning, ...
  // 10) Adgangsstyring for eksterne

  // The rest tasks are the same as your final expanded version, but we add:
  // narrativeIntro, digDeeperLinks, knowledgeRecap in each

  {
    title: "Zero Trust-Strategi",
    shortDesc: `Enforce Zero Trust with net segmentation, mindful of NIS2/GDPR.`,
    logicLong: `
      Zero Trust means no implicit trust, 
      everything must be verified. 
      Staff might whine about extra steps 
      but it drastically improves security compliance.
    `,
    narrativeIntro: `
      "Some staff find repeated MFA steps irritating. 
       'We are doctors, not IT geeks,' 
       one says. 
       But a recent breach attempt underscores 
       the need for thorough checks."
    `,
    digDeeperLinks: [
      { label: "Zero Trust Explainer", url: "https://example.com/zero-trust" },
      { label: "GDPR & Security by Design", url: "https://example.com/gdpr-sec-design" }
    ],
    knowledgeRecap: `
      Zero Trust with network segmentation 
      stops threats from spreading. 
      Skipping doc can hamper your ability 
      to demonstrate compliance to NIS2 or ISO 27001 audits.
    `,
    steps: [/* same steps as previous final version #3 */ 
      {
        location:"cybersikkerhed",
        stepDescription:"Implement least privilege, net segmentation, advanced policy.",
        choiceA:{
          label:"Omfattende policy",
          text:"+3 time => +2 security",
          applyEffect:{ timeCost:3, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Minimal policy",
          text:"+1 time => +1 security, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Staff complains about extra login steps. Communication is key.",
        choiceA:{
          label:"Info meetings",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Ignore them",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants Zero Trust design doc referencing NIS2 compliance.",
        choiceA:{
          label:"Full doc",
          text:"+2 time => no extra risk",
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

  // 4) firewall-opgradering
  {
    title: "Firewall-opgradering",
    shortDesc: `Replace old firewall with next-gen, plan for high availability (NIS2).`,
    logicLong: `
      The hospital firewall is outdated. 
      A next-gen firewall with deep packet inspection 
      aligns with NIS2 robust demands. 
      Minimizing downtime is crucial.
    `,
    narrativeIntro: `
      "An official from ENISA calls, reminding you 
       that any major vulnerabilities 
       could trigger a compliance check. 
       Better upgrade properly."
    `,
    digDeeperLinks: [
      { label: "NIS2 Firewall Guidance", url: "https://example.com/nis2-fw" },
      { label: "HA Firewall Setup", url: "https://example.com/ha-firewall" }
    ],
    knowledgeRecap: `
      Proper firewall upgrades reduce open ports and 
      help with compliance. 
      If you skip thorough scanning or doc, 
      you might pass vulnerabilities forward 
      and fail an ENISA or local authority check.
    `,
    steps:[ /* same structure as previous #4 */
      {
        location:"cybersikkerhed",
        stepDescription:"Map current firewall holes, do vulnerability scanning.",
        choiceA:{
          label:"Deep inspection",
          text:"+3 time, -100 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Quick scan",
          text:"+1 time, -30 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Test new firewall with servers, consider HA cluster.",
        choiceA:{
          label:"Comprehensive test",
          text:"+2 time, -80 money => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Minimal test",
          text:"+1 time, -20 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:20, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Document firewall upgrade for CAB, referencing ISO 27001 or NIS2.",
        choiceA:{
          label:"Detailed report",
          text:"+2 time => no extra risk",
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

  // 5) Dataovervågning & Log-analyse
  {
    title: "Dataovervågning & Log-analyse (SIEM)",
    shortDesc: "Set up SIEM for real-time log analysis & NIS2 compliance.",
    logicLong: `
      A SIEM aggregates logs from endpoints, servers, net devices. 
      Perfect for quick detection & post-incident forensics. 
      Also helps pass NIS2 audits.
    `,
    narrativeIntro: `
      "An IT officer from the region hints that many new hires 
       fail to check logs thoroughly. 
       A SIEM can fill that gap if configured well."
    `,
    digDeeperLinks: [
      { label: "SIEM 101", url: "https://example.com/siem" },
      { label: "NIS2 Logging Requirements", url: "https://example.com/nis2-logging" }
    ],
    knowledgeRecap: `
      Collecting all logs in one place 
      plus real-time correlation helps detect anomalies quickly. 
      But skipping doc or partial coverage 
      can leave blindspots (like missed server logs).
    `,
    steps:[ /* same as #5 final version */
      {
        location:"cybersikkerhed",
        stepDescription:"Pick advanced SIEM or basic log server for correlation.",
        choiceA:{
          label:"Advanced SIEM",
          text:"+3 time, -120 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Basic logserver",
          text:"+1 time, -40 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Inform staff that their actions are logged (GDPR transparency).",
        choiceA:{
          label:"Awareness campaign",
          text:"+2 time => +1 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:1} }
        },
        choiceB:{
          label:"Tell only IT dept",
          text:"0 time => +5% risk (staff surprised).",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a log-strategy referencing NIS2 & data retention.",
        choiceA:{
          label:"Full log policy",
          text:"+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  // 6) Penetrationstest of LIMS
  // 7) MFA
  // 8) Monitoring & Alerting
  // 9) Cloud-Sårbarhedsscanning
  // 10) Adgangsstyring for eksterne

  {
    title: "Penetrationstest af LIMS",
    shortDesc: "Hire external ethical hackers to test LIMS. Comply with MITRE ATT&CK approach.",
    logicLong: `
      You want a thorough pen-test to discover real vulnerabilities 
      before criminals do. 
      This also helps demonstrate NIS2 readiness.
    `,
    narrativeIntro: `
      "A consultant group proposes a 2-week pen-test, 
       including phishing tests, social engineering calls, 
       and scanning. Staff are nervous about failing these tests."
    `,
    digDeeperLinks: [
      { label:"MITRE ATT&CK", url:"https://example.com/mitre-attack" },
      { label:"Pen-test Tools", url:"https://example.com/pen-test-tools" }
    ],
    knowledgeRecap: `
      A pen-test is crucial for real security validation. 
      Skipping or limiting scope might leave major holes. 
      Thorough doc helps fix issues and prove compliance.
    `,
    steps:[
      // same structure as #6 final
      {
        location:"cybersikkerhed",
        stepDescription:"Plan pen-test scope (web UI, net, OS, social engineering).",
        choiceA:{
          label:"Broad scope",
          text:"+3 time, -150 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Narrow scope",
          text:"+1 time, -50 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"leverandor",
        stepDescription:"Test external modules from vendor to avoid supply chain risk.",
        choiceA:{
          label:"Involve vendor deeply",
          text:"+2 time, -80 money => synergyEffect:{rushedJura:false}, +1 security",
          applyEffect:{ timeCost:2, moneyCost:80, synergyEffect:{rushedJura:false}, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Only hospital's part",
          text:"+1 time => +5% risk",
          applyEffect:{ timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Pen-test report for CAB referencing discovered vulnerabilities.",
        choiceA:{
          label:"Detailed",
          text:"+2 time => no extra risk, +1 security",
          applyEffect:{ timeCost:2, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Minimal",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title: "Multi-factor Authentication (MFA)",
    shortDesc:"Enforce MFA to meet NIS2 & GDPR security demands.",
    logicLong:`
      The hospital’s staff only use passwords. 
      MFA drastically reduces unauthorized logins, 
      aligning with NIS2 push for robust access controls.
    `,
    narrativeIntro:`
      "IT discovered a staff member used 'password123' 
       for a critical admin account. 
       Everyone agrees it's time for MFA 
       but they're worried about user pushback."
    `,
    digDeeperLinks:[
      { label:"MFA & NIS2 Requirements", url:"https://example.com/mfa-nis2" },
      { label:"Hardware Tokens vs. SMS", url:"https://example.com/hw-token" }
    ],
    knowledgeRecap:`
      MFA drastically lowers phishing success. 
      In real hospitals, ignoring advanced auth can lead 
      to data theft or sabotage. 
      Thorough doc ensures staff know how to enroll.
    `,
    steps:[
      // same structure as #7 final
      {
        location:"cybersikkerhed",
        stepDescription:"Pick an MFA method (app, hardware, etc.) for the entire hospital.",
        choiceA:{
          label:"Advanced (auth-app)",
          text:"+3 time, -100 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Simple (sms)",
          text:"+1 time, -30 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Explain to staff the significance of extra login steps.",
        choiceA:{
          label:"Training sessions",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"Send an email",
          text:"0 time => +1 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a thorough MFA doc referencing best practices.",
        choiceA:{
          label:"Detailed doc",
          text:"+2 time => no extra risk",
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
    title: "Monitoring & Alerting (SOC Integration)",
    shortDesc: "Automate real-time alerts, connect to SOC for 24/7 coverage.",
    logicLong: `
      Quick detection is vital. 
      An automated alert system can integrate with a Security Operations Center 
      so you can respond to incidents fast, a NIS2 best practice.
    `,
    narrativeIntro: `
      "A pilot test shows staff ignoring email alerts. 
       A more robust system might text or Slack them 
       if a critical server sees suspicious activity. 
       The new employees are unsure how to configure it fully."
    `,
    digDeeperLinks:[
      { label:"SOC Setup 101", url:"https://example.com/soc-setup" },
      { label:"XDR vs. SOC Tools", url:"https://example.com/xdr-soc" }
    ],
    knowledgeRecap:`
      Real-time alerting plus a SOC can stop incidents 
      before they escalate. 
      If docs or synergy checks are skipped, 
      you might have coverage gaps and fail NIS2 audits.
    `,
    steps:[
      // same as #8 final
      {
        location:"cybersikkerhed",
        stepDescription:"Pick a system for real-time alerts, maybe Slack or XDR-based.",
        choiceA:{
          label:"Advanced platform",
          text:"+3 time, -120 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Simple mail-alert",
          text:"+1 time, -40 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"infrastruktur",
        stepDescription:"Check if network can handle constant monitoring data to SOC or XDR.",
        choiceA:{
          label:"Performance test",
          text:"+2 time, -80 money => +2 stability",
          applyEffect:{ timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"No test",
          text:"0 time => synergyEffect:{lackInfra:true}, +5% risk",
          applyEffect:{ synergyEffect:{lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants alarm configuration doc, referencing NIS2 incident response.",
        choiceA:{
          label:"Full doc",
          text:"+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Sparse doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title: "Cloud-Sårbarhedsscanning",
    shortDesc:"Scan cloud environment for vulnerabilities, avoid supply chain attacks.",
    logicLong:`
      The hospital uses cloud for certain LIMS modules. 
      You must do thorough scanning to catch potential supply chain 
      issues and comply with NIS2.
    `,
    narrativeIntro:`
      "A major cloud provider had a breach last month. 
       Could our environment be next? 
       People are nervous, especially new hires, 
       about the complexity of scanning containers 
       and microservices up there."
    `,
    digDeeperLinks:[
      { label:"Supply Chain Attack Info", url:"https://example.com/supply-chain" },
      { label:"SBOM Explanation", url:"https://example.com/sbom" }
    ],
    knowledgeRecap:`
      Thorough cloud scanning plus updated data processor agreements 
      are key to preventing hidden vulnerabilities. 
      Skipping doc or restricting scope might leave big holes, 
      especially if vendor components are untested.
    `,
    steps:[
      // same as #9 final
      {
        location: "cybersikkerhed",
        stepDescription: "Plan scanning of cloud environment (containers, net, SBOM).",
        choiceA:{
          label:"Grundig scanning",
          text:"+3 time, -100 money => +2 security",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Overfladisk scan",
          text:"+1 time, -30 money => +1 security, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"leverandor",
        stepDescription:"Update data processor agreement, request full scanning permission.",
        choiceA:{
          label:"Negotiate full access",
          text:"+2 time => synergyEffect:{ rushedJura:false}, +1 security",
          applyEffect:{ timeCost:2, synergyEffect:{ rushedJura:false}, statChange:{ security:1 } }
        },
        choiceB:{
          label:"Accept limited access",
          text:"0 time => +5% risk",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Cloud-scan report to CAB, referencing DPIA if personal data in cloud.",
        choiceA:{
          label:"Full doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title: "Adgangsstyring for eksterne",
    shortDesc:"Limit external partner access with least privilege, add logs & DLP.",
    logicLong:`
      The hospital has many external consultants. 
      They have overly broad LIMS privileges. 
      You want a fine-grained role approach and a thorough audit trail 
      to reduce insider threats.
    `,
    narrativeIntro:`
      "Some external staff log in to many modules. 
       Another hospital had a breach from a contractor's stolen password. 
       Let's not repeat that fiasco here."
    `,
    digDeeperLinks:[
      { label:"DLP for External Users", url:"https://example.com/dlp-external" },
      { label:"Data Processor Agreement", url:"https://example.com/data-proc-agr" }
    ],
    knowledgeRecap:`
      Proper external role scoping ensures compliance 
      with least privilege. 
      If you skip doc or ignore synergy, 
      hidden default privileges might remain, 
      enabling accidental or malicious misuse.
    `,
    steps:[
      // same as #10 final
      {
        location:"cybersikkerhed",
        stepDescription:"Identify modules external folks truly need, consider DLP policies.",
        choiceA:{
          label:"Deep policy-check",
          text:"+3 time => +2 security",
          applyEffect:{ timeCost:3, statChange:{ security:2 } }
        },
        choiceB:{
          label:"Quick check",
          text:"+1 time => +1 security, +5% risk",
          applyEffect:{ timeCost:1, statChange:{ security:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"it-jura",
        stepDescription:"Update contract & data processor agreement referencing GDPR, NIS2.",
        choiceA:{
          label:"Detailed legal review",
          text:"+2 time, -60 money => +1 security, +1 stability",
          applyEffect:{ timeCost:2, moneyCost:60, statChange:{ security:1, stability:1 } }
        },
        choiceB:{
          label:"Use standard terms",
          text:"0 time => +5% risk, synergyEffect:{rushedJura:true}",
          applyEffect:{ riskyPlus:0.05, synergyEffect:{rushedJura:true} }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a full external access policy doc referencing roles & logs.",
        choiceA:{
          label:"Full report",
          text:"+2 time => no extra risk, +1 stability",
          applyEffect:{ timeCost:2, statChange:{ stability:1 } }
        },
        choiceB:{
          label:"Sparse doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  }

];
