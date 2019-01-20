function Tree(x, y, context, decorated) {
    if (decorated) {
        Sprite.call(this, 352, 293, x, y, 85, 64, "ressources/sprites/trees.png", context);
    }
    else {
        Sprite.call(this, 293, 215, x, y, 71, 61, "ressources/sprites/trees.png", context);
    }

    this.decorated = decorated;
    this.giftsDelivered = false;
}

Tree.prototype = Object.create(Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.isDecorated = function () {
    return this.decorated;
}

Tree.prototype.areGiftsDelivered = function () {
    return this.giftsDelivered;
}

Tree.prototype.deliverGifts = function () {
    this.giftsDelivered = true;
}