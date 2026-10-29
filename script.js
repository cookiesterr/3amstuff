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

function startGame() {
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    menumusic.play().catch((err) => console.log("Audio playback waiting for interaction:"', err));
}