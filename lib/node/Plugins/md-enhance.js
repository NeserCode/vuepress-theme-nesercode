import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'

export const getMdEnhancePlugin = () => mdEnhancePlugin({
  footnote: true,
  sub: true,
  sup: true,
  vPre: true,
  taskList: true,
  tabs: true,
  codetabs: true,
  mark: true,
  mathjax: true,
  mermaid: true,
  flowchart: true,
  echarts: true,
  chart: true,
})