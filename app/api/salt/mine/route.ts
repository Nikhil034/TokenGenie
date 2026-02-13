import { NextRequest, NextResponse } from 'next/server';
import { nadFunApi } from '@/lib/nadfun/api';
import { handleApiError } from '@/lib/utils/errors';

export async function POST(request: NextRequest) {
  try {
    const { salt, address } = await nadFunApi.mineSalt();

    return NextResponse.json({
      success: true,
      salt,
      address,
    });
  } catch (error: any) {
    console.error('Salt mining error:', error);
    return NextResponse.json(
      {
        error: handleApiError(error),
        message: error.message,
      },
      { status: 500 }
    );
  }
}
