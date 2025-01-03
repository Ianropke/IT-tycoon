// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10;

// We track how many tasks were completed for each giver
window.giverScoreboard = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0
};

/** 
 * Giver list (no vendor). 
 * "informationSecurity" can also give tasks (e.g., new EU regs).
 */
const TASK_GIVERS = [ 'hospital', 'infrastructure', 'informationSecurity' ];

/**
 * Short/medium/long step sets referencing possible locations:
 *   - 'vendor' location can still appear in steps if code calls for it,
 *     but they do NOT appear as a "giver" anymore.
 *   - 'informationSecurity' location might appear if we insert below.
 */
const STEP_SETS = {
  short: [
    [
      { text: 'Quick fix from Vendor side', keyword: 'vendor', explanation: 'Vendor part needs a small patch' },
      { text: 'Gather everyone for final quick fix', keyword: 'gather', explanation: 'Short tasks still need closure' }
    ],
    [
      { text: 'Check Hospital staff for minor issue', keyword: 'hospital', explanation: 'Hospital reported a small downtime window' },
      { text: 'Gather to finalize small fix', keyword: 'gather', explanation: 'Even a minor fix must be concluded' }
    ]
  ],
  medium: [
    [
      { text: 'Infrastructure check (medium)', keyword: 'infrastructure', explanation: 'See if resources suffice for this tweak' },
      { text: 'CAB approval for mid-level change', keyword: 'cab', explanation: 'All changes need sign-off to some extent' },
      { text: 'Gather for final implementation', keyword: 'gather', explanation: 'Coordinate final deployment' }
    ],
    [
      { text: 'Minor vendor patch for security', keyword: 'vendor', explanation: 'Vendor patch addresses moderate security hole' },
      { text: 'Hospital alignment (medium issue)', keyword: 'hospital', explanation: 'Hospital staff must confirm safe usage' },
      { text: 'Gather for final fix', keyword: 'gather', explanation: 'Put it in place at once' }
    ]
  ],
  long: [
    [
      { text: 'Vendor for big EHR upgrade', keyword: 'vendor', explanation: 'Large-scale changes from the vendor' },
      { text: 'Check Hospital staff availability', keyword: 'hospital', explanation: 'Need downtime scheduling' },
      { text: 'Secure Infra resources', keyword: 'infrastructure', explanation: 'Extra capacity for big EHR changes' },
      { text: 'CAB approval for large EHR', keyword: 'cab', explanation: 'Formal compliance for big changes' },
      { text: 'Gather everyone for final EHR rollout', keyword: 'gather', explanation: 'All teams must coordinate' }
    ],
    [
      { text: 'Major Vendor patch (LIMS)', keyword: 'vendor', explanation: 'Critical patch from vendor for LIMS' },
      { text: 'Hospital lab check', keyword: 'hospital', explanation: 'Lab staff must confirm downtime' },
      { text: 'Infrastructure readiness for LIMS', keyword: 'infrastructure', explanation: 'Servers or DB expansions needed' },
      { text: 'CAB sign-off on big LIMS patch', keyword: 'cab', explanation: 'Official process for critical software' },
      { text: 'Gather for final LIMS deployment', keyword: 'gather', explanation: 'Coordinated final step' }
    ]
  ]
};

/** 
 * We might randomly insert an "Information Security" step, e.g.:
 * "Review new EU regs with InfoSec" or "Check logs with InfoSec"
 */
function pickRandomInfoSecStep() {
  const candidates = [
    {
      text: 'Review new EU regs with InfoSec',
      keyword: 'informationSecurity',
      explanation: 'Regulatory compliance must be ensured'
    },
    {
      text: 'Check logs with InfoSec to ensure no suspicious activity',
      keyword: 'informationSecurity',
      explanation: 'Logs must be analyzed for potential breaches'
    }
  ];
  return Phaser.Math.RND.pick(candidates);
}

function pickRandomDescription() {
  const descOptions = [
    'Minor fix needed', 
    'Medium-level security update', 
    'Infrastructure tweak required', 
    'EHR or LIMS update requested', 
    'Performance optimization needed', 
    'New EU regulation compliance required'
  ];
  return Phaser.Math.RND.pick(descOptions);
}

function createRandomTask() {
  // Decide short (2), medium (3), or long (5)
  const sizeRoll = Phaser.Math.Between(1, 10);
  let sizeKey = 'short';
  if (sizeRoll <= 4) sizeKey = 'short';  // 40% short
  else if (sizeRoll <= 7) sizeKey = 'medium'; // 30% medium
  else sizeKey = 'long'; // 30% long

  // pick random step set from that size
  const baseSet = Phaser.Math.RND.pick(STEP_SETS[sizeKey]);
  let steps = baseSet.map(s => ({ ...s })); // clone

  const isFeature = (Phaser.Math.Between(1, 2) === 2); // 50% chance it's a feature

  // Insert "Legal" step after the first 'vendor' step if it's a feature
  const vendorIndex = steps.findIndex(x => x.keyword === 'vendor');
  if (isFeature && vendorIndex >= 0) {
    steps.splice(vendorIndex+1, 0, {
      text: 'Visit Legal to finalize vendor contract',
      keyword: 'legal',
      explanation: 'New features require updated vendor contracts or licensing.'
    });
  }

  // 30% chance to insert an InfoSec step after step #1 (if we have at least 2 steps)
  if (Phaser.Math.Between(1, 10) <= 3 && steps.length > 1) {
    const infoSecStep = pickRandomInfoSecStep();
    steps.splice(1, 0, infoSecStep);
  }

  // Convert to separate arrays for UI
  const stepTexts = steps.map(s => s.text);
  const stepExplanations = steps.map(s => s.explanation);
  const stepKeywords = steps.map(s => s.keyword);

  // risk
  const likelihood = Phaser.Math.Between(1, 5);
  const consequence = Phaser.Math.Between(1, 5);
  let baseRisk = likelihood * consequence;
  if (isFeature) baseRisk += 5;

  // Giver from the new array (no vendor)
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

    // Giver: hospital, infrastructure, or informationSecurity
    giver
  };
}

function commitToTask(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  task.committed = true;
  if (task.status === 'New') {
    task.status = 'In Progress';
  }

  // Step-based bonus
  let sizeBonus = 0;
  if (task.finalStepCount === 2) sizeBonus = 1; // short
  else if (task.finalStepCount <= 4) sizeBonus = 2; // 3 or 4 steps => medium-ish
  else sizeBonus = 3;  // 5 or more => large

  if (task.isFeature) sizeBonus += 1; // feature => +1

  // Highest risk => +2
  const maxRisk = Math.max(...window.globalTasks.map(t => t.risk));
  if (task.risk === maxRisk) sizeBonus += 2;

  window.playerScore += sizeBonus;
}

function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task && task.currentStep >= task.steps.length) {
    task.status = 'Done';
    // Increase scoreboard for that giver
    if (window.giverScoreboard[task.giver] !== undefined) {
      window.giverScoreboard[task.giver]++;
    }
  }
}

function advanceTaskStep(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  if (task.currentStep < task.steps.length) {
    task.currentStep++;
    if (task.currentStep >= task.steps.length) {
      task.status = 'Ready to finalize';
    }
  }
}

function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id === taskId);
}

function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority = newPriority;
  }
}
