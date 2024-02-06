export function hexToDataURL(hexColor: string) {
	// Remove the '#' if it's present
	hexColor = hexColor.replace(/^#/, '');

	// Parse the hex color values
	const r = parseInt(hexColor.slice(0, 2), 16);
	const g = parseInt(hexColor.slice(2, 4), 16);
	const b = parseInt(hexColor.slice(4, 6), 16);

	// Create a 1x1 pixel image with the specified color
	const imageBuffer = Buffer.from([r, g, b, 255]);

	// Convert the buffer to a base64-encoded data URL
	const imageDataUrl = 'data:image/png;base64,' + imageBuffer.toString('base64');

	return imageDataUrl;
}
