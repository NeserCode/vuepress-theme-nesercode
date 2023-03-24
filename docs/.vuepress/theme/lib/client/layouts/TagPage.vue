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

// @ts-ignore
import { useBlogCategory } from "vuepress-plugin-blog2/client"
import { Ref } from "vue"

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

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
			<div class="page-warpper" :key="page.path">
				<Page>
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
							v-if="tags.currentItems"
							:articles="tags.currentItems"
						/>
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
