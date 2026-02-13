import { createPublicClient, createWalletClient, http, Address, formatUnits, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { MonadRpcError } from '@/lib/utils/errors';

// Monad chain configuration
const monadChain = {
  id: 10143, // Monad testnet chain ID (update for mainnet)
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: [process.env.MONAD_RPC_URL || 'https://testnet-rpc.monad.xyz'],
    },
  },
} as const;

class MonadRpcClient {
  private publicClient: ReturnType<typeof createPublicClient>;
  private walletClient?: ReturnType<typeof createWalletClient>;
  private account?: ReturnType<typeof privateKeyToAccount>;

  constructor() {
    this.publicClient = createPublicClient({
      chain: monadChain,
      transport: http(),
    });
  }

  /**
   * Initialize wallet from private key
   */
  initializeWallet(privateKey: string) {
    this.account = privateKeyToAccount(`0x${privateKey.replace(/^0x/, '')}` as `0x${string}`);
    this.walletClient = createWalletClient({
      account: this.account,
      chain: monadChain,
      transport: http(),
    });
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: Address): Promise<bigint> {
    try {
      return await this.publicClient.getBalance({ address });
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to get balance',
        error.code
      );
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      return await this.publicClient.getGasPrice();
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to get gas price',
        error.code
      );
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(params: {
    to: Address;
    data: `0x${string}`;
    value?: bigint;
  }): Promise<bigint> {
    try {
      if (!this.account) {
        throw new MonadRpcError('Wallet not initialized');
      }

      return await this.publicClient.estimateGas({
        account: this.account,
        to: params.to,
        data: params.data,
        value: params.value,
      });
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to estimate gas',
        error.code
      );
    }
  }

  /**
   * Send a transaction
   */
  async sendTransaction(params: {
    to: Address;
    data: `0x${string}`;
    value?: bigint;
    gas?: bigint;
  }): Promise<`0x${string}`> {
    try {
      if (!this.walletClient || !this.account) {
        throw new MonadRpcError('Wallet not initialized');
      }

      const hash = await this.walletClient.sendTransaction({
        account: this.account,
        to: params.to,
        data: params.data,
        value: params.value,
        gas: params.gas,
      });

      return hash;
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to send transaction',
        error.code
      );
    }
  }

  /**
   * Wait for transaction receipt
   */
  async waitForTransaction(hash: `0x${string}`) {
    try {
      return await this.publicClient.waitForTransactionReceipt({ hash });
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to wait for transaction',
        error.code
      );
    }
  }

  /**
   * Read from a contract
   */
  async readContract(params: {
    address: Address;
    abi: any[];
    functionName: string;
    args?: any[];
  }): Promise<any> {
    try {
      return await this.publicClient.readContract({
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
      });
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to read contract',
        error.code
      );
    }
  }

  /**
   * Write to a contract (send transaction)
   */
  async writeContract(params: {
    address: Address;
    abi: any[];
    functionName: string;
    args?: any[];
    value?: bigint;
    gas?: bigint;
  }): Promise<`0x${string}`> {
    try {
      if (!this.walletClient || !this.account) {
        throw new MonadRpcError('Wallet not initialized');
      }

      const hash = await this.walletClient.writeContract({
        account: this.account,
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
        value: params.value,
        gas: params.gas,
      });

      return hash;
    } catch (error: any) {
      throw new MonadRpcError(
        error.message || 'Failed to write contract',
        error.code
      );
    }
  }

  /**
   * Get the current account address
   */
  getAccountAddress(): Address | null {
    return this.account?.address || null;
  }
}

export const monadRpc = new MonadRpcClient();
