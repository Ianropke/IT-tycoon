// tasks.js

// Keep track of tasks, score, scoreboard
window.globalTasks = window.globalTasks || [];
window.playerScore = 10;
window.giverScoreboard = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0,
  cybersecurity: 0
};

/** Potential givers */
const TASK_GIVERS = [ 'hospital', 'infrastructure', 'informationSecurity', 'cybersecurity' ];

/** Short/medium/long step sets, some with no gather step */
const STEP_SETS = {
  short: [
    // 2-step sets, no "gather"
    [
      { text: 'Quick fix from Vendor side', keyword: 'vendor', explanation: 'Vendor patch' },
      { text: 'CAB approval for minimal change', keyword: 'cab', explanation: 'Official tracking needed' }
    ],
    [
      { text: 'Hospital minor check', keyword: 'hospital', explanation: 'Small request from hospital' },
      { text: 'InfoSec logs quick review', keyword: 'informationSecurity', explanation: 'Brief check for suspicious activity' }
    ]
  ],
  medium: [
    // 3-step sets (some have gather, some do not)
    [
      { text: 'Infrastructure tweak request', keyword: 'infrastructure', explanation: 'Moderate resource changes' },
      { text: 'CAB sign-off for mid-change', keyword: 'cab', explanation: 'Formal sign-off needed' },
      { text: 'Gather staff for final implement', keyword: 'gather', explanation: 'Coordinate final steps' }
    ],
    [
      { text: 'Hospital partial downtime fix', keyword: 'hospital', explanation: 'Mid-level fix for hospital' },
      { text: 'Cybersecurity verification', keyword: 'cybersecurity', explanation: 'Check if it meets security standards' },
      { text: 'No gather step here - done', keyword: 'cab', explanation: 'CAB final record but no gather needed' }
    ]
  ],
  long: [
    // 5-step sets
    [
      { text: 'Vendor big upgrade', keyword: 'vendor', explanation: 'Large-scale vendor changes' },
      { text: 'Hospital staff scheduling', keyword: 'hospital', explanation: 'Major downtime' },
      { text: 'Infrastructure capacity plan', keyword: 'infrastructure', explanation: 'Need more resources' },
      { text: 'CAB sign-off for major upgrade', keyword: 'cab', explanation: 'Formal compliance' },
      { text: 'Gather everyone for final rollout', keyword: 'gather', explanation: 'All teams must coordinate' }
    ],
    [
      { text: 'InformationSecurity thorough check', keyword: 'informationSecurity', explanation: 'Critical security review' },
      { text: 'Vendor patch for LIMS', keyword: 'vendor', explanation: 'Large vendor patch' },
      { text: 'CAB sign-off for big patch', keyword: 'cab', explanation: 'Must be documented' },
      { text: 'Infrastructure readiness check', keyword: 'infrastructure', explanation: 'Resources needed for large patch' },
      { text: 'Gather final team for deployment', keyword: 'gather', explanation: 'Coordinate final step' }
    ]
  ]
};

function pickRandom(arr) {
  return arr[Phaser.Math.Between(0, arr.length - 1)];
}

/** Possibly insert InfoSec or Legal steps. Then compute risk, etc. */
function createRandomTask() {
  // Decide short(2), medium(3), long(5)
  const sizeRoll = Phaser.Math.Between(1, 10);
  let sizeKey = 'short';
  if (sizeRoll <= 4) sizeKey = 'short'; // 40% short
  else if (sizeRoll <= 7) sizeKey = 'medium'; // 30% medium
  else sizeKey = 'long'; // 30% long

  const baseSet = Phaser.Math.RND.pick(STEP_SETS[sizeKey]);
  let steps = baseSet.map(s => ({ ...s }));
  
  // 50% chance it's a "feature" => add "legal" after vendor
  const isFeature = (Phaser.Math.Between(1,2) === 2);
  const vendorIndex = steps.findIndex(x => x.keyword === 'vendor');
  if (isFeature && vendorIndex >= 0) {
    steps.splice(vendorIndex+1, 0, {
      text: 'Visit Legal for vendor contract',
      keyword: 'legal',
      explanation: 'New features require updated vendor contract/licensing'
    });
  }

  // 30% chance to insert "check with InfoSec" or "review logs" if steps>1
  if (Phaser.Math.Between(1,10) <= 3 && steps.length>1) {
    // Insert after step #1
    steps.splice(1, 0, {
      text: 'Check with InfoSec about new regs',
      keyword: 'informationSecurity',
      explanation: 'Ensure compliance with updated laws'
    });
  }

  // Convert steps => text arrays
  const stepTexts = steps.map(s => s.text);
  const stepExplanations = steps.map(s => s.explanation);
  const stepKeywords = steps.map(s => s.keyword);

  // random risk
  const likelihood = Phaser.Math.Between(1,5);
  const consequence = Phaser.Math.Between(1,5);
  let baseRisk = likelihood * consequence;
  if (isFeature) baseRisk += 5;

  // pick random giver from 4
  const giver = Phaser.Math.RND.pick(TASK_GIVERS);

  return {
    id: Date.now(),
    description: pickRandomDescription(),
    status: 'New',
    currentStep: 0,
    steps: stepTexts,
    educationalExplanations: stepExplanations,
    stepKeywords,
    priority: 'Unassigned',
    committed: false,
    likelihood,
    consequence,
    risk: baseRisk,
    isFeature,
    finalStepCount: steps.length,
    giver
  };
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

function commitToTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  task.committed = true;
  if (task.status === 'New') task.status = 'In Progress';

  // Step-based bonus
  let sizeBonus = 0;
  if (task.finalStepCount===2) sizeBonus=1; // short
  else if (task.finalStepCount<=4) sizeBonus=2; // 3 or 4 => medium
  else sizeBonus=3; // 5+ => long
  if (task.isFeature) sizeBonus+=1; // feature => +1

  // If highest risk => +2
  const maxRisk = Math.max(...window.globalTasks.map(t=>t.risk));
  if (task.risk===maxRisk) sizeBonus+=2;

  window.playerScore += sizeBonus;
}

function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  if (task.currentStep >= task.steps.length) {
    task.status='Done';
    // increment scoreboard
    if (task.giver && window.giverScoreboard[task.giver]!==undefined) {
      window.giverScoreboard[task.giver]++;
    }
  }
}

function advanceTaskStep(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  if (task.currentStep<task.steps.length) {
    task.currentStep++;
    if (task.currentStep>=task.steps.length) {
      task.status='Ready to finalize';
    }
  }
}

function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id===taskId);
}

function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority=newPriority;
  }
}
  
