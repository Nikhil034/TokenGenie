import { NextRequest, NextResponse } from 'next/server';
import { nadFunApi } from '@/lib/nadfun/api';
import { handleApiError } from '@/lib/utils/errors';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      );
    }

    const status = await nadFunApi.getTokenStatus(address);

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (error: any) {
    console.error('Token status error:', error);
    return NextResponse.json(
      {
        error: handleApiError(error),
        message: error.message,
      },
      { status: 500 }
    );
  }
}
