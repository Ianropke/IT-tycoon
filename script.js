import { tasks, showTasks, commitTask, completeTask, scores } from './game.js';

const player = document.getElementById('player');
const map = document.getElementById('map-container');
const dispatch = document.getElementById('dispatch');
const availableTasksContainer = document.getElementById('available-tasks');
const activeTaskDetails = document.getElementById('active-task-details');
const startGameBtn = document.getElementById('start-game-btn');
const scoreboard = {
  itSecurity: document.getElementById('it-security-score'),
  hr: document.getElementById('hr-score'),
  total: document.getElementById('total-score'),
};

let playerPosition = { top: 50, left: 50 };

// Start Game
startGameBtn.addEventListener('click', () => {
  document.getElementById('intro-overlay').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
});

// Player Movement
document.addEventListener('keydown', (e) => {
  const step = 10;
  if (e.key === 'ArrowUp') playerPosition.top -= step;
  if (e.key === 'ArrowDown') playerPosition.top += step;
  if (e.key === 'ArrowLeft') playerPosition.left -= step;
  if (e.key === 'ArrowRight') playerPosition.left += step;

  player.style.top = `${playerPosition.top}px`;
  player.style.left = `${playerPosition.left}px`;

  if (isInside(dispatch)) {
    showTasks(availableTasksContainer, commitToTask);
  } else {
    availableTasksContainer.innerHTML = '';
  }
});

function isInside(area) {
  const rect = area.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  return (
    playerRect.left >= rect.left &&
    playerRect.right <= rect.right &&
    playerRect.top >= rect.top &&
    playerRect.bottom <= rect.bottom
  );
}

function commitToTask(index) {
  commitTask(index, activeTaskDetails);
}

document.getElementById('complete-task-btn').addEventListener('click', () => {
  completeTask(activeTaskDetails, scoreboard);
});
