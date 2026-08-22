export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email: string; password: string };

  if (!email) {
    return new Response(
      JSON.stringify({ code: 'VALIDATION_ERROR', message: 'Email is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Accept any email + any password (including empty) for demo
  const role = email.includes('admin') ? 'ADMIN' 
    : email.includes('merchant') ? 'MERCHANT' 
    : email.includes('owner') ? 'OWNER' 
    : email.includes('payout') ? 'PAYOUT_TRADER' 
    : 'TRADER';

  const userId = email.split('@')[0] || 'user';
  const now = Date.now();
  const accessToken = createJwt({
    sub: `usr-${userId}`,
    id: `usr-${userId}`,
    email,
    role,
    exp: Math.floor(now / 1000) + 3600,
    iat: Math.floor(now / 1000),
  });

  const refreshToken = createJwt({
    sub: `usr-${userId}`,
    role,
    exp: Math.floor(now / 1000) + 604800,
    iat: Math.floor(now / 1000),
  });

  return new Response(
    JSON.stringify({
      accessToken,
      refreshToken,
      user: {
        id: `usr-${userId}`,
        email,
        role,
        name: email.split('@')[0],
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
}

function createJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = Buffer.from(`sig-${header}.${body}`).toString('base64url');
  return `${header}.${body}.${signature}`;
}
