/**********************************************************
 * main.js
 * 
 * A single-file Phaser 3 setup with two scenes:
 *   1) MainScene: Player movement, dummy sprite creation,
 *      and task generation
 *   2) UIScene: Displays tasks in an overlay
 * 
 * This order ensures no "Cannot access 'MainScene' before 
 * initialization" errors occur.
 **********************************************************/

// ---------------------------
// GLOBAL TASKS & UTILITIES
// ---------------------------

// A global array to hold tasks
window.globalTasks = [];

/**
 * Creates a random task object (example only).
 */
function createRandomTask() {
  const dummyTasks = [
    'LIMS not syncing lab results (CRITICAL)',
    'Vendor proposes EHR upgrade (CAB approval needed)',
    'Hospital requests urgent troubleshooting on lab server',
    'Check SLA compliance for patch rollout',
    'Handle escalated ticket from frontline support'
  ];
  const randomIndex = Math.floor(Math.random() * dummyTasks.length);

  return {
    id: Date.now(),
    description: dummyTasks[randomIndex],
    status: 'New'
  };
}

/**
 * Marks a specific task as done.
 */
function completeTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Done';
  }
}

// ---------------------------
// MAIN SCENE
// ---------------------------
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Create a dummy player sprite (64x64)
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    // Body (blue)
    pctx.fillStyle = '#0000ff';
    pctx.fillRect(16, 16, 32, 32);
    // Head (red)
    pctx.fillStyle = '#ff0000';
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Create a dummy vendor sprite (32x32)
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();
  }

  create() {
    // Create the player
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Example vendor sprite
    this.vendor = this.physics.add.staticSprite(200, 200, 'vendor_dummy');

    // Set up cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Detect overlap with vendor
    this.physics.add.overlap(
      this.player,
      this.vendor,
      this.handleVendorOverlap,
      null,
      this
    );

    // Generate random tasks periodically
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        const task = createRandomTask();
        window.globalTasks.push(task);
        console.log('New Task Generated:', task.description);
      },
      loop: true
    });

    // Launch the UI scene
    this.scene.launch('UIScene');
  }

  update() {
    // Simple top-down movement
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }

  // Example vendor overlap callback
  handleVendorOverlap() {
    // Could open a vendor UI or do SLA checks
    console.log('Player overlapped with vendor. Possible vendor interaction...');
  }
}

// ---------------------------
// UI SCENE
// ---------------------------
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: false });
  }

  create() {
    // Instructions text
    this.instructionsText = this.add.text(10, 10, 
      'Use arrow keys to move the player.\nTasks appear below.\nClick a task to mark as "Done".',
      { fontSize: '16px', fill: '#000' }
    );

    // Array to hold references to task text objects
    this.taskTexts = [];

    // Refresh the task list every 500ms
    this.time.addEvent({
      delay: 500,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  refreshTaskList() {
    // Clear old text objects
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    const startY = 60;
    const lineHeight = 20;

    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const textObj = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description}`,
        {
          fontSize: '14px',
          fill: '#333',
          backgroundColor: '#fff',
          padding: { x: 4, y: 2 }
        }
      );

      textObj.setInteractive({ useHandCursor: true });
      textObj.on('pointerdown', () => {
        // Mark task as done
        completeTask(task.id);
      });

      this.taskTexts.push(textObj);
    });
  }
}

// ---------------------------
// PHASER CONFIG & GAME INIT
// ---------------------------
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { 
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ MainScene, UIScene ]
};

// Create the Phaser game
new Phaser.Game(config);
