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

	@Override
	public String toString() {
		return "ParallelLight [direction=" + direction + "]";
	}

}
