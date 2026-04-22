//Setting the game name 
let GameName = "Guess The Word";
document.title = GameName;
document.querySelector("h1").innerHTML = GameName;
document.querySelector("footer").innerHTML = `${GameName} "Created By Abdelrahman Badreldin"`;

//Setting the game options
 let numberOftries = 6;
 let nuberOfLetters = 6;
 let crurrenttries = 1;
 let numberOfHints = 2;

//Words Manage
let wordtoGuess = "";
const words = ["create", "planet", "friend", "school", "guitar", "window", "yellow", "purple", "orange", "silver"];
wordtoGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();


//Generating the inputs for the game
 function generateInputs(){
    const inputscontainer = document.querySelector(".inputs");
    for(let i =1; i <= numberOftries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        //Creating the inputs for each try
        for(let j = 1; j <= nuberOfLetters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `try${i}-input${j}`;
            input.maxLength = 1;
            tryDiv.appendChild(input);
        }

   inputscontainer.appendChild(tryDiv);
    }
        inputscontainer.children[0].children[1].focus();    
        //disabling all inputs except the first try
        const inputsInDisabled = document.querySelectorAll(".disabled-inputs input");
        inputsInDisabled.forEach((input)=> (input.disabled = true));     
        const inputs = document.querySelectorAll("input");  
        inputs.forEach((input , index) => {
            input.addEventListener("input", function(){
                if (index % nuberOfLetters === 0) {
                    this.value = this.value.toUpperCase();
                } else {
                    this.value = this.value.toLowerCase();
                }
                //console.log(index);
                const nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus();

            });
            input.addEventListener("keydown", function(event){
                const currentIndex = Array.from(inputs).indexOf(event.target);
                if (event.key === "ArrowRight") {
                    const nextInput = inputs[currentIndex + 1];
                    if (nextInput) nextInput.focus();
                }
                if (event.key === "ArrowLeft") {
                    const prevInput = inputs[currentIndex - 1];
                    if (prevInput) prevInput.focus();
                }
            });
        });
     const   guessButton = document.querySelector(".check");
     guessButton.addEventListener("click", handleGuess);
     function handleGuess(){
        let successGuess = true;
        for(let i = 1; i <= nuberOfLetters; i++){
            const inputField = document.querySelector(`#try${crurrenttries}-input${i}`);
            const letter = inputField.value.toLowerCase();
            const actualLetter = wordtoGuess[i - 1];

            // منطق اللعبة والألوان
            if (letter === actualLetter) {
                inputField.classList.add("in-place");
            } else if (wordtoGuess.includes(letter) && letter !== "") {
                inputField.classList.add("not-in-place");
                successGuess = false;
            } else {
                inputField.classList.add("not-correct");
                successGuess = false;
            }
        }
        
        // التعامل مع رسائل الفوز والخسارة
        let messageArea = document.querySelector(".message");
        if (!messageArea) {
            messageArea = document.createElement("div");
            messageArea.className = "message";
            document.querySelector(".guess-game").appendChild(messageArea);
        }

        if (successGuess) {
            messageArea.innerHTML = `You Win! The Word Is <span>${wordtoGuess}</span>`;
            if (numberOfHints === 2) {
                messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
            }
            let allTries = document.querySelectorAll(".inputs > div");
            allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
            guessButton.disabled = true;
            document.querySelector(".hint").disabled = true;
        } else {
            document.querySelector(`.try-${crurrenttries}`).classList.add("disabled-inputs");
            const currentInputs = document.querySelectorAll(`.try-${crurrenttries} input`);
            currentInputs.forEach((input) => (input.disabled = true));

            crurrenttries++; // الذهاب للمحاولة التالية

            const nextTry = document.querySelector(`.try-${crurrenttries}`);
            if (nextTry) {
                nextTry.classList.remove("disabled-inputs");
                const nextInputs = document.querySelectorAll(`.try-${crurrenttries} input`);
                nextInputs.forEach((input) => (input.disabled = false));
                nextTry.children[1].focus();
            } else {
                guessButton.disabled = true;
                document.querySelector(".hint").disabled = true;
                messageArea.innerHTML = `You Lose! The Word Is <span>${wordtoGuess}</span>`;
            }
        }
     }

 }

 window.onload = function(){
    generateInputs();
    const hintButton = document.querySelector(".hint");
    if (hintButton) {
        hintButton.innerHTML = `${numberOfHints} Hints`;
        hintButton.addEventListener("click", getHint);
    }
 } 

 function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        const hintButton = document.querySelector(".hint");
        if (hintButton) {
            hintButton.innerHTML = `${numberOfHints} Hints`;
        }
    }
    if (numberOfHints === 0) {
        const hintButton = document.querySelector(".hint");
        if (hintButton) hintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
        
    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        
        if (indexToFill !== -1) {
            randomInput.value = wordtoGuess[indexToFill].toUpperCase();
            randomInput.focus(); 
        }
    }
 }

 function handleBackspace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
 }

 document.addEventListener("keydown", handleBackspace);
