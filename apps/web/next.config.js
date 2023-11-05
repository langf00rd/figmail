module.exports = {
   reactStrictMode: true,
   transpilePackages: ["ui"],
   experimental: {
      swcPlugins: [["@swc-jotai/react-refresh", {}]],
   },
};
