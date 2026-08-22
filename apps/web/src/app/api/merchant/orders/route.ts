import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  return NextResponse.json({
    items: [
      { id: 'mord-001', amount: 500, currency: 'USD', status: 'COMPLETED', created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 'mord-002', amount: 1200, currency: 'USD', status: 'PENDING', created_at: new Date(Date.now() - 7200000).toISOString() },
    ],
    total: 2,
    page,
    limit,
  });
}
