package material;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import lights.Phong;

public abstract class Material {
	private Phong phong;
	private float reflectance;
	private float transmittance;
	private float refraction;

	public Material(Node node) {
		Element element = (Element) node;

		Node phong = element.getElementsByTagName("phong").item(0);
		Node reflectance = element.getElementsByTagName("reflectance").item(0);
		Node transmittance = element.getElementsByTagName("transmittance").item(0);
		Node refraction = element.getElementsByTagName("refraction").item(0);

		if (phong != null && reflectance != null && transmittance != null && refraction != null) {
			this.setPhong(phong);
			this.setReflectance(reflectance);
			this.setTransmittance(transmittance);
			this.setRefraction(refraction);
		}
	}

	public Phong getPhong() {
		return phong;
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
		return "Material [phong=" + phong + ", reflectance=" + reflectance + ", transmittance=" + transmittance
				+ ", refraction=" + refraction + "]";
	}

}