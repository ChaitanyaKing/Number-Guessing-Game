let randomnum = parseInt(Math.random()*100 + 1)

const submit = document.querySelector('#submit')
const userInput = document.querySelector('#userInput')
const guessSlot = document.querySelector('.guessSlot')
const remaining = document.querySelector('.remaining')
const lowOrHi = document.querySelector('.loworhi')
const startOver = document.querySelector('.startOver')

const p = document.createElement('p')

let prevguess = []
let numguess = 1

let playgame = true

if(playgame){
    submit.addEventListener('click' , function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        console.log(guess)
        validateguess(guess)
    })
}

function validateguess (guess){
    if(isNaN(guess)){
        alert('Please Enter a Valid Number')
    }
    else if(guess < 1){
        alert('Please Enter a Number Greater than 1')
    }
    else if(guess > 100){
        alert('Please Enter a Number Less than 100')
    }
    else{
        prevguess.push(guess)
        if(numguess > 5){
            displayguess(guess)
            displaymessage(`Game Over , Random number is ${randomnum}`)
            endgame()
        }
        else{
            displayguess(guess)
            checkguess(guess)
        }
    }
}

function checkguess(guess){
    if(randomnum === guess){
        displaymessage('Congrats , You Guessed it Right !')
        endgame()
    }
    else if(randomnum < guess){
        displaymessage('Number is TOOO HIGH')
    }
    else if(randomnum > guess){
        displaymessage('Number is TOOO LOW')
    }
}

function displayguess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}, `
    numguess++
    remaining.innerHTML = `${6 - numguess} `
}

function displaymessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endgame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<h2 id = "newGame"><button style="background-color: #ad862a;">Start New Game</button></h2>`
    startOver.appendChild(p)
    playgame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomnum = parseInt(Math.random()*100 + 1)
        prevguess = []
        numguess = 1
        guessSlot.innerHTML= ''
        remaining.innerHTML = `${11 - numguess} `
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)

        playgame = true
    })
}