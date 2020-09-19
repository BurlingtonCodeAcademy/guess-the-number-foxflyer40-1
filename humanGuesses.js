// send output to the console
const { Console } = require('console')
// import Readline
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve)
  })
}

// GLOBAL VARIABLES
let hiNum = 100
let loNum = 1
let secretNumber = 0
let currentGuess = 0
let guessLowerThan = 0
let guessHigherThan = 0
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = 1

// GLOBALFUNCTIONS
function showVariables() {
  console.log('\n')
  console.log("hiNum = " + hiNum + " " + typeof hiNum)
  console.log("loNum = " + loNum + " " + typeof loNum)
  console.log("secretNumber = " + secretNumber + " " + typeof secretNumber)
  console.log("currentGuess = " + currentGuess + " " + typeof currentGuess)
  console.log('guessHigherThan = ' + guessHigherThan + " " + typeof guessHigherThan)
  console.log('guessLowerThan = ' + guessLowerThan + " " + typeof guessLowerThan)
  console.log("guessConfirm = " + guessConfirm + " " + typeof guessConfirm)
  console.log("hiLo = " + hiLo + " " + typeof hiLo)
  console.log("NumOfGuesses " + numOfGuesses + " " + typeof numOfGuesses)
  console.log('\n')
}

function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}

// Start program
start();

async function start() {
  console.log("\nLet's play a game where I (Mighty computer) pick a number between 1 and 100\nand You Puny human try to guess it.\n")
  secretNumber = randomInteger(loNum, hiNum)
  numOfGuesses -= 1
  // start loop
  while (currentGuess !== secretNumber) {
   
    currentGuess = Number(await ask("What is your guess ?\n>"))
numOfGuesses += 1
    if (currentGuess > secretNumber) {
      console.log("Guess lower")
    } else if (currentGuess < secretNumber) {
      console.log("Guess higher")
    }

  }

  console.log(secretNumber + " is my secret number.\n")
  if (numOfGuesses <= 7) {
    console.log("You must have cheated to guess it in only " + numOfGuesses + " tries.")
  } else {
    console.log("It took you " + numOfGuesses + " tries.")
  }
  showVariables() //progress check
  process.exit()
}
