// Initialize canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake properties
let snake = [{x: 200, y: 200}];
let dx = 10;
let dy = 0;
let foodX;
let foodY;
let score = 0;
let gameStarted = false;
let gamePaused = false;
let gameInterval;

// Generate random food position
function generateFood() {
  foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score++;
    generateFood();
    document.getElementById("score").textContent = "Score: " + score;
  } else {
    snake.pop();
  }
}

// Check for collision
function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

// Handle keyboard events
document.addEventListener("keydown", handleKeyDown);
function handleKeyDown(event) {
  if (event.keyCode === 37 && dx !== 10) {
    dx = -10;
    dy = 0;
  } else if (event.keyCode === 38 && dy !== 10) {
    dx = 0;
    dy = -10;
  } else if (event.keyCode === 39 && dx !== -10) {
    dx = 10;
    dy = 0;
  } else if (event.keyCode === 40 && dy !== -10) {
    dx = 0;
    dy = 10;
  } else if (event.keyCode === 80) { // "P" key
    togglePause();
  }
}


// Show the start screen
function showStartScreen() {
  const startScreen = document.getElementById("startScreen");
  startScreen.classList.add("show");
  
  const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", togglePause);

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);
}

// Hide the start screen
function hideStartScreen() {
  const startScreen = document.getElementById("startScreen");
  startScreen.classList.remove("show");
}

// Show the game over screen
function showGameOverScreen() {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.add("show");

  const scoreText = document.getElementById("scoreText");
  scoreText.textContent = "Score: " + score;

  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", restartGame);
}

// Hide the game over screen
function hideGameOverScreen() {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.remove("show");
}

// Show the pause screen
function showPauseScreen() {
  const pauseScreen = document.getElementById("pauseScreen");
  pauseScreen.classList.add("show");

  const resumeButton = document.getElementById("resumeButton");
  resumeButton.addEventListener("click", togglePause);
}

// Hide the pause screen
function hidePauseScreen() {
  const pauseScreen = document.getElementById("pauseScreen");
  pauseScreen.classList.remove("show");
}

// Restart the game
function restartGame() {
  snake = [{x: 200, y: 200}];
  dx = 10;
  dy = 0;
  score = 0;
  gameStarted = false;
  gamePaused = false;
  generateFood();
  hideGameOverScreen();
  startGame();
}

// Start the game
function startGame() {
  if (gameStarted) {
    return;
  }
  gameStarted = true;
  hideStartScreen();
  generateFood();
  gameInterval = setInterval(gameLoop, 100);
}

// Game loop
function gameLoop() {
  if (gamePaused) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();

  if (checkCollision()) {
    clearInterval(gameInterval);
    showGameOverScreen();
    return;
  }

  // Draw snake
  ctx.fillStyle = "#00FF00";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw food
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(foodX, foodY, 10, 10);

  // Draw score
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Pause the game
function togglePause() {
  if (!gameStarted) {
    return;
  }

  if (gamePaused) {
    hidePauseScreen();
    gamePaused = false;
    gameInterval = setInterval(gameLoop, 100);
  } else {
    clearInterval(gameInterval);
    gamePaused = true;
    showPauseScreen();
  }
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", showStartScreen);
