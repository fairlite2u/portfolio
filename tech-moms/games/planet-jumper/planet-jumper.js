document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('score');
  const startScreen = document.getElementById('start-screen');
  const startBtn = document.getElementById('start-btn');
  const gameOverScreen = document.getElementById('game-over');
  const finalScoreDisplay = document.getElementById('final-score');
  const restartBtn = document.getElementById('restart-btn');

  const GRAVITY = 0.25;
  const JUMP_FORCE = -10;
  const PLATFORM_WIDTH = 70;
  const PLATFORM_HEIGHT = 20;
  const PLATFORM_COUNT = 8;
  const PLAYER_WIDTH = 30;
  const PLAYER_HEIGHT = 40;

  let player = {
    x: canvas.width / 2 - PLAYER_WIDTH / 2,
    y: canvas.height / 2,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  };

  let platforms = [];
  let stars = [];
  let score = 0;
  let highScore = 0;
  let gameRunning = false;
  let gameStarted = false;

  // Generate stars for background
  function generateStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
  }

  // Generate platforms
  function generatePlatforms() {
    platforms = [];

    // First platform right under the player
    platforms.push({
      x: canvas.width / 2 - PLATFORM_WIDTH / 2,
      y: canvas.height - 100,
      width: PLATFORM_WIDTH,
      height: PLATFORM_HEIGHT,
      type: 'normal'
    });

    // Generate the rest randomly
    for (let i = 0; i < PLATFORM_COUNT; i++) {
      const platformType = Math.random() < 0.8 ? 'normal' : 'boost';

      platforms.push({
        x: Math.random() * (canvas.width - PLATFORM_WIDTH),
        y: (canvas.height - 100) - ((i + 1) * (canvas.height / PLATFORM_COUNT)),
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
        type: platformType
      });
    }
  }

  // Reset game state
  function resetGame() {
    player = {
      x: canvas.width / 2 - PLAYER_WIDTH / 2,
      y: canvas.height / 2,
      velocityX: 0,
      velocityY: 0,
      jumping: false,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    };

    generatePlatforms();
    score = 0;
    updateScore();
    gameOverScreen.style.display = 'none';
    gameRunning = true;
  }

  // Update score display
  function updateScore() {
    scoreDisplay.innerText = score;
  }

  // Check if player is colliding with a platform
  function checkPlatformCollision() {
    if (player.velocityY >= 0) { // Only check when falling
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];

        if (player.x + player.width > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + player.height >= platform.y &&
          player.y + player.height <= platform.y + platform.height / 2) {

          if (platform.type === 'normal') {
            player.velocityY = JUMP_FORCE;
          } else if (platform.type === 'boost') {
            player.velocityY = JUMP_FORCE * 1.5;
          }

          return true;
        }
      }
    }
    return false;
  }

  // Game loop
  function update() {
    if (!gameRunning) return;

    // Move player horizontally
    player.x += player.velocityX;

    // Wrap around screen edges
    if (player.x + player.width < 0) {
      player.x = canvas.width;
    } else if (player.x > canvas.width) {
      player.x = -player.width;
    }

    // Apply gravity
    player.velocityY += GRAVITY;
    player.y += player.velocityY;

    // Check platform collisions
    checkPlatformCollision();

    // Move view up if player goes above half screen
    if (player.y < canvas.height / 2) {
      let offset = canvas.height / 2 - player.y;
      player.y += offset;

      // Move platforms down
      for (let i = 0; i < platforms.length; i++) {
        platforms[i].y += offset;

        // If platform moves below screen, reposition it to top with random x
        if (platforms[i].y > canvas.height) {
          platforms[i].y = 0;
          platforms[i].x = Math.random() * (canvas.width - PLATFORM_WIDTH);
          platforms[i].type = Math.random() < 0.8 ? 'normal' : 'boost';

          // Increase score when generating new platform (player progressed)
          score += 10;
          updateScore();
        }
      }

      // Move stars at different speeds for parallax effect
      for (let i = 0; i < stars.length; i++) {
        stars[i].y += offset * stars[i].speed;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = Math.random() * canvas.width;
        }
      }
    }

    // Check if player fell off the bottom
    if (player.y > canvas.height) {
      gameOver();
    }

    draw();
    requestAnimationFrame(update);
  }

  // Game over
  function gameOver() {
    gameRunning = false;
    if (score > highScore) {
      highScore = score;
    }
    finalScoreDisplay.innerText = `Score: ${score} | High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';
  }

  // Draw game
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = '#fff';
    for (let i = 0; i < stars.length; i++) {
      ctx.beginPath();
      ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw platforms
    for (let i = 0; i < platforms.length; i++) {
      if (platforms[i].type === 'normal') {
        ctx.fillStyle = '#3498db';
      } else if (platforms[i].type === 'boost') {
        ctx.fillStyle = '#e74c3c';
      }

      // Draw planet (circular platform)
      ctx.beginPath();
      const centerX = platforms[i].x + platforms[i].width / 2;
      const centerY = platforms[i].y + platforms[i].height / 2;
      const radius = platforms[i].width / 2;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add some details to planets
      if (platforms[i].type === 'normal') {
        ctx.fillStyle = '#2980b9';
        ctx.beginPath();
        ctx.arc(centerX - 10, centerY - 5, radius / 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (platforms[i].type === 'boost') {
        // Add glow effect to boost planets
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.3);
        gradient.addColorStop(0, 'rgba(231, 76, 60, 0.8)');
        gradient.addColorStop(1, 'rgba(231, 76, 60, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw player (astronaut)
    ctx.fillStyle = '#fff';
    // Astronaut body
    ctx.fillRect(player.x, player.y, player.width, player.height - 10);
    // Astronaut helmet
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y - 5, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
    // Helmet visor
    ctx.fillStyle = '#5af';
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y - 5, player.width / 3, 0, Math.PI * 2);
    ctx.fill();
    // Jetpack flame when jumping
    if (player.velocityY < 0) {
      ctx.fillStyle = '#f39c12';
      ctx.beginPath();
      ctx.moveTo(player.x, player.y + player.height);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x + player.width / 2, player.y + player.height + 15);
      ctx.fill();
    }
  }

  // Handle keyboard input
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      player.velocityX = -5;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      player.velocityX = 5;
    }
  }

  function handleKeyUp(e) {
    if ((e.key === 'ArrowLeft' || e.key === 'a') && player.velocityX < 0) {
      player.velocityX = 0;
    } else if ((e.key === 'ArrowRight' || e.key === 'd') && player.velocityX > 0) {
      player.velocityX = 0;
    }
  }

  // Add device orientation controls for mobile
  window.addEventListener('deviceorientation', function (e) {
    if (gameRunning && e.gamma !== null) {
      player.velocityX = e.gamma / 10; // Tilt sensitivity
    }
  });

  // Start the game
  startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    if (!gameStarted) {
      generateStars();
      gameStarted = true;
    }
    resetGame();
    update();
  });

  restartBtn.addEventListener('click', () => {
    resetGame();
    update();
  });

  // Add controls
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Add touch controls for mobile
  let touchStartX = 0;
  canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (gameRunning) {
      const touchX = e.touches[0].clientX;
      const diff = touchX - touchStartX;
      player.velocityX = diff / 30;
      touchStartX = touchX;
    }
    e.preventDefault();
  });

  canvas.addEventListener('touchend', () => {
    player.velocityX = 0;
  });
});