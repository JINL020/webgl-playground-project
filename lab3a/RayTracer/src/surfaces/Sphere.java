package surfaces;

import org.w3c.dom.Node;

import primitives.Vec3;

public class Sphere {
	private float radius;
	private Vec3 position;
	private Material material;

	public Sphere(float radius, Node position, Node material) {
		super();
		this.radius = radius;
		this.position = new Vec3(position);
		this.material = new Material(material);
	}

	@Override
	public String toString() {
		return "Sphere [radius=" + radius + ", position=" + position + ", material=" + material + "]";
	}
}
