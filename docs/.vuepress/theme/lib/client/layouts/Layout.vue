<script lang="ts" setup>
import BaseLayout from "./BaseLayout.vue"
import Home from "@theme/Home.vue"
import Page from "@theme/Page.vue"
import CopyRightBand from "@theme/CopyrightBand.vue"
import ReadingLine from "@theme/ReadingLine.vue"
import GithubRepoCard from "@theme/GithubRepoCard.vue"

import { ref, onMounted, onUnmounted, computed, watch, Ref } from "vue"
import { useRoute } from "vue-router"
import { usePageData, usePageFrontmatter, useSiteData } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared"
import { usePluginState, useThemeLocaleData } from "../composables"

type ExtraPageFrontmatter = DefaultThemePageFrontmatter & {
	plugins?: {
		readingLine?: boolean
		readingTime?: boolean
		comment?: boolean
		sidebarCategory?: boolean
	}

	original?: boolean
	originalUrl?: string

	repo?: string
}

const page = usePageData()
const site = useSiteData()
const themeLocale = useThemeLocaleData()
const frontmatter = usePageFrontmatter<ExtraPageFrontmatter>()
const $route = useRoute()

// repo info
const repo = computed(() => {
	return frontmatter.value.repo?.split("/")
})

// calculate scroll progress
const isOpenReadingLine = computed(() => {
	return (
		usePluginState("readingLine", frontmatter.value.plugins) &&
		!frontmatter.value.home
	)
})
const readingProgress = ref<number>(0)

function getScrollProgress() {
	let content = document.querySelector(".theme-default-content") as HTMLElement
	if (!content && window) return 0

	const { scrollTop, scrollHeight, clientHeight } =
		window.document.documentElement
	const progress = Number(
		((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(2)
	)
	readingProgress.value = progress
}

/* Original */
const isOriginal = computed(() => {
	if (frontmatter.value.original === false) return false
	else return true
})
const originalUrl = computed(() => {
	if (frontmatter.value.originalUrl) return frontmatter.value.originalUrl
	return (
		themeLocale.value.domain +
		(site.value.base + page.value.path).replace("//", "/")
	)
})
const copyrightTips = [""]

onMounted(() => {
	window.addEventListener("scroll", getScrollProgress)
})

onUnmounted(() => {
	window.removeEventListener("scroll", getScrollProgress)
})
</script>

<template>
	<base-layout>
		<template #page>
			<div class="page-wrapper" :key="page.path">
				<reading-line
					:reading-progress="readingProgress"
					v-if="isOpenReadingLine"
				/>
				<Home v-if="frontmatter.home" />
				<Page v-else>
					<template #top>
						<slot name="page-top" />
					</template>
					<template #content-top>
						<slot name="page-content-top" />
					</template>
					<template #content-bottom>
						<slot name="page-content-bottom" />
					</template>
					<template #bottom>
						<CopyRightBand
							:isOriginal="isOriginal"
							:originalUrl="originalUrl"
							:tips="copyrightTips"
						/>
						<slot name="page-bottom" />
					</template>
					<template #sidebar-custom>
						<github-repo-card
							:owner="repo ? repo[0] : null"
							:repo-name="repo ? repo[1] : null"
						/>
					</template>
				</Page>
			</div>
		</template>
	</base-layout>
</template>
