<script lang="ts" setup>
// @ts-ignore
import Giscus from "@giscus/vue"
import { computed, watch, ref, toRefs } from "vue"

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
const themeComputed = ref(
	darkMode.value
		? giscusOptions.value.darkTheme ?? "dark"
		: giscusOptions.value.theme
)

watch(
	() => darkMode.value,
	() => {
		themeComputed.value = darkMode.value
			? giscusOptions.value.darkTheme ?? "dark"
			: giscusOptions.value.theme

		console.log(themeComputed.value)
	}
)
</script>

<template>
	<div class="comment" id="Comment-for-Up-and-Down">
		<Giscus
			host="https://giscus.app"
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
		/>
	</div>
</template>
