
package material;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import primitives.Color;

public class MaterialSolid extends Material {
	private Color color;

	public MaterialSolid(Node node) {
		super(node);

		Element element = (Element) node;
		Node color = element.getElementsByTagName("color").item(0);
		if (color != null) {
			setColor(color);
		}
	}

	public Color getColor() {
		return color;
	}

	private void setColor(Node node) {
		color = new Color(node);
	}

}
