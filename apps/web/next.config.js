const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: 'public/sw'
  },
  reactStrictMode: true,
  webpack5: true,
  /**
   * 
   * @param {import('webpack').Configuration} config 
   * @param {*} options 
   * @returns 
   */
  webpack(config, options) {
    return config;
  }
})
