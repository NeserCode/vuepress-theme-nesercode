<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import ArticleList from "@theme/ArticleList.vue"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter, ArticleTypeData } from "../../shared"
import { useScrollPromise } from "../composables"
// @ts-ignore
import { useBlogType } from "vuepress-plugin-blog2/client"
import { Ref } from "vue"
const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const timeLines: Ref<ArticleTypeData> = useBlogType("timeLine")
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
					<template #custom-content>
						<article-list :articles="timeLines.items" />
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
