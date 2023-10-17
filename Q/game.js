const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        "question": "له نوعان, أكبر وأصغر",
        "choice1": "الكفر",
        "choice2": "الشرك",
        "choice3": "النفاق",
        "choice4": "جميع ما سبق",
        "answer": 4
      },
      {
        "question": "هو عدم الإيمان",
        "choice1": "الكفر الأصغر",
        "choice2": "الشرك الأصغر",
        "choice3": "الكفر الأكبر",
        "choice4": "النفاق الأكبر",
        "answer": 3
      },

      {
        "question": "كل ما نهى عنه الشرع وسماه شركًا, ولم يصل إلى حد الشرك الأكبر",
        "choice1": "الكفر الأصغر",
        "choice2": "النفاق الأصغر",
        "choice3": "الشرك الأصغر",
        "choice4": "الشرك الأكبر",
        "answer": 3
      },
      {
        "question": "أن يعتقد أن النفع أو الضر أو الخلق أو الرزق بيد غير الله, مثال على",
        "choice1": "الكفر الأصغر في الألوهية",
        "choice2": "الكفر الأصغر في الربوبية",
        "choice3": "الشرك الأكبر في الألوهية",
        "choice4": "الشرك الأكبر في الربوبية",
        "answer": 4
      },
      {
        "question": "أن يصرف الشخص عبادة من العبادات لغير الله تعالى, هو:",
        "choice1": "الشرك الأصغر في الألوهية",
        "choice2": "الكفر الأصغر في الربوبية",
        "choice3": "الشرك الأكبر في الألوهية",
        "choice4": "الكفر الأكبر في الأسماء والصفات",
        "answer": 3
      },
      {
        "question":"أعظم الذنوب عند الله, ولا يغفره لمن مات عليه",
        "choice1": "الكفر الأكبر",
        "choice2": "الشرك الأكبر",
        "choice3": "الكفر الأصغر",
        "choice4": "النفاق الأكبر",
        "answer": 2
      },
      {
        "question": "هو اختلاف السر والعلانية في الأعمال دون الاعتقاد",
        "choice1": "النفاق الأصغر",
        "choice2": "الكفر الأكبر",
        "choice3": "الشرك الأصغر",
        "choice4": "النفاق الأكبر",
        "answer": 1
      },
      {
        "question":"من صور النفاق الأصغر",
        "choice1": "الكذب",
        "choice2": "إخلاف الوعد",
        "choice3": "خيانة الأمانة",
        "choice4": "جميع ما سبق",
        "answer": 4
      },
      {
        "question":"من صور الكفر الأصغر",
        "choice1": "قتال المسلم",
        "choice2": "كفر الشك والظن",
        "choice3": "الرياء",
        "choice4": "كفر الإعراض",
        "answer": 1
      },
      {
        "question":  "من أقسام الكفر الأكبر",
        "choice1": "كفر النعمة",
        "choice2": "كفر التكذيب",
        "choice3": "لا شيء مما سبق",
        "choice4": "جميع ما سبق",
        "answer": 2
      }, 
      {
        "question":"ليس من صور الكفر الأصغر",
        "choice1": "كفر النعمة",
        "choice2": "الطعن في النسب",
        "choice3": "الرياء",
        "choice4": "قتال المسلم",
        "answer": 3
      }, 
      {
        "question":"الذنوب التي ورد تسميتها في الكتاب و السنة كفرًا, ولم تصل إلى حد الكفر الأكبر",
        "choice1": "الكفر الأكبر",
        "choice2": "الشرك الأصغر",
        "choice3": "النفاق الأصغر",
        "choice4": "الكفر الأصغر",
        "answer": 4
      }, 
      {
        "question":"أن يجعل العبد لله شريكًا في ربوبيته, و ألوهيته, و أسمائه وصفاته",
        "choice1": "الكفر الأكبر",
        "choice2": "الشرك الأكبر",
        "choice3": "النفاق الأصغر",
        "choice4": "الشرك الأصغر",
        "answer": 2
      }, 
      {
        "question":"أن يصف مخلوقًا بصفات الله المختصة به سبحانه",
        "choice1": "الشرك الأصغر في الأسماء والصفات",
        "choice2": "الشرك الأصغر في الربوبية",
        "choice3": "الشرك الأكبر في الألوهية",
        "choice4": "الشرك الأكبر في الأسماء والصفات",
        "answer": 4
      },      
 
    {
        "question": "أن يظهر الكفر ويبطن الإيمان",
        "choice1": "الكفر الأكبر",
        "choice2": "الشرك الأكبر",
        "choice3": "النفاق الأكبر",
        "choice4": "لا شيء مما سبق",
        "answer": 4
      },
        {
        "question": "من أمثلة النفاق الأكبر",
        "choice1": "الرياء",
        "choice2":  "الكره والبغض للكفار والمشركين",
        "choice3": "الكره والبغض لوسائل الإعلام",
        "choice4":  "الكره والبغض لما جاء به الرسول",
        "answer": 4
      },
        {
        "question": "كيف نتعامل مع من فيه صفات النفاق الأكبر؟",
        "choice1": "ضربهم وأذيتهم",
        "choice2":  "ما داموا لم يظهروا حقيقتهم للمسلمين, فإنهم يعاملون معاملة الكفار",
        "choice3": "ما داموا لم يظهروا حقيقتهم للمسلمين, فإنهم يعاملون معاملة المنافقين",
        "choice4":  "ما داموا لم يظهروا حقيقتهم للمسلمين, فإنهم يعاملون معاملة المسلمين",
        "answer": 4
      },
            {
        "question": "يدخله النار خالدًا فيها",
        "choice1": "الكفر الأكبر, والنفاق الأصغر, والشرك الأصغر",
        "choice2":  "الكفر الأكبر, والنفاق الأكبر, والشرك الأكبر",
        "choice3":  "الكفر الأكبر, والنفاق الأكبر, والشرك الأصغر",
        "choice4":   "لا شيء مما سبق",
        "answer": 2
      },
            {
        "question": "يحبط جميع الأعمال",
        "choice1": "الكفر الأكبر, والنفاق الأكبر, والشرك الأصغر",
        "choice2":  "الكفر الأصغر, والنفاق الأكبر, والشرك الأصغر",
        "choice3":  "الكفر الأكبر, والنفاق الأكبر, والشرك الأكبر",
        "choice4":   "لا شيء مما سبق",
        "answer": 3
      },
         {
        "question": "لا يخرج صاحبه من ملة الإسلام",
        "choice1": "الكفر الأصغر, والنفاق الأصغر, والشرك الأصغر",
        "choice2":  "الكفر الأكبر, والنفاق الأكبر, والشرك الأصغر",
        "choice3":  "الكفر الأكبر, والنفاق الأكبر, والشرك الأكبر",
        "choice4":   "لا شيء مما سبق",
        "answer": 3
      },
          {
        "question": "ليس من أقسام الكفر الأكبر",
        "choice1": "كفر الإِباء والاستكبار",
        "choice2": "كفر الإعراض",
        "choice3": "كفر الشك والظن",
        "choice4": "كفر النعمة",
        "answer": 4
      },
          {
        "question":"من صور النفاق الأصغر",
        "choice1": "الكذب",
        "choice2": "إخلاف الوعد",
        "choice3": "خيانة الأمانة",
        "choice4": "جميع ما سبق",
        "answer": 4
      },
    {
        "question": "من أمثلة الشرك الأكبر",
        "choice1": "الرياء",
        "choice2":  "الكره والبغض لما جاء به الرسول",
        "choice3": "قتال المسلم",
        "choice4": "أن يصف مخلوقًا بصفات الله المختصة",
        "answer": 4
      },
    {
        "question": "من أمثلة الشرك الأصغر",
        "choice1": "أن يصف مخلوقًا بصفات الله المختصة",
        "choice2":  "الرياء",  
        "choice3": "أن يصرف عبادة لغير الله",
        "choice4": "أن يعتقد أن النفع, أو الضر أو الرزق بيد غير الله",
        "answer": 2
      },
        {
        "question": "تأدية العبادة من أجل مدح الناس وثنائهم",
        "choice1": "الكِبر",
        "choice2": "قتال المسلم",
        "choice3":  "الرياء",  
        "choice4": "كفر النعمة",
        "answer": 3
      }
    
  ];  

//CONSTANTS
const CORRECT_BONUS = 4;
const MAX_QUESTIONS = 25;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
