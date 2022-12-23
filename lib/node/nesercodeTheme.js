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

import { useGitPlugin } from './utils/plugin.js'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@nesercode/vuepress-neser-back-to-top'
import { blogPlugin } from 'vuepress-plugin-blog2'
import { containerPlugin } from '@vuepress/plugin-container'
import { downToCommentPlugin } from '@nesercode/vuepress-neser-down-to-comment'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { searchPlugin } from "@vuepress/plugin-search"

import { viteBundler } from "@vuepress/bundler-webpack"
import { webpackBundler } from '@vuepress/bundler-webpack'
import tailwindcssConfig from './utils/tailwind.config.cjs'

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
            // workaround for https://github.com/vitejs/vite/issues/7621
            '@nesercode/vuepress-theme-nesercode': path.resolve(__dirname, '../client/index.js'),
        },
        onInitialized(app) {
            if (app.options.bundler.name === '@vuepress/bundler-vite') {
                app.options.bundler = viteBundler({
                    viteOptions: {
                        css: {
                            postcss: {
                                plugins: [
                                    tailwindcss(tailwindcssConfig),    // 如果这里传入的是undefined就会出现如图报错
                                    autoprefixer({}),
                                ]
                            }
                        },
                    }
                })
            } else {
                app.options.bundler = webpackBundler({
                    postcss: {
                        postcssOptions: {
                            plugins: [
                                ['tailwindcss', tailwindcssConfig],
                                ['autoprefixer', {}],
                            ]
                        },
                    },
                })
            }
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
                ? activeHeaderLinksPlugin({
                    headerLinkSelector: 'a.sidebar-item',
                    headerAnchorSelector: '.header-anchor',
                    // should greater than page transition duration
                    delay: 300,
                    offset: 5,
                })
                : [],
            // plugin-back-to-top
            themePlugins.backToTop !== false ? backToTopPlugin() : [],
            // plugin-down-to-comment
            themePlugins.downToComment !== false ? downToCommentPlugin() : [],
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
                ? externalLinkIconPlugin(
                    {
                        locales: Object.entries(localeOptions.locales || {}).reduce((result, [key, value]) => {
                            result[key] = {
                                openInNewWindow: value.openInNewWindow ?? localeOptions.openInNewWindow,
                            };
                            return result;
                        }, {}),
                    }
                )
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
            themePlugins.blog !== false ? blogPlugin({
                filter: ({ filePathRelative, frontmatter }) => {
                    // 舍弃那些不是从 Markdown 文件生成的页面
                    if (!filePathRelative) return false;

                    // 舍弃 `archives` 文件夹的页面
                    if (filePathRelative.startsWith("archives/")) return false;

                    // 舍弃 `docs` 文件夹的页面
                    if (filePathRelative.startsWith("docs/")) return false;

                    // 舍弃那些没有使用默认布局的页面
                    if (frontmatter.home || frontmatter.layout) return false;

                    return true;
                },

                getInfo: (page) => {
                    const { excerpt, frontmatter, title } = page
                    // 获取页面信息
                    const info = {
                        author: frontmatter.author || "",
                        categories: frontmatter.categories || [],
                        date: frontmatter.date ? new Date(frontmatter.date) : new Date(page.data.git?.createdTime),
                        tags: frontmatter.tags || frontmatter.tag || [],
                        excerpt,
                        title
                    };

                    return info;
                },
                category: [
                    {
                        key: "tag",
                        getter: ({ frontmatter }) => (frontmatter.tag || []),
                        path: "/tag/",
                        layout: "TagPage",
                        frontmatter: (path) => ({ title: "类", localePath: path }),
                        itemPath: "/tag/:name/",
                        itemLayout: "TagPage",
                        itemFrontmatter: (name, path) => ({ title: `${name} 标签`, localePath: path }),
                    },
                ],
                type: [
                    {
                        key: "timeLine",
                        filter: (page) => page.data.path.startsWith("/blog/"),
                        sorter: (pageA, pageB) => new Date(pageB.data.git?.createdTime).getTime() - new Date(pageA.data.git?.createdTime).getTime(),
                        path: "/timeLine/",
                        layout: "TimeLine",
                        frontmatter: (path) => ({
                            title: "时",
                            localePath: path,
                            readingLine: false
                        }),
                    }
                ],
            }) : [],
            // @vuepress/plugin-theme-data
            themeDataPlugin({ themeData: localeOptions }),
            mdEnhancePlugin({
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
            }),
            searchPlugin({
                hotKeys: [
                    {
                        key: "s",
                        ctrl: true,
                    }
                ],
                isSearchable: (page) => {
                    return page.path.startsWith("/blog/")
                }
            }),
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
