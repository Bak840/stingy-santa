var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");
context.font = "15px Arial";
context.strokeStyle = "red";

//if true right foot in front otherwise left foot in front
var footSetter = true;
//change the foot in front every 10 frames
var changeFootCounter = 0;
//change santa's speed
var speed = 0.02;
//count down to the actual date plus 3 minutes and 30 seconds that is 210,000 milliseconds
var countDownDate = new Date(new Date().getTime() + 210000);
//time left
var timeLeft = "Temps restant : 3m30s";
//gifts left
var giftsLeft = 100;
//money left
var moneyLeft = 100;

// Update the count down every 1 second
setInterval(function () {
    // Find the distance between now and the count down date
    var distance = countDownDate - new Date().getTime();;

    // Time calculations for minutes and seconds
    var minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = "Temps restant : " + minutesLeft + "m" + secondsLeft + "s";
}, 1000);

//each arrow is linked to the y coordinate of the correspoding orientation of santa in the the santa sprite
var direction = {
    "ArrowRight": 110,
    "ArrowLeft": 302,
    "ArrowUp": 14,
    "ArrowDown": 204
};

//initialize the santa sprite to the down direction
var sy = direction["ArrowDown"];

// Load background image
var backgroundImg = new Image(800, 600);
backgroundImg.src = "ressources/background.jpg";

// Load the santa image
var santaImg = new Image(66, 90);
santaImg.src = "ressources/sprites/santa.png";

//santa sprite coordinates
var santa = {
    sx: 0,
    sy: 208,
    x: canvas.width / 2,
    y: canvas.height / 2,
    height: 96,
    width: 64,
    speed: 256
}

// Load background image
var bgReady = false;
backgroundImg.onload = function () {
    // show the background image
    bgReady = true;
};

// Load the santa image
var santaReady = false;
santaImg.onload = function () {
    // show the here image
    santaReady = true;
};

// Handle keyboard controls
var keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;

}, false);
addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];

}, false);

//foot change when santa is moving 
function updateFoot() {
    if (changeFootCounter < 9) {
        changeFootCounter++;
    }
    else {
        footSetter = !footSetter;
        changeFootCounter = 0;
    }
}

// Update game objects - change player position based on key pressed
function update(speed) {
    if (footSetter) {
        santa.sx = 0;
    }
    else {
        santa.sx = 146;
    }

    if (38 in keysDown) { // Player is holding up key
        santa.sy = 14;
        if (santa.y >= 20) {
            santa.y -= santa.speed * speed;
            updateFoot();
        }

    }
    if (40 in keysDown) { // Player is holding down key
        santa.sy = 204;
        if (santa.y <= canvas.height - santa.height) {
            santa.y += santa.speed * speed;
            updateFoot();
        }

    }
    if (37 in keysDown) { // Player is holding left key
        santa.sy = 302;
        if (santa.x >= 0) {
            santa.x -= santa.speed * speed;
            updateFoot();
        }
    }
    if (39 in keysDown) { // Player is holding right key
        santa.sy = 110;
        if (santa.x <= canvas.width - santa.width) {
            santa.x += santa.speed * speed;
            updateFoot();
        }
    }

};

// Draw everything on the canvas
var render = function () {
    if (bgReady) {
        //display the background
        context.drawImage(backgroundImg, 0, 0);
        //display the number of gifts left
        context.strokeText("Cadeaux : " + giftsLeft.toString(), 10, 20);
        //display the money left
        var giftsTextWidth = context.measureText("Cadeaux : " + giftsLeft.toString()).width;
        context.strokeText("Argent : " + moneyLeft, giftsTextWidth + 20, 20);
        //display the time left
        var timeLeftTextX = canvas.width - context.measureText(timeLeft).width - 10;
        context.strokeText(timeLeft, timeLeftTextX, 20);
    }
    if (santaReady) {
        context.drawImage(santaImg, santa.sx, santa.sy, 64, 96, santa.x, santa.y, 64, 96);
    }
};

function main() {
    // run the update function
    update(0.01); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();