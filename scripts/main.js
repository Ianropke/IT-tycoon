// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.createSquareTex('player_dummy', 0x0000ff);
    this.createSquareTex('vendor_dummy', 0x00ff00);
    this.createSquareTex('hospital_dummy', 0xffff00);
    this.createSquareTex('infra_dummy', 0xff00ff);
    this.createSquareTex('cab_dummy', 0x000000);
    this.createSquareTex('legal_dummy', 0x0000ff);
    this.createSquareTex('backlog_dummy', 0xffa500);
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
    this.player = this.physics.add.sprite(200, 450, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // We'll place each location so it doesn't overlap the UI
    // top bar is 0..100 vertical, left panel is 0..400
    // so let's put them around x>400, y>100
    this.vendorZone = this.physics.add.staticSprite(450, 200, 'vendor_dummy');
    this.hospitalZone = this.physics.add.staticSprite(600, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(450, 350, 'infra_dummy');
    this.cabZone = this.physics.add.staticSprite(600, 350, 'cab_dummy');
    this.legalZone = this.physics.add.staticSprite(750, 250, 'legal_dummy');
    this.infoSecZone = this.physics.add.staticSprite(900, 300, 'informationSecurity_dummy');

    // backlog left side
    this.backlogZone = this.physics.add.staticSprite(200, 140, 'backlog_dummy');

    // Overlaps
    this.physics.add.overlap(this.player, this.vendorZone, () => this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'), null, this);
    this.physics.add.overlap(this.player, this.cabZone, () => this.triggerLocation('cab'), null, this);
    this.physics.add.overlap(this.player, this.legalZone, () => this.triggerLocation('legal'), null, this);
    this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('informationSecurity'), null, this);

    this.physics.add.overlap(this.player, this.backlogZone, () => {
      window.canViewBacklog = true;
    });

    // spawn tasks up to 10
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (window.globalTasks.length < 10) {
          const t = createRandomTask();
          window.globalTasks.push(t);
          console.log('New Task:', t);
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

    // if not overlapping backlog => false
    const backRect = this.backlogZone.getBounds();
    const plyRect = this.player.getBounds();
    if (!Phaser.Geom.Intersects.RectangleToRectangle(plyRect, backRect)) {
      window.canViewBacklog = false;
    }
  }

  triggerLocation(locationName) {
    const uiScene = this.scene.get('UIScene');
    const activeId = uiScene.activeTaskId;
    if (!activeId) return;

    const task = getTaskById(activeId);
    if (!task || !task.committed) {
      console.log('No committed active task or not committed. Cannot advance steps.');
      return;
    }
    const idx = task.currentStep;
    if (idx >= task.steps.length) return;

    const needed = task.stepKeywords[idx];
    if (needed === locationName) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440,   // Fits MacBook Air 2021 nicely at typical scaling
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y:0 }, debug: false }
  },
  scene: [ MainScene, UIScene ]
};

new Phaser.Game(config);
