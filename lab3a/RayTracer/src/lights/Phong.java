package lights;

import java.awt.Color;

//<phong ka="1" kd="1" ks="1" exponent="1"/>
//        Specifies the coefficients for the phong illumination model.
//        ka is the ambient component, kd is the diffuse component ks is the specular component
//        and exponent is the lights.Phong cosine power for highlights.

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import primitives.Ray;
import primitives.Vec3;

public class Phong {
	private final float kAmbient;
	private final float kDiffuse;
	private final float kSpecular;
	private final int exponent;

	public Phong(float kAmbient, float kDiffuse, float kSpecular, int exponent) {
		this.kAmbient = kAmbient;
		this.kDiffuse = kDiffuse;
		this.kSpecular = kSpecular;
		this.exponent = exponent;
	}

	public Phong(Node node) {
		String ka = ((Element) node).getAttribute("ka");
		String ks = ((Element) node).getAttribute("ks");
		String kd = ((Element) node).getAttribute("kd");
		String exponent = ((Element) node).getAttribute("exponent");

		this.kAmbient = Float.parseFloat(ka);
		this.kSpecular = Float.parseFloat(ks);
		this.kDiffuse = Float.parseFloat(kd);
		this.exponent = Integer.parseInt(exponent);

	}

	@Override
	public String toString() {
		String string = "Phong{";
		string += "ka=" + kAmbient + ", ";
		string += "kd=" + kDiffuse + ", ";
		string += "ks=" + kSpecular + ", ";
		string += "exponent=" + exponent + "}";

		return string;
	}

	public java.awt.Color calculateLight(Object light, Color color, Ray ray, Vec3 N) {
		float r;
		float g;
		float b;

		if (light instanceof AmbientLight) {
			Color ambientColor = ((AmbientLight) light).getColor();
			r = kAmbient * ambientColor.getX() * color.getX();
			g = kAmbient * ambientColor.getY() * color.getY();
			b = kAmbient * ambientColor.getZ() * color.getZ();

			return new java.awt.Color(r, g, b);
		}

		if (light instanceof ParallelLight) {
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

		return new java.awt.Color(0, 0, 0);
	}

}
