var step = 0.2;

var selectCamera = false;
var selectAll = false;
var selectObject = false;
var selection = null;
var selectLight = false;

var selectGouraud = false;
var selectPhong = false;

var lightRotationMatrix = glMatrix.mat3.create();

function keyPressed(event) {
    switch (event.key) {
        case "o":
            selectGouraud = !selectGouraud;
            selectPhong = false;
            selectGouraud ? shaderPrograms.gouraud.enable() : shaderPrograms.normal.enable();
            break;
        case "p":
            selectPhong = !selectPhong;
            selectGouraud = false;
            selectPhong ? shaderPrograms.phong.enable() : shaderPrograms.normal.enable();
            break;
    }

    switch (event.key) {
        case "c":
            selectCamera = !selectCamera;
            selectAll = false;
            selectObject = false;
            selectLight = false;
            break;
        case "0":
            selectAll = !selectAll;
            selectCamera = false;
            selectObject = false;
            selectLight = false;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            selectObject = true;
            selectCamera = false;
            selectAll = false;
            selectLight = false;
            selection = parseInt(event.key) - 1;
            break;
        case "L":
            selectLight = !selectLight;
            selectCamera = false;
            selectAll = false;
            selectObject = false;
            break;
    }

    switch (event.key) {
        case "ArrowLeft":
            if (selectCamera)
                viewTranslation[0] -= step
            if (selectAll) {
                shapes.forEach(shape => {
                    shape.translate([-step, 0, 0]);
                });
            }
            if (selectObject) {
                shapes[selection].translate([-step, 0, 0]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [-step, 0, 0]);
            }
            break;
        case "ArrowRight":
            if (selectCamera)
                viewTranslation[0] += step
            if (selectAll)
                shapes.forEach(shape => {
                    shape.translate([step, 0, 0]);
                })
            if (selectObject) {
                shapes[selection].translate([step, 0, 0]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [step, 0, 0]);
            }
            break;
        case "ArrowUp": // Use u or U key to move the camera upward. 
            if (selectCamera)
                viewTranslation[1] += step;
            if (selectAll)
                shapes.forEach(shape => {
                    shape.translate([0, step, 0]);
                })
            if (selectObject) {
                shapes[selection].translate([0, step, 0]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, step, 0]);
            }
            break;
        case "ArrowDown": // Use d or D key to move the camera downward. 
            if (selectCamera)
                viewTranslation[1] -= step;
            if (selectAll)
                shapes.forEach(shape => {
                    shape.translate([0, -step, 0]);
                })
            if (selectObject) {
                shapes[selection].translate([0, -step, 0]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, -step, 0]);
            }
            break;
        case ",":
            if (selectCamera)
                //??
                if (selectAll)
                    shapes.forEach(shape => {
                        shape.translate([0, 0, step,]);
                    })
            if (selectObject) {
                shapes[selection].translate([0, 0, step,]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, step,]);
            }
            break;
        case ".":
            if (selectCamera)
                //??
                if (selectAll)
                    shapes.forEach(shape => {
                        shape.translate([0, 0, -step,]);
                    })
            if (selectObject) {
                shapes[selection].translate([0, 0, -step,]);
            }
            if (selectLight) {
                vec3.add(lightPosition, lightPosition, [0, 0, -step,]);
            }
            break;
        case "x":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([0.9, 1, 1]);
                })
            if (selectObject) {
                shapes[selection].scale([0.9, 1, 1]);
            }
            break;
        case "X":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([1.1, 1, 1]);
                })
            if (selectObject) {
                shapes[selection].scale([1.1, 1, 1]);
            }
            break;
        case "y":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([1, 0.9, 1]);
                })
            if (selectObject) {
                shapes[selection].scale([1, 0.9, 1]);
            }
            break;
        case "Y":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([1, 1.1, 1]);
                })
            if (selectObject) {
                shapes[selection].scale([1, 1.1, 1]);
            }
            break;
        case "z":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([0.9, 0.9, 0.9]);
                })
            if (selectObject) {
                shapes[selection].scale([0.9, 0.9, 0.9]);
            }
            break;
        case "Z":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.scale([1.1, 1.1, 1.1]);
                })
            if (selectObject) {
                shapes[selection].scale([1.1, 1.1, 1.1]);
            }
            break;
        case "w":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(-0.1, [1, 0, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(-0.1, [1, 0, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                console.log(lightPosition);
                setUpLightPosition();
            }
            break;
        case "s":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [1, 0, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [1, 0, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [1, 0, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "e":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(-0.1, [0, 1, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(-0.1, [0, 1, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "q":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [0, 1, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [0, 1, 0]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 1, 0]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "d":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(-0.1, [0, 0, 1]);
                })
            if (selectObject) {
                shapes[selection].rotate(-0.1, [0, 0, 1]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, -0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        case "a":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [0, 0, 1]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [0, 0, 1]);
            }
            if (selectLight) {
                mat3.rotate(lightRotationMatrix, lightRotationMatrix, 0.01, [0, 0, 1]);
                vec3.transformMat3(lightPosition, lightPosition, lightRotationMatrix);
                setUpLightPosition();
            }
            break;
        default: return;
    }

    mat4.lookAt(matrices.view, [0, 0, 10], [viewTranslation[0], viewTranslation[1], 0], [0, 1, 0]);
    gl.uniformMatrix4fv(currentProgram.uniforms.viewMatrix, gl.FALSE, matrices.view);
    gl.uniform3fv(currentProgram.uniforms.lightPosition, lightPosition);
}
