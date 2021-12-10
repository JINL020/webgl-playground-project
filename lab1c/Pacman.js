class Pacman {

    constructor() {
        this.head = null;
        this.body = null;
    }

    initHead(head) {
        this.head = head;
    }

    initBody(body) {
        this.body = body;
    }

    draw() {
        this.head.draw();
        this.body.draw();
    }

    translate(vector) {
        this.head.translate(vector);
        this.body.translate(vector);
    }

    rotate(angle, axes) {
        this.head.rotate(angle, axes);
        this.body.rotate(angle, axes);
    }

    scale(vector) {
        this.head.scale(vector);
        this.body.scale(vector);
    }

    turn(angle) {
        this.head.rotate(angle, [0, 1, 0]);
        this.body.rotate(angle, [0, 1, 0]);
    }

    openMouth(angle) {
        this.head.rotate(angle, [1, 0, 0]);
    }

    closeMouth(angle) {
        this.head.rotate(angle, [1, 0, 0]);
    }
}
