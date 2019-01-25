function Tree(x, y, decorated) {
    if (decorated) {
        Sprite.call(this, 352, 293, x, y, 85, 64, "ressources/sprites/trees.png");
    }
    else {
        Sprite.call(this, 293, 215, x, y, 71, 61, "ressources/sprites/trees.png");
    }
}

Tree.prototype = Object.create(Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.isDecorated = function () {
    if (this.width == 85) {
        return true;
    }
    else {
        return false;
    }
}