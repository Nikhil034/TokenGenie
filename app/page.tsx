'use client';

import { useState } from 'react';
import TokenCreator from '@/components/TokenCreator';
import AgentChat from '@/components/AgentChat';
import AgentPersonality from '@/components/AgentPersonality';
import TokenCard from '@/components/TokenCard';
import { CreatedToken } from '@/types/token';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'chat'>('create');
  const [createdTokens, setCreatedTokens] = useState<CreatedToken[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            TokenGenie 🦞
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your AI-powered token creation companion for Monad
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Built for the Moltiverse Hackathon
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Agent Info */}
          <div className="lg:col-span-1">
            <AgentPersonality />
          </div>

          {/* Middle Column - Token Creator */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex space-x-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'create'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Create Token
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Chat
              </button>
            </div>

            {activeTab === 'create' ? (
              <TokenCreator />
            ) : (
              <div className="h-[600px]">
                <AgentChat />
              </div>
            )}
          </div>

          {/* Right Column - Created Tokens */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Created Tokens
              </h2>
              {createdTokens.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No tokens created yet. Create your first token to see it here!
                </p>
              ) : (
                <div className="space-y-4">
                  {createdTokens.map((token, index) => (
                    <TokenCard key={index} token={token} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <p>
            Built for{' '}
            <a
              href="https://moltiverse.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Moltiverse Hackathon
            </a>
            {' '}• Powered by{' '}
            <a
              href="https://nad.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              nad.fun
            </a>
            {' '}and{' '}
            <a
              href="https://monad.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Monad
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
