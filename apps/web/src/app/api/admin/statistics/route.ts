import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '7d';

  return NextResponse.json({
    period,
    total_volume: 98765.4,
    total_orders: 432,
    success_rate: 96.2,
    avg_processing_time_sec: 42,
    volume_by_method: [
      { method: 'MONOBANK', volume: 45000, orders: 150 },
      { method: 'PRIVATBANK', volume: 32000, orders: 98 },
      { method: 'WISE', volume: 21765.4, orders: 64 },
    ],
    volume_by_currency: [
      { currency: 'UAH', volume: 65000, orders: 200 },
      { currency: 'USD', volume: 33765.4, orders: 132 },
    ],
  });
}
