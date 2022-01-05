package xmlParser;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import camera.Camera;
import lights.AmbientLight;
import lights.ParallelLight;
import lights.PointLight;
import surfaces.*;

// TODO make the functions return the object instead of void

public class NodeProcessor {
	public static Color processBGColor(Node node) {
		String r = ((Element) node).getAttribute("r");
		String g = ((Element) node).getAttribute("g");
		String b = ((Element) node).getAttribute("b");

		Color background = new Color(Float.parseFloat(r), Float.parseFloat(g), Float.parseFloat(b));
		System.out.println("backgroundColor: " + background);
		System.out.println();

		return background;
	}

	public static Camera processCameraNode(Node node) {
		Camera camera = new Camera();
		Element element = (Element) node;

		Node position = element.getElementsByTagName("position").item(0);
		if (position != null)
			camera.setPosition(position);

		Node lookat = element.getElementsByTagName("lookat").item(0);
		if (lookat != null)
			camera.setLookat(lookat);

		Node up = element.getElementsByTagName("up").item(0);
		if (up != null)
			camera.setUp(up);

		Node horizontalFOV = element.getElementsByTagName("horizontal_fov").item(0);
		if (horizontalFOV != null)
			camera.setHorizontalFOV(horizontalFOV);

		Node resolution = element.getElementsByTagName("resolution").item(0);
		if (resolution != null) {
			camera.setHorizontalRes(resolution);
			camera.setVerticalRes(resolution);
		}

		Node maxBounces = element.getElementsByTagName("max_bounces").item(0);
		if (maxBounces != null)
			camera.setMaxBounces(maxBounces);

		System.out.println("camera ");
		System.out.println(camera);

		return camera;
	}

	public static List<Object> processLightsNode(Node node) {
		NodeList nList = node.getChildNodes();
		List<Object> lights = new ArrayList<>();

		for (int i = 0; i < nList.getLength(); i++) {
			Node lightNode = nList.item(i);
			switch (lightNode.getNodeName()) {
			case "ambient_light":
				AmbientLight ambientLight = new AmbientLight(lightNode);
				lights.add(ambientLight);
				System.out.println("ambientLights " + "\n" + ambientLight);
				System.out.println();
				break;
			case "parallel_light":
				ParallelLight parallelLight = new ParallelLight(lightNode);
				Element element = (Element) lightNode;

				Node direction = element.getElementsByTagName("direction").item(0);
				if (direction != null) {
					parallelLight.setDirection(direction);
					lights.add(parallelLight);
				}
				System.out.println("parallelLights " + "\n" + parallelLight);
				System.out.println();
				break;

			case "point_light":
				PointLight pointLight = new PointLight(lightNode);
				element = (Element) lightNode;

				Node position = element.getElementsByTagName("position").item(0);
				if (position != null) {
					pointLight.setPosition(position);
					lights.add(pointLight);
				}
				System.out.println("pointLights " + "\n" + pointLight);
				System.out.println();
				break;

			case "spot_light":
				// nothing in here yet
				// not sure if there will ever be smth
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

			if (surfaceNode.getNodeName() != "#text") {
				Element element = (Element) surfaceNode;
				switch (surfaceNode.getNodeName()) {
				case "sphere":
					Sphere sphere = new Sphere();

					String radius = ((Element) surfaceNode).getAttribute("radius");
					if (!radius.isEmpty())
						sphere.setRadius(Float.parseFloat(radius));

					Node position = element.getElementsByTagName("position").item(0);
					sphere.setPosition(position);

					System.out.println("sphere");
					System.out.println("radius: " + sphere.getRadius());
					System.out.println("position: " + sphere.getPosition());

					// TODO actually set the materials
					Node materialNonTextured = element.getElementsByTagName("material_solid").item(0);
					if (materialNonTextured != null) {
						NonTexturedMaterial material = this.processNonTexturedMaterialNode(materialNonTextured);
						sphere.setMaterial(material);
					}
					spheres.add(sphere);
					break;
				}
			}
		}

		return spheres;
	}

	public static List<Sphere> processMeshNode(Node node) {
		NodeList nList = node.getChildNodes();
		List<Sphere> meshList = new ArrayList<>();

		for (int i = 0; i < nList.getLength(); i++) {
			Node surfaceNode = nList.item(i);

			if (surfaceNode.getNodeName() != "#text") {
				Element element = (Element) surfaceNode;
				switch (surfaceNode.getNodeName()) {
				case "mesh":
					String name = ((Element) surfaceNode).getAttribute("name");
					System.out.println("mesh");
					System.out.println("name: " + name);

					// TODO actually set the materials
					element = (Element) node;

					Node materialTextured = element.getElementsByTagName("material_textured").item(0);
					if (materialTextured != null)
						this.processTexturedMaterialNode(materialTextured);

					break;
				}
			}
		}

		return meshList;
	}

	public static Material processTexturedMaterialNode(Node node) {
		TexturedMaterial material = new TexturedMaterial();
		Element element = (Element) node;

		Node color = element.getElementsByTagName("color").item(0);
		if (color != null)
			material.setColor(color);

		Node phong = element.getElementsByTagName("phong").item(0);
		if (phong != null)
			material.setPhong(phong);

		Node reflectance = element.getElementsByTagName("reflectance").item(0);
		if (reflectance != null)
			material.setReflectance(reflectance);

		Node transmittance = element.getElementsByTagName("transmittance").item(0);
		if (transmittance != null)
			material.setTransmittance(transmittance);

		Node refraction = element.getElementsByTagName("refraction").item(0);
		if (refraction != null)
			material.setRefraction(refraction);

		Node texture = element.getElementsByTagName("texture").item(0);
		if (texture != null)
			material.setName(texture);

		return material;
	}

	public static NonTexturedMaterial processNonTexturedMaterialNode(Node node) {
		NonTexturedMaterial material = new NonTexturedMaterial();
		Element element = (Element) node;

		Node color = element.getElementsByTagName("color").item(0);
		if (color != null)
			material.setColor(color);

		Node phong = element.getElementsByTagName("phong").item(0);
		if (phong != null)
			material.setPhong(phong);

		Node reflectance = element.getElementsByTagName("reflectance").item(0);
		if (reflectance != null)
			material.setReflectance(reflectance);

		Node transmittance = element.getElementsByTagName("transmittance").item(0);
		if (transmittance != null)
			material.setTransmittance(transmittance);

		Node refraction = element.getElementsByTagName("refraction").item(0);
		if (refraction != null)
			material.setRefraction(refraction);

		return (NonTexturedMaterial) material;
	}

	// TODO implement this
	public void processTransformNode(Node node) {
	}
}
