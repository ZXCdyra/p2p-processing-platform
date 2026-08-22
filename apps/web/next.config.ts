import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@p2p/shared': path.join(__dirname, '../../packages/shared/src'),
      '@p2p/config': path.join(__dirname, '../../packages/config/src'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
