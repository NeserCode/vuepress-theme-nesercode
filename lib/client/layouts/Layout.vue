<script lang="ts" setup>
import Home from "@theme/Home.vue"
import Page from "@theme/Page.vue"
import About from "../components/About.vue"
import LayoutBase from "./LayoutBase.vue"

import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared"
import { useScrollPromise } from "../composables"

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
	<layout-base>
		<template #page>
			<Transition
				name="fade-slide-y"
				mode="out-in"
				@before-enter="onBeforeEnter"
				@before-leave="onBeforeLeave"
			>
				<Home v-if="frontmatter.home" />

				<Transition
					v-else
					name="fade-slide-y"
					mode="out-in"
					@before-enter="onBeforeEnter"
					@before-leave="onBeforeLeave"
				>
					<About v-if="frontmatter.about" />

					<Page :key="page.path" v-else>
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
			</Transition>
		</template>
	</layout-base>
</template>

<style lang="postcss">
html {
	@apply scroll-smooth;
}

/* up and down plugins */
.back-to-top,
.down-to-comment {
	@apply inline-flex justify-center items-center w-8 h-8 bg-transparent
	bottom-24 transition-all;
}

.back-to-top::before,
.down-to-comment::before {
	@apply absolute inline-block w-9 h-9 -top-0.5 -left-0.5 rounded border
	bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-500
	backdrop-blur bg-opacity-60 dark:bg-opacity-60;
	content: " ";
}
.back-to-top::after,
.down-to-comment::after {
	@apply absolute inline-flex flex-col items-center justify-end w-8 h-8 pb-0.5
	text-xs font-semibold;
	content: "Top";
}

.back-to-top__inner,
.down-to-comment__inner {
	@apply absolute -top-px w-8 h-8
	bg-slate-500 dark:bg-slate-200;
	mask-size: 40% 50%;
	mask-position: 50% 10%;
}

.down-to-comment {
	@apply bottom-12;
}

.down-to-comment::after {
	content: "评论";
}

.down-to-comment__inner {
	@apply transform rotate-180;
	mask-size: 40% 50%;
	mask-position: 50% 85%;
}
.down-to-comment__link {
	@apply absolute inline-block top-0 w-8 h-8 z-10;
}

/* copy-code 2 */
body #message-container .message {
	@apply inline-flex justify-center items-center;
}
</style>
