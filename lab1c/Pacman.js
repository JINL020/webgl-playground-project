class Pacman {

    constructor() {
        this.head = null;
        this.body = null;
    }

    initHead(head) {
        this.head = head;
    }

    initBody(body) {
        this.body = body;
    }

    draw() {
        this.head.draw();
        this.body.draw();
    }

    /* translate(vector) {
         mat4.translate(this.translationMatrix, this.translationMatrix, vector);
    
         mat4.multiply(this.helper, this.rotationMatrix, this.scaleMatrix);
         mat4.multiply(this.modelMatrix, this.translationMatrix, this.helper);
         //mat4.translate(this.modelMatrix, this.modelMatrix, vector);
     }
    
     rotate(angle, axes) {
         mat4.rotate(this.rotationMatrix, this.rotationMatrix, angle, axes);
    
         mat4.multiply(this.helper, this.rotationMatrix, this.scaleMatrix);
         mat4.multiply(this.modelMatrix, this.translationMatrix, this.helper);
     }
    
     scale(vector) {
         mat4.scale(this.scaleMatrix, this.scaleMatrix, vector);
    
         mat4.multiply(this.helper, this.rotationMatrix, this.scaleMatrix);
         mat4.multiply(this.modelMatrix, this.translationMatrix, this.helper);
     }*/
}
