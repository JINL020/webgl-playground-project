package raytracer;

import static java.awt.image.BufferedImage.TYPE_INT_RGB;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.imageio.ImageIO;

import primitives.Pixel;

public class ImageCreator {
	private final String imageName;
	private final int height;
	private final int width;

	public ImageCreator(String imageName, int height, int width) {
		this.imageName = imageName;
		this.height = height;
		this.width = width;
	}

	public void createBlackImage() throws IOException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int j = 0; j < height; j++)
			for (int i = 0; i < width; i++) {
				image.setRGB(i, j, new Color(0, 0, 0).getRGB());
			}

		File outputFile = new File("blackImage");
		ImageIO.write(image, "png", outputFile);
	}

	public void createRGBImage() throws IOException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int j = 0; j < height; j++)
			for (int i = 0; i < width; i++) {
				float r = (float) i / (width - 1);
				float g = (float) j / (height - 1);
				float b = 0F;

				image.setRGB(i, j, new Color(r, g, b).getRGB());
			}

		File outputFile = new File("rgbImage");
		ImageIO.write(image, "png", outputFile);
	}

	public void createImage(Map<Pixel, Color> rays) throws IOException, IllegalArgumentException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int j = 0; j < height; j++)
			for (int i = 0; i < width; i++) {
				Color color = rays.get(new Pixel(i, j));
				if (color == null)
					System.out.println("i " + i + " j " + j);

				assert color != null;
				image.setRGB(i, j, color.getRGB());
			}

		File outputFile = new File(imageName);
		ImageIO.write(image, "png", outputFile);
	}

}
