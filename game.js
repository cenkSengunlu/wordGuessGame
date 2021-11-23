let harfArr = [];
let idArr = [];
let playerGuess = [];
let trueValue = 0;
let counter = 0;
let guessTable = [];
let trueDirection = 0;
let falseCounter = 0;
let kelimeHavuzu = ["engine", "phone", "computer", "glass", "carpet", "camera", "mirror", "table", "sponge", "game", "card", "share", "monkey", "dice"];

const imageUrl = 'background.jpg';
const bgElement = document.querySelector("html");
let preloaderImg = document.createElement("img");
preloaderImg.src = imageUrl;

preloaderImg.addEventListener('load', (event) => {
    bgElement.style.backgroundImage = `url(${imageUrl})`;
    preloaderImg = null;
    document.querySelector(".loaderSection").style.display = "none";
    document.querySelector(".loadControl").style.display = "block";
    
});

function gameStart(){
    document.querySelector("#playAgainButton").style.display = "none";
    let randomNumber = Math.floor(Math.random() * kelimeHavuzu.length);
    harfArr = kelimeHavuzu[randomNumber].split('');

    document.querySelector("#letterCounter").innerHTML = `${harfArr.length} Letters`
    document.querySelector("#guessInput").style.width = (harfArr.length + 1) + 'ch';

    

    let input = document.querySelector("#guessInput");
    input.setAttribute("maxlength",harfArr.length);

    input.onkeypress = function(event){
        return ((event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 65 && event.charCode <= 90));
    }

    for(let j = 0; j < 10; j++){
        let gCounter = document.createElement("div");
        gCounter.classList.add('guessCounter');
        gCounter.setAttribute('id', `guessCounter${j+1}`);
        let guessParent = document.querySelector('#gCounterKonum');
        guessParent.appendChild(gCounter);
    }
}

document.querySelector("#guessButton").addEventListener("click", clickmyBtn);
function clickmyBtn() {
    
    playerGuess.push(...document.querySelector(`#guessInput`).value.toLowerCase().split(''));
    if(falseCounter === 10 || playerGuess.length !== harfArr.length){
        playerGuess = [];
        return;
    }
    counter ++;
    
    for(let k = 0; k < harfArr.length; k++){
        if(playerGuess[k] === harfArr[k]){
            trueDirection++;
        }
    }
    
    let controlharfArr = harfArr.slice();
    let controlplayerGuess = playerGuess.slice();

    for(let m = 0; m < controlharfArr.length; m++){
        for(let n = 0; n < playerGuess.length; n++){
            if(controlplayerGuess[n] === controlharfArr[m]){
                controlplayerGuess.splice(n,1);
                n--;
                trueValue++;
                break;
            }
        }
    }
    // control = [...control, ...harfArr.filter(x => playerGuess.includes(x))];
    // trueValue = control.length;

    // Grid Oluşturma
    guessTable = [...guessTable, ...[counter, playerGuess.join('').toUpperCase(),`${trueValue}/${trueDirection}`]];
    for(let w = 0; w < 3; w++){
        let container = document.querySelector("#grid");
        let cell = document.createElement("div");
        cell.classList.add("guessListBox");
        cell.innerHTML = guessTable[w];
        container.appendChild(cell);
    }
    guessTable = [];

    if(trueDirection === harfArr.length){
        for(let t = falseCounter + 1; t <= 10; t++){
            document.querySelector(`#guessCounter${t}`).style.backgroundColor = "green";
        }
        document.querySelector("#guessButton").style.display = "none";
        document.querySelector("#playAgainButton").style.display = "block";
        alert('Congratulations!\nYou guessed the word correctly.');
    }
    else{
        falseCounter++;
        document.querySelector(`#guessCounter${falseCounter}`).style.backgroundColor = "crimson";
        document.querySelector("#guessInput").value = "";
        trueValue = 0;
        trueDirection = 0;
        playerGuess = [];
        if(falseCounter === 10){
            document.querySelector("#guessButton").style.display = "none";
            document.querySelector("#playAgainButton").style.display = "block";
            setTimeout(function(){
                alert(`You failed!\nYou didn't guess the word correctly.\nCorrect word: ${harfArr.join('')}`);;
            },1);
            
        }
    }
}

document.querySelector("#playAgainButton").addEventListener("click", clickPlayAgain);
function clickPlayAgain() {
    location.reload(true);
}


gameStart();
