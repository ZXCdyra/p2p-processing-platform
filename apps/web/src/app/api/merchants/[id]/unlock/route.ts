import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, locked: false });
}
