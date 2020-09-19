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
let loNum = 1
let secretNumber = 0
let currentGuess = 0
let guessLowerThan = 0
let guessHigherThan = 0
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = 1

// GLOBALFUNCTIONS
function newGuess(max, min) {
  return Math.floor((max - min + 1) / 2 + min)
}

function cheatChecker(cheatCode) {
  if (cheatCode === 1) {

    if (secretNumber < loNum || secretNumber > hiNum || secretNumber === NaN) {
      console.log("\nYou are trying to cheat.\nTry again but this time pick a number in range.")
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

// Start program
start();

async function start() {
  console.log("\nLet's play a game where you (Puny human) pick a number\nand I (Mighty computer) try to guess it.\n")
  // Allow Human to set range
  hiNum = Number(await ask("You can even set the range between 1 and...?\nEnter a number greater than 1 \n>"))
  // Human picks secret number
  secretNumber = Number(await ask("\nNow, pick your secret number.\n>(I will not look... really...)\n>"))
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
      } else { 'Please enter Capital H or Capital L only...\n' }
    } else {
      console.log('Please enter Capital Y or Capital N only...\n')
    }
  }

  showVariables() //progress check
  process.exit()
}