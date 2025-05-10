let questions = [];
let currentIndex = 0;
let score = 0;

// Map quiz topics to roadmap domains
const domainMap = {
    'c': 'c',
    'cpp': 'cpp',
    'java': 'java',
    'python': 'python',
    'webs': 'webdev',
    'data': 'data',
    'algo': 'algo',
    'cyber': 'cyber'
};

async function getQuestions(folder, level) {
  const res = await fetch(`./quizdata/${folder}/info.json`);
  const data = await res.json();
  questions = data[level];
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
    if (currentIndex >= questions.length) {
      const percent = (score / questions.length) * 100;
      document.getElementById("questionText").innerHTML = `Quiz Completed!<br><br>Your Score: ${score}/${questions.length} (${percent.toFixed(1)}%)`;
      document.getElementById("optionsContainer").innerHTML = "";
      document.getElementById("nextBtn").disabled = true;
      
      // Redirect to roadmap page after a short delay
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const topic = params.get("topic");
        const domain = domainMap[topic] || topic; // Use mapped domain or fallback to original
        window.location.href = `roadmap.html?domain=${domain}&score=${percent.toFixed(1)}`;
      }, 2000);
      return;
    }
  
    const currentQ = questions[currentIndex];
    document.getElementById("questionText").innerText = currentQ.question;
  
    let optionsHTML = "";
    currentQ.options.forEach((option, index) => {
      optionsHTML += `
        <div class="option">
          <label>
            <input type="radio" name="quizOption" value="${option}" id="option${index}">
            ${option}
          </label>
        </div>`;
    });
  
    document.getElementById("optionsContainer").innerHTML = optionsHTML;
}

document.getElementById("nextBtn").addEventListener("click", () => {
    const selected = document.querySelector('input[name="quizOption"]:checked');
  
    if (!selected) {
      alert("Please select an option before moving to next question.");
      return;
    }
  
    const selectedAnswer = selected.value;
    const correctAnswer = questions[currentIndex].answer;
  
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  
    currentIndex++;
    showQuestion();
});

// Get topic from URL parameters
const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

// Add click event listeners to difficulty buttons
let buttons = document.querySelectorAll(".difficultySelection");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const level = button.innerText.trim();
    startQuiz(level);
  });
});

function startQuiz(level) {
    // Hide difficulty buttons
    document.querySelector("#levelbox").style.display = "none";

    // Show quiz box
    document.querySelector(".question-box").style.display = "block";
    
    // Load the questions
    getQuestions(`${topic}`, `${level}`);
}
  
