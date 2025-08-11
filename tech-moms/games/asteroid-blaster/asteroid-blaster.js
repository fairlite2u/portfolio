document.addEventListener('DOMContentLoaded', () => {
  // Game canvas and context
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  // Game elements
  const game = {
    width: canvas.width,
    height: canvas.height,
    running: false,
    score: 0,
    lives: 3,
    asteroidsSpeed: 2,
    asteroidSpawnRate: 60,
    frameCount: 0,
    safeZoneSize: 60,
    targets: 5,
    targetsReached: 0
  };

  // Player spaceship
  const player = {
    x: game.width / 2,
    y: game.height - 50,
    width: 30,
    height: 40,
    speed: 5,
    color: '#5599ff',
    blasterColor: '#ff5555',
    direction: {
      left: false,
      right: false,
      up: false,
      down: false
    },
    draw() {
      // Draw spaceship body
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.width / 2, this.y + this.height);
      ctx.lineTo(this.x + this.width / 2, this.y + this.height);
      ctx.closePath();
      ctx.fill();

      // Draw spaceship blaster
      ctx.fillStyle = this.blasterColor;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + 10, 5, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    update() {
      // Handle movement
      if (this.direction.left && this.x > this.width / 2) {
        this.x -= this.speed;
      }
      if (this.direction.right && this.x < game.width - this.width / 2) {
        this.x += this.speed;
      }
      if (this.direction.up && this.y > 0) {
        this.y -= this.speed;
      }
      if (this.direction.down && this.y < game.height - this.height) {
        this.y += this.speed;
      }
    }
  };

  // Asteroids array
  let asteroids = [];

  // Target zones array
  let targetZones = [];

  // Array for laser shots
  let lasers = [];

  // Create stars for background
  const stars = [];
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 2 + 1;
    stars.push({
      x: Math.random() * game.width,
      y: Math.random() * game.height,
      size: size,
      alpha: Math.random(),
      speed: size / 3
    });
  }

  // Create target zones
  function createTargetZones() {
    targetZones = [];
    const zoneWidth = game.width / game.targets;

    for (let i = 0; i < game.targets; i++) {
      targetZones.push({
        x: i * zoneWidth + zoneWidth / 2,
        y: 30,
        radius: 20,
        color: '#55ff55',
        captured: false
      });
    }
  }

  // Create an asteroid
  function createAsteroid() {
    const size = Math.random() * 20 + 20;
    const asteroid = {
      x: Math.random() * game.width,
      y: -size,
      radius: size,
      speed: Math.random() * 2 + game.asteroidsSpeed,
      color: `hsl(${Math.random() * 60 + 10}, 50%, 40%)`,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1
    };
    asteroids.push(asteroid);
  }

  // Check collision between player and asteroid
  function checkCollision(player, asteroid) {
    // Create a simplified hitbox for the player
    const playerHitbox = {
      x: player.x,
      y: player.y + player.height / 2,
      radius: player.width / 2
    };

    const dx = playerHitbox.x - asteroid.x;
    const dy = playerHitbox.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < playerHitbox.radius + asteroid.radius;
  }

  // Check if player reached a target zone
  function checkTargetZone() {
    for (let i = 0; i < targetZones.length; i++) {
      const target = targetZones[i];
      if (!target.captured) {
        const dx = player.x - target.x;
        const dy = player.y - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < target.radius + player.width / 4) {
          target.captured = true;
          target.color = '#aaffaa';
          game.score += 100;
          game.targetsReached++;

          // Check if all targets are reached
          if (game.targetsReached >= game.targets) {
            victory();
            return true;
          }

          return true;
        }
      }
    }
    return false;
  }

  // Fire a laser
  function fireLaser() {
    lasers.push({
      x: player.x,
      y: player.y,
      width: 3,
      height: 15,
      speed: 10,
      color: '#ff5555'
    });
  }

  // Update lasers and check for asteroid hits
  function updateLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
      const laser = lasers[i];
      laser.y -= laser.speed;

      // Remove laser if off screen
      if (laser.y < 0) {
        lasers.splice(i, 1);
        continue;
      }

      // Check for asteroid hits
      for (let j = asteroids.length - 1; j >= 0; j--) {
        const asteroid = asteroids[j];
        const dx = laser.x - asteroid.x;
        const dy = (laser.y - laser.height / 2) - asteroid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < asteroid.radius) {
          // Asteroid hit!
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          game.score += 25;
          break;
        }
      }
    }
  }

  // Game over
  function gameOver() {
    game.running = false;
    document.getElementById('game-over').style.display = 'flex';
    document.getElementById('final-score').textContent = game.score;
  }

  // Victory
  function victory() {
    game.running = false;
    document.getElementById('victory').style.display = 'flex';
    document.getElementById('victory-score').textContent = game.score;
  }

  // Reset game
  function resetGame() {
    game.running = true;
    game.score = 0;
    game.lives = 3;
    game.targetsReached = 0;

    asteroids = [];
    lasers = [];

    player.x = game.width / 2;
    player.y = game.height - 50;

    createTargetZones();

    document.getElementById('score-display').textContent = `Score: 0`;
    document.getElementById('lives-display').textContent = `Lives: 3`;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('victory').style.display = 'none';
  }

  // Draw the background with stars
  function drawBackground() {
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, game.width, game.height);

    // Draw stars
    for (const star of stars) {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Move stars for parallax effect
      star.y += star.speed;
      if (star.y > game.height) {
        star.y = 0;
        star.x = Math.random() * game.width;
      }

      // Twinkle effect
      star.alpha = Math.sin(game.frameCount * 0.01 + star.x) * 0.3 + 0.7;
    }
  }

  // Draw safe zones at the bottom
  function drawSafeZone() {
    ctx.fillStyle = 'rgba(85, 85, 255, 0.2)';
    ctx.fillRect(0, game.height - game.safeZoneSize, game.width, game.safeZoneSize);
  }

  // Draw target zones
  function drawTargetZones() {
    for (const target of targetZones) {
      ctx.fillStyle = target.color;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw crosshair
      if (!target.captured) {
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(target.x - 10, target.y);
        ctx.lineTo(target.x + 10, target.y);
        ctx.moveTo(target.x, target.y - 10);
        ctx.lineTo(target.x, target.y + 10);
        ctx.stroke();
      }
    }
  }

  // Draw asteroids
  function drawAsteroids() {
    for (const asteroid of asteroids) {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);

      ctx.fillStyle = asteroid.color;
      ctx.beginPath();

      // Create irregular asteroid shape
      const numPoints = 8;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = asteroid.radius * (0.8 + Math.cos(i * 4) * 0.2);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fill();

      // Add detail to asteroid
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      for (let i = 0; i < 3; i++) {
        const craterSize = asteroid.radius * (Math.random() * 0.2 + 0.1);
        const craterX = (Math.random() - 0.5) * asteroid.radius;
        const craterY = (Math.random() - 0.5) * asteroid.radius;

        ctx.beginPath();
        ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Update asteroid position and rotation
      asteroid.y += asteroid.speed;
      asteroid.rotation += asteroid.rotationSpeed;
    }
  }

  // Draw lasers
  function drawLasers() {
    for (const laser of lasers) {
      ctx.fillStyle = laser.color;
      ctx.fillRect(laser.x - laser.width / 2, laser.y - laser.height, laser.width, laser.height);

      // Add glow effect
      ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
      ctx.beginPath();
      ctx.arc(laser.x, laser.y - laser.height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Update game state
  function update() {
    if (!game.running) return;

    game.frameCount++;

    // Spawn asteroids
    if (game.frameCount % game.asteroidSpawnRate === 0) {
      createAsteroid();
    }

    // Update player
    player.update();

    // Update lasers
    updateLasers();

    // Check for target zone capture
    checkTargetZone();

    // Check for asteroid collisions
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];

      // Remove asteroids that are off-screen
      if (asteroid.y > game.height + asteroid.radius) {
        asteroids.splice(i, 1);
        continue;
      }

      // Check for collision with player (only if not in safe zone)
      if (player.y < game.height - game.safeZoneSize && checkCollision(player, asteroid)) {
        asteroids.splice(i, 1);
        game.lives--;
        document.getElementById('lives-display').textContent = `Lives: ${game.lives}`;

        if (game.lives <= 0) {
          gameOver();
          return;
        }
      }
    }

    // Update score display
    document.getElementById('score-display').textContent = `Score: ${game.score}`;
  }

  // Draw game elements
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, game.width, game.height);

    // Draw background
    drawBackground();

    // Draw safe zone
    drawSafeZone();

    // Draw target zones
    drawTargetZones();

    // Draw asteroids
    drawAsteroids();

    // Draw lasers
    drawLasers();

    // Draw player
    player.draw();
  }

  // Game loop
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  // Initialize game
  function init() {
    createTargetZones();

    // Event listeners for keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') player.direction.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') player.direction.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w') player.direction.up = true;
      if (e.key === 'ArrowDown' || e.key === 's') player.direction.down = true;

      // Fire laser with space
      if (e.key === ' ' && game.running) {
        fireLaser();
        e.preventDefault(); // Prevent page scroll
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') player.direction.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') player.direction.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w') player.direction.up = false;
      if (e.key === 'ArrowDown' || e.key === 's') player.direction.down = false;
    });

    // Start button
    document.getElementById('start-button').addEventListener('click', () => {
      document.getElementById('instructions').style.display = 'none';
      resetGame();
    });

    // Restart button
    document.getElementById('restart-button').addEventListener('click', resetGame);

    // Play again button (from victory screen)
    document.getElementById('play-again-button').addEventListener('click', resetGame);

    gameLoop();
  }

  // Start the game
  init();
});