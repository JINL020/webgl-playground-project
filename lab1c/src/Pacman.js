class Pacman {
  constructor(x, z) {
    this.x = x;
    this.z = z;

    this.version = [];
    this.currentVersion = null;
    this.animationSequence = [3, 2, 1, 0, 1, 2];

    this.currentDirection = Direction.DOWN;
    this.requestedDirection = null;
  }

  initData(versionArray) {
    this.version = versionArray;
    this.updateChewingAnimation();
    this.translate([this.x, 0, this.z]);
  }

  updateChewingAnimation() {
    this.currentVersion = this.animationSequence[0];
    this.animationSequence.push(this.animationSequence[0]);
    this.animationSequence.shift();
  }

  draw() {
    this.version[this.currentVersion].draw();
  }

  translate(vector) {
    this.version.forEach((pacmanVersion) => pacmanVersion.translate(vector));
  }

  run(distance) {
    switch (this.currentDirection) {
      case Direction.LEFT:
        this.version.forEach((pacmanVersion) => {
          pacmanVersion.translate([-distance, 0, 0]);
        });
        break;
      case Direction.RIGHT:
        this.version.forEach((pacmanVersion) => {
          pacmanVersion.translate([distance, 0, 0]);
        });
        break;
      case Direction.UP:
        this.version.forEach((pacmanVersion) => {
          pacmanVersion.translate([0, 0, -distance]);
        });
        break;
      case Direction.DOWN:
        this.version.forEach((pacmanVersion) => {
          pacmanVersion.translate([0, 0, distance]);
        });
        break;
    }
  }

  faceTowards(direction) {
    this.version.forEach((pacmanVersion) =>
      pacmanVersion.rotate(
        Direction.getTurnAngle(this.currentDirection, direction),
        [0, 1, 0]
      )
    );
    this.currentDirection = direction;
  }
}
