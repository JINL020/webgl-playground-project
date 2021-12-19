/* --------- main --------- */
window.onload = async function main() {

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
    mat4.lookAt(matrices.view, COP, [0, 0, 0], [0, 1, 0]);

    /* --------- create shaders --------- */
    shaderPrograms.phong = new ShaderProgram(shaderIds.phongVertex, shaderIds.phongFragment, shaderInfo);
    shaderPrograms.normal = new ShaderProgram(shaderIds.normalVertex, shaderIds.normalFragment, shaderInfo);

    shaderPrograms.phong.enable();


    /* --------- create shapes --------- */
    pacman = new Pacman();

    const result = await Promise.all([
        loadOBJFile("/lab1c/assets/pacman0.obj"),
        loadOBJFile("/lab1c/assets/pacman1.obj"),
        loadOBJFile("/lab1c/assets/pacman2.obj"),
        loadOBJFile("/lab1c/assets/pacman3.obj")
    ]);

    pacman.initData(result);
    //render();


    loadOBJFile("/lab1c/assets/maze.obj").then(obj => {
        maze = obj;
        maze.translate([0, -1, 0]);
        render();
    })



    /* --------- add listeners --------- */
    window.addEventListener("keydown", function (event) {
        keyPressed(event);
    });
}

var then = Date.now();
var chewingTimer = 0;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let now = Date.now()
    let deltaTime = (now - then) * 0.001;
    then = now;

    chewingTimer += deltaTime;

    if (chewingTimer >= 0.15) {
        chewingTimer = 0;
        pacman.updateChewingAnimation();;
    }

    pacman.draw();
    maze.draw();

    requestAnimationFrame(render);
}