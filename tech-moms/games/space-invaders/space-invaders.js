document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const startScreen = document.getElementById('startScreen');
  const gameOverScreen = document.getElementById('gameOverScreen');
  const finalScore = document.getElementById('finalScore');
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restartButton');

  // Game constants
  const ALIEN_ROWS = 4;
  const ALIENS_PER_ROW = 10;
  const ALIEN_SPACING = 40;
  const PLAYER_SPEED = 5;
  const BULLET_SPEED = 7;
  const ALIEN_BULLET_SPEED = 3;
  const ALIEN_DROP_AMOUNT = 20;
  const ALIEN_MOVE_INTERVAL = 1000;
  const ALIEN_FIRE_INTERVAL = 1500;
  const ALIEN_EMOJIS = ['🛸', '🛸', '👽', '👾'];

  // Game state
  let gameRunning = false;
  let score = 0;
  let alienDirection = 1; // 1 = right, -1 = left
  let alienMoveTimer;
  let alienFireTimer;
  let alienMoveSpeed = ALIEN_MOVE_INTERVAL;

  // Game objects
  let player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 30,
    color: 'green',
    speed: PLAYER_SPEED,
    isMovingLeft: false,
    isMovingRight: false,
    isShooting: false,
    lastShot: 0,
    shootDelay: 300
  };

  let playerBullets = [];
  let alienBullets = [];
  let aliens = [];

  // Key handlers
  const keys = {};

  document.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (e.code === 'Space' && gameRunning) {
      shootBullet();
    }
  });

  document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });

  // Initialize game buttons
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);

  // Create aliens
  function createAliens() {
    aliens = [];
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIENS_PER_ROW; col++) {
        const emoji = ALIEN_EMOJIS[row % ALIEN_EMOJIS.length];
        aliens.push({
          x: col * ALIEN_SPACING + 50,
          y: row * ALIEN_SPACING + 50,
          width: 30,
          height: 30,
          emoji: emoji,
          alive: true
        });
      }
    }
  }

  // Game loop
  function gameLoop() {
    if (!gameRunning) return;

    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
  }

  // Update game state
  function updateGame() {
    // Move player
    if (keys['ArrowLeft'] && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
      player.x += player.speed;
    }

    // Update player bullets
    for (let i = playerBullets.length - 1; i >= 0; i--) {
      const bullet = playerBullets[i];
      bullet.y -= BULLET_SPEED;

      // Remove bullets that go off screen
      if (bullet.y < 0) {
        playerBullets.splice(i, 1);
        continue;
      }

      // Check collision with aliens
      for (let j = 0; j < aliens.length; j++) {
        const alien = aliens[j];
        if (alien.alive && collision(bullet, alien)) {
          alien.alive = false;
          playerBullets.splice(i, 1);
          score += 10;
          scoreDisplay.textContent = `Score: ${score}`;

          // Speed up aliens as they are destroyed
          if (aliens.filter(a => a.alive).length > 0) {
            alienMoveSpeed = Math.max(100, ALIEN_MOVE_INTERVAL - (score / 10) * 10);
            clearInterval(alienMoveTimer);
            alienMoveTimer = setInterval(moveAliens, alienMoveSpeed);
          }
          break;
        }
      }
    }

    // Update alien bullets
    for (let i = alienBullets.length - 1; i >= 0; i--) {
      const bullet = alienBullets[i];
      bullet.y += ALIEN_BULLET_SPEED;

      // Remove bullets that go off screen
      if (bullet.y > canvas.height) {
        alienBullets.splice(i, 1);
        continue;
      }

      // Check collision with player
      if (collision(bullet, player)) {
        gameOver();
        return;
      }
    }

    // Check if all aliens are destroyed
    if (aliens.every(alien => !alien.alive)) {
      levelUp();
    }

    // Check if aliens reached the bottom
    for (const alien of aliens) {
      if (alien.alive && alien.y + alien.height >= player.y) {
        gameOver();
        return;
      }
    }
  }

  // Render game objects
  function renderGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars (background)
    drawStars();

    // Draw player (spaceship)
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Draw player bullets
    ctx.fillStyle = 'yellow';
    playerBullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw alien bullets
    ctx.fillStyle = 'red';
    alienBullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw aliens
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    aliens.forEach(alien => {
      if (alien.alive) {
        ctx.fillText(alien.emoji, alien.x + alien.width / 2, alien.y + alien.height / 2);
      }
    });
  }

  // Draw background stars
  function drawStars() {
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      ctx.fillRect(x, y, size, size);
    }
  }

  // Move aliens
  function moveAliens() {
    let hitEdge = false;

    // Check if any alien hit the edge
    aliens.forEach(alien => {
      if (!alien.alive) return;

      if ((alienDirection > 0 && alien.x + alien.width >= canvas.width - 10) ||
        (alienDirection < 0 && alien.x <= 10)) {
        hitEdge = true;
      }
    });

    // Change direction and move down if edge is hit
    if (hitEdge) {
      alienDirection *= -1;
      aliens.forEach(alien => {
        if (alien.alive) {
          alien.y += ALIEN_DROP_AMOUNT;
        }
      });
    } else {
      // Otherwise move horizontally
      aliens.forEach(alien => {
        if (alien.alive) {
          alien.x += alienDirection * 10;
        }
      });
    }
  }

  // Alien shooting function
  function alienShoot() {
    const livingAliens = aliens.filter(alien => alien.alive);
    if (livingAliens.length > 0) {
      const shootingAlien = livingAliens[Math.floor(Math.random() * livingAliens.length)];

      alienBullets.push({
        x: shootingAlien.x + shootingAlien.width / 2 - 2,
        y: shootingAlien.y + shootingAlien.height,
        width: 4,
        height: 10
      });
    }
  }

  // Player shooting function
  function shootBullet() {
    const now = Date.now();
    if (now - player.lastShot > player.shootDelay) {
      playerBullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y - 10,
        width: 4,
        height: 10
      });
      player.lastShot = now;
    }
  }

  // Check collision between two objects
  function collision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  // Start new game
  function startGame() {
    // Reset game state
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    playerBullets = [];
    alienBullets = [];
    alienDirection = 1;
    alienMoveSpeed = ALIEN_MOVE_INTERVAL;

    // Create new aliens
    createAliens();

    // Reset player position
    player.x = canvas.width / 2 - 20;
    player.y = canvas.height - 50;

    // Set up alien movement and firing
    clearInterval(alienMoveTimer);
    clearInterval(alienFireTimer);
    alienMoveTimer = setInterval(moveAliens, alienMoveSpeed);
    alienFireTimer = setInterval(alienShoot, ALIEN_FIRE_INTERVAL);

    // Hide overlays
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // Start the game
    gameRunning = true;
    gameLoop();
  }

  // Level up (when all aliens are destroyed)
  function levelUp() {
    clearInterval(alienMoveTimer);
    clearInterval(alienFireTimer);

    // Create new aliens that move faster
    createAliens();

    // Speed up aliens slightly
    alienMoveSpeed = Math.max(100, alienMoveSpeed - 100);

    // Restart timers
    alienMoveTimer = setInterval(moveAliens, alienMoveSpeed);
    alienFireTimer = setInterval(alienShoot, Math.max(500, ALIEN_FIRE_INTERVAL - 100));
  }

  // Game over
  function gameOver() {
    gameRunning = false;
    clearInterval(alienMoveTimer);
    clearInterval(alienFireTimer);

    finalScore.textContent = `Your Score: ${score}`;
    gameOverScreen.style.display = 'flex';
  }

  // Show start screen initially
  startScreen.style.display = 'flex';
});