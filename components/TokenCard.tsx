'use client';

import { CreatedToken } from '@/types/token';
import { formatAddress } from '@/lib/utils/formatting';

interface TokenCardProps {
  token: CreatedToken;
}

export default function TokenCard({ token }: TokenCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {token.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {token.symbol}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {formatAddress(token.address)}
          </p>
        </div>
        {token.imageUri && (
          <img
            src={token.imageUri}
            alt={token.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href={`https://nad.fun/token/${token.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View on nad.fun →
        </a>
        {token.transactionHash && (
          <a
            href={`https://monad.xyz/tx/${token.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            View TX
          </a>
        )}
      </div>
    </div>
  );
}
