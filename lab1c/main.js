/* --------- main --------- */
window.onload = function main() {

    /* --------- basic setup --------- */
    canvas = document.getElementById('myCanvas');

    gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }
    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.3, 0.3, 0.3, 1.0);// Canvas background color
    gl.enable(gl.DEPTH_TEST);

    mat4.perspective(matrices.projection, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);// vertical field-of-view, aspect W/H, near cull distance, far cull distance
    mat4.lookAt(matrices.view, [0, 0, 10], [0, 0, 0], [0, 1, 0]);


    /* --------- create shaders --------- */
    shaderPrograms.gouraud = new ShaderProgram(shaderIds.gouraudVertex, shaderIds.normalFragment, shaderInfo);
    shaderPrograms.phong = new ShaderProgram(shaderIds.phongVertex, shaderIds.phongFragment, shaderInfo);
    shaderPrograms.normal = new ShaderProgram(shaderIds.normalVertex, shaderIds.normalFragment, shaderInfo);

    shaderPrograms.normal.enable();


    /* --------- create shapes and translate them away from each other --------- */
    createAllShapes();


    /* --------- add listeners --------- */
    window.addEventListener("keydown", function (event) {
        keyPressed(event);
    });

    window.addEventListener("mousedown", (event) => {
        mouseDownFunction(event)
    });

    window.addEventListener("mousemove", (event) => {
        mouseMoveFunction(event);
    });

    window.addEventListener("mouseup", (event) => {
        mouseUpFunction(event)
    });


    /* --------- start render loop --------- */
    render();
}


let then = 0;
function render(now = 0) {
    /* --------- calculate time per frame in seconds --------- */
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach(shape => {
        /* --------- scale rotation by time difference --------- */
        //shape.rotate(1 * delta, [1, 1, 0]);
        shape.draw();
    });

    requestAnimationFrame(render)
}
