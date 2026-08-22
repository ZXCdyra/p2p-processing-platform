import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'Monobank', code: 'MONO', type: 'BANK', active: true, country_code: 'UA' },
      { id: '2', name: 'PrivatBank', code: 'PRIVAT', type: 'BANK', active: true, country_code: 'UA' },
    ],
    total: 2,
  });
}
