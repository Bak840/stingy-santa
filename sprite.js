function Sprite(sx, sy, x, y, height, width, imgSrc, context) {
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

Sprite.prototype.display = function () {
    context.drawImage(this.img, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
}