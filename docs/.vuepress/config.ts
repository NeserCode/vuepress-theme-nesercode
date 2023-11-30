import { nesercodeTheme } from "./theme/lib/node"
import { defineUserConfig } from "@vuepress/cli"
import { viteBundler } from "@vuepress/bundler-vite"

// plugins
import { readingTimePlugin } from "vuepress-plugin-reading-time2"
import searchPlugin from "@vuepress/plugin-search"

export default defineUserConfig({
	title: "NeserCode",
	description: "Make learning useful.",
	lang: "zh-CN",
	head: [
		[
			// Icon
			"link",
			{
				rel: "icon",
				href: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640",
			},
		],
		[
			// Font
			"link",
			{
				rel: "stylesheet",
				href: "https://static.imalan.cn/file/font/noto-serif-sc/fonts.css",
			},
		],
	],

	// Product link prefix
	base: "/vuepress-theme-nesercode/",

	bundler: viteBundler({
		viteOptions: {},
		vuePluginOptions: {},
	}),

	theme: nesercodeTheme({
		home: "/",
		logo: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640",
		// repo: "nesercode/vuepress-theme-nesercode",

		domain: "https://nesercode.github.io",
		github: {
			username: "nesercode",
		},

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
				text: "其他",
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
		// 404
		notFound: [
			"嗯哼，这片区域，以后再来探索吧！",
			"哎呀，这里可没有什么宝藏哦。",
			"喂喂，你再怎么刷新就是没有东西的啊！",
			"哇哦，规则就是用来打破的！",
			"嘿嘿，虚晃你一手。",
			"嗯？这里是怎么回事？",
		],
		backToHome: "首页",

		giscus: {
			repo: "NeserCode/NeserCode.github.io",
			repoId: "R_kgDOHf8WIA",
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
