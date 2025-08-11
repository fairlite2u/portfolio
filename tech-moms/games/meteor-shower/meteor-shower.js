    // Game elements
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownNumber = document.getElementById('countdown-number');
    const scoreDisplay = document.getElementById('score-display');
    const finalScore = document.getElementById('final-score');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const instructionsButton = document.getElementById('instructions-button');
    const backButton = document.getElementById('back-button');
    const menuButton = document.getElementById('menu-button');

    // Game constants
    const GRAVITY = 0.5;
    const JUMP_FORCE = -10;
    const METEOR_SPEED = 3;
    const METEOR_GAP = 180;
    const METEOR_WIDTH = 80;
    const METEOR_SPAWN_INTERVAL = 1500;
    const COUNTDOWN_TIME = 3; // seconds

    // Game variables
    let spaceship = {
      x: canvas.width / 3,
      y: canvas.height / 2,
      width: 60,
      height: 30,
      velocity: 0
    };

    let meteors = [];
    let score = 0;
    let highScore = 0;
    let gameActive = false;
    let animationFrameId;
    let meteorInterval;
    let stars = [];
    let countdownValue = COUNTDOWN_TIME;
    let countdownInterval;
    let controlsEnabled = false;

    // Create stars background
    function createStars() {
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3,
          speed: Math.random() * 0.5 + 0.1
        });
      }
    }

    // Draw stars background
    function drawStars() {
      ctx.fillStyle = "white";
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      }
    }

    // Draw spaceship
    function drawSpaceship() {
      ctx.save();
      ctx.translate(spaceship.x, spaceship.y);
      // Tilt the spaceship based on velocity
      const angle = Math.min(Math.max(spaceship.velocity * 0.05, -0.5), 0.5);
      ctx.rotate(angle);

      // Draw spaceship body
      ctx.fillStyle = "#0066ff";
      ctx.beginPath();
      ctx.moveTo(-spaceship.width / 2, 0);
      ctx.lineTo(-spaceship.width / 4, -spaceship.height / 2);
      ctx.lineTo(spaceship.width / 2, 0);
      ctx.lineTo(-spaceship.width / 4, spaceship.height / 2);
      ctx.closePath();
      ctx.fill();

      // Draw cockpit
      ctx.fillStyle = "#99ccff";
      ctx.beginPath();
      ctx.ellipse(0, 0, spaceship.width / 6, spaceship.height / 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw engine flame
      if (spaceship.velocity < 0) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(-spaceship.width / 2, -spaceship.height / 4);
        ctx.lineTo(-spaceship.width / 2 - Math.random() * 20, 0);
        ctx.lineTo(-spaceship.width / 2, spaceship.height / 4);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    // Create a new meteor pair
    function spawnMeteor() {
      const gap = METEOR_GAP;
      const topHeight = Math.floor(Math.random() * (canvas.height - gap - 100)) + 50;

      meteors.push({
        x: canvas.width,
        y: 0,
        width: METEOR_WIDTH,
        height: topHeight,
        passed: false,
        isMeteor: true
      });

      meteors.push({
        x: canvas.width,
        y: topHeight + gap,
        width: METEOR_WIDTH,
        height: canvas.height - topHeight - gap,
        passed: false,
        isMeteor: true
      });
    }

    // Draw meteors
    function drawMeteors() {
      for (let meteor of meteors) {
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x + meteor.width,
          meteor.y + meteor.height
        );

        gradient.addColorStop(0, "#888888");
        gradient.addColorStop(1, "#444444");

        ctx.fillStyle = gradient;

        // Draw meteor rocks instead of pipes
        if (meteor.isMeteor) {
          if (meteor.y === 0) { // Top meteor
            drawMeteorChain(meteor.x + meteor.width / 2, meteor.y, meteor.x + meteor.width / 2, meteor.height);
          } else { // Bottom meteor
            drawMeteorChain(meteor.x + meteor.width / 2, meteor.y, meteor.x + meteor.width / 2, canvas.height);
          }

          // Update hitbox for collision (making it a little smaller than visual for player friendliness)
          meteor.hitboxX = meteor.x + 10;
          meteor.hitboxWidth = meteor.width - 20;

        } else {
          ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height);
        }
      }
    }

    // Draw a chain of meteor rocks
    function drawMeteorChain(x, startY, endX, endY) {
      const numMeteors = Math.floor((endY - startY) / 40) + 1;

      for (let i = 0; i < numMeteors; i++) {
        const meteorY = startY + i * 40;
        const size = Math.random() * 20 + 30;

        ctx.save();

        ctx.beginPath();
        ctx.arc(x, meteorY, size / 2, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          x - size / 4, meteorY - size / 4, 0,
          x, meteorY, size / 2
        );

        gradient.addColorStop(0, "#aaaaaa");
        gradient.addColorStop(0.8, "#666666");
        gradient.addColorStop(1, "#444444");

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add some craters
        for (let j = 0; j < 3; j++) {
          const craterX = x + (Math.random() * size / 2 - size / 4);
          const craterY = meteorY + (Math.random() * size / 2 - size / 4);
          const craterSize = Math.random() * 5 + 2;

          ctx.beginPath();
          ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
          ctx.fillStyle = "#444444";
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Check collision
    function checkCollision() {
      // Check if spaceship hits the ground or ceiling
      if (spaceship.y + spaceship.height / 2 > canvas.height || spaceship.y - spaceship.height / 2 < 0) {
        return true;
      }

      // Check if spaceship hits any meteor
      for (let meteor of meteors) {
        const hitboxX = meteor.hitboxX || meteor.x;
        const hitboxWidth = meteor.hitboxWidth || meteor.width;

        if (
          spaceship.x + spaceship.width / 2 > hitboxX &&
          spaceship.x - spaceship.width / 2 < hitboxX + hitboxWidth &&
          spaceship.y + spaceship.height / 2 > meteor.y &&
          spaceship.y - spaceship.height / 2 < meteor.y + meteor.height
        ) {
          return true;
        }
      }

      return false;
    }

    // Update score
    function updateScore() {
      for (let i = 0; i < meteors.length; i += 2) {
        if (!meteors[i].passed && meteors[i].x + meteors[i].width < spaceship.x) {
          meteors[i].passed = true;
          meteors[i + 1].passed = true;
          score++;
          scoreDisplay.textContent = `Score: ${score}`;
        }
      }
    }

    // Main game loop
    function gameLoop() {
      ctx.fillStyle = "#000026";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      drawStars();

      // Apply physics to spaceship
      spaceship.velocity += GRAVITY;
      spaceship.y += spaceship.velocity;

      // Move meteors
      for (let meteor of meteors) {
        meteor.x -= METEOR_SPEED;
      }

      // Remove off-screen meteors
      meteors = meteors.filter(meteor => meteor.x + meteor.width > 0);

      // Draw game elements
      drawSpaceship();
      drawMeteors();

      // Check collisions
      if (checkCollision()) {
        endGame();
        return;
      }

      // Update score
      updateScore();

      // Continue game loop
      if (gameActive) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    }

    // Start countdown timer
    function startCountdown() {
      // Reset and show countdown screen
      countdownValue = COUNTDOWN_TIME;
      countdownNumber.textContent = countdownValue;
      countdownScreen.style.display = 'flex';

      // Update countdown every second
      countdownInterval = setInterval(() => {
        countdownValue--;
        countdownNumber.textContent = countdownValue;

        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          countdownScreen.style.display = 'none';
          launchGame();
        }
      }, 1000);
    }

    // Begin game countdown
    function beginGame() {
      // Hide all screens except countdown
      startScreen.style.display = 'none';
      gameOverScreen.style.display = 'none';
      instructionsScreen.style.display = 'none';

      // Reset game variables
      spaceship = {
        x: canvas.width / 3,
        y: canvas.height / 2,
        width: 60,
        height: 30,
        velocity: 0
      };
      meteors = [];
      score = 0;
      scoreDisplay.textContent = `Score: ${score}`;

      // Draw static scene during countdown
      ctx.fillStyle = "#000026";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawSpaceship();

      // Start countdown
      startCountdown();
    }

    // Launch game after countdown
    function launchGame() {
      // Hide countdown screen
      countdownScreen.style.display = 'none';

      // Enable controls
      controlsEnabled = true;

      // Set game as active
      gameActive = true;

      // Start meteor spawning
      spawnMeteor();
      meteorInterval = setInterval(spawnMeteor, METEOR_SPAWN_INTERVAL);

      // Start game loop
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    // End game
    function endGame() {
      gameActive = false;
      controlsEnabled = false;
      clearInterval(meteorInterval);
      cancelAnimationFrame(animationFrameId);

      if (score > highScore) {
        highScore = score;
      }

      finalScore.textContent = `Score: ${score} | High Score: ${highScore}`;
      gameOverScreen.style.display = 'flex';
    }

    // Show instructions
    function showInstructions() {
      startScreen.style.display = 'none';
      instructionsScreen.style.display = 'flex';
    }

    // Return to start screen
    function showStartScreen() {
      gameOverScreen.style.display = 'none';
      instructionsScreen.style.display = 'none';
      startScreen.style.display = 'flex';
    }

    // Event listeners
    startButton.addEventListener('click', beginGame);
    restartButton.addEventListener('click', beginGame);
    instructionsButton.addEventListener('click', showInstructions);
    backButton.addEventListener('click', showStartScreen);
    menuButton.addEventListener('click', showStartScreen);

    document.addEventListener('keydown', function (event) {
      if (event.code === 'Space') {
        event.preventDefault();

        if (!gameActive && startScreen.style.display !== 'none') {
          beginGame();
        } else if (gameActive && controlsEnabled) {
          spaceship.velocity = JUMP_FORCE;
        }
      }
    });

    canvas.addEventListener('click', function () {
      if (gameActive && controlsEnabled) {
        spaceship.velocity = JUMP_FORCE;
      }
    });

    // Initialize stars
    createStars();

    // Draw initial static scene
    ctx.fillStyle = "#000026";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawSpaceship();