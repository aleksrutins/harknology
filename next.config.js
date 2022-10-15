/** @type {import('next').NextConfig} */
module.exports = {
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
}
