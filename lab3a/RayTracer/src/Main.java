
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import camera.Camera;
import lights.Light;
import primitives.Color;
import primitives.Pixel;
import raytracer.ImageCreator;
import raytracer.Raytracer;
import surfaces.Mesh;
import surfaces.Sphere;
import xmlParser.XmlToJava;

public class Main {
	public static void main(String[] args) {
		System.out.println("Please enter the file you want to parse: ");

		Scanner scanner = new Scanner(System.in);
		String input = scanner.nextLine();
		scanner.close();

		Camera camera = null;
		String outputFileName = null;
		Color background = null;
		List<Light> lights = null;
		List<Sphere> spheres = null;
		List<Mesh> meshes = null;

		Map<Pixel, Color> colors = null;

		try {
			XmlToJava parser = new XmlToJava(input);

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
