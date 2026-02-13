export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface TokenCreationParams {
  name: string;
  symbol: string;
  description: string;
  imageFile?: File;
  imageUri?: string;
  metadataUri?: string;
  salt?: string;
  vanityAddress?: string;
}

export interface TokenCreationStep {
  step: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  message?: string;
  data?: any;
}

export interface CreatedToken {
  address: string;
  name: string;
  symbol: string;
  imageUri: string;
  metadataUri: string;
  createdAt: Date;
  transactionHash?: string;
}

export interface TokenCreationProgress {
  currentStep: number;
  steps: TokenCreationStep[];
  tokenAddress?: string;
  error?: string;
}
