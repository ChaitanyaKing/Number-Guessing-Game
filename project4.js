// let randomnum = parseInt(Math.random()*100 + 1)

// const submit = document.querySelector('#submit')
// const userInput = document.querySelector('#userInput')
// const guessSlot = document.querySelector('.guessSlot')
// const remaining = document.querySelector('.remaining')
// const lowOrHi = document.querySelector('.loworhi')
// const startOver = document.querySelector('.startOver')

// const p = document.createElement('p')

// let prevguess = []
// let numguess = 1

// let playgame = true

// if(playgame){
//     submit.addEventListener('click' , function(e){
//         e.preventDefault()
//         const guess = parseInt(userInput.value)
//         console.log(guess)
//         validateguess(guess)
//     })
// }

// function validateguess (guess){
//     if(isNaN(guess)){
//         alert('Please Enter a Valid Number')
//     }
//     else if(guess < 1){
//         alert('Please Enter a Number Greater than 1')
//     }
//     else if(guess > 100){
//         alert('Please Enter a Number Less than 100')
//     }
//     else{
//         prevguess.push(guess)
//         if(numguess > 5){
//             displayguess(guess)
//             displaymessage(`Game Over , Random number is ${randomnum}`)
//             endgame()
//         }
//         else{
//             displayguess(guess)
//             checkguess(guess)
//         }
//     }
// }

// function checkguess(guess){
//     if(randomnum === guess){
//         displaymessage('Congrats , You Guessed it Right !')
//         endgame()
//     }
//     else if(randomnum < guess){
//         displaymessage('Number is TOOO HIGH')
//     }
//     else if(randomnum > guess){
//         displaymessage('Number is TOOO LOW')
//     }
// }

// function displayguess(guess){
//     userInput.value = ''
//     guessSlot.innerHTML += `${guess}, `
//     numguess++
//     remaining.innerHTML = `${6 - numguess} `
// }

// function displaymessage(message){
//     lowOrHi.innerHTML = `<h2>${message}</h2>`
// }

// function endgame(){
//     userInput.value = ''
//     userInput.setAttribute('disabled','')
//     p.classList.add('button')
//     p.innerHTML = `<h2 id = "newGame"><button style="background-color: #ad862a;">Start New Game</button></h2>`
//     startOver.appendChild(p)
//     playgame = false
//     newGame()
// }


// function newGame(){
//     const newGameButton = document.querySelector('#newGame')
//     newGameButton.addEventListener('click', function(e){
//         randomnum = parseInt(Math.random()*100 + 1)
//         prevguess = []
//         numguess = 1
//         guessSlot.innerHTML= ''
//         remaining.innerHTML = `${11 - numguess} `
//         userInput.removeAttribute('disabled')
//         startOver.removeChild(p)

//         playgame = true
//     })
// }


let randomnum = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#userInput');
const guessSlot = document.querySelector('.guessSlot');
const remaining = document.querySelector('.remaining');
const lowOrHi = document.querySelector('.loworhi');
const startOver = document.querySelector('.startOver');
const wrapper = document.querySelector('#wrapper');

const p = document.createElement('p');

let prevguess = [];
let numguess = 1;
let playgame = true;

// Focus on input field when page loads
window.addEventListener('load', () => {
    userInput.focus();
    
    // Add initial animation to wrapper
    wrapper.classList.add('animated');
    
    // Add keypress event for Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && playgame) {
            e.preventDefault();
            submit.click();
        }
    });
});

if (playgame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading animation
        submit.classList.add('loading');
        
        // Process after slight delay for visual feedback
        setTimeout(() => {
            const guess = parseInt(userInput.value);
            console.log(guess);
            validateguess(guess);
            submit.classList.remove('loading');
        }, 300);
    });
}

function validateguess(guess) {
    if (isNaN(guess)) {
        showAlert('Please Enter a Valid Number');
        shakeElement(userInput);
    }
    else if (guess < 1) {
        showAlert('Please Enter a Number Greater than 1');
        shakeElement(userInput);
    }
    else if (guess > 100) {
        showAlert('Please Enter a Number Less than 100');
        shakeElement(userInput);
    }
    else {
        prevguess.push(guess);
        if (numguess > 5) {
            displayguess(guess);
            displaymessage(`Game Over, Random number is ${randomnum}`);
            endgame(false);
        }
        else {
            displayguess(guess);
            checkguess(guess);
        }
    }
}

function checkguess(guess) {
    if (randomnum === guess) {
        displaymessage('Congrats, You Guessed it Right!');
        celebrateSuccess();
        endgame(true);
    }
    else if (randomnum < guess) {
        displaymessage('Number is TOOO HIGH');
        animateHighGuess();
    }
    else if (randomnum > guess) {
        displaymessage('Number is TOOO LOW');
        animateLowGuess();
    }
}

function displayguess(guess) {
    userInput.value = '';
    
    // Create a span for the new guess
    const guessSpan = document.createElement('span');
    guessSpan.textContent = `${guess}, `;
    guessSpan.classList.add('guess-item');
    
    // Add to guessSlot with animation
    guessSlot.appendChild(guessSpan);
    
    // Animate the new guess
    setTimeout(() => {
        guessSpan.style.opacity = '1';
        guessSpan.style.transform = 'translateY(0)';
    }, 10);
    
    numguess++;
    
    // Update remaining count with animation
    const oldValue = remaining.textContent;
    remaining.style.transform = 'scale(1.2)';
    remaining.style.color = '#ad862a';
    
    setTimeout(() => {
        remaining.innerHTML = `${6 - numguess} `;
        setTimeout(() => {
            remaining.style.transform = 'scale(1)';
            remaining.style.color = 'white';
        }, 200);
    }, 300);
    
    // Focus back on input
    userInput.focus();
}

function displaymessage(message) {
    // Fade out
    lowOrHi.style.opacity = '0';
    lowOrHi.style.transform = 'translateY(-10px)';
    
    // Update content and fade in
    setTimeout(() => {
        lowOrHi.innerHTML = `<h2>${message}</h2>`;
        lowOrHi.style.opacity = '1';
        lowOrHi.style.transform = 'translateY(0)';
    }, 300);
}

function endgame(isWin) {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame"><button style="background-color: #ad862a;">Start New Game</button></h2>`;
    
    // Add fade-in animation to the new game button
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    
    startOver.appendChild(p);
    
    setTimeout(() => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
    }, 10);
    
    // Add game-end visual effects
    if (isWin) {
        // Success effects remain
    } else {
        // Game over effects
        wrapper.classList.add('game-over');
    }
    
    playgame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e) {
        // Button press effect
        this.querySelector('button').classList.add('pressed');
        
        setTimeout(() => {
            randomnum = parseInt(Math.random() * 100 + 1);
            prevguess = [];
            numguess = 1;
            guessSlot.innerHTML = '';
            remaining.innerHTML = `${6 - numguess} `;
            userInput.removeAttribute('disabled');
            startOver.removeChild(p);
            
            // Remove any game-end classes
            wrapper.classList.remove('game-over');
            
            // Reset any other animation classes
            document.querySelectorAll('.success-animation, .shake-animation').forEach(el => {
                el.classList.remove('success-animation', 'shake-animation');
            });
            
            playgame = true;
            
            // Refocus input
            userInput.focus();
            
            // Add a "new game" animation
            wrapper.classList.add('new-game');
            setTimeout(() => {
                wrapper.classList.remove('new-game');
            }, 1000);
        }, 300);
    });
}

// Helper functions for animations

function shakeElement(element) {
    element.classList.add('shake-animation');
    setTimeout(() => {
        element.classList.remove('shake-animation');
    }, 500);
}

function showAlert(message) {
    // Create custom alert
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    // Animate in
    setTimeout(() => {
        alertDiv.style.opacity = '1';
        alertDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 2000);
}

function celebrateSuccess() {
    // Add success animation to wrapper
    wrapper.classList.add('success-animation');
    
    // Create confetti effect
    createConfetti();
}

function animateHighGuess() {
    // Visual indicator for "too high"
    const indicator = document.createElement('div');
    indicator.classList.add('high-indicator');
    indicator.innerHTML = '↑';
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 500);
    }, 1000);
}

function animateLowGuess() {
    // Visual indicator for "too low"
    const indicator = document.createElement('div');
    indicator.classList.add('low-indicator');
    indicator.innerHTML = '↓';
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(50px)';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 500);
    }, 1000);
}

function createConfetti() {
    // Create 50 confetti particles
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position, color, and animation
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(confetti)) {
                document.body.removeChild(confetti);
            }
        }, 3000);
    }
}

// Add these CSS styles to your document when the page loads
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .guess-item {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .custom-alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background-color: rgba(255, 87, 87, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #f00;
            top: -10px;
            z-index: 999;
            animation: confetti-fall 3s ease-in-out forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .high-indicator, .low-indicator {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            font-size: 40px;
            color: white;
            z-index: 1000;
            opacity: 1;
            transition: all 0.5s ease;
        }
        
        .high-indicator {
            top: 50%;
            color: #ff5757;
        }
        
        .low-indicator {
            bottom: 50%;
            color: #57a9ff;
        }
        
        .game-over {
            animation: game-over-pulse 2s ease;
        }
        
        @keyframes game-over-pulse {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            50% {
                box-shadow: 0 10px 30px rgba(255, 0, 0, 0.5);
            }
        }
        
        .new-game {
            animation: new-game-pulse 1s ease;
        }
        
        @keyframes new-game-pulse {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            50% {
                box-shadow: 0 10px 30px rgba(173, 134, 42, 0.8);
            }
        }
        
        .pressed {
            transform: scale(0.95);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }
        
        .loworhi {
            transition: all 0.3s ease;
        }
        
        .remaining {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});