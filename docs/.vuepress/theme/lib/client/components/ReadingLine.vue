<script lang="ts" setup>
defineProps<{
	readingProgress: number
}>()
</script>

<template>
	<div class="reading-line">
		<span class="reading-line-main" :style="{ width: readingProgress + '%' }" />
	</div>
</template>
