<script setup lang="ts">
import Page from "@theme/Page.vue"
import LayoutBase from "./LayoutBase.vue"

import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import { useBlogType } from "vuepress-plugin-blog2/client"

const page = usePageData()
const blogType = useBlogType()

const articles = computed(() => {
	return blogType.value.items.sort(
		(a, b) => new Date(b.info.date).getTime() - new Date(a.info.date).getTime()
	)
})

function getComputedExcerpt(item) {
	let stringfiedExcerpt = item.info.excerpt
		.replace(/<[^>]*>/g, "")
		.replace("# ", "")

	// 删去标题
	if (stringfiedExcerpt.indexOf(item.info.title) === 0)
		stringfiedExcerpt = stringfiedExcerpt.replace(`${item.info.title}\n`, "")

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

function getEarliestAndLatestDate() {
	let earliestDate = new Date(articles.value[0].info.date)
	let latestDate = new Date(articles.value[0].info.date)

	for (let i = 1; i < articles.value.length; i++) {
		let date = new Date(articles.value[i].info.date)
		if (date < earliestDate) earliestDate = date
		if (date > latestDate) latestDate = date
	}

	return [earliestDate.toLocaleString(), latestDate.toLocaleString()]
}

interface YearAndMonthObject {
	year: number
	month: number
}
interface YearAndMonthObjectwithIndex extends YearAndMonthObject {
	index: number
}
type YearAndMonthArray = YearAndMonthObject[]

// function get each year and month among the articles, admit repeat
function getYearAndMonthArray(): YearAndMonthArray {
	let yearAndMonthArray: YearAndMonthArray = []

	for (let i = 0; i < articles.value.length; i++) {
		let date = new Date(articles.value[i].info.date)
		yearAndMonthArray.push({
			year: date.getFullYear(),
			month: date.getMonth() + 1,
		})
	}

	return yearAndMonthArray
}

// function get the first node in getYearAndMonthArray() that in each month, including the article index

function getFirstNodeInEachMonth(): YearAndMonthObjectwithIndex[] {
	let yearAndMonthArray = getYearAndMonthArray()
	let firstNodeInEachMonth: YearAndMonthObjectwithIndex[] = []

	for (let i = 0; i < yearAndMonthArray.length; i++) {
		if (
			yearAndMonthArray[i].year !== yearAndMonthArray[i - 1]?.year ||
			yearAndMonthArray[i].month !== yearAndMonthArray[i - 1]?.month
		) {
			firstNodeInEachMonth.push({
				year: yearAndMonthArray[i].year,
				month: yearAndMonthArray[i].month,
				index: i,
			})
		}
	}

	return firstNodeInEachMonth
}

// function get the anchor text in v-for for each article, arroding getFirstNodeInEachMonth()
function getAnchorText(index: number): string {
	let firstNodeInEachMonth = getFirstNodeInEachMonth()
	let anchorText = ""

	for (let i = 0; i < firstNodeInEachMonth.length; i++) {
		if (index === firstNodeInEachMonth[i].index) {
			anchorText = `${firstNodeInEachMonth[i].year}年${firstNodeInEachMonth[i].month}月`
			break
		}
	}

	return anchorText
}
</script>

<template>
	<layout-base>
		<template #page>
			<Page
				:key="page.path"
				:isComment="false"
				:isReadingTime="false"
				:isSubsidebar="false"
			>
				<template #content-header-addon>
					<span class="time-area"
						>{{ getEarliestAndLatestDate()[0] }} ~
						{{ getEarliestAndLatestDate()[1] }}</span
					>
					<span class="total-area"> 共 {{ articles.length }} 篇 </span>
				</template>
				<template #content-bottom>
					<div class="time-node-wrapper">
						<div
							class="time-line-container"
							v-for="(article, index) in articles"
							key="article.path"
						>
							<span class="time-node">
								<div class="article">
									<span class="title">
										<router-link :to="article.path">{{
											article.info.title
										}}</router-link>
									</span>
									<span class="date">{{
										new Date(article.info.date).toLocaleString()
									}}</span>
									<span class="excerpt">{{ getComputedExcerpt(article) }}</span>
								</div>
							</span>
							<span class="time-record">
								{{ getAnchorText(index) }}
							</span>
						</div>
					</div>
				</template>
			</Page>
		</template>
	</layout-base>
</template>

<style lang="postcss" scoped>
.time-node-wrapper {
	@apply relative inline-flex flex-col w-full p-4
	box-content;
}
.time-node-wrapper .time-line-container:nth-child(even) {
	@apply self-end border-x-2 pr-0
	-translate-x-px items-end
	border-transparent border-l-slate-400;
}
.time-node-wrapper .time-line-container:nth-child(odd) {
	@apply self-start border-x-2 pl-0
	translate-x-px
	border-transparent border-r-slate-400;
}
.time-line-container {
	@apply relative inline-flex w-1/2 p-4;
}

.time-line-container:nth-child(even) .time-node {
	@apply self-end;
}
.time-line-container:nth-child(odd) .time-node {
	@apply self-start;
}
.time-node {
	@apply inline-block overflow-hidden py-4 px-1;
}
.time-node .article {
	@apply relative inline-flex flex-col w-full p-4 border-2 rounded-md
	border-slate-400 dark:border-slate-600
	hover:ring-2 dark:hover:ring-slate-600 hover:ring-yellow-200 dark:hover:bg-gray-700 hover:bg-green-100
	transition-all;
}

.article span {
	@apply inline-block 
	text-ellipsis whitespace-nowrap overflow-hidden;
}

.article .title {
	@apply text-xl font-semibold;
}

.article .date {
	@apply text-sm w-full
	text-gray-500;
}

.article .excerpt {
	@apply text-base
	text-gray-600 dark:text-gray-400;
}

/* Node point */
.time-node-wrapper .time-line-container:nth-child(even) .time-node::before {
	@apply absolute top-1/2 left-0 w-4 h-4
	border-2 border-slate-400
	bg-slate-100 dark:bg-slate-600
	rounded-full -translate-x-[9px] -translate-y-1/2;
	content: " ";
}

.time-node-wrapper .time-line-container:nth-child(odd) .time-node::before {
	@apply absolute top-1/2 right-0 w-4 h-4
	border-2 border-slate-400
	bg-slate-100 dark:bg-slate-600
	rounded-full translate-x-[9px] -translate-y-1/2;
	content: " ";
}

.time-area,
.total-area {
	@apply inline-block text-sm font-semibold mr-4
	text-gray-500;
}

.time-line-container:nth-child(odd) .time-record,
.time-line-container:nth-child(even) .time-record {
	@apply absolute inline-flex w-full h-full top-0 right-0 justify-center items-center
	text-lg font-thin
	transition-all transform translate-x-full;
}

.time-line-container:nth-child(odd) .time-record {
	@apply right-0 translate-x-full;
}
.time-line-container:nth-child(even) .time-record {
	@apply left-0 -translate-x-full;
}
</style>
