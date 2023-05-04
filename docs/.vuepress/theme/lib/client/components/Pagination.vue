<script lang="ts" setup>
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/vue/24/solid"
import { computed, toRefs } from "vue"

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

function jumpByChange(e: Event) {
	const target = e.target as HTMLInputElement
	const page = parseInt(target.value)

	if (page > 0 && page <= pageNumber.value) callbacks.value.jump(page)
	else target.value = current.value.toString()

	inputValidater(e)
}

const inputValidater = (e: Event) => {
	const target = e.target as HTMLInputElement
	const page = parseInt(target.value)
	if (page > 0 && page <= pageNumber.value) target.value = page.toString()
	else target.value = current.value.toString()
}
const activeClass = computed(
	() => (page: number) => page == current.value ? "actived" : null
)
const disabledPrevClass = computed(() =>
	isPrevDisabled.value ? "disabled" : null
)
const disabledNextClass = computed(() =>
	isNextDisabled.value ? "disabled" : null
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
			<div class="more-mode" v-else>
				<span
					:class="['pagination-item', 'prev', disabledPrevClass]"
					@click="prev"
				>
					<ChevronLeftIcon class="icon" />
				</span>
				<span class="pagination-item" @click="jump(1)">
					<span :class="['pagination-item-link', activeClass(1)]">{{
						1
					}}</span>
				</span>
				<span class="pagination-item ellipsis">
					<span class="pagination-item-link icon"
						><EllipsisHorizontalIcon
					/></span>
				</span>
				<span class="pagination-item">
					<input
						type="number"
						class="go-page-input actived"
						:max="pageNumber"
						:min="1"
						:value="current"
						@change="jumpByChange"
					/>
				</span>
				<span class="pagination-item ellipsis">
					<span class="pagination-item-link icon"
						><EllipsisHorizontalIcon
					/></span>
				</span>
				<span class="pagination-item" @click="jump(pageNumber)">
					<span
						:class="[
							'pagination-item-link',
							activeClass(pageNumber),
						]"
						>{{ pageNumber }}</span
					>
				</span>
				<span
					:class="['pagination-item', 'next', disabledNextClass]"
					@click="next"
				>
					<ChevronRightIcon class="icon" />
				</span>
			</div>
		</div>
	</div>
</template>
