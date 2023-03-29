<script lang="ts" setup>
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid"
import { useDarkMode, useThemeLocaleData } from "../composables/index.js"

const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const toggleColorMode = (): void => {
	isDarkMode.value = !isDarkMode.value
}
</script>

<template>
	<button
		class="toggle-color-mode-button"
		:title="themeLocale.toggleColorMode"
		@click="toggleColorMode"
	>
		<SunIcon v-show="!isDarkMode" class="icon" focusable="false" />
		<MoonIcon v-show="isDarkMode" class="icon" focusable="false" />
	</button>
</template>
