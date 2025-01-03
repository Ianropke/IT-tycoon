// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10;
window.giverScoreboard = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0
};

/** 
 * Possible givers: [ 'hospital', 'infrastructure', 'informationSecurity' ] 
 * (no vendor giver).
 */

/** 
 * Step sets for short, medium, long, just like before.
 * Some sets do not include 'gather' so those tasks won't require that step.
 */
const STEP_SETS = {
  short: [
    [
      { text: 'Quick fix from Vendor side', keyword: 'vendor', explanation: 'Vendor part needs a small patch' },
      { text: 'CAB approval for minimal change', keyword: 'cab', explanation: 'Even small changes require official tracking' }
      // No "gather" here => does not require gather
    ],
    [
      { text: 'Hospital minor check', keyword: 'hospital', explanation: 'Small issue at the hospital' },
      { text: 'Information Security logs review', keyword: 'informationSecurity', explanation: 'Check logs quickly for suspicious activity' }
      // No gather => short tasks
    ]
  ],
  medium: [
    [
      { text: 'Infrastructure tweak request', keyword: 'infrastructure', explanation: 'Moderate resource changes' },
      { text: 'CAB approval for mid-level change', keyword: 'cab', explanation: 'Formal sign-off needed' },
      { text: 'Gather staff for final implementation', keyword: 'gather', explanation: 'Coordinate final steps' }
    ],
    [
      { text: 'Hospital wants partial downtime fix', keyword: 'hospital', explanation: 'Moderate fix that affects hospital staff' },
      { text: 'InfoSec check on new EU regs', keyword: 'informationSecurity', explanation: 'Compliance with data laws' },
      { text: 'Gather everyone for final patch', keyword: 'gather', explanation: 'Need multi-team alignment' }
    ]
  ],
  long: [
    [
      { text: 'Vendor approach for big upgrade', keyword: 'vendor', explanation: 'Large-scale vendor changes' },
      { text: 'Hospital staff scheduling', keyword: 'hospital', explanation: 'Major downtime' },
      { text: 'Infrastructure capacity plan', keyword: 'infrastructure', explanation: 'Servers or DB expansions' },
      { text: 'CAB sign-off for major upgrade', keyword: 'cab', explanation: 'Formal compliance' },
      { text: 'Gather everyone for final rollout', keyword: 'gather', explanation: 'All teams must coordinate' }
    ],
    [
      { text: 'Information Security thorough review', keyword: 'informationSecurity', explanation: 'Critical security check' },
      { text: 'Vendor patch for LIMS', keyword: 'vendor', explanation: 'Huge patch from external vendor' },
      { text: 'CAB sign-off on major patch', keyword: 'cab', explanation: 'Must be documented and approved' },
      { text: 'Infrastructure readiness check', keyword: 'infrastructure', explanation: 'Resources needed for large patch' },
      { text: 'Gather final team for deployment', keyword: 'gather', explanation: 'Coordinate final step' }
    ]
  ]
};

// Code for random sets, random insertion of steps, risk, feature steps, etc. 
// (Same as previous versions)...

// The rest is unchanged. 
// We'll keep the createRandomTask, commitToTask, completeTask, etc. from previous code.
