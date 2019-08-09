/**
 * 
 * =====> Varibals
 **/

const deck = document.querySelector(".deck");
const card = document.querySelectorAll(".card");
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let toggleCards = [];

////////////////////////////////////////////////////////////////
/**
 * 
 * =====> toggleCard
 **/

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

////////////////////////////////////////////////////////////////
/**
 * 
 * =====> shuffle
 **/

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
shuffleDeck();

////////////////////////////////////////////////////////////////
/**
 * 
 * =====> moves
 **/

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

////////////////////////////////////////////////////////////////
/**
 * 
 * =====> removeStar
**/

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


////////////////////////////////////////////////////////////////
/**
 * 
 * =====> clock
 **/
function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

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

function stopClock() {
    clearInterval(clockId);
}




////////////////////////////////////////////////////////////////

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

