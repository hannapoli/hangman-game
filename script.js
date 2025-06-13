// ======================= GAME ELEMENTS ======================

const dictionary = [
  "Tokyo",
  "Ottawa",
  "Canberra",
  "Kyiv",
  "Beijing",
  "Seoul",
  "Cairo",
  "Bangkok",
  "Athens",
  "Jakarta",
  "Oslo",
  "Helsinki",
  "Stockholm",
  "Vienna",
  "Bern",
  "Dublin",
  "Prague",
  "Warsaw",
  "Budapest",
  "Brussels",
  "Amsterdam",
  "Copenhagen",
  "Reykjavik",
  "Ankara",
  "Tehran",
  "Nairobi",
  "Hanoi",
  "Manila",
];

const screen = document.getElementById("screen");
const btnNext = document.getElementById("btnNext");
const keys = document.querySelectorAll("#container-keyboard button");
//const answer = document.getElementById("answer");

//the drawing (svg):
const hangman = document.getElementsByClassName("hangman");
const lostState = document.getElementsByClassName("hide");
const alive = document.getElementsByClassName("limb");
const face = document.getElementById("face");

const lives = document.getElementById("lives");

// =================== STATE OF THE GAME ================

let livesAmount = hangman.length; // total number of parts to be drawn
let word = ""; //to save the chosen word
let success = [];
let error = 0;

// ==================== FUNCTIONS =======================

function play() {
  //math.random() function returns a random number between 0 and 1:
  let randomIndex = Math.random() * dictionary.length;
  let index = Math.floor(randomIndex);
  word = dictionary[index].toUpperCase();
  error = 0;
  //show empty letters:
  emptyLetter(word);
  //answer.innerHTML = word;
  livesAmount = hangman.length;

  for (let parte = 0; parte < hangman.length; parte++) {
    hangman[parte].style.display = "none";
  }
  face.classList.remove("dead");
  rEyes.style.visibility = "visible";
  xEyes.style.visibility = "hidden";
  for (let i = 0; i < alive.length; i++) {
    alive[i].style.visibility = "visible";
  }
  for (let i = 0; i < lostState.length; i++) {
    lostState[i].style.visibility = "hidden";
  }
  lives.innerHTML = `Lives: ${livesAmount}`;
}

function emptyLetter(word) {
  let emptyLetter = "";
  //generate a string with empty letters:
  for (let i = 0; i < word.length; i++) {
    emptyLetter += "_";
    // prefill the array with empty letters:
    success[i] = "_";
  }
  screen.innerHTML = emptyLetter;
}

//Add EventListeners to the keys:
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", write);
}

function win() {
  if (!success.includes("_")) {
    setTimeout(() => {
      if (
        confirm(
          "You won! Would you like to try to guess another word?"
        )
      ) {
        location.reload();
      }
    }, 1500);
  }
}

function incorrect() {
  livesAmount--;
  //draw a hangman line:
  hangman[error].style.display = "block";
  error++;
  lives.innerHTML = `Lives: ${livesAmount}`;
  if (livesAmount === 0) {
    lose();
  }
}

function write() {
  let fail = true;
  let played = "";
  //save the letter that has been pressed:
  let letter = this.innerHTML;

  for (let i = 0; i < word.length; i++) {
    //check if the letter is in the word:
    if (word[i] === letter) {
      //if it is, I print the letter on screen:
      played += letter + " ";
      success[i] = letter;
      fail = false;
    } else {
      played += "_ ";
    }
  }
  played = success.join("");

  screen.innerHTML = played;

  if (fail) {
    // we lose a life and the key turns red:
    this.classList.add("fail", "deactivated");
    this.disabled = true;
    incorrect();
  } else {
    //if there are no fails, the key turns green:
    this.classList.add("success", "deactivated");
    this.disabled = true;
    win();
  }
}

function lose() {
  face.classList.add("dead");

  setTimeout(() => {
    rEyes.style.visibility = "hidden";
    xEyes.style.visibility = "visible";

    for (let i = 0; i < alive.length; i++) {
      alive[i].style.visibility = "hidden";
    }
    for (let i = 0; i < lostState.length; i++) {
      lostState[i].style.visibility = "visible";
    }
  }, 1500);
  setTimeout(() => {
    if (confirm("Game over! Would you like to try again?")) {
      location.reload();
    }
  }, 2500);
}

// ==================== RESTART THE GAME =========================
btnNext.addEventListener("click", function reload() {
  success = [];
  keys.forEach((keys) => (keys.className = ""));
  keys.forEach((keys) => (keys.disabled = false));
  play();
});

// =================== THE BEGINNING OF THE GAME =================
play();
