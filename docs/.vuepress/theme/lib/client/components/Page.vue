<script setup lang="ts">
// @ts-ignore
import PageMeta from "@theme/PageMeta.vue"
// @ts-ignore
import PageNav from "@theme/PageNav.vue"
// @ts-ignore
import Comment from "@theme/Comment.vue"
import { computed, onMounted } from "vue"
import { Ref } from "@vue/reactivity"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { useThemeLocaleData } from "../composables"
// @ts-ignore
import { pages } from "@temp/pages"

import type { PageData, PageFrontmatter } from "@vuepress/client"
import type { DefaultThemeLocaleData } from "../../shared/index.js"
import type { GitData } from "@vuepress/plugin-git"
import type { ReadingTime } from "vuepress-plugin-reading-time2"

type ExtraPageData = PageData & {
	readingTime: ReadingTime
} & {
	git: GitData
}

type ExtraPageFrontmatter = PageFrontmatter & {
	plugins?: {
		readingTime?: boolean
		comment?: boolean
		sidebarCategory?: boolean
	}
}

const page: Ref<ExtraPageData> = usePageData()
const frontmatter: Ref<ExtraPageFrontmatter> = usePageFrontmatter()
const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()

const createdTime = computed(() => {
	if (page.value.git.createdTime !== (undefined || null)) {
		if (page.value.git.createdTime !== undefined)
			return new Date(page.value.git.createdTime).toLocaleString()
	}

	let outTimeText = themeLocale.value.outTime ?? '"非法时间"'

	return frontmatter.value.date ?? outTimeText
})

// Plugins Options
function initialPluginState(keyName: string) {
	return computed(() => {
		if (typeof frontmatter.value.plugins === "undefined") return true
		else if (frontmatter.value.plugins instanceof Array) {
			let tempValue = true
			for (let i = 0; i < frontmatter.value.plugins.length; i++) {
				Object.keys(frontmatter.value.plugins[i]).forEach((key) => {
					if (key === keyName && frontmatter.value.plugins)
						tempValue = frontmatter.value.plugins[i][key]
				})
			}
			return tempValue
		} else return !(frontmatter.value.plugins[keyName] === false)
	})
}

const isOpenSdiebarCategory = initialPluginState("sidebarCategory")
const tocOptions = {
	containerTag: "nav",
	containerClass: "toc-main",
	listClass: "vuepress-toc-list",
	itemClass: "vuepress-toc-item",
	linkTag: "a",
	linkClass: "vuepress-toc-link",
	linkActiveClass: "active",
	linkChildrenActiveClass: "active",
}

const isOpenReadingTime = initialPluginState("readingTime")

const isOpenComment = initialPluginState("comment")
const isExistOption = computed(() => themeLocale.value.giscus !== undefined)

onMounted(() => {
	console.log(page.value, pages)
})
</script>

<template>
	<main class="page">
		<div class="main-custom">
			<slot name="top" />

			<div class="theme-default-content">
				<h1 class="page-title-custom">{{ page.title }}</h1>
				<div class="page-header">
					<span class="reading-time-main" v-if="isOpenReadingTime">
						<span class="reading-time">
							📖 共 {{ page.readingTime.words }} 字，预计需要
							{{ page.readingTime.minutes }} 分钟
						</span>
						<span class="created-time" title="Created Time">
							写于 {{ createdTime }}
						</span>
					</span>
				</div>
				<slot name="content-top" />

				<div class="content-custom">
					<Content />
				</div>

				<slot name="content-bottom" />
			</div>

			<PageMeta />

			<PageNav />

			<slot name="bottom" />

			<Comment
				:options="themeLocale.giscus"
				v-if="isOpenComment && isExistOption"
			/>
		</div>
		<aside class="sidebar-custom">
			<Toc :options="tocOptions" v-if="isOpenSdiebarCategory" />
			<slot name="sidebar-custom" />
		</aside>
	</main>
</template>
