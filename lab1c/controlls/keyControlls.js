var step = 0.2;

var selectCamera = false;
var selectPacman = false;
var selectLight = false;

var selectGouraud = false;
var selectPhong = false;

var lightRotationMatrix = glMatrix.mat3.create();

function keyPressed(event) {
    switch (event.key) {
        /*case "o":
            selectGouraud = !selectGouraud;
            selectPhong = false;
            selectGouraud ? shaderPrograms.gouraud.enable() : shaderPrograms.normal.enable();
            break;*/
        case "p":
            selectPhong = !selectPhong;
            selectGouraud = false;
            selectPhong ? shaderPrograms.phong.enable() : shaderPrograms.normal.enable();
            break;
    }

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
    }

    switch (event.key) {
        case "ArrowLeft":
            if (selectCamera)
                viewTranslation[0] -= step
            if (selectPacman) {
                pacman.faceTowards(Direction.LEFT);
                pacman.translate([-step, 0, 0]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [-step, 0, 0]);
            }
            break;
        case "ArrowRight":
            if (selectCamera)
                viewTranslation[0] += step
            if (selectPacman) {
                pacman.faceTowards(Direction.RIGHT);
                pacman.translate([step, 0, 0]);

            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [step, 0, 0]);
            }
            break;
        case "ArrowUp": // Use u or U key to move the camera upward. 
            if (selectCamera)
                viewTranslation[1] += step;
            if (selectPacman) {
                pacman.faceTowards(Direction.UP);
                pacman.translate([0, 0, -step]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, step, 0]);
            }
            break;
        case "ArrowDown": // Use d or D key to move the camera downward. 
            if (selectCamera)
                viewTranslation[1] -= step;
            if (selectPacman) {
                pacman.faceTowards(Direction.DOWN);
                pacman.translate([0, 0, step]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, -step, 0]);
            }
            break;
        case ",":
            if (selectCamera) {

            }
            if (selectPacman) {
                pacman.translate([0, 0, step,]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, step,]);
            }
            break;
        case ".":
            if (selectCamera) {

            }
            //??
            if (selectPacman) {
                pacman.translate([0, 0, -step,]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, -step,]);
            }
            break;
        case "z":
            if (selectPacman) {
                pacman.scale([0.9, 0.9, 0.9]);
            }
            break;
        case "Z":
            if (selectPacman) {
                pacman.scale([1.1, 1.1, 1.1]);
            }
            break;
        case "w":
            if (selectPacman) {
                pacman.rotate(-0.1, [1, 0, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                console.log(lightPosition);
                setUpLightPosition();
            }
            break;
        case "s":
            if (selectPacman) {
                pacman.rotate(0.1, [1, 0, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "e":
            if (selectPacman) {
                pacman.rotate(-0.1, [0, 1, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "q":
            if (selectPacman) {
                pacman.rotate(0.1, [0, 1, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "d":
            if (selectPacman) {
                pacman.rotate(-0.1, [0, 0, 1]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "a":
            if (selectPacman) {
                pacman.rotate(0.1, [0, 0, 1]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        default: return;
    }

    mat4.lookAt(matrices.view, COP, [viewTranslation[0], viewTranslation[1], 0], [0, 1, 0]);
    gl.uniformMatrix4fv(currentProgram.uniforms.viewMatrix, gl.FALSE, matrices.view);
    gl.uniform3fv(currentProgram.uniforms.lightPosition, lightPosition);
}
