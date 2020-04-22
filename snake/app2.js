document.addEventListener('DOMContentLoaded', () => {
    // selectors
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start');

    // variables and data
    const width = 10;
    let direction = 1,
        snakeBody = new Array(),
        appleIndex = 0,
        intervalTime = 1000,
        intervalId = null,
        score = 0,
        speed = 0.9;

    // functions
    // reset game and start interval
    function startGame() {
        snakeBody.forEach(index => squares[ index ].classList.remove('snake'));

        direction = 1;                // to the right
        snakeBody = [ 2, 1, 0 ];      // 2 is HEAD, 1 is BODY, 0 is TAIL(index of respective square)
        snakeBody.forEach(index => squares[ index ].classList.add('snake'));

        randomApple();           // generate random apple index, remove and add previous and new apple respectively
        score = 0;

        clearInterval(intervalId);
        intervalTime = 1000;
        intervalId = setInterval(gameLogic, intervalTime);
    }

    // game logic handler
    function gameLogic() {
        // check if game over
        if(checkEnd())
            return;

        const tail = snakeBody.pop();
        squares[ tail ].classList.remove('snake');

        // check if apple eaten
        if (snakeBody[ 0 ] + direction === appleIndex) {
            snakeBody.push(tail);
            squares[ tail ].classList.add('snake');
            randomApple();

            score++;
            scoreDisplay.textContent = score;

            clearInterval(intervalId);
            intervalTime *= speed;
            intervalId = setInterval(gameLogic, intervalTime);
        }

        snakeBody.unshift(snakeBody[ 0 ] + direction);
        squares[ snakeBody[ 0 ] ].classList.add('snake');
    }

    // check if game ended
    function checkEnd() {
        if (
            (snakeBody[ 0 ] % width === 0 && direction === -1) ||                   // left border
            (snakeBody[ 0 ] - width < 0 && direction === -width) ||                 // top border
            (snakeBody[ 0 ] % width === width - 1 && direction === 1) ||            // right border
            (snakeBody[ 0 ] + width >= width * width && direction === width) ||     // bottom border
            (squares[ snakeBody[ 0 ] + direction ].classList.contains('snake'))     // collide with own body
        ) {
            clearInterval(intervalId);
            alert('GAME OVER!!');
            return true;
        }
        return false;
    }

    // random apple generator
    function randomApple() {
        squares[ appleIndex ].classList.remove('apple');

        if (snakeBody.length === squares.length) {
            clearInterval(intervalId);
            alert('CONGRATULTIONS!! You beat the game!!');
            return;
        }

        appleIndex = Math.floor(Math.random() * (width*width));
        if(snakeBody.indexOf(appleIndex) !== -1)
            randomApple();
        squares[ appleIndex ].classList.add('apple');
    }

    // game controls
    function control(e) {
        switch (e.keyCode) {
            case 37:    // left arrow
                direction = -1;
                break;
            case 38:    // top arrow
                direction = -width;
                break;
            case 39:    // right arrow
                direction = 1;
                break;
            case 40:    // bottom arrow
                direction = width;
                break;
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});