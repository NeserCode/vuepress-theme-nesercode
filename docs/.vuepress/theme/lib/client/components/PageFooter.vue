<script lang="ts" setup>
import { usePageFrontmatter, useSiteData } from "@vuepress/client"
import { useThemeLocaleData } from "../composables"
import { computed } from "vue"
import type { Ref } from "vue"

import type { DefaultThemeLocaleData } from "../../shared"

const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()
const siteData = useSiteData()

const frontmatter = usePageFrontmatter()
const footerDisplay = computed(() => themeLocale.value.footer !== false)
const footer = computed(() => frontmatter.value.footer)
const footerHtml = computed(() => frontmatter.value.footerHtml)

const year = computed(() =>
	themeLocale.value.footer
		? themeLocale.value.footer.year ?? new Date().getFullYear()
		: new Date().getFullYear()
)
const copyright = computed(() =>
	themeLocale.value.footer
		? themeLocale.value.footer.copyRight
		: siteData.value.title ?? null
)
const themeInfoDisplay = computed(() =>
	themeLocale.value.footer ? themeLocale.value.footer.themeInfoDisplay : true
)
const footerLinks = computed(() =>
	themeLocale.value.footer ? themeLocale.value.footer.footerLinks : null
)
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-if="footerHtml && footerDisplay" class="footer" v-html="footer" />
	<div v-else-if="footer && footerDisplay" class="footer" v-text="footer" />
	<div v-else-if="footerDisplay" class="footer">
		<span class="normal-info">
			<span class="year" v-if="year">© {{ year }}</span>
			<span class="copyright" v-if="copyright" v-html="copyright"></span>
		</span>
		<span class="theme-info" v-if="themeInfoDisplay">
			Theme By NeserCode · Power By VuePress v2
		</span>
		<span class="links" v-if="footerLinks">
			<a
				v-for="link in footerLinks"
				:key="link.link"
				:href="link.link"
				target="_blank"
				rel="noopener noreferrer"
				>{{ link.title }}</a
			>
		</span>
	</div>
</template>
