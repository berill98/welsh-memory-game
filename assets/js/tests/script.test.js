/**
 * @jest-environment jsdom
 */

/* jshint esversion: 8 */

let resetGameBoard;
let firstCard;
let secondCard;
let isFlippedCard;
let lockTheGame;
let resetGame;
let incrementMoves;
let moves;
let incrementScore;
let score;

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close()

    resetGameBoard = require("../script.js").resetGameBoard;
    lockTheGame = require("../script.js").lockTheGame;
    isFlippedCard = require("../script.js").isFlippedCard;
    firstCard = require("../script.js").firstCard;
    secondCard = require("../script.js").secondCard;
    resetGame = require("../script.js").resetGame;
    incrementMoves = require("../script.js").incrementMoves;
    moves = require("../script.js").moves;
    incrementScore = require("../script.js").incrementScore;
    score = require("../script.js").score;
});

describe("Ensure incrementMoves function works correctly", () => {

    test("the number of moves is zero", () => {
        expect(moves).toBe(0);
    });

    test("the number of moves increased", () => {
        incrementMoves();
        expect(document.getElementById("moves").innerText).toBe(1)
    });

    test("the number of moves increased again", () => {
        incrementMoves();
        expect(document.getElementById("moves").innerText).toBe(2)
    });

    test("the number of moves is zero again", () => {
        resetGame();
        expect(moves).toBe(0);
    });

});

describe("Ensure incrementScore function works correctly", () => {

    test("score is zero", () => {
        expect(score).toBe(0);
    });

    test("score increased", () => {
        incrementScore();
        expect(document.getElementById("score").innerText).toBe(1)
    });

    test("score increased again", () => {
        incrementScore();
        expect(document.getElementById("score").innerText).toBe(2)
    });

    test("score is zero again", () => {
        resetGame();
        expect(document.getElementById("score").innerText).toBe(0);
    });

});

describe("Ensure resetGameBoard function works correctly", () => {

    test("isFlippedCard is false", () => {
        resetGameBoard();
        expect(isFlippedCard).toBe(false);
    });

    test("lockTheGame is false", () => {
        resetGameBoard();
        expect(lockTheGame).toBe(false);
    });

    test("firstCard is null", () => {
        resetGameBoard();
        expect(firstCard).toBeNull();
    });

    test("secondCard is null", () => {
        resetGameBoard();
        expect(secondCard).toBeNull();
    });

});