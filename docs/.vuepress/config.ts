import { defaultTheme } from "./theme/lib/node"

// plugins
import { readingTimePlugin } from "vuepress-plugin-reading-time2"

export default {
	title: "NeserCode",
	description: "NeserCode's Blog",
	lang: "zh-CN",
	head: [
		[
			// ICON
			"link",
			{ rel: "icon", href: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640" },
		],
	],

	theme: defaultTheme({
		home: "/",
		logo: "https://q1.qlogo.cn/g?b=qq&nk=510648363&s=640",
		navbar: [
			{
				text: "关于",
				activeMatch: "^/about/",
				link: "/blog/about/aboutme.md",
			},
			{
				text: "起步",
				children: [
					{
						text: "Markdown",
						link: "/blog/guide/markdown.md",
						activeMatch: "^/blog/guide/",
					},
					{ text: "$404", link: "/blog/guide/whatthefuck" },
				],
			},
		],
		themePlugins: {
			// to-do: Disable back-to-top
			backToTop: false,
		},
	}),

	plugins: [readingTimePlugin({ wordPerMinute: 200 })],
}
