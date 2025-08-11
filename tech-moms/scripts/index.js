// Game data
const games = [{
    id: 1,
    title: "Space Ro-Sham-Bo",
    description: "Asteroid crushes Telescope, Cosmic Void captures Asteroid, Telescope cuts Cosmic Void.",
    icon: "☄️🌌🔭",
    url: "games/rock-paper-scissors/rock-paper-scissors.html"
  },
  {
    id: 2,
    title: "Space Invaders",
    description: "Defend Earth from alien invaders in this classic arcade game.",
    icon: "👾",
    url: "games/space-invaders/space-invaders.html"
  },
  {
    id: 3,
    title: "Cosmic Defender",
    description: "Protect your space station from enemy attacks.",
    icon: "🛸",
    url: "games/cosmic-defender/cosmic-defender.html"
  },
  {
    id: 4,
    title: "Asteroid Blaster",
    description: "Blast your way through asteroid fields to reach safety.",
    icon: "🚀",
    url: "games/asteroid-blaster/asteroid-blaster.html"
  },
  {
    id: 5,
    title: "Alien Tetris",
    description: "Clear blocks to communicate with extraterrestrial beings.",
    icon: "👽",
    url: "games/alien-puzzle/alien-puzzle.html"
  },
  {
    id: 6,
    title: "Planet Jumper",
    description: "Jump from planet to planet collecting cosmic energy.",
    icon: "🪐",
    url: "games/planet-jumper/planet-jumper.html"
  },
  {
    id: 7,
    title: "Meteor Shower",
    description: "Dodge falling meteors as you collect valuable space minerals.",
    icon: "☄️",
    url: "games/meteor-shower/meteor-shower.html"
  },
  {
    id: 8,
    title: "Nebula Match",
    description: "Match colorful nebula patterns to create powerful supernovas.",
    icon: "🌌",
    url: "games/nebula-match/nebula-match.html"
  }
  // ,
  // {
  //   id: 9,
  //   title: "Starship Builder",
  //   description: "Design and test your own starship in interstellar challenges.",
  //   icon: "🌌",
  //   url: "games/starship-builder.html"
  // },
  // {
  //   id: 10,
  //   title: "Galactic Racer",
  //   description: "Race through the cosmos at light speed, avoiding obstacles.",
  //   icon: "🚀",
  //   url: "games/galactic-racer.html"
  // }
];

// Generate stars for background
function createStars(numStars) {
  const body = document.body;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random positioning
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random size between 1-3 pixels
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random twinkle delay and duration
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s ${Math.random() * 3}s infinite`;

    body.appendChild(star);
  }
}

// Create game cards
const createGameCards = () => {
  const gamesGrid = document.getElementById('games-grid');

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.setAttribute('data-id', game.id);

    gameCard.innerHTML = `
              <div class="game-img">
                  <div class="game-icon">${game.icon}</div>
              </div>
              <div class="game-info">
                  <div class="game-title">${game.title}</div>
                  <div class="game-desc">${game.description}</div>
              </div>
          `;

    gameCard.addEventListener('click', () => openGameModal(game));

    gamesGrid.appendChild(gameCard);
  });
};

// Open game modal
const openGameModal = (game) => {
  const modal = document.getElementById('game-modal');
  const modalTitle = document.getElementById('modal-title');
  const gameContent = document.getElementById('game-content');


  modalTitle.textContent = game.title;

  // Show loading message while iframe loads
  gameContent.innerHTML = `<div class="loading-message">Loading ${game.title}...</div>`;

  // Create iframe to load the game HTML file
  setTimeout(() => {
    gameContent.innerHTML = `
        <iframe src="${game.url}" class="game-iframe" id="game-frame" title="${game.title}"></iframe>
    `;

    // Handle possible loading errors
    const iframe = document.getElementById('game-frame');
    iframe.onerror = () => {
      gameContent.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1.5rem;">${game.icon}</div>
            <p>Sorry, there was an error loading the game. Please try again later.</p>
        `;
    };
  }, 500); // Short delay to show loading animation


  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Close game modal
const closeGameModal = () => {
  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// Random game selection
const selectRandomGame = () => {
  const randomIndex = Math.floor(Math.random() * games.length);
  const randomGame = games[randomIndex];
  openGameModal(randomGame);
};

// Initialize app
const init = () => {
  // createStars();
  createGameCards();
  window.addEventListener('load', () => createStars(200));

  // Event listeners
  document.getElementById('random-game').addEventListener('click', selectRandomGame);
  document.getElementById('close-modal').addEventListener('click', closeGameModal);

  // Close modal when clicking outside
  document.getElementById('game-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('game-modal')) {
      closeGameModal();
    }
  });
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);