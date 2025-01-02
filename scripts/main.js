// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Player dummy
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    pctx.fillStyle = '#0000ff';
    pctx.fillRect(16, 16, 32, 32);
    pctx.fillStyle = '#ff0000';
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Vendor dummy (green)
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();

    // Hospital dummy (yellow)
    const hospCanvas = this.textures.createCanvas('hospital_dummy', 32, 32);
    const hctx = hospCanvas.getContext();
    hctx.fillStyle = '#ffff00';
    hctx.fillRect(0, 0, 32, 32);
    hospCanvas.refresh();

    // Infrastructure dummy (magenta)
    const infraCanvas = this.textures.createCanvas('infra_dummy', 32, 32);
    const ictx = infraCanvas.getContext();
    ictx.fillStyle = '#ff00ff';
    ictx.fillRect(0, 0, 32, 32);
    infraCanvas.refresh();

    // CAB dummy (black)
    const cabCanvas = this.textures.createCanvas('cab_dummy', 32, 32);
    const cctx = cabCanvas.getContext();
    cctx.fillStyle = '#000000';
    cctx.fillRect(0, 0, 32, 32);
    cabCanvas.refresh();

    // Backlog dummy (orange)
    const backlogCanvas = this.textures.createCanvas('backlog_dummy', 32, 32);
    const bctx = backlogCanvas.getContext();
    bctx.fillStyle = '#ffa500';
    bctx.fillRect(0, 0, 32, 32);
    backlogCanvas.refresh();
  }

  create() {
    // Controls backlog view
    window.canViewBacklog = false;

    // Player
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Key locations
    this.vendorZone = this.physics.add.staticSprite(300, 200, 'vendor_dummy');
    this.hospitalZone = this.physics.add.staticSprite(500, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(300, 400, 'infra_dummy');
    this.cabZone = this.physics.add.staticSprite(500, 400, 'cab_dummy');

    // Backlog zone (orange)
    this.backlogZone = this.physics.add.staticSprite(100, 100, 'backlog_dummy');

    // Overlaps for steps
    this.physics.add.overlap(this.player, this.vendorZone, () => this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infra'), null, this);
    this.physics.add.overlap(this.player, this.cabZone, () => this.triggerLocation('cab'), null, this);

    // Create new tasks every 20 seconds
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        const task = createRandomTask();
        window.globalTasks.push(task);
        console.log('New Task:', task.description);
      },
      loop: true
    });

    // If you want to penalize overdue High tasks, do a timed check here...
    // (omitted for brevity)

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch UI
    this.scene.launch('UIScene');
  }

  update() {
    // Movement
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown)  this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown)    this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown)  this.player.setVelocityY(speed);

    // Check backlog overlap
    const backlogBounds = this.backlogZone.getBounds();
    const playerBounds = this.player.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, backlogBounds)) {
      window.canViewBacklog = true;
    } else {
      window.canViewBacklog = false;
    }
  }

  triggerLocation(locationName) {
    // Which task is active?
    const uiScene = this.scene.get('UIScene');
    const activeId = uiScene.activeTaskId;
    if (!activeId) return;

    const task = getTaskById(activeId);
    if (!task) return;

    const currentStepText = task.steps[task.currentStep] || '';

    // Compare location to step text
    if (locationName === 'vendor' && currentStepText.includes('Vendor')) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    } else if (locationName === 'hospital' && currentStepText.includes('Hospital')) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    } else if (locationName === 'infra' && currentStepText.includes('Infrastructure')) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    } else if (locationName === 'cab' && currentStepText.includes('CAB')) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
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

new Phaser.Game(config);
