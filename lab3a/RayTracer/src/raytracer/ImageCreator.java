package raytracer;

import static java.awt.image.BufferedImage.TYPE_INT_RGB;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.imageio.ImageIO;

import primitives.Color;
import primitives.Pixel;

public class ImageCreator {
	private final int height;
	private final int width;

	public ImageCreator(int height, int width) {
		this.height = height;
		this.width = width;
	}

	public void createBlackImage() throws IOException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				Color color = new Color(0, 0, 0);
				image.setRGB(x, y, color.convertToAwtColor().getRGB());
			}
		}

		File outputFile = new File("blackImage.png");
		ImageIO.write(image, "png", outputFile);
	}

	public void createRGBImage() throws IOException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				float r = (float) x / width;
				float g = (float) y / height;
				float b = 0F;
				image.setRGB(x, y, new Color(r, g, b).convertToAwtColor().getRGB());
			}
		}

		File outputFile = new File("rgbImage.png");
		ImageIO.write(image, "png", outputFile);
	}

	public void createImage(Map<Pixel, Color> colorMap, String imageName) throws IOException, IllegalArgumentException {
		BufferedImage image = new BufferedImage(width, height, TYPE_INT_RGB);

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				Pixel pixel = new Pixel(x, y);
				Color color = colorMap.get(pixel);
				assert color != null;
				image.setRGB(x, y, color.convertToAwtColor().getRGB());
			}
		}

		File outputFile = new File(imageName);
		ImageIO.write(image, "png", outputFile);
	}

}
