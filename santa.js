function Santa(x, y, context) {
    MobileSprite.call(this, 0, 208, x, y, 96, 64, "ressources/sprites/santa.png", context, 1, 204, 14, 110, 302, 0, 146);

    this.gifts = 100;
    this.money = 100;
}

Santa.prototype = Object.create(MobileSprite.prototype);
Santa.prototype.constructor = Santa;

Santa.prototype.getGifts = function () {
    return this.gifts;
}

Santa.prototype.getMoney = function () {
    return this.money;
}

Santa.prototype.setGifts = function (gifts) {
    this.gifts += gifts;
}

Santa.prototype.setMoney = function (money) {
    this.money += money;
}