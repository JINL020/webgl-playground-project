var mouseDown = false;
var startX = 0;
var startY = 0;

var viewTranslation = [0, 0, 0];

function mouseDownFunction(event) {
    console.log("mouse down");
    event.preventDefault();
    mouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
}

function mouseMoveFunction(event) {
    console.log("mouse move");
    event.preventDefault();
    if (mouseDown) {

        var deltaX = startX - event.clientX;
        var deltaY = event.clientY - startY;

        startX = event.clientX;
        startY = event.clientY;

        viewTranslation[0] += deltaX / 100;
        viewTranslation[1] += deltaY / 100;
    }
}

function mouseUpFunction(event) {
    event.preventDefault();
    mouseDown = false;
    startX = event.offsetX;
    startY = event.offsetY;
}