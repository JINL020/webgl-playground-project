var axisVertices =
    [
        // x- axis
        2, 0, 0, 1,
        -2, 0, 0, 1,

        // y- axis
        0, 2, 0, 1,
        0, -2, 0, 1,

        // z-axis

        0, 0, 2, 1,
        0, 0, -2, 1,
    ];

var colors = [[1, 0, 0, 1], [0, 1, 0, 1,], [0, 0, 1, 1,]];
var axisColors = [];
colors.forEach(color => {
    for (let i = 0; i < 2; i++) {
        axisColors.push(color);
    }
});

class Shape {

    constructor() {
        this.vertices = [];
        this.colors = [];
        this.buffers = {
            /* --------- initialize buffers --------- */
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
        }
        /* --------- initialize transformation matrix --------- */
        this.modelMatrix = mat4.create();
        this.translationMatrix = mat4.create();
        this.normalMatrix = mat3.create();

        this.rotationMatrix = mat4.create();
        this.scaleMatrix = mat4.create();
        this.helper = mat4.create();


        this.axisOn = false;
    }

    setAxisOn(mode) {
        this.axisOn = mode;
    }

    initData(vertices, colors, normals) {
        /* --------- add axis --------- */
        axisVertices.forEach(vertex => {
            vertices.push(vertex);
        })

        axisColors.forEach(color => {
            colors.push(color);
        })


        /* --------- flatten & convert to 32 bit float arrays --------- */
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());
        this.normals = new Float32Array(normals.flat());


        /* --------- send data to buffers --------- */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }

    draw() {
        /* --------- set up attribute arrays --------- */
        Shape.setupAttribute(this.buffers.vertexBuffer, currentProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentProgram.attributes.colorLocation);
        Shape.setupAttribute(this.buffers.normalBuffer, currentProgram.attributes.normalLocation, true);

        /* --------- send transformation matrix --------- */
        gl.uniformMatrix4fv(currentProgram.uniforms.modelMatrix, gl.FALSE, this.modelMatrix);

        mat3.normalFromMat4(this.normalMatrix, this.modelMatrix);
        gl.uniformMatrix3fv(currentProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);

        /* --------- draw the shape --------- */
        gl.drawArrays(gl.TRIANGLES, 0, (this.vertices.length / 4) - 6);

        if (this.axisOn) {
            gl.drawArrays(gl.LINES, (this.vertices.length / 4) - 6, 6);
        }
    }

    translate(vector) {
        mat4.translate(this.translationMatrix, this.translationMatrix, vector);
        this.updateModelMatrix();
    }

    rotate(angle, axes) {
        mat4.rotate(this.rotationMatrix, this.rotationMatrix, angle, axes);
        this.updateModelMatrix();
    }

    scale(vector) {
        mat4.scale(this.scaleMatrix, this.scaleMatrix, vector);
        this.updateModelMatrix();
    }

    updateModelMatrix() {
        this.modelMatrix = mat4.create();
        mat4.multiply(this.modelMatrix, this.rotationMatrix, this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.scaleMatrix, this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.translationMatrix, this.modelMatrix);
    }

    static setupAttribute(buffer, location, isNormal = false) {
        if (location === -1)
            return;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // The location of the attribute
            isNormal ? 3 : 4, // How many elements does each vertex consist of?
            gl.FLOAT, // Datatype of the attribute
            gl.FALSE, // Is our data normalized?
            (isNormal ? 3 : 4) * Float32Array.BYTES_PER_ELEMENT, // size for one vertex
            0 // Offset from the begin of the vertex to the attribute start
        );

        gl.enableVertexAttribArray(location);
    }
}
