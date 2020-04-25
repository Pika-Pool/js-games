document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');

    const width = 15;
    let score = 0;
    scoreDisplay.textContent = score;

    let playerPosition = Math.floor(width * (width - 1.5));

    let invaderArray = [];
    let invaderMoveDirection = 1;
    let invaderIntervalTime = 500;
    let invaderIntervalId = setInterval(moveInvaders, invaderIntervalTime);

    // draw starter
    for (
        let i = 0, j = i + width, k = j + width;
        i < 10;
        ++i, ++j, ++k
    ) {
        invaderArray.push(i, j, k);
        squares[ i ].classList.add('invader');
        squares[ j ].classList.add('invader');
        squares[ k ].classList.add('invader');
    }
    squares[ playerPosition ].classList.add('player');

    // functions
    // move invaders on the board
    function moveInvaders() {
        invaderArray.forEach(invader => {
            squares[ invader ].classList.remove('invader');
        });

        let rightmostInvader = invaderArray.find(invader => invader % width === width - 1);
        let leftmostInvader = invaderArray.find(invader => invader % width === 0);

        if (
            (invaderMoveDirection === 1 && rightmostInvader) ||
            (invaderMoveDirection === -1 && leftmostInvader)
        ) {
            invaderArray = invaderArray.map(invader => invader + width);
            invaderMoveDirection = invaderMoveDirection === 1 ? -1 : 1;
        }
        else {
            invaderArray = invaderArray.map(invader => invader + invaderMoveDirection);
        }

        // console.log(invaderArray);

        invaderArray.forEach(invader => {
            squares[ invader ].classList.add('invader');
        });
        checkGameOver();
    }

    // check for game win or lose
    function checkGameOver() {
        if (invaderArray.length <= 0) {
            clearInterval(invaderIntervalId);
            alert("CONGRATULATIONS!! You defeated the alien invaders");
        }
        else if (
            invaderArray.find(invader => squares[ invader ].classList.contains('player', 'invader')) ||
            invaderArray.find(invader => (invader + invaderMoveDirection >= width * width))
        ) {
            clearInterval(invaderIntervalId);
            alert('GAME OVER!! You were defeated by the alien invaders');
        }
    }

    // move player using keyboard
    function movePlayer(direction) {
        if (
            (direction === 1 && playerPosition % width === width - 1) ||
            (direction === -1 && playerPosition % width === 0)
        ) {
            return;
        }
        squares[ playerPosition ].classList.remove('player');
        playerPosition += direction;
        squares[ playerPosition ].classList.add('player');
    }

    // shoot lasers
    function shoot() {
        let laserIntervalTime = 100;
        let laserIntervalId;
        let laserPosition = playerPosition;

        function moveLaser() {
            squares[ laserPosition ].classList.remove('laser');
            laserPosition -= width;
            squares[ laserPosition ].classList.add('laser');
            
            if (laserPosition - width < 0) {
                squares[ laserPosition ].classList.remove('laser');
                clearInterval(laserIntervalId);
            }
            else if (squares[ laserPosition ].classList.contains('invader', 'laser')) {
                invaderArray.splice(invaderArray.indexOf(laserPosition), 1);

                squares[ laserPosition ].classList.remove('invader', 'laser');

                squares[ laserPosition ].classList.add('hit');
                squares[ laserPosition ].addEventListener('animationend', () => {
                    squares[ laserPosition ].classList.remove('hit');
                });

                clearInterval(laserIntervalId);

                score++;
                scoreDisplay.textContent = score;
            }
        }

        laserIntervalId = setInterval(moveLaser, laserIntervalTime);
    }

    // keyboard controls
    function controls(event) {
        switch (event.keyCode) {
            case 37:            // left arrow
            case 65:            // a key
                movePlayer(-1);
                break;
            case 39:            // right arrow
            case 68:            // s key
                movePlayer(1);
                break;
            case 32:            // space bar
            case 38:            // up arrow
            case 87:            // w key
                shoot();
                break;
        }
    }

    document.addEventListener('keydown', controls);
});