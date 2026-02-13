import { Address } from 'viem';
import { nadFunApi } from '@/lib/nadfun/api';
import { bondingCurveContract } from '@/lib/contracts/bondingCurve';
import { monadRpc } from '@/lib/monad/rpc';
import { TokenCreationParams, TokenCreationProgress, TokenCreationStep } from '@/types/token';
import { TokenCreationError } from '@/lib/utils/errors';
import { generateTokenMetadata } from './metadata';

/**
 * Main token creation orchestrator
 * Implements the 4-step token creation flow
 */
export class TokenCreator {
  private progress: TokenCreationProgress;

  constructor() {
    this.progress = {
      currentStep: 0,
      steps: [
        { step: 1, name: 'Upload Image', status: 'pending' },
        { step: 2, name: 'Upload Metadata', status: 'pending' },
        { step: 3, name: 'Mine Salt', status: 'pending' },
        { step: 4, name: 'Create On-Chain', status: 'pending' },
      ],
    };
  }

  /**
   * Execute the complete token creation flow
   */
  async createToken(params: TokenCreationParams): Promise<Address> {
    try {
      // Step 1: Upload Image
      await this.step1_UploadImage(params);

      // Step 2: Upload Metadata
      await this.step2_UploadMetadata(params);

      // Step 3: Mine Salt
      await this.step3_MineSalt(params);

      // Step 4: Create On-Chain
      const tokenAddress = await this.step4_CreateOnChain(params);

      // Mark all steps as completed
      this.progress.steps.forEach((step) => {
        step.status = 'completed';
      });

      this.progress.tokenAddress = tokenAddress;

      return tokenAddress;
    } catch (error: any) {
      // Mark current step as error
      const currentStep = this.progress.steps.find((s) => s.status === 'in_progress');
      if (currentStep) {
        currentStep.status = 'error';
        currentStep.message = error.message;
      }

      this.progress.error = error.message;
      throw new TokenCreationError(
        error.message || 'Token creation failed',
        this.progress.currentStep
      );
    }
  }

  /**
   * Step 1: Upload image to nad.fun
   */
  private async step1_UploadImage(params: TokenCreationParams): Promise<void> {
    this.updateStep(1, 'in_progress', 'Uploading image...');

    if (!params.imageFile) {
      throw new TokenCreationError('Image file is required', 1);
    }

    try {
      const imageUri = await nadFunApi.uploadImage(params.imageFile);
      params.imageUri = imageUri;

      this.updateStep(1, 'completed', `Image uploaded: ${imageUri}`);
    } catch (error: any) {
      this.updateStep(1, 'error', error.message);
      throw error;
    }
  }

  /**
   * Step 2: Upload metadata to nad.fun
   */
  private async step2_UploadMetadata(params: TokenCreationParams): Promise<void> {
    this.updateStep(2, 'in_progress', 'Uploading metadata...');

    if (!params.imageUri) {
      throw new TokenCreationError('Image URI is required', 2);
    }

    try {
      const metadata = generateTokenMetadata(
        params.name,
        params.symbol,
        params.description,
        params.imageUri
      );

      const metadataUri = await nadFunApi.uploadMetadata(metadata);
      params.metadataUri = metadataUri;

      this.updateStep(2, 'completed', `Metadata uploaded: ${metadataUri}`);
    } catch (error: any) {
      this.updateStep(2, 'error', error.message);
      throw error;
    }
  }

  /**
   * Step 3: Mine salt for vanity address
   */
  private async step3_MineSalt(params: TokenCreationParams): Promise<void> {
    this.updateStep(3, 'in_progress', 'Mining salt for vanity address...');

    try {
      const { salt, address } = await nadFunApi.mineSalt();
      params.salt = salt;
      params.vanityAddress = address;

      this.updateStep(3, 'completed', `Salt mined: ${address}`);
    } catch (error: any) {
      this.updateStep(3, 'error', error.message);
      throw error;
    }
  }

  /**
   * Step 4: Create token on-chain via BondingCurveRouter
   */
  private async step4_CreateOnChain(params: TokenCreationParams): Promise<Address> {
    this.updateStep(4, 'in_progress', 'Creating token on-chain...');

    if (!params.imageUri || !params.metadataUri || !params.salt) {
      throw new TokenCreationError('Missing required parameters for on-chain creation', 4);
    }

    try {
      // Check balance before creating
      const accountAddress = monadRpc.getAccountAddress();
      if (!accountAddress) {
        throw new TokenCreationError('Wallet not initialized', 4);
      }

      const balanceCheck = await bondingCurveContract.checkBalance(accountAddress);
      if (!balanceCheck.sufficient) {
        throw new TokenCreationError(
          `Insufficient balance. Required: ${balanceCheck.required.toString()}, Available: ${balanceCheck.balance.toString()}`,
          4
        );
      }

      // Create token on-chain
      const tokenAddress = await bondingCurveContract.createToken({
        name: params.name,
        symbol: params.symbol,
        imageUri: params.imageUri,
        metadataUri: params.metadataUri,
        salt: params.salt,
      });

      this.updateStep(4, 'completed', `Token created at: ${tokenAddress}`);

      return tokenAddress;
    } catch (error: any) {
      this.updateStep(4, 'error', error.message);
      throw error;
    }
  }

  /**
   * Update step status
   */
  private updateStep(stepNumber: number, status: TokenCreationStep['status'], message?: string): void {
    const step = this.progress.steps.find((s) => s.step === stepNumber);
    if (step) {
      step.status = status;
      step.message = message;
      this.progress.currentStep = stepNumber;
    }
  }

  /**
   * Get current progress
   */
  getProgress(): TokenCreationProgress {
    return { ...this.progress };
  }

  /**
   * Reset progress
   */
  reset(): void {
    this.progress = {
      currentStep: 0,
      steps: [
        { step: 1, name: 'Upload Image', status: 'pending' },
        { step: 2, name: 'Upload Metadata', status: 'pending' },
        { step: 3, name: 'Mine Salt', status: 'pending' },
        { step: 4, name: 'Create On-Chain', status: 'pending' },
      ],
    };
  }
}
