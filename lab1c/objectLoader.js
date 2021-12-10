// 1 means first vertex but index start with 0 so we just add an element so 1 means vertex at index 1 
var objVertices = [[0, 0, 0,]];
var objTextures = [[0, 0, 0,]];
var objNormals = [[0, 0, 0,]];

var arrayVertices = [];
var arrayTextures = [];
var arrayNormals = [];

async function loadOBJFile(filename) {
    const resource = await fetch(filename);
    const text = await resource.text();

    clearPreviousData();

    parseOBJfile(text);

    const object = getObj();
    return object;
}

function parseOBJfile(text) {
    var lines = text.split('\n');

    lines.forEach(line => {
        let vertex = [];
        let texture = [];
        let normal = [];

        line.trim();
        if (line === '' || line.startsWith('#')) {
        }
        else if (line.startsWith('vt')) {
            line
                .replace('vt', '')
                .trim()
                .split(' ')
                .forEach(element => texture.push(parseFloat(element)));
            objTextures.push(texture);
        }
        else if (line.startsWith('vn')) {
            line
                .replace('vn', '')
                .trim()
                .split(' ')
                .forEach(element => normal.push(parseFloat(element)));
            objNormals.push(normal);
        }
        else if (line.startsWith('v')) {
            line
                .replace('v', '')
                .trim()
                .split(' ')
                .forEach(element => vertex.push(parseFloat(element)));
            vertex.push(1.0);
            objVertices.push(vertex);
        }
        else if (line.startsWith('f')) {
            let currentLine = line.split(" ");

            let vertex1 = [];
            currentLine[1].split("/").forEach(element => vertex1.push(parseInt(element)));

            let vertex2 = [];
            currentLine[2].split("/").forEach(element => vertex2.push(parseInt(element)));

            let vertex3 = [];
            currentLine[3].split("/").forEach(element => vertex3.push(parseInt(element)));

            processVertex(vertex1);
            processVertex(vertex2);
            processVertex(vertex3);
        }
    });
}

function processVertex(vertexData) {
    arrayVertices.push(objVertices[vertexData[0]]);
    arrayTextures.push(objTextures[vertexData[1]]);
    arrayNormals.push(objNormals[vertexData[2]]);
}

function getObj() {
    let objColor = getUniformColor([0.17, 0.66, 0.37, 1.01], arrayVertices.length / 3, 3);

    const obj = new Shape();
    obj.initData(arrayVertices, objColor, arrayNormals);

    return obj;
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

function clearPreviousData() {
    objVertices = [[0, 0, 0,]];
    objTextures = [[0, 0, 0,]];
    objNormals = [[0, 0, 0,]];

    arrayVertices = [];
    arrayTextures = [];
    arrayNormals = [];
}