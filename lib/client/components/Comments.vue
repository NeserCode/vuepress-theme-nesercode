<script setup>
import Giscus from "@giscus/vue"

import { ref, watch, computed, onMounted } from "vue"
import { usePageData } from "@vuepress/client"
import { useDarkMode } from "../composables/useDarkMode"
const page = usePageData()
const { giscusOptions } = page.value.themeDataPlugin
const {
	repo,
	repoId,
	category,
	categoryId,
	mapping,
	reactions: reactionsEnabled,
	metadata: emitMetadata,
	position: inputPosition,
	strict,
	theme,
	darkTheme,
	lang,
	loading: load,
} = giscusOptions

const colorTheme = ref("")
watch(useDarkMode(), (darkMode) => {
	colorTheme.value = darkMode ? darkTheme : theme
})
const cpdStrict = computed(() => {
	return strict ? 1 : 0
})
const cpdReactions = computed(() => {
	return reactionsEnabled ? 1 : 0
})

onMounted(() => {
	colorTheme.value = useDarkMode().value ? darkTheme : theme
})
</script>

<template>
	<div class="giscus-warraper">
		<Giscus
			class="giscus-body"
			id="giscus-comment"
			host="https://giscus.app"
			:repo="repo"
			:repoId="repoId"
			:category="category"
			:categoryId="categoryId"
			:mapping="mapping"
			:reactionsEnabled="cpdReactions"
			:emitMetadata="emitMetadata"
			:inputPosition="inputPosition"
			:strict="cpdStrict"
			:theme="colorTheme"
			:lang="lang"
		/>
	</div>
</template>

<style lang="postcss" scoped>
.giscus-warraper {
	@apply w-full text-center max-w-2xl mx-auto my-12 md:px-4;
}
</style>
