import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({
    id,
    name: 'Requisite Details',
    method: 'Monobank',
    account: '***1234',
    currency: 'UAH',
    active: true,
    created_at: '2024-01-15T10:00:00Z',
  });
}

export async function POST(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, active: true });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.nextUrl.params;
  return NextResponse.json({ id, active: false });
}
