package raytracer;

import java.awt.Color;
import java.util.List;
import java.util.Map;

import camera.Camera;
import lights.Light;
import surfaces.Sphere;
import xmlParser.XmlToJava;

public class Main {
	public static void main(String[] args) {

		Camera camera = null;
		String outputFile = null;
		Color bgColor = null;
		List<Sphere> spheres = null;
		List<Light> lights = null;

		try {
			XmlToJava parser = new XmlToJava(args[0]);
			outputFile = parser.getOutputFileName();
			System.out.println("outputFile: " + outputFile);
			bgColor = parser.getBackgroundColor().convertToAwtColor();
			camera = parser.getCamera();
			spheres = parser.getSpheres();
			lights = parser.getLights();
		} catch (Exception e) {
			e.printStackTrace();
		}

		Map<Pixel, java.awt.Color> colors = null;
		try {
			Raytracer raytracer = new Raytracer(bgColor, camera, spheres, lights);
			colors = raytracer.calculateColor();
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			int height = camera.getVerticalRes();
			int width = camera.getHorizontalRes();
			ImageCreator imageCreator = new ImageCreator(outputFile, height, width);
			imageCreator.createImage(colors);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
