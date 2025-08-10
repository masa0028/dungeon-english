const questions = [
    { word: "apple", options: ["りんご", "みかん", "バナナ", "ぶどう"], answer: "りんご" },
    { word: "cat", options: ["犬", "ねこ", "うさぎ", "鳥"], answer: "ねこ" },
    { word: "book", options: ["机", "椅子", "本", "ペン"], answer: "本" },
    { word: "water", options: ["水", "火", "風", "土"], answer: "水" },
    { word: "sun", options: ["月", "太陽", "星", "雲"], answer: "太陽" },
    { word: "school", options: ["学校", "病院", "図書館", "駅"], answer: "学校" },
    { word: "car", options: ["自転車", "バス", "車", "電車"], answer: "車" },
    { word: "dog", options: ["犬", "ねこ", "うさぎ", "鳥"], answer: "犬" },
    { word: "milk", options: ["牛乳", "水", "ジュース", "紅茶"], answer: "牛乳" },
    { word: "fish", options: ["肉", "魚", "パン", "卵"], answer: "魚" }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = `"${question.word}" の意味は？`;
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });
    progressElement.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
}

function selectAnswer(selected) {
    const correct = questions[currentQuestionIndex].answer;
    if (selected === correct) {
        score += 10;
        alert("正解！ダンジョンを進む！");
    } else {
        alert(`不正解… 正解は「${correct}」`);
    }
    scoreElement.textContent = `スコア: ${score}`;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert(`ゲームクリア！最終スコア: ${score}`);
    }
}

showQuestion();
