import { formatUnits, parseUnits } from 'viem';

export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatBalance(balance: bigint, decimals = 18): string {
  return formatUnits(balance, decimals);
}

export function parseBalance(amount: string, decimals = 18): bigint {
  return parseUnits(amount, decimals);
}

export function formatMonAmount(amount: bigint): string {
  return `${formatBalance(amount)} MON`;
}

export function formatTokenAmount(amount: bigint, decimals = 18, symbol = ''): string {
  const formatted = formatBalance(amount, decimals);
  return symbol ? `${formatted} ${symbol}` : formatted;
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}
