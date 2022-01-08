package camera;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import primitives.Vec3;

public class Camera {
	private Vec3 position;
	private Vec3 lookat;
	private Vec3 up;
	private int horizontalFOV;
	private int horizontalRes;
	private int verticalRes;
	private int maxBounces;

	public Camera(Node position, Node lookat, Node up, Node horizontalFOV, Node resolution, Node maxBounces) {
		this.setPosition(position);
		this.setLookat(lookat);
		this.setUp(up);
		this.setHorizontalFOV(horizontalFOV);
		this.setHorizontalRes(resolution);
		this.setVerticalRes(resolution);
		this.setMaxBounces(maxBounces);
	}

	private void setPosition(Node node) {
		position = new Vec3(node);
	}

	private void setLookat(Node node) {
		lookat = new Vec3(node);
	}

	private void setUp(Node node) {
		up = new Vec3(node);
	}

	private void setHorizontalFOV(Node node) {
		String angle = ((Element) node).getAttribute("angle");
		horizontalFOV = Integer.parseInt(angle);
	}

	private void setHorizontalRes(Node node) {
		String horizontal = ((Element) node).getAttribute("horizontal");
		horizontalRes = Integer.parseInt(horizontal);
	}

	private void setVerticalRes(Node node) {
		String vertical = ((Element) node).getAttribute("vertical");
		verticalRes = Integer.parseInt(vertical);
	}

	private void setMaxBounces(Node node) {
		String vertical = ((Element) node).getAttribute("n");
		maxBounces = Integer.parseInt(vertical);
	}

	public Vec3 getPosition() {
		return position;
	}

	public int getHorizontalFOV() {
		return horizontalFOV;
	}

	public int getHorizontalRes() {
		return horizontalRes;
	}

	public int getVerticalRes() {
		return verticalRes;
	}

	@Override
	public String toString() {
		return "[position=" + position + ", lookat=" + lookat + ", up=" + up + ", horizontalFOV=" + horizontalFOV
				+ ", horizontalRes=" + horizontalRes + ", verticalRes=" + verticalRes + ", maxBounces=" + maxBounces
				+ "]";
	}

}
