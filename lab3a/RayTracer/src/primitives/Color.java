package primitives;

public class Color extends Vec3 {
	public Color(float x, float y, float z) {
		super(x, y, z);
	}

	public java.awt.Color convertToAwtColor() {
		return new java.awt.Color(getX(), getY(), getZ());
	}

	@Override
	public String toString() {
		return "Color::" + super.toString();
	}

}
