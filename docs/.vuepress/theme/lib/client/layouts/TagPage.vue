<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import TagList from "@theme/TagList.vue"
// @ts-ignore
import ArticleList from "@theme/ArticleList.vue"

import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type {
	DefaultThemePageFrontmatter,
	ArticleCategoryData,
} from "../../shared"
import { useScrollPromise } from "../composables"

// @ts-ignore
import { useBlogCategory } from "vuepress-plugin-blog2/client"
import { Ref } from "vue"

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const tags: Ref<ArticleCategoryData> = useBlogCategory("tag")

function getComputedDescription() {
	const keys = Object.keys(tags.value.map)
	if (tags.value.currentItems) {
		return `共 ${keys.length} 类 · 此类下共有 ${tags.value.currentItems.length} 篇`
	}
	return `共 ${keys.length} 类`
}

console.log(tags.value)
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
						<slot name="page-content-top">
							<span class="description">
								{{ getComputedDescription() }}
							</span>
						</slot>
					</template>
					<template #custom-content>
						<tag-list :tag-map="tags.map" />
						<article-list
							:articles="tags.currentItems"
							v-if="tags.currentItems"
						/>
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
