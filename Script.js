// Snake game code

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

// Generate random food position
function generateFood() {
  foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Move the snake
function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score++;
    generateFood();
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
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
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
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game Over!");
    return;
  }

  // Draw snake
  ctx.fillStyle = "#000";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw food
  ctx.fillStyle = "#f00";
  ctx.fillRect(foodX, foodY, 10, 10);

  // Draw score
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Start the game
generateFood();
const gameInterval = setInterval(gameLoop, 100);
