import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ balance_model: 'STANDARD', currency: 'USD' });
}
