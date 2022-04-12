const memoryCards = document.querySelectorAll('.card');

let isFlippedCard = false;
let firstCard, secondCard;
let lockTheGame;

function flipTheCard () {
    if (lockTheGame) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!isFlippedCard) {
        // it means this is the first click
        isFlippedCard = true;
        firstCard = this;
    } else {
        // the user's second click
        isFlippedCard = false;
        secondCard = this;

        checkTheMatch ();
    }
}

function checkTheMatch () {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        // it is a match
        freezeCards ();
    } else {
        // not a match
        unflipTheCards ();
    }; 
};

function freezeCards () {
    firstCard.removeEventListener("click", flipTheCard);
    secondCard.removeEventListener("click", flipTheCard);
    resetGameBoard ();
}

function unflipTheCards () {
    lockTheGame = true;
    setTimeout ( () => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        lockTheGame = false;
        resetGameBoard ();
    }, 1000);
}

function resetGameBoard () {
    isFlippedCard = false;
    lockTheGame = false;
    firstCard = null;
    secondCard = null;
}

memoryCards.forEach(card => card.addEventListener("click", flipTheCard));