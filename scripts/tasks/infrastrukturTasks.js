// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  {
    title: "Serverpark Genopgradering",
    shortDesc: "Moderniser den aldrende serverpark for at sikre kontinuerlig drift.",
    logicLong: "Serverne i regionen er slidte og viser tegn på mekanisk nedbrydning. Dette projekt handler om at foretage en grundig evaluering af hardware, planlægge en servicevindue i samarbejde med hospitalet, indhente juridisk rådgivning om kontrakter og sørge for en detaljeret dokumentation, så opgraderingen kan ske uden overraskelser.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Foretag en detaljeret evaluering af hardware – vælg den metode, der sikrer, at du investerer klogt.",
        choiceA: {
          label: "Grundig evaluering",
          text: "Afhold en omfattende inspektion af hele serverparken for at identificere alle svage punkter. (+3 tid, -150 kr; giver +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig overfladeinspektion",
          text: "Udfør en hurtig vurdering for at spare tid, men risikér at overse kritiske svagheder. (+1 tid, -50 kr; giver +1 Stabilitet og +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg et servicevindue med hospitalets input – hvordan vil du minimere forstyrrelser?",
        choiceA: {
          label: "Koordineret servicevindue",
          text: "Planlæg et nedbrud i samarbejde med hospitalets drift, så afdelingerne bliver informeret og forberedt. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Uplanlagt nedetid",
          text: "Gør det hurtigt, men undlad at informere – det sparer tid, men hospitalet mister tillid. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Foretag en juridisk gennemgang af de nye hardware-kontrakter.",
        choiceA: {
          label: "Detaljeret kontraktrevision",
          text: "Få eksterne eksperter til at gennemgå kontrakterne for at undgå fremtidige juridiske problemer. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard kontraktskabelon",
          text: "Brug en standard skabelon for en hurtigere løsning, men med en risiko for manglende dækning. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opgraderingsprocessen for at minimere CAB-skepsis.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "Udarbejd en omfattende dokumentation, der beskriver alle ændringer – CAB vil være tilfreds. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kort for at spare tid, men risikér ekstra CAB-skepsis. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Netværksmodernisering i Laboratoriet",
    shortDesc: "Opgrader netværket for hurtigere dataudveksling og bedre stabilitet.",
    logicLong: "Det nuværende netværk holder ikke til den moderne belastning i laboratorierne. Denne opgave involverer at udskifte gamle switche, installere hurtige kabler og sikre en jævn kommunikation mellem enhederne. En vellykket modernisering er afgørende for, at kritiske data kan overføres uden fejl.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer nuværende netværksudstyr.",
        choiceA: {
          label: "Detaljeret netværksdiagnose",
          text: "Udfør en grundig analyse af eksisterende udstyr for at identificere flaskehalse. (+3 tid, -150 kr; giver +3 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "Lav en overfladisk diagnosticering for at spare tid, men risikér oversete problemer. (+1 tid, -50 kr; giver +1 Stabilitet og +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner nedetid med laboratorieledelsen.",
        choiceA: {
          label: "Planlagt nedbrud",
          text: "Arranger et servicevindue, så laboratorierne får besked i forvejen. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Uplanlagt opgradering",
          text: "Foretag hurtig opgradering uden varsel – spar tid, men risikér utilfredshed. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemgå kontrakter og licenser for netudstyret.",
        choiceA: {
          label: "Omfattende juridisk revision",
          text: "Få en detaljeret gennemgang for at sikre compliance. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard metode",
          text: "Brug en standardmetode, som er hurtigere, men kan have mangler. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér netopgraderingen detaljeret.",
        choiceA: {
          label: "Fuld dokumentation",
          text: "Udarbejd en udførlig rapport, der dækker alle ændringer. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort rapport",
          text: "Spar tid ved kun at notere de vigtigste ændringer, men øg CAB-skepsis. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Sikkerhedsforbedring af Infrastruktur",
    shortDesc: "Opgrader netværkssikkerheden for at modvirke hackere og datasvindel.",
    logicLong: "Med stigende cybertrusler er det nødvendigt at styrke infrastrukturens sikkerhed. Denne opgave fokuserer på at installere avancerede sikkerhedsprotokoller og beskytte netværksudstyret mod angreb.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Opgrader netværkssikkerheden med ny hardware.",
        choiceA: {
          label: "Avanceret hardware",
          text: "Invester i moderne sikkerhedshardware, der giver robust beskyttelse. (+3 tid, -200 kr; giver +3 Sikkerhed)",
          applyEffect: { timeCost: 3, moneyCost: 200, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Opgrader eksisterende",
          text: "Opgrader den nuværende hardware med softwareopdateringer. (+1 tid, -80 kr; giver +1 Sikkerhed, men +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 80, riskyPlus: 0.05, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informer laboratoriet om de nye sikkerhedsforanstaltninger.",
        choiceA: {
          label: "Detaljeret præsentation",
          text: "Hold en præsentation for at informere og berolige personalet. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "Giv en kort briefing, men risikér misforståelser. (0 tid; -5 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -5 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Revurder sikkerhedspolitikker og kontrakter.",
        choiceA: {
          label: "Juridisk revision",
          text: "Få en detaljeret gennemgang af sikkerhedspolitikkerne. (+2 tid, -100 kr; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Standard opdatering",
          text: "Brug en hurtig opdatering, men med en lille juridisk risiko. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér sikkerhedsopgraderingerne.",
        choiceA: {
          label: "Fuld rapport",
          text: "Udarbejd en grundig dokumentation for at reducere CAB-skepsis. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kort for at spare tid, men øg risikoen. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Datacenter Opgradering",
    shortDesc: "Modernisér datacenteret for optimal drift og robust backup.",
    logicLong: "Datacenterets infrastruktur er forældet, hvilket fører til ustabil drift og forlængede svartider. Dette projekt fokuserer på en fuld opgradering af hardware og netværk, hvor planlægning, juridisk gennemgang og dokumentation er essentielle for at sikre en stabil fremtid.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér flaskehalse i datacenteret.",
        choiceA: {
          label: "Detaljeret analyse",
          text: "Udfør en komplet evaluering af datacentret for at identificere alle svagheder. (+3 tid, -150 kr; giver +3 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Hurtig analyse",
          text: "Lav en overfladisk evaluering for at spare tid, men med risiko for oversete problemer. (+1 tid, -50 kr; giver +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med driften for nedetid og planlægning.",
        choiceA: {
          label: "Planlagt vedligeholdelse",
          text: "Koordiner et detaljeret servicevindue med hospitalets driftschef. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig reboot",
          text: "Genstart systemet hurtigt for at minimere omkostninger, men risiko for utilfredshed. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Få juridisk rådgivning vedrørende udskiftning af datacenterkomponenter.",
        choiceA: {
          label: "Omfattende revision",
          text: "Få en juridisk ekspert til at gennemgå nye kontrakter og licenser. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard opdatering",
          text: "Brug en standard metode for hurtig implementering. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér alle ændringer i datacenteret grundigt.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "Skriv en fyldestgørende rapport for at minimere fremtidig CAB-skepsis. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kun de væsentligste ændringer for at spare tid, men øg risiko. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Reduktion af Strømforbrug",
    shortDesc: "Optimer kølesystemet for at spare energi og penge.",
    logicLong: "Med stigende energiomkostninger er det afgørende at reducere strømforbruget i datacenteret. Projektet fokuserer på at modernisere kølesystemet, udskifte ineffektive PSU'er og sikre, at den nye løsning overholder de nyeste standarder.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser det nuværende strømforbrug og ineffektivt udstyr.",
        choiceA: {
          label: "Detaljeret energianalyse",
          text: "Gennemfør en grundig analyse for at identificere svage punkter. (+3 tid, -150 kr; giver +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "Lav en overfladisk energianalyse for at spare tid. (+1 tid, -50 kr; giver +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informér driftsteamet om de planlagte ændringer.",
        choiceA: {
          label: "Detaljeret briefing",
          text: "Koordiner med hospitalets drift for at minimere nedetid. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort meddelelse",
          text: "Gør det hurtigt, men risikér manglende forberedelse. (0 tid; -5 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -5 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemgå kontrakter og garantier for det nye kølesystem.",
        choiceA: {
          label: "Ekstern juridisk rådgivning",
          text: "Få en ekspert til at sikre, at alle garantier er i orden. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard opdatering",
          text: "Brug en standard metode for hurtig implementering. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport over energibesparelserne.",
        choiceA: {
          label: "Fyldestgørende rapport",
          text: "Dokumentér alle detaljer for at sikre fuld transparens. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kun de mest væsentlige punkter, men øg CAB-risiko. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Implementering af Virtualisering",
    shortDesc: "Moderniser systemet med virtualisering for bedre ressourceudnyttelse.",
    logicLong: "Med virtualisering kan du samle flere systemer på færre fysiske servere, hvilket øger fleksibiliteten og reducerer omkostninger. Dette projekt kræver en omhyggelig planlægning, juridisk gennemgang og en solid dokumentation for at sikre, at systemerne kører optimalt.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vurder den nuværende serverkapacitet og virtualiseringspotentiale.",
        choiceA: {
          label: "Detaljeret kapacitetsanalyse",
          text: "Gennemfør en omfattende analyse for at udnytte ressourcerne optimalt. (+3 tid, -150 kr; giver +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "Lav en hurtig overfladeanalyse, men risikér at overse vigtige detaljer. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med hospitalet for at planlægge minimal driftforstyrrelse.",
        choiceA: {
          label: "Planlagt implementering",
          text: "Koordiner et intensivt servicevindue, så alle er forberedte. (+2 tid; +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig overgang",
          text: "Gør det hurtigt, men risikér kortvarige forstyrrelser. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Sørg for, at virtualiseringstjenesterne er dækket af kontrakter.",
        choiceA: {
          label: "Omfattende kontraktrevision",
          text: "Få en ekspert til at gennemgå alle juridiske dokumenter. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "Brug en standard kontrakt, der sparer tid, men med en lille risiko. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér virtualiseringsmiljøet detaljeret.",
        choiceA: {
          label: "Detaljeret rapport",
          text: "Udarbejd en fyldestgørende guide for alle ændringer. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Spar tid ved kun at notere det væsentlige, men øg risikoen. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Opgradering af Netværksudstyr",
    shortDesc: "Udskift forældet netværksudstyr for at øge hastigheden.",
    logicLong: "Forældet netværksudstyr reducerer hastigheden og øger risikoen for nedbrud. Denne opgave dækker en systematisk opgradering af switches, routere og kabler med fokus på både ydeevne og sikkerhed.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Inventariser det eksisterende udstyr og identificér flaskehalse.",
        choiceA: {
          label: "Detaljeret inventar",
          text: "Udfør en omfattende gennemgang for at planlægge den rigtige investering. (+3 tid, -150 kr; giver +3 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "Spar tid ved at fokusere på de mest åbenlyse problemer, men risikér at overse kritiske aspekter. (+1 tid, -50 kr; giver +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg opgraderingens nedetid med hospitalets input.",
        choiceA: {
          label: "Koordineret plan",
          text: "Arranger en opgradering uden store forstyrrelser. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig opgradering",
          text: "Gør det hurtigt, men uden tilstrækkelig varsling. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemgå netværkskontrakter for nye udstyr.",
        choiceA: {
          label: "Detaljeret juridisk gennemgang",
          text: "Sørg for, at alle licenser og garantier er i orden. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "Brug standardiserede kontrakter for at spare tid, men med en lille risiko. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd en rapport over netværksudstyrsudskiftningen.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "Skriv en detaljeret rapport, der minimerer CAB-skepsis. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kun det væsentlige, men øg risikoen en smule. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Modernisering af Backup-Løsningen",
    shortDesc: "Opgrader backup-systemet for at sikre dataintegritet.",
    logicLong: "Det nuværende backup-system er forældet og kan medføre datatab. Denne opgave involverer implementering af et redundant backup-system, en omfattende testplan og en detaljeret rapport for at minimere risikoen for tab af kritiske data.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Evaluer den nuværende backup-infrastruktur.",
        choiceA: {
          label: "Fuld evaluering",
          text: "Udfør en dybdegående analyse for at finde alle svagheder. (+3 tid, -150 kr; giver +3 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "Lav en hurtig analyse for at spare tid, men risikér at overse kritiske fejl. (+1 tid, -50 kr; giver +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Informér personalet om backup-planen.",
        choiceA: {
          label: "Detaljeret briefing",
          text: "Hold en session med personalet for at sikre, at alle er forberedte. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort briefing",
          text: "Giv en hurtig besked, men risikér misforståelser. (0 tid; -5 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -5 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemgå backup-kontrakter og garantier.",
        choiceA: {
          label: "Omfattende revision",
          text: "Få juridisk rådgivning om backup-kontrakterne. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "Brug en standard løsning, som sparer tid, men kan være mindre robust. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér backup-opgraderingen",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "Udarbejd en fuld rapport, der dokumenterer alle ændringer. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér hovedpunkterne, men risikér ekstra CAB-skepsis. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Forbedring af Dataoverførselshastighed",
    shortDesc: "Optimer netværkets hastighed for hurtigere dataoverførsel.",
    logicLong: "I et travlt hospitalsmiljø er hurtig dataoverførsel afgørende. Denne opgave fokuserer på at justere netværksprotokoller og udskifte forældet udstyr for at forbedre gennemstrømningen og reducere forsinkelser i dataoverførsler.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Identificér flaskehalse i netværket.",
        choiceA: {
          label: "Detaljeret hastighedstest",
          text: "Udfør omfattende tests for at identificere præcist, hvor problemerne ligger. (+3 tid, -150 kr; giver +3 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 3 } }
        },
        choiceB: {
          label: "Hurtig test",
          text: "Udfør en hurtig hastighedstest, men risikér at overse vigtige detaljer. (+1 tid, -50 kr; +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg en opgradering med minimalt driftsstab.",
        choiceA: {
          label: "Koordineret plan",
          text: "Arranger et servicevindue med hospitalet, så der ikke opstår forsinkelser i dataoverførsler. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Hurtig opgradering",
          text: "Gør det hurtigt, men uden tilstrækkelig koordinering. (0 tid; -10 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -10 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Gennemgå netværkskontrakter for dataoverførselsudstyr.",
        choiceA: {
          label: "Juridisk kontrol",
          text: "Få en detaljeret gennemgang af kontrakterne. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "Brug standardkontrakter, der er hurtigere, men med en lille risiko. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér dataoverførselsforbedringerne",
        choiceA: {
          label: "Fuld dokumentation",
          text: "Udarbejd en detaljeret rapport, så CAB har fuld indsigt. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Spar tid ved kort dokumentation, men øg risikoen en smule. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  },
  {
    title: "Integration af Cloud-Løsninger",
    shortDesc: "Integrér cloud-teknologi i den eksisterende infrastruktur.",
    logicLong: "For at opnå fleksibilitet og skalerbarhed skal den fysiske infrastruktur suppleres med cloud-tjenester. Denne opgave fokuserer på at integrere en hybrid løsning, som kræver nøje planlægning, juridisk godkendelse og dokumentation af alle nye systemintegrationer.",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser mulighederne for cloud-integration.",
        choiceA: {
          label: "Omfattende analyse",
          text: "Få en dybdegående evaluering af, hvordan cloud kan supplere den eksisterende infrastruktur. (+3 tid, -150 kr; giver +2 Stabilitet)",
          applyEffect: { timeCost: 3, moneyCost: 150, statChange: { stability: 2 } }
        },
        choiceB: {
          label: "Hurtig vurdering",
          text: "Lav en hurtig vurdering for at spare tid, men med risiko for oversete integrationer. (+1 tid, -50 kr; giver +1 Stabilitet, +5% risiko)",
          applyEffect: { timeCost: 1, moneyCost: 50, riskyPlus: 0.05, statChange: { stability: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Koordiner med hospitalet om de nye cloud-funktioner.",
        choiceA: {
          label: "Detaljeret briefing",
          text: "Arranger en workshop med hospitalets IT-ansvarlige for at sikre, at alle forstår de nye muligheder. (+2 tid; giver +2 Hospitalstilfredshed)",
          applyEffect: { timeCost: 2, statChange: { hospitalSatisfaction: 2 } }
        },
        choiceB: {
          label: "Kort meddelelse",
          text: "Giv en hurtig besked, men risikér misforståelser. (0 tid; -5 Hospitalstilfredshed, +5% risiko)",
          applyEffect: { statChange: { hospitalSatisfaction: -5 }, riskyPlus: 0.05 }
        }
      },
      {
        location: "it-jura",
        stepDescription: "Tjek kontrakter og databeskyttelsesaftaler for cloud-tjenester.",
        choiceA: {
          label: "Juridisk revision",
          text: "Få eksterne eksperter til at sikre, at alle kontrakter er dækkende og compliant. (+2 tid, -100 kr; giver +1 Sikkerhed)",
          applyEffect: { timeCost: 2, moneyCost: 100, statChange: { security: 1 } }
        },
        choiceB: {
          label: "Standard løsning",
          text: "Brug standardiserede kontrakter og spar tid, men med en lille risiko. (+1 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { timeCost: 1, riskyPlus: 0.05, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér cloud-integrationen",
        choiceA: {
          label: "Fuld dokumentation",
          text: "Udarbejd en detaljeret teknisk rapport for den nye hybridløsning. (+2 tid; giver +1 Stabilitet)",
          applyEffect: { timeCost: 2, statChange: { stability: 1 } }
        },
        choiceB: {
          label: "Kort notits",
          text: "Dokumentér kun de væsentligste ændringer for at spare tid, men øg risikoen. (0 tid; +5% risiko, +1 Udvikling)",
          applyEffect: { riskyPlus: 0.05, statChange: { development: 1 } }
        }
      }
    ]
  }
];
