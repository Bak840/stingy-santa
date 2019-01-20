function MobileSprite(sx, sy, x, y, height, width, imgSrc, context, speed) {
    Sprite.call(this, sx, sy, x, y, height, width, imgSrc, context);

    this.speed = speed;
    this.downDir = 0;
    this.upDir = 96;
    this.rightDir = 64;
    this.leftDir = 32;
    this.rightFoot = 0;
    this.leftFoot = 64;

    this.frontFootSetter = true;
    this.changeFootCounter = 0;
}

MobileSprite.prototype = Object.create(Sprite.prototype);
MobileSprite.prototype.constructor = MobileSprite;

MobileSprite.prototype.getX = function () {
    return this.x;
}

MobileSprite.prototype.getY = function () {
    return this.y;
}

MobileSprite.prototype.getHeight = function () {
    return this.height;
}

MobileSprite.prototype.getWidth = function () {
    return this.width;
}

MobileSprite.prototype.move = function (x, y) {
    this.changeOrientation(x, y);
    this.changeFrontFoot();

    this.x += x * this.speed;
    this.y += y * this.speed;
}

MobileSprite.prototype.changeOrientation = function (x, y) {
    if (x == 1) {
        this.sy = this.rightDir;
    }
    else if (x == -1) {
        this.sy = this.leftDir;
    }
    if (y == 1) {
        this.sy = this.downDir;
    }
    else if (y == -1) {
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