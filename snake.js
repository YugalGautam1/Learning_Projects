const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
let foodX, foodY;
let gameOver = false;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let SnakeBody = [];
let setIntervalId;
let score = 0; 
let highScore = localStorage.getItem("high-score") || 0; 
highScoreElement.innerText = ` High Score: ${highScore}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1; //Adjust this to change so it does not collide with the location of snake currently
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver= ()=> {
    clearInterval(setIntervalId)
    alert("Game over!");
    location.reload();
}
const initGame = () => {
if(gameOver) return handleGameOver();
  let htmlMarup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  if (snakeX == foodX && snakeY == foodY) {
    changeFoodPosition();
    SnakeBody.push([foodX, foodY]);
    score++;
    if(score>=highScore){
        highScore =score;

    }
    console.log(highScore)
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = ` High Score: ${highScore}`;

  }
  for (let i = SnakeBody.length - 1; i > 0; i--) {
    SnakeBody[i] = SnakeBody[i - 1];
  }
  SnakeBody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;
  if (snakeX <= 0 || snakeX > 30 || snakeY > 30 || snakeY <= 0) {
    gameOver = true;
  }
  for (let i = 0; i < SnakeBody.length; i++) {
    htmlMarup += `<div class="snakes" style="grid-area: ${SnakeBody[i][1]} / ${SnakeBody[i][0]}"></div>`;
    if(i!==0 && SnakeBody[0][1]==SnakeBody[i][1]&& SnakeBody[0][0]==SnakeBody[i][0]){
        gameOver=true;
    }
    }
  playBoard.innerHTML = htmlMarup;
};

const changeDirection = (e) => {
  if (e.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key == "ArrowRight"&& velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }

  initGame();
};
setIntervalId = setInterval(initGame, 125);
changeFoodPosition();

document.addEventListener("keydown", changeDirection);
