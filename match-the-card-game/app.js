document.addEventListener('DOMContentLoaded', () => {
    // selectors
    const grid = document.getElementById('grid');
    const result = document.getElementById('result')
    // cards list
    const cardArray = [
        {
            name: "cheeseburger",
            image: "images/cheeseburger.png"
        },
        {
            name: "fries",
            image: "images/fries.png"
        },
        {
            name: "hotdog",
            image: "images/hotdog.png"
        },
        {
            name: "ice-cream",
            image: "images/ice-cream.png"
        },
        {
            name: "milkshake",
            image: "images/milkshake.png"
        },
        {
            name: "cheeseburgpizzar",
            image: "images/pizza.png"
        },
        {
            name: "cheeseburger",
            image: "images/cheeseburger.png"
        },
        {
            name: "fries",
            image: "images/fries.png"
        },
        {
            name: "hotdog",
            image: "images/hotdog.png"
        },
        {
            name: "ice-cream",
            image: "images/ice-cream.png"
        },
        {
            name: "milkshake",
            image: "images/milkshake.png"
        },
        {
            name: "cheeseburgpizzar",
            image: "images/pizza.png"
        }
    ];
    cardArray.sort(() => 0.3-Math.random());
    // game data
    let clickedCardsName = [];
    let clickedCardsId = [];
    let cardsWon = [];

    function init() {
        clickedCardsName = [];
        clickedCardsId = [];
        cardsWon = [];
        cardArray.sort(() => 0.3 - Math.random());
        grid.innerHTML = "";
        createBoard();
    }

    // functions
    function createBoard() {
        result.innerText = 0;
        for (let i = 0; i < 12; ++i) {
            const gridCard = document.createElement('img');
            gridCard.setAttribute('src', "images/blank.png");
            gridCard.setAttribute('data-id', i);

            grid.appendChild(gridCard);
            gridCard.addEventListener('click', flipCard);
        }
    }

    // flip the cards
    function flipCard() {
        const selectedCardId = this.getAttribute('data-id');
        if (cardsWon.indexOf(selectedCardId) !== -1)
            return;

        this.setAttribute('src', cardArray[ selectedCardId ].image);
        clickedCardsName.push(cardArray[ selectedCardId ].name);
        clickedCardsId.push(selectedCardId);

        if (clickedCardsId.length === 2)
            setTimeout(checkForMatch, 500);
    }

    // check if cards won
    function checkForMatch() {
        const cards = document.querySelectorAll('img');

        if (clickedCardsName[ 1 ] === clickedCardsName[ 0 ]) {
            alert('You found a match');
            cardsWon.push(clickedCardsId[ 0 ], clickedCardsId[ 1 ]);

            cards[ clickedCardsId[ 0 ] ].setAttribute('src', 'images/white.png');
            cards[ clickedCardsId[ 1 ] ].setAttribute('src', 'images/white.png');

            result.innerText = cardsWon.length / 2;
        }
        else {
            alert('Sorry, try again');
            cards[ clickedCardsId[ 0 ] ].setAttribute('src', 'images/blank.png');
            cards[ clickedCardsId[ 1 ] ].setAttribute('src', 'images/blank.png');
        }

        clickedCardsName = [];
        clickedCardsId = [];

        // check if game finish
        if (cardsWon.length === cards.length)
            if (!alert("Congratulations!! You've won!!"))
                init();
    }

    init();
});