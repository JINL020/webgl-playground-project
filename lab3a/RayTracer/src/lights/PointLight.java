package lights;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import material.MaterialSolid;
import primitives.Color;
import primitives.Intersection;
import primitives.Vec3;

public class PointLight extends Light {
	private Vec3 position;

	public PointLight(Node lightNode) {
		super(lightNode);
		Element element = (Element) lightNode;
		this.position = new Vec3(element.getElementsByTagName("position").item(0));
	}

	@Override
	public String toString() {
		return "PointLight [position=" + position + "]";
	}

	public Color calcLight(Intersection intersection) {
		MaterialSolid material = intersection.getMaterial();
		Color lightColor = this.getColor();
		Color materialColor = material.getColor();
		Phong phong = material.getPhong();
		float kDifusse = phong.getkDiffuse();
		float kSpecular = phong.getkSpecular();
		float exponent = phong.getExponent();

		Vec3 L = position.substract(intersection.getIntersectionPoint()).normalize();// lightVector: P to
																						// point light source
		Vec3 N = intersection.getNormal().normalize(); // normalVector: normal vector to the plane/surface
		Vec3 R = N.multiply(2 * N.dot(L)).substract(L).normalize();
		Vec3 V = intersection.getRay().getDirection().normalize().reverse(); // P to eye (view point) or
																				// center of projection

		float diffuse = (kDifusse * (float) Math.max(L.dot(N), 0.0));

		float diffuseR = diffuse * lightColor.getX() * materialColor.getX();
		float diffuseG = diffuse * lightColor.getY() * materialColor.getY();
		float diffuseB = diffuse * lightColor.getZ() * materialColor.getZ();

		float specular = kSpecular * (float) Math.pow(Math.max(V.dot(R), 0.0), exponent);

		if (L.dot(N) < 0.0) {
			specular = 0;
		}

		float specularR = specular * lightColor.getX();
		float specularG = specular * lightColor.getY();
		float specularB = specular * lightColor.getZ();

		float r = diffuseR + specularR;
		float g = diffuseG + specularG;
		float b = diffuseB + specularB;

		return new Color(r, g, b);
	}

}
