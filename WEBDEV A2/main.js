let score = 0;
let answeredQuestions = new Set();

function navigate(sectionId) {
  const sections = document.querySelectorAll('.page');
  sections.forEach(section => {
    section.classList.remove('active');
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.add('active');
  document.getElementById(sectionId).classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
  navigate("history");
  initNavigation();
  initQuiz();
  toggleQRCode();
  window.addEventListener('resize', toggleQRCode);
});

function initNavigation() {
  const navButtons = document.querySelectorAll('nav button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigate(btn.dataset.target);
    });
  });
}

function initQuiz() {
  const audioCorrect = document.getElementById("audio-correct");
  const audioIncorrect = document.getElementById("audio-incorrect");
  const allQuestions = document.querySelectorAll(".quiz-question");

  allQuestions.forEach((questionDiv, index) => {
    const qId = index + 1;
    const options = questionDiv.querySelectorAll("button");
    options.forEach(btn => {
      btn.addEventListener("click", function handleClick() {
        if (answeredQuestions.has(qId)) return;

        const isCorrect = btn.dataset.answer === "true";
        const feedback = document.getElementById("feedback" + qId);
        answeredQuestions.add(qId);

        if (isCorrect) {
          score++;
          feedback.textContent = "Correct!";
          feedback.style.color = "green";
          audioCorrect?.play();
        } else {
          feedback.textContent = "Incorrect.";
          feedback.style.color = "red";
          audioIncorrect?.play();
        }

        // Disable all buttons for this question
        options.forEach(b => b.disabled = true);

        if (answeredQuestions.size === allQuestions.length) {
          document.getElementById("score-output").textContent = `You got ${score} out of ${allQuestions.length} correct!`;
        }
      });
    });
  });
}

function resetApp() {
  score = 0;
  answeredQuestions.clear();
  document.querySelectorAll(".feedback").forEach(fb => {
    fb.textContent = "";
    fb.style.color = "";
  });
  document.querySelectorAll(".quiz-question button").forEach(btn => {
    btn.disabled = false;
  });
  document.getElementById("score-output").textContent = "";
}

function toggleQRCode() {
  const qr = document.getElementById("qrcode");
  if (!qr) return;
  qr.style.display = window.innerWidth > 800 ? "block" : "none";
}

function pulseElement(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("pulse");
  setTimeout(() => el.classList.remove("pulse"), 1000);
}
