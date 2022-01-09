package lights;

import org.w3c.dom.Node;

import material.MaterialSolid;
import primitives.Color;

public class AmbientLight extends Light {

	public AmbientLight(Node lightNode) {
		super(lightNode);
	}

	public Color calcLight(MaterialSolid material) {
		Color ambientColor = this.getColor();
		Color materialColor = material.getColor();
		Phong phong = material.getPhong();
		float kAmbient = phong.getkAmbient();

		float r = kAmbient * ambientColor.getX() * materialColor.getX();
		float g = kAmbient * ambientColor.getY() * materialColor.getY();
		float b = kAmbient * ambientColor.getZ() * materialColor.getZ();

		return new Color(r, g, b);
	}

	@Override
	public String toString() {
		return "AmbientLight: " + super.toString();
	}

}
