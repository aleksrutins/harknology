/** @type {import('next').NextConfig} */
const withPreact = require('next-plugin-preact');
module.exports = withPreact({
  reactStrictMode: true,
  swcMinify: true,
  // webpack5: true,
  /**
   *
   * @param {import('webpack').Configuration} config
   * @param {*} options
   * @returns
   */
  webpack(config, options) {
    return config;
  }
});
