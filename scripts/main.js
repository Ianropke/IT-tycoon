class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.makeSquare('player', 0x0000ff);
        this.makeSquare('hospital', 0xffff00);
        this.makeSquare('infrastructure', 0xff00ff);
        this.makeSquare('cybersecurity', 0x88ffff);
        this.makeSquare('infoSec', 0x00ffff);
        this.makeSquare('backlog', 0xffa500);
    }

    makeSquare(key, colorInt) {
        const c = this.textures.createCanvas(key, 32, 32);
        const ctx = c.getContext();
        ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
        ctx.fillRect(0, 0, 32, 32);
        c.refresh();
    }

    create() {
        window.canViewBacklog = false;
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);

        // Add locations
        this.hospitalZone = this.physics.add.staticSprite(300, 200, 'hospital');
        this.infrastructureZone = this.physics.add.staticSprite(500, 200, 'infrastructure');
        this.cybersecurityZone = this.physics.add.staticSprite(300, 350, 'cybersecurity');
        this.infoSecZone = this.physics.add.staticSprite(500, 350, 'infoSec');
        this.backlogZone = this.physics.add.staticSprite(150, 140, 'backlog');

        this.physics.add.overlap(this.player, this.backlogZone, () => {
            window.canViewBacklog = true;
        });

        this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
        this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'), null, this);
        this.physics.add.overlap(this.player, this.cybersecurityZone, () => this.triggerLocation('cybersecurity'), null, this);
        this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('infoSec'), null, this);

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

        if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.backlogZone.getBounds())) {
            window.canViewBacklog = false;
        }
    }

    triggerLocation(locationName) {
        const uiScene = this.scene.get('UIScene');
        if (!uiScene) return;
        const activeId = uiScene.activeTaskId;
        if (!activeId) return;
        const task = getTaskById(activeId);
        if (!task || !task.committed) return;

        const idx = task.currentStep;
        if (idx >= task.steps.length) return;

        const needed = task.stepKeywords[idx];
        if (needed === locationName) {
            advanceTaskStep(task.id);
            uiScene.updateUI();
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
