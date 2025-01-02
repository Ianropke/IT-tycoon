// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Dummy player
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    pctx.fillStyle = '#0000ff';
    pctx.fillRect(16, 16, 32, 32);
    pctx.fillStyle = '#ff0000';
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Dummy vendor
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();

    // Hospital
    const hospCanvas = this.textures.createCanvas('hospital_dummy', 32, 32);
    const hctx = hospCanvas.getContext();
    hctx.fillStyle = '#fff000';
    hctx.fillRect(0, 0, 32, 32);
    hospCanvas.refresh();

    // Infrastructure
    const infraCanvas = this.textures.createCanvas('infra_dummy', 32, 32);
    const ictx = infraCanvas.getContext();
    ictx.fillStyle = '#ff00ff';
    ictx.fillRect(0, 0, 32, 32);
    infraCanvas.refresh();

    // CAB
    const cabCanvas = this.textures.createCanvas('cab_dummy', 32, 32);
    const cctx = cabCanvas.getContext();
    cctx.fillStyle = '#000000';
    cctx.fillRect(0, 0, 32, 32);
    cabCanvas.refresh();
  }

  create() {
    // Player
    this.player = this.physics.add.sprite(100, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Create location sprites (static)
    this.vendorZone = this.physics.add.staticSprite(300, 200, 'vendor_dummy');
    this.hospitalZone = this.physics.add.staticSprite(500, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(300, 400, 'infra_dummy');
    this.cabZone = this.physics.add.staticSprite(500, 400, 'cab_dummy');

    // Overlap detection
    this.physics.add.overlap(this.player, this.vendorZone, () => this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infra'), null, this);
    this.physics.add.overlap(this.player, this.cabZone, () => this.triggerLocation('cab'), null, this);

    // Slower task generation (every 30s)
    this.time.addEvent({
      delay: 30000,
      callback: () => {
        const task = createRandomTask();
        window.globalTasks.push(task);
        console.log('New Task:', task.description);
      },
      loop: true
    });

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch UI
    this.scene.launch('UIScene');
  }

  update() {
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

  /**
   * Called when player overlaps a location
   * We check the active task’s current step, 
   * and if it matches the location, we advance that task’s step.
   */
  triggerLocation(locationName) {
    // We need to see which task is active (UIScene keeps that)
    const uiScene = this.scene.get('UIScene');
    const activeId = uiScene.activeTaskId;
    if (!activeId) return; // No active task chosen

    const task = getTaskById(activeId);
    if (!task) return;

    // Map locationName to the steps text
    // Steps are: 
    // 0) 'Visit Vendor for info' 
    // 1) 'Visit Hospital to confirm timing' 
    // 2) 'Visit Infrastructure dept...' 
    // 3) 'Go to CAB meeting...' 
    // 4) 'Gather everyone for evening upgrade'
    // We'll do a simple check:
    let currentStepText = task.steps[task.currentStep] || '';

    // We'll see if the location matches
    // "vendor" -> steps includes the word "Vendor"
    // "hospital" -> steps includes "Hospital"
    // "infra" -> steps includes "Infrastructure"
    // "cab" -> steps includes "CAB"
    // The last step "evening upgrade" we won't do a location check,
    // we'll assume once CAB is done, they "complete" in UI or do
    // a separate "evening" location if you prefer.
    if (locationName === 'vendor' && currentStepText.includes('Vendor')) {
      advanceTaskStep(task.id);
      console.log(`[${task.description}] Step advanced (Vendor)`);
    } else if (locationName === 'hospital' && currentStepText.includes('Hospital')) {
      advanceTaskStep(task.id);
      console.log(`[${task.description}] Step advanced (Hospital)`);
    } else if (locationName === 'infra' && currentStepText.includes('Infrastructure')) {
      advanceTaskStep(task.id);
      console.log(`[${task.description}] Step advanced (Infrastructure)`);
    } else if (locationName === 'cab' && currentStepText.includes('CAB')) {
      advanceTaskStep(task.id);
      console.log(`[${task.description}] Step advanced (CAB)`);
    }

    // Refresh UI so step changes are visible
    uiScene.updateActiveTaskPanel();
  }
}

// Phaser config
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [ MainScene, UIScene ]
};

new Phaser.Game(config);
