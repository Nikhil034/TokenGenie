import { TokenMetadata } from '@/types/token';

/**
 * Generate creative token metadata with personality
 */
export function generateTokenMetadata(
  name: string,
  symbol: string,
  description: string,
  imageUri: string,
  theme?: string
): TokenMetadata {
  const attributes = generateAttributes(name, theme);

  return {
    name,
    symbol: symbol.toUpperCase(),
    description,
    image: imageUri,
    attributes,
  };
}

/**
 * Generate creative attributes based on token name and theme
 */
function generateAttributes(name: string, theme?: string): TokenMetadata['attributes'] {
  const attributes: TokenMetadata['attributes'] = [
    {
      trait_type: 'Vibe',
      value: getRandomVibe(),
    },
    {
      trait_type: 'Energy',
      value: Math.floor(Math.random() * 100),
    },
    {
      trait_type: 'Rarity',
      value: getRandomRarity(),
    },
  ];

  if (theme) {
    attributes.push({
      trait_type: 'Theme',
      value: theme,
    });
  }

  // Add creative trait based on name
  const creativeTrait = generateCreativeTrait(name);
  if (creativeTrait) {
    attributes.push(creativeTrait);
  }

  return attributes;
}

function getRandomVibe(): string {
  const vibes = [
    'Chaotic',
    'Zen',
    'Electric',
    'Cosmic',
    'Vibey',
    'Chill',
    'Wild',
    'Smooth',
    'Epic',
    'Mystical',
  ];
  return vibes[Math.floor(Math.random() * vibes.length)];
}

function getRandomRarity(): string {
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
  const weights = [0.4, 0.3, 0.15, 0.1, 0.04, 0.01];
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < rarities.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      return rarities[i];
    }
  }
  return rarities[0];
}

function generateCreativeTrait(name: string): { trait_type: string; value: string } | null {
  const nameLength = name.length;
  const firstLetter = name[0].toUpperCase();

  const traits = [
    {
      trait_type: 'First Letter',
      value: firstLetter,
    },
    {
      trait_type: 'Name Length',
      value: nameLength,
    },
    {
      trait_type: 'Power Level',
      value: nameLength * 10,
    },
  ];

  return traits[Math.floor(Math.random() * traits.length)];
}

/**
 * Generate creative token name suggestions
 */
export function generateTokenNameSuggestions(theme?: string): string[] {
  const baseNames = [
    'Cosmic',
    'Quantum',
    'Neon',
    'Void',
    'Echo',
    'Nova',
    'Apex',
    'Zenith',
    'Prism',
    'Nexus',
  ];

  const suffixes = [
    'Token',
    'Coin',
    'Gem',
    'Crystal',
    'Shard',
    'Fragment',
    'Essence',
    'Spirit',
    'Force',
    'Wave',
  ];

  const suggestions: string[] = [];

  for (let i = 0; i < 5; i++) {
    const base = baseNames[Math.floor(Math.random() * baseNames.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    suggestions.push(`${base}${suffix}`);
  }

  if (theme) {
    suggestions.push(`${theme}Token`, `${theme}Coin`);
  }

  return suggestions;
}

/**
 * Generate creative description
 */
export function generateDescription(name: string, symbol: string, theme?: string): string {
  const descriptions = [
    `Welcome to ${name} (${symbol}) - a token that defies expectations and breaks boundaries.`,
    `${name} (${symbol}) is not just a token, it's a movement. Join the revolution.`,
    `Experience the power of ${name} (${symbol}) - where creativity meets blockchain.`,
    `${name} (${symbol}) represents the future of decentralized creativity.`,
    `Dive into the ${name} (${symbol}) ecosystem - weird, wild, and wonderful.`,
  ];

  let description = descriptions[Math.floor(Math.random() * descriptions.length)];

  if (theme) {
    description += ` This token embodies the ${theme} theme, bringing unique value to the Monad ecosystem.`;
  }

  description += ' Created by TokenGenie - your AI token creation companion.';

  return description;
}
