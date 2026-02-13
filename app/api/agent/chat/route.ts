import { NextRequest, NextResponse } from 'next/server';
import { agentPersonality } from '@/lib/agent/personality';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get response from agent personality
    const response = agentPersonality.respondToUser(message);

    // If user is asking for suggestions, include them
    let suggestions: string[] = [];
    if (message.toLowerCase().match(/suggest|idea|name|theme/)) {
      suggestions = agentPersonality.suggestTokenNames();
    }

    return NextResponse.json({
      success: true,
      response,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Agent chat error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
