import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: '1', name: 'Ukraine', code: 'UA', active: true },
      { id: '2', name: 'Poland', code: 'PL', active: true },
      { id: '3', name: 'Germany', code: 'DE', active: true },
      { id: '4', name: 'United States', code: 'US', active: true },
    ],
    total: 4,
  });
}
