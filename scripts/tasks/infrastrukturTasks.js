// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [

  {
    title:"Serverpark Genopgradering",
    shortDesc:`
      Modernize the aging server park with HPC capacity 
      & failover to ensure stable LIMS performance.
    `,
    logicLong:`
      The hospital's server cluster is old, 
      risking frequent downtime. 
      You want HPC additions for large computations (AI modules) 
      plus failover to minimize system outages.
    `,
    narrativeIntro:`
      "Walking through the data center, you spot racks of dusty servers. 
       Staff share stories of random restarts. 
       HPC could supercharge performance, 
       but the budget isn't infinite."
    `,
    digDeeperLinks:[
      { label:"HPC & Failover Basics", url:"https://example.com/hpc-failover" },
      { label:"ISO 27001 Datacenter", url:"https://example.com/iso27001-dc" }
    ],
    knowledgeRecap:`
      In real hospitals, ignoring HPC or skipping 
      failover means critical LIMS tasks might freeze or crash 
      under heavy loads. 
      Proper doc helps meet ISO 27001 or NIS2 demands 
      for robust infrastructure.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Conduct a detailed 
          <span class="hoverTooltip" data-tooltip="Evaluate HPC needs, cooling, failover solutions.">capacity analysis</span>
          for HPC & failover.
        `,
        choiceA:{
          label:"Thorough evaluation",
          text:"+3 time, -150 money => +2 stability (solid plan).",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Quick check",
          text:"+1 time, -50 money => +1 stability, +5% risk (oversight possible).",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:`
          Coordinate a 
          <span class="hoverTooltip" data-tooltip="When can servers go offline without blocking lab ops?">service window</span>
          with departments.
        `,
        choiceA:{
          label:"Plan downtime carefully",
          text:"+2 time => +2 hospitalSatisfaction (everyone informed).",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"No explanation",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Document HPC & failover setup for CAB, referencing NIS2 resilience.",
        choiceA:{
          label:"Detailed report",
          text:"+2 time => no extra risk",
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
    title:"Netværksmodernisering i Laboratoriet",
    shortDesc:`
      Upgrade lab network (DNS, AD) 
      for faster data & stable login.
    `,
    logicLong:`
      Labs see frequent slowdowns, 
      possibly from outdated switches, DNS misconfigs, 
      or clunky AD integration. 
      A modernization can reduce sample queue times 
      and login issues.
    `,
    narrativeIntro:`
      "A lab tech complains, 'Half our morning is spent waiting 
       for the system to respond.' 
       Others mention having to re-login due to AD timeouts. 
       You sense a network overhaul is overdue."
    `,
    digDeeperLinks:[
      { label:"DNS & AD Setup", url:"https://example.com/dns-ad-setup" },
      { label:"ISO 27001 on Net Segmentation", url:"https://example.com/iso27001-netseg" }
    ],
    knowledgeRecap:`
      Modernizing lab networks prevents data bottlenecks. 
      Overlooking DNS/AD can lead to login chaos 
      or repeated test fails. 
      Thorough doc ensures accountability 
      and meets NIS2's robust requirement.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:`
          Diagnose net devices (switches, routers) & 
          <span class="hoverTooltip" data-tooltip="DNS zones, AD group policies.">AD integration</span>.
        `,
        choiceA:{
          label:"Detailed net analysis",
          text:"+3 time, -150 money => +3 stability (fix all flaskehalse).",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Quick guess",
          text:"+1 time, -50 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Plan potential downtime for DNS/AD changes with lab leads.",
        choiceA:{
          label:"Announce downtime",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"No heads up",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"Document network upgrade for CAB (ISO 27001 references).",
        choiceA:{
          label:"Full documentation",
          text:"+2 time => no extra risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Short memo",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"Datacenter Opgradering",
    shortDesc:`
      Redo the datacenter (racks, cooling), 
      add replikering for failover.
    `,
    logicLong:`
      The hospital's datacenter is short on cooling & capacity. 
      You plan to upgrade racks, 
      improve power, plus set up real-time replikering 
      so data is safe if one center fails.
    `,
    narrativeIntro:`
      "Rows of servers hum in a hot room. 
       Technicians have to wear short sleeves in winter. 
       You sense meltdown potential if usage spikes 
       or the AC fails."
    `,
    digDeeperLinks:[
      { label:"Datacenter & HPC Cooling", url:"https://example.com/datacenter-cool" },
      { label:"Replikering + NIS2", url:"https://example.com/replikering-nis2" }
    ],
    knowledgeRecap:`
      A well-cooled datacenter with replikering 
      prevents catastrophic data loss. 
      If you skip doc or do a quick fix, 
      you might pass an external audit 
      but risk meltdown in a real surge.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Check racks, cooling, replikering for HPC or large data loads.",
        choiceA:{
          label:"Extensive capacity check",
          text:"+3 time, -120 money => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Surface check",
          text:"+1 time, -40 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location:"hospital",
        stepDescription:"Notify them about partial downtime for new racks, AC install.",
        choiceA:{
          label:"Detailed plan",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB:{
          label:"No explanation",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants failover & replikering design doc referencing NIS2.",
        choiceA:{
          label:"Comprehensive doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2 }
        },
        choiceB:{
          label:"Minimal note",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  },

  {
    title:"Backup-løsning Modernisering",
    shortDesc:`
      Switch from båndbackup to disk/cloud + replikering 
      for faster restores.
    `,
    logicLong:`
      The hospital uses old tape backups, 
      slow to restore. 
      You want a more modern solution 
      (disk + replikering or cloud) 
      to quickly recover critical data.
    `,
    narrativeIntro:`
      "An urgent lab test result got lost 
       after a random server crash. 
       Staff had to rummage through tapes 
       to partially restore. This fiasco 
       must not be repeated."
    `,
    digDeeperLinks:[
      { label:"Disk vs Cloud Backup", url:"https://example.com/disk-cloud-backup" },
      { label:"Replikering Strategy", url:"https://example.com/repl-strategy" }
    ],
    knowledgeRecap:`
      Modern backups let you recover quickly. 
      Tapes are cheap but slow. 
      A missed doc or partial approach 
      might hamper your ISO or NIS2 compliance 
      if you cannot restore fast enough.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Pick new backup approach: disk, cloud, or hybrid with replikering.",
        choiceA:{
          label:"Disk + Cloud Hybrid",
          text:"+3 time, -120 money => +2 stability",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2 } }
        },
        choiceB:{
          label:"Keep tape + minimal disk",
          text:"+1 time => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Plan when backups happen to avoid peak usage or messing results.",
        choiceA:{
          label:"Detailed scheduling",
          text:"+2 time => +1 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:1} }
        },
        choiceB:{
          label:"Nightly only, no test",
          text:"0 time => +5% risk (untested backups).",
          applyEffect:{ riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a new backup & replikering strategy doc.",
        choiceA:{
          label:"Full doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2}
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
    title:"Virtualiseringsprojekt",
    shortDesc:`
      Migrate LIMS servers to virtual machines, 
      implement live migration & test environment.
    `,
    logicLong:`
      The hospital has many physical servers. 
      By virtualizing, you reduce hardware usage 
      and can do live migration for minimal downtime. 
      But staff might fear new complexities.
    `,
    narrativeIntro:`
      "Rows of old servers fill the data center. 
       'We could house these in half the space 
        if we go virtual,' the lead admin says. 
       Yet some worry about potential misconfig."
    `,
    digDeeperLinks:[
      { label:"Hypervisor Options", url:"https://example.com/hypervisor-compare" },
      { label:"ISO 27001 Virtualization Security", url:"https://example.com/iso27001-virt" }
    ],
    knowledgeRecap:`
      Virtualization often saves cost and offers flexible failover. 
      If you skip synergy or doc, 
      you might risk partial migrations that lead to meltdown 
      if the hypervisor fails.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Choose a hypervisor (VMware, Hyper-V) & plan migrations.",
        choiceA:{
          label:"Detailed migration plan",
          text:"+3 time, -100 money => +2 stability, +1 development",
          applyEffect:{ timeCost:3, moneyCost:100, statChange:{ stability:2, development:1 } }
        },
        choiceB:{
          label:"Quick migration",
          text:"+1 time, -30 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:30, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Notify departments about possible short downtimes during VM cutovers.",
        choiceA:{
          label:"Good communication",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"No info",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a virtualization & test environment doc referencing rollback plans.",
        choiceA:{
          label:"Comprehensive doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2}
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
    title:"Netværkssegmentering",
    shortDesc:`
      Separate network into VLANs 
      for stability & security, reduce blast radius.
    `,
    logicLong:`
      The hospital network is flat—one glitch or attack 
      can spread widely. VLAN-based segmentation 
      limits damage. 
      Some staff might be confused by new IP subnets.
    `,
    narrativeIntro:`
      "An engineer warns: 'One misconfiguration could crash the entire domain.' 
       VLAN segmentation is overdue, 
       but there's pushback from those who fear new IP addresses."
    `,
    digDeeperLinks:[
      { label:"VLAN & Net Segmentation", url:"https://example.com/vlan-seg" },
      { label:"NIS2 & Minimizing Attack Spread", url:"https://example.com/nis2-attackspread" }
    ],
    knowledgeRecap:`
      A well-segmented net keeps an infection in one zone. 
      If you skip doc or synergy checks, 
      staff might not update device IPs properly, 
      leading to confusion and partial coverage.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Configure VLAN, router ACLs, new IP addressing for LIMS & departments.",
        choiceA:{
          label:"Deep net partition",
          text:"+3 time, -120 money => +2 stability, +1 security",
          applyEffect:{ timeCost:3, moneyCost:120, statChange:{ stability:2, security:1} }
        },
        choiceB:{
          label:"Minimal segmentation",
          text:"+1 time, -40 money => +1 stability, +5% risk (some net still open).",
          applyEffect:{ timeCost:1, moneyCost:40, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Explain new IP addresses & login flows to departments.",
        choiceA:{
          label:"Clear communication",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Quick mail only",
          text:"0 time => -10 hospitalSatisfaction, +5% risk (dept confusion).",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB needs network diagram & VLAN policy referencing NIS2 resilience.",
        choiceA:{
          label:"Full diagram",
          text:"+2 time => no risk",
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
    title:"Forbedring af Dataoverførselshastighed",
    shortDesc:`
      Upgrade net to 10Gbit, add loadbalancering 
      for faster LIMS performance.
    `,
    logicLong:`
      Users complain about slow file transfers. 
      A 10Gbit upgrade plus loadbalancer 
      can massively speed up data flow. 
      Some fear it's too expensive or complex.
    `,
    narrativeIntro:`
      "Huge lab files often take ages to upload. 
       The thought of 10Gbit 
       plus a loadbalancer to share traffic 
       excites the IT staff, 
       but the finance team balks at cost."
    `,
    digDeeperLinks:[
      { label:"10Gbit Implementation", url:"https://example.com/10gbit" },
      { label:"Load Balancing 101", url:"https://example.com/load-balancing" }
    ],
    knowledgeRecap:`
      Upgrading to 10Gbit and employing a loadbalancer 
      can drastically reduce bottlenecks for big lab or imaging files. 
      Partial solutions or skipping doc could hamper adoption 
      and cause leftover slow points.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Install 10Gbit NICs/switches, set up loadbalancer across LIMS servers.",
        choiceA:{
          label:"Buy 10G hardware",
          text:"+3 time, -200 money => +3 stability",
          applyEffect:{ timeCost:3, moneyCost:200, statChange:{ stability:3 } }
        },
        choiceB:{
          label:"Keep 1G + minimal tuning",
          text:"+1 time, -50 money => +1 stability, +5% risk",
          applyEffect:{ timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Explain downtime and new loadbalancer URL changes to staff.",
        choiceA:{
          label:"Full info",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"No notice",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05}
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB requires a net & loadbalancer plan, referencing SLA & NIS2.",
        choiceA:{
          label:"Detailed doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2}
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
    title:"Integration af Cloud-Løsninger",
    shortDesc:`
      Move parts of the infrastructure to cloud 
      with AD/dns, ensure compliance.
    `,
    logicLong:`
      The hospital considers partial migration to AWS/Azure 
      for better scaling. 
      You must handle net connectivity, AD trust, 
      and NIS2 plus data processor agreements.
    `,
    narrativeIntro:`
      "A cloud vendor rep claims near-infinite scaling. 
       Meanwhile, the local staff worry about 
       latency and robust AD trust across the WAN."
    `,
    digDeeperLinks:[
      { label:"Cloud HPC or DNS Peering", url:"https://example.com/cloud-hpc" },
      { label:"NIS2 Cloud Compliance", url:"https://example.com/nis2-cloud" }
    ],
    knowledgeRecap:`
      A well-planned cloud integration can reduce on-prem overhead 
      and provide DR advantages. 
      Skipping synergy or doc might result in half-baked solutions, 
      plus potential compliance gaps.
    `,
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Set up secure VPN/DirectConnect, AD trust, DNS-peering with cloud environment.",
        choiceA:{
          label:"Upgraded net link",
          text:"+3 time, -150 money => +2 stability, +1 security",
          applyEffect:{ timeCost:3, moneyCost:150, statChange:{ stability:2, security:1 } }
        },
        choiceB:{
          label:"Use existing net path",
          text:"+1 time => synergyEffect:{ lackInfra:true}, +5% risk",
          applyEffect:{ timeCost:1, synergyEffect:{ lackInfra:true}, riskyPlus:0.05}
        }
      },
      {
        location:"hospital",
        stepDescription:"Inform staff about new cloud-latency & changed URLs for certain LIMS modules.",
        choiceA:{
          label:"Thorough presentation",
          text:"+2 time => +2 hospitalSatisfaction",
          applyEffect:{ timeCost:2, statChange:{ hospitalSatisfaction:2} }
        },
        choiceB:{
          label:"Short email",
          text:"0 time => -10 hospitalSatisfaction, +5% risk",
          applyEffect:{ statChange:{ hospitalSatisfaction:-10}, riskyPlus:0.05 }
        }
      },
      {
        location:"dokumentation",
        stepDescription:"CAB wants a compliance doc referencing Data Processor Agreement & NIS2.",
        choiceA:{
          label:"Complete doc",
          text:"+2 time => no risk",
          applyEffect:{ timeCost:2}
        },
        choiceB:{
          label:"Minimal doc",
          text:"+5% risk => docSkipCount++",
          applyEffect:{ riskyPlus:0.05}
        }
      }
    ]
  }

];
