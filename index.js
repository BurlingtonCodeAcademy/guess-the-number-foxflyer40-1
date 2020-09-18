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
let loNum = 0
let secretNumber = null
let lastGuess = []
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = null

// GLOBALFUNCTIONS
function guesseAgain(max, min) {
  return Math.floor(((max - min + 1) / 2) + min)
}

function showVariables() {
  console.log('\n')
  console.log("hiNum = " + hiNum)
  console.log("loNum = " + loNum)
  console.log("secretNumber = " + secretNumber)
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

  hiNum = await ask("(You can even set the range between 1 and...?\nEnter a number greater than 1 >")

  secretNumber = await ask("\nNow, pick your secret number.\n>(I will not look... really...)\n>")
  console.log('You entered: ' + secretNumber + "\n(Which I TOTALLY did not see.)")

  // start loop
  while (guessConfirm !== 'Y') {

    showVariables() //progress check

    guessConfirm = await ask("is your number " + guesseAgain(hiNum, loNum) + "?\nEnter Y or N\n>")


    if (guessConfirm === 'Y') {
      console.log('\nWOOHOO!\nI guessed it in ' + numOfGuesses + ' tries!')
    } else

      if (guessConfirm === 'N') {
        lastGuess.push(guesseAgain(hiNum, loNum))
        numOfGuesses += 1
                    hiLo = await ask('Was my guess too high (H) or too low (L)?\n\nEnter H or L\n>')
                    if (hiLo === 'H') {
                      hiNum = guesseAgain(hiNum, loNum)
                    } else if (hiLo === 'L') {
                      loNum = guesseAgain(hiNum, loNum)
                    } else { 'Please enter Capital H or Capital L only...\n' }
      } else {
        console.log('Please enter Capital Y or Capital N only...\n')
      }
  }

  showVariables() //progress check

  process.exit()
}
