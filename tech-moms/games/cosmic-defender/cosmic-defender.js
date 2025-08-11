document.addEventListener('DOMContentLoaded', function () {
  // Game elements
  const holes = document.querySelectorAll('.hole');
  const aliens = document.querySelectorAll('.alien');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const startButton = document.getElementById('start-button');
  const gameOverScreen = document.getElementById('game-over');
  const finalScoreDisplay = document.getElementById('final-score');
  const restartButton = document.getElementById('restart-button');

  // Game variables
  let score = 0;
  let timeLeft = 30;
  let gameInterval;
  let timerInterval;
  let alienSpeed = 1500; // Base time aliens stay up (ms)
  let spawnRate = 2000; // Base time between spawns (ms)
  let lastHole = -1;
  let isPlaying = false;

  // Add click listeners to aliens
  aliens.forEach(alien => {
    alien.addEventListener('click', whackAlien);
  });

  // Start button listener
  startButton.addEventListener('click', startGame);

  // Restart button listener
  restartButton.addEventListener('click', function () {
    gameOverScreen.style.display = 'none';
    resetGame();
  });

  // Function to start the game
  function startGame() {
    if (isPlaying) return;

    isPlaying = true;
    startButton.disabled = true;

    // Start the timer
    timerInterval = setInterval(function () {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        // Level complete
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        endGame();
      }
    }, 1000);

    // Start spawning aliens
    gameInterval = setInterval(spawnAlien, spawnRate);
  }

  // Function to spawn an alien
  function spawnAlien() {
    // Pick a random hole
    let hole;
    do {
      hole = Math.floor(Math.random() * holes.length);
    } while (hole === lastHole);

    lastHole = hole;

    const alien = aliens[hole];

    // Determine alien type
    let alienType = 'enemy';
    const typeRoll = Math.random();

    if (typeRoll < 0.1) {
      alienType = 'boss';
      alien.classList.add('boss');
    }

    // Set data attribute for type
    alien.dataset.type = alienType;

    // Show the alien
    alien.classList.add('show');

    // Hide after a random time
    setTimeout(() => {
      alien.classList.remove('show');
      alien.classList.remove('boss');

      // Reset the whacked status
      alien.dataset.whacked = 'false';
    }, alienType === 'boss' ? alienSpeed * 1.5 : alienSpeed);
  }

  // Function to handle whacking aliens
  function whackAlien() {
    // Only process if the alien is visible
    if (!this.classList.contains('show')) return;

    // Mark as whacked
    this.dataset.whacked = 'true';

    // Process based on alien type
    const alienType = this.dataset.type;
    if (alienType === 'boss') {
      // Boss aliens are worth more points
      score += 150;
      scoreDisplay.textContent = score;
      showScoreAnimation(this, +150, '#ffff00');
    } else {
      // Regular enemy aliens
      score += 10;
      scoreDisplay.textContent = score;
      showScoreAnimation(this, +10, '#00ffff');
    }

    // Hide the alien
    this.classList.remove('show');
    this.classList.remove('boss');

    // Visual feedback for hit
    const hole = this.parentNode;
    const hitEffect = hole.querySelector('.hit-effect');
    hitEffect.style.opacity = 0.7;

    this.classList.add('pulse');

    setTimeout(() => {
      hitEffect.style.opacity = 0;
      this.classList.remove('pulse');
    }, 300);
  }

  // Function to show score animation
  function showScoreAnimation(alien, points, color) {
    const scoreAnim = document.createElement('div');
    scoreAnim.className = 'score-animation';
    scoreAnim.style.color = color;
    scoreAnim.textContent = points > 0 ? `+${points}` : points;

    // Position near the alien
    const rect = alien.getBoundingClientRect();
    scoreAnim.style.position = 'absolute';
    scoreAnim.style.left = `${rect.left + (rect.width / 2)}px`;
    scoreAnim.style.top = `${rect.top}px`;

    document.body.appendChild(scoreAnim);

    // Remove after animation completes
    setTimeout(() => {
      document.body.removeChild(scoreAnim);
    }, 1000);
  }

  // Function to end the game
  function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Reset aliens
    aliens.forEach(alien => {
      alien.classList.remove('show');
      alien.classList.remove('friendly');
      alien.classList.remove('boss');
    });

    // Show game over screen
    finalScoreDisplay.textContent = score;
    // finalLevelDisplay.textContent = level;
    gameOverScreen.style.display = 'flex';

    // Enable start button
    startButton.disabled = false;
  }

  // Function to reset the game
  function resetGame() {
    score = 0;
    timeLeft = 30;
    // lives = 3;
    // level = 1;
    alienSpeed = 1500;
    spawnRate = 2000;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    // livesDisplay.textContent = lives;
    // levelDisplay.textContent = level;
  }
});