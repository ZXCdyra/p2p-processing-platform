export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email: string; password: string };

  // Validate credentials
  if (!email || !password) {
    return new Response(
      JSON.stringify({ code: 'VALIDATION_ERROR', message: 'Email and password are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Check for demo credentials
  if (password !== 'password123' && email !== 'test@test.com') {
    return new Response(
      JSON.stringify({ code: 'AUTH_FAILED', message: 'Invalid email or password' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Determine role based on email
  let role = 'TRADER';
  if (email.includes('admin')) role = 'ADMIN';
  else if (email.includes('owner')) role = 'OWNER';
  else if (email.includes('merchant')) role = 'MERCHANT';
  else if (email.includes('payout')) role = 'PAYOUT_TRADER';

  const userId = email.split('@')[0] || 'user';
  const now = Date.now();
  const accessToken = createJwt({
    sub: `usr-${userId}`,
    id: `usr-${userId}`,
    email,
    role,
    exp: Math.floor(now / 1000) + 3600, // 1 hour
    iat: Math.floor(now / 1000),
  });

  const refreshToken = createJwt({
    sub: `usr-${userId}`,
    role,
    exp: Math.floor(now / 1000) + 604800, // 7 days
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
  const signature = Buffer.from(`signature-${header}.${body}`).toString('base64url');
  return `${header}.${body}.${signature}`;
}
