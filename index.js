const path = require('path');

// Theme API.
module.exports = (options, ctx) => ({
  // 继承默认主题
  extend: '@vuepress/theme-default',
  alias () {
    const { themeConfig, siteConfig } = ctx;
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia
      || Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    );
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  }
});
