// scripts/gameScenes.js
export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('player', 'assets/images/player.png');
        this.load.image('hospitalZone', 'assets/images/hospital_zone.png');
        this.load.image('infrastructureZone', 'assets/images/infrastructure_zone.png');
        this.load.image('cybersecurityZone', 'assets/images/cybersecurity_zone.png');
        this.load.image('infosecZone', 'assets/images/infosec_zone.png');
        this.load.image('legalZone', 'assets/images/legal_zone.png');
        this.load.image('vendorZone', 'assets/images/vendor_zone.png');
        this.load.image('budgetZone', 'assets/images/budget_zone.png');
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
        this.zones = {
            hospital: {
                image: this.add.image(450, 450, 'hospitalZone').setVisible(false),
                name: 'Hospital Zone'
            },
            infrastructure: {
                image: this.add.image(450, 450, 'infrastructureZone').setVisible(false),
                name: 'Infrastructure Zone'
            },
            cybersecurity: {
                image: this.add.image(450, 450, 'cybersecurityZone').setVisible(false),
                name: 'Cybersecurity Zone'
            },
            infosec: {
                image: this.add.image(450, 450, 'infosecZone').setVisible(false),
                name: 'InfoSec Zone'
            },
            legal: {
                image: this.add.image(450, 450, 'legalZone').setVisible(false),
                name: 'Legal Zone'
            },
            vendor: {
                image: this.add.image(450, 450, 'vendorZone').setVisible(false),
                name: 'Vendor Zone'
            },
            budget: {
                image: this.add.image(450, 450, 'budgetZone').setVisible(false),
                name: 'Budget Zone'
            }
        };

        this.player = this.physics.add.sprite(450, 450, 'player');
        this.player.setCollideWorldBounds(true);

        const { width, height } = this.scale;

        const buttonWidth = 150;
        const buttonHeight = 40;
        const buttonSpacing = 20;
        const startY = 50;

        const zonesKeys = Object.keys(this.zones);
        zonesKeys.forEach((zoneKey, index) => {
            const button = this.add.text(100 + (buttonWidth + buttonSpacing) * index, startY, `Go to ${this.zones[zoneKey].name}`, { fontSize: '16px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    this.navigateTo(zoneKey);
                });
        });

        this.locationLabel = this.add.text(width / 2, 50, 'Current Location: None', { fontSize: '20px', fill: '#fff' })
            .setOrigin(0.5);
    }

    navigateTo(zoneKey) {
        Object.values(this.zones).forEach(zone => {
            zone.image.setVisible(false);
        });

        const selectedZone = this.zones[zoneKey];
        if (selectedZone) {
            selectedZone.image.setVisible(true);
            this.locationLabel.setText(`Current Location: ${selectedZone.name}`);
            this.player.setPosition(this.scale.width / 2, this.scale.height / 2);

            if (['hospital', 'infrastructure', 'cybersecurity', 'infosec'].includes(zoneKey)) {
                this.events.emit('taskAssigned', zoneKey);
            }

            if (zoneKey === 'legal') {
                this.events.emit('legalZoneVisited');
            } else if (zoneKey === 'vendor') {
                this.events.emit('vendorZoneVisited');
            } else if (zoneKey === 'budget') {
                this.events.emit('budgetZoneVisited');
            }
        }
    }

    update() {
    }
}
