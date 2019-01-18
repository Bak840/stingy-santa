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

// Update game objects - change player position based on key pressed
var update = function (modifier) {
    
    if(frame){
        santa.sx = 0;
    }
    else{
        santa.sx = 146;
    }
    
    if (38 in keysDown) { // Player is holding up key
        santa.sy = 14;
        santa.y -= santa.speed * modifier;
        frame = !frame;
    }
    if (40 in keysDown) { // Player is holding down key
        santa.sy = 204;
        santa.y += santa.speed * modifier;
        frame = !frame;
    }
    if (37 in keysDown) { // Player is holding left key
        santa.sy = 302;
        santa.x -= santa.speed * modifier;
        frame = !frame;
    }
    if (39 in keysDown) { // Player is holding right key
        santa.sy = 110;
        santa.x += santa.speed * modifier;
        frame = !frame;
    }
    
};

// Draw everything on the canvas
var render = function () {
    if (bgReady) {
        context.drawImage(backgroundImg, 0, 0);
    }
    if (santaReady) {
        context.drawImage(santaImg, santa.sx, santa.sy, 64, 96, santa.x, santa.y, 64, 96);
    }
};

var main = function () {
    // run the update function
    update(0.02); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();