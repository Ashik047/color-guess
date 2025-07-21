/* creating the deck */
const deck = [];
for (let i = 0; i < 13; i++) {
    deck[i] = `H${i}`;
}
for (let i = 13; i < 26; i++) {
    deck[i] = `S${i}`;
}

/* necessary variable declarations */
let playDeck = [].concat(deck);
let correctScore = 0;
let wrongScore = 0;
/* flags */
let hidden = true;
let rules = true;

/* selection the appropriate elements in DOM */
const redButton = document.querySelector("#red");
const blackButton = document.querySelector("#black");
const resetButton = document.querySelector("#reset");
const correctGuess = document.querySelector("#correctGuess");
const wrongGuess = document.querySelector("#wrongGuess");
const result = document.querySelector("#result");
const card = document.querySelector("#card");
const close = document.querySelector("#close");
const rule = document.querySelector("#rules");
const dispRule = document.querySelector("#dispRule");

/* displaying the scores at the start of the game */
correctGuess.innerText = correctScore;
wrongGuess.innerText = wrongScore;

/* rule and close button event listeners for displaying the rules of the game */
close.addEventListener("click", () => {
    if (rules) {
        dispRule.classList.add("hidden");
        rules = false;
    }
});
rule.addEventListener("click", () => {
    if (!rules) {
        dispRule.classList.remove("hidden");
        rules = true;
    }
});

/* function that returns a random card from the deck*/
function randCard() {
    /* removes the hidden class from card image */
    if (hidden) {
        hidden = false;
        card.classList.remove("hidden");
    }
    let randNumber = Math.floor(Math.random() * playDeck.length);
    /* replacing the image based on the card drawn */
    card.setAttribute("src", `../../Images/Deck/${playDeck[randNumber]}.png`);
    card.setAttribute("alt", `${playDeck[randNumber]}`);
    /* animation of the card */
    card.parentElement.classList.remove("animate-card");
    /* forces reflow by causing the browser to flush the layout */
    void card.parentElement.offsetWidth;
    card.parentElement.classList.add("animate-card");
    [playDeck[randNumber], playDeck[playDeck.length - 1]] = [playDeck[playDeck.length - 1], playDeck[randNumber]];
    return playDeck.pop();
}
/* disable the button when the game is over */
function blockButton() {
    redButton.setAttribute("disabled", "");
    redButton.classList.remove("hover:bg-red-500");
    blackButton.setAttribute("disabled", "");
    blackButton.classList.remove("hover:bg-gray-700");
}

/* when the guess is correct */
function guessRight() {
    correctScore++;
    correctGuess.innerText = correctScore;
    if (correctScore > 10) {
        result.innerText = "You Won!!!";
        result.classList.add("text-green-700");
        blockButton();
    }
    if (wrongScore == 10 && wrongScore === correctScore) {
        result.innerText = "Draw";
        result.classList.add("text-gray-300");
        blockButton();
    }
}

/* when the guess is wrong */
function guessWrong() {
    wrongScore++;
    wrongGuess.innerText = wrongScore;
    if (wrongScore > 10) {
        result.innerText = "You Lost";
        result.classList.add("text-red-700");
        blockButton();
    }
    if (wrongScore == 10 && wrongScore === correctScore) {
        result.innerText = "Draw";
        result.classList.add("text-gray-300");
        blockButton();
    }
}

/* game buttons event listeners */
redButton.addEventListener("click", () => {
    let card = randCard();
    // console.log(playDeck.length);
    // console.log(card);
    if (card[0] === "H") {
        guessRight();
    } else {
        guessWrong();
    }
});
blackButton.addEventListener("click", () => {
    let card = randCard();
    // console.log(card);
    if (card[0] === "S") {
        guessRight();
    } else {
        guessWrong();
    }

});
/* Created by Ashik Biju | 2025 | Color Guess */
resetButton.addEventListener("click", () => {
    correctScore = 0;
    wrongScore = 0;
    correctGuess.innerText = correctScore;
    wrongGuess.innerText = wrongScore;
    playDeck = [].concat(deck);
    if (result.innerText === "You Won!!!") {
        result.classList.remove("text-green-700");
    } else if (result.innerText === "You Lost") {
        result.classList.remove("text-red-700");
    } else if (result.innerText === "Draw") {
        result.classList.remove("text-grey-300");
    }
    result.innerText = "";
    redButton.classList.add("hover:bg-red-500");
    blackButton.classList.add("hover:bg-gray-700");
    redButton.removeAttribute("disabled");
    blackButton.removeAttribute("disabled");
    card.classList.add("hidden");
    hidden = true;
});