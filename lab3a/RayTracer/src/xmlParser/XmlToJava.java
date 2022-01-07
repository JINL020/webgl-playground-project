package xmlParser;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import camera.Camera;
import lights.Light;
import primitives.Color;
import surfaces.Sphere;

public class XmlToJava {
	private DocumentBuilderFactory factory;
	private DocumentBuilder builder;
	private StringBuilder xmlStringBuilder;
	private File inputFile;
	private Document doc;
	private Node root;
	private NodeList nodeList;

	public XmlToJava(String input) {
		try {
			this.factory = DocumentBuilderFactory.newInstance();
			this.builder = factory.newDocumentBuilder();
			this.xmlStringBuilder = new StringBuilder();
			this.xmlStringBuilder.append("<?xml version=\"1.0\"?> <class> </class>");
			this.inputFile = new File(input);
			this.doc = builder.parse(inputFile);
			doc.getDocumentElement().normalize();
			this.root = doc.getDocumentElement();
			this.nodeList = root.getChildNodes();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getOutputFileName() {
		return ((Element) root).getAttribute("output_file");
	}

	public Color getBackgroundColor() {
		Color backgroundColor = null;
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeName().equals("background_color"))
				backgroundColor = NodeProcessor.processBGColor(node);
		}
		return backgroundColor;
	}

	public Camera getCamera() {
		Camera camera = null;

		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeName().equals("camera"))
				camera = NodeProcessor.processCameraNode(node);
		}
		return camera;
	}

	public List<Light> getLights() {
		List<Light> lights = null;

		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeName().equals("lights"))
				lights = NodeProcessor.processLightNodes(node);
		}

		return lights;
	}

	public List<Sphere> getSpheres() {
		List<Sphere> spheres = null;

		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeName().equals("surfaces"))
				spheres = NodeProcessor.processSphereNode(node);
		}

		return spheres;
	}

}
