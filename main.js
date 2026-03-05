    let questionArea = document.querySelector(".question-area");
    let quizArea = document.querySelector(".quiz-area");
    let answerArea = document.querySelector(".answers-area");
    let CountSpan =document.querySelector(".count span");
    let answerlabel=document.querySelector(".answer label");
    let supmitButton=document.querySelector(".submit-button");
    let QuizInfo=document.querySelector(".quiz-info");
    let CurrentIndex = 0;
    let rightAnswers = 0;
    let countDownInterval;
    let Bullets = document.querySelector(".bullets");
    let quizApp=document.querySelector(".quiz-app");
    document.addEventListener("DOMContentLoaded", function () {
    let countDownElement = document.querySelector(".bullets .countdown");
});
function GetQustions() {

    let oldCard = document.querySelector(".card");
    if (oldCard) oldCard.remove();
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
    myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) 
        {
        let questionsObject = JSON.parse(this.responseText);
        let questionsCount = questionsObject.length;
        let bulletsContainer = document.querySelector(".bullets .spans");
        bulletsContainer.innerHTML = "";
        createBullets(questionsCount);
        addQustionData(questionsObject[CurrentIndex], questionsCount);
        countDown(10,questionsCount);
        supmitButton.onclick = function () 
        {
        let theRightAnswer=questionsObject[CurrentIndex][`right_answer`];
            
        check_Answer(theRightAnswer,questionsCount);
        clearInterval(countDownInterval);
        countDown(10,questionsCount);
        setTimeout(() => {
          CurrentIndex++;

        if (CurrentIndex < questionsCount) {

        quizArea.innerHTML = "";
        answerArea.innerHTML = "";

        addQustionData(questionsObject[CurrentIndex], questionsCount);
        handleBullets();

      } else {
       
        showResults(questionsCount);
      }

        }, 500);
        
        }
        }
}
}
function createBullets(num) {
    CountSpan.innerHTML = num;
    for (let i = 0; i < num; i++) {
        let bullet = document.createElement("span");
        if (i === 0) {
            bullet.className = "on";
        }
        document.querySelector(".bullets .spans").appendChild(bullet);
    }
}
function addQustionData(obj, count) {
    if (CurrentIndex < count) 
    {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj.title);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);
    for (let i = 1; i <= 4; i++) {
        let answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        let label = document.createElement("label");
        label.setAttribute("for", `answer-${i}`);
        let span = document.createElement("span");
        span.id = `answer-${i}`;
        span.textContent = String.fromCharCode(64 + i);
        span.dataset.answer = obj[`answer_${i}`];
        label.appendChild(span);
        let textNode = document.createTextNode(obj[`answer_${i}`]);
        label.appendChild(textNode);
        answerDiv.appendChild(label);
        answerArea.appendChild(answerDiv);
    }
    }
}
document.addEventListener("DOMContentLoaded", function () {
answerArea.addEventListener("click", function (e) {

  let clickedLabel = e.target.closest(".answer");

  if (clickedLabel) {

    // امسح active من الكل
    document.querySelectorAll(".answer").forEach(label => {
      label.classList.remove("active");
      label.parentElement.classList.remove("active");
      let span = label.querySelector("span");
      if (span) span.classList.remove("active");
    });

    // ضيف active للي اتضغط عليه
    clickedLabel.classList.add("active");
    clickedLabel.parentElement.classList.add("active");

    let span = clickedLabel.querySelector("span");
    if (span) span.classList.add("active");
  }

});
});
function check_Answer(rAnswer, count) {

  let allAnswers = document.querySelectorAll(".answer");
  let chosenSpan = document.querySelector(".answer.active span");

  if (!chosenSpan) return;

  let chosenAnswer = chosenSpan.dataset.answer;

  // ✅ زوّد هنا مرة واحدة فقط
  if (chosenAnswer === rAnswer) {
    rightAnswers++;
  }

  // للتلوين بس
  allAnswers.forEach(answer => {

    let span = answer.querySelector("span");
    let answerValue = span.dataset.answer;

    if (answerValue === rAnswer) {
      span.classList.add("correct");
      answer.classList.add("correct");
    }

    if (answerValue === chosenAnswer && chosenAnswer !== rAnswer) {
      span.classList.add("wrong");
      answer.classList.add("wrong");
    }

  });
}
function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
    if (CurrentIndex === index) {
        span.className = "on";
    }
    });
}
function showResults(count) {
if(CurrentIndex === count) 
{
    
  quizArea.innerHTML="";
  answerArea.innerHTML="";
  supmitButton.style.cssText=`display:none;`;
  Bullets.style.cssText=`display:none;`;
  QuizInfo.style.cssText=`display:none;`;
  let result = document.createElement("div");
  result.className = "result";

  let wrongAnswers = count - rightAnswers;
  let percent = Math.round((rightAnswers / count) * 100);

  let card = document.createElement("div");
  card.className = "card";

  let icon = document.createElement("div");
  icon.className = "icon";
  icon.textContent = "🏆";

  let title = document.createElement("h1");
  title.className = "result-title";

  if (percent >= 70) {
    title.textContent = "Great Job!";
  } else if (percent >= 50) {
    title.textContent = "Good Try!";
  } else {
    title.textContent = "Try Again!";
  }

  let scoreBox = document.createElement("div");
  scoreBox.className = "score-box";

  let scoreNumber = document.createElement("div");
  scoreNumber.className = "score-number";
  scoreNumber.textContent = `${rightAnswers}/${count}`;

  let scorePercent = document.createElement("div");
  scorePercent.className = "score-percent";
  scorePercent.textContent = `${percent}% Correct`;

  scoreBox.appendChild(scoreNumber);
  scoreBox.appendChild(scorePercent);

  let stats = document.createElement("div");
  stats.className = "result-stats";

  let correctStat = document.createElement("div");
  correctStat.className = "correct-stat";
  correctStat.textContent = `✔ ${rightAnswers} Correct`;

  let wrongStat = document.createElement("div");
  wrongStat.className = "wrong-stat";
  wrongStat.textContent = `✖ ${wrongAnswers} Incorrect`;

  stats.appendChild(correctStat);
  stats.appendChild(wrongStat);

  let button = document.createElement("button");
  button.className = "play-again-btn";
  button.textContent = "↻ Play Again";

  button.onclick = function () {
    clearInterval(countDownInterval);
    rightAnswers = 0;
    CurrentIndex = 0;
    card.innerHTML="";
    start(); 
  };

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(scoreBox);
  card.appendChild(stats);
  card.appendChild(button);
  quizArea.appendChild(card);

}

}
function start() {
  let quizArea = document.querySelector(".quiz-area");  
  quizArea.innerHTML = "";
  supmitButton.style.cssText=`display:none;`;
  Bullets.style.cssText=`display:none;`;
  QuizInfo.style.cssText=`display:none;`;

  let card = document.createElement("div");
  card.className = "card";

  let icon = document.createElement("div");
  icon.className = "icon";
  icon.textContent = "✨";

  let title = document.createElement("h1");
  title.textContent = "HTML Quiz";

  let subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  subtitle.textContent ="Test your HTML knowledge with 10 questions";
  subtitle.style.cssText=`font-size: 19px; color: rgba(247, 241, 241, 0.57); margin-bottom: 35px; line-height: 1.6;`

  let info = document.createElement("div");
  info.className = "info";

  let span1 = document.createElement("span");
  span1.textContent = "10 Questions";

  let span2 = document.createElement("span");
  span2.textContent = "10s per question";

  info.appendChild(span1);
  info.appendChild(span2);

  let button = document.createElement("button");
  button.textContent = "Start Quiz →";

  button.addEventListener("click", function () {
        supmitButton.style.cssText=`display:block;`;
    Bullets.style.cssText=`display:block;display: flex;
  align-items: center;
  justify-content: space-between;`;
  QuizInfo.style.cssText=`display:block;display: flex;align-items: center;
  justify-content: space-between;`;
    GetQustions();
  });

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(info);
  card.appendChild(button);
  quizArea.appendChild(card);

}
function countDown(duration, count) {
  if (CurrentIndex < count) {
    let minutes, seconds;
    let countDownElement = document.querySelector(".bullets .countdown"); // التأكد من وجود العنصر

    clearInterval(countDownInterval);

    countDownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownElement.innerHTML = `${minutes}:${seconds}`;

      if (duration <= 5) {
        countDownElement.classList.add("critical");
      } else {
        countDownElement.classList.remove("critical");
      }

      if (--duration < 0) {
        clearInterval(countDownInterval);
        supmitButton.click();
      }
    }, 1000);
  }
}
start();

