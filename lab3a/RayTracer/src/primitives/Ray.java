package primitives;

public class Ray {
	Vec3 position;
	Vec3 direction;

	public Ray(Vec3 position, Vec3 direction) {
		this.position = position;
		this.direction = direction;
	}
}
