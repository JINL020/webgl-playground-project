package lights;

//        Specifies the coefficients for the phong illumination model.
//        ka is the ambient component, kd is the diffuse component ks is the specular component
//        and exponent is the lights.Phong cosine power for highlights.

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class Phong {
	private final float kAmbient;
	private final float kDiffuse;
	private final float kSpecular;
	private final int exponent;

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
		return "Phong [kAmbient=" + kAmbient + ", kDiffuse=" + kDiffuse + ", kSpecular=" + kSpecular + ", exponent="
				+ exponent + "]";
	}
}
