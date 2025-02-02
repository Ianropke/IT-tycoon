/************************************************************
 * itGlossary.js – Ordbog. Viser kun ord, der er relevant for 
 * den aktive opgave (baseret på fx “glossaryTerms” i opgaven).
 ************************************************************/

window.itGlossary = {
  "VPN": "VPN (Virtuel Privat Netværk): En krypteret tunnel for sikker kommunikation.",
  "MFA": "MFA (Multi-Factor Authentication): Kræver flere faktorer, fx password + engangskode.",
  "IDS": "IDS (Intrusion Detection System): Overvåger netværk for mistænkelig aktivitet.",
  "Firewall": "Firewall: Kontrollerer ind- og udgående trafik baseret på konfigurerede regler.",
  "Patch": "Patch: En softwareopdatering, der lukker huller eller retter fejl.",
  "Malware": "Malware: Ondsindet software (virus, trojan, ransomware osv.)",
  "Signature": "Signatur (antivirus): Et mønster for kendt malware, bruges til at genkende trusler.",
  "SIEM": "SIEM (Security Information and Event Management): Samler logs og finder unormal adfærd.",
  "GDPR": "GDPR: Databeskyttelsesregler i EU for behandling af personfølsomme data.",
  "Change Advisory Board": "CAB: Gruppe der godkender/afviser ændringer i IT-miljøet.",
  "Ransomware": "Ransomware: Krypterer data og kræver løsesum for at frigive nøglen.",
  "VLAN": "VLAN (Virtual LAN): Netværksopdeling for bedre sikkerhed og segmentering.",
  "Hypervisor": "Hypervisor: Softwarelag, der muliggør virtualisering af flere maskiner på én fysisk server.",
  // Tilføj flere begreber efter behov ...
};

/**
 * showGlossaryForTask() – Viser kun de ordforklaringer, 
 * der er relevante for den aktuelle opgave.
 */
function showGlossaryForTask(){
  // Tjek om der er en aktiv opgave 
  if(!window.gameState || !window.gameState.activeTask){
    alert("Ingen aktiv opgave – ingen ordforklaringer lige nu.");
    return;
  }

  let task = window.gameState.activeTask;
  // Vi antager, at opgaven evt. har "glossaryTerms: ['VPN','MFA',...]" 
  // i sin definition. 
  if(!task.glossaryTerms || !task.glossaryTerms.length){
    alert("Denne opgave har ingen specifikke IT-begreber i ordbogen.");
    return;
  }

  let text = "<h2>IT-Begreber for denne opgave</h2><ul>";
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
    text = "<p>Ingen matchende IT-ord i ordbogen for denne opgave.</p>";
  }

  // Brug showMoreInfo til at vise i en modal (hvis main.js har den)
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    // fallback
    alert(text);
  }
}
