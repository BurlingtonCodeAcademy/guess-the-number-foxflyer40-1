// import Readline
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)


// GLOBALFUNCTIONS
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve)
  })
}

function guesseAgain(max, min) {
  return Math.floor(((max - min + 1) / 2) + min)
}

// GLOBAL VARIABLES
let hiNum = 100
let loNum = 0
let lastGuesse = null
let guessConfirm = "N"
let hiLo = ""
let numOfGuesses = null

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number between " + loNum + " and " + hiNum + "\nand I (computer) try to guess it.\n")
  let secretNumber = await ask("What is your secret number?\n")
  console.log('You entered: ' + secretNumber)

  // start loop
  while (guessConfirm !== 'Y') {
    guessConfirm = await ask("is your number " + guesseAgain(hiNum, loNum) + "?\nEnter Y or N\n>")
    lastGuesse = guesseAgain(hiNum, loNum)
    numOfGuesses += 1

    if (guessConfirm === 'Y') {
      console.log('\nWOOHOO!\nI guessed it in ' + numOfGuesses + ' tries!')
    } else if (guessConfirm === 'N') {
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
  console.log('\n')
  console.log("secretNumber = " + secretNumber)
  console.log("hiNum = " + hiNum)
  console.log("loNum = " + loNum)
  console.log("guesseAgain = " + guesseAgain(hiNum, loNum))
  console.log('lastGuesse = ' + lastGuesse)
  console.log("guessConfirm = " + guessConfirm)
  console.log("hiLo = " + hiLo)
  console.log('\n')

  process.exit()
}
