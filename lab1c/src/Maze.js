class Maze {
  constructor() {
    this.mazeWalls = [];
    this.dots = [];
    this.groundPlane = null;
    //1 - wall
    //0 - dots
    //4 - pacman
    //5 - empty space
    //6 - enemy
    //7 - power dot
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 4, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  draw() {
    this.mazeWalls.forEach((wall) => {
      wall.draw();
    });
    this.groundPlane.draw();
  }

  initData() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile == 1) {
          this.#createWall(column, row);
        }
        if (tile == 0) {
          // this.#drawDot(column, row);
        }
      }
    }
    this.#createGroundPlane();
  }

  #createWall(column, row) {
    loadOBJFile("/lab1c/assets/wall_blue.obj").then((wall) => {
      wall.translate([column * 2, 0, row * 2]);
      this.mazeWalls.push(wall);
    });
  }

  #createGroundPlane() {
    loadOBJFile("/lab1c/assets/groundPlane.obj").then((plane) => {
      this.groundPlane = plane;
    });
  }

  //#createDot(column, row) {}

  getPacmanPos() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          const pos = [column * 2, row * 2];
          //console.log(pos);
          return pos;
        }
      }
    }
  }
}
