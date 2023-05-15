var snake = [{ x: 200, y: 200 }];
var food = { x: 0, y: 0 };
var direction = "right";
var gameInterval;

function startGame() {
  snake = [{ x: 200, y: 200 }];
  food = { x: 0, y: 0 };
  direction = "right";
  generateFood();
  gameInterval = setInterval(moveSnake, 200);
}

function moveSnake() {
  var head = Object.assign({}, snake[0]);

  switch (direction) {
    case "up":
      head.y -= 20;
      break;
    case "down":
      head.y += 20;
      break;
    case "left":
      head.x -= 20;
      break;
    case "right":
      head.x += 20;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function drawSnake() {
  var container = document.querySelector(".container");
  container.innerHTML = "";

  snake.forEach(function (segment) {
    var element = document.createElement("div");
    element.style.left = segment.x + "px";
    element.style.top = segment.y + "px";
    element.classList.add("snake");
    container.appendChild(element);
  });

  var foodElement = document.createElement("div");
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  foodElement.classList.add("food");
  container.appendChild(foodElement);
}

function generateFood() {
  food.x = Math.floor(Math.random() * 20) * 20;
  food.y = Math.floor(Math.random() * 20) * 20;
}

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") direction = "left";
      break;
    case 38:
      if (direction !== "down") direction = "up";
      break;
    case 39:
      if (direction !== "left") direction = "right";
      break;
    case 40:
      if (direction !== "up") direction = "down";
      break;
  }
});

startGame();
