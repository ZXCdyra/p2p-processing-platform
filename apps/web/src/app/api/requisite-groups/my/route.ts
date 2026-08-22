import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    items: [
      { id: 'rg-001', name: 'UAH Personal', is_root: true, child_count: 2, created_at: '2024-01-15T10:00:00Z' },
      { id: 'rg-002', name: 'EUR Business', is_root: true, child_count: 1, created_at: '2024-02-20T14:00:00Z' },
    ],
    total: 2,
  });
}
