import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 'dir-001', name: 'UAH → USD', from: 'UAH', to: 'USD', active: true },
      { id: 'dir-002', name: 'USD → EUR', from: 'USD', to: 'EUR', active: true },
    ],
    total: 2,
  });
}
