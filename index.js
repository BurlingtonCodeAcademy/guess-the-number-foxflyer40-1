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
let hiNum = 0
let loNum = 0
let secretNumber = 0
let currentGuess = 0
let guessLowerThan = 0
let guessHigherThan = 0
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = 0

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
  return +(min + Math.floor(Math.random() * range));
}

function newGuess(max, min) {
  return Math.floor(((max - min + 1) / 2) + min)
}

function cheatChecker(cheatCode) {
  if (cheatCode === 1) {
    if (secretNumber < 1 || secretNumber > hiNum) {
      console.log("\nYou are trying to cheat.\nNext time pick a number in range.")
      process.exit()
    } else if (isNaN(secretNumber)) {
      console.log("\nLetters are not allowed.\nNext time pick a NUMBER in range.")
      process.exit()
    }
  } else if (cheatCode === 2) {
    if (guessLowerThan - 1 === currentGuess) {
      console.log("\nStupid Human\nYou already said it was lower than " + guessLowerThan + ".\nSo it cannot also be higher than " + currentGuess + ".")
      process.exit()
    }
  } else if (cheatCode === 3) {
    if (guessHigherThan + 1 === currentGuess) {
      console.log("\nStupid Human\nYou already said it was higher than " + guessHigherThan + ".\nSo it cannot also be lower than " + currentGuess + ".")
      process.exit()
    }
  }
}

start()

async function start() {
  console.log("\nLet's play a game where one of us picks a number inside of a range\nand the other tries to guess it.\n")
  gameVersion = await ask("Do you want to be the number picker or number guesser?\nEnter P for picker\nEnter G for guesser\n>")
  if (gameVersion === 'P') {
    computerGuesses()
  } else if (gameVersion === 'G') {
    humanGuesses()
  } else {
    console.log("Pick capital P or capital G only.\nPlease start over.")
    process.exit()
  }
}

// Run Human Guesses game
async function humanGuesses() {
  console.log("\nNow I (Mighty computer) will pick a number between 1 and 100\nand You (Puny human) try to guess it.\n")
  hiNum = 100
  secretNumber = randomInteger(loNum, hiNum)
  numOfGuesses = 0

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
    console.log("HA!\nYou guessed it but it took you " + numOfGuesses + " tries.")
  }
  process.exit()
}

// Run computer guesses game
async function computerGuesses() {
  numOfGuesses = 1
  console.log("\nNow You (Puny human) will pick a number and\nI (Mighty computer) will certainly guess it.\n")
  // Allow Human to set range
  hiNum = +(await ask("\nI will even allow you to set the range.\nLet's say bettween 1 and...?\nEnter a number greater than 1 \n>"))
  // Human picks secret number
  secretNumber = +(await ask("\nNow, pick your secret number.\n>(I will not look... really...)\n>"))
  cheatChecker(1)  // check Human input for cheating
  console.log('You entered: ' + secretNumber + "\n(Which I TOTALLY did not see.)\n")

  // start loop
  while (guessConfirm !== 'Y') {
    currentGuess = newGuess(hiNum, loNum)
    guessConfirm = await ask("is your number " + currentGuess + "?\nEnter Y or N\n>")
    if (guessConfirm === 'Y') {
      console.log('\nWOOHOO!\nI guessed it in ' + numOfGuesses + ' tries!')
    } else if (guessConfirm === 'N') {
      numOfGuesses += 1
      hiLo = await ask('Is your number Higher or Lower than my guess?\nEnter H or L\n>')
      if (hiLo === 'H') {
        cheatChecker(2)
        guessHigherThan = currentGuess
        loNum = currentGuess
      } else if (hiLo === 'L') {
        cheatChecker(3)
        guessLowerThan = currentGuess
        hiNum = currentGuess
      } else { 'Please enter Capital H or Capital L only...OK?\nTry again.\n' }
    } else {
      console.log('Please enter Capital Y or Capital N only...OK?\nTry again.\n')
    }
  }

  process.exit()
}
