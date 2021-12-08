var step = 0.2;

var selectCamera = false;
var selectAll = false;
var selectObject = false;
var selection = null;

function keyPressed(event) {
    switch (event.key) {
        case "c":
            selectCamera = !selectCamera;
            selectAll = false;
            selectObject = false;
            break;
        case "0":
            selectAll = !selectAll;
            selectCamera = false;
            selectObject = false;
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
            selection = parseInt(event.key) - 1;
            break;
    }
    if (selectCamera) {
        shapes.forEach(
            shape => {
                shape.setAxisOn(false);
            });
    }
    if (selectAll) {
        shapes.forEach(
            shape => {
                shape.setAxisOn(true);
            });
    }
    if (selectObject) {
        shapes.forEach(
            shape => {
                shape.setAxisOn(false);
            });
        shapes[selection].setAxisOn(true);
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
            break;
        case ",": // Use d or D key to move the camera downward. 
            if (selectCamera)
                trackUpDown -= step;
            if (selectAll)
                shapes.forEach(shape => {
                    shape.translate([0, 0, step,]);
                })
            if (selectObject) {
                shapes[selection].translate([0, 0, step,]);
            }
            break;
        case ".": // Use d or D key to move the camera downward. 
            if (selectCamera)
                trackUpDown -= step;
            if (selectAll)
                shapes.forEach(shape => {
                    shape.translate([0, 0, -step,]);
                })
            if (selectObject) {
                shapes[selection].translate([0, 0, -step,]);
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
            break;
        case "s":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [1, 0, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [1, 0, 0]);
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
            break;
        case "q":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [0, 1, 0]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [0, 1, 0]);
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
            break;
        case "a":
            if (selectAll)
                shapes.forEach(shape => {
                    shape.rotate(0.1, [0, 0, 1]);
                })
            if (selectObject) {
                shapes[selection].rotate(0.1, [0, 0, 1]);
            }
            break;
        default: return;
    }
}
