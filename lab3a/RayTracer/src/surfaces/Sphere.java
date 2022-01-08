package surfaces;

import org.w3c.dom.Node;

import primitives.Vec3;

public class Sphere {
	private float radius;
	private Vec3 position;
	private Material material;

	public Sphere(float radius, Node position, Node material) {
		this.radius = radius;
		this.position = new Vec3(position);
		this.material = new Material(material);
	}

	public float getRadius() {
		return radius;
	}

	public Vec3 getPosition() {
		return position;
	}

	public Material getMaterial() {
		return material;
	}

	@Override
	public String toString() {
		return "Sphere [radius=" + radius + ", position=" + position + ", material=" + material + "]";
	}

}
