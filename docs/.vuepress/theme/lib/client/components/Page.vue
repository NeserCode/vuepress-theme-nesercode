<script setup lang="ts">
// @ts-ignore
import PageMeta from "@theme/PageMeta.vue"
// @ts-ignore
import PageNav from "@theme/PageNav.vue"
import { computed } from "vue"
import { Ref } from "@vue/reactivity"
import { usePageData } from "@vuepress/client"

import { PageData } from "@vuepress/client"
import { GitData } from "@vuepress/plugin-git"
import { ReadingTime } from "vuepress-plugin-reading-time2"

type ExtraPageData = PageData & {
	readingTime: ReadingTime
} & {
	git: GitData
}

const page: Ref<ExtraPageData> = usePageData()

const createdTime = computed(() => {
	if (page.value.git.createdTime !== undefined) {
		return new Date(page.value.git.createdTime).toLocaleString()
	}
	return page.value.frontmatter.date ?? "[非法时间替换词]"
})

console.log(page.value)

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
</script>

<template>
	<main class="page">
		<div class="main-custom">
			<slot name="top" />

			<div class="theme-default-content">
				<h1 class="page-title-custom">{{ page.title }}</h1>
				<div class="page-header">
					<span class="reading-time">
						📖 共 {{ page.readingTime.words }} 字，预计需要
						{{ page.readingTime.minutes }} 分钟
					</span>
					<span class="created-time"> 写于 {{ createdTime }} </span>
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
			<Toc :options="tocOptions" />
		</aside>
	</main>
</template>
