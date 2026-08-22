import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, name: 'UAH → USD', from: 'UAH', to: 'USD', active: true });
}

export async function POST(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, active: !true });
}
