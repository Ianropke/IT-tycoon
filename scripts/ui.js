class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        this.scoreText = this.add.text(20, 10, 'Score: 0', {
            fontSize: '24px',
            color: '#007aff'
        });

        this.scoreboard = this.add.text(700, 10, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
            fontSize: '16px',
            color: '#333333'
        });

        this.backlogContainer = this.add.container(910, 60);
        this.activeTaskContainer = this.add.container(910, 480);

        this.updateUI();
    }

    updateUI() {
        this.scoreText.setText(`Score: ${window.playerScore}`);
        this.scoreboard.setText(
            `Hospital: ${window.giverScoreboard.hospital} | ` +
            `Infrastructure: ${window.giverScoreboard.infrastructure} | ` +
            `InfoSec: ${window.giverScoreboard.informationSecurity} | ` +
            `CyberSec: ${window.giverScoreboard.cybersecurity}`
        );

        this.backlogContainer.removeAll(true);
        if (!window.canViewBacklog) {
            this.backlogContainer.add(
                this.add.text(0, 0, 'Stand on orange backlog to see tasks.', {
                    fontSize: '14px',
                    color: '#999999'
                })
            );
            return;
        }

        let y = 0;
        window.globalTasks.forEach((task, index) => {
            const taskText = this.add.text(0, y, `[${task.status}] ${task.description}`, {
                fontSize: '14px',
                color: '#333333'
            });

            taskText.setInteractive({ useHandCursor: true });
            taskText.on('pointerdown', () => this.selectTask(task.id));

            this.backlogContainer.add(taskText);
            y += 20;

            if (index >= 10) {
                this.backlogContainer.add(
                    this.add.text(0, y, '...more tasks hidden...', {
                        fontSize: '14px',
                        color: '#888888'
                    })
                );
                return;
            }
        });
    }

    selectTask(taskId) {
        this.activeTaskContainer.removeAll(true);
        const task = getTaskById(taskId);
        if (!task) return;

        this.activeTaskContainer.add(
            this.add.text(0, 0, `Active Task: ${task.description}`, {
                fontSize: '14px',
                color: '#333333'
            })
        );
    }
}
