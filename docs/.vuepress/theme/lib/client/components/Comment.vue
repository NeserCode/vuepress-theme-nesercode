<script lang="ts" setup>
import Giscus from '@giscus/vue'

defineProps<{
  repo: `${string}/${string}`,
  repoId: string,
  category:
}>()
</script>

<template>
	<div class="comment" id="giscus-comment">
		<Giscus
			repo=""
			repo-id=""
			category=""
			category-id=""
			mapping=""
			strict=""
			reactions-enabled=""
			emit-metadata=""
			input-position=""
			theme=""
			lang=""
			loading=""
			crossorigin="anonymous"
		/>
	</div>
</template>
