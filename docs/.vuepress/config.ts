import { nesercodeTheme } from "./theme/lib/node"

// plugins
import { readingTimePlugin } from "vuepress-plugin-reading-time2"

export default {
	title: "✨NeserCode",
	description: "NeserCode's Blog",
	lang: "zh-CN",
	head: [
		[
			// ICON
			"link",
			{ rel: "icon", href: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640" },
		],
	],

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
				text: "时",
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

		// theme locales
		// contributors: false,
		contributorsText: "作者",
		lastUpdatedText: "最近更新于",
		outTime: "时间长河中某处",
	}),

	plugins: [readingTimePlugin({ wordPerMinute: 200 })],
}
