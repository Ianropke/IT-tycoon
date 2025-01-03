// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Quick helper function to create 32×32 colored squares
    this.createSquareTex('player_dummy', 0x0000ff);
    this.createSquareTex('vendor_dummy', 0x00ff00);
    this.createSquareTex('hospital_dummy', 0xffff00);
    this.createSquareTex('infra_dummy', 0xff00ff);
    this.createSquareTex('cab_dummy', 0x000000);
    this.createSquareTex('legal_dummy', 0x0000ff);
    this.createSquareTex('backlog_dummy', 0xffa500);
    this.createSquareTex('informationSecurity_dummy', 0x00ffff);
    this.createSquareTex('cybersecurity_dummy', 0x88ffff);
  }

  // Helper: create a texture for a 32×32 square of a given color
  createSquareTex(key, colorInt) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    canvas.refresh();
  }

  create() {
    // The player and backlog logic
    window.canViewBacklog = false;

    // Player placed near the left, just inside the “game area”
    // so they can move onto the backlog or to the right for location sprites
    this.player = this.physics.add.sprite(350, 500, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Place location sprites to the right side of the screen
    // so they’re not hidden behind the left panel (0..400) or top bar (0..120)
    this.vendorZone = this.physics.add.staticSprite(450, 200, 'vendor_dummy').setDepth(0);
    this.hospitalZone = this.physics.add.staticSprite(650, 200, 'hospital_dummy').setDepth(0);
    this.infrastructureZone = this.physics.add.staticSprite(450, 350, 'infra_dummy').setDepth(0);
    this.cabZone = this.physics.add.staticSprite(650, 350, 'cab_dummy').setDepth(0);
    this.legalZone = this.physics.add.staticSprite(800, 250, 'legal_dummy').setDepth(0);
    this.infoSecZone = this.physics.add.staticSprite(950, 300, 'informationSecurity_dummy').setDepth(0);
    this.cyberSecZone = this.physics.add.staticSprite(1100, 400, 'cybersecurity_dummy').setDepth(0);

    // The orange backlog somewhere on the left side but below the top bar
    this.backlogZone = this.physics.add.staticSprite(200, 160, 'backlog_dummy').setDepth(0);

    // Overlap detection for each location
    this.physics.add.overlap(this.player, this.vendorZone, () => this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'), null, this);
    this.physics.add.overlap(this.player, this.cabZone, () => this.triggerLocation('cab'), null, this);
    this.physics.add.overlap(this.player, this.legalZone, () => this.triggerLocation('legal'), null, this);
    this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('informationSecurity'), null, this);
    this.physics.add.overlap(this.player, this.cyberSecZone, () => this.triggerLocation('cybersecurity'), null, this);

    // Overlap for backlog
    this.physics.add.overlap(this.player, this.backlogZone, () => {
      window.canViewBacklog = true;
    });

    // Create tasks up to 10, every 20 seconds
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (window.globalTasks.length < 10) {
          const newTask = createRandomTask();
          window.globalTasks.push(newTask);
          console.log('Spawned new task:', newTask);
        }
      },
      loop: true
    });

    // Setup arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch the UIScene on top
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

    // If not standing on backlog, we can’t see tasks
    const backRect = this.backlogZone.getBounds();
    const plyRect = this.player.getBounds();
    if (!Phaser.Geom.Intersects.RectangleToRectangle(plyRect, backRect)) {
      window.canViewBacklog = false;
    }
  }

  /**
   * Called when player overlaps one of the location sprites (vendor, hospital, etc.)
   * If the current step matches that location's keyword, we advance the step.
   */
  triggerLocation(locationName) {
    // Get the UI scene to update the active panel
    const uiScene = this.scene.get('UIScene');
    const activeId = uiScene.activeTaskId;
    if (!activeId) return;  // no active task

    const task = getTaskById(activeId);
    if (!task || !task.committed) {
      console.log('No active committed task => cannot advance steps.');
      return;
    }

    const idx = task.currentStep;
    if (idx >= task.steps.length) return; // already done

    // If the needed step keyword matches locationName, we advance
    const neededKeyword = task.stepKeywords[idx];
    if (neededKeyword === locationName) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    }
  }
}

// The config at 1440×900 to fit MacBook Air screen
const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 900,
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

// Create the Phaser Game
new Phaser.Game(config);
