export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidTokenName(name: string): boolean {
  return name.length >= 1 && name.length <= 50;
}

export function isValidTokenSymbol(symbol: string): boolean {
  return /^[A-Z0-9]{1,10}$/.test(symbol.toUpperCase());
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  return validTypes.includes(file.type) && file.size <= maxSize;
}

export function validateTokenCreationParams(params: {
  name: string;
  symbol: string;
  description: string;
  imageFile?: File;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isValidTokenName(params.name)) {
    errors.push('Token name must be between 1 and 50 characters');
  }

  if (!isValidTokenSymbol(params.symbol)) {
    errors.push('Token symbol must be 1-10 uppercase alphanumeric characters');
  }

  if (params.description.length < 10 || params.description.length > 500) {
    errors.push('Description must be between 10 and 500 characters');
  }

  if (params.imageFile && !isValidImageFile(params.imageFile)) {
    errors.push('Image must be PNG, JPEG, GIF, or WebP and under 5MB');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
