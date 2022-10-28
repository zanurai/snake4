//alert("hello");

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("eat.mp3");
const gameOver = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 2;
let lastPainTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let score = 0;
food = { x: 6, y: 7 };


//game display

function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime)


    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }

    lastPainTime = ctime;
    gameEngine();
}

function isCollide(snake) {

    //if you bomb into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

        //if you bomb into the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }
    }
}
//part:1 Updating the snake Array and food
function gameEngine() {
    if (isCollide(snakeArr)) {
        gameOver.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over ,press any key to play again!")

        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0
    }

    //if you have eaten the food increment the score and regenerete the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();

        score += 1
        scoreBox.innerHTML = "score:" + score

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 2;
        let b = 10;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }




    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part:2 display the snake and food 
    //Display the snake

    border.innerHTML = " ";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }

        border.appendChild(snakeElement);

    });
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");

    border.appendChild(foodElement);
}


//main logic
window.requestAnimationFrame(main);


window.addEventListener("keydown", e => {
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})