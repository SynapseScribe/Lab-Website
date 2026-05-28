const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('gameScore');
const nameInput = document.getElementById('playerNameInput');
const startBtn = document.getElementById('startGameBtn');

let gameRunning = false;
let score = 0;
let playerName = "";
let catY = 150;
let velocityY = 0;
const gravity = 0.6;
const jumpStrength = -10;
let obstacles = [];
let frameCount = 0;

function resetGame() {
    score = 0;
    catY = 150;
    velocityY = 0;
    obstacles = [];
    frameCount = 0;
    scoreElement.innerText = "Score: 0";
}

function spawnObstacle() {
    const size = 30;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - size,
        width: size,
        height: size
    });
}

function update() {
    if (!gameRunning) return;

    // Gravity
    velocityY += gravity;
    catY += velocityY;

    // Floor collision
    if (catY + 30 > canvas.height) {
        catY = canvas.height - 30;
        velocityY = 0;
    }

    // Obstacle movement
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5;

        // Collision detection
        if (
            40 < obstacles[i].x + obstacles[i].width &&
            40 + 30 > obstacles[i].x &&
            catY < obstacles[i].y + obstacles[i].height &&
            catY + 30 > obstacles[i].y
        ) {
            gameOver();
        }

        // Remove off-screen obstacles
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
            scoreElement.innerText = `Score: ${score}`;
        }
    }

    // Spawn obstacles
    frameCount++;
    if (frameCount % 100 === 0) {
        spawnObstacle();
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Cat (Black Cat Emoji)
    ctx.font = "30px Arial";
    ctx.fillText("🐈‍⬛", 20, catY + 25);

    // Draw Obstacles
    ctx.fillStyle = "#000";
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function gameOver() {
    gameRunning = false;
    alert(`Game Over, ${playerName}! Your score: ${score}`);
    saveScore(playerName, score);
    startBtn.disabled = false;
    nameInput.disabled = false;
}

function saveScore(name, finalScore) {
    const newScore = { name, score: score, date: new Date().toLocaleDateString() };
    let scores = JSON.parse(localStorage.getItem('catGameScores') || '[]');
    scores.push(newScore);
    localStorage.setItem('catGameScores', JSON.stringify(scores));
    displayScores();
}

function displayScores() {
    const scoreList = document.getElementById('scoreList');
    if (!scoreList) return;
    const scores = JSON.parse(localStorage.getItem('catGameScores') || '[]');
    scoreList.innerHTML = scores.map(s => `<li>${s.name}: ${s.score} (${s.date})</li>`).join('');
}

startBtn.addEventListener('click', () => {
    if (nameInput.value.trim() === "") {
        alert("Please enter your name first!");
        return;
    }
    playerName = nameInput.value.trim();
    gameRunning = true;
    startBtn.disabled = true;
    nameInput.disabled = true;
    resetGame();
    update();
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameRunning) {
        velocityY = jumpStrength;
    }
});

canvas.addEventListener('mousedown', () => {
    if (gameRunning) {
        velocityY = jumpStrength;
    }
});

// Initialize scores display on load
displayScores();
