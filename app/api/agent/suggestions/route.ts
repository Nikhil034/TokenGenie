import { NextRequest, NextResponse } from 'next/server';
import { agentPersonality } from '@/lib/agent/personality';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'names';
    const theme = searchParams.get('theme') || undefined;

    let suggestions: string[] = [];

    switch (type) {
      case 'names':
        suggestions = agentPersonality.suggestTokenNames(theme);
        break;
      case 'themes':
        suggestions = agentPersonality.suggestThemes();
        break;
      default:
        suggestions = agentPersonality.suggestTokenNames(theme);
    }

    return NextResponse.json({
      success: true,
      type,
      suggestions,
    });
  } catch (error: any) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate suggestions',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
