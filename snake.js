const playBoard = document.querySelector(".play-board");
let foodX, foodY; 
let snakeX = 5, snakeY =10; 
let velocityX = 0, velocityY = 0;
const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30) + 1; //Adjust this to change so it does not collide with the location of snake currently
    foodY = Math.floor(Math.random()*30) + 1;
}

 
const initGame = () =>{
    let htmlMarup=  `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if(snakeX == foodX && snakeY == foodY){
        changeFoodPosition();
    }
    htmlMarup+=  `<div class="snakes" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    snakeX += velocityX;
    snakeY += velocityY; 
    playBoard.innerHTML = htmlMarup;
}

const changeDirection = (e) =>{
    if(e.key == "ArrowUp"){
        velocityX = 0; 
        velocityY = -1; 
    } else if(e.key=="ArrowDown"){
        velocityX = 0;
        velocityY = 1; 
    } else if(e.key=="ArrowLeft"){
        velocityX = -1;
        velocityY = 0; 
    } else if(e.key=="ArrowRight"){
        velocityX = 1;
        velocityY = 0; 
    }
    
initGame();
}
setInterval(initGame,125);
changeFoodPosition();


document.addEventListener("keydown", changeDirection);