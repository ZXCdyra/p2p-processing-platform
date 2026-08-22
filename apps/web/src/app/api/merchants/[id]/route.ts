import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, email: 'merchant@example.com', active: true });
}

export async function POST(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, locked: true });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, locked: false });
}
