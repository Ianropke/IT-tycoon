// vendor.js

function checkVendorSLA(task) {
  const SLA_TIME = 48 * 60 * 60 * 1000; // 48 hours
  const ageOfTask = Date.now() - task.id;

  if (ageOfTask > SLA_TIME) {
    console.log(`Task [${task.description}] is OVERDUE for vendor SLA.`);
  } else {
    console.log(`Task [${task.description}] is within SLA window.`);
  }
}

function openVendorUI(scene) {
  console.log('Vendor UI opened. Potential negotiations or SLA checks here...');
}
