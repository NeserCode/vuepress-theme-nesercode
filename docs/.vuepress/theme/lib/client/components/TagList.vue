<script lang="ts" setup>
import { toRefs, computed } from "vue"

import type { ArticleMap } from "../../shared"

const $props = defineProps<{
	tagMap: ArticleMap
}>()
const { tagMap } = toRefs($props)

const compurtedMap = computed(() => {
	let keys = Object.keys(tagMap.value)

	return keys.map((key) => {
		return {
			name: key,
			count: tagMap.value[key].items.length,
			path: tagMap.value[key].path,
		}
	})
})
</script>

<template>
	<div class="tag-list">
		<div class="tag-item" v-for="tag in compurtedMap" :key="tag.name">
			<router-link :to="tag.path" class="tag-link">
				<span class="tag-name">{{ tag.name }}</span>
				<span class="tag-count">{{ tag.count }}</span>
			</router-link>
		</div>
	</div>
</template>
