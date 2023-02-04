<script setup lang="ts">
// @ts-ignore
import PageMeta from "@theme/PageMeta.vue"
// @ts-ignore
import PageNav from "@theme/PageNav.vue"
import { computed } from "vue"
import { Ref } from "@vue/reactivity"
import { usePageData, usePageFrontmatter } from "@vuepress/client"

import { PageData, PageFrontmatter } from "@vuepress/client"
import { GitData } from "@vuepress/plugin-git"
import { ReadingTime } from "vuepress-plugin-reading-time2"
import { isArray } from "@vue/shared"

type ExtraPageData = PageData & {
	readingTime: ReadingTime
} & {
	git: GitData
}

type ExtraPageFrontmatter = PageFrontmatter & {
	plugins?: {
		readingTime?: boolean
		readingLine?: boolean
		comment?: boolean
		sidebarCategory?: boolean
	}
}

const page: Ref<ExtraPageData> = usePageData()
const frontmatter: Ref<ExtraPageFrontmatter> = usePageFrontmatter()

const createdTime = computed(() => {
	if (page.value.git.createdTime !== undefined) {
		return new Date(page.value.git.createdTime).toLocaleString()
	}
	return frontmatter.value.date ?? "[非法时间替换词]"
})

// Plugins Options
const isOpenSdiebarCategory = computed(() => {
	if (typeof frontmatter.value.plugins === "undefined") return true
	else if (isArray(frontmatter.value.plugins)) {
		let tempValue = true
		for (let i = 0; i < frontmatter.value.plugins.length; i++) {
			Object.keys(frontmatter.value.plugins[i]).forEach((key) => {
				if (key === "sidebarCategory")
					tempValue = frontmatter.value.plugins![i][key]
			})
		}
		return tempValue
	} else return !(frontmatter.value.plugins.sidebarCategory === false)
})
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

const isOpenReadingTime = computed(() => {
	return !(frontmatter.value.plugins?.readingTime === false)
})
const isOpenReadingLine = computed(() => {
	return !(frontmatter.value.plugins?.readingLine === false)
})

console.log(page.value, frontmatter.value)
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
						<span class="created-time"> 写于 {{ createdTime }} </span>
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
		</div>
		<aside class="sidebar-custom">
			<Toc :options="tocOptions" v-if="isOpenSdiebarCategory" />
			<slot name="sidebar-custom" />
		</aside>
	</main>
</template>
