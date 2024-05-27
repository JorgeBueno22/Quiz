var quizData = [
  {
    question: "¿Qué lenguaje se ejecuta en un navegador web?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "d",
  },
  {
    question: "¿Quién gano el mundial de fútbol en 2010?",
    answers: ["España", "Italia", "Francia", "Rusia"],
    correct: "a",
  },
  {
    question: "¿Cuál es la capital de Argentina?",
    answers: ["Quito", "Madrid", "Buenos Aires", "París"],
    correct: "c",
  },
];

var currentQuestionIndex = 0;
var score = 0;

var questionTitle = document.getElementById("question");
var answerLabels = [
  document.getElementById("a_text"),
  document.getElementById("b_text"),
  document.getElementById("c_text"),
  document.getElementById("d_text"),
];
var submitBtn = document.getElementById("submit");
var toasts = document.getElementById("toasts");
var answers = document.querySelectorAll(".answer");

function loadQuestion() {
  var currentQuestion = quizData[currentQuestionIndex];
  questionTitle.innerText = currentQuestion.question;
  for (var i = 0; i < answerLabels.length; i++) {
    answerLabels[i].innerText = currentQuestion.answers[i];
  }
}

function getSelected() {
  var answer = undefined;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      answer = answers[i].id;
    }
  }
  return answer;
}

function deselectAnswers() {
  for (var i = 0; i < answers.length; i++) {
    answers[i].checked = false;
  }
}

function createNotification(message, type) {
  var notf = document.createElement("div");
  notf.classList.add("toast", type);
  notf.textContent = message;
  toasts.appendChild(notf);

  setTimeout(function () {
    toasts.removeChild(notf);
  }, 1800);
}

submitBtn.addEventListener("click", function () {
  var answer = getSelected();

  if (!answer) {
    createNotification("Por favor selecciona una respuesta", "error");
    return;
  }

  var correctAnswer = quizData[currentQuestionIndex].correct;
  if (answer === correctAnswer) {
    score++;
  } else {
    createNotification("Respuesta incorrecta", "info");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    deselectAnswers();
  } else {
    questionTitle.innerText =
      "Has respondido correctamente " +
      score +
      " de " +
      quizData.length +
      " preguntas.";
    submitBtn.innerText = "Reiniciar";
    submitBtn.addEventListener("click", function () {
      location.reload();
    });
  }
});

window.addEventListener("load", function () {
  loadQuestion();
});
