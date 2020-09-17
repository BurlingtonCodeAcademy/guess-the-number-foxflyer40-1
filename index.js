// import Readline
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)


// FUNCTIONS
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve)
  })
}


// GLOBAL VARIABLES
let loNum = 0
let hiNum = 100
let currentGuess = 1
let guessConfirm = "N"
let hiLo = ""

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number between " + loNum + " and " + hiNum + " and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\n")
  console.log('You entered: ' + secretNumber)

  // start loop
  while (guessConfirm !== 'Y') {

    currentGuess = (hiNum - loNum) / 2
    guessConfirm = await ask("is your number " + currentGuess + "?\nEnter Y or N\n>")


    if (guessConfirm === 'N') {
      hiLo = await ask('Was my guess too high or too low?\nEnter H if too High of L if too low\n>')
      if (hiLo === 'H') {
        hiNum = currentGuess
      } else if (hiLo === 'L') {
        loNum = currentGuess
      } else { 'Please enter Capital H or Capital L only...\n' }
    } else {
      console.log('Please enter Capital Y or Capital N only...\n')
    }
  }

console.log("secretNumber = " + secretNumber)
console.log("loNum = " + loNum)
console.log("hiNum = " + hiNum)
console.log("currentGuess = " + currentGuess)
console.log("guessConfirm = " + guessConfirm)
console.log("hiLo = " + hiLo)


process.exit()
}
