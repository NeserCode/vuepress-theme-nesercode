<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Home from "@theme/Home.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import CopyRightBand from "@theme/CopyrightBand.vue"
// @ts-ignore
import ReadingLine from "@theme/ReadingLine.vue"

import { ref, onMounted, onUnmounted, computed, watch, Ref } from "vue"
import { useRoute } from "vue-router"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared"
import { usePluginState } from "../composables"

type ExtraPageFrontmatter = DefaultThemePageFrontmatter & {
	plugins?: {
		readingLine?: boolean
		readingTime?: boolean
		comment?: boolean
		sidebarCategory?: boolean
	}

	original?: boolean
	originalUrl?: string
}

const page = usePageData()
const frontmatter = usePageFrontmatter<ExtraPageFrontmatter>()

// calculate scroll progress
const isOpenReadingLine = computed(() => {
	return (
		usePluginState("readingLine", frontmatter.value.plugins) &&
		!frontmatter.value.home
	)
})
const readingProgress = ref<number>(0)

function getScrollProgress() {
	const { scrollTop, scrollHeight, clientHeight } =
		window?.document.documentElement
	const progress = Number(
		((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(2)
	)
	readingProgress.value = progress
}

/* Original */
const $route = useRoute()
const mountedWindow: Ref<Window | null> = ref(null)
const isOriginal = computed(() => {
	if (frontmatter.value.original === false) return false
	else return true
})
const originalUrl = ref(frontmatter.value.originalUrl ?? getReplacedUrl())
function getReplacedUrl() {
	return mountedWindow.value?.location.href.replace(encodeURI($route.hash), "")
}
watch(
	() => $route.hash,
	() => {
		if (frontmatter.value.originalUrl)
			originalUrl.value = frontmatter.value.originalUrl
		else originalUrl.value = getReplacedUrl()
	}
)
const copyrightTips = [""]

onMounted(() => {
	window.addEventListener("scroll", getScrollProgress)
	mountedWindow.value = window
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
					<template #sidebar-custom></template>
				</Page>
			</div>
		</template>
	</base-layout>
</template>
