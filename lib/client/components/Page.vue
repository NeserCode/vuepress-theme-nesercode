<script setup>
import Giscus from "@giscus/vue"
import PageMeta from "./PageMeta.vue"
import PageNav from "./PageNav.vue"
import ThemeFooter from "./ThemeFooter.vue"
import PageReadingTime from "./PageReadingTime.vue"
import PageReadingLine from "./PageReadingLine.vue"
import SubSidebar from "./SubSidebar.vue"
import Comments from "./Comments.vue"

import { ref, toRefs, onMounted, onUnmounted, computed } from "vue"
import { usePageData, usePageFrontmatter } from "@vuepress/client"

const page = usePageData()
const frontmatter = usePageFrontmatter()

const $props = defineProps({
	isSubsidebar: {
		type: Boolean,
		default: true,
	},
	isComment: {
		type: Boolean,
		default: true,
	},
	isReadingTime: {
		type: Boolean,
		default: true,
	},
})
const { isSubsidebar, isComment } = toRefs($props)

const sidebarContainer = ref(null)
const mainTextBodyWidth = 660
const sideOffset = 60

const resizeWatcher = computed(() =>
	isSubsidebar.value
		? new ResizeObserver((element) => {
				let containerWidth = Math.floor(
					Number(
						window
							.getComputedStyle(sidebarContainer.value)
							.width.replace("px", "")
					)
				)
				let screenWidth = element[0].contentRect.width

				let computedRightMargin =
					(screenWidth - mainTextBodyWidth) / 2 -
					sideOffset -
					(containerWidth === NaN ? 0 : containerWidth)

				sidebarContainer.value.style.right = `${computedRightMargin}px`
		  })
		: null
)

onMounted(() => {
	resizeWatcher.value?.observe(document.body)
})
onUnmounted(() => {
	resizeWatcher.value?.disconnect()
})

function getComputedDate() {
	return frontmatter.value.date === "0000-00-00" || !frontmatter.value.date
		? new Date(page.value.git?.createdTime).toLocaleString() ?? "时间长河中某处"
		: new Date(frontmatter.value.date).toLocaleString() ??
				new Date(page.value.git?.createdTime).toLocaleString() ??
				"时间长河中某处"
}

const isShowArticleHeader = computed(() => {
	return page.value.path.startsWith("/blog/")
})

const isOriginal = computed(() => {
	return frontmatter.value.isOriginal || frontmatter.value.original
})
</script>

<template>
	<main class="page">
		<div class="content-container">
			<slot name="top" />
			<div class="theme-default-content">
				<div class="content-header">
					<h1 class="md-title" :title="page.title">{{ page.title }}</h1>
					<span class="cpdDate" v-if="isShowArticleHeader">{{
						getComputedDate()
					}}</span>

					<slot name="content-header-addon" />
					<span class="tags">
						<span
							class="isPinned"
							v-if="frontmatter.isPinned ?? frontmatter.pinned"
							>置顶</span
						>
						<span
							v-for="tag of frontmatter.tag"
							:key="tag"
							:title="tag + ' tag'"
						>
							<a :href="`/tag/${tag}/`">{{ tag }}</a>
						</span>
					</span>
				</div>
				<slot name="content-top" />
				<Content class="content-body" />
				<slot name="content-bottom" />
				<div class="original-info" v-if="isShowArticleHeader && isOriginal">
					<p class="original-text">
						本作品采用
						<a
							rel="license"
							target="_blank"
							href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
							>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 (CC
							BY-NC-SA 4.0)</a
						>
						进行许可。若转载，请注明出处。
					</p>
					<span class="cc-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.0"
							viewBox="5.5 -3.5 64 64"
							enable-background="new 5.5 -3.5 64 64"
							xml:space="preserve"
						>
							<g>
								<circle fill="#FFFFFF" cx="37.785" cy="28.501" r="28.836" />
								<path
									d="M37.441-3.5c8.951,0,16.572,3.125,22.857,9.372c3.008,3.009,5.295,6.448,6.857,10.314   c1.561,3.867,2.344,7.971,2.344,12.314c0,4.381-0.773,8.486-2.314,12.313c-1.543,3.828-3.82,7.21-6.828,10.143   c-3.123,3.085-6.666,5.448-10.629,7.086c-3.961,1.638-8.057,2.457-12.285,2.457s-8.276-0.808-12.143-2.429   c-3.866-1.618-7.333-3.961-10.4-7.027c-3.067-3.066-5.4-6.524-7-10.372S5.5,32.767,5.5,28.5c0-4.229,0.809-8.295,2.428-12.2   c1.619-3.905,3.972-7.4,7.057-10.486C21.08-0.394,28.565-3.5,37.441-3.5z M37.557,2.272c-7.314,0-13.467,2.553-18.458,7.657   c-2.515,2.553-4.448,5.419-5.8,8.6c-1.354,3.181-2.029,6.505-2.029,9.972c0,3.429,0.675,6.734,2.029,9.913   c1.353,3.183,3.285,6.021,5.8,8.516c2.514,2.496,5.351,4.399,8.515,5.715c3.161,1.314,6.476,1.971,9.943,1.971   c3.428,0,6.75-0.665,9.973-1.999c3.219-1.335,6.121-3.257,8.713-5.771c4.99-4.876,7.484-10.99,7.484-18.344   c0-3.543-0.648-6.895-1.943-10.057c-1.293-3.162-3.18-5.98-5.654-8.458C50.984,4.844,44.795,2.272,37.557,2.272z M37.156,23.187   l-4.287,2.229c-0.458-0.951-1.019-1.619-1.685-2c-0.667-0.38-1.286-0.571-1.858-0.571c-2.856,0-4.286,1.885-4.286,5.657   c0,1.714,0.362,3.084,1.085,4.113c0.724,1.029,1.791,1.544,3.201,1.544c1.867,0,3.181-0.915,3.944-2.743l3.942,2   c-0.838,1.563-2,2.791-3.486,3.686c-1.484,0.896-3.123,1.343-4.914,1.343c-2.857,0-5.163-0.875-6.915-2.629   c-1.752-1.752-2.628-4.19-2.628-7.313c0-3.048,0.886-5.466,2.657-7.257c1.771-1.79,4.009-2.686,6.715-2.686   C32.604,18.558,35.441,20.101,37.156,23.187z M55.613,23.187l-4.229,2.229c-0.457-0.951-1.02-1.619-1.686-2   c-0.668-0.38-1.307-0.571-1.914-0.571c-2.857,0-4.287,1.885-4.287,5.657c0,1.714,0.363,3.084,1.086,4.113   c0.723,1.029,1.789,1.544,3.201,1.544c1.865,0,3.18-0.915,3.941-2.743l4,2c-0.875,1.563-2.057,2.791-3.541,3.686   c-1.486,0.896-3.105,1.343-4.857,1.343c-2.896,0-5.209-0.875-6.941-2.629c-1.736-1.752-2.602-4.19-2.602-7.313   c0-3.048,0.885-5.466,2.658-7.257c1.77-1.79,4.008-2.686,6.713-2.686C51.117,18.558,53.938,20.101,55.613,23.187z"
								/>
							</g>
						</svg>
					</span>
				</div>
				<div class="not-original-info" v-else-if="isShowArticleHeader">
					<p class="not-original-text">
						本作品<strong>非原创</strong>作品，同时本站发表此作品即代表本作遵守原作持有的证书或具有效力的转载证明。若发生侵权，请联系删除相关内容。
					</p>
					<span class="tip-icon">
						<svg
							t="1669183829944"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="7161"
							width="64"
							height="64"
						>
							<path
								d="M923.905 338.957c-23.457-54.238-55.37-101.537-95.759-141.871-40.373-40.346-87.577-72.236-141.593-95.676-54.022-23.446-111.859-35.166-173.511-35.166-61.657 0-119.496 11.721-173.516 35.166-54.016 23.44-101.208 55.329-141.593 95.676-40.385 40.335-72.297 87.627-95.766 141.871-23.463 54.245-35.188 112.159-35.188 173.767 0 61.602 11.725 119.378 35.188 173.343 23.467 53.977 55.381 101.13 95.759 141.475 40.385 40.335 87.577 72.225 141.592 95.676 54.021 23.435 111.859 35.16 173.516 35.16 61.653 0 119.489-11.721 173.511-35.16 54.016-23.451 101.218-55.342 141.592-95.676 40.38-40.346 72.303-87.499 95.759-141.475 23.474-53.965 35.199-111.747 35.199-173.343 0.011-61.614-11.721-119.523-35.193-173.767l0 0zM513.042 800.443c-27.891 0-50.495-22.582-50.495-50.451 0-27.857 22.61-50.451 50.495-50.451 27.896 0 50.49 22.593 50.49 50.451 0 27.874-22.598 50.451-50.49 50.451l0 0zM563.532 590.709c0 27.863-22.598 50.462-50.49 50.462-27.891 0-50.495-22.598-50.495-50.462l0-316.084c0-27.874 22.61-50.462 50.495-50.462 27.896 0 50.49 22.588 50.49 50.462l0 316.084zM563.532 590.709z"
								p-id="7162"
							></path>
						</svg>
					</span>
				</div>
			</div>

			<PageMeta />

			<PageNav />
			<slot name="bottom" />
			<Comments v-if="isComment" />
			<ThemeFooter />
		</div>
		<div
			class="sidebar-container"
			ref="sidebarContainer"
			v-if="isReadingTime || isSubsidebar"
		>
			<page-reading-time v-if="isReadingTime" />
			<sub-sidebar v-if="isSubsidebar" />
		</div>
		<page-reading-line />
	</main>
</template>

<style lang="postcss" scoped>
.page {
	@apply relative pl-0;
}

/* Content fix */
.content-header {
	@apply my-4 py-8;
}
.content-header h1 {
	@apply pb-0;
}
.content-header .cpdDate {
	@apply inline-flex justify-center items-center py-0.5 mr-1 my-1 px-2 text-sm
	text-gray-600 dark:text-gray-400
	select-none;
}

.content-header .tags {
	@apply block;
}

.content-header .tags span {
	@apply inline-flex justify-center items-center py-0.5 px-2 m-1 rounded border-2
	bg-slate-100 dark:bg-slate-700
	border-slate-200 dark:border-slate-600
	text-gray-600 dark:text-gray-400
	select-none;
}

:deep(.content-body > h1:first-child) {
	@apply hidden;
}

.original-info,
.not-original-info {
	@apply relative flex justify-center items-center h-24 my-6 p-4 sm:h-full pr-0 sm:pr-4 rounded shadow border-2
	border-gray-200 dark:border-gray-700
	overflow-hidden transition-all;
	max-height: 210px;
}

.original-info .cc-icon,
.not-original-info .tip-icon {
	@apply inline-block w-32 h-32 ml-4
	fill-slate-200 dark:fill-slate-500
	transition-all;
}
.cc-icon svg,
.tip-icon svg {
	@apply w-32 h-32;
}
.cc-icon svg circle {
	@apply fill-transparent;
}

@media (max-width: 1280px) {
	.sidebar-container {
		@apply hidden;
	}
}
</style>

<style lang="postcss">
.sidebar-container {
	@apply absolute inline-flex flex-col h-full top-0 right-0 pt-40;
}
</style>
