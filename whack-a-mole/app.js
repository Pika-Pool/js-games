// selectors
const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('.time-left');
const score = document.querySelector('.score');


const numberOfSquares = 9;
let currTime = timeLeft.textContent;
let result = 0;
let hitSquareId = null;

let timerId = setInterval(timer, 1000);
let moleTimerId = setInterval(randomSquare, 1000);

// game
function randomSquare() {
    squares.forEach(sqaure => {
        sqaure.classList.remove('mole');
    });

    let randomSquare = Math.floor(Math.random() * numberOfSquares);
    // console.log(randomSquare);
    squares[randomSquare].classList.add('mole');
    hitSquareId = squares[randomSquare].id;
}

squares.forEach(sqaure => {
    sqaure.addEventListener('mouseup', () => {
        if(sqaure.id === hitSquareId)
            result++;
        score.textContent = result;
    });
});

function timer() {
    currTime--;
    timeLeft.textContent = currTime;

    if(currTime <= 0)
    {
        clearInterval(timerId);
        clearInterval(moleTimerId);
        alert(`GAME OVER!!\nFinal Score: ${result}`);
    }
}