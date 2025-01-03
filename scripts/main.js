// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Helper to create 32×32 squares
    this.createSquareTex('player_dummy', 0x0000ff);
    this.createSquareTex('vendor_dummy', 0x00ff00);
    this.createSquareTex('hospital_dummy', 0xffff00);
    this.createSquareTex('infra_dummy', 0xff00ff);
    this.createSquareTex('cab_dummy', 0x000000);
    this.createSquareTex('legal_dummy', 0x0000ff);
    this.createSquareTex('backlog_dummy', 0xffa500);
    // "informationSecurity" location
    this.createSquareTex('informationSecurity_dummy', 0x00ffff);
  }

  createSquareTex(key, colorInt) {
    const c = this.textures.createCanvas(key, 32, 32);
    const ctx = c.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    c.refresh();
  }

  create() {
    window.canViewBacklog = false;

    // Player
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Key locations
    this.vendorZone = this.physics.add.staticSprite(300, 200, 'vendor_dummy');
    this.hospitalZone = this.physics.add.staticSprite(500, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(300, 500, 'infra_dummy');
    this.cabZone = this.physics.add.staticSprite(500, 500, 'cab_dummy');
    this.legalZone = this.physics.add.staticSprite(700, 300, 'legal_dummy');
    this.backlogZone = this.physics.add.staticSprite(100, 100, 'backlog_dummy');
    // InfoSec location
    this.infoSecZone = this.physics.add.staticSprite(900, 300, 'informationSecurity_dummy');

    // Overlaps
    this.physics.add.overlap(this.player, this.vendorZone, () => this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'), null, this);
    this.physics.add.overlap(this.player, this.cabZone, () => this.triggerLocation('cab'), null, this);
    this.physics.add.overlap(this.player, this.legalZone, () => this.triggerLocation('legal'), null, this);
    this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('informationSecurity'), null, this);

    // Overlap backlog
    this.physics.add.overlap(this.player, this.backlogZone, () => {
      window.canViewBacklog = true;
    });

    // Timer to spawn tasks (limit 10)
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (window.globalTasks.length < 10) {
          const t = createRandomTask();
          window.globalTasks.push(t);
          console.log(`New Task: Giver=${t.giver}, Desc=${t.description}, Steps=${t.steps.length}, Risk=${t.risk}`);
        }
      },
      loop: true
    });

    // Movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch UI
    this.scene.launch('UIScene');
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown)  this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown)    this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown)  this.player.setVelocityY(speed);

    // If leaving the backlog area, set canViewBacklog = false
    const backlogRect = this.backlogZone.getBounds();
    const playerRect = this.player.getBounds();
    if (!Phaser.Geom.Intersects.RectangleToRectangle(playerRect, backlogRect)) {
      window.canViewBacklog = false;
    }
  }

  triggerLocation(locationName) {
    const uiScene = this.scene.get('UIScene');
    const activeId = uiScene.activeTaskId;
    if (!activeId) return;

    const task = getTaskById(activeId);
    if (!task || !task.committed) {
      console.log('No committed active task. Cannot advance steps.');
      return;
    }
    const curIdx = task.currentStep;
    if (curIdx >= task.steps.length) return;

    // Check if step's keyword matches locationName
    const neededKeyword = task.stepKeywords[curIdx];
    if (neededKeyword === locationName) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    }
  }
}

// 1600×900 resolution
const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [ MainScene, UIScene ]
};

new Phaser.Game(config);
