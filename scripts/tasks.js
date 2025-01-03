// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10;

// A scoreboard for completed tasks by giver
window.giverScoreboard = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0,
  cybersecurity: 0
};

// Potential givers
const TASK_GIVERS = [ 'hospital', 'infrastructure', 'informationSecurity', 'cybersecurity' ];

/**
 * Step sets for short/medium/long tasks. Some have "gather," some do not.
 * We won't use any triple-dot syntax here.
 */
const STEP_SETS = {
  short: [
    [
      { text: 'Quick fix from Vendor side', keyword: 'vendor', explanation: 'Vendor patch' },
      { text: 'CAB approval (minimal)', keyword: 'cab', explanation: 'Even small changes need tracking' }
    ],
    [
      { text: 'Hospital minor check', keyword: 'hospital', explanation: 'Small request from hospital' },
      { text: 'InfoSec logs quick review', keyword: 'informationSecurity', explanation: 'Brief security check' }
    ]
  ],
  medium: [
    [
      { text: 'Infrastructure tweak request', keyword: 'infrastructure', explanation: 'Moderate resource changes' },
      { text: 'CAB sign-off for mid-change', keyword: 'cab', explanation: 'Formal sign-off' },
      { text: 'Gather staff for final implement', keyword: 'gather', explanation: 'Coordinate final steps' }
    ],
    [
      { text: 'Hospital partial downtime fix', keyword: 'hospital', explanation: 'Mid-level fix for hospital' },
      { text: 'Cybersecurity verification', keyword: 'cybersecurity', explanation: 'Ensure compliance with security standards' },
      { text: 'No gather step—done', keyword: 'cab', explanation: 'CAB final note' }
    ]
  ],
  long: [
    [
      { text: 'Vendor big upgrade', keyword: 'vendor', explanation: 'Large-scale vendor changes' },
      { text: 'Hospital staff scheduling', keyword: 'hospital', explanation: 'Major downtime window' },
      { text: 'Infrastructure capacity plan', keyword: 'infrastructure', explanation: 'Need more resources' },
      { text: 'CAB sign-off (major)', keyword: 'cab', explanation: 'Formal compliance' },
      { text: 'Gather everyone for final rollout', keyword: 'gather', explanation: 'All teams must coordinate' }
    ],
    [
      { text: 'InformationSecurity thorough check', keyword: 'informationSecurity', explanation: 'Critical security review' },
      { text: 'Vendor patch for LIMS', keyword: 'vendor', explanation: 'Large vendor patch' },
      { text: 'CAB sign-off (big patch)', keyword: 'cab', explanation: 'Must be documented' },
      { text: 'Infrastructure readiness check', keyword: 'infrastructure', explanation: 'Resources for big patch' },
      { text: 'Gather final team for deployment', keyword: 'gather', explanation: 'Final step' }
    ]
  ]
};

/** Creates a random new task */
function createRandomTask() {
  // short(2 steps), medium(3 steps), or long(5 steps)
  const sizeRoll = Phaser.Math.Between(1, 10);
  let sizeKey = 'short';
  if (sizeRoll <= 4) sizeKey = 'short';
  else if (sizeRoll <= 7) sizeKey = 'medium';
  else sizeKey = 'long';

  // pick random set from that category
  const baseSets = STEP_SETS[sizeKey];
  const chosen = Phaser.Math.RND.pick(baseSets);

  // Create a copy of chosen steps without triple-dot
  let steps = [];
  for (let i = 0; i < chosen.length; i++) {
    steps.push({
      text: chosen[i].text,
      keyword: chosen[i].keyword,
      explanation: chosen[i].explanation
    });
  }

  // 50% chance isFeature => add "legal" step after vendor
  const isFeature = (Phaser.Math.Between(1,2) === 2);
  let vendorIndex = -1;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].keyword === 'vendor') {
      vendorIndex = i;
      break;
    }
  }
  if (isFeature && vendorIndex >= 0) {
    steps.splice(vendorIndex+1, 0, {
      text: 'Visit Legal for vendor contract',
      keyword: 'legal',
      explanation: 'New features => updated contract'
    });
  }

  // 30% chance to insert InfoSec step if steps>1
  if (Phaser.Math.Between(1,10) <= 3 && steps.length>1) {
    steps.splice(1,0,{
      text:'Check with InfoSec about new regs',
      keyword:'informationSecurity',
      explanation:'Ensure compliance with updated laws'
    });
  }

  // Convert steps to separate arrays
  let stepTexts = [];
  let stepExplanations = [];
  let stepKeywords = [];
  for (let j=0; j<steps.length; j++) {
    stepTexts.push(steps[j].text);
    stepExplanations.push(steps[j].explanation);
    stepKeywords.push(steps[j].keyword);
  }

  // random risk
  const likelihood = Phaser.Math.Between(1,5);
  const consequence = Phaser.Math.Between(1,5);
  let baseRisk = likelihood * consequence;
  if (isFeature) baseRisk += 5;

  // pick random giver from 4
  const giver = Phaser.Math.RND.pick(TASK_GIVERS);

  const newTask = {
    id: Date.now(),
    description: pickRandomDescription(),
    status:'New',
    currentStep:0,
    steps: stepTexts,
    educationalExplanations: stepExplanations,
    stepKeywords: stepKeywords,
    priority:'Unassigned',
    committed:false,
    likelihood,
    consequence,
    risk: baseRisk,
    isFeature,
    finalStepCount: stepTexts.length,
    giver
  };
  return newTask;
}

function pickRandomDescription() {
  const descOptions = [
    'Minor fix needed',
    'Medium-level security update',
    'Infrastructure tweak required',
    'EHR or LIMS update requested',
    'Performance optimization needed',
    'Compliance with new EU regs needed'
  ];
  return Phaser.Math.RND.pick(descOptions);
}

function commitToTask(taskId){
  const task = getTaskById(taskId);
  if(!task) return;
  task.committed=true;
  if(task.status==='New') task.status='In Progress';

  // Step-based bonus
  let sizeBonus=0;
  if(task.finalStepCount===2) sizeBonus=1; // short
  else if(task.finalStepCount<=4) sizeBonus=2; // 3 or 4 => medium
  else sizeBonus=3; // 5 => long
  if(task.isFeature) sizeBonus+=1; // feature => +1

  // If highest risk => +2
  let maxRisk=0;
  for(let i=0;i<window.globalTasks.length;i++){
    if(window.globalTasks[i].risk>maxRisk){
      maxRisk=window.globalTasks[i].risk;
    }
  }
  if(task.risk===maxRisk) sizeBonus+=2;

  window.playerScore+=sizeBonus;
}

function completeTask(taskId){
  const task=getTaskById(taskId);
  if(!task) return;
  if(task.currentStep>=task.steps.length){
    task.status='Done';
    // scoreboard
    if(task.giver && window.giverScoreboard[task.giver]!==undefined){
      window.giverScoreboard[task.giver]++;
    }
  }
}

function advanceTaskStep(taskId){
  const task=getTaskById(taskId);
  if(!task) return;
  if(task.currentStep<task.steps.length){
    task.currentStep++;
    if(task.currentStep>=task.steps.length){
      task.status='Ready to finalize';
    }
  }
}

function getTaskById(taskId){
  for(let i=0; i<window.globalTasks.length;i++){
    if(window.globalTasks[i].id===taskId){
      return window.globalTasks[i];
    }
  }
  return null;
}

function updateTaskPriority(taskId,newPriority){
  const task=getTaskById(taskId);
  if(task){
    task.priority=newPriority;
  }
}
