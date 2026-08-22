import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'Monobank', code: 'MONO', active: true },
      { id: '2', name: 'PrivatBank', code: 'PRIVAT', active: true },
      { id: '3', name: 'Oschadbank', code: 'OSCHAD', active: true },
    ],
    total: 3,
  });
}
