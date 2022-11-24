import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'

export function getMediumZoomPlugin() {
  return mediumZoomPlugin({
    selector: '.theme-default-content > img, .theme-default-content :not(a) > img',
    zoomOptions: {},
    // should greater than page transition duration
    delay: 300,
  })
}