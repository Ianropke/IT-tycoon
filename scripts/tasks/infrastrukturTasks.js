// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    category:"infrastruktur",
    title:"Serverpark Modernisering",
    shortDesc:"Skift gamle servere",
    logicLong:"Først Infrastruktur, Hospital, Leverandør, Dok. Fejl i drift mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Plan & indkøb servere",
        choiceA:{ label:"Topmoderne", text:"+2 tid, +100 kr", applyEffect:{timeCost:2,moneyCost:100} },
        choiceB:{ label:"Billigere servere", text:"+5% kapacitetsknaphed", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"hospital",
        stepDescription:"Accepter driftforstyrrelse",
        choiceA:{ label:"Gradvis migrering", text:"+2 tid, færre fejl", applyEffect:{timeCost:2} },
        choiceB:{ label:"Stor weekend-cutover", text:"-10 tid, +8% fejl", applyEffect:{timeCost:-10,riskyPlus:0.08} }
      },
      {
        location:"leverandør",
        stepDescription:"Tilpas software",
        choiceA:{ label:"Grundige tests", text:"+2 tid, robust", applyEffect:{timeCost:2} },
        choiceB:{ label:"Antag ok", text:"+10% softwarefejl", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"dokumentation",
        stepDescription:"Udskiftningsrapport",
        choiceA:{ label:"Detaljeret dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal dok", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"NetværksOpgradering (10 GbE)",
    shortDesc:"Fra 1 til 10 Gbit net",
    logicLong:"Først Infrastruktur, Hospital test, Cybersikkerhed, Dok. Driftfejl.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Installér netudstyr",
        choiceA:{ label:"Fuldt switche/kabler", text:"+2 tid, +80 kr", applyEffect:{timeCost:2, moneyCost:80} },
        choiceB:{ label:"Kun kerneswit", text:"+5% latens", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"hospital",
        stepDescription:"Afdelingstest",
        choiceA:{ label:"Pilot i én afd", text:"+2 tid, sikr forløb", applyEffect:{timeCost:2} },
        choiceB:{ label:"Alt på én gang", text:"+8% driftforstyrrelse", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Opsæt VLAN/firewalls",
        choiceA:{ label:"Grundig net-sikkerhed", text:"+2 tid, robust", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal config", text:"+10% sårbarhed", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"dokumentation",
        stepDescription:"Net-upgrade-rapport",
        choiceA:{ label:"Fuld dok", text:"+2 tid, CAB glade", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal dok", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Konsolidering af sjældent brugte moduler",
    shortDesc:"Lukke/udfase moduler",
    logicLong:"Først Infr., Hospital, IT Jura, Dok. Driftfejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Systematisk analyse",
        choiceA:{ label:"Brugersporing", text:"+2 tid, sikr overblik", applyEffect:{timeCost:2} },
        choiceB:{ label:"Uofficiel liste", text:"+8% fejl-luk", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"hospital",
        stepDescription:"Bekræft modulers relevans",
        choiceA:{ label:"Brugerhøring", text:"+2 tid, færre klager", applyEffect:{timeCost:2} },
        choiceB:{ label:"Luk hurtigt", text:"+10% klager", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"it-jura",
        stepDescription:"Opsig licenser",
        choiceA:{ label:"Ordentlig opsigelse", text:"+2 tid, ingen bod", applyEffect:{timeCost:2} },
        choiceB:{ label:"Hurtig opsigelse", text:"+5% juridisk problem", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Lukningsrapport",
        choiceA:{ label:"Detaljeret dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Overgang til Cloud-hybrid",
    shortDesc:"Flyt dele af LIMS i skyen",
    logicLong:"Først Infr., Cyb, Hospital, Dok. Fejl mulig.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Cloud-arkitektur",
        choiceA:{ label:"Detaljeret design", text:"+3 tid, robust", applyEffect:{timeCost:3} },
        choiceB:{ label:"Hurtig opsætning", text:"+5% migrationsfejl", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Sikre sky-data",
        choiceA:{ label:"Fuld kryptering", text:"+2 tid", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal SSL", text:"+10% datalæk-risiko", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"hospital",
        stepDescription:"Godkend cloud-test",
        choiceA:{ label:"Inddrag afdelinger", text:"+2 tid", applyEffect:{timeCost:2} },
        choiceB:{ label:"Ingen inddragelse", text:"+5% klager", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Cloud-hybrid-beskrivelse",
        choiceA:{ label:"Komplet dok", text:"+2 tid", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"HA for kritiske systemer",
    shortDesc:"Opsæt redundans/failover",
    logicLong:"Først Infr., Hospital, Leverandør, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Opsæt HA/failover",
        choiceA:{ label:"Fuld klynge", text:"+3 tid, meget stabil", applyEffect:{timeCost:3} },
        choiceB:{ label:"Lokal kluster", text:"+10% net splitbrain", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"hospital",
        stepDescription:"Test failover",
        choiceA:{ label:"Planlagt weekend", text:"+2 tid, sikkert", applyEffect:{timeCost:2} },
        choiceB:{ label:"Dagtimer", text:"+5% klager hvis fejl", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"leverandør",
        stepDescription:"Softwareunderstøttelse",
        choiceA:{ label:"Fuld HA-support", text:"+2 tid, minimal softwarefejl", applyEffect:{timeCost:2} },
        choiceB:{ label:"Delvis support", text:"+5% failoverfejl", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"HA-rapport",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Kort notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Virtualiseringsprojekt",
    shortDesc:"Indføre VMware e.l.",
    logicLong:"Først Infr., Hospital, Leverandør, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Opsæt hypervisor",
        choiceA:{ label:"Robust platform", text:"+2 tid, stabil", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal opsætning", text:"+5% resourcekollision", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"hospital",
        stepDescription:"Check performance",
        choiceA:{ label:"Pilotkørsel", text:"+2 tid, kvalitetstjek", applyEffect:{timeCost:2} },
        choiceB:{ label:"Flyt alt straks", text:"+8% nedetid-risiko", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"leverandør",
        stepDescription:"Licensaftaler VM",
        choiceA:{ label:"Forhandle ordentligt", text:"+2 tid, lovligt i orden", applyEffect:{timeCost:2} },
        choiceB:{ label:"Genbrug fysisk licens", text:"+5% licenskonflikt", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Virt-projektbeskrivelse",
        choiceA:{ label:"Komplet dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Kort notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Afvikling af ældre software (OS-versioner)",
    shortDesc:"Lukke gamle OS’er",
    logicLong:"Først Infr., Hospital, IT Jura, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Liste over forældede OS",
        choiceA:{ label:"Detaljeret inventar", text:"+2 tid, alt med", applyEffect:{timeCost:2} },
        choiceB:{ label:"Gæt fra dok", text:"+8% overset server", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"hospital",
        stepDescription:"Afklar erstatning",
        choiceA:{ label:"Spørg afdelinger", text:"+2 tid, bedre plan", applyEffect:{timeCost:2} },
        choiceB:{ label:"Luk alt uden høring", text:"+10% klager", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"it-jura",
        stepDescription:"Opsig supportaftaler",
        choiceA:{ label:"Ordentlig opsigelse", text:"+2 tid, ingen bod", applyEffect:{timeCost:2} },
        choiceB:{ label:"Hurtig opsigelse", text:"+5% bod", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Migrationsrapport",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Energioptimering i datacenter",
    shortDesc:"Forbedre køling, PSU, tempstyring",
    logicLong:"Først Infr. (tiltag), Hospital (varsling), Leverandør, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Vælg energitiltag",
        choiceA:{ label:"Detaljeret plan", text:"+3 tid, stor besparelse", applyEffect:{timeCost:3} },
        choiceB:{ label:"Skift kun PSU i store servere", text:"+5% restforbrug", applyEffect:{riskyPlus:0.05, timeCost:1} }
      },
      {
        location:"hospital",
        stepDescription:"Varsle serviceafbrydelse",
        choiceA:{ label:"Weekend-ombygning", text:"+2 tid, forberedt personale", applyEffect:{timeCost:2} },
        choiceB:{ label:"Dagtimer", text:"+8% klager", applyEffect:{riskyPlus:0.08} }
      },
      {
        location:"leverandør",
        stepDescription:"Tjek hardwarekrav",
        choiceA:{ label:"Firmwaretest", text:"+2 tid, fewer konflikter", applyEffect:{timeCost:2} },
        choiceB:{ label:"Antag ok", text:"+5% firmwarekonflikt", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Energiprojekt-rapport",
        choiceA:{ label:"Fuld dok", text:"+2 tid, CAB glade", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal dok", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Lukning af parallel-lab systemer",
    shortDesc:"Integrere gamle labs i hoved-LIMS",
    logicLong:"Først Infr., Hospital, Cyb, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Forbered sammensmeltning",
        choiceA:{ label:"Migreringsplan", text:"+2 tid, sikrer data", applyEffect:{timeCost:2} },
        choiceB:{ label:"Luk gamle systemer hurtigt", text:"+5% tabt data", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"hospital",
        stepDescription:"Migrer data, oplær",
        choiceA:{ label:"Overgangsperiode", text:"+2 tid, glat flow", applyEffect:{timeCost:2} },
        choiceB:{ label:"Tvangsluk", text:"+10% klager fra lab", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Sikre datasletning i gammelt system",
        choiceA:{ label:"Forsvarlig sletning", text:"+2 tid, ingen rest-data", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal sletning", text:"+5% rest-data kan stjæles", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Migrationsrapport",
        choiceA:{ label:"Detaljeret dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Kort notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  },
  {
    category:"infrastruktur",
    title:"Migrering til container-teknologi",
    shortDesc:"Kør LIMS i Docker/K8s",
    logicLong:"Først Infr., Hospital, Cyb, Dok.",
    steps:[
      {
        location:"infrastruktur",
        stepDescription:"Opsæt container-miljø",
        choiceA:{ label:"K8s cluster", text:"+3 tid, robust", applyEffect:{timeCost:3} },
        choiceB:{ label:"Let Docker-opsætning", text:"+5% resourcekollision", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"hospital",
        stepDescription:"Test stabilitet",
        choiceA:{ label:"Pilot i én afd", text:"+2 tid, sikrer kvalitet", applyEffect:{timeCost:2} },
        choiceB:{ label:"Rul alt i container", text:"+10% driftusikkerhed", applyEffect:{riskyPlus:0.1} }
      },
      {
        location:"cybersikkerhed",
        stepDescription:"Scan container-images",
        choiceA:{ label:"Rootless, streng scanning", text:"+2 tid, meget sikker", applyEffect:{timeCost:2} },
        choiceB:{ label:"Basal scanning", text:"+5% sårbarheder", applyEffect:{riskyPlus:0.05} }
      },
      {
        location:"dokumentation",
        stepDescription:"Container-projekt",
        choiceA:{ label:"Fyldig dok", text:"+2 tid, CAB roser dig", applyEffect:{timeCost:2} },
        choiceB:{ label:"Minimal notits", text:"+5% CAB-skepsis", applyEffect:{riskyPlus:0.05} }
      }
    ]
  }
];
