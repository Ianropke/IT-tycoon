// main.js
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.makeSquare('player', 0x0000ff);
    this.makeSquare('vendor', 0x00ff00);
    this.makeSquare('hospital', 0xffff00);
    this.makeSquare('infrastructure', 0xff00ff);
    this.makeSquare('cab', 0x000000);
    this.makeSquare('legal', 0xffa500);
    this.makeSquare('backlog', 0x007aff);
    this.makeSquare('infoSec', 0x00ffff);
    this.makeSquare('cyberSec', 0x663399);
  }

  makeSquare(key, colorInt) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    canvas.refresh();
  }

  create() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setCollideWorldBounds(true);

    this.locations = {
      vendor: this.physics.add.staticSprite(300, 200, 'vendor'),
      hospital: this.physics.add.staticSprite(500, 200, 'hospital'),
      infrastructure: this.physics.add.staticSprite(300, 350, 'infrastructure'),
      cab: this.physics.add.staticSprite(500, 350, 'cab'),
      legal: this.physics.add.staticSprite(600, 250, 'legal'),
      infoSec: this.physics.add.staticSprite(700, 300, 'infoSec'),
      cyberSec: this.physics.add.staticSprite(800, 400, 'cyberSec'),
      backlog: this.physics.add.staticSprite(150, 140, 'backlog')
    };

    Object.keys(this.locations).forEach(key => {
      this.physics.add.overlap(
        this.player,
        this.locations[key],
        () => this.triggerLocation(key),
        null,
        this
      );
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.scene.launch('UIScene');
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }

  triggerLocation(location) {
    const uiScene = this.scene.get('UIScene');
    if (!uiScene) return;

    const activeTask = uiScene.getActiveTask();
    if (!activeTask) return;

    const currentStep = activeTask.steps[activeTask.currentStep];
    if (currentStep === location) {
      uiScene.advanceTask();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [GameScene, UIScene]
};

new Phaser.Game(config);

// ui.js
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontSize: '24px',
      color: '#007aff'
    });

    this.taskDetails = this.add.text(950, 60, 'Tasks:', {
      fontSize: '18px',
      color: '#333'
    });

    this.activeTaskDetails = this.add.text(950, 400, '', {
      fontSize: '16px',
      color: '#333',
      wordWrap: { width: 400 }
    });

    this.commitButton = this.add.text(950, 700, '[Commit]', {
      fontSize: '16px',
      backgroundColor: '#007aff',
      color: '#fff',
      padding: { x: 10, y: 5 }
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.commitTask());

    this.updateUI();
  }

  updateUI() {
    this.scoreText.setText(`Score: ${window.playerScore}`);
    // Show active task details
    const task = this.getActiveTask();
    if (task) {
      this.activeTaskDetails.setText(
        `Active Task: ${task.description}\nSteps Remaining: ${task.steps.length - task.currentStep}\nRisk: ${task.risk}`
      );
    } else {
      this.activeTaskDetails.setText('No active task selected.');
    }
  }

  getActiveTask() {
    return window.globalTasks.find(task => task.isActive);
  }

  commitTask() {
    const task = this.getActiveTask();
    if (task) {
      task.isActive = true;
      this.updateUI();
    }
  }

  advanceTask() {
    const task = this.getActiveTask();
    if (task && task.currentStep < task.steps.length - 1) {
      task.currentStep++;
      this.updateUI();
    }
  }
}
