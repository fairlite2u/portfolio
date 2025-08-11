document.addEventListener('DOMContentLoaded', () => {

  //card options
  const cardArray = [{
      name: 'purple-violet nebula',
      img: 'images/nebula-card-1.svg'
    },
    {
      name: 'purple-violet nebula',
      img: 'images/nebula-card-1.svg'
    },
    {
      name: 'red-orange nebula',
      img: 'images/nebula-card-2.svg'
    },
    {
      name: 'red-orange nebula',
      img: 'images/nebula-card-2.svg'
    },
    {
      name: 'blue nebula',
      img: 'images/nebula-card-3.svg'
    },
    {
      name: 'blue nebula',
      img: 'images/nebula-card-3.svg'
    },
    {
      name: 'green nebula',
      img: 'images/nebula-card-4.svg'
    },
    {
      name: 'green nebula',
      img: 'images/nebula-card-4.svg'
    },
    {
      name: 'magenta nebula',
      img: 'images/nebula-card-5.svg'
    },
    {
      name: 'magenta nebula',
      img: 'images/nebula-card-5.svg'
    },
    {
      name: 'golden yellow nebula',
      img: 'images/nebula-card-6.svg'
    },
    {
      name: 'golden yellow nebula',
      img: 'images/nebula-card-6.svg'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenId = []
  let cardsWon = []

  //create the game board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/rainbow-nebulas.svg')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //Custom alert box
  function showAlert(title, message) {
    // Create a custom alert box
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="document.body.removeChild(this.parentElement)">OK</button>
    `;
    document.body.appendChild(alertBox);
  }

  //check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/rainbow-nebulas.svg')
      cards[optionTwoId].setAttribute('src', 'images/rainbow-nebulas.svg')
      showAlert('Nebula match says', 'You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/rainbow-nebulas.svg')
      cards[optionTwoId].setAttribute('src', 'images/rainbow-nebulas.svg')
      showAlert('Nebula match says', 'Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip the card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard();

})