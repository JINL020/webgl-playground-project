package xmlParser;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import camera.Camera;
import lights.AmbientLight;
import lights.Light;
import lights.ParallelLight;
import lights.PointLight;
import primitives.Color;
import surfaces.Sphere;

public class NodeProcessor {

	public static Color processBGColor(Node node) {
		Color background = new Color(node);
		return background;
	}

	public static Camera processCameraNode(Node node) {
		Camera camera = null;

		Element element = (Element) node;

		Node position = element.getElementsByTagName("position").item(0);
		Node lookat = element.getElementsByTagName("lookat").item(0);
		Node up = element.getElementsByTagName("up").item(0);
		Node horizontalFOV = element.getElementsByTagName("horizontal_fov").item(0);
		Node resolution = element.getElementsByTagName("resolution").item(0);
		Node maxBounces = element.getElementsByTagName("max_bounces").item(0);

		if (position != null && lookat != null && up != null && horizontalFOV != null && resolution != null
				&& maxBounces != null) {
			camera = new Camera(position, lookat, up, horizontalFOV, resolution, maxBounces);
		}

		return camera;
	}

	public static List<Light> processLightNodes(Node node) {
		NodeList nList = node.getChildNodes();

		List<Light> lights = new ArrayList<>();

		for (int i = 0; i < nList.getLength(); i++) {
			Node lightNode = nList.item(i);

			Light light = null;

			switch (lightNode.getNodeName()) {
			case "ambient_light":
				light = new AmbientLight(lightNode);
				lights.add(light);
				break;
			case "parallel_light":
				light = new ParallelLight(lightNode);
				lights.add(light);
				break;

			case "point_light":
				light = new PointLight(lightNode);
				lights.add(light);
				break;
			}
		}
		return lights;
	}

	public static List<Sphere> processSphereNode(Node node) {
		NodeList nList = node.getChildNodes();

		List<Sphere> spheres = new ArrayList<>();

		for (int i = 0; i < nList.getLength(); i++) {
			Node surfaceNode = nList.item(i);

			if (surfaceNode.getNodeName() != "#text" && surfaceNode.getNodeName() == "sphere") {
				Element element = (Element) surfaceNode;

				String radius = ((Element) surfaceNode).getAttribute("radius");
				Node position = element.getElementsByTagName("position").item(0);
				Node material = element.getElementsByTagName("material_solid").item(0);

				if (!radius.isEmpty() && position != null && material != null) {
					Sphere sphere = new Sphere(Float.parseFloat(radius), position, material);
					spheres.add(sphere);
				}
			}
		}
		return spheres;
	}

}
