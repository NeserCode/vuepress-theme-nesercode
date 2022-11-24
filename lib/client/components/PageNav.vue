<script setup lang="ts">
import AutoLink from "@theme/AutoLink.vue"
import { usePageData } from "@vuepress/client"
import { computed } from "vue"

const page = usePageData()

const prevNavLink = computed(() => page.value.prev)
const nextNavLink = computed(() => page.value.next)
</script>

<template>
	<nav v-if="prevNavLink || nextNavLink" class="page-nav">
		<p class="inner">
			<router-link :to="prevNavLink.path" v-if="prevNavLink" class="prev">
				<span class="prefix">上一页</span>
				<span>{{ prevNavLink.title }}</span>
			</router-link>

			<router-link :to="nextNavLink.path" v-if="nextNavLink" class="next">
				<span class="prefix">下一页</span>
				<span>{{
					nextNavLink.title === "" ? "No title" : nextNavLink.title
				}}</span>
			</router-link>
		</p>
	</nav>
</template>

<style lang="postcss" scoped>
.prev,
.next {
	@apply inline-flex flex-col justify-center mx-2 px-2 rounded
	border-2 border-gray-200 dark:border-gray-700
	transition-all;
}

.prev:hover,
.next:hover {
	@apply border-gray-300 dark:border-gray-600;
}

.prefix {
	@apply font-thin text-sm text-gray-400 pt-1;
}

.prev {
	@apply text-left;
}

.next {
	@apply text-right;
}
</style>
