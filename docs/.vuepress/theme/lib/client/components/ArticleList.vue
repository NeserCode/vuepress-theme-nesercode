<script lang="ts" setup>
import { toRefs } from "vue"
const $props = defineProps<{
	articles: any[]
}>()

const { articles } = toRefs($props)
console.log(articles.value)
</script>

<template>
	<div class="article-list">
		<span class="title" v-for="article in articles">{{
			article.info.title
		}}</span>
	</div>
</template>
