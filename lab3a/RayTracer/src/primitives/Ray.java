package primitives;

public class Ray {
	Vec3 position;
	Vec3 direction;
	// int minDistance;
	// int maxDistance;

	public Ray(Vec3 position, Vec3 direction) {
		this.position = position;
		this.direction = direction;
	}

	public Vec3 getPosition() {
		return position;
	}

	public Vec3 getDirection() {
		return direction;
	}

	/*
	 * public boolean castShadow() {
	 * 
	 * }
	 */

	@Override
	public String toString() {
		return "Ray [position=" + position + ", direction=" + direction + "]";
	}
}
