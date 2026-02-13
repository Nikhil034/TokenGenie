/**
 * Agent personality system for TokenGenie
 * Provides creative, weird responses and token suggestions
 */

export interface AgentMessage {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
  type?: 'greeting' | 'suggestion' | 'response' | 'error' | 'success';
}

export class AgentPersonality {
  private name: string;
  private personality: 'creative' | 'weird' | 'helpful' | 'chaotic';

  constructor(name = 'TokenGenie', personality: 'creative' | 'weird' | 'helpful' | 'chaotic' = 'creative') {
    this.name = name;
    this.personality = personality;
  }

  /**
   * Generate a greeting message
   */
  greet(): string {
    const greetings = [
      `Hey there! I'm ${this.name}, your AI token creation companion! 🦞`,
      `Welcome! ${this.name} here, ready to create some weird and wonderful tokens!`,
      `Yo! ${this.name} at your service. Let's make something amazing!`,
      `Greetings, human! ${this.name} is here to help you create tokens that break boundaries!`,
      `Hello! I'm ${this.name}, and I specialize in creating tokens that surprise and delight!`,
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Generate creative token name suggestions
   */
  suggestTokenNames(theme?: string): string[] {
    const creativeNames = [
      'CosmicChaos',
      'QuantumQuirk',
      'NeonNexus',
      'VoidVibes',
      'EchoEthereal',
      'NovaNonsense',
      'ApexAnomaly',
      'ZenithZest',
      'PrismPulse',
      'NexusNudge',
      'ChaosCrystal',
      'MysticMoment',
      'EpicEcho',
      'WildWave',
      'SmoothSoul',
    ];

    const weirdNames = [
      'BananaBlockchain',
      'PenguinProtocol',
      'LlamaLiquidity',
      'DuckDecentralized',
      'OctopusOracle',
      'FlamingoFinance',
      'AlpacaAsset',
      'KoalaCoin',
      'SlothSwap',
      'NarwhalNetwork',
    ];

    const names = this.personality === 'weird' ? weirdNames : creativeNames;
    const suggestions: string[] = [];

    // Pick 5 random names
    for (let i = 0; i < 5; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      if (!suggestions.includes(name)) {
        suggestions.push(name);
      }
    }

    if (theme) {
      suggestions.push(`${theme}Token`, `${theme}Coin`, `${theme}Gem`);
    }

    return suggestions;
  }

  /**
   * Generate creative response based on user input
   */
  respondToUser(input: string): string {
    const lowerInput = input.toLowerCase();

    // Check for greetings
    if (lowerInput.match(/hi|hello|hey|greetings/)) {
      return this.greet();
    }

    // Check for token creation requests
    if (lowerInput.match(/create|make|build|token/)) {
      return this.getTokenCreationResponse();
    }

    // Check for help requests
    if (lowerInput.match(/help|how|what|guide/)) {
      return this.getHelpResponse();
    }

    // Check for questions about the process
    if (lowerInput.match(/how.*work|process|steps|flow/)) {
      return this.getProcessExplanation();
    }

    // Default creative response
    return this.getDefaultResponse();
  }

  /**
   * Get response for token creation
   */
  private getTokenCreationResponse(): string {
    const responses = [
      `Awesome! Let's create something amazing! Just give me a name, symbol, and description, and I'll handle the rest! 🚀`,
      `Perfect! I'll guide you through creating your token. It's a 4-step process: upload image, metadata, mine salt, and deploy on-chain!`,
      `Let's do this! I'll make sure your token is creative and unique. What should we call it?`,
      `Excellent choice! Token creation is my specialty. I'll make it weird and wonderful!`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get help response
   */
  private getHelpResponse(): string {
    return `I'm here to help! I can:
- Create tokens on nad.fun/Monad
- Suggest creative token names and ideas
- Guide you through the 4-step creation process
- Generate unique metadata and attributes

Just tell me what you'd like to create, and I'll help you make it happen! 🦞`;
  }

  /**
   * Get process explanation
   */
  private getProcessExplanation(): string {
    return `The token creation process has 4 steps:
1️⃣ Upload Image - Your token's visual identity
2️⃣ Upload Metadata - Name, symbol, description, and attributes
3️⃣ Mine Salt - Generate a vanity address ending in 7777
4️⃣ Create On-Chain - Deploy to Monad blockchain via BondingCurveRouter

I'll handle all of this for you! Just provide the basics, and I'll add the creative flair! ✨`;
  }

  /**
   * Get default response
   */
  private getDefaultResponse(): string {
    const responses = [
      `Interesting! Tell me more about what you'd like to create.`,
      `Hmm, let me think... How about we create a token together?`,
      `I'm listening! What kind of token are you dreaming of?`,
      `Cool! Want to create something weird and wonderful?`,
      `Let's make something amazing! What's your idea?`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate success message after token creation
   */
  celebrateSuccess(tokenAddress: string, tokenName: string): string {
    const celebrations = [
      `🎉 Success! ${tokenName} has been created at ${tokenAddress}! You're now part of the Monad ecosystem!`,
      `✨ Amazing! Your token ${tokenName} is live on-chain at ${tokenAddress}! Time to celebrate!`,
      `🚀 Boom! ${tokenName} is deployed at ${tokenAddress}! Welcome to the future of tokens!`,
      `🦞 Epic! ${tokenName} is now on Monad at ${tokenAddress}! You did it!`,
    ];

    return celebrations[Math.floor(Math.random() * celebrations.length)];
  }

  /**
   * Generate error message
   */
  handleError(error: string): string {
    const errorResponses = [
      `Oops! Something went wrong: ${error}. Let's try again!`,
      `Hmm, we hit a snag: ${error}. Don't worry, I'll help you fix it!`,
      `Well, that's unexpected: ${error}. Let's troubleshoot together!`,
    ];

    return errorResponses[Math.floor(Math.random() * errorResponses.length)];
  }

  /**
   * Get creative token theme suggestions
   */
  suggestThemes(): string[] {
    return [
      'Cosmic',
      'Quantum',
      'Neon',
      'Void',
      'Echo',
      'Nova',
      'Chaos',
      'Zen',
      'Epic',
      'Mystic',
      'Wild',
      'Smooth',
      'Electric',
      'Vibey',
      'Chill',
    ];
  }
}

export const agentPersonality = new AgentPersonality('TokenGenie', 'creative');
