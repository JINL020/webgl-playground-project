class ShaderProgram {
  constructor(vShaderId, fShaderId, shaderInfo) {
    // Create shader program using the provided vertex and fragment shader ids
    createTexture("/lab1c/assets/textures/pacman_game_colors.png");

    this.program = createShaderProgram(vShaderId, fShaderId);
    gl.useProgram(this.program);

    this.attributes = {};
    this.uniforms = {};

    // Extract attribute and uniform information from the shaderInfo object
    // and look up their locations
    Object.entries(shaderInfo.attributes).forEach(([key, value]) => {
      this.attributes[key] = gl.getAttribLocation(this.program, value);
    });

    Object.entries(shaderInfo.uniforms).forEach(([key, value]) => {
      this.uniforms[key] = gl.getUniformLocation(this.program, value);
    });
  }

  enable() {
    currentProgram = this;
    gl.useProgram(this.program);

    // Send projection and view matrix
    // You might want to send the view matrix at a different location in your application
    gl.uniformMatrix4fv(this.uniforms.viewMatrix, gl.FALSE, matrices.view);
    gl.uniformMatrix4fv(
      this.uniforms.projectionMatrix,
      gl.FALSE,
      matrices.projection
    );
    setUpLight();
  }
}

function createTexture(path) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  var image = new Image();
  image.src = path;
  image.addEventListener("load", function () {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
}

function createShaderProgram(vShaderId, fShaderId) {
  const vShader = loadShader(vShaderId, gl.VERTEX_SHADER);
  const fShader = loadShader(fShaderId, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();

  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error while linking program", gl.getProgramInfoLog(program));
    return false;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
    return false;
  }

  return program;
}

function loadShader(shaderId, shaderType) {
  const shader = gl.createShader(shaderType);

  gl.shaderSource(shader, document.getElementById(shaderId).text);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error while compiling shader", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
