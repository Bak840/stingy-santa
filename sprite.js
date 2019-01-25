function Sprite(sx, sy, x, y, height, width, imgSrc) {
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.img = new Image(x, y);
    this.img.src = imgSrc;
    this.img.onload = this.display();
}

//Proper getter and setters
Sprite.prototype.getX = function () {
    return this.x;
}

Sprite.prototype.getY = function () {
    return this.y;
}

Sprite.prototype.getHeight = function () {
    return this.height;
}

Sprite.prototype.getWidth = function () {
    return this.width;
}

//move the sprite to anoter location
Sprite.prototype.moveTo = function(x, y){
    this.x = x;
    this.y = y;
}

//draw the sprite on the canvas
Sprite.prototype.display = function () {
    context.drawImage(this.img, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
}