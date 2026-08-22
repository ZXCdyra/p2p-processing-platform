import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 'tr-001', email: 'trader1@example.com', role: 'TRADER', active: true, created_at: '2024-01-15T10:00:00Z' },
      { id: 'tr-002', email: 'trader2@example.com', role: 'TRADER', active: true, created_at: '2024-02-20T14:00:00Z' },
    ],
    total: 2,
  });
}
