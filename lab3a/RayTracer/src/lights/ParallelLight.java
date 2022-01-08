package lights;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import primitives.Vec3;

public class ParallelLight extends Light {
	private Vec3 direction;

	public ParallelLight(Node lightNode) {
		super(lightNode);
		Element element = (Element) lightNode;
		this.direction = new Vec3(element.getElementsByTagName("direction").item(0));
	}

	public Color calcLight() {
		Color lightColor = ((ParallelLight) light).getColor();

		Vec3 L = ((ParallelLight) light).getDirection().normalize().multiply(-1F);
		Vec3 E = ray.getDirection().multiply(-1F).normalize();

		float NL2 = 2 * Vec3.dot(N, L);
		Vec3 R = Vec3.substract(L, N.multiply(NL2));
		R = R.multiply(-1F).normalize();

		float diffuse = kDiffuse * (float) Math.max(0.0, Vec3.dot(L, N));
		float diffuseR = diffuse * lightColor.getX() * color.getX();
		float diffuseG = diffuse * lightColor.getY() * color.getY();
		float diffuseB = diffuse * lightColor.getZ() * color.getZ();

		float specular = kSpecular * (float) Math.pow(Math.max(Vec3.dot(E, R), 0.0), exponent);
		float specularR = specular * lightColor.getX();
		float specularG = specular * lightColor.getY();
		float specularB = specular * lightColor.getZ();

		r = diffuseR + specularR;
		g = diffuseG + specularG;
		b = diffuseB + specularB;

		if (r > 1)
			r = 1;
		if (g > 1)
			g = 1;
		if (b > 1)
			b = 1;

		return new java.awt.Color(r, g, b);
	}

	@Override
	public String toString() {
		return "ParallelLight [direction=" + direction + "]";
	}

}
