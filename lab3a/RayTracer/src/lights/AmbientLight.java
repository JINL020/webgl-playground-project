package lights;

import org.w3c.dom.Node;

public class AmbientLight extends Light {

	public AmbientLight(Node lightNode) {
		super(lightNode);
	}

	@Override
	public String toString() {
		return "AmbientLight: " + super.toString();
	}

}
