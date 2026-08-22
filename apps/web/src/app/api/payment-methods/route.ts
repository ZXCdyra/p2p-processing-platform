import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'Monobank', code: 'MONOBANK', type: 'BANK_TRANSFER', active: true, currencies: ['UAH'] },
      { id: '2', name: 'PrivatBank', code: 'PRIVATBANK', type: 'BANK_TRANSFER', active: true, currencies: ['UAH'] },
      { id: '3', name: 'Wise', code: 'WISE', type: 'BANK_TRANSFER', active: true, currencies: ['USD', 'EUR'] },
      { id: '4', name: 'Stripe', code: 'STRIPE', type: 'CARD', active: true, currencies: ['USD', 'EUR'] },
    ],
    total: 4,
  });
}
