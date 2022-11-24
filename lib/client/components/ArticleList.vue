<script setup>
import { computed, toRefs, ref } from "vue"
import Pagination from "../components/Pagination.vue"
const $props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
})
const { items } = toRefs($props)

const pageLimit = ref(5)
const currentPage = ref(1)
const acticlesLength = computed(() => items.value.length)

function getPrevPage() {
	if (currentPage.value === 1) return false
	currentPage.value--
}
function getNextPage() {
	if (currentPage.value === Math.ceil(acticlesLength.value / pageLimit.value))
		return false
	currentPage.value++
}

const paginatedItems = computed(() => {
	return items.value.slice(
		(currentPage.value - 1) * pageLimit.value,
		currentPage.value * pageLimit.value
	)
})
</script>

<template>
	<div class="article-wrapper">
		<article class="article" v-for="{ info, path } in paginatedItems">
			<header class="title">
				<RouterLink :to="path">
					{{ info.title }}
				</RouterLink>
			</header>
			<div class="article-info">
				<span v-if="info.date" class="date"
					>写于
					<span class="time">{{
						new Date(info.date).toLocaleDateString()
					}}</span></span
				>
				<span v-if="info.tags" class="tag-in-list"
					>含有标签 <span class="tags">{{ info.tags.join("，") }}</span></span
				>
			</div>
		</article>
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
.article {
	@apply inline-flex w-full flex-col py-2 px-4 my-1 rounded border
  bg-slate-100 dark:bg-slate-700 border-gray-300 dark:border-gray-500
  transition-all shadow;
}

.title {
	@apply text-lg;
}
.date,
.tag-in-list {
	@apply block;
}

.date .time {
	@apply font-semibold font-mono;
}

.tag-in-list .tags {
	@apply text-base font-semibold;
}
</style>
