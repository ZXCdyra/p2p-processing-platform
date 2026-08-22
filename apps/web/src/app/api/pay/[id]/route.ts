import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({
    id,
    amount: 500,
    currency: 'USD',
    status: 'PENDING',
    merchant_id: 'merchant-001',
    created_at: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({
    id,
    status: 'CONFIRMED',
    confirmed_at: new Date().toISOString(),
  });
}
