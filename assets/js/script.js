/* jshint esversion: 8 */

document.addEventListener('DOMContentLoaded', on());

const memoryCards = document.querySelectorAll('.card');

let isFlippedCard = false;
let firstCard = null; 
let secondCard = null;
let lockTheGame = false;
let score = 0;
let moves = 0;
let winOverlay = document.getElementById("win-overlay");
let Wintext = document.getElementById("win-text");

// Overlay functions

// Turn on the welcome overlay
function on() {
    document.getElementById("start-overlay").style.display = "block";
}

// Turn off the welcome overlay
function off() {
    document.getElementById("start-overlay").style.display = "none";
    mix();
}

// Turn on the winner overlay
function winOn() {
    winOverlay.style.display = "block";
}

// Turn off the winner overlay
function winOff() {
    winOverlay.style.display = "none";
}

winOverlay.addEventListener("click", function () {
    resetGame();
});

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

// Flip the cards
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
// Check if it is a match or not
function checkTheMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        // It is a match
        freezeCards();
        incrementScore();
    } else {
        // It is not a match
        unflipTheCards();
    }

    incrementMoves();

    // This happens when the score is 8
    if (score === 8) {

        winOn();

        // Winning message variations
        document.getElementById("win-moves").innerText = moves;
        if (moves === 8) {
            Wintext.innerHTML = "Flawless! Congratulations!";
        } else if (moves >= 9 && moves <= 13) {
            Wintext.innerHTML = "Not bad! You have a very good memory!";
        } else {
            Wintext.innerHTML = "What took so long? You need to practice!";
        }
    }
}
// Freeze the card in flipped form
function freezeCards() {
    firstCard.classList.add("disable");
    secondCard.classList.add("disable");
    resetGameBoard();
}

// Unflip the card
function unflipTheCards() {
    lockTheGame = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        lockTheGame = false;
        resetGameBoard();
    }, 1000);
}

// Reset gameboard for the next move
function resetGameBoard() {
    isFlippedCard = false, 
    lockTheGame = false,
    firstCard = null,
    secondCard = null
}

// Mix the cards
function mix() {
    memoryCards.forEach(card => {
        let position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
}

// Start a new game
function resetGame() {
    score = 0;
    moves = 0;
    document.getElementById("moves").innerText = moves;
    document.getElementById("score").innerText = score;
    memoryCards.forEach(card => {
        card.classList.remove("flipped", "disable");
    });
    mix();
}

// Event listener for the cards
memoryCards.forEach(card => card.addEventListener("click", flipTheCard));

module.exports = {
    resetGameBoard,
    isFlippedCard,
    lockTheGame,
    firstCard,
    secondCard,
    resetGame,
    incrementMoves,
    moves,
    incrementScore,
    score,
};