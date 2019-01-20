var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");
context.font = "15px Arial";
context.strokeStyle = "red";

//count down to the actual date plus 3 minutes and 30 seconds that is 210,000 milliseconds
var countDownDate = new Date(new Date().getTime() + 210000);
//time left
var timeLeft = "Temps restant : 3m30s";

// Update the count down every 1 second
setInterval(function () {
    // Find the distance between now and the count down date
    var distance = countDownDate - new Date().getTime();;

    // Time calculations for minutes and seconds
    var minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = "Temps restant : " + minutesLeft + "m" + secondsLeft + "s";
}, 1000);

var background = new Sprite(0, 0, 0, 0, 600, 800, "ressources/background.jpg", context);

var santa = new Santa(0, 208, 100, 100, 96, 64, "ressources/sprites/santa.png", context, 4);

// Update game objects - change player position based on key pressed
document.onkeydown = function (e) {
    switch (e.key) {
        case "ArrowDown":
            if (santa.getY() <= canvas.height - santa.getHeight()) {
                santa.move(0, 1);
            }
            break;
        case "ArrowUp":
            if (santa.getY() >= 20) {
                santa.move(0, -1);
            }
            break;
        case "ArrowRight":
            if (santa.getX() <= canvas.width - santa.getWidth()) {
                santa.move(1, 0);
            }
            break;
        case "ArrowLeft":
            if (santa.getX() >= 0) {
                santa.move(-1, 0);
            }
            break;
        default:
            break;
    }
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
    //display Santa Claus
    santa.display();
};

function main() {
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
