<script setup lang="ts">
import {
	ClientOnly,
	usePageFrontmatter,
	useSiteLocaleData,
	withBase,
} from "@vuepress/client"

import type { FunctionalComponent } from "vue"
import { computed, h } from "vue"
import type { DefaultThemeHomePageFrontmatter } from "../../shared/index.js"
import { useDarkMode, useThemeLocaleData } from "../composables/index.js"

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const heroAlt = computed(
	() => frontmatter.value.heroAlt || heroText.value || "hero"
)
const heroHeight = computed(() => frontmatter.value.heroHeight || 280)

const heroText = computed(() => {
	if (frontmatter.value.heroText === null) {
		return null
	}
	return frontmatter.value.heroText || siteLocale.value.title || "嗨！"
})

const tagline = computed(() => {
	if (frontmatter.value.tagline === null) {
		return null
	}
	return (
		frontmatter.value.tagline || siteLocale.value.description || "自定义文案"
	)
})
</script>

<template>
	<header class="hero">
		<img :src="themeLocale.logo" alt="Logo" class="hero-icon" />

		<span class="info">
			<span v-if="heroText" id="main-title">
				{{ heroText }}
			</span>
			<span v-if="tagline" class="description">
				{{ tagline }}
			</span>
		</span>
	</header>
</template>
