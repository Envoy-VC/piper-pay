await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'icons.llamao.fi',
      },
    ],
  },
};

export default config;
