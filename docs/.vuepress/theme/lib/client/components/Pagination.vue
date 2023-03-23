<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid"
import { computed, watch, toRefs } from "vue"

const $props = defineProps<{
	total: number
	current: number
	limit: number
	callbacks: {
		prev: () => void
		next: () => void
		jump: (page: number) => void
	}
	maxPage: number
}>()

const { total, current, limit, callbacks, maxPage } = toRefs($props)
const isMoreMode = computed(
	() => total.value / limit.value > (maxPage.value ?? 6)
)
const pageNumber = computed(() => Math.ceil(total.value / limit.value))
const prevThreePage = computed(() =>
	isMoreMode.value && current.value - 3 > 0 ? current.value - 3 : 4
)
const nextThreePage = computed(() =>
	isMoreMode.value && current.value + 3 < pageNumber.value
		? current.value + 3
		: pageNumber.value - 3
)

const isPrevDisabled = computed(() => current.value === 1)
const isNextDisabled = computed(() => current.value === pageNumber.value)
const prev = () => {
	if (!isPrevDisabled.value) callbacks.value.prev()
}
const next = () => {
	if (!isNextDisabled.value) callbacks.value.next()
}
const jump = (page: number) => {
	if (page > 0 && page <= pageNumber.value) callbacks.value.jump(page)
}

const activeClass = computed(
	() => (page) => page == current.value ? "actived" : null
)
const disabledPrevClass = computed(() =>
	isPrevDisabled.value ? "disabled" : null
)
const disabledNextClass = computed(() =>
	isNextDisabled.value ? "disabled" : null
)

watch(
	current,
	() => {
		console.log("current changed", current.value)
	},
	{ immediate: true }
)
</script>

<template>
	<div class="pagination">
		<div class="pagination-main">
			<div class="less-mode" v-if="!isMoreMode">
				<span
					:class="['pagination-item', 'prev', disabledPrevClass]"
					@click="prev"
				>
					<ChevronLeftIcon class="icon" />
				</span>
				<span class="pagination-item" v-for="page of pageNumber">
					<span
						:class="['pagination-item-link', activeClass(page)]"
						@click="jump(page)"
						>{{ page }}</span
					>
				</span>
				<span
					:class="['pagination-item', 'next', disabledNextClass]"
					@click="next"
				>
					<ChevronRightIcon class="icon" />
				</span>
			</div>
			<div class="more-mode" v-else></div>
		</div>
	</div>
</template>
