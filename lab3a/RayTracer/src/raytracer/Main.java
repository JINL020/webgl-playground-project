package raytracer;

import java.util.List;
import java.util.Map;

import camera.Camera;
import lights.Light;
import primitives.Color;
import primitives.Pixel;
import surfaces.Sphere;
import xmlParser.XmlToJava;

public class Main {
	public static void main(String[] args) {

		Camera camera = null;
		String outputFileName = null;
		Color background = null;
		List<Light> lights = null;
		List<Sphere> spheres = null;

		Map<Pixel, Color> colors = null;

		try {
			XmlToJava parser = new XmlToJava(args[0]);

			outputFileName = parser.getOutputFileName();
			background = parser.getBackgroundColor();
			camera = parser.getCamera();
			lights = parser.getLights();
			spheres = parser.getSpheres();

			/*
			 * System.out.println("outputFile: " + outputFileName);
			 * System.out.println("backgroundColor: " + background);
			 * System.out.println("camera: " + camera); System.out.println("lights: " +
			 * lights); System.out.println("spheres: " + spheres);
			 */

			int height = camera.getVerticalRes();
			int width = camera.getHorizontalRes();

			ImageCreator imageCreator = new ImageCreator(height, width);

			// imageCreator.createBlackImage();
			// imageCreator.createRGBImage();

			Raytracer raytracer = new Raytracer(background, camera, spheres, lights);
			colors = raytracer.getColorMap();
			imageCreator.createImage(colors, outputFileName);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
