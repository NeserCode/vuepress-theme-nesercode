<script setup lang="ts">
import Page from "@theme/Page.vue"
import LayoutBase from "./LayoutBase.vue"
import ArticleList from "../components/ArticleList.vue"

import { usePageData } from "@vuepress/client"
import { useBlogCategory } from "vuepress-plugin-blog2/client"

const page = usePageData()
const blogCategory = useBlogCategory()
</script>

<template>
	<layout-base class="neser-theme-tags">
		<template #page>
			<Page
				:key="page.path"
				:isSubsidebar="false"
				:isComment="false"
				:isReadingTime="false"
			>
				<template #content-header-addon>
					<span class="total"
						>共 {{ Object.keys(blogCategory.map).length }} 类</span
					>
					<span class="sum-count" v-if="blogCategory.currentItems">
						此类共 {{ blogCategory.currentItems.length }} 篇
					</span>
				</template>
				<template #content-top>
					<div
						class="neser-theme-tags-list"
						v-if="Object.keys(blogCategory.map).length"
					>
						<RouterLink
							v-for="({ items, path }, name) in blogCategory.map"
							:key="name"
							:to="path"
							class="tag"
						>
							{{ name }}
							<span class="tag-num">
								{{ items.length }}
							</span>
						</RouterLink>
					</div>
					<div class="neser-theme-tags-list" v-else>
						<span class="no-tags">没有更多的标签</span>
					</div>
					<Transition name="fade-slide-y" mode="out-in" appear>
						<ArticleList :items="blogCategory.currentItems" />
					</Transition>
				</template>
			</Page>
		</template>
	</layout-base>
</template>

<style lang="postcss" scoped>
.neser-theme-tags-list {
	@apply inline-flex w-full flex-wrap my-12;
}

.total,
.sum-count {
	@apply inline-block text-sm font-semibold mr-4
	text-gray-500;
}

.tag {
	@apply relative inline-block px-4 pr-6 py-0.5 m-2 rounded border-2
	bg-slate-50 dark:bg-slate-600 border-slate-300 dark:border-slate-500
	whitespace-nowrap text-ellipsis overflow-hidden;
	max-width: 18ch;
}
.tag .tag-num {
	@apply inline-flex items-center absolute -top-px right-2;
}
.tag.router-link-active {
	@apply hover:no-underline text-blue-400 border-blue-400;
}

.no-tags {
	@apply inline-flex justify-center w-full font-extrabold text-lg mt-12;
}
</style>
