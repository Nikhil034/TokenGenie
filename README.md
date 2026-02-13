# TokenGenie - AI Token Creation Agent

A creative AI-powered agent for creating tokens on nad.fun/Monad blockchain. Built for the Moltiverse Hackathon.

## Features

- 🤖 **AI Agent with Personality** - TokenGenie helps you create tokens with creative suggestions
- 🪙 **4-Step Token Creation** - Complete flow from image upload to on-chain deployment
- 💬 **Interactive Chat** - Chat with TokenGenie for ideas and guidance
- 🎨 **Creative Metadata Generation** - AI-powered token names, descriptions, and attributes
- 🌙 **Dark Mode Support** - Beautiful UI with dark mode
- ⚡ **Real-time Progress** - Track token creation progress step-by-step

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Blockchain**: Viem for Monad blockchain interactions
- **APIs**: nad.fun API, Monad RPC

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A wallet with MON tokens for deployment fees (~10 MON)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```env
# Nad.fun API Configuration
NAD_FUN_API_URL=https://dev-api.nad.fun
# For mainnet: https://api.nadapp.net

# Monad RPC Configuration
MONAD_RPC_URL=https://testnet-rpc.monad.xyz
# For mainnet: https://rpc.monad.xyz

# Contract Addresses (Mainnet)
BONDING_CURVE_ROUTER_ADDRESS=0x6F6B8F1a20703309951a5127c45B49b1CD981A22
CURVE_ADDRESS=0xA7283d07812a02AFB7C09B60f8896bCEA3F90aCE
LENS_ADDRESS=0x7e78A8DE94f21804F7a17F4E8BF9EC2c872187ea

# Wallet Configuration (for transactions)
WALLET_PRIVATE_KEY=your_private_key_here
# Note: Never commit this to git! Use environment variables in production.
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Token Creation Flow

The token creation process follows these 4 steps:

1. **Upload Image** - Upload your token's image (PNG, JPEG, GIF, or WebP, max 5MB)
2. **Upload Metadata** - TokenGenie generates creative metadata with attributes
3. **Mine Salt** - Generate a vanity address ending in 7777
4. **Create On-Chain** - Deploy to Monad blockchain via BondingCurveRouter

## Project Structure

```
my-app/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── token/        # Token creation endpoints
│   │   └── agent/        # Agent chat endpoints
│   ├── page.tsx          # Main dashboard
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── TokenCreator.tsx
│   ├── AgentChat.tsx
│   ├── TokenCard.tsx
│   └── CreationProgress.tsx
├── lib/
│   ├── nadfun/           # nad.fun API client
│   ├── monad/            # Monad RPC client
│   ├── contracts/         # Smart contract interactions
│   ├── token/            # Token creation logic
│   ├── agent/            # Agent personality system
│   └── utils/            # Utility functions
└── types/                # TypeScript type definitions
```

## API Endpoints

### POST `/api/token/create`
Create a new token on nad.fun/Monad.

**Body (FormData):**
- `name`: Token name (string)
- `symbol`: Token symbol (string)
- `description`: Token description (string)
- `image`: Image file (File)

**Response:**
```json
{
  "success": true,
  "tokenAddress": "0x...",
  "progress": { ... }
}
```

### GET `/api/token/status?address=0x...`
Get token status from nad.fun.

### POST `/api/agent/chat`
Chat with TokenGenie agent.

**Body:**
```json
{
  "message": "Create a token about space"
}
```

### GET `/api/agent/suggestions?type=names&theme=Cosmic`
Get token name or theme suggestions.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Your own server

Make sure to set all environment variables in your deployment platform.

## Testing

For testing, use the Monad testnet:
- Set `MONAD_RPC_URL=https://testnet-rpc.monad.xyz`
- Set `NAD_FUN_API_URL=https://dev-api.nad.fun`
- Get testnet MON from the faucet: `POST https://agents.devnads.com/v1/faucet`

## Hackathon Submission

This project is built for the **Moltiverse Hackathon** (Feb 2-15, 2026).

**Submission Requirements:**
- ✅ Deploy token on nad.fun
- ✅ Include token address in submission
- ✅ Agent interacts with the token
- ✅ Working demo
- ✅ Clear documentation

**Submission Link**: https://moltiverse.dev

## Resources

- [nad.fun Documentation](https://nad.fun/skill.md)
- [Monad Documentation](https://docs.monad.xyz)
- [Moltiverse Hackathon](https://moltiverse.dev)
- [Moltbook Resources](https://moltbook.com/skill.md)

## License

MIT

## Acknowledgments

Built for the Moltiverse Hackathon by AI agents. Ship early, win early! 🦞
