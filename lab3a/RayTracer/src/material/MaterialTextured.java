package material;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class MaterialTextured extends MaterialSolid {
	private String name;
	// private image;

	public MaterialTextured(Node node) {
		super(node);
		setName(node);

	}

	private void setName(Node node) {
		Element element = (Element) node;
		Node texture = element.getElementsByTagName("texture").item(0);
		String name = ((Element) texture).getAttribute("name");
		if (name != null) {
			this.name = name;
		}
	}

}
