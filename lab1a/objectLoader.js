/* --------- simple example of loading external files --------- */
// 1 element is already inside "objVertices" because vertex 1 means first vertex but index starts at 0 
var objVertices = [[0, 0, 0,]];
var objNormals = [[0, 0, 0,]];

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
            vertexNormal.push(1.0);
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
    //console.log(vertexToSend);
    return vertexNormalsToSend;
}

function getObj() {
    let bufferVertices = getBufferVertices();
    //console.log(bufferVertices);

    var objColor = [];
    let faceColor = randomColor();
    for (let face = 0; face < objFaces.length; face++) {
        for (let vertex = 0; vertex < 3; vertex++) {
            objColor.push(...faceColor);
        }
    }
    // console.log(objColor);

    const obj = new Shape();
    obj.initData(bufferVertices, objColor);

    return obj;

}