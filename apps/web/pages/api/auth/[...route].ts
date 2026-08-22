import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email?: string;
  password?: string;
}

interface RefreshRequest {
  refreshToken?: string;
}

interface Verify2FARequest {
  code?: string;
  tempToken?: string;
}

function generateToken(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const expiry = Math.floor(Date.now() / 1000) + 3600;
  const body = Buffer.from(JSON.stringify({ ...payload, exp: expiry })).toString('base64url');
  return `${header}.${body}.mock-signature-for-verification-only`;
}

function generateRefreshToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + 604800; // 7 days
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ exp: expiry, type: 'refresh' })).toString('base64url');
  return `${header}.${body}.mock-refresh-signature`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { route } = req.query; // [...route] catch-all
  const method = req.method;

  // POST /api/auth/login
  if (method === 'POST' && Array.isArray(route) && route.join('/') === 'login') {
    const { email, password } = (req.body as LoginRequest) || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailLocal = email.split('@')[0] || 'user';
    const mockUser = {
      id: 'mock-' + Buffer.from(email).toString('base64url').slice(0, 8),
      email,
      role: email.includes('admin') ? 'ADMIN' : email.includes('merchant') ? 'MERCHANT' : 'TRADER',
      name: email.split('@')[0],
    };

    const accessToken = generateToken({ sub: mockUser.id, email: mockUser.email, role: mockUser.role });
    const refreshToken = generateRefreshToken();

    return res.status(200).json({
      accessToken,
      refreshToken,
      requires2FA: false,
      user: mockUser,
    });
  }

  // POST /api/auth/refresh
  if (method === 'POST' && Array.isArray(route) && route.join('/') === 'refresh') {
    const { refreshToken } = (req.body as RefreshRequest) || {};

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Validate refresh token structure (mock)
    if (!refreshToken.includes('mock-refresh-signature')) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const currentPayload = JSON.parse(
      Buffer.from(refreshToken.split('.')[1], 'base64url').toString()
    );

    // Extract user info from stored tokens for consistency
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    let mockUser = {
      id: 'mock-user',
      email: 'user@example.com',
      role: 'TRADER',
      name: 'User',
    };

    if (storedEmail) {
      try {
        const storedPayload = JSON.parse(
          Buffer.from(storedEmail.split('.')[1], 'base64url').toString()
        );
        mockUser = {
          id: storedPayload.sub || storedPayload.id || 'mock-user',
          email: storedPayload.email || 'user@example.com',
          role: storedPayload.role || 'TRADER',
          name: storedPayload.email?.split('@')[0] || 'User',
        };
      } catch {
        // keep defaults
      }
    }

    const newAccessToken = generateToken({
      sub: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });
    const newRefreshToken = generateRefreshToken();

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }

  // POST /api/auth/2fa/verify
  if (method === 'POST' && Array.isArray(route) && route.join('/') === '2fa/verify') {
    const { code, tempToken } = (req.body as Verify2FARequest) || {};

    if (!code || code.length !== 6) {
      return res.status(400).json({ message: 'Valid 6-digit verification code is required' });
    }

    // Extract user from tempToken if present
    let mockUser = {
      id: 'mock-user',
      email: 'user@example.com',
      role: 'TRADER',
      name: 'User',
    };

    if (tempToken) {
      try {
        const payload = JSON.parse(
          Buffer.from(tempToken.split('.')[1], 'base64url').toString()
        );
        mockUser = {
          id: payload.sub || payload.id || 'mock-user',
          email: payload.email || 'user@example.com',
          role: payload.role || 'TRADER',
          name: payload.name || payload.email?.split('@')[0] || 'User',
        };
      } catch {
        // keep defaults
      }
    }

    const accessToken = generateToken({
      sub: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });
    const refreshToken = generateRefreshToken();

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: mockUser,
    });
  }

  // 404 for unknown routes
  return res.status(404).json({ message: 'Endpoint not found' });
}
