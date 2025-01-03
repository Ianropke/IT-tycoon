class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        // Score Text
        this.scoreText = this.add.text(20, 10, 'Score: 0', {
            fontSize: '24px',
            color: '#007aff'
        });

        // Scoreboard (Task Completion)
        this.scoreboard = this.add.text(700, 10, this.getScoreboardText(), {
            fontSize: '16px',
            color: '#333333'
        });

        // Backlog UI
        this.backlogContainer = this.add.container(910, 60);

        // Active Task UI
        this.activeTaskContainer = this.add.container(910, 480);

        this.updateUI();
    }

    updateUI() {
        // Update Score Text
        this.scoreText.setText(`Score: ${window.playerScore}`);

        // Update Scoreboard
        this.scoreboard.setText(this.getScoreboardText());

        // Update Backlog
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

    getScoreboardText() {
        // Ensure `giverScoreboard` is initialized
        const scoreboard = window.giverScoreboard || {
            hospital: 0,
            infrastructure: 0,
            informationSecurity: 0,
            cybersecurity: 0
        };

        return `Hospital: ${scoreboard.hospital} | Infrastructure: ${scoreboard.infrastructure} | InfoSec: ${scoreboard.informationSecurity} | CyberSec: ${scoreboard.cybersecurity}`;
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
