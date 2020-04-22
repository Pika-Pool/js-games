document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start');


    const width = 10;
    let currentIndex = 0;
    let currentSnake = [ 2, 1, 0 ];   // 2 is HEAD, 1 is BODY, 0 is TAIL here
    let appleIndex = 8;
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let intervalId = 0;

    function startGame() {
        currentSnake.forEach(index => squares[ index ].classList.remove('snake'));

        currentIndex = 0;
        currentSnake = [ 30, 40, 50 ];
        currentSnake.forEach(index => squares[ index ].classList.add('snake'));

        randomApple();
        direction = -width;
        score = 0;
        scoreDisplay.textContent = score;
        intervalTime = 1000;
        intervalId = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {
        if (
            (currentSnake[ 0 ] - width < 0 && direction === -width) ||
            (currentSnake[ 0 ] % width === width - 1 && direction === 1) ||
            (currentSnake[ 0 ] + width >= width * width && direction === width) ||
            (currentSnake[ 0 ] % width === 0 && direction === -1) ||
            squares[ currentSnake[ 0 ] + direction ].classList.contains('snake')
        ) {
            clearInterval(intervalId);
            return alert('GAME OVER!!');
        }

        const tail = currentSnake.pop();
        squares[ tail ].classList.remove('snake');

        if (squares[ currentSnake[ 0 ] + direction ].classList.contains('apple')) {
            squares[ tail ].classList.add('snake');
            currentSnake.push(tail);

            randomApple();

            score++;
            scoreDisplay.textContent = score;
            clearInterval(intervalId);
            intervalTime *= speed;
            intervalId = setInterval(moveOutcomes, intervalTime);
        }

        currentSnake.unshift(currentSnake[ 0 ] + direction);
        squares[ currentSnake[ 0 ] ].classList.add('snake');
    }

    function control(e) {
        squares[ currentIndex ].classList.remove('snake');

        switch (e.keyCode) {
            case 39:    // right arrow
                direction = 1;
                break;
            case 38:    // up arrow
                direction = -width;
                break;
            case 37:    // left arrow
                direction = -1;
                break;
            case 40:    // down arrow
                direction = width;
        }
    }

    function randomApple() {
        squares[ appleIndex ].classList.remove('apple');

        appleIndex = Math.floor(Math.random() * (width * width));
        if (currentSnake.indexOf(appleIndex) !== -1)
            randomApple();

        squares[ appleIndex ].classList.add('apple');
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});