package lights;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import primitives.Color;

public abstract class Light {
	private Color color;

	public Light(Node node) {
		Element element = (Element) node;
		Node color = element.getElementsByTagName("color").item(0);
		this.color = new Color(color);
	}

	public Color getColor() {
		return color;
	}

	@Override
	public String toString() {
		return "[color=" + color + "]";
	}

}
