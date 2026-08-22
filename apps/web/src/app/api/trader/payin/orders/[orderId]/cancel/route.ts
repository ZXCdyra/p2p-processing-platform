import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { orderId } = await request.nextUrl.params;
  return NextResponse.json({ id: orderId, status: 'CANCELLED' });
}
