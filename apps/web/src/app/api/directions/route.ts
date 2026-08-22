import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'UAH → USD', currency_from: 'UAH', currency_to: 'USD', active: true },
      { id: '2', name: 'USD → EUR', currency_from: 'USD', currency_to: 'EUR', active: true },
      { id: '3', name: 'EUR → UAH', currency_from: 'EUR', currency_to: 'UAH', active: true },
    ],
    total: 3,
  });
}
