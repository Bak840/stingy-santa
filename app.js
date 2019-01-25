let canvas = document.getElementById("cv");
let context = canvas.getContext("2d");
context.font = "15px Arial";
context.strokeStyle = "red";

//count down to the actual date plus 3 minutes and 30 seconds that is 210,000 milliseconds
let countDownDate = new Date(new Date().getTime() + 210000);

let timeLeft = "Temps restant : 3m30s";

let background = new Sprite(0, 0, 0, 0, 600, 800, "ressources/background.jpg", context);

let santa = new Santa(400, 300, context);

let ball = new Sprite(0, 0, 801, 601, 30, 30, "ressources/sprites/ball.png", context);

//if in quiz mode time is stopped until we resume
let quizMode = false;
//where we will display the quizz
var quizContainer = document.getElementById('quiz');
let quiz = new Quiz(quizContainer);
// on submit, check wether or not we should give more money to santa
var submitButton = document.getElementById('submit');
submitButton.onclick = function () {
    quizMode = false;
    santa.setSpeed(1);
    if (quiz.checkResults()) {
        santa.setMoney(50);
    }
}

//played when santa delivers gifts under a tree
let santaHoHoHo = new Audio("ressources/sounds/santa_ho_ho_ho.mp3");
santaHoHoHo.loop = false;
//played when santa touches an elf
let coinDrop = new Audio("ressources/sounds/coin_drop.mp3");
coinDrop.loop = false;
//played when the christmas ball spawns
let ballSpawn = new Audio("ressources/sounds/ball_spawn.mp3");
ballSpawn.loop = false;
//played when santa touches the christmas ball
let ballModeTheme = new Audio("ressources/sounds/ball_mode.mp3");
ballModeTheme.loop = false;

//if the game is in ball mode all the elves cannot move
let ballMode = false;

//represent the trees present on the map
//I choose a Map to associate each tree with his index and remove them from the canvas safely
let treesOnMap = new Map();
//keep track of the total number of trees generated and allow me to delete a tree based on his index even after other trees have spawned
let lastInsertedTreeIndex = 0;
//represent the elves present on the map
let elvesOnMap = [];

function spawnTrees() {
    //generate a random number of trees between 1 and 3
    let treesNumber = Math.floor(Math.random() * Math.floor(2)) + 1;
    for (let i = 0; i < treesNumber; i++) {
        let key = lastInsertedTreeIndex;
        //generate a random boolean to decide if we should spawn a decorated tree or not
        if (Math.random() <= 0.3) {
            //generate random coordinates on the map
            let x = Math.floor(Math.random() * Math.floor(736));
            let y = Math.floor(Math.random() * Math.floor(495)) + 20;
            //generate a decorated tree 30% of the time
            treesOnMap.set(lastInsertedTreeIndex++, new Tree(x, y, true));
            spawnElves(2);

            setTimeout(function () {
                treesOnMap.delete(key);
            }, 10000);
        }
        else {
            let x = Math.floor(Math.random() * Math.floor(739));
            let y = Math.floor(Math.random() * Math.floor(509)) + 20;
            //generate a non decorated tree 70% of the time
            treesOnMap.set(lastInsertedTreeIndex++, new Tree(x, y, false));
            spawnElves(1);

            setTimeout(function () {
                treesOnMap.delete(key);
            }, 20000);
        }
    }
}
spawnTrees();

function spawnElves(number) {
    for (let i = 0; i < number; i++) {
        if (Math.random() >= 0.5) {
            let x = Math.floor(Math.random() * Math.floor(608));
            let y = Math.floor(Math.random() * Math.floor(538)) + 20;
            elvesOnMap.push(new Elf(x, y, true, context));
        }
        else {
            let x = Math.floor(Math.random() * Math.floor(758));
            let y = Math.floor(Math.random() * Math.floor(388)) + 20;
            elvesOnMap.push(new Elf(x, y, false, context));
        }
    }
}

// Update the count down every second
setInterval(function () {
    // Find the distance between now and the count down date
    let distance = countDownDate - new Date().getTime();

    // Time calculations for minutes and seconds
    let minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = "Temps restant : " + minutesLeft + "m" + secondsLeft + "s";
}, 1000);

//check if santa has touched an elf every 0.2 second
setInterval(function () {
    elvesOnMap.forEach(function (elf) {
        if (santa.collision(elf)) {
            santa.setMoney(-5);
            if (coinDrop.paused) {
                coinDrop.play();
            }
        }
    })
}, 200);

//spawn trees every 10 seconds
setInterval(function () {
    spawnTrees();
}, 10000);

//make the christmas ball appear after 1m
setTimeout(function () {
    let x = Math.floor(Math.random() * Math.floor(770));
    let y = Math.floor(Math.random() * Math.floor(550)) + 20;
    ball.moveTo(x, y);
    ballSpawn.play();
}, 60000);

//make the christmas ball disappear after 1m10s
setTimeout(function () {
    ball.moveTo(801, 601);
}, 70000);

//make the christmas ball appear again when there is 1m10s left
setTimeout(function () {
    let x = Math.floor(Math.random() * Math.floor(770));
    let y = Math.floor(Math.random() * Math.floor(550)) + 20;
    ball.moveTo(x, y);
    ballSpawn.play();
}, 140000);

//make the christmas ball disappear again when there is 1m left
setTimeout(function () {
    ball.moveTo(801, 601);
}, 150000);

//quiz at mid-time
setTimeout(function () {
    quiz.show();
    quizMode = true;
}, 105000);

//speed up all the elves when there are 20s left
setTimeout(function () {
    elvesOnMap.forEach(function (elf) {
        elf.setSpeed(2);
    })
}, 190000);

// Handle keyboard controls
let keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;

}, false);
addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];

}, false);


// Update game objects - change player position based on key pressed
function update() {
    if (38 in keysDown) { // Player is holding up key
        if (santa.getY() >= 20) {
            santa.moveBy(0, -1);
        }

    }
    if (40 in keysDown) { // Player is holding down key
        santa.sy = 204;
        if (santa.getY() <= canvas.height - santa.getHeight()) {
            santa.moveBy(0, 1);
        }

    }
    if (37 in keysDown) { // Player is holding left key
        santa.sy = 302;
        if (santa.getX() >= 0) {
            santa.moveBy(-1, 0);
        }

    }
    if (39 in keysDown) { // Player is holding right key
        santa.sy = 110;
        if (santa.getX() <= canvas.width - santa.getWidth()) {
            santa.moveBy(1, 0);
        }

    }

    treesOnMap.forEach(function (tree, key) {
        if (santa.collision(tree)) {
            santaHoHoHo.play();
            if (tree.isDecorated()) {
                santa.setGifts(-10);
            }
            else {
                santa.setGifts(-5);
            }
            treesOnMap.delete(key);
        }
    })

    if (santa.collision(ball)) {
        ballMode = true;
        ballModeTheme.play();
        ball.moveTo(801, 601);
        //make the christmas ball disappear 15s after it appeared
        setTimeout(function () {
            ballMode = false;
        }, 15000);
    }
};

//Check game status
function checkGameStatus() {
    elvesOnMap.forEach(function (elf) {
        if (ballMode || quizMode || santa.getMoney() <= 0 || countDownDate - new Date().getTime() <= 0 || santa.getGifts() <= 0) {
            //freezz the elves
            if (elf.getSpeed() !== 0) {
                elf.setSpeed(0);
            }
        }
        else {
            if (elf.getSpeed() === 0) {
                elf.setSpeed(1);
            }
        }

    })
    if (quizMode || santa.getMoney() <= 0 || countDownDate - new Date().getTime() <= 0 || santa.getGifts() <= 0) {
        //freeze santa
        santa.setSpeed(0);
    }
    //show/hide the quizz
    if (quizMode) {
        quizContainer.style.visibility = "visible";
        submitButton.style.visibility = "visible";
    }
    else {
        quizContainer.style.visibility = "hidden";
        submitButton.style.visibility = "hidden";
    }
    //if time is up or you don't have money anymore you lost
    if (santa.getMoney() <= 0 || countDownDate - new Date().getTime() <= 0) {
        alert(`You loose with ${santa.getGifts()} gifts remaining`);
    }
    //if you manage to deliver all the gifts you won
    if (santa.getGifts() <= 0) {
        alert(`You won with ${santa.getMoney()} euros`);
    }
}

// Draw everything on the canvas
function render() {
    //display the background
    background.display();
    //display the number of gifts left
    context.strokeText("Cadeaux : " + santa.getGifts().toString(), 10, 20);
    //display the money left
    let giftsTextWidth = context.measureText("Cadeaux : " + santa.getGifts().toString()).width;
    context.strokeText("Argent : " + santa.getMoney(), giftsTextWidth + 20, 20);
    //display the time left
    let timeLeftTextX = canvas.width - context.measureText(timeLeft).width - 10;
    context.strokeText(timeLeft, timeLeftTextX, 20);
    //display the trees
    treesOnMap.forEach(function (tree) {
        tree.display();
    });
    //display the elves
    elvesOnMap.forEach(function (elf) {
        elf.display();
        elf.moveAuto();
    });
    //display the christmas ball
    ball.display();
    //display Santa Claus
    santa.display();
};

function main() {
    // run the update function
    update();
    // run the render function
    render();
    //check wether or not the game is finished
    checkGameStatus();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();