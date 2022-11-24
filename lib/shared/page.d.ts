import type { GitPluginPageData } from "@vuepress/plugin-git"
import type { NavLink, SidebarConfig } from "./nav.js"
// import type { themeData } from '../../plugin/themePlugin-nesercode/lib/share'

export interface DefaultThemePageData extends GitPluginPageData {
	filePathRelative: string | null
}
export interface DefaultThemePageFrontmatter {
	home?: boolean
	about?: boolean
	navbar?: boolean
	pageClass?: string
}
export interface DefaultThemeHomePageFrontmatter
	extends DefaultThemePageFrontmatter {
	home: true
	heroImage?: string
	heroImageDark?: string
	heroAlt?: string
	heroText?: string | null
	tagline?: string | null
	actions?: {
		text: string
		link: string
		type?: "primary" | "secondary"
	}[]
	features?: {
		title: string
		details: string
	}[]
	footer?: string
	footerHtml?: boolean
}
export interface DefaultThemeNormalPageFrontmatter
	extends DefaultThemePageFrontmatter {
	home?: false
	editLink?: boolean
	editLinkPattern?: string
	lastUpdated?: boolean
	contributors?: boolean
	sidebar?: "auto" | false | SidebarConfig
	sidebarDepth?: number
	tag: string[]
	prev?: string | NavLink
	next?: string | NavLink
}

export interface PageHeader {
	level: number
	title: string
	slug: string
	children: PageHeader[]
}
