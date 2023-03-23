<script lang="ts" setup>
// @ts-ignore
import BaseLayout from "./BaseLayout.vue"
// @ts-ignore
import Page from "@theme/Page.vue"
// @ts-ignore
import TimeLineList from "@theme/TimeLineList.vue"
import { usePageData } from "@vuepress/client"
import type { ArticleTypeData } from "../../shared"
import { useScrollPromise } from "../composables"
// @ts-ignore
import { useBlogType } from "vuepress-plugin-blog2/client"
import { onMounted, Ref } from "vue"
const page = usePageData()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const timeLines: Ref<ArticleTypeData> = useBlogType("timeLine")

function getFormatTimeString(time: string) {
	if (new Date(time))
		return new Date(time).toLocaleString("zh-CN", {
			hourCycle: "h24",
		})
	return time
}

function getTimeLimit(timeLines: ArticleTypeData) {
	const early = timeLines.items[0].info.date
	const late = timeLines.items[timeLines.items.length - 1].info.date
	return [getFormatTimeString(late), getFormatTimeString(early)]
}

function getComputedDescription() {
	const timeLimit = getTimeLimit(timeLines.value)
	return `共 ${timeLines.value.items.length} 篇 · 从 ${timeLimit[0]} 到 ${timeLimit[1]}`
}
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
						<time-line-list :articles="timeLines.items" />
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
