let harfArr = [];
let idArr = [];
let playerGuess = [];
let trueValue = 0;
let counter = 0;
let guessTable = [];
let trueDirection = 0;
let falseCounter = 0;
let kelimeHavuzu = ["engine", "phone", "computer", "glass", "carpet", "camera", "mirror", "table", "sponge", "game", "card", "share", "monkey", "dice"];

function gameStart(){
    document.querySelector("#playAgainButton").style.display = "none";
    let randomNumber = Math.floor(Math.random() * kelimeHavuzu.length);

    harfArr = kelimeHavuzu[randomNumber].split('');

    for(let i = 0; i < harfArr.length; i++){
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', 1);
        input.classList.add('giris');
        input.setAttribute('id', `input${i + 1}`);
        idArr.push(input);
        idArr[i].onkeypress = function(event){
            return ((event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 65 && event.charCode <= 90));
        }
        idArr[i].onkeyup = function(){
            if (this.value.length === parseInt(this.attributes["maxlength"].value) && i !== harfArr.length - 1) {
                idArr[i + 1].focus();
                idArr[i + 1].select();
            }
        }
        let parent = document.querySelector('#inputKonum');
        parent.appendChild(input);

        input.onkeydown = function(back) {
        let key = back.keyCode || back.charCode;
            if(key === 8 && i !== 0){
                setTimeout(function(){
                    idArr[i - 1].focus();
                  },1);
            }
        }
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
    counter ++;
    if(falseCounter === 10){
        return;
    }
    let control = [];
    for(let k = 0; k < harfArr.length; k++){
        playerGuess.push(document.querySelector(`#input${k+1}`).value.toLowerCase());
        if(playerGuess[k] === harfArr[k]){
            trueDirection++;
        }
    }
    control = [...control, ...harfArr.filter(x => playerGuess.includes(x))];
    trueValue = control.length;

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
        trueValue = 0;
        trueDirection = 0;
        playerGuess = [];
        if(falseCounter === 10){
            document.querySelector("#guessButton").style.display = "none";
            document.querySelector("#playAgainButton").style.display = "block";
            alert(`You failed!\nYou didn't guess the word correctly.\nCorrect word: ${harfArr.join('')}`);
        }
    }
}

document.querySelector("#playAgainButton").addEventListener("click", clickPlayAgain);
function clickPlayAgain() {
    location.reload(true);
}


gameStart();
