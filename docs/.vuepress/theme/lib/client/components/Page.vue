<script setup lang="ts">
import PageMeta from "@theme/PageMeta.vue"
import PageNav from "@theme/PageNav.vue"
import { Ref } from "@vue/reactivity"
import { usePageData } from "@vuepress/client"

import { PageData } from "@vuepress/client"
import { ReadingTime } from "vuepress-plugin-reading-time2"

type ExtraPageData = PageData & {
	readingTime: ReadingTime
}

const page: Ref<ExtraPageData> = usePageData()

console.log(page.value)
</script>

<template>
	<main class="page">
		<slot name="top" />

		<div class="theme-default-content">
			<h1 class="page-title-custom">{{ page.title }}</h1>
			<div class="page-header">
				<span class="reading-time">
					📖 共 {{ page.readingTime.words }} 字，预计需要
					{{ page.readingTime.minutes }} 分钟
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
	</main>
</template>
