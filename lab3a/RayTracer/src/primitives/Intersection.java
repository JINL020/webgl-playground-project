package primitives;

import surfaces.Material;

public class Intersection {
	private Vec3 intersectionPoint;
	private float distance;
	private Vec3 normal;
	private Material material;

	public Intersection(Vec3 intersectionPoint, Vec3 normal, Material material) {
		this.intersectionPoint = intersectionPoint;
		this.distance = intersectionPoint.length();
		this.normal = normal;
		this.material = material;
	}

	public Vec3 getIntersectionPoint() {
		return intersectionPoint;
	}

	public float getDistance() {
		return distance;
	}

	public Vec3 getNormal() {
		return normal;
	}

	public Material getMaterial() {
		return material;
	}

	@Override
	public String toString() {
		return "Intersection [intersectionPoint=" + intersectionPoint + ", distance=" + distance + ", normal=" + normal
				+ ", material=" + material + "]";
	}

}
