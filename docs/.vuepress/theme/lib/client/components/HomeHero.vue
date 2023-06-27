<script setup lang="ts">
import AutoLink from "@theme/AutoLink.vue"
import {
	ClientOnly,
	usePageFrontmatter,
	useSiteLocaleData,
	withBase,
} from "@vuepress/client"
import { isArray } from "@vuepress/shared"
import type { FunctionalComponent } from "vue"
import { computed, h } from "vue"
import type { DefaultThemeHomePageFrontmatter } from "../../shared/index.js"
import { useDarkMode, useThemeLocaleData } from "../composables/index.js"

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const heroImage = computed(() => {
	if (!frontmatter.value.heroImage) return themeLocale.value.logo
	if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
		return frontmatter.value.heroImageDark
	}
	return frontmatter.value.heroImage
})
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
		frontmatter.value.tagline ||
		siteLocale.value.description ||
		"自定义文案"
	)
})

const HomeHeroImage: FunctionalComponent = () => {
	if (!heroImage.value) return null
	const img = h("img", {
		src: withBase(heroImage.value),
		alt: heroAlt.value,
		height: heroHeight.value,
		class: "hero-image",
	})
	if (frontmatter.value.heroImageDark === undefined) {
		return img
	}
	// wrap hero image with <ClientOnly> to avoid ssr-mismatch
	// when using a different hero image in dark mode
	return h(ClientOnly, () => img)
}
</script>

<template>
	<header class="hero">
		<HomeHeroImage />

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
