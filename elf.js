function Elf(x, y, dir, context) {
    MobileSprite.call(this, 0, 32, x, y, 32, 32, "ressources/sprites/elf.png", context, 1, 0, 96, 64, 32, 0, 64);

    this.dir = dir;
    this.start;
    //decide whether the elf should move horizontally or vertically
    if (dir) {
        this.start = x;
    }
    else {
        this.start = y;
    }
    this.orientation = true;
}

Elf.prototype = Object.create(MobileSprite.prototype);
Elf.prototype.constructor = Elf;

//move the elf on 150 pixels
Elf.prototype.moveAuto = function () {
    if (this.dir) {
        if (this.orientation) {
            if (this.x != this.start + 150) {
                this.move(1, 0);
            }
            else {
                this.orientation = !this.orientation;
            }
        }
        else {
            if (this.x != this.start) {
                this.move(-1, 0);
            }
            else {
                this.orientation = !this.orientation;
            }
        }
    }
    else {
        if (this.orientation) {
            if (this.y != this.start + 150) {
                this.move(0, 1);
            }
            else {
                this.orientation = !this.orientation;
            }
        }
        else {
            if (this.y != this.start) {
                this.move(0, -1);
            }
            else {
                this.orientation = !this.orientation;
            }
        }
    }
}