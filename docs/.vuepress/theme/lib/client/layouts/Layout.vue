<script setup lang="ts">
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Home from "@theme/Home.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import ReadingLine from "@theme/ReadingLine.vue"

import { computed } from "vue"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared/index.js"
import { useScrollPromise } from "../composables/index.js"

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

<<<<<<< HEAD
<<<<<<< HEAD
// calculate scroll progress
const readingProgress = ref<number>(0)

function getScrollProgress() {
	const { scrollTop, scrollHeight, clientHeight } =
		window?.document.documentElement
	const progress = Number(
		((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(2)
=======
=======
>>>>>>> parent of 573fc67 (Fix bug cannot find package)
// calculate reading progress
const readingProgress = computed(() => {
	return Math.round(
		(document.documentElement.scrollTop /
			(document.documentElement.scrollHeight -
				document.documentElement.clientHeight)) *
			100
<<<<<<< HEAD
>>>>>>> parent of 573fc67 (Fix bug cannot find package)
=======
>>>>>>> parent of 573fc67 (Fix bug cannot find package)
	)
})
</script>

<template>
	<base-layout>
		<template #page>
			<reading-line :reading-progress="readingProgress" />
			<Home v-if="frontmatter.home" />

			<Transition
				v-else
				name="fade-slide-y"
				mode="out-in"
				@before-enter="onBeforeEnter"
				@before-leave="onBeforeLeave"
			>
				<Page :key="page.path">
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
			</Transition>
		</template>
	</base-layout>
</template>
