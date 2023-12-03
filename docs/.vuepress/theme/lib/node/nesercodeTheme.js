import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { containerPlugin } from '@vuepress/plugin-container';
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { palettePlugin } from '@vuepress/plugin-palette';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { themeDataPlugin } from '@vuepress/plugin-theme-data';
import { tocPlugin } from '@vuepress/plugin-toc';
import { getBlogPlugin } from './plugins/blog'
import { fs, getDirname, path } from '@vuepress/utils';
import { searchPlugin } from '@vuepress/plugin-search'
import { useDataHelper } from 'vuepress-plugin-data-helper'

import { upAndDownPlugin } from '@nesercode/vuepress-plugin-up-and-down'

import { addViteSsrNoExternal } from "vuepress-shared"

import {
    assignDefaultLocaleOptions,
    resolveContainerPluginOptions,
    useGitPlugin
} from './utils/index.js';

const __dirname = getDirname(import.meta.url);

export const nesercodeTheme = ({ themePlugins = {}, ...localeOptions } = {}) => (app) => {
    assignDefaultLocaleOptions(localeOptions);
    useGitPlugin(app, {
        createdTime: true,
        updatedTime: localeOptions.lastUpdated !== false,
        contributors: localeOptions.contributors !== false,
    })

    return {
        name: '@nesercode/vuepress-theme-nesercode',
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
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        extendsBundlerOptions: (config, app) => {
            addViteSsrNoExternal(config, app, "vuepress-shared")
        },
        extendsPage: (page) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative;
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title;
        },
        plugins: [
            // @vuepress/plugin-active-header-link
            themePlugins.activeHeaderLinks !== false
                ? activeHeaderLinksPlugin({
                    headerLinkSelector: 'a.sidebar-item',
                    headerAnchorSelector: '.header-anchor',
                    // should greater than page transition duration
                    delay: 500,
                })
                : [],
            // @vuepress/plugin-back-to-top
            themePlugins.backToTop !== false ? backToTopPlugin() : [],
            // Up and Down
            themePlugins.upAndDown !== false ? upAndDownPlugin() : [],
            // @vuepress/plugin-search
            themePlugins.search !== false ? searchPlugin() : [],
            // @vuepress/plugin-container
            themePlugins.container?.tip !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
                : [],
            themePlugins.container?.warning !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'warning'))
                : [],
            themePlugins.container?.danger !== false
                ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'danger'))
                : [],
            themePlugins.container?.details !== false
                ? containerPlugin({
                    type: 'details',
                    before: (info) => `<details class="custom-container details">${info ? `<summary>${info}</summary>` : ''}\n`,
                    after: () => '</details>\n',
                })
                : [],
            themePlugins.container?.codeGroup !== false
                ? containerPlugin({
                    type: 'code-group',
                    before: () => `<CodeGroup>\n`,
                    after: () => '</CodeGroup>\n',
                })
                : [],
            themePlugins.container?.codeGroupItem !== false
                ? containerPlugin({
                    type: 'code-group-item',
                    before: (info) => `<CodeGroupItem title="${info}">\n`,
                    after: () => '</CodeGroupItem>\n',
                })
                : [],
            // @vuepress/plugin-external-link-icon
            themePlugins.externalLinkIcon !== false
                ? externalLinkIconPlugin({
                    locales: Object.entries(localeOptions.locales || {}).reduce((result, [key, value]) => {
                        result[key] = {
                            openInNewWindow: value.openInNewWindow ?? localeOptions.openInNewWindow,
                        };
                        return result;
                    }, {}),
                })
                : [],
            // @vuepress/plugin-medium-zoom
            themePlugins.mediumZoom !== false
                ? mediumZoomPlugin({
                    selector: '.theme-default-content > img, .theme-default-content :not(a) > img',
                    zoomOptions: {},
                    // should greater than page transition duration
                    delay: 300,
                })
                : [],
            // @vuepress/plugin-nprogress
            themePlugins.nprogress !== false ? nprogressPlugin() : [],
            // @vuepress/plugin-palette
            palettePlugin({ preset: 'sass' }),
            // @vuepress/plugin-prismjs
            themePlugins.prismjs !== false ? prismjsPlugin() : [],
            // @vuepress/plugin-theme-data
            themeDataPlugin({ themeData: localeOptions }),
            // Toc plugin [@vuepress/plugin-toc] for sidebar category
            tocPlugin(),
            // Blog plugin
            getBlogPlugin(),
            // Data Helper
            useDataHelper(localeOptions.helperOptions),
        ],
    };
};
