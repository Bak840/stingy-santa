function Santa(sx, sy, x, y, height, width, imgSrc, context, speed, downDir, upDir, rightDir, leftDir, rightFoot, leftFoot) {
    MobileSprite.call(this, sx, sy, x, y, height, width, imgSrc, context, speed, downDir, upDir, rightDir, leftDir, rightFoot, leftFoot);

    this.downDir = 204;
    this.upDir = 14;
    this.rightDir = 110;
    this.leftDir = 302;
    this.rightFoot = 0;
    this.leftFoot = 146;
    this.giftNumber = 100;
    this.money = 100;
}

Santa.prototype = Object.create(MobileSprite.prototype);
Santa.prototype.constructor = Santa;

Santa.prototype.getGiftNumber = function () {
    return this.giftNumber;
}

Santa.prototype.getMoney = function () {
    return this.money;
}

Santa.prototype.deliverGifts = function (deliveredGiftNumber) {
    this.giftNumber -= deliveredGiftNumber;
}

Santa.prototype.looseMoney = function () {
    this.money -= 5;
}