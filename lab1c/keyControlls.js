var selectGouraud = false;
var selectPhong = false;

var lightRotationMatrix = glMatrix.mat3.create();

function keyPressed(event) {
    switch (event.key) {
        case "g":
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
        case "ArrowLeft":
            //
            break;
        case "ArrowRight":
            //
            break;
        case "ArrowUp": // Use u or U key to move the camera upward. 
            //
            break;
        case "ArrowDown": // Use d or D key to move the camera downward. 
            //
            break;
        default: return;
    }
}
