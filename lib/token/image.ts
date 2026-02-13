/**
 * Image handling utilities for token creation
 */

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Image must be PNG, JPEG, GIF, or WebP format',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image must be smaller than 5MB',
    };
  }

  return { valid: true };
}

/**
 * Convert File to base64 (for preview or alternative upload)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Create a default placeholder image data URL
 */
export function createPlaceholderImage(text: string): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#6366f1"/>
      <text x="50%" y="50%" font-family="Arial" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${text.substring(0, 10)}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
