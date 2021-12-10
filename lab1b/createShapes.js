function createAllShapes() {
    shapesStartPos = [
        // cubes
        [-4, 2.5, 0],
        [0, 2.5, 0],
        [4, 2.5, 0],

        [-4, 0, 0],
        [0, 0, 0],
        [4, 0, 0],

        [-4, -2.5, 0],
        [-0, -2.5, 0],
        [4, -2.5, 0]
    ];

    for (let i = 0; i < 9; i++) {
        if (i < 3) {
            shapes.push(createCube());
            shapes[i].translate(shapesStartPos[i])
        }
        else {
            loadOBJFile("/lab1b/sampleModels/teapot.obj").then(value => {
                shapes[i].translate(shapesStartPos[i])
            });
        }
    }
}


function createCube() {
    /* --------- define vertex positions & colors --------- */
    let cubeVertices =
        [ // X, Y, Z
            // Left
            -.5, 0.5, 0.5, 1,
            -.5, -.5, 0.5, 1,
            -.5, 0.5, -.5, 1,
            -.5, 0.5, -.5, 1,
            -.5, -.5, 0.5, 1,
            -.5, -.5, -.5, 1,

            // Right
            0.5, 0.5, -.5, 1,
            0.5, -.5, -.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
            0.5, -.5, -.5, 1,

            // Front
            0.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
            -.5, 0.5, 0.5, 1,
            -.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
            -.5, -.5, 0.5, 1,

            // Back
            -.5, 0.5, -.5, 1,
            -.5, -.5, -.5, 1,
            0.5, 0.5, -.5, 1,
            0.5, 0.5, -.5, 1,
            -.5, -.5, -.5, 1,
            0.5, -.5, -.5, 1,

            // Top
            0.5, 0.5, 0.5, 1,
            0.5, 0.5, -.5, 1,
            -.5, 0.5, 0.5, 1,
            -.5, 0.5, 0.5, 1,
            0.5, 0.5, -.5, 1,
            -.5, 0.5, -.5, 1,

            // Bottom
            0.5, -.5, 0.5, 1,
            0.5, -.5, -.5, 1,
            -.5, -.5, 0.5, 1,
            -.5, -.5, 0.5, 1,
            0.5, -.5, -.5, 1,
            -.5, -.5, -.5, 1,
        ];

    const cubeNormals = [
        // X, Y, Z
        [-1, 0, 0], // left
        [1, 0, 0],  // right
        [0, 0, 1],  // front
        [0, 0, -1], // back
        [0, 1, 0],  // top
        [0, -1, 0], // bottom
    ];

    let cubeNormalsData = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            cubeNormalsData.push(cubeNormals[i]);
        }
    }

    let cubeColors = getUniformColor([0.17, 0.66, 0.37, 1.01], 1, 36);

    /* --------- create shape object and initialize data --------- */
    const cube = new Shape();
    cube.initData(cubeVertices, cubeColors, cubeNormalsData);

    return cube;

}

function getUniformColor(color, faceCount, vertexCount) {
    let colors = [];
    for (let faceNo = 0; faceNo < faceCount; faceNo++) {
        for (let vertexNo = 0; vertexNo < vertexCount; vertexNo++) {
            colors.push(color);
        }
    }
    return colors;
}

function getRandomColors(faceCount, vertexCount) {
    let colors = [];
    for (let faceNo = 0; faceNo < faceCount; faceNo++) {
        let faceColor = randomColor();
        for (let vertexNo = 0; vertexNo < vertexCount; vertexNo++) {
            colors.push(...faceColor);
        }
    }
    return colors;
}

function randomColor() {
    return [Math.random(), Math.random(), Math.random(), 1];
}