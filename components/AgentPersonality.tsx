'use client';

import { agentPersonality } from '@/lib/agent/personality';

export default function AgentPersonality() {
  const themes = agentPersonality.suggestThemes();

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-4xl">🦞</div>
        <div>
          <h3 className="text-xl font-bold">TokenGenie</h3>
          <p className="text-sm opacity-90">Your AI Token Creation Companion</p>
        </div>
      </div>

      <p className="text-sm mb-4 opacity-90">
        I help you create weird, creative, and wonderful tokens on the Monad blockchain.
        Just tell me what you want, and I'll make it happen!
      </p>

      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Popular Themes:</p>
        <div className="flex flex-wrap gap-2">
          {themes.slice(0, 6).map((theme) => (
            <span
              key={theme}
              className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
