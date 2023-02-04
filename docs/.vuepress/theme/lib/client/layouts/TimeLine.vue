<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Home from "@theme/Home.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared/index.js"
import { useScrollPromise } from "../composables/index.js"
// @ts-ignore
import { useBlogType } from "vuepress-plugin-blog2/client"
const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const blogType = useBlogType()
console.log(blogType.value)
</script>

<template>
	<base-layout>
		<template #page>
			<Transition
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
