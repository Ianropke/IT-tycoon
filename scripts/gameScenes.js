// scripts/gameScenes.js
import { gameState } from './state.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // No image assets needed; using graphics instead
    }

    create() {
        this.scene.start('MenuScene');
    }
}

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2 - 50, 'IT Manager Tycoon', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        const startButton = this.add.text(width / 2, height / 2 + 50, 'Start Game', { fontSize: '24px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });
    }
}

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Define Zones using Graphics
        this.zones = {
            taskDispatch: {
                name: 'Task Dispatch',
                x: 450,
                y: 100,
                width: 100,
                height: 100,
                color: 0x8e44ad, // Purple
                type: 'dispatch'
            },
            hospital: {
                name: 'Hospital Zone',
                x: 200,
                y: 200,
                width: 100,
                height: 100,
                color: 0xff0000, // Red
                type: 'task'
            },
            infrastructure: {
                name: 'Infrastructure Zone',
                x: 700,
                y: 200,
                width: 100,
                height: 100,
                color: 0x00ff00, // Green
                type: 'task'
            },
            cybersecurity: {
                name: 'Cybersecurity Zone',
                x: 200,
                y: 700,
                width: 100,
                height: 100,
                color: 0x0000ff, // Blue
                type: 'task'
            },
            infosec: {
                name: 'InfoSec Zone',
                x: 700,
                y: 700,
                width: 100,
                height: 100,
                color: 0xffff00, // Yellow
                type: 'task'
            },
            legal: {
                name: 'Legal Zone',
                x: 450,
                y: 450,
                width: 100,
                height: 100,
                color: 0xff00ff, // Magenta
                type: 'non-task'
            },
            vendor: {
                name: 'Vendor Zone',
                x: 450,
                y: 300,
                width: 100,
                height: 100,
                color: 0x00ffff, // Cyan
                type: 'non-task'
            },
            budget: {
                name: 'Budget Zone',
                x: 450,
                y: 600,
                width: 100,
                height: 100,
                color: 0xffffff, // White
                type: 'non-task'
            }
        };

        // Draw Zones
        for (let key in this.zones) {
            const zone = this.zones[key];
            const graphics = this.add.graphics();
            graphics.fillStyle(zone.color, 1);
            graphics.fillRect(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);

            // Add text label
            this.add.text(zone.x, zone.y, zone.name, { fontSize: '12px', fill: '#000' }).setOrigin(0.5);
        }

        // Create Player as a Circle
        this.player = this.physics.add.sprite(450, 450, null);
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x000000, 1);
        playerGraphics.fillCircle(0, 0, 15);
        this.player.setSize(30, 30);
        this.player.body.setCircle(15);
        this.player.body.setCollideWorldBounds(true);

        // Player Movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Current Location Label
        this.locationLabel = this.add.text(450, 20, 'Current Location: None', { fontSize: '20px', fill: '#fff' })
            .setOrigin(0.5);

        // Enable Physics Overlap
        this.physics.add.overlap(this.player, this.getZoneBodies(), this.handleOverlap, null, this);
    }

    update() {
        const speed = 200;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }
    }

    getZoneBodies() {
        // Create an array of zone bodies for overlap checking
        return Object.values(this.zones).map(zone => {
            return new Phaser.Geom.Rectangle(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);
        });
    }

    handleOverlap(player, zoneGeom) {
        const zone = Object.values(this.zones).find(z => Phaser.Geom.Rectangle.Contains(zoneGeom, player.x, player.y));
        if (zone && gameState.currentZone !== zone.name) {
            this.enterZone(zone.name.toLowerCase().replace(' ', ''));
        }
    }

    enterZone(zoneKey) {
        const zone = Object.keys(this.zones).find(key => this.zones[key].name.toLowerCase().replace(' ', '') === zoneKey);
        if (!zone) return;

        gameState.currentZone = this.zones[zone].name;
        this.locationLabel.setText(`Current Location: ${gameState.currentZone}`);

        if (this.zones[zone].type === 'dispatch') {
            this.events.emit('taskAssigned');
        } else if (this.zones[zone].type === 'task') {
            this.events.emit('taskZoneVisited', zoneKey);
        } else {
            if (zoneKey === 'legal') {
                this.events.emit('legalZoneVisited');
            } else if (zoneKey === 'vendor') {
                this.events.emit('vendorZoneVisited');
            } else if (zoneKey === 'budget') {
                this.events.emit('budgetZoneVisited');
            }
        }
    }
}
