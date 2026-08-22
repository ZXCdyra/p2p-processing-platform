import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({
    id,
    email: 'trader@example.com',
    role: 'TRADER',
    active: true,
    created_at: '2024-01-15T10:00:00Z',
  });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, deleted: true });
}
