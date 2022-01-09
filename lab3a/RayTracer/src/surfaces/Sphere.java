package surfaces;

import org.w3c.dom.Node;

import material.MaterialSolid;
import primitives.Intersection;
import primitives.Ray;
import primitives.Vec3;

public class Sphere {
	private float radius;
	private Vec3 position;
	private MaterialSolid material;

	public Sphere(float radius, Node position, Node material) {
		this.radius = radius;
		this.position = new Vec3(position);
		this.material = new MaterialSolid(material);
	}

	public Intersection getIntersection(Ray ray) {
		Intersection intersection = null;

		Vec3 o = ray.getPosition();
		Vec3 d = ray.getDirection();
		Vec3 C = this.position;
		float R = this.radius;

		Vec3 oSubstractC = o.substract(C);

		/*
		 * float a = d.square(); float b = d.multiply(2).dot(oSubstractC); float c =
		 * oSubstractC.square() - R * R;
		 * 
		 * float discr = b * b - 4 * a * c;
		 */
		float discriminant = (d.dot(oSubstractC) * d.dot(oSubstractC)) - d.square() * (oSubstractC.square() - (R * R));

		if (discriminant == 0) {
			float t = -d.dot(oSubstractC) / d.square();

			Vec3 intersectionPoint = o.add(d.multiply(t));
			Vec3 normal = intersectionPoint.substract(C);

			intersection = new Intersection(ray, intersectionPoint, t, normal, this.material);
		}

		if (discriminant > 0) {
			float t1 = (float) ((-d.dot(oSubstractC) - Math.sqrt(discriminant)) / d.square());
			float t2 = (float) ((-d.dot(oSubstractC) + Math.sqrt(discriminant)) / d.square());

			float t = Math.min(t1, t2);

			Vec3 intersectionPoint = o.add(d.multiply(t));
			Vec3 normal = getNormal(intersectionPoint);

			intersection = new Intersection(ray, intersectionPoint, t, normal, this.material);
		}

		return intersection;
	}

	private Vec3 getNormal(Vec3 intersectionPoint) {
		return intersectionPoint.substract(this.position).normalize();
	}

	@Override
	public String toString() {
		return "Sphere [radius=" + radius + ", position=" + position + ", material=" + material + "]";
	}

}
