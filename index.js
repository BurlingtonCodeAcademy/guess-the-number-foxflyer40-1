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
let hiNum = null
let loNum = 1
let secretNumber = null
let currentGuess = null
let lastGuess = []
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = 1

// GLOBALFUNCTIONS
function newGuess(max, min) {
  return Math.floor(((max - min + 1) / 2) + min)
}

function cheatChecker(cheatCode) {
  showVariables()
  if (cheatCode === 1) {
    if (secretNumber < loNum || secretNumber > hiNum || secretNumber.isNaN) {
      console.log("\nYou are trying to cheat.\nTry again but this time pick a number in range.")
      process.exit()
    }
 /* } else if (cheatCode === 2) {
    if (secretNumber !== currentGuess) {
      console.log("secretNumber = " + secretNumber)
      console.log("currentGuess = " + currentGuess)
      console.log('Methinks you LIE human.\nBe GONE and try again later')
      process.exit()
    }*/
  }
}
function showVariables() {
  console.log('\n')
  console.log("hiNum = " + hiNum)
  console.log("loNum = " + loNum)
  console.log("secretNumber = " + secretNumber)
  console.log("currentGuess = " + currentGuess)
  console.log('lastGuess = ' + lastGuess)
  console.log("guessConfirm = " + guessConfirm)
  console.log("hiLo = " + hiLo)
  console.log("NumOfGuesses " + numOfGuesses)
  console.log('\n')
}

// Start program
start();

async function start() {

  console.log("\nLet's play a game where you (human) pick up a number and I (computer) try to guess it.\n")

  // Allow Human to set range
  hiNum = await ask("(You can even set the range between 1 and...?\nEnter a number greater than 1 >")

  // Human picks secret number
  secretNumber = await ask("\nNow, pick your secret number.\n>(I will not look... really...)\n>")

  cheatChecker(1)  // check Human input for cheating
  console.log('You entered: ' + secretNumber + "\n(Which I TOTALLY did not see.)")  // store secret number


  // start loop
  while (guessConfirm !== 'Y') {

  
    currentGuess = newGuess(hiNum, loNum)
    guessConfirm = await ask("is your number " + currentGuess + "?\nEnter Y or N\n>")
    showVariables() //progress check

    if (guessConfirm === 'Y') {
      //cheatChecker(2)
      console.log('\nWOOHOO!\nI guessed it in ' + numOfGuesses + ' tries!')
    } else if (guessConfirm === 'N') {
      lastGuess.push(currentGuess)
      numOfGuesses += 1
      hiLo = await ask('Was my guess too high (H) or too low (L)?\n\nEnter H or L\n>')
      if (hiLo === 'H') {
        hiNum = currentGuess
      } else if (hiLo === 'L') {
        loNum = currentGuess
      } else { 'Please enter Capital H or Capital L only...\n' }
    } else {
      console.log('Please enter Capital Y or Capital N only...\n')
    }
  }

  showVariables() //progress check

  process.exit()
}
