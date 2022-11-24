import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { palettePlugin } from '@vuepress/plugin-palette';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { tocPlugin } from "@vuepress/plugin-toc"
import { copyCodePlugin } from "vuepress-plugin-copy-code2"
import { readingTimePlugin } from "vuepress-plugin-reading-time2"
import { registerComponentsPlugin } from "@vuepress/plugin-register-components"
import { themeDataPlugin } from '@vuepress/plugin-theme-data';
import { fs, getDirname, path } from '@vuepress/utils';
import { assignDefaultLocaleOptions, resolveContainerPluginOptions, } from './utils/index.js';

import {
    getActiveHeaderLinksPlugin,
    getBlogPlugin,
    getBackToTopPlugin,
    getContainerPlugin,
    getDownToCommentPlugin,
    getExternalLinkIconPlugin,
    getMediumZoomPlugin,
    getMdEnhancePlugin,
    getSearchPlugin,
} from './Plugins'
import { useGitPlugin } from './utils/plugin'

const __dirname = getDirname(import.meta.url);
export const nesercodeTheme = ({ themePlugins = {}, ...localeOptions } = {}) => (app) => {
    assignDefaultLocaleOptions(localeOptions);
    useGitPlugin(app, {
        createdTime: true,
        updatedTime: localeOptions.lastUpdated !== false,
        contributors: localeOptions.contributors !== false,
    })
    return {
        name: '@vuepress/theme-default',
        templateBuild: path.resolve(__dirname, '../../templates/build.html'),
        alias: {
            // use alias to make all components replaceable
            ...Object.fromEntries(fs
                .readdirSync(path.resolve(__dirname, '../client/components'))
                .filter((file) => file.endsWith('.vue'))
                .map((file) => [
                    `@theme/${file}`,
                    path.resolve(__dirname, '../client/components', file),
                ])),
            // workaround for https://github.com/vitejs/vite/issues/7621
            '@vuepress/theme-default/client': path.resolve(__dirname, '../client/index.js'),
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        extendsPage: (page) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative;
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title;
        },
        plugins: [
            // @vuepress/plugin-active-header-link
            themePlugins.activeHeaderLinks !== false
                ? getActiveHeaderLinksPlugin
                : [],
            // plugin-back-to-top
            themePlugins.backToTop !== false ? getBackToTopPlugin : [],
            // plugin-down-to-comment
            themePlugins.downToComment !== false ? getDownToCommentPlugin : [],
            // @vuepress/plugin-container
            themePlugins.container?.tip !== false
                ? getContainerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
                : [],
            themePlugins.container?.warning !== false
                ? getContainerPlugin(resolveContainerPluginOptions(localeOptions, 'warning'))
                : [],
            themePlugins.container?.danger !== false
                ? getContainerPlugin(resolveContainerPluginOptions(localeOptions, 'danger'))
                : [],
            themePlugins.container?.details !== false
                ? getContainerPlugin({
                    type: 'details',
                    before: (info) => `<details class="custom-container details">${info ? `<summary>${info}</summary>` : ''}\n`,
                    after: () => '</details>\n',
                })
                : [],
            themePlugins.container?.codeGroup !== false
                ? getContainerPlugin({
                    type: 'code-group',
                    before: () => `<CodeGroup>\n`,
                    after: () => '</CodeGroup>\n',
                })
                : [],
            themePlugins.container?.codeGroupItem !== false
                ? getContainerPlugin({
                    type: 'code-group-item',
                    before: (info) => `<CodeGroupItem title="${info}">\n`,
                    after: () => '</CodeGroupItem>\n',
                })
                : [],
            // @vuepress/plugin-external-link-icon
            themePlugins.externalLinkIcon !== false
                ? getExternalLinkIconPlugin(localeOptions)
                : [],
            // @vuepress/plugin-medium-zoom
            themePlugins.mediumZoom !== false
                ? getMediumZoomPlugin()
                : [],
            // @vuepress/plugin-nprogress
            themePlugins.nprogress !== false ? nprogressPlugin() : [],
            // @vuepress/plugin-palette
            palettePlugin({ preset: 'sass' }),
            // @vuepress/plugin-prismjs
            themePlugins.prismjs !== false ? prismjsPlugin() : [],
            themePlugins.blog !== false ? getBlogPlugin() : [],
            // @vuepress/plugin-theme-data
            themeDataPlugin({ themeData: localeOptions }),
            getMdEnhancePlugin,
            getSearchPlugin,
            tocPlugin(),
            copyCodePlugin({
                showInMobile: true,
                duration: 1200,
                locales: {
                    "/": {
                        hint: "已复制",
                        copy: "复制代码",
                    },
                },
            }),
            readingTimePlugin({}),
            registerComponentsPlugin({
                componentsDir: path.resolve(__dirname, "./components"),
            }),
        ],
    };
};
