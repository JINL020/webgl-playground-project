var step = 0.2;

var selectCamera = false;
var selectPacman = true;
var selectLight = false;

var selectGouraud = false;
var selectPhong = false;

var lightRotationMatrix = glMatrix.mat3.create();

function keyPressed(event) {
    switch (event.key) {
        case "c":
            selectCamera = !selectCamera;
            selectPacman = false;
            selectLight = false;
            break;
        case "0":
            selectPacman = !selectPacman;
            selectCamera = false;
            selectLight = false;
            break;
        case "L":
            selectLight = !selectLight;
            selectCamera = false;
            selectPacman = false;
            break;
        case "p":
            selectPhong = !selectPhong;
            selectGouraud = false;
            selectPhong ? shaderPrograms.phong.enable() : shaderPrograms.normal.enable();
            break;
    }

    switch (event.key) {
        case "ArrowLeft":
            if (selectCamera)
                mat4.translate(matrices.view, matrices.view, [0.2, 0, 0]);
            else if (selectLight) {
                vec3.add(lightPosition, lightPosition, [-step, 0, 0]);
            }
            else {
                pacman.faceTowards(Direction.LEFT);
                pacman.translate([-step, 0, 0]);
            }
            break;
        case "ArrowRight":
            if (selectCamera)
                mat4.translate(matrices.view, matrices.view, [-0.2, 0, 0]);
            else if (selectLight) {
                vec3.add(lightPosition, lightPosition, [step, 0, 0]);
            }
            else {
                pacman.faceTowards(Direction.RIGHT);
                pacman.translate([step, 0, 0]);
            }
            break;
        case "ArrowUp": // Use u or U key to move the camera upward. 
            if (selectCamera)
                mat4.translate(matrices.view, matrices.view, [0, 0, 0.2]);
            else if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, step, 0]);
            }
            else {
                pacman.faceTowards(Direction.UP);
                pacman.translate([0, 0, -step]);
            }
            break;
        case "ArrowDown": // Use d or D key to move the camera downward. 
            if (selectCamera)
                mat4.translate(matrices.view, matrices.view, [0, 0, -0.2]);
            else if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, -step, 0]);
            }
            else {
                pacman.faceTowards(Direction.DOWN);
                pacman.translate([0, 0, step]);
            }
            break;
        case ",":
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, step,]);
            }
            break;
        case ".":
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, -step,]);
            }
            break;
            break;
        case "w":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                console.log(lightPosition);
                setUpLightPosition();
            }
            break;
        case "s":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "e":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "q":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "d":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "a":
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        default: return;
    }

    gl.uniformMatrix4fv(currentProgram.uniforms.viewMatrix, gl.FALSE, matrices.view);
    gl.uniform3fv(currentProgram.uniforms.lightPosition, lightPosition);
}
