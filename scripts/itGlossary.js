/************************************************************
 * itGlossary.js – Opdateret med flere cybersikkerhedsord.
 ************************************************************/

window.itGlossary = {
  // Fra tidligere
  "CAB": "Change Advisory Board: godkender/afviser planlagte IT-ændringer.",
  "Malware": "Ondsindet software (virus, trojan, ransomware osv.).",
  "Antivirus": "Software der beskytter systemer mod kendt malware via scanning.",
  "Signature": "Et mønster der identificerer en bestemt malware-variant.",
  "Phishing": "Angreb hvor brugere narres via falske mails/links til at afgive data.",
  "Ransomware": "Malware der krypterer filer og kræver løsesum.",
  "Backup": "En kopi af data til at gendanne systemer efter nedbrud eller angreb.",
  "MFA": "Multi-Factor Authentication: Ekstra loginlag, fx password + kode.",
  "Patch management": "Proces for løbende at opdatere software og lukke sårbarheder.",
  "SIEM": "Security Information & Event Management: Samler logs og finder unormal adfærd.",
  "IDS": "Intrusion Detection System: Overvåger netværk/servere for mistænkelig aktivitet.",
  "Firewall": "Filtrerer netværkstrafik og blokerer ondsindede forbindelser.",
  "Compliance": "At overholde lovkrav, licensaftaler og interne politikker (fx GDPR).",

  // Nye begreber
  "Penetrationstest": "En simuleret hacking-øvelse for at finde sårbarheder i systemer.",
  "Sårbarhedsscanning": "Automatisk scanning efter kendte svagheder i software og konfiguration.",
  "Encryption": "Kryptering af data, så det kun kan læses af autoriserede parter.",
  "Hypervisor": "Softwarelag der muliggør virtualisering af flere maskiner på én fysisk server."
  // Du kan tilføje flere, hvis du vil
};

/**
 * Vis kun ordforklaringer for den aktive opgaves "glossaryTerms".
 */
function showGlossaryForTask(){
  if(!window.gameState || !window.gameState.activeTask){
    alert("Ingen aktiv opgave – ordbogen kræver en aktiv opgave!");
    return;
  }
  let task = window.gameState.activeTask;
  if(!task.glossaryTerms || !task.glossaryTerms.length){
    alert("Denne opgave har ingen definerede begreber i ordbogen.");
    return;
  }

  let text = `<h2>IT Ordbog for: '${task.title}'</h2><ul>`;
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
    text = "<p>Ingen matchende termer i itGlossary for denne opgave.</p>";
  }

  // Kald showMoreInfo(...) hvis main.js definerer den
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    alert(text);
  }
}
