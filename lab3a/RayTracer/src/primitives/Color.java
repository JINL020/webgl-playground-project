package primitives;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class Color extends Vec3 {

	public Color(Node node) {
		super(getColorValue(node, "r"), getColorValue(node, "g"), getColorValue(node, "b"));
	}

	private static float getColorValue(Node node, String value) {
		String res = ((Element) node).getAttribute(value);
		float result = Float.parseFloat(res);
		return result;
	}

	public java.awt.Color convertToAwtColor() {
		return new java.awt.Color(getX(), getY(), getZ());
	}

	@Override
	public String toString() {
		return super.toString();
	}

}
