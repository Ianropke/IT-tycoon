// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [

  // 1) Netværksovervågning (IDS/IPS)
  {
    title: "Netværksovervågning (IDS/IPS)",
    shortDesc: `
      Installer <span class="hoverTooltip" data-tooltip="Intrusion Detection & Prevention System.">IDS/IPS</span> 
      for at opdage hackere, opfyld <span class="hoverTooltip" data-tooltip="EU-krav for kritisk infrastruktur.">NIS2</span>.
    `,
    logicLong: `
      Angreb på hospitalets netværk stiger. 
      Du vil opsætte et <span class="hoverTooltip" data-tooltip="Ser real-time trafik for ondsindede mønstre.">IDS/IPS-system</span> 
      for at blokere forsøg, hvilket er vigtigt for 
      <span class="hoverTooltip" data-tooltip="Direktiv der stiller krav om robusthed, hændelsesrapportering.">NIS2</span>
      i sundhedssektoren.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Identificér de mest udsatte segmenter i netværket. 
          Overvej <span class="hoverTooltip" data-tooltip="ISO 27001/ISMS risk approach.">ISMS-risikovurdering</span>.
        `,
        choiceA: {
          label: "Omfattende scanning",
          text: "+3 tid, -80 kr => +2 security (flere huller findes).",
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (du kan overse sårbarheder).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Integrer IDS/IPS i netværket uden at bremse ydeevnen. 
          Husk <span class="hoverTooltip" data-tooltip="Plan for at holde IT kørende ved nedbrud, jf. NIS2.">IT Beredskabsplan</span>.
        `,
        choiceA: {
          label: "Grundig test",
          text: "+2 tid, -100 kr => +2 stability (sikrer minimal nedetid).",
          applyEffect: { timeCost:2, moneyCost:100, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Lynopsætning",
          text: "+1 tid, -50 kr => +1 stability, +5% risk (konfigurationsfejl).",
          applyEffect: { timeCost:1, moneyCost:50, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Dokumentér IDS/IPS-implementeringen 
          (<span class="hoverTooltip" data-tooltip="Art. 32 GDPR: sikre databehandling.">GDPR Art. 32</span>, 
          NIS2-krav) til CAB.
        `,
        choiceA: {
          label: "Fuld dokumentation",
          text: "+2 tid => ingen ekstra risk. Også relevant for revisorspor.",
          applyEffect: { timeCost: 2 }
        },
        choiceB: {
          label: "Minimal dokumentation",
          text: "0 tid => +5% risk => docSkipCount++ (CAB sætter spørgsmålstegn).",
          applyEffect: { riskyPlus: 0.05 }
        }
      }
    ]
  },

  // 2) Phishing- og Ransomware-Forsvar
  {
    title: "Phishing- og Ransomware-Forsvar",
    shortDesc: `
      Træn personalet i at spotte 
      <span class="hoverTooltip" data-tooltip="Falske mails, lokker login.">phishing</span>, 
      forebyg <span class="hoverTooltip" data-tooltip="Krypterer filer, kræver løsepenge.">ransomware</span>, 
      opfyld <span class="hoverTooltip" data-tooltip="Krav om at beskytte patientdata.">GDPR</span>.
    `,
    logicLong: `
      Cyberkriminelle bruger ofte 
      <span class="hoverTooltip" data-tooltip="Social engineering.">phishing</span> 
      og 
      <span class="hoverTooltip" data-tooltip="Ondsindet software, krypterer filer.">ransomware</span>
      for at ramme hospitalet. 
      Du vil køre <span class="hoverTooltip" data-tooltip="Simulerede phishing-tests.">træningskampagne</span> 
      og installere en EDR-løsning for at fange ransomware i realtid.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Planlæg phishing-kampagne (simulerede mails) og 
          <span class="hoverTooltip" data-tooltip="Endpoint Detection & Response mod ransomware.">EDR-udrulning</span>.
        `,
        choiceA: {
          label: "Omfattende kampagne",
          text: "+3 tid, -80 kr => +2 security (flere afdelinger dækkes).",
          applyEffect: { timeCost: 3, moneyCost: 80, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Lille kampagne",
          text: "+1 tid, -20 kr => +1 security, +5% risk (ikke alle trænes).",
          applyEffect: { timeCost:1, moneyCost:20, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: `
          Afhold <span class="hoverTooltip" data-tooltip="Awareness: Brugere skal spotte phishing, rapportere mistænkelige mails.">kurser</span>
          om at genkende mailsvindel, 
          informér om EDR.
        `,
        choiceA: {
          label: "Fysiske kurser",
          text: "+2 tid => +2 hospitalSatisfaction (de føler sig trygge).",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Online webinar",
          text: "0 tid => +1 hospitalSatisfaction, +5% risk (engagement kan være lavt).",
          applyEffect: { statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Nedskriv 
          <span class="hoverTooltip" data-tooltip="Ransomware-procedurer, doc for EDR, relevant for GDPR/NIS2.">anti-ransomware vejledning</span> 
          til CAB.
        `,
        choiceA: {
          label: "Udførlig vejledning",
          text: "+2 tid => +1 security, CAB roser indsatsen.",
          applyEffect: { timeCost:2, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Overfladisk doc",
          text: "0 tid => +5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 3) Zero Trust-Strategi
  {
    title: "Zero Trust-Strategi",
    shortDesc: `
      Indfør 
      <span class="hoverTooltip" data-tooltip="Stol ikke på noget, verificér alt.">Zero Trust</span>
      (segmentering, <span class="hoverTooltip" data-tooltip="Security by Design: indbygget sikkerhed.">Security by Design</span>).
    `,
    logicLong: `
      Zero Trust betyder streng segmentering og verifikation af alle anmodninger. 
      Det er i tråd med 
      <span class="hoverTooltip" data-tooltip="Art. 32 GDPR, mindsteprivilegier.">GDPR-sikkerhed</span> 
      og NIS2-krav. Personalet klager dog over flere logintrin.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Design mindste privilegier, netsegementering, 
          evt. <span class="hoverTooltip" data-tooltip="EDR, SIEM, MFA.">komplet Zero Trust-pakke</span>.
        `,
        choiceA: {
          label: "Omfattende policy",
          text: "+3 tid => +2 security (segmentering).",
          applyEffect: { timeCost:3, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Minimal policy",
          text: "+1 tid => +1 security, +5% risk (dele af net forbliver åbne).",
          applyEffect: { timeCost:1, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: `
          Personalet brokker sig over 
          <span class="hoverTooltip" data-tooltip="Fx MFA, streng netadgang.">ekstra logintrin</span>.
        `,
        choiceA: {
          label: "Afhold info-møder",
          text: "+2 tid => +2 hospitalSatisfaction (forståelse for dataansvar).",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Ignorér brok",
          text: "0 tid => -10 hospitalSatisfaction, +5% risk (brugerne omgår systemet).",
          applyEffect: { statChange:{ hospitalSatisfaction:-10 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB vil se 
          <span class="hoverTooltip" data-tooltip="ISMS-lignende dokumentation, synergy med NIS2.">Zero Trust-segmenteringsregler</span>.
        `,
        choiceA: {
          label: "Fuld oversigt",
          text: "+2 tid => ingen ekstra risk.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring delvist over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 4) Firewall-opgradering
  {
    title: "Firewall-opgradering",
    shortDesc: `
      Udskift forældede firewalls, overvej 
      <span class="hoverTooltip" data-tooltip="Next-Gen Firewall med DPI og applikationskontrol.">moderne firewall</span>
      og 
      <span class="hoverTooltip" data-tooltip="Plan for nedbrudshåndtering, NIS2.">beredskabsplan</span>.
    `,
    logicLong: `
      Hospitalets firewall-regler er outdated. 
      Du vil implementere en next-gen firewall med 
      <span class="hoverTooltip" data-tooltip="Deep Packet Inspection.">DPI</span>
      og integrere 
      <span class="hoverTooltip" data-tooltip="Security by Design, minimal lovovertrædelse, accountability.">GDPR-normer</span>.
      Mindre netnedetid forventes.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Kortlæg nuværende firewall-sårbarheder, tjek 
          <span class="hoverTooltip" data-tooltip="Pen-test, vulnerability scanning.">vulnerability scanning</span>.
        `,
        choiceA: {
          label: "Dybdegående inspektion",
          text: "+3 tid, -100 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Hurtig scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (du kan overse huller).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Test firewall-kompatibilitet med servere 
          (<span class="hoverTooltip" data-tooltip="Failover, redundans i firewall cluster.">HA-løsning</span>?).
        `,
        choiceA: {
          label: "Omfattende test",
          text: "+2 tid, -80 kr => +2 stability",
          applyEffect: { timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "+1 tid, -20 kr => +1 stability, +5% risk",
          applyEffect: { timeCost:1, moneyCost:20, statChange:{ stability:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Lav 
          <span class="hoverTooltip" data-tooltip="ISO 27001-agtig rapport med firewall-setup, compliance.">opgraderingsrapport</span> 
          til CAB.
        `,
        choiceA: {
          label: "Detaljeret rapport",
          text: "+2 tid => ingen ekstra risk",
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

  // 5) Dataovervågning & Log-analyse
  {
    title: "Dataovervågning & Log-analyse",
    shortDesc: `
      Implementér 
      <span class="hoverTooltip" data-tooltip="Security Information & Event Management.">SIEM</span>
      for <span class="hoverTooltip" data-tooltip="Incidents, compliance. NIS2/GDPR.">real-time loganalyse</span>.
    `,
    logicLong: `
      For at fange unormale aktiviteter, vil cybersikkerhedsteamet 
      opsætte 
      <span class="hoverTooltip" data-tooltip="Avanceret platform, integrerer logs fra net, endpoints, AD.">SIEM</span>.
      Det hjælper både med 
      <span class="hoverTooltip" data-tooltip="Mulighed for at eftervise compliance, accountability.">audit trail</span>
      og NIS2-rapportering.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Vælg <span class="hoverTooltip" data-tooltip="Ex. Splunk, QRadar, Elastic SIEM.">SIEM-løsning</span> 
          og opsæt retningslinjer for logning.
        `,
        choiceA: {
          label: "Avanceret SIEM",
          text: "+3 tid, -120 kr => +2 security (realtidsanalyse).",
          applyEffect: { timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Billig logserver",
          text: "+1 tid, -40 kr => +1 security, +5% risk (mindre indsigt).",
          applyEffect: { timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: `
          Fortæl personalet, at 
          <span class="hoverTooltip" data-tooltip="Logning af login, dataadgange.">deres handlinger logges</span>.
          Relevans ift. GDPR.
        `,
        choiceA: {
          label: "Oplysningskampagne",
          text: "+2 tid => +1 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:1 } }
        },
        choiceB: {
          label: "Fortæl kun it-afdelingen",
          text: "0 tid => +5% risk (personalet overraskes).",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB vil se 
          <span class="hoverTooltip" data-tooltip="Hvilke logs, retention, compliance.">log-strategi</span> 
          (NIS2/GDPR).
        `,
        choiceA: {
          label: "Fuld logpolitik",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Mangelfuld doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 6) Penetrationstest af LIMS
  {
    title: "Penetrationstest af LIMS",
    shortDesc: `
      Hyre eksterne hackere (etisk) 
      <span class="hoverTooltip" data-tooltip="Efter fx MITRE ATT&CK TTP’er.">pen-test</span>
      for <span class="hoverTooltip" data-tooltip="Sikre compliance (GDPR, NIS2) og drift.">systemets forsvar</span>.
    `,
    logicLong: `
      Du vil sikre hospitalets LIMS mod angreb via 
      <span class="hoverTooltip" data-tooltip="Simulerede angreb, reelle hacks men autoriseret.">penetrationstest</span>. 
      Relevante frameworks: 
      <span class="hoverTooltip" data-tooltip="Vejledning til hacking-teknikker.">MITRE ATT&CK</span>
      og ISO 27001.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Planlæg <span class="hoverTooltip" data-tooltip="Scope: web UI, netværk, server OS, social engineering.">pentest-scope</span>:
          Hvilke dele angribes?
        `,
        choiceA: {
          label: "Bredt scope",
          text: "+3 tid, -150 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:150, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Smalt scope",
          text: "+1 tid, -50 kr => +1 security, +5% risk (lev. moduler usikrede).",
          applyEffect: { timeCost:1, moneyCost:50, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: `
          Involver leverandøren for at teste 
          <span class="hoverTooltip" data-tooltip="Supply Chain Attack: Kan leverandørløsning være bagdør?">eksterne moduler</span>.
        `,
        choiceA: {
          label: "Kræv leverandørens medvirken",
          text: "+2 tid, -80 kr => synergyEffect:{ rushedJura:false } (aftaler alt).",
          applyEffect: { timeCost:2, moneyCost:80, synergyEffect:{ rushedJura:false } }
        },
        choiceB: {
          label: "Kun hospitalets dele",
          text: "+1 tid => +5% risk (leverandørdelen usikret).",
          applyEffect: { timeCost:1, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Lav en 
          <span class="hoverTooltip" data-tooltip="Pentest rapport, inkl. DPIA hvis persondata er i fare.">pentest-rapport</span>
          til CAB.
        `,
        choiceA: {
          label: "Detaljeret",
          text: "+2 tid => ingen ekstra risk, +1 security (fund rettes).",
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

  // 7) Multi-factor Authentication (MFA)
  {
    title: "Multi-factor Authentication (MFA)",
    shortDesc: `
      Indfør <span class="hoverTooltip" data-tooltip="Extra logintrin, fx SMS, token.">MFA</span>
      for at opfylde <span class="hoverTooltip" data-tooltip="NIS2 og GDPR kræver stærk godkendelse.">NIS2/GDPR-krav</span>.
    `,
    logicLong: `
      Hospitalets brugere logger kun med password. 
      Du vil indføre 
      <span class="hoverTooltip" data-tooltip="Ekstra logintrin, minimerer phishing-effekt.">MFA</span>,
      opfylde NIS2 (krav om robusthed) 
      og GDPR art. 32 (sikkerhedsforanstaltninger).
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Vælg MFA-metode (auth-app, 
          <span class="hoverTooltip" data-tooltip="Fysiske tokens, YubiKeys.">hardware-token</span>, SMS).
        `,
        choiceA: {
          label: "Avanceret (auth-app)",
          text: "+3 tid, -100 kr => +2 security",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Simpel (sms)",
          text: "+1 tid, -30 kr => +1 security, +5% risk (falske numre?).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "hospital",
        stepDescription: `
          Forklar personalet vigtigheden af 
          <span class="hoverTooltip" data-tooltip="Mindsker phishing success. Art. 32 GDPR.">MFA</span>.
        `,
        choiceA: {
          label: "Træningssessions",
          text: "+2 tid => +2 hospitalSatisfaction",
          applyEffect: { timeCost:2, statChange:{ hospitalSatisfaction:2 } }
        },
        choiceB: {
          label: "Mail til alle",
          text: "0 tid => +1 hospital, +5% risk (mange ignorerer mail).",
          applyEffect: { statChange:{ hospitalSatisfaction:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB kræver en 
          <span class="hoverTooltip" data-tooltip="DPIA-lignende vurdering, MFA-løsning.">beskrivelse af MFA</span>.
        `,
        choiceA: {
          label: "Udførlig doc",
          text: "+2 tid => ingen ekstra risk, CAB forstår alt.",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Spring doc over",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 8) Monitoring og Alerting System
  {
    title: "Monitoring og Alerting System",
    shortDesc: `
      Implementer 
      <span class="hoverTooltip" data-tooltip="Automatiseret alarmering ved unormale hændelser (XDR?).">realtidsalarmer</span> 
      for <span class="hoverTooltip" data-tooltip="Overvåg 24/7, NIS2-lignende SOC setup.">SOC</span>.
    `,
    logicLong: `
      For at opdage brud i realtid vil cybersikkerhedsteamet 
      opsætte en 
      <span class="hoverTooltip" data-tooltip="Fx XDR, integreret med SIEM.">automatiseret alarmplatform</span>.
      Det kan integreres med 
      <span class="hoverTooltip" data-tooltip="Security Operations Center, 24/7.">SOC</span>
      og lette NIS2-rapportering.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Vælg system til 
          <span class="hoverTooltip" data-tooltip="Fx PagerDuty, Slack, XDR-løsning.">realtidsalarmer</span>
          ved anormal adfærd.
        `,
        choiceA: {
          label: "Avanceret Alarmplatform",
          text: "+3 tid, -120 kr => +2 security, du fanger det meste.",
          applyEffect: { timeCost:3, moneyCost:120, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Simpel mail-alert",
          text: "+1 tid, -40 kr => +1 security, +5% risk (mails kan overses).",
          applyEffect: { timeCost:1, moneyCost:40, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: `
          Check om netværket kan håndtere 
          <span class="hoverTooltip" data-tooltip="Konstant logsending, XDR data.">kontinuerlig monitorering</span>.
        `,
        choiceA: {
          label: "Ydelsestest",
          text: "+2 tid, -80 kr => +2 stability",
          applyEffect: { timeCost:2, moneyCost:80, statChange:{ stability:2 } }
        },
        choiceB: {
          label: "Ingen test",
          text: "0 tid => synergyEffect:{lackInfra:true}, +5% risk",
          applyEffect: { synergyEffect:{lackInfra:true}, riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          CAB vil se 
          <span class="hoverTooltip" data-tooltip="Konfiguration, hændelsesrammer, retention.">alarmkonfiguration</span>,
          relevant for NIS2.
        `,
        choiceA: {
          label: "Fuld beskrivelse",
          text: "+2 tid => ingen ekstra risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 9) Cloud-Sårbarhedsscanning
  {
    title: "Cloud-Sårbarhedsscanning",
    shortDesc: `
      Scanner <span class="hoverTooltip" data-tooltip="AWS, Azure, etc.">cloud-miljø</span>
      for at sikre LIMS-data, undgå 
      <span class="hoverTooltip" data-tooltip="En vektor, hvor en leverandørkomponent kan blive kompromitteret.">supply chain attack</span>.
    `,
    logicLong: `
      Hospitalet bruger cloud til nogle moduler. 
      Du vil køre 
      <span class="hoverTooltip" data-tooltip="Scanning for sårbarheder i cloud-VM, container, net.">cloud-sårbarhedsscanning</span>,
      tjekke for 
      <span class="hoverTooltip" data-tooltip="Angreb via leverandør, dependencies.">supply chain</span> 
      og følge NIS2.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Planlæg scanning af cloud-miljø 
          (<span class="hoverTooltip" data-tooltip="Fx container security, compliance.">containersikkerhed</span>,
          net, 
          <span class="hoverTooltip" data-tooltip="Software Bill of Materials: se afhængigheder.">SBOM</span>).
        `,
        choiceA: {
          label: "Grundig scanning",
          text: "+3 tid, -100 kr => +2 security (du finder huller).",
          applyEffect: { timeCost:3, moneyCost:100, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Overfladisk scanning",
          text: "+1 tid, -30 kr => +1 security, +5% risk (mindre dybde).",
          applyEffect: { timeCost:1, moneyCost:30, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "leverandør",
        stepDescription: `
          Få 
          <span class="hoverTooltip" data-tooltip="Databehandleraftale, Data Processor Agreement.">databehandleraftale</span>
          opdateret, giv scanningstilladelse.
        `,
        choiceA: {
          label: "Forhandl fuld adgang",
          text: "+2 tid => synergyEffect:{ rushedJura:false}, +1 security",
          applyEffect: { timeCost:2, synergyEffect:{ rushedJura:false}, statChange:{ security:1 } }
        },
        choiceB: {
          label: "Accepter begrænset adgang",
          text: "0 tid => +5% risk (du ser ikke alt).",
          applyEffect: { riskyPlus:0.05 }
        }
      },
      {
        location: "dokumentation",
        stepDescription: `
          Cloud-scan rapport til CAB, 
          <span class="hoverTooltip" data-tooltip="Evt. DPIA hvis persondata i skyen.">GDPR vinkel</span>.
        `,
        choiceA: {
          label: "Udførlig dok",
          text: "+2 tid => ingen risk",
          applyEffect: { timeCost:2 }
        },
        choiceB: {
          label: "Minimal rapport",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  },

  // 10) Adgangsstyring for eksterne
  {
    title: "Adgangsstyring (eksterne samarbejdspartnere)",
    shortDesc:`
      Begræns 
      <span class="hoverTooltip" data-tooltip="Udenfor organisationen, fx leverandører, konsulenter.">ekstern adgang</span>
      til LIMS, mindste privilegier, <span class="hoverTooltip" data-tooltip="Accountability, insider threat.">audit trail</span>.
    `,
    logicLong:`
      Hospitalet har mange eksterne konsulenter. 
      De har for bred adgang. 
      Du vil oprette <span class="hoverTooltip" data-tooltip="Zero Trust, NIS2, GDPR.">fine-grained roller</span>
      og 
      <span class="hoverTooltip" data-tooltip="Log alt, opfyld accountability.">audit trail</span>
      for at forhindre insider threat.
    `,
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: `
          Identificér, hvilke moduler eksterne faktisk skal tilgå 
          (<span class="hoverTooltip" data-tooltip="DLP: Forhindre data-udtræk, doping.">DLP</span>?).
        `,
        choiceA: {
          label: "Dybt policy-check",
          text: "+3 tid => +2 security (du finder overflødige rettigheder).",
          applyEffect: { timeCost:3, statChange:{ security:2 } }
        },
        choiceB: {
          label: "Kvik scanning",
          text: "+1 tid => +1 security, +5% risk (nogle har stadig for meget adgang).",
          applyEffect: { timeCost:1, statChange:{ security:1 }, riskyPlus:0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: `
          Eksterne kontrakter + 
          <span class="hoverTooltip" data-tooltip="Databehandleraftale, accountability, NIS2.">Data Processor Agreement</span> 
          skal revideres.
        `,
        choiceA: {
          label: "Detaljeret juridisk gennemgang",
          text: "+2 tid, -60 kr => +1 security, +1 stability",
          applyEffect: { timeCost:2, moneyCost:60, statChange:{ security:1, stability:1 } }
        },
        choiceB: {
          label: "Standardvilkår",
          text: "0 tid => +5% risk, synergyEffect:{rushedJura:true}",
          applyEffect: { riskyPlus:0.05, synergyEffect:{ rushedJura:true } }
        }
      },
      {
        location: "dokumentation",
        stepDescription:`
          CAB ønsker 
          <span class="hoverTooltip" data-tooltip="Brugerroller, logning, betingelser for eksterne.">rapport om ekstern adgang</span>.
        `,
        choiceA: {
          label: "Fuld rapport",
          text: "+2 tid => ingen ekstra risk, +1 stability",
          applyEffect: { timeCost:2, statChange:{ stability:1 } }
        },
        choiceB: {
          label: "Sparsom doc",
          text: "+5% risk => docSkipCount++",
          applyEffect: { riskyPlus:0.05 }
        }
      }
    ]
  }

];
