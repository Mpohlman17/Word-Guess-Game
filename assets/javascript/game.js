// loop

// select randam variable from list or words;
// the hint provided is a quote from the character user is guessing

var GOTArray = [{
        word: "jon-snow",
        hint: "If I fall, don't bring me back."
    },
    {
        word: "ned-stark",
        hint: "The man who passes the sentence should swing the sword."
    },
    {
        word: "sansa-stark",
        hint: "Thank you for your many lessons Lord Baelish. I will never forget them."
    },
    {
        word: "arya-stark",
        hint: "Swift as a deer. Quiet as a shadow. Fear cuts deeper than swords."
    },
    {
        word: "daenerys-targaryen",
        hint: "When you play the game of thrones, you win or you die."
    },
    {
        word: "jamie-lannister",
        hint: "The things I do for love."
    },
    {
        word: "tyrion-lannister",
        hint: "That's what I do: I drink and I know things."
    },
    {
        word: "hodor",
        hint: "Hold the door!"
    },
    {
        word: "samwell-tarly",
        hint: "I read it in a book."
    },
    {
        word: "bran-stark",
        hint: "I can't do it by choice. I don't know how. It happens in my dreams."
    },
    {
        word: "little-finger",
        hint: "Distrusting me was the wisest thing you've done since you climbed off your horse."
    },
    {
        word: "melisandre",
        hint: "The night is dark and full of terrors."
    }
]
// game status needs to start false until key is pressed
var gameStatus = false;
//generate random number
var randomNumber = Math.floor(Math.random() * GOTArray.length);

// apply randomNumber to obtain answer word, obtain hint
var character = GOTArray[randomNumber].word;
var hintDef = GOTArray[randomNumber].hint;

//lettersRemaining that are needed to win game
var lettersRemaining = character.length;

// answer array to store answer word
var answerArray = [];
// store win score in global scope
var winScore = 0;

// 3 Capture user key presses and starts the game
document.addEventListener("keyup", function (event) {
    if (gameStatus) {
        letterCheck(event);
    } else {
        //if game has not been started then this will initate the game
        restartGame();
    }
});
// 3a keyup function will start. Compare userinput to wrong guessbox inputs; return true if user input is in wrong guessbox; return false if not in the user guessbox
// console.log(GOTArray)
//need key events to look for keys the user with input event listener-codereview

// lettersArray of letters created to account for letters that theuser will be able to input
var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-"];

//checks letter fo key just pressed with pervious letters used using first because letters need to be checked before processed
function letterCheck(letter) {
    if (lettersArray.indexOf(letter.key) > -1) {
        correctLetterCheck(letter);
    }
}

// 3b If statement is true, ignore keypress
// 3c if statement is false go to step 4


function correctLetterCheck(letter) {
    if (character.indexOf(letter.key) > -1) {
        correctLetter(letter);
    } else {
        incorrectLetter(letter);
    }
}


function correctLetter(letter) {
    if (answerArray.indexOf(letter.key.toUpperCase()) < 0) {
        addCorrectLetter(letter);
    }
}
// creating loop to imput correct letter keys pressed use 3.2 18 zoo-loop for reference
function addCorrectLetter(letter) {
    for (var i = 0; i < character.length; i++) {
        // If current letter(input) has already been pressed
        if (letter.key === character[i]) {
            // change letter inputed to uppercase
            answerArray[i] = letter.key.toUpperCase();
            currentWordDisplay();
            //reduce letters left remaining to guess by 1
            lettersRemaining--;
            //if letters left to guess are equal to 0 
            if (lettersRemaining === 0) {

                displayWinCount();
                winScore++;
                currentWordDisplay();

                displayHint();

                alert("YOU WON!!!");
                answerArray[i] = "_";


            }
        }
    }
}
// 5a if step 4 returns true, update place holder text with letter

// incorrect inputEntered array
var incorrectInputEntered = [];

// number of guesses user is given to input at start of game- this can be any number of your choosing
var inputRemaining = [8];

// function for incorrect inputs
function incorrectLetter(letter) {

    if (incorrectInputEntered.indexOf(letter.key.toUpperCase()) < 0) {
        addIncorrectLetter(letter);
        inputRemaining--;
        guessesDisplay.textContent = inputRemaining;
    }
}


function addIncorrectLetter(letter) {
    incorrectInputEntered.push(letter.key.toUpperCase());

    displayInputMade();
    if (inputRemaining === 0) {
        displayAnswer();
        restartGame();
        alert("you are out of guesses please try again!!")
    }

}

// function for the incorrect letter to be displayed in the number of guesses box

// 5b if step 4 returns false, update wrong guessbox with with userinput letter guess
// loop

// 6a if worng guess box contains 10 letters retun with alert sorry please try again- 7a

// 6b if all input key letters match answer word return with alert congratulations!! please continue to the next word

//////////////////////////////////////////
///////     Establish handlers    ///////
////////////////////////////////////////

// display guesses remaining guessesDisplay


// display win count winDisplay
function displayWinCount() {
    var winDisplay = document.querySelector("#winDisplay");
    winDisplay.textContent = winScore;
}
// console.log(winDisplay)
// display activeCharacterHint
function displayHint() {
    var activeCharacterHint = document.querySelector("#activeCharacterHint");
    activeCharacterHint.textContent = hintDef;
}
// console.log("hint quote:", hintDef)
// display activeCharacterDisplay for users current
function currentWordDisplay() {
    var activeCharacterDisplay = document.querySelector("#activeCharacterDisplay");
    activeCharacterDisplay.textContent = answerArray;
}
// console.log("answerArray functiong?")
// display correctAnswerDisplay
function displayAnswer() {
    var correctAnswerDisplay = document.querySelector("#correctAnswerDisplay");
    correctAnswerDisplay.textContent = character.toUpperCase();
}

//display incorrect letters in imputMadeDisplay

//display guesses made guessesDisplay
function displayInputMade() {
    var guessesDisplay = document.querySelector("#guessesDisplay");
    guessesDisplay.textContent = incorrectInputEntered;

    var inputMadeDisplay = document.querySelector("#inputMadeDisplay");
    inputMadeDisplay.textContent = incorrectInputEntered;
}

// Restarting the game, reestablishing arrays accounting for wins, apply new randomNumber(word), reseting letters input
function restartGame() {
    gameStatus = true;
    //generate random number
    randomNumber = Math.floor(Math.random() * GOTArray.length);

    // apply randomNumber to obtain answer word, obtain hint
    character = GOTArray[randomNumber].word;
    hintDef = GOTArray[randomNumber].hint;

    //lettersRemaining that are needed to win game
    lettersRemaining = character.length;

    // answer array to store answer word
    answerArray = [];
    // making the answerword 
    for (var i = 0; i < character.length; i++) {
        answerArray[i] = "_";
    }
    // display characterHintDisplay
    displayHint();
    currentWordDisplay();
    // letters remaining for current game
    displayWinCount();
    winScore++;
    // letters guessed
    inputRemaining = 8;
    // number of guesses left
    incorrectInputEntered = [];
    displayInputMade();

    // displaying current character for current game


}

//  7a reset go through steps to whip out board for starting new variable answer word

// 7b start at 3a with new loop