//By default it is an elf
function MobileSprite(sx, sy, x, y, height, width, imgSrc, context, speed, downDir, upDir, rightDir, leftDir, rightFoot, leftFoot) {
    Sprite.call(this, sx, sy, x, y, height, width, imgSrc, context);

    this.speed = speed;
    this.downDir = downDir;
    this.upDir = upDir;
    this.rightDir = rightDir;
    this.leftDir = leftDir;
    this.rightFoot = rightFoot;
    this.leftFoot = leftFoot;

    this.frontFootSetter = true;
    this.changeFootCounter = 0;
}

MobileSprite.prototype = Object.create(Sprite.prototype);
MobileSprite.prototype.constructor = MobileSprite;

MobileSprite.prototype.moveBy = function (x, y) {
    this.changeOrientation(x, y);
    this.changeFrontFoot();

    this.x += x * this.speed;
    this.y += y * this.speed;
}

MobileSprite.prototype.getSpeed = function(){
    return this.speed;
}

MobileSprite.prototype.setSpeed = function(speed){
    this.speed = speed;
}

MobileSprite.prototype.changeOrientation = function (x, y) {
    if (x === 1) {
        this.sy = this.rightDir;
    }
    else if (x === -1) {
        this.sy = this.leftDir;
    }
    if (y === 1) {
        this.sy = this.downDir;
    }
    else if (y === -1) {
        this.sy = this.upDir;
    }
}
//change the foot at the front when the sprite is moving 
MobileSprite.prototype.changeFrontFoot = function () {
    if (this.changeFootCounter < 9) {
        this.changeFootCounter++;
    }
    else {
        this.frontFootSetter = !this.frontFootSetter;
        if (this.frontFootSetter) {
            this.sx = this.leftFoot;
        }
        else {
            this.sx = this.rightFoot;
        }
        this.changeFootCounter = 0;
    }
}

MobileSprite.prototype.collision = function (sprite) {
    //collision by the right or the left
    let rightLeft = ((this.x + this.width >= sprite.getX() && this.x + this.width <= sprite.getX() + sprite.getWidth()) || (this.x >= sprite.getX() && this.x <= sprite.getX() + sprite.getWidth())) && ((this.y >= sprite.getY() && this.y <= sprite.getY() + sprite.getHeight()) || (this.y + this.width >= sprite.getY() && this.y + this.width <= sprite.getY() + sprite.getHeight()));
    //collision by above or below
    let aboveBelow = ((this.y + this.height >= sprite.getY() && this.y + this.height <= sprite.getY() + sprite.getHeight()) || (this.y >= sprite.getY() && this.y <= sprite.getY() + sprite.getHeight())) && ((this.x >= sprite.getX() && this.x <= sprite.getX() + sprite.getWidth()) || (this.x + this.height >= sprite.getX() && this.x + this.height <= sprite.getX() + sprite.getWidth()))
    if (rightLeft || aboveBelow) {
        return true;
    }
    else {
        return false;
    }
}