let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');


let colors = ['red', 'blue', 'gray', 'yellow', 'purple'];
let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleSquareClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');

    isGameStarted = true;
    hide($start);
    $game.style.backgroundColor = '#fff';
    renderSquares();

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            //console.log(1);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);


}

function handleSquareClick(e) {
    if (!isGameStarted) {
        //startGame();

        return;
    }
    if (e.target.dataset.square) {
        score++;
        renderSquares();
    }

}


function renderSquares() {
    $game.innerHTML = '';

    let square = document.createElement('div');
    let squareSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - squareSize;
    let maxLeft = gameSize.width - squareSize;

    square.style.height = square.style.width = `${squareSize}px`;
    square.style.position = 'absolute';
    square.style.backgroundColor = colors[getRandom(0,colors.length)];
    square.style.top = getRandom(0, maxTop) + 'px';
    square.style.left = getRandom(0, maxLeft) + 'px';
    square.style.cursor = 'pointer';
    square.setAttribute('data-square', true);

    $game.insertAdjacentElement('afterbegin', square);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setGameScore() {
    $result.textContent = score.toString();
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function show($el){
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}