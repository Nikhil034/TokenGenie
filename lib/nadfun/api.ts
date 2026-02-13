import axios, { AxiosInstance } from 'axios';
import {
  NadFunImageUploadResponse,
  NadFunMetadataUploadResponse,
  NadFunSaltResponse,
  NadFunTokenStatus,
} from '@/types/nadfun';
import { TokenMetadata } from '@/types/token';
import { NadFunApiError } from '@/lib/utils/errors';

class NadFunApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.NAD_FUN_API_URL || 'https://dev-api.nad.fun';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Step 1: Upload token image
   */
  async uploadImage(imageFile: File | Blob): Promise<string> {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await this.client.post<NadFunImageUploadResponse>(
        '/agent/token/image',
        formData,
        {
          // Axios will automatically set Content-Type with boundary for FormData
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.image_uri;
    } catch (error: any) {
      throw new NadFunApiError(
        error.response?.data?.message || 'Failed to upload image',
        error.response?.status,
        error.response?.data?.code
      );
    }
  }

  /**
   * Step 2: Upload token metadata
   */
  async uploadMetadata(metadata: TokenMetadata): Promise<string> {
    try {
      const response = await this.client.post<NadFunMetadataUploadResponse>(
        '/agent/token/metadata',
        metadata
      );

      return response.data.metadata_uri;
    } catch (error: any) {
      throw new NadFunApiError(
        error.response?.data?.message || 'Failed to upload metadata',
        error.response?.status,
        error.response?.data?.code
      );
    }
  }

  /**
   * Step 3: Mine salt for vanity address (7777)
   */
  async mineSalt(): Promise<{ salt: string; address: string }> {
    try {
      const response = await this.client.post<NadFunSaltResponse>('/agent/salt');

      return {
        salt: response.data.salt,
        address: response.data.address,
      };
    } catch (error: any) {
      throw new NadFunApiError(
        error.response?.data?.message || 'Failed to mine salt',
        error.response?.status,
        error.response?.data?.code
      );
    }
  }

  /**
   * Check token status
   */
  async getTokenStatus(address: string): Promise<NadFunTokenStatus> {
    try {
      const response = await this.client.get<NadFunTokenStatus>(`/agent/token/${address}`);
      return response.data;
    } catch (error: any) {
      throw new NadFunApiError(
        error.response?.data?.message || 'Failed to get token status',
        error.response?.status,
        error.response?.data?.code
      );
    }
  }
}

export const nadFunApi = new NadFunApiClient();
