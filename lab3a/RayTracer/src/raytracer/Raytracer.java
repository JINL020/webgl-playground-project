package raytracer;

import java.awt.Color;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import camera.Camera;
import lights.AmbientLight;
import lights.Light;
import lights.ParallelLight;
import primitives.Pixel;
import primitives.Ray;
import primitives.Vec3;
import surfaces.Sphere;

public class Raytracer {
	private final java.awt.Color backgroundColor;
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

	public Map<Pixel, java.awt.Color> calculateColor() {
		Map<Pixel, Ray> rays = createRays();
		Map<Pixel, Color> colorMap = new HashMap<>();

		for (int j = 0; j < height; j++)
			for (int i = 0; i < width; i++) {
				Pixel pixel = new Pixel(i, j);
				Ray ray = rays.get(pixel);
				Color color = traceRay(ray, 0);

				colorMap.put(pixel, color);
			}

		return colorMap;
	}

	private float calculateTanFOVX() {
		return (float) Math.tan(Math.PI / 4);
	}

	private float calculateTanFOVY() {
		return (float) Math.tan((height / (float) width) * Math.PI / 4);
	}

	private float calculateConstantX(float tanFovx) {
		return ((float) width / width) * tanFovx;
	}

	private float calculateConstantY(float tanFovy) {
		return ((float) height / height) / tanFovy;
	}

	private float calculateStepX(int u, float tanFovx, float constantX) {
		return (2 * u / (float) width) * tanFovx - constantX;
	}

	private float calculateStepY(int v, float tanFovy, float constantY) {
		return (2 * v / (float) height) * tanFovy - constantY;
	}

//    private boolean intersectTest(Vec3 origin, Vec3 direction, Sphere sphere) {
//        Vec3 L = Vec3.substract(origin, sphere.getPosition());
//        float a = Vec3.dot(direction, direction);
//        float b = 2.0F * Vec3.dot(L, direction);
//        float c = Vec3.dot(L, L) - sphere.getRadius() * sphere.getRadius();
//        float discr = b * b - 4 * a * c;
//
//        return (discr > 0);
//    }

	private float intersectionLength(Vec3 origin, Vec3 direction, Sphere sphere, int index)
			throws IllegalArgumentException {
		if (index != 0 && index != 1)
			throw new IllegalArgumentException("Index must be either 0 or 1");

		Vec3 L = Vec3.substract(origin, sphere.getPosition());
		float a = direction.dot(direction);
		float b = 2.0F * L.dot(direction);
		float c = L.dot(L) - sphere.getRadius() * sphere.getRadius();
		float discr = b * b - 4 * a * c;

		float t0, t1;
		if (discr == 0)
			return -0.5F * b / a;

		else if (discr > 0) {
			float q;
			if (b > 0)
				q = -0.5F * (b + (float) Math.sqrt(discr));
			else
				q = -0.5F * (b - (float) Math.sqrt(discr));

			t0 = q / a;
			t1 = c / q;

			if (index == 0)
				return Math.min(t0, t1);
			else
				return Math.max(t0, t1);
		}

		return -1;
	}

	private Map<Pixel, Ray> createRays() {
		Map<Pixel, Ray> rays = new HashMap<>();
		float tanFovx = calculateTanFOVX();
		float tanFovy = calculateTanFOVY();

		float constantX = calculateConstantX(tanFovx);
		float constantY = calculateConstantY(tanFovy);

		for (int j = 0; j < height; j++)
			for (int i = 0; i < width; i++) {
				float x = calculateStepX(i, tanFovx, constantX);
				float y = calculateStepY(height - j - 1, tanFovy, constantY);

				// should be camera position
//                Vec3 position = new Vec3(0, 0, 1);
				Vec3 position = camera.getPosition();
				Vec3 direction = new Vec3(x, y, (float) (Math.tan(Math.PI / 8)) * camera.getLookat().getZ());
				Ray ray = new Ray(position, direction);
				rays.put(new Pixel(i, j), ray);
			}

		return rays;
	}

	private java.awt.Color traceRay(Ray ray, int maxBounce) {
		if (maxBounce == 8)
			return new Color(0, 0, 0);
		float nearest = Float.MAX_VALUE;
		Color output = null;

		for (Sphere sphere : spheres) {
			float t = intersectionLength(ray.getPosition(), ray.getDirection(), sphere, 0);
			if (t > 0 && t < nearest) {
				Vec3 hitPoint = Vec3.add(ray.getPosition(), ray.getDirection().multiply(t));
				Vec3 normal = sphere.getNormal(hitPoint);
				primitives.Color color = sphere.getMaterial().getColor();

				nearest = t;

				int r = 0;
				int g = 0;
				int b = 0;

				for (Object light : lights) {
					if (light instanceof AmbientLight) {
						Color phongResult = sphere.getMaterial().getPhong().calculateLight(light, color, ray, normal);
						r += phongResult.getRed();
						g += phongResult.getGreen();
						b += phongResult.getBlue();
					} else if (light instanceof ParallelLight) {
						Vec3 origin = Vec3.add(hitPoint, normal.multiply((float) 1e-4));
						Vec3 direction = ((ParallelLight) light).getDirection().multiply(-1);

						boolean calculateLight = true;
						for (Sphere eachSphere : spheres)
							if (!eachSphere.equals(sphere) && intersectionLength(origin, direction, eachSphere, 1) > 0)
								calculateLight = false;

						if (calculateLight) {
							Color phongResult = sphere.getMaterial().getPhong().calculateLight(light, color, ray,
									normal);
							r += phongResult.getRed();
							g += phongResult.getGreen();
							b += phongResult.getBlue();
						}
					}

					if (r > 255)
						r = 255;
					if (g > 255)
						g = 255;
					if (b > 255)
						b = 255;

					output = new Color(r, g, b);
				}

				float refractionIOF = sphere.getMaterial().getRefraction();

//                if(refractionIOF > 0){
//                    Ray reflectedRay = calculateReflectedRay(ray, hitPoint);
//                    r += traceRay(reflectedRay, maxBounce+1).getR()
//
//                }
			}
		}

		if (output == null)
			return backgroundColor;
		else
			return output;
	}
}
