(function(){
  // Elements
  const hero = document.getElementById('hero');
  const monster = document.getElementById('monster');
  const hit = document.getElementById('hit');
  const heroHpBar = document.getElementById('heroHpBar');
  const monsterHpBar = document.getElementById('monsterHpBar');
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const dictBtn = document.getElementById('dictBtn');
  const overlay = document.getElementById('overlay');
  const endTitle = document.getElementById('endTitle');
  const endDesc = document.getElementById('endDesc');
  const restartBtn = document.getElementById('restartBtn');

  // Fallback: 必ずオーバーレイを隠す
  if (overlay) overlay.classList.add('hidden');

  // Questions
  const QUESTIONS = [
    { word: "apple", answer: "りんご", choices: ["りんご","本","犬","月"] },
    { word: "dog", answer: "犬", choices: ["猫","鳥","犬","魚"] },
    { word: "book", answer: "本", choices: ["机","本","ノート","鉛筆"] },
    { word: "milk", answer: "牛乳", choices: ["水","紅茶","牛乳","ジュース"] },
    { word: "sun", answer: "太陽", choices: ["星","太陽","雲","雨"] },
    { word: "school", answer: "学校", choices: ["図書館","学校","病院","駅"] },
    { word: "car", answer: "車", choices: ["自転車","車","電車","バス"] },
    { word: "fish", answer: "魚", choices: ["肉","卵","パン","魚"] },
    { word: "water", answer: "水", choices: ["水","火","風","土"] },
    { word: "bird", answer: "鳥", choices: ["犬","鳥","猫","牛"] }
  ];

  let heroHp = 100;
  let monsterHp = 100;
  let qIndex = 0;

  function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }
  function setHpBars(){
    heroHpBar.style.width = Math.max(heroHp,0) + '%';
    monsterHpBar.style.width = Math.max(monsterHp,0) + '%';
  }
  function heroAttack(){
    hero.classList.add('attack-hero');
    hit.classList.remove('hidden'); hit.classList.add('slash');
    setTimeout(()=>{ hit.classList.add('hidden'); hit.classList.remove('slash'); }, 320);
    setTimeout(()=> hero.classList.remove('attack-hero'), 250);
    monster.classList.add('shake');
    setTimeout(()=> monster.classList.remove('shake'), 320);
  }
  function monsterAttack(){
    monster.classList.add('attack-monster');
    setTimeout(()=> monster.classList.remove('attack-monster'), 250);
    hero.classList.add('shake');
    setTimeout(()=> hero.classList.remove('shake'), 320);
  }
  function select(choice){
    const q = QUESTIONS[qIndex];
    if(choice === q.answer){
      heroAttack();
      monsterHp -= 20;
    }else{
      monsterAttack();
      heroHp -= 20;
    }
    setHpBars();
    qIndex++;
    if(qIndex < QUESTIONS.length && heroHp>0 && monsterHp>0){
      setTimeout(nextQuestion, 360);
    }else{
      setTimeout(endGame, 360);
    }
  }
  function nextQuestion(){
    const q = QUESTIONS[qIndex];
    questionEl.textContent = `「${q.word}」の意味は？`;
    choicesEl.innerHTML = '';
    shuffle(q.choices).forEach(choice=>{
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.onclick = ()=>select(choice);
      choicesEl.appendChild(btn);
    });
    dictBtn.onclick = () => window.open('https://www.weblio.jp/content/'+encodeURIComponent(q.word),'_blank');
  }
  function endGame(){
    overlay.classList.remove('hidden');
    if(monsterHp <= 0){
      endTitle.textContent = '勝利！';
      endDesc.textContent = 'モンスターを倒しました！';
    }else if(heroHp <= 0){
      endTitle.textContent = 'ゲームオーバー';
      endDesc.textContent = '勇者は力尽きた…';
    }else{
      endTitle.textContent = '終了';
      endDesc.textContent = '全ての問題に回答しました。';
    }
    restartBtn.onclick = () => {
      heroHp = 100; monsterHp = 100; qIndex = 0;
      setHpBars();
      overlay.classList.add('hidden');
      nextQuestion();
    };
  }

  // init
  setHpBars();
  nextQuestion();
})();