/**
 * AI prompt templates for token generation and agent interactions
 */

export interface TokenGenerationPrompt {
  name: string;
  symbol: string;
  description: string;
  theme?: string;
}

/**
 * Generate a creative token name prompt
 */
export function generateTokenNamePrompt(theme?: string, userInput?: string): string {
  let prompt = `Generate a creative, weird, and memorable token name`;

  if (theme) {
    prompt += ` with a ${theme} theme`;
  }

  if (userInput) {
    prompt += ` inspired by: "${userInput}"`;
  }

  prompt += `. The name should be:
- 3-15 characters long
- Unique and creative
- Memorable and catchy
- Suitable for a cryptocurrency token

Generate 5 name suggestions.`;

  return prompt;
}

/**
 * Generate a creative token description prompt
 */
export function generateDescriptionPrompt(name: string, symbol: string, theme?: string): string {
  let prompt = `Write a creative and engaging description for a token called "${name}" (${symbol})`;

  if (theme) {
    prompt += ` with a ${theme} theme`;
  }

  prompt += `. The description should be:
- 50-200 words
- Creative and engaging
- Highlight the token's unique value proposition
- Include personality and character
- Suitable for a cryptocurrency token on the Monad blockchain

Make it weird, creative, and memorable!`;

  return prompt;
}

/**
 * Generate token symbol prompt
 */
export function generateSymbolPrompt(name: string): string {
  return `Generate a token symbol (ticker) for "${name}". The symbol should be:
- 2-6 uppercase letters
- Memorable and related to the name
- Unique and catchy
- Suitable for trading

Generate 3 symbol suggestions.`;
}

/**
 * Generate creative attributes prompt
 */
export function generateAttributesPrompt(name: string, theme?: string): string {
  let prompt = `Generate creative NFT-style attributes for token "${name}"`;

  if (theme) {
    prompt += ` with a ${theme} theme`;
  }

  prompt += `. Generate 3-5 unique attributes with:
- Trait types (e.g., "Vibe", "Energy", "Rarity", "Power")
- Creative values that match the token's personality
- Mix of text and numeric values

Make them weird, creative, and fun!`;

  return prompt;
}

/**
 * Agent conversation prompt
 */
export function generateAgentResponsePrompt(userMessage: string, context?: string): string {
  let prompt = `You are TokenGenie, a creative AI agent that helps users create tokens on nad.fun/Monad blockchain.

Your personality:
- Creative and weird
- Helpful and enthusiastic
- Surprising and fun
- Knowledgeable about token creation

User message: "${userMessage}"`;

  if (context) {
    prompt += `\n\nContext: ${context}`;
  }

  prompt += `\n\nRespond in a creative, helpful, and engaging way. Keep it concise (1-3 sentences).`;

  return prompt;
}

/**
 * Token idea generation prompt
 */
export function generateTokenIdeaPrompt(userInput: string): string {
  return `The user wants to create a token. They said: "${userInput}"

Generate creative token ideas based on this input. For each idea, provide:
- Name (creative and memorable)
- Symbol (2-6 letters)
- Brief description (1-2 sentences)
- Theme or category

Generate 3-5 ideas that are weird, creative, and suitable for the Monad blockchain ecosystem.`;
}
