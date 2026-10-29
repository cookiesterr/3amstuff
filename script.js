const menuScreen=document.getElementById('menu-screen');
const gameScreen=document.getElementById('game-screen');
const startBtn=document.getElementById('start-btn');
const submitBtn=document.getElementById('submit-btn');
const restartBtn=document.getElementById('restart-btn');
const jumpscareOverlay=document.getElementById('jumpscare-overlay');
const questionText=document.getElementById('question-text');
const answerInput=document.getElementById('answer-input');
const levelDisplay=document.getElementById('level-display');
const timerDisplay=document.getElementById('timer-display');
const scoreDisplay=document.getElementById('score-display');
const finalScoreText=document.getElementById('final-score-text');

const menumusic = new Audio('assets/menumusic.wav');
menumusic.loop = true;

let level = 1;
let score = 0;
let timeleft = 30;
let timerInterval=null;
let currentAnswer=0;

function generateQuestion(currentLevel) {
    let num1, num2, operator;
    if(currentLevel <= 3) {
        operator = Math.random() > 0.5 ? '+' : '-';
        num1 =  Math.floor(Math.random() * 20) + 1;
        num2 =  Math.floor(Math.random() * 20) + 1;

        if(operator === '-' && num2 < num1) [num1, num2] = [num2, num1];
        currentAnswer = operator === '+' ? num1 + num2 : num1 - num2;
} else if(currentLevel <= 6) {
        const ops = ['+', '-', '*'];
        operator = ops[Math.floor(Math.random() * ops.length)];
        num1 =  Math.floor(Math.random() * 12) + 1;
        num2 =  Math.floor(Math.random() * 12) + 1;

        if(operator === '+') currentAnswer = num1 + num2;
        else if(operator === '-') {
            if(num1 < num2) [num1, num2] = [num2, num1];
            currentAnswer = num1 - num2;
        } else currentAnswer = num1 * num2;
    } else {
        const ops = ['+', '-', '*'];
        operator = ops[Math.floor(Math.random() * ops.length)];
        num1 =  Math.floor(Math.random() * 25) + 5;
        num2 =  Math.floor(Math.random() * 15) + 2;

        if(operator === '+') currentAnswer = num1 + num2;
        else if(operator === '-') currentAnswer = num1 - num2;
        else currentAnswer = num1 * num2;
    }

    questionText.textContent = `${num1} ${operator} ${num2} = ?`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeleft--;
        timerDisplay.textContent = `Time: ${timeleft}s`;
        if(timeleft <= 0) {
            triggerGameOver("TOO SLOW!");
        }
    }, 1000);
}

function checkAnswer() {
    const playerAnswer = parseInt(answerInput.value.trim(), 10);
    if(playerAnswer === currentAnswer) {
        score += 10;
        level++;
        timeLeft += 3;
        scoreDisplay.textContent = `Score: ${score}`;
        levelDisplay.textContent = `Level: ${level}`;
        timerDisplay.textContent = `Time: ${timeleft}s`;
        answerInput.value = '';
        generateQuestion(level);
    } else {
        triggerGameOver("WRONG ANSWER!");
    }
}

function triggerGameOver(reasonText) {
    clearInterval(timerInterval);
    menumusic.pause();
    menumusic.currentTime = 0;
    document.querySelector('.scary-text').textContent = reasonText;
    finalScoreText.textContent = `Final Score: ${score} (reached level ${level})`;
    gamescreen.classList.add('hidden');
    jumpscareOverlay.classList.remove('hidden');
}

function startGame() {
    level = 1;
    score = 0;
    timeleft = 30;
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeleft}s`;
    answerInput.value = '';

    menuScreen.classList.add('hidden');
    jumpscareOverlay.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    menumusic.play().catch((err) => console.log("Audio playback waiting for interaction:", err));
    generateQuestion(level);
    startTimer();

    answerInput.focus();
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', startGame);

answerInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        checkAnswer();
    }
});