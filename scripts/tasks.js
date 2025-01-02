// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10;

/**
 * We define multiple "step sets" so tasks differ.
 * Each set: steps[], explanations[] (why each step is important).
 */
const STEP_SETS = [
  {
    steps: [
      'Visit Vendor (EHR) for info',
      'Check Hospital staff availability',
      'Secure Infra resources (servers)',
      'CAB approval for EHR upgrade',
      'Gather everyone for final EHR deployment'
    ],
    explanations: [
      'Why vendor? They must confirm EHR specs.',
      'Why hospital? Scheduling staff for downtime is critical.',
      'Why infra? Additional servers or networking needed for an upgrade.',
      'Why CAB? Formal approval to ensure compliance and risk mitigation.',
      'Why gather? Final rollout requires everyone’s participation.'
    ]
  },
  {
    steps: [
      'Vendor discussion (LIMS patch)',
      'Hospital lab confirmation',
      'Check infrastructure readiness',
      'CAB sign-off on LIMS patch',
      'Gather everyone for evening patch deployment'
    ],
    explanations: [
      'Why vendor? They provide the patch for LIMS.',
      'Why hospital lab? They must know downtime times for lab tests.',
      'Why infra? The patch may need server restarts or database expansions.',
      'Why CAB? Must follow change management for critical lab software.',
      'Why gather? All teams must be coordinated for final patch install.'
    ]
  },
  {
    steps: [
      'External security vendor consultation',
      'Hospital security team alignment',
      'Network/infrastructure hardening',
      'CAB approval for security changes',
      'Gather all teams to finalize security fix'
    ],
    explanations: [
      'Why external vendor? They manage advanced security solutions.',
      'Why hospital security? They enforce policies and handle local compliance.',
      'Why network infra? Must close vulnerabilities at the network/hardware level.',
      'Why CAB? Approvals ensure official sign-off and minimal operational impact.',
      'Why gather? Coordinated deployment prevents conflicting changes.'
    ]
  },
  {
    steps: [
      'Vendor talk (Infrastructure upgrade)',
      'Hospital scheduling for potential downtime',
      'Infrastructure capacity planning',
      'CAB meeting for infrastructure change',
      'Gather staff for final infra rollout'
    ],
    explanations: [
      'Why vendor? Possibly new hardware or third-party service details.',
      'Why hospital? Must align downtime with operational schedules.',
      'Why capacity planning? Upgrades can require additional memory or disk.',
      'Why CAB? Need a formal approach for big infrastructure changes.',
      'Why gather? Everyone should be on deck for final upgrade steps.'
    ]
  }
];

/**
 * Creates a random new task with:
 * - A random step set
 * - A random "likelihood" (1..5), "consequence" (1..5)
 * => risk = likelihood * consequence
 */
function createRandomTask() {
  // Pick a step set
  const randomSet = Phaser.Math.RND.pick(STEP_SETS);

  // Clone steps & explanations
  const steps = [...randomSet.steps];
  const explanations = [...randomSet.explanations];

  // Random risk rating
  const likelihood = Phaser.Math.Between(1, 5);
  const consequence = Phaser.Math.Between(1, 5);
  const riskScore = likelihood * consequence;

  return {
    id: Date.now(),
    description: pickRandomDescription(),
    status: 'New',
    currentStep: 0,
    steps,
    educationalExplanations: explanations,
    priority: 'Unassigned',
    committed: false,
    // New risk fields
    likelihood,
    consequence,
    risk: riskScore
  };
}

/**
 * We pick a short description separately from step sets for variety.
 */
function pickRandomDescription() {
  const descOptions = [
    'EHR system upgrade needed',
    'Critical LIMS patch rollout',
    'Security fix for hospital network',
    'Infrastructure maintenance request',
    'Important OS update for servers',
    'Database performance fix needed'
  ];
  return Phaser.Math.RND.pick(descOptions);
}

function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task && task.currentStep >= task.steps.length) {
    task.status = 'Done';
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

/**
 * The player explicitly commits to solving this task:
 * 1) Mark it "committed"
 * 2) If status=New, set status=In Progress
 * 3) If it's the highest risk among all tasks, add 2 points
 */
function commitToTask(taskId) {
  const task = getTaskById(taskId);
  if (task) {
    task.committed = true;
    if (task.status === 'New') {
      task.status = 'In Progress';
    }

    // Check if this is the highest risk among all tasks
    const maxRisk = Math.max(...window.globalTasks.map(t => t.risk));
    if (task.risk === maxRisk) {
      window.playerScore += 2;
      console.log(`Bonus! You picked the highest risk task. +2 points. Score=${window.playerScore}`);
    }
  }
}

/**
 * Utility to pick a random item from an array (used by pickRandomDescription).
 */
function pickRandom(arr) {
  return arr[Phaser.Math.Between(0, arr.length - 1)];
}
