package surfaces;

import java.awt.Color;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class Material {
	private Color color;
	private Phong phong;
	private float reflectance;
	private float transmittance;
	private float refraction;

	public Material(Node node) {
		Element element = (Element) node;

		Node color = element.getElementsByTagName("color").item(0);
		Node phong = element.getElementsByTagName("phong").item(0);
		Node reflectance = element.getElementsByTagName("reflectance").item(0);
		Node transmittance = element.getElementsByTagName("transmittance").item(0);
		Node refraction = element.getElementsByTagName("refraction").item(0);

		if (color != null && phong != null && reflectance != null && transmittance != null && refraction != null) {
			this.setColor(node);
			this.setPhong(node);
			this.setReflectance(node);
			this.setTransmittance(node);
			this.setRefraction(node);
		}
	}

	public void setColor(Node node) {

		String r = ((Element) node).getAttribute("r");
		String g = ((Element) node).getAttribute("g");
		String b = ((Element) node).getAttribute("b");

		color = new Color(Float.parseFloat(r), Float.parseFloat(g), Float.parseFloat(b));
	}

	private void setPhong(Node node) {
		this.phong = new Phong(node);
	}

	private void setReflectance(Node node) {
		String reflectance = ((Element) node).getAttribute("r");
		this.reflectance = Float.parseFloat(reflectance);
	}

	private void setTransmittance(Node node) {
		String transmittance = ((Element) node).getAttribute("t");
		this.transmittance = Float.parseFloat(transmittance);
	}

	private void setRefraction(Node node) {
		String refraction = ((Element) node).getAttribute("iof");
		this.refraction = Float.parseFloat(refraction);
	}

	@Override
	public String toString() {
		return "Material [color=" + color + ", reflectance=" + reflectance + ", transmittance=" + transmittance
				+ ", refraction=" + refraction + "]";
	}
}
