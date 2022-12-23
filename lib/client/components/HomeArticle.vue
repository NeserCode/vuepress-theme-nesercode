<script setup>
import Pagination from "./Pagination.vue"
import { acticles as rawActicles } from "@temp/articles"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { computed, ref, watch } from "vue"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronUpIcon } from "@heroicons/vue/20/solid"

const page = usePageData()
const frontmatter = usePageFrontmatter()

function useActicles(items = []) {
	// 过滤首页
	items = items.filter(
		(item) => !item.frontmatter.home && !item.frontmatter.about
	)
	// 过滤docs目录下的页面
	items = items.filter((item) => !item.path.startsWith("/docs/"))
	// 过滤tag下的页面
	items = items.filter((item) => !item.path.startsWith("/tag/"))
	// 过滤timeline下的页面
	items = items.filter((item) => !item.path.startsWith("/timeline/"))
	// 过滤无题页面
	return items.filter((item) => item.title !== "")
}

function getComputedExcerpt(item) {
	let stringfiedExcerpt = item.excerpt.replace(/<[^>]*>/g, "").replace("# ", "")

	// 删去标题
	if (stringfiedExcerpt.indexOf(item.title) === 0)
		stringfiedExcerpt = stringfiedExcerpt.replace(`${item.title}\n`, "")

	// 删去末尾字符
	if (stringfiedExcerpt.length >= 15)
		stringfiedExcerpt = stringfiedExcerpt.substring(
			0,
			stringfiedExcerpt.length - 2
		)
	// 空摘要处理
	else if (stringfiedExcerpt === "" || stringfiedExcerpt === undefined)
		stringfiedExcerpt = "点击文章标题查看更多内容"

	// 摘要省略号处理
	stringfiedExcerpt += "......"

	return stringfiedExcerpt
}

function getComputedDate(item) {
	return item.date === "0000-00-00"
		? new Date(page.value.git?.createdTime).toLocaleString() ?? "时间长河某处"
		: new Date(item.date).toLocaleString()
}

function getComputedRouterLinktoTags(tag) {
	return `/tag/${tag}/`
}

const pageOffset = ref(0),
	pageLimit = ref(5)

function useOffset(raw = [], offset = 0, limit = 5) {
	return raw.slice(offset, offset + limit)
}

const acticles = computed(() =>
	useOffset(useActicles(rawActicles), pageOffset.value, pageLimit.value)
)
const acticlesLength = computed(() => useActicles(rawActicles).length)
const currentPage = ref(1)
watch(currentPage, (val) => {
	pageOffset.value = (val - 1) * pageLimit.value
})

function getPrevPage() {
	pageOffset.value -= pageLimit.value
}
function getNextPage() {
	pageOffset.value += pageLimit.value
}
</script>

<template>
	<div class="neser-theme-article-list" v-if="acticles.length">
		<Disclosure
			as="div"
			v-slot="{ open }"
			class="neser-theme-article-body"
			v-for="item of acticles"
			:key="item.key"
			:defaultOpen="true"
		>
			<DisclosureButton class="DBtn" data-headlessui-state="open">
				<router-link :to="item.path" class="title-wrapper" title="阅读文章">
					<span
						class="isPinned"
						v-if="item.frontmatter.isPinned ?? item.frontmatter.pinned"
						>置顶</span
					>
					<span class="innerTitle">{{ item.title }}</span>
				</router-link>
				<ChevronUpIcon :class="open ? 'open' : ''" class="icon-up" />
			</DisclosureButton>
			<Transition name="fade-slide-y" mode="out-in">
				<DisclosurePanel class="DPanel">
					<span class="submitDate" v-if="item.date">{{
						getComputedDate(item)
					}}</span>
					<span class="innerExcerpt">{{ getComputedExcerpt(item) }}</span>
					<div class="tags" v-if="item.frontmatter.tag">
						<span
							class="tag"
							v-for="tag in item.frontmatter.tag"
							:title="tag"
							:key="tag"
						>
							<router-link
								:to="getComputedRouterLinktoTags(tag)"
								class="title-wrapper"
								:title="tag"
								><span class="innerTitle">{{ tag }}</span>
							</router-link>
						</span>
					</div>
				</DisclosurePanel>
			</Transition>
		</Disclosure>
		<Pagination
			:size="pageLimit"
			:total="acticlesLength"
			:prev="getPrevPage"
			:next="getNextPage"
			v-model="currentPage"
		/>
	</div>
</template>

<style lang="postcss" scoped>
.neser-theme-article-list {
	@apply inline-flex  flex-col justify-center w-full px-2 pb-2 mx-auto rounded-2xl
  bg-gray-100 dark:bg-gray-900 transition-colors duration-[335ms];
}

.DBtn {
	@apply inline-flex w-full justify-between rounded-lg p-2 mt-2
  text-base font-medium text-purple-900 hover:bg-gray-50
  bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-700
  outline-none transition-colors duration-[335ms];
}

.DBtn:hover .innerTitle {
	@apply bg-clip-text text-green-400;
}

.isPinned {
	@apply inline-block px-1 mr-1 font-semibold rounded
	text-slate-400 bg-black bg-opacity-10 dark:bg-opacity-30;
}

.icon-up {
	@apply h-5 w-5 text-blue-300
  transition-all;
}
.icon-up.open {
	@apply rotate-180 transform;
}

.DPanel {
	@apply px-4 py-2
  text-sm text-gray-400
  transition-all duration-[335ms];
}

.submitDate {
	@apply block font-semibold;
}
.innerExcerpt {
	@apply text-gray-400;
}

.tags {
	@apply inline-flex flex-wrap justify-end w-full py-1 my-1;
}
.tags .tag {
	@apply inline-block m-0.5 pr-1 rounded-l inset-1
  border border-gray-200 bg-white dark:bg-slate-800 dark:border-gray-600
  text-ellipsis overflow-hidden whitespace-nowrap;
	max-width: 15ch;
}
.tags .tag::before {
	@apply inline-block font-black mx-1;
	content: "·";
}
</style>
