/* ==================== Global Varibals ==================== */
const deck = document.querySelector(".deck");
const card = document.querySelectorAll(".card");
let toggleCards = [];
let matched = 0;
const TOTAL_PAIRS = 8;

const restart = document.querySelector('.restart');

const cancel = document.querySelector('.modal-cancel');
const replay = document.querySelector('.modal-replay');

let moves = 0;

let clockOff = true;
let time = 0;
let clockId;


/* ==================== shuffle ==================== */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (const card of shuffledCards) {
        deck.appendChild(card);
    }
}

/* ==================== removeStar ==================== */
function removeStar() {
    const starList = document.querySelectorAll('.stars li');
    for (const star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none'
            break;
        }
    }
}

function checkScore() {
    if (moves === 16 || moves === 24) {
        removeStar();
    }
}

/* ==================== moves ==================== */
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

/* ==================== clock ==================== */
function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    clock.innerHTML = time;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function stopClock() {
    clearInterval(clockId);
}

/* ==================== restGame ==================== */
function resetTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStar() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

function resetGame() {
    matched = 0;
    toggleCards = [];
    resetTime();
    resetMoves();
    resetStar();
    shuffleDeck();
    resetCards();
}

restart.addEventListener('click', resetGame);


/* ==================== toggleCard ==================== */
function toggleCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget) {
    toggleCards.push(clickTarget);
}

function checkForMatch() {
    if (toggleCards[0].firstElementChild.className === toggleCards[1].firstElementChild.className) 
    {
        toggleCards[0].classList.toggle('match');
        toggleCards[1].classList.toggle('match');
        toggleCards = [];
        matched++;
        gameOver()
    } else {
        setTimeout (() => {
            toggleCard(toggleCards[0]);
            toggleCard(toggleCards[1]);
            toggleCards = [];
        }, 1000);
    }
}

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') && 
        !clickTarget.classList.contains('match') && 
        toggleCards.length < 2 && 
        !toggleCards.includes(clickTarget)
    );
}


deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if(isClickValid(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if(toggleCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
    }
});

/* ==================== popupModel ==================== */
function toggleModal() {
    const model = document.querySelector('.modal-background');
    model.classList.toggle('hide');
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

function writeModalStats() {
    const timeStat = document.querySelector('.modal-time');
    const moveStat = document.querySelector('.modal-moves');
    const starsStat = document.querySelector('.modal-stars');
    const clockTime= document.querySelector('.clock').innerHTML;
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    moveStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function gameOver() {
    if (matched === TOTAL_PAIRS) {
        stopClock();
        writeModalStats();
        toggleModal();
    }
}

function replayGame() {
    resetGame();
    toggleModal();
}

cancel.addEventListener('click', () => {
    toggleModal();
});

replay.addEventListener('click', replayGame);