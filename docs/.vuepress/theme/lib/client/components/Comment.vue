<script lang="ts" setup>
import Giscus from "@giscus/vue"
import { computed, ref, toRefs, watch } from "vue"

import { GiscusOptions } from "../../shared"
import { useDarkMode } from "../composables"

const $props = defineProps<{
	options: GiscusOptions
}>()

const { options } = toRefs($props)
const darkMode = useDarkMode()

function generateGiscusOption(options: GiscusOptions): GiscusOptions {
	let result = Object.assign({}, options)
	return result
}

const giscusOptions = ref<GiscusOptions>(generateGiscusOption(options.value))
const themeComputed = computed(() => (darkMode.value ? "dark" : "light"))
</script>

<template>
	<div class="comment" id="giscus-comment">
		<Giscus
			:repo="giscusOptions.repo"
			:repo-id="giscusOptions.repoId"
			:category="giscusOptions.category"
			:category-id="giscusOptions.categoryId"
			:mapping="giscusOptions.mapping"
			:strict="giscusOptions.strict"
			:reactions-enabled="giscusOptions.reactionsEnabled"
			:emit-metadata="giscusOptions.emitMetadata"
			:input-position="giscusOptions.inputPosition"
			:theme="themeComputed"
			:lang="giscusOptions.language"
			:loading="giscusOptions.loading"
			crossorigin="anonymous"
		/>
	</div>
</template>
