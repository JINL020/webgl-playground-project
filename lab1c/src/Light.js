var lightPosition = [0.0, 15.0, 15];

var ambientLight = [1.0, 1.0, 1.0, 1.0];
var diffuseLight = [1.0, 1.0, 1.0, 1.0];
var specularLight = [1.0, 1.0, 1.0, 1.0];

var ambientMaterial = [1.0, 1.0, 1.0, 1.0];
var diffuseMaterial = [1.0, 0.8, 0.0, 1.0];
var specularMaterial = [1.0, 0.8, 0.0, 1.0];

var shininess = 100.0;

var ambientProduct = vec4.create();
var specularProduct = vec4.create();
var diffuseProduct = vec4.create();

function setUpLight() {
    setUpLightPosition();
    setUpAmbientProduct();
    setUpDiffuseProduct();
    setUpSpecularProduct();
    setUpShininess();
}

function setUpLightPosition() {
    gl.uniform3fv(currentProgram.uniforms.lightPosition, lightPosition);
}

function setUpAmbientProduct() {
    vec4.multiply(ambientProduct, ambientLight, ambientMaterial);
    gl.uniform4fv(currentProgram.uniforms.ambientProduct, ambientProduct);
}

function setUpDiffuseProduct() {
    vec4.multiply(diffuseProduct, diffuseLight, diffuseMaterial);
    gl.uniform4fv(currentProgram.uniforms.diffuseProduct, diffuseProduct);
}

function setUpSpecularProduct() {
    vec4.multiply(specularProduct, specularLight, specularMaterial);
    gl.uniform4fv(currentProgram.uniforms.specularProduct, specularProduct);
}

function setUpShininess() {
    gl.uniform1f(currentProgram.uniforms.shininess, shininess);
}