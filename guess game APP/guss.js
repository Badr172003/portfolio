//Setting the game name 
let GameName = "خمن الكلمة";
document.title = GameName;
document.querySelector("h1").innerHTML = GameName;
document.querySelector("footer").innerHTML = `${GameName} "تمت البرمجة بواسطة عبدالرحمن بدرالدين"`;

//Setting the game options
 let numberOftries = 6;
 let nuberOfLetters = 6;
 let crurrenttries = 1;
 let numberOfHints = 2;

//Words Manage
let wordtoGuess = "";
let wordHint = "";
const wordsInfo = [
    { word: "برنامج", hint: "تطبيق يعمل على الكمبيوتر أو الهاتف لتنفيذ مهام معينة." },
    { word: "سيارات", hint: "وسيلة نقل شهيرة بأربع عجلات." },
    { word: "قوانين", hint: "قواعد يتم وضعها لتنظيم المجتمع." },
    { word: "تليفون", hint: "جهاز يستخدم للاتصال عن بعد." },
    { word: "سماعات", hint: "جهاز تستخدمه للاستماع للصوتيات بخصوصية." },
    { word: "موبايل", hint: "هاتف محمول صغير الحجم." },
    { word: "طائرات", hint: "وسيلة نقل جوية سريعة." },
    { word: "كاميرا", hint: "جهاز لالتقاط الصور وتسجيل الفيديو." },
    { word: "عصافير", hint: "طيور صغيرة الحجم تغرد عادة في الصباح." },
    { word: "كيبورد", hint: "لوحة مفاتيح تستخدم لإدخال النصوص للحاسوب." },
    { word: "بطارية", hint: "أداة لتخزين وتزويد الطاقة الكهربائية للأجهزة." },
    { word: "ميكروب", hint: "كائن حي دقيق لا يُرى إلا بالمجهر." },
    { word: "بروتين", hint: "عنصر غذائي أساسي لبناء العضلات والأنسجة." },
    { word: "إنترنت", hint: "الشبكة العالمية التي تربط أجهزة الكمبيوتر حول العالم." },
    { word: "بنطلون", hint: "قطعة ملابس تغطي النصف السفلي من الجسم." },
    { word: "فساتين", hint: "ملابس نسائية للمناسبات والأفراح." },
    { word: "برتقال", hint: "فاكهة شتوية حمضية لونها يشبه اسمها." },
    { word: "ليمونة", hint: "ثمرة حمضية صفراء تستخدم لإضافة نكهة قوية." },
    { word: "شوكولا", hint: "حلوى شهيرة ومحبوبة تصنع من حبوب الكاكاو." },
    { word: "حلويات", hint: "أطعمة سكرية تقدم في المناسبات كتحلية." },
    { word: "مستشفى", hint: "منشأة طبية لعلاج المرضى وإجراء العمليات." },
    { word: "عيادات", hint: "أماكن لاستقبال المرضى وفحصهم من قبل الطبيب." },
    { word: "جامعات", hint: "مؤسسات للتعليم العالي والبحث العلمي." },
    { word: "نباتات", hint: "كائنات حية تزرع في التربة وتمدنا بالأكسجين." },
    { word: "محيطات", hint: "مساحات مائية شاسعة تغطي معظم كوكب الأرض." },
    { word: "بحيرات", hint: "مسطحات مائية تحيط بها اليابسة من كل جانب." },
    { word: "نظارات", hint: "أداة تستخدم لتحسين أو تصحيح النظر." },
    { word: "كيمياء", hint: "علم يدرس المواد وتفاعلاتها مع بعضها البعض." },
    { word: "فيزياء", hint: "علم يدرس الظواهر الطبيعية كالحركة والطاقة." },
    { word: "اقتصاد", hint: "مجال يتعلق بالتجارة والمال وإنتاج الثروات." }
];
let randomObj = wordsInfo[Math.floor(Math.random() * wordsInfo.length)];
wordtoGuess = randomObj.word;
wordHint = randomObj.hint;


//Generating the inputs for the game
 function generateInputs(){
    const inputscontainer = document.querySelector(".inputs");
    for(let i =1; i <= numberOftries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>محاولة ${i}</span>`;

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
                // Removed toUpperCase / toLowerCase since Arabic has no letter cases
                const nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus();

            });
            input.addEventListener("keydown", function(event){
                const currentIndex = Array.from(inputs).indexOf(event.target);
                // Reversed ArrowLeft and ArrowRight for RTL display
                if (event.key === "ArrowLeft") {
                    const nextInput = inputs[currentIndex + 1];
                    if (nextInput) nextInput.focus();
                }
                if (event.key === "ArrowRight") {
                    const prevInput = inputs[currentIndex - 1];
                    if (prevInput) prevInput.focus();
                }
            });
        });
     const   guessButton = document.querySelector(".check");
     guessButton.addEventListener("click", handleGuess);
     function handleGuess(){
        let successGuess = true;
        let inPlaceCount = 0;
        let notInPlaceCount = 0;
        
        for(let i = 1; i <= nuberOfLetters; i++){
            const inputField = document.querySelector(`#try${crurrenttries}-input${i}`);
            const letter = inputField.value.toLowerCase();
            const actualLetter = wordtoGuess[i - 1];

            // منطق اللعبة والألوان
            if (letter === actualLetter) {
                inputField.classList.add("in-place");
                inPlaceCount++;
            } else if (wordtoGuess.includes(letter) && letter !== "") {
                inputField.classList.add("not-in-place");
                notInPlaceCount++;
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
            messageArea.innerHTML = `لقد فزت! الكلمة هي <span>${wordtoGuess}</span>`;
            if (numberOfHints === 2) {
                messageArea.innerHTML = `<p>تهانينا، لم تستخدم أي تلميحات</p>`;
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
                
                // إضافة رسالة توضح عدد الحروف الصحيحة
                messageArea.innerHTML = `<span style="color: #3498db; font-size: 1.1rem;">حروف في مكانها: <b>${inPlaceCount}</b> | حروف في مكان خطأ: <b>${notInPlaceCount}</b></span>`;
            } else {
                guessButton.disabled = true;
                document.querySelector(".hint").disabled = true;
                messageArea.innerHTML = `لقد خسرت! الكلمة هي <span>${wordtoGuess}</span>`;
            }
        }
     }

 }

 window.onload = function(){
    generateInputs();
    const hintButton = document.querySelector(".hint");
    if (hintButton) {
        hintButton.innerHTML = `${numberOfHints} تلميحات`;
        hintButton.addEventListener("click", getHint);
    }
 } 

 function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        const hintButton = document.querySelector(".hint");
        if (hintButton) {
            hintButton.innerHTML = `${numberOfHints} تلميحات`;
        }
    }
    if (numberOfHints === 0) {
        const hintButton = document.querySelector(".hint");
        if (hintButton) hintButton.disabled = true;
    }

    let messageArea = document.querySelector(".message");
    if (!messageArea) {
        messageArea = document.createElement("div");
        messageArea.className = "message";
        document.querySelector(".guess-game").appendChild(messageArea);
    }
    
    // إظهار التلميح كنص
    messageArea.innerHTML = `<p style="color: #e67e22; font-size: 1.1rem; margin-top: 10px;">تلميح: ${wordHint}</p>`;
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
 
