const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let food = randomFood();
let score = 0;
let gameInterval = null;
let isGameOver = false;

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#4caf50' : '#8bc34a';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  // Draw food
  ctx.fillStyle = '#ff5252';
  ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'DOWN') head.y += box;

  // Check collision with wall
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize
  ) {
    gameOver();
    return;
  }
  // Check collision with self
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }
  // Check if food eaten
  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    score++;
    document.getElementById('score').innerText = '分数: ' + score;
    food = randomFood();
  } else {
    snake.unshift(head);
    snake.pop();
  }
  draw();
}

function gameOver() {
  clearInterval(gameInterval);
  isGameOver = true;
  document.getElementById('restartBtn').style.display = 'block';
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, canvasSize / 2 - 40, canvasSize, 80);
  ctx.fillStyle = '#fff';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('游戏结束', canvasSize / 2, canvasSize / 2);
}

function restartGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = 'RIGHT';
  food = randomFood();
  score = 0;
  isGameOver = false;
  document.getElementById('score').innerText = '分数: 0';
  document.getElementById('restartBtn').style.display = 'none';
  draw();
  gameInterval = setInterval(moveSnake, 120);
}

document.addEventListener('keydown', function (e) {
  if (isGameOver) return;
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

document.getElementById('restartBtn').addEventListener('click', restartGame);

draw();
gameInterval = setInterval(moveSnake, 120); 