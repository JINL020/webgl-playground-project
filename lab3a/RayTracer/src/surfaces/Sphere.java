package surfaces;

import primitives.Vec3;

public class Sphere {
	private float radius;
	private Vec3 position;
	private Material material;

	public Sphere(float radius, Vec3 position, Material material) {
		super();
		this.radius = radius;
		this.position = position;
		this.material = material;
	}
}
