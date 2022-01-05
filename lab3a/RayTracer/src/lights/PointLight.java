package lights;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

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

}
