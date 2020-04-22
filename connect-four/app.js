document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const displayCurrentPlayer = document.querySelector("#current-player");
    const result = document.querySelector('#result');
    let currentPlayer = 1;

    squares.forEach((square, index) => {
        if (index >= 42)
            return;
        square.onclick = () => {
            if (squares[ index + 7 ].classList.contains('taken') &&
                !square.classList.contains('player')) {
                if (currentPlayer === 1) {
                    square.classList.add('taken', 'player', 'one');
                    currentPlayer = 2;
                } else if (currentPlayer === 2) {
                    square.classList.add('taken', 'player', 'two');
                    currentPlayer = 1;
                }
                if (checkWin(index))
                    setTimeout(
                        () => alert(`Player - ${currentPlayer} has won the game!!`),
                        200
                    );

                displayCurrentPlayer.textContent = currentPlayer;
            } else
                alert('Invalid Move!!');
        }
    });

    function checkWin(squareIndex) {
        if (getNumberOfSameSquares(squareIndex, 1) + getNumberOfSameSquares(squareIndex, -1) > 2 ||
            getNumberOfSameSquares(squareIndex, 6) + getNumberOfSameSquares(squareIndex, -6) > 2 ||
            getNumberOfSameSquares(squareIndex, 7) + getNumberOfSameSquares(squareIndex, -7) > 2 ||
            getNumberOfSameSquares(squareIndex, 8) + getNumberOfSameSquares(squareIndex, -8) > 2) {
            return true;
        }
        return false;
    }

    function getNumberOfSameSquares(index, increment) {
        if (isSamePlayer(index, index + increment))
            return 1 + getNumberOfSameSquares(index + increment, increment);

        return 0;
    }

    function isSamePlayer(index1, index2) {
        if (index1 < 0 ||
            index2 < 0 ||
            index1 > 41 ||
            index2 > 41 ||
            !squares[ index1 ].classList.contains('player') ||
            !squares[ index2 ].classList.contains('player'))
            return false;
        else if (squares[ index1 ].className === squares[ index2 ].className)
            return true;
    }
});