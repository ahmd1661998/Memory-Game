/**
 * 
 * =====> Varibals
 **/

const deck = document.querySelector(".deck");
const card = document.querySelectorAll(".card");

let toggleCards = [];

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
            toggleCards(toggleCards[1]);
            toggleCards = [];
        }, 1000);
    }
}

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if(clickTarget.classList.contains('card') && toggleCards.length < 2) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if(toggleCards.length === 2) {
            checkForMatch(clickTarget);
        }
    }
});






























// Shuffle function from http://stackoverflow.com/a/2450976
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
