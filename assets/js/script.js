document.addEventListener('DOMContentLoaded', on());

const memoryCards = document.querySelectorAll('.card');

let isFlippedCard = false;
let firstCard, secondCard;
let lockTheGame;
let score = 0;
let moves = 0;

// Overlay functions
function on() {
    document.getElementById("start-overlay").style.display = "block";
}

function off() {
    document.getElementById("start-overlay").style.display = "none";
}

function winOn() {
    document.getElementById("win-overlay").style.display = "block";
}

function winOff() {
    document.getElementById("win-overlay").style.display = "none";
}

// Increase the score for each correct match
function incrementScore() {
    score++;
    document.getElementById("score").innerText = score;
}

// Increase the moves for each attempt
function incrementMoves() {
    moves++;
    document.getElementById("moves").innerText = moves;
}


function flipTheCard() {
    if (lockTheGame) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!isFlippedCard) {
        // This is the first click
        isFlippedCard = true;
        firstCard = this;
    } else {
        // This is the second click
        isFlippedCard = false;
        secondCard = this;

        checkTheMatch();
    }
}

function checkTheMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        // It is a match
        freezeCards();
        incrementScore();
    } else {
        // It is not a match
        unflipTheCards();
    };

    incrementMoves();

    if (score === 8) {
        winOn();
    }
};

function freezeCards() {
    firstCard.removeEventListener("click", flipTheCard);
    secondCard.removeEventListener("click", flipTheCard);
    resetGameBoard();
}

function unflipTheCards() {
    lockTheGame = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        lockTheGame = false;
        resetGameBoard();
    }, 1000);
}

function resetGameBoard() {
    isFlippedCard = false;
    lockTheGame = false;
    firstCard = null;
    secondCard = null;
}

(function mix() {
    memoryCards.forEach(card => {
        let position = Math.floor(Math.random() * 16)
        card.style.order = position;
    });
})();

winOverlay.addEventListener("click", function() {
    resetGame();
});

function resetGame() {
    score = 0;
    moves = 0;
    document.getElementById("moves").innerText = moves;
    document.getElementById("score").innerText = score;
    memoryCards.forEach(card => { 
        card.classList.remove("flipped", "disable");
    });
}

memoryCards.forEach(card => card.addEventListener("click", flipTheCard));