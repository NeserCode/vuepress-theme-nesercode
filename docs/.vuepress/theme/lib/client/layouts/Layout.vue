<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Home from "@theme/Home.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import ReadingLine from "@theme/ReadingLine.vue"

import { ref, onMounted, onUnmounted } from "vue"
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
}

const page = usePageData()
const frontmatter = usePageFrontmatter<ExtraPageFrontmatter>()

// calculate scroll progress
const isOpenReadingLine = usePluginState(
	"readingLine",
	frontmatter.value.plugins
)
const readingProgress = ref<number>(0)

function getScrollProgress() {
	const { scrollTop, scrollHeight, clientHeight } =
		window?.document.documentElement
	const progress = Number(
		((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(2)
	)
	readingProgress.value = progress
}

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
						<slot name="page-bottom" />
					</template>
				</Page>
			</div>
		</template>
	</base-layout>
</template>
