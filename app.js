var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");
context.font = "15px Arial";
context.strokeStyle = "red";

//count down to the actual date plus 3 minutes and 30 seconds that is 210,000 milliseconds
var countDownDate = new Date(new Date().getTime() + 210000);
//time left
var timeLeft = "Temps restant : 3m30s";

var background = new Sprite(0, 0, 0, 0, 600, 800, "ressources/background.jpg", context);

var santa = new Santa(400, 300, context);

var treesOnTheMap = [];
function spawnTrees() {
    treesOnTheMap = [];
    //generate a random number of trees between 1 and 3
    let treesNumber = Math.floor(Math.random() * Math.floor(3)) + 2;
    for (let i = 0; i < treesNumber; i++) {
        //generate a random boolean to decide if we should spawn a decorated tree or not
        if (Math.random() <= 0.33) {
            let x = Math.floor(Math.random() * Math.floor(736));
            let y = Math.floor(Math.random() * Math.floor(495)) + 20;
            treesOnTheMap.push(new Tree(x, y, context, true));
        }
        else {
            let x = Math.floor(Math.random() * Math.floor(739));
            let y = Math.floor(Math.random() * Math.floor(509)) + 20;
            treesOnTheMap.push(new Tree(x, y, context, false));
        }
    }
}
spawnTrees();

// Update the count down every second
setInterval(function () {
    // Find the distance between now and the count down date
    var distance = countDownDate - new Date().getTime();;

    // Time calculations for minutes and seconds
    var minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = "Temps restant : " + minutesLeft + "m" + secondsLeft + "s";
}, 1000);

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
function update() {
    if (38 in keysDown) { // Player is holding up key
        if (santa.getY() >= 20) {
            santa.move(0, -1);
        }

    }
    if (40 in keysDown) { // Player is holding down key
        santa.sy = 204;
        if (santa.getY() <= canvas.height - santa.getHeight()) {
            santa.move(0, 1);
        }

    }
    if (37 in keysDown) { // Player is holding left key
        santa.sy = 302;
        if (santa.getX() >= 0) {
            santa.move(-1, 0);
        }

    }
    if (39 in keysDown) { // Player is holding right key
        santa.sy = 110;
        if (santa.getX() <= canvas.width - santa.getWidth()) {
            santa.move(1, 0);
        }

    }

    treesOnTheMap.forEach(function (tree) {
        //TO DO : collisions conditions
        if ((santa.getX() <= tree.getX() && tree.getX()<= santa.getX() + santa.getWidth() && santa.getY() == tree.getY()) || (santa.getX() == tree.getX() && santa.getY() == tree.getY() + tree.getHeight()) || (santa.getX() == tree.getX() + tree.getWidth() && santa.getY() == tree.getY()) || (santa.getX() == tree.getX() + tree.getWidth() && santa.getY() == tree.getY() + tree.getHeight())) {
            if (!tree.areGiftsDelivered()) {
                tree.deliverGifts();
                if (tree.isDecorated()) {
                    santa.deliverGifts(10);
                }
                else {
                    santa.deliverGifts(5);
                }
            }

        }
    })

};

// Draw everything on the canvas
var render = function () {
    //display the background
    background.display();
    //display the number of gifts left
    context.strokeText("Cadeaux : " + santa.getGiftNumber().toString(), 10, 20);
    //display the money left
    var giftsTextWidth = context.measureText("Cadeaux : " + santa.getGiftNumber().toString()).width;
    context.strokeText("Argent : " + santa.getMoney(), giftsTextWidth + 20, 20);
    //display the time left
    var timeLeftTextX = canvas.width - context.measureText(timeLeft).width - 10;
    context.strokeText(timeLeft, timeLeftTextX, 20);
    //display the trees
    treesOnTheMap.forEach(function (tree) {
        tree.display();
    })
    //display Santa Claus
    santa.display();
};

function main() {
    // run the update function
    update(); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();