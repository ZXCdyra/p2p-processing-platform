import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'Ukraine', code: 'UA', active: true },
      { id: '2', name: 'Poland', code: 'PL', active: true },
    ],
    total: 2,
  });
}
