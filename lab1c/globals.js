const { mat4, mat3, vec4, vec3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

var gl = null;

var canvas

const shapes = [];

const shaderIds = {
    gouraudVertex: "gouraud-vertex-shader",
    phongVertex: "phong-vertex-shader",
    phongFragment: "phong-fragment-shader",
    normalVertex: "vertex-shader",
    normalFragment: "fragment-shader"
}

const matrices = {
    projection: mat4.create(),
    view: mat4.create()
}

const shaderInfo = {
    attributes: {
        vertexLocation: "vPosition",
        textureLocation: "vTextureCoord",
        normalLocation: "vNormal",
    }, uniforms: {
        modelMatrix: "modelMatrix",
        viewMatrix: "viewMatrix",
        projectionMatrix: "projectionMatrix",
        normalMatrix: "normalMatrix",
        lightPosition: "lightPosition",
        ambientProduct: "ambientProduct",
        diffuseProduct: "diffuseProduct",
        specularProduct: "specularProduct",
        shininess: "shininess",
        sampler: "sampler"
    }

}

let currentProgram = null;

const shaderPrograms = {
    gouraud: null,
    phong: null,
    normal: null
}

var pacman = null;
var maze = null;
