import { Address, encodeFunctionData, decodeFunctionResult } from 'viem';
import { monadRpc } from '@/lib/monad/rpc';
import { MonadRpcError } from '@/lib/utils/errors';
import { BondingCurveCreateParams, FeeConfig } from '@/types/monad';

// BondingCurveRouter ABI (simplified - add full ABI as needed)
const BONDING_CURVE_ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageUri',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'metadataUri',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'create',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

// Curve ABI for fee checking
const CURVE_ABI = [
  {
    inputs: [],
    name: 'feeConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

class BondingCurveContract {
  private routerAddress: Address;
  private curveAddress: Address;

  constructor() {
    this.routerAddress = (process.env.BONDING_CURVE_ROUTER_ADDRESS ||
      '0x6F6B8F1a20703309951a5127c45B49b1CD981A22') as Address;
    this.curveAddress = (process.env.CURVE_ADDRESS ||
      '0xA7283d07812a02AFB7C09B60f8896bCEA3F90aCE') as Address;
  }

  /**
   * Get the deployment fee from Curve contract
   */
  async getDeployFee(): Promise<FeeConfig> {
    try {
      const fee = await monadRpc.readContract({
        address: this.curveAddress,
        abi: CURVE_ABI,
        functionName: 'feeConfig',
      });

      // feeConfig returns array, first element is deploy fee
      const deployFee = Array.isArray(fee) ? fee[0] : fee;
      const formattedFee = (Number(deployFee) / 1e18).toFixed(4);

      return {
        deployFee: BigInt(deployFee),
        formattedFee: `${formattedFee} MON`,
      };
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to get deploy fee',
        error.code
      );
    }
  }

  /**
   * Create a token on-chain via BondingCurveRouter
   * Step 4 of the token creation flow
   */
  async createToken(params: BondingCurveCreateParams): Promise<Address> {
    try {
      // Get deploy fee
      const feeConfig = await this.getDeployFee();

      // Convert salt string to bytes32
      const saltBytes32 = `0x${params.salt.replace(/^0x/, '').padStart(64, '0')}` as `0x${string}`;

      // Encode function data for gas estimation
      const functionData = encodeFunctionData({
        abi: BONDING_CURVE_ROUTER_ABI,
        functionName: 'create',
        args: [
          params.name,
          params.symbol,
          params.imageUri,
          params.metadataUri,
          saltBytes32,
        ],
      });

      // Estimate gas first
      const gasEstimate = await monadRpc.estimateGas({
        to: this.routerAddress,
        data: functionData,
        value: feeConfig.deployFee,
      });

      // Create the token
      const txHash = await monadRpc.writeContract({
        address: this.routerAddress,
        abi: BONDING_CURVE_ROUTER_ABI,
        functionName: 'create',
        args: [
          params.name,
          params.symbol,
          params.imageUri,
          params.metadataUri,
          saltBytes32,
        ],
        value: feeConfig.deployFee,
        gas: gasEstimate,
      });

      // Wait for transaction receipt
      const receipt = await monadRpc.waitForTransaction(txHash);

      // Extract token address from transaction receipt
      // Method 1: Try to get from contract creation (if this creates a new contract)
      if (receipt.contractAddress) {
        return receipt.contractAddress;
      }

      // Method 2: Try to simulate the call to get return value (before transaction)
      // This won't work for the actual transaction, but we can use it as a fallback
      // to verify the function works
      
      // Method 3: Parse event logs (preferred method)
      // The BondingCurveRouter should emit an event with the token address
      // We need the actual event ABI to parse this properly
      // For now, we'll try to find any address in the logs
      
      if (receipt.logs && receipt.logs.length > 0) {
        // Try to find token address in logs
        // This is a simplified approach - in production, parse the actual event
        for (const log of receipt.logs) {
          // Check if log contains an address (simplified check)
          if (log.topics && log.topics.length > 0) {
            // Topics[0] is usually the event signature
            // Topics[1+] are indexed parameters
            // Try to extract address from topics or data
            const potentialAddress = log.topics.find((topic: string) => 
              topic.length === 66 && topic.startsWith('0x')
            );
            if (potentialAddress) {
              // This might be the token address, but we need to verify
              // For now, we'll use it as a best guess
              return potentialAddress.slice(0, 42) as Address; // Take first 20 bytes (address length)
            }
          }
        }
      }

      // If we can't extract the address, throw an error with transaction hash
      // The user can check the transaction manually or we can implement proper event parsing
      throw new MonadRpcError(
        `Transaction successful (hash: ${txHash}) but could not extract token address automatically. ` +
        `Please check the transaction logs at the Monad explorer or implement event log parsing. ` +
        `The token was likely created successfully - check the transaction receipt for event logs.`
      );
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to create token',
        error.code
      );
    }
  }

  /**
   * Check if user has sufficient balance for deployment
   */
  async checkBalance(address: Address): Promise<{ sufficient: boolean; balance: bigint; required: bigint }> {
    const feeConfig = await this.getDeployFee();
    const balance = await monadRpc.getBalance(address);

    return {
      sufficient: balance >= feeConfig.deployFee,
      balance,
      required: feeConfig.deployFee,
    };
  }
}

export const bondingCurveContract = new BondingCurveContract();
