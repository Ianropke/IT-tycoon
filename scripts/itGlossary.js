/************************************************************
 * itGlossary.js – Fungerende ordbog, der accepterer enten
 * gameState.activeTask eller gameState.selectedTask
 ************************************************************/

window.itGlossary = {
  "CAB": "Change Advisory Board: godkender/afviser planlagte ændringer baseret på risiko.",
  "Antivirus": "Software til at opdage og fjerne malware.",
  "Malware": "Ondsindet software som virus, trojan, ransomware.",
  "MFA": "Multi-Factor Authentication, kræver ekstra loginfaktorer.",
  // ... fortsæt med dine øvrige begreber ...
};

/**
 * showGlossaryForTask() – Tjekker om vi har en “activeTask”.
 * Hvis ikke, brug “selectedTask”. Vis glossary-ordene.
 */
function showGlossaryForTask(){
  console.log("== showGlossaryForTask ==");
  let chosenTask = null;

  // Har vi en aktiv opgave?
  if(gameState.activeTask){
    chosenTask = gameState.activeTask;
  } 
  // Ellers prøv selectedTask
  else if(gameState.selectedTask){
    chosenTask = gameState.selectedTask;
  }

  if(!chosenTask){
    alert("Ingen opgave fundet! Klik på en opgave i listen for at markere den, eller Forpligt en opgave.");
    return;
  }

  // Tjek om glossaryTerms findes på chosenTask
  if(!chosenTask.glossaryTerms || !chosenTask.glossaryTerms.length){
    alert(`Opgaven “${chosenTask.title}” har ingen ordbogsord (glossaryTerms).`);
    return;
  }

  // Byg HTML-liste
  let text= `<h2>IT Ordbog for '${chosenTask.title}'</h2><ul>`;
  let foundAny= false;

  chosenTask.glossaryTerms.forEach(term=>{
    let definition= window.itGlossary[term];
    if(definition){
      foundAny= true;
      text+= `<li><strong>${term}:</strong> ${definition}</li>`;
    }
  });
  text+= "</ul>";

  if(!foundAny){
    text= `<p>Ingen match i ordbogen for “${chosenTask.title}”.</p>`;
  }

  // Vis i en “Mere info”-modal 
  // forudsat “showMoreInfo(...)” i main.js
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    alert(text);
  }
}
