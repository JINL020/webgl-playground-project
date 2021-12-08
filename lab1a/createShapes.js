function createAllShapes() {
    shapesStartPos = [
        // cubes
        [-4, 2.5, 0],
        [0, 2.5, 0],
        [4, 2.5, 0],
        [-4, -2.5, 0],
        [-0, -2.5, 0],
        [4, -2.5, 0],

        //pyramids
        [-4, 0, 0],
        [0, 0, 0],
        [4, 0, 0]
    ];

    for (let i = 0; i < 9; i++) {
        if (i < 3) {
            shapes.push(createCube());
            shapes[i].translate(shapesStartPos[i])
        }
        else {
            loadOBJFile("/sampleModels/teapot.obj").then(value => {
                shapes[i].translate(shapesStartPos[i])
            });
        }
    }
}


function createCube() {
    /* --------- define vertex positions & colors --------- */
    let cubeVertices =
        [ // X, Y, Z
            // Front
            0.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
            -.5, 0.5, 0.5, 1,
            -.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
            -.5, -.5, 0.5, 1,

            // Left
            -.5, 0.5, 0.5, 1,
            -.5, -.5, 0.5, 1,
            -.5, 0.5, -.5, 1,
            -.5, 0.5, -.5, 1,
            -.5, -.5, 0.5, 1,
            -.5, -.5, -.5, 1,

            // Back
            -.5, 0.5, -.5, 1,
            -.5, -.5, -.5, 1,
            0.5, 0.5, -.5, 1,
            0.5, 0.5, -.5, 1,
            -.5, -.5, -.5, 1,
            0.5, -.5, -.5, 1,

            // Right
            0.5, 0.5, -.5, 1,
            0.5, -.5, -.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, -.5, 0.5, 1,
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

    let cubeColors = getColors(1, 36);

    /* --------- create shape object and initialize data --------- */
    const cube = new Shape();
    cube.initData(cubeVertices, cubeColors)

    return cube;

}

function createTetrahedron() {
    /* --------- define vertex positions & colors --------- */
    let tetrahedronVertices =
        // X, Y, Z
        [
            // bottom
            -0.5, 0, 0, 1,
            1, 0, 0, 1,
            0, 0, -1, 1,

            // side 1
            - 0.5, 0, 0, 1,
            1, 0, 0, 1,
            0, 1, -0.5, 1,

            // side 2
            0, 0, -1, 1,
            1, 0, 0, 1,
            0, 1, -0.5, 1,

            // side 3
            - 0.5, 0, 0, 1,
            0, 0, -1, 1,
            0, 1, -0.5, 1,
        ];

    let tetrahedronColors = getColors(4, 3);

    /* --------- create shape object and initialize data --------- */
    const pyramid = new Shape();
    pyramid.initData(tetrahedronVertices, tetrahedronColors)

    return pyramid;

}

function getColors(faceCount, vertexCount) {
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