import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'UAH Bank Transfer', code: 'UAH_BANK', active: true },
      { id: '2', name: 'USD Wire', code: 'USD_WIRE', active: true },
      { id: '3', name: 'EUR SEPA', code: 'EUR_SEPA', active: true },
    ],
    total: 3,
  });
}
