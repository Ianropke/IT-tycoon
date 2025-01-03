// scripts/gameScenes.js

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load dummy textures for the player and zones
        this.makeSquare('player', 0x0000ff); // Blue for player
        this.makeSquare('dispatch_zone', 0xffa500); // Orange for dispatch
        this.makeSquare('hospital_zone', 0xffff00); // Yellow
        this.makeSquare('infrastructure_zone', 0xff00ff); // Pink
        this.makeSquare('cybersecurity_zone', 0x008080); // Teal
        this.makeSquare('infosec_zone', 0x00ffff); // Cyan
        this.makeSquare('legal_zone', 0xff4500); // Red-Orange
        this.makeSquare('vendor_zone', 0x008000); // Green
        this.makeSquare('budget_zone', 0x8a2be2); // Blue-Violet
    }

    makeSquare(key, colorInt) {
        const canvas = this.textures.createCanvas(key, 32, 32);
        const ctx = canvas.getContext();
        ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
        ctx.fillRect(0, 0, 32, 32);
        canvas.refresh();
    }

    create() {
        // Add player
        this.player = this.physics.add.sprite(100, 100, 'player').setCollideWorldBounds(true);

        // Add zones
        this.zones = {
            dispatch: this.createZone(150, 100, 'dispatch_zone', 'Dispatch'),
            hospital: this.createZone(300, 150, 'hospital_zone', 'Hospital'),
            infrastructure: this.createZone(450, 200, 'infrastructure_zone', 'Infrastructure'),
            cybersecurity: this.createZone(600, 250, 'cybersecurity_zone', 'Cybersecurity'),
            infosec: this.createZone(300, 350, 'infosec_zone', 'InfoSec'),
            legal: this.createZone(450, 400, 'legal_zone', 'Legal'),
            vendor: this.createZone(600, 450, 'vendor_zone', 'Vendor'),
            budget: this.createZone(300, 500, 'budget_zone', 'Budget'),
        };

        // Display Current Zone
        this.currentZoneText = this.add.text(10, 10, 'Current Location: None', {
            font: '16px Arial',
            fill: '#000',
        });

        // Zone Overlap Logic
        Object.values(this.zones).forEach((zone) => {
            this.physics.add.overlap(this.player, zone, () => {
                this.handleZoneOverlap(zone.name);
            });
        });

        // Player Movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Task Handling
        this.events.on('dispatch_visited', () => {
            this.openTaskSelectionModal();
        });

        // Emit Phaser Game Events
        this.events.emit('gameSceneReady');
    }

    createZone(x, y, texture, name) {
        const zone = this.physics.add.staticSprite(x, y, texture);
        zone.name = name;
        return zone;
    }

    update() {
        // Player movement logic
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

    handleZoneOverlap(zoneName) {
        this.currentZoneText.setText(`Current Location: ${zoneName}`);
        this.events.emit(`${zoneName.toLowerCase().replace(' ', '_')}_visited`);
    }

    openTaskSelectionModal() {
        // Triggered when visiting Dispatch zone
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        if (!modal || !modalBody) return;

        let taskOptions = '';

        if (window.gameState.tasks.length === 0) {
            taskOptions = '<p>No tasks available. Wait for new tasks to be generated.</p>';
        } else {
            taskOptions = '<h3>Select a Task to Commit</h3><ul>';
            window.gameState.tasks.slice(0, 10).forEach((task) => {
                taskOptions += `
                    <li>
                        <strong>${task.description}</strong><br>
                        Giver: ${task.taskGiver} | Risk: ${task.risk} | Price: $${task.price}<br>
                        Steps: ${task.steps.join(' -> ')}
                        <button data-task-id="${task.id}">Select</button>
                    </li>
                `;
            });
            taskOptions += '</ul>';
        }

        modalBody.innerHTML = taskOptions;
        modal.style.display = 'block';

        // Add event listeners to task selection buttons
        const selectButtons = modalBody.querySelectorAll('button[data-task-id]');
        selectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = button.getAttribute('data-task-id');
                this.commitToTask(taskId);
                modal.style.display = 'none';
            });
        });
    }

    commitToTask(taskId) {
        // Commit to task logic
        const task = window.gameState.tasks.find((t) => t.id === taskId);
        if (task) {
            if (window.gameState.activeTask) {
                alert('You already have an active task. Complete it before committing to another.');
                return;
            }

            window.gameState.activeTask = task;
            window.gameState.tasks = window.gameState.tasks.filter((t) => t.id !== taskId);
            this.events.emit('active_task_updated');
            alert(`Committed to task: ${task.description}`);
        }
    }
}

