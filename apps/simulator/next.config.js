/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['core-library'],
  basePath: '',
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    processEnv: {
      ...Object.fromEntries(Object.entries(process.env).filter(([key]) => key.includes('NEXT_PRIVATE_'))),
      TRUSTED_ORIGINS: [
        process.env.NEXT_PRIVATE_API_URL,
        process.env.NODE_ENV === 'development' && 'http://localhost:3000',
      ].filter(Boolean),
    },
  },
  webpack: config => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },
};
