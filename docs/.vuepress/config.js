import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defaultTheme } from './theme/node/index.js'
import { path } from '@vuepress/utils'

import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value.
  base: '/',

  // site-level locales config
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'NeserCode',
      description: 'Vuepress-theme-NeserCode',
    }
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  // configure default theme
  theme: defaultTheme({
    logo: './images/logo.jpg',
    repo: 'nesercode/vuepress-theme-nesercode',
    docsDir: 'docs',

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },
  }),

  // use plugins
  plugins: [
    activeHeaderLinksPlugin({
      delay: 50,
      offset: 0
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),

    isProd ? shikiPlugin() : []
  ],
})