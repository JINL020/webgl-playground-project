package lights;

import java.awt.Color;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public abstract class Light {
	private Color color;

	public Light(Node node) {
		Node child = node.getFirstChild();
		child = child.getNextSibling();

		String r = ((Element) child).getAttribute("r");
		String g = ((Element) child).getAttribute("g");
		String b = ((Element) child).getAttribute("b");

		color = new Color(Float.parseFloat(r), Float.parseFloat(g), Float.parseFloat(b));
	}

	public Color getColor() {
		return color;
	}

	@Override
	public String toString() {
		return "Light [color=" + color + "]";
	}

}
