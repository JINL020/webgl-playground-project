package raytracer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import camera.Camera;
import lights.AmbientLight;
import lights.Light;
import lights.ParallelLight;
import primitives.Color;
import primitives.Intersection;
import primitives.Pixel;
import primitives.Ray;
import primitives.Vec3;
import surfaces.Sphere;

public class Raytracer {
	private final Color backgroundColor;
	private final Camera camera;
	private final List<Sphere> spheres;
	private final List<Light> lights;
	private int height;
	private int width;

	public Raytracer(Color backgroundColor, Camera camera, List<Sphere> spheres, List<Light> lights) {
		this.backgroundColor = backgroundColor;
		this.camera = camera;
		this.spheres = spheres;
		this.lights = lights;
		this.height = camera.getVerticalRes();
		this.width = camera.getHorizontalRes();
	}

	public Map<Pixel, Color> getColorMap() {
		Map<Pixel, Color> colorMap = new HashMap<>();

		for (int y = 0; y < height; y++)
			for (int x = 0; x < width; x++) {
				Pixel pixel = new Pixel(x, y);
				Ray ray = getRaytoPixel(x, y);
				Color color = traceRay(ray, 0);
				// System.out.println(pixel);
				// System.out.println(ray);
				// System.out.println(color);
				colorMap.put(pixel, color);
			}
		return colorMap;
	}

	private Ray getRaytoPixel(int i, int j) {
		Vec3 cameraPos = camera.getPosition();

		float x = (float) (mapToImagePlane(normalizeX(i)) * Math.tan(getFOVX()));
		float y = (float) (mapToImagePlane(normalizeY(j)) * Math.tan(getFOVY()));
		Vec3 direction = new Vec3(x, y, -1);

		Ray ray = new Ray(cameraPos, direction);

		return ray;
	}

	private Color traceRay(Ray ray, int maxBounce) {
		/*
		 * if (maxBounce == 8) return new Color(0, 0, 0);
		 */
		Color color = new Color(0, 0, 0);
		Intersection clostestIntersection = null;

		boolean first = true;
		for (Sphere sphere : spheres) {
			Intersection intersection = getRaySphereIntersection(ray, sphere);
			if (intersection != null) {
				if (first) {
					clostestIntersection = intersection;
					first = false;
				}
				if (intersection.getDistance() < clostestIntersection.getDistance()) {
					clostestIntersection = intersection;
				}
			}
		}

		if (clostestIntersection != null) {
			color = calculateColor(ray, clostestIntersection);
		} else {
			color = backgroundColor;
		}
		return color;
	}

	private Intersection getRaySphereIntersection(Ray ray, Sphere sphere) {
		Intersection intersection = null;

		Vec3 o = ray.getPosition();
		Vec3 d = ray.getDirection();
		Vec3 C = sphere.getPosition();
		float R = sphere.getRadius();

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

			intersection = new Intersection(intersectionPoint, normal, sphere.getMaterial());
		}

		if (discriminant > 0) {
			float t1 = (float) ((-d.dot(oSubstractC) - Math.sqrt(discriminant)) / d.square());
			float t2 = (float) ((-d.dot(oSubstractC) + Math.sqrt(discriminant)) / d.square());

			float t = Math.min(t1, t2);

			Vec3 intersectionPoint = o.add(d.multiply(t));
			Vec3 normal = intersectionPoint.substract(C);

			intersection = new Intersection(intersectionPoint, normal, sphere.getMaterial());
		}

		return intersection;
	}

	private Color calculateColor(Ray ray, Intersection intersection) {
		Color illumination = new Color(0, 0, 0);

		for (Light light : lights) {
			Color color = null;

			if (light instanceof AmbientLight) {
				color = ((AmbientLight) light).calcLight(intersection.getMaterial());
			}

			if (light instanceof ParallelLight) {
				// color = ((ParallelLight) light).calcLight();
			}

			if (color != null) {
				// System.out.println(color);
				illumination = new Color(illumination.add(color));
			}
		}

		return illumination;
	}

	private float normalizeX(int u) {
		float x_new = (float) (u + 0.5) / this.width;
		return x_new;
	}

	private float normalizeY(float v) {
		float y_new = (float) (v + 0.5) / this.height;
		return y_new;
	}

	private float mapToImagePlane(float coordinate) {
		float coordinate_new = 2 * coordinate - 1;
		return coordinate_new;
	}

	private float getFOVX() {
		return (float) Math.toRadians(camera.getHorizontalFOV());
	}

	private float getFOVY() {
		return getFOVX() * (height / width);
	}

}
