class Pacman {

    constructor() {
        this.version = [];
        this.currentVersion = null;
        this.animationSequence = [3, 2, 1, 0, 1, 2];
        this.direction = null;
    }


    initData(versionArray) {
        this.version = versionArray;
        this.currentVersion
        this.updateCurrentVersion();
    }

    updateCurrentVersion() {
        this.currentVersion = this.animationSequence[0];
        this.animationSequence.push(this.animationSequence[0]);
        this.animationSequence.shift();
    }

    setDirection(direction) {
        this.direction = direction;
    }

    draw() {
        this.version[this.currentVersion].draw();
    }

    translate(vector) {
        this.version[this.currentVersion].translate(vector);
    }

    rotate(angle, axes) {
        this.version.forEach(pacmanVersion => pacmanVersion.rotate(angle, axes));
    }

    scale(vector) {
        this.version[this.currentVersion].scale(vector);
    }

    turn(angle) {
        this.version.forEach(pacmanVersion => pacmanVersion.rotate(angle, [0, 1, 0]));
    }
}
