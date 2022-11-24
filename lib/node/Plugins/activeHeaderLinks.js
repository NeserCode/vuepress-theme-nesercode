import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'

export const getActiveHeaderLinksPlugin = activeHeaderLinksPlugin({
    headerLinkSelector: 'a.sidebar-item',
    headerAnchorSelector: '.header-anchor',
    // should greater than page transition duration
    delay: 300,
    offset: 5,
})