package primitives;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class Vec3 {
	private float x;
	private float y;
	private float z;

	public Vec3(Node node) {
		String x = ((Element) node).getAttribute("x");
		String y = ((Element) node).getAttribute("y");
		String z = ((Element) node).getAttribute("z");

		this.x = Float.parseFloat(x);
		this.y = Float.parseFloat(y);
		this.z = Float.parseFloat(z);

	}

	public Vec3(float x, float y, float z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public Vec3 add(Vec3 vec) {
		float x_res = this.x + vec.x;
		float y_res = this.y + vec.y;
		float z_res = this.z + vec.z;

		Vec3 result = new Vec3(x_res, y_res, z_res);

		return result;
	}

	public Vec3 substract(Vec3 vec) {
		float x_res = this.x - vec.x;
		float y_res = this.y - vec.y;
		float z_res = this.z - vec.z;

		Vec3 result = new Vec3(x_res, y_res, z_res);
		return result;
	}

	public Vec3 multiply(float scalar) {
		float x_res = this.x * scalar;
		float y_res = this.y * scalar;
		float z_res = this.z * scalar;

		Vec3 result = new Vec3(x_res, y_res, z_res);
		return result;
	}

	/*
	 * public Vec3 multiply(Vec3 vec) { float x_res = this.x * vec.x; float y_res =
	 * this.y * vec.y; float z_res = this.z * vec.z;
	 * 
	 * Vec3 result = new Vec3(x_res, y_res, z_res); return result; }
	 */

	public float square() {
		float result = this.dot(this);
		return result;
	}

	public float dot(Vec3 vec) {
		float dotProduct = this.x * vec.x + this.y * vec.y + this.z * vec.z;
		return dotProduct;
	}

	public float length() {
		float length = (float) Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return length;
	}

	public Vec3 normalize() {
		Vec3 result = new Vec3(this.x / length(), this.y / length(), this.z / length());
		return result;
	}

	public Vec3 reverse() {
		Vec3 result = new Vec3(-this.x, -this.y, -this.z);
		return result;
	}

	public Vec3 move(float epsilon, Vec3 l) {
		float x_res = this.x + epsilon * l.x;
		float y_res = this.y + epsilon * l.y;
		float z_res = this.z + epsilon * l.z;

		Vec3 result = new Vec3(x_res, y_res, z_res);

		return result;

	}

	public float getX() {
		return x;
	}

	public float getY() {
		return y;
	}

	public float getZ() {
		return z;
	}

	@Override
	public String toString() {
		return "Vec3(" + x + ", " + y + ", " + z + ")";
	}

}
