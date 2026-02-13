import { Address } from 'viem';

export interface MonadTransaction {
  hash: string;
  from: Address;
  to: Address;
  value: bigint;
  gasLimit: bigint;
  gasPrice: bigint;
  data: string;
}

export interface MonadBalance {
  address: Address;
  balance: bigint;
  formatted: string;
}

export interface ContractCallParams {
  to: Address;
  data: string;
  value?: bigint;
  gasLimit?: bigint;
}

export interface BondingCurveCreateParams {
  name: string;
  symbol: string;
  imageUri: string;
  metadataUri: string;
  salt: string;
}

export interface FeeConfig {
  deployFee: bigint;
  formattedFee: string;
}
