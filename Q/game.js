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
        "question": "من أقسام الكفر الأكبر",
        "choice1": "كفر الإِباء والاستكبار",
        "choice2": "كفر اليقين",
        "choice3": "الكفر الكره",
        "choice4": "النفاق الحسد والحقد",
        "answer": 1
      },
      {
        "question": "كل ما نهى عنه الشرع وسماه...ولم يصل إلى حد الشرك الأكبر",
        "choice1": "الكفر الأصغر",
        "choice2": "النفاق الأصغر",
        "choice3": "الشرك الأصغر",
        "choice4": "الشرك الأكبر",
        "answer": 3
      },
      {
        "question":"أن يعتقد أن النفع أو الضر أو الخلق أو الرزق بيد غير الله, مثال على شرك:",
        "choice1": "الربوبية",
        "choice2": "الألوهية",
        "choice3": "الأسماء والصفات",
        "choice4": "لا شيء ما سبق",
        "answer": 1
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
        "question": "هو اختلاف السر والعلانية  في الأعمال دون الاعتقاد",
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
      }
  ];  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

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
    return window.location.assign("/end.html");
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