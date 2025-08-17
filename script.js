let questions = [];
let currentQuestion = 0;
let playerHp = 100;
let monsterHp = 100;

// 質問を読み込み
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    // 200問からランダムで20問選ぶ
    questions = data.sort(() => 0.5 - Math.random()).slice(0, 20);
    showQuestion();
  });

function showQuestion() {
  if (currentQuestion >= questions.length || playerHp <= 0 || monsterHp <= 0) {
    document.getElementById("result").innerText = (playerHp > monsterHp) ? "勝利！" : "敗北...";
    return;
  }
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice, q.answer);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(choice, answer) {
  if (choice === answer) {
    monsterHp -= 5;
  } else {
    playerHp -= 5;
  }
  document.getElementById("player-hp").innerText = playerHp;
  document.getElementById("monster-hp").innerText = monsterHp;
  currentQuestion++;
  showQuestion();
}