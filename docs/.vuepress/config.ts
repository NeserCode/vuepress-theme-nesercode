import { nesercodeTheme } from "./theme/lib/node"
import { defineUserConfig } from "@vuepress/cli"
import { viteBundler } from "@vuepress/bundler-vite"

// plugins
import { readingTimePlugin } from "vuepress-plugin-reading-time2"

export default defineUserConfig({
	title: "✨NeserCode",
	description: "NeserCode's Blog",
	lang: "zh-CN",
	head: [
		[
			// ICON
			"link",
			{
				rel: "icon",
				href: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640",
			},
		],
	],

	base: "/vuepress-theme-nesercode/",

	bundler: viteBundler({
		viteOptions: {},
		vuePluginOptions: {},
	}),

	theme: nesercodeTheme({
		home: "/",
		logo: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640",
		navbar: [
			{
				text: "关于",
				activeMatch: "^/about/",
				link: "/blog/about/aboutme.md",
			},
			{
				text: "时间线",
				activeMatch: "^/timeLine/",
				link: "/timeLine/",
			},
			{
				text: "类",
				activeMatch: "^/tag/",
				link: "/tag/",
			},
			{
				text: "起步",
				children: [
					{
						text: "Markdown",
						link: "/blog/guide/markdown.md",
						activeMatch: "^/blog/guide/",
					},
					{ text: "$404", link: "/blog/guide/wtf" },
				],
			},
		],
		themePlugins: {
			// Disable back-to-top
			backToTop: false,
		},

		// Data helper options
		helperOptions: {
			isTempPages: true,
			pagesStartWith: "/blog/",
			// passwordSalt: "salt",
		},

		// theme locales
		// contributors: false,
		contributorsText: "作者",
		lastUpdatedText: "最近更新于",
		outTime: "时间长河中某处",

		giscus: {
			repo: "NeserCode/NeserCode.github.io",
			repoId: "R_kgDOHf8WIA=",
			category: "General",
			categoryId: "DIC_kwDOHf8WIM4CRa-j",
			mapping: "title",
			strict: "1",
			theme: "light",
			darkTheme: "dark_dimmed",
			reactionsEnabled: "1",
			inputPosition: "top",
			language: "zh-CN",
			loading: "lazy",
		},

		footer: {
			year: "2022 - 2024",
			themeInfoDisplay: true,
			copyRight:
				"<a target='_blank' href='https://github.com/Nesercode'>NeserCode</a>",
			footerLinks: [
				{
					title: "GitHub",
					link: "https://github.com",
				},
				{
					title: "Gitee",
					link: "https://gitee.com",
				},
				{
					title: "Bilibili",
					link: "https://space.bilibili.com",
				},
			],
		},
	}),

	plugins: [readingTimePlugin({ wordPerMinute: 200 })],
})
