const withPWA = require('next-pwa');
const withTM = require('next-transpile-modules')(['misc', 'server']);

/** @type {import('next').NextConfig} */
module.exports = withTM(withPWA({
  pwa: {
    dest: 'public',
    register: true,
    sw: "/sw.js",
    scope: "/"
  },
  reactStrictMode: true,
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
}))
