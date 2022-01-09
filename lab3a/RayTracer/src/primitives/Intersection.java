package primitives;

import material.MaterialSolid;

public class Intersection {
	private Ray ray;
	private Vec3 intersectionPoint;
	private float t;
	private float distance;
	private Vec3 normal;
	private MaterialSolid material;

	public Intersection(Ray ray, Vec3 intersectionPoint, float t, Vec3 normal, MaterialSolid material) {
		this.ray = ray;
		this.intersectionPoint = intersectionPoint;
		this.t = t;
		this.distance = intersectionPoint.length();
		this.normal = normal.normalize();
		this.material = material;
	}

	public Ray getRay() {
		return ray;
	}

	public Vec3 getIntersectionPoint() {
		return intersectionPoint;
	}

	public float getT() {
		return t;
	}

	public float getDistance() {
		return distance;
	}

	public Vec3 getNormal() {
		return normal;
	}

	public MaterialSolid getMaterial() {
		return material;
	}

	@Override
	public String toString() {
		return "Intersection [intersectionPoint=" + intersectionPoint + ", distance=" + distance + ", normal=" + normal
				+ ", material=" + material + "]";
	}

}
