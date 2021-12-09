/* --------- simple example of loading external files --------- */
// 1 element is already inside "objVertices" because vertex 1 means first vertex but index starts at 0 
var objVertices = [[0, 0, 0,]];
var objNormals = [[0, 0, 0,]];
var objTextures = [[0, 0, 0,]];

var arrayVertices = [];
var arrayNormals = [];
var arrayTextures = [];

var objVertexNormals = [];
var objFaces = [];

async function loadOBJFile(filename) {
    const resource = await fetch(filename);
    const text = await resource.text();
    parseOBJfile(text);
    const object = getObj();
    shapes.push(object);
}

function parseOBJfile(text) {
    var lines = text.split('\n');

    for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
        let vertex = [];
        let vertexNormal = [];
        let face = [];

        const line = lines[lineNo].trim();
        if (line === '' || line.startsWith('#')) {
            continue;
        }
        if (line.startsWith('vn')) {
            line
                .replace('vn', '')
                .trim()
                .split(' ')
                .forEach(element => vertexNormal.push(parseFloat(element)));
            objNormals.push(vertexNormal);
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
            line
                .replace('f', '')
                .trim()
                .split(' ')
                .forEach(element => {
                    let helper = element.replace(/[\/][\/]/, " ").split(' ');
                    face.push(parseFloat(helper[0]));
                    objVertexNormals.push(parseInt(helper[1]));
                });
            //console.log(face);
            objFaces.push(face);
        }
    }
    //console.log(objVertices);
    //console.log(objFaces);
    //console.log(objNormals);
    //console.log(objVertexNormals);
}

function getBufferVertices() {
    let vertexToSend = [];
    for (let faceNo = 0; faceNo < objFaces.length; faceNo++) {
        for (let i = 0; i < 3; i++) {
            let face = objFaces[faceNo];
            let vertexNo = face[i];
            let vertex = objVertices[vertexNo];
            vertexToSend.push(vertex);
        }
    }
    //console.log(vertexToSend);
    return vertexToSend.flat();
}

function getBufferVertexNormals() {
    let vertexNormalsToSend = [];
    objVertexNormals.forEach(normalNo => {
        vertexNormalsToSend.push(objNormals[normalNo]);
    });
    //console.log(vertexNormalsToSend);
    return vertexNormalsToSend;
}

function getObj() {
    let bufferVertices = getBufferVertices();
    //console.log(bufferVertices);

    let objColor = getUniformColor([0.17, 0.66, 0.37, 1.01], objFaces.length, 3);

    let objNormals = getBufferVertexNormals();

    const obj = new Shape();
    obj.initData(bufferVertices, objColor, objNormals);

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