package primitives;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class Color extends Vec3 {

	public Color(Node node) {
		super(getColorValue(node, "r"), getColorValue(node, "g"), getColorValue(node, "b"));
	}

	public Color(float r, float g, float b) {
		super(checkInRange(r), checkInRange(g), checkInRange(b));
	}

	public Color(Vec3 vec3) {
		super(checkInRange(vec3.getX()), checkInRange(vec3.getY()), checkInRange(vec3.getZ()));
	}

	public java.awt.Color convertToAwtColor() {
		return new java.awt.Color(getX(), getY(), getZ());
	}

	private static float getColorValue(Node node, String value) {
		String res = ((Element) node).getAttribute(value);
		float result = Float.parseFloat(res);
		return result;
	}

	private static float checkInRange(float value) {
		if (value > 1) {
			return 1;
		}
		return value;
	}

	@Override
	public String toString() {
		return super.toString();
	}

}
