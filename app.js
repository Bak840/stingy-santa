var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");

var direction = {
    "ArrowRight": 110,
    "ArrowLeft": 302,
    "ArrowUp": 14,
    "ArrowDown": 204
};

var sy = direction["ArrowDown"];

var frame = true;
var modifier = 0.02;

// Load background image
var backgroundImg = new Image(800, 600);
backgroundImg.src = "ressources/background.jpg";

// Load the santa image
var santaImg = new Image(66, 90);
santaImg.src = "ressources/santa.png";

var santa = {
    sx: 0,
    sy: 208,
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 256
}

// Load background image
var drawBackground = function () {
    context.drawImage(backgroundImg, 0, 0);
}
backgroundImg.onload = drawBackground;

// Load the santa image
var drawSanta = function () {
    context.drawImage(santaImg, 0, sy, 64, 96, 0, 0, 64, 96);
}
santaImg.onload = drawSanta;

document.onkeydown = function (e) {
    if (direction[e.key] === undefined) {
        return;
    }
    santa.sy = direction[e.key];

    if (frame) {
        santa.sx = 0;
    }
    else {
        santa.sx = 146;
    }

    switch (e.key) {
        case "ArrowDown":
            santa.y += santa.speed * modifier;
            break;
        case "ArrowUp":
            santa.y -= santa.speed * modifier;
            break;
        case "ArrowRight":
            santa.x += santa.speed * modifier;
            break;
        case "ArrowLeft":
            santa.x -= santa.speed * modifier;
            break;
        default:
            break;
    }

    frame = !frame;

    context.clearRect(0, 0, 800, 600);
    drawBackground();
    context.drawImage(santaImg, santa.sx, santa.sy, 64, 96, santa.x, santa.y, 64, 96);
};