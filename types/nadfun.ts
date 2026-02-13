export interface NadFunImageUploadResponse {
  image_uri: string;
}

export interface NadFunMetadataUploadResponse {
  metadata_uri: string;
}

export interface NadFunSaltResponse {
  salt: string;
  address: string; // Vanity address ending in 7777
}

export interface NadFunTokenStatus {
  address: string;
  name: string;
  symbol: string;
  image_uri: string;
  metadata_uri: string;
  created_at: string;
  status: 'pending' | 'active' | 'failed';
}
