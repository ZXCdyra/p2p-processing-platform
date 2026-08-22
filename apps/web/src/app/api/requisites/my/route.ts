import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    items: [
      { id: 'req-001', group_id: 'rg-001', method: 'Monobank', account: '***1234', currency: 'UAH', active: true, created_at: '2024-01-15T10:00:00Z' },
      { id: 'req-002', group_id: 'rg-001', method: 'PrivatBank', account: '***5678', currency: 'UAH', active: true, created_at: '2024-01-16T12:00:00Z' },
      { id: 'req-003', group_id: 'rg-002', method: 'Wise', account: '***9012', currency: 'EUR', active: false, created_at: '2024-02-20T14:00:00Z' },
    ],
    total: 3,
  });
}
