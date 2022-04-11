const memoryCards = document.querySelectorAll('.card');

function flipTheCard () {
    this.classList.add('flipped');
}

memoryCards.forEach(card => card.addEventListener('click', flipTheCard));

function checkForMatch () {

};