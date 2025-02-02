/************************************************************
 * itGlossary.js – Fælles ordbog med både IT-begreber
 * fra dine tasks og SAFe-begreber (Scaled Agile Framework).
 ************************************************************/

window.itGlossary = {
  // *** IT-BEGREBER (fra hospital/cyber/infrastruktur) ***

  "CAB": "CAB (Change Advisory Board): godkender/afviser planlagte ændringer og vurderer risiko og dokumentation.",
  "CE-mærkning": "CE-mærkning: EU’s sikkerheds- og kvalitetsmærke, fx for medicoteknisk udstyr.",
  "Cloud-løsninger": "Cloud-løsninger: IT-ressourcer leveres eksternt og skaleres efter behov (f.eks. IaaS, PaaS, SaaS).",
  "Digital booking": "Brug af elektronisk system til tidsbestilling, mindsker fejl og ventetider i patientbehandling.",
  "Failover": "En metode, hvor et backup-system automatisk overtager drift ved nedbrud af primær system.",
  "Firewall": "Software/hardware der filtrerer netværkstrafik for at blokere ondsindede forbindelser.",
  "IDS": "Intrusion Detection System: Overvåger netværk/hosts for mistænkelig aktivitet og advarer ved angreb.",
  "LIMS": "Laboratory Information Management System: Håndterer laboratorieprøver, analyser og resultater.",
  "MFA": "Multi-Factor Authentication: Kræver flere login-faktorer (fx password + engangskode) for øget sikkerhed.",
  "Patch management": "Proces for løbende at opdatere software for at lukke kendte sårbarheder og fejl.",
  "Phishing": "Ondsindede mails/hjemmesider, der forsøger at narre brugere til at afgive følsomme oplysninger.",
  "Ransomware": "Malware der krypterer filer og kræver løsesum for at frigive dem.",
  "SIEM": "Security Information and Event Management: Samler logs og analyserer for unormal adfærd.",
  "Telemedicin": "Fjernmonitorering/-behandling af patienter via video, apps eller online‑opfølgning.",
  "Triage": "Metode til at vurdere og prioritere patienter efter deres behandlingsbehov.",
  "Virtualisering": "At køre flere virtuelle maskiner på én fysisk server for bedre ressourceudnyttelse.",
  
  // *** SAFe-BEGREBER (Scaled Agile Framework) ***
  
  "SAFe": "Scaled Agile Framework: En metode til at skalere agile principper i store organisationer.",
  "ART": "Agile Release Train: Et team-af-teams, der leverer løbende værdi inden for SAFe.",
  "PI": "Program Increment: En tidsboks (typisk 8-12 uger) i SAFe, hvor ART-planlægning og leverancer koordineres.",
  "Iteration": "En kort, gentagen tidsboks (sprint) hvor teams bygger og tester inkrementer af værdi.",
  "WSJF": "Weighted Shortest Job First: Prioriteringsteknik i SAFe, der balancerer nytte, hastighed og risiko.",
  "Scrum Master": "Rolle, der guider teamet i agile principper, fjerner blokeringer og faciliterer processer.",
  "Product Owner": "Rolle med ansvar for backlog, prioritering, krav og repræsenterer forretningsbehov.",
  "Release Train Engineer": "RTE: 'Chef Scrum Master' for hele ART, der koordinerer flere teams og fjerner blokeringer.",
  "Feature (SAFe)": "En tjeneste eller produktfunktion med værdi for slutbrugeren, leveret inden for et PI.",
  "Enabler": "En teknisk eller arkitektonisk opgave, der muliggør fremtidige funktioner eller forbedrer teknisk infrastruktur.",
  "Program Kanban": "Et tavle-/workflow-system i SAFe til at styre features fra idé til implementering.",
  "Backlog": "Liste over opgaver/funktioner, som prioriteres og planlægges i iterationer/PI’er.",
  "User Story": "Beskrivelse af funktion set fra en brugers synsvinkel, i formatet 'Som [rolle] vil jeg...'."
};

/**
 * showGlossaryForTask() – viser kun ordforklaringer, der
 * er relevante for den aktuelle opgave. Opgaven skal have
 * fx `glossaryTerms: ["VPN","Scrum Master",...]`.
 */
function showGlossaryForTask(){
  if(!window.gameState || !window.gameState.activeTask){
    alert("Ingen aktiv opgave valgt – ingen ordforklaringer lige nu.");
    return;
  }
  let task = window.gameState.activeTask;
  if(!task.glossaryTerms || !task.glossaryTerms.length){
    alert("Denne opgave har ingen tilknyttede IT-begreber i ordbogen.");
    return;
  }

  let text = "<h2>IT Ordbog for denne opgave</h2><ul>";
  let foundAny = false;
  
  task.glossaryTerms.forEach(term => {
    let definition = window.itGlossary[term];
    if(definition){
      foundAny = true;
      text += `<li><strong>${term}:</strong> ${definition}</li>`;
    }
  });

  text += "</ul>";
  if(!foundAny){
    text = "<p>Ingen matchende termer fra ordbogen for denne opgave.</p>";
  }

  // Hvis main.js har showMoreInfo(...) => vis i modal
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    // fallback
    alert(text);
  }
}
