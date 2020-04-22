// selectors
const grid = document.querySelector('.grid');
const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('.time-left');
const score = document.querySelector('.score');

const numberOfSquares = squares.length;
let result = 0;
let hitPoint = null;
let currTime = timeLeft.textContent;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    hitPoint = Math.floor(Math.random() * numberOfSquares);
    squares[ hitPoint ].classList.add('mole');
}

let moleTimerId = setInterval(randomSquare, 1000);
let clockTimerId = setInterval(clock, 1000);

function clock() {
    currTime--;
    timeLeft.textContent = currTime;

    if (currTime <= 0) {
        clearInterval(moleTimerId);
        clearInterval(clockTimerId);
        alert(`GAME OVER!! Final Score: ${result}`);
    }
}

function checkHit(event) {
    if(event.target.id-1 === hitPoint)
    {
        result++;
        score.textContent = result;
    }
}

// eventListeners
grid.addEventListener('mouseup', checkHit);