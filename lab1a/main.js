const { mat4, vec4, vec3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
var canvas
var gl;

const locations = {
    attributes: {
        vertexLocation: null,
        colorLocation: null
    },
    uniforms: {
        modelMatrix: null,
        projectionMatrix: null,
        viewMatrix: null
    }
}


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
    gl.clearColor(0.75, 0.85, 0.8, 1.0);// Canvas background color
    gl.enable(gl.DEPTH_TEST);


    /* --------- create shaders --------- */
    var program = createShaderProgram("vertexShader", "fragmentShader");
    gl.useProgram(program);


    /* --------- save attribut locations --------- */
    locations.attributes.vertexLocation = gl.getAttribLocation(program, 'vertexPosition');
    locations.attributes.colorLocation = gl.getAttribLocation(program, 'vertexColor');


    /* --------- save uniform location + create & send model matrix --------- */
    locations.uniforms.modelMatrix = gl.getUniformLocation(program, 'modelMatrix'); // Model to World
    let modelMatrix = mat4.create();
    gl.uniformMatrix4fv(locations.uniforms.modelMatrix, gl.FALSE, modelMatrix);


    /* --------- save uniform location + create & send view matrix --------- */
    locations.uniforms.viewMatrix = gl.getUniformLocation(program, "viewMatrix"); // World to View
    let viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(locations.uniforms.viewMatrix, gl.FALSE, viewMatrix);


    /* --------- save uniform location + create & send  projection matrix --------- */
    locations.uniforms.projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");  // View to Projection
    let projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);// vertical field-of-view, aspect W/H, near cull distance, far cull distance
    gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, gl.FALSE, projectionMatrix);


    /* --------- create 6 cubes and 3 pyramids and translate them away from each other --------- */
    createAllShapes();


    /* --------- add listeners --------- */
    window.addEventListener("keydown", function (event) {
        keyPressed(event);
        mat4.lookAt(viewMatrix, [0, 0, 15], [viewTranslation[0], viewTranslation[1], 0], [0, 1, 0, 1]);
        gl.uniformMatrix4fv(locations.uniforms.viewMatrix, gl.FALSE, viewMatrix);
    });

    window.addEventListener("mousedown", (event) => {
        mouseDownFunction(event)
    });

    window.addEventListener("mousemove", (event) => {
        mouseMoveFunction(event);
        mat4.lookAt(viewMatrix, [0, 0, 15], [viewTranslation[0], viewTranslation[1], 0], [0, 1, 0]);
        gl.uniformMatrix4fv(locations.uniforms.viewMatrix, gl.FALSE, viewMatrix);
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
