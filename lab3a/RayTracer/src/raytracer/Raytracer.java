package raytracer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import camera.Camera;
import lights.AmbientLight;
import lights.Light;
import lights.ParallelLight;
import lights.PointLight;
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
				Color color = traceRay(ray);
				colorMap.put(pixel, color);
				// System.out.println(pixel);
				// System.out.println(ray);
				// System.out.println(color);
			}
		return colorMap;
	}

	private Ray getRaytoPixel(int i, int j) {
		Vec3 cameraPos = camera.getPosition();

		float x = (float) (mapToImagePlane(normalizeX(i)) * Math.tan(getFOVX()));
		float y = (float) (-1 * mapToImagePlane(normalizeY(j)) * Math.tan(getFOVY()));
		Vec3 direction = new Vec3(x, y, -1);

		Ray ray = new Ray(cameraPos, direction);

		return ray;
	}

	private Color traceRay(Ray ray) {
		/*
		 * if (maxBounce == 8) return new Color(0, 0, 0);
		 */
		Color color = new Color(0, 0, 0);

		Intersection clostestIntersection = null;

		for (Sphere sphere : spheres) {
			Intersection intersection = sphere.getIntersection(ray);
			if (intersection != null) {
				if (clostestIntersection == null) {
					clostestIntersection = intersection;
				}
				if (intersection.getDistance() < clostestIntersection.getDistance()) {
					clostestIntersection = intersection;
				}
			}
		}

		if (clostestIntersection != null) {
			color = calculateColor(clostestIntersection);
		} else {
			color = backgroundColor;
		}
		return color;
	}

	private Color calculateColor(Intersection intersection) {
		Color illumination = new Color(0, 0, 0);

		for (Light light : lights) {
			Color color = null;
			boolean isInShadow = castShadowRay(intersection, light);
			if (!isInShadow) {
				if (light instanceof AmbientLight) {
					color = ((AmbientLight) light).calcLight(intersection.getMaterial());
				}
				if (light instanceof ParallelLight) {
					color = ((ParallelLight) light).calcLight(intersection);
				}
				if (light instanceof PointLight) {
					color = ((PointLight) light).calcLight(intersection);
				}
			}
			if (color != null) {
				illumination = new Color(illumination.add(color));
			}
		}

		return illumination;
	}

	private boolean castShadowRay(Intersection intersection, Light light) {
		if (light instanceof ParallelLight) {
			Vec3 L = ((ParallelLight) light).getDirection().normalize().reverse();
			Vec3 intersectionPoint = intersection.getIntersectionPoint().move(0.00004F, L);

			Ray shadowRay = new Ray(intersectionPoint, L);

			for (Sphere sphere : spheres) {
				Intersection i = sphere.getIntersection(shadowRay);
				if (i != null && i.getT() > 0) {
					return true;
				}
			}
		}
		// System.out.println(isInShadow);
		return false;
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
