var step = 0.2;

var selectPacman = true;
var selectLight = false;

var selectGouraud = false;
var selectPhong = false;

var lightRotationMatrix = glMatrix.mat3.create();

function keyPressed(event) {
  switch (event.key) {
    case "0":
      selectPacman = !selectPacman;
      selectLight = false;
      break;
    case "L":
      selectLight = !selectLight;
      selectPacman = false;
      break;
    case "p":
      selectPhong = !selectPhong;
      selectGouraud = false;
      selectPhong
        ? shaderPrograms.phong.enable()
        : shaderPrograms.normal.enable();
      break;
  }

  switch (event.key) {
    case "ArrowLeft":
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [-step, 0, 0]);
      } else {
        pacman.faceTowards(Direction.LEFT);
        pacman.translate([-step, 0, 0]);
      }
      break;
    case "ArrowRight":
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [step, 0, 0]);
      } else {
        pacman.faceTowards(Direction.RIGHT);
        pacman.translate([step, 0, 0]);
      }
      break;
    case "ArrowUp": // Use u or U key to move the camera upward.
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [0, step, 0]);
      } else {
        pacman.faceTowards(Direction.UP);
        pacman.translate([0, 0, -step]);
      }
      break;
    case "ArrowDown": // Use d or D key to move the camera downward.
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [0, -step, 0]);
      } else {
        pacman.faceTowards(Direction.DOWN);
        pacman.translate([0, 0, step]);
      }
      break;
    case ",":
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [0, 0, step]);
      }
      break;
    case ".":
      if (selectLight) {
        vec3.add(lightPosition, lightPosition, [0, 0, -step]);
      }
      break;
    default:
      return;
  }
  gl.uniform3fv(currentProgram.uniforms.lightPosition, lightPosition);
}
