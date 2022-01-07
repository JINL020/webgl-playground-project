package raytracer;

import java.awt.Color;
import java.util.List;

import camera.Camera;
import lights.Light;
import surfaces.Sphere;
import xmlParser.XmlToJava;

public class Main {
	public static void main(String[] args) {

		Camera camera = null;
		String outputFile = null;
		Color background = null;
		List<Light> lights = null;
		List<Sphere> spheres = null;

		try {
			XmlToJava parser = new XmlToJava(args[0]);

			outputFile = parser.getOutputFileName();
			background = parser.getBackgroundColor().convertToAwtColor();
			camera = parser.getCamera();
			lights = parser.getLights();
			spheres = parser.getSpheres();

			System.out.println("outputFile: " + outputFile);
			System.out.println("backgroundColor: " + background);
			System.out.println("camera: " + camera);
			System.out.println("lights: " + lights);
			System.out.println("spheres: " + spheres);
		} catch (Exception e) {
			e.printStackTrace();
		}
		/*
		 * Map<Pixel, java.awt.Color> colors = null; try { Raytracer raytracer = new
		 * Raytracer(bgColor, camera, spheres, lights); colors =
		 * raytracer.calculateColor(); } catch (Exception e) { e.printStackTrace(); }
		 * 
		 * try { int height = camera.getVerticalRes(); int width =
		 * camera.getHorizontalRes(); ImageCreator imageCreator = new
		 * ImageCreator(outputFile, height, width); imageCreator.createImage(colors); }
		 * catch (Exception e) { e.printStackTrace(); }
		 */
	}
}
