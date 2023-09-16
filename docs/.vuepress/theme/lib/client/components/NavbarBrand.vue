<script lang="ts" setup>
import {
	ClientOnly,
	useRouteLocale,
	useSiteLocaleData,
	withBase,
} from "@vuepress/client"
import { computed, h, inject, watch, ref, reactive } from "vue"
import type { FunctionalComponent } from "vue"
import { useDarkMode, useThemeLocaleData } from "../composables/index.js"

import { GithubDataKey } from "../token.js"

const routeLocale = useRouteLocale()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const navbarBrandLink = computed(
	() => themeLocale.value.home || routeLocale.value
)
const navbarBrandTitle = computed(() => siteLocale.value.title)
const navbarBrandLogo = computed(() => {
	if (isDarkMode.value && themeLocale.value.logoDark !== undefined) {
		return themeLocale.value.logoDark
	}
	return themeLocale.value.logo
})
const NavbarBrandLogo: FunctionalComponent = () => {
	if (!navbarBrandLogo.value) return null
	const img = h("img", {
		class: "logo",
		src: withBase(navbarBrandLogo.value),
		alt: navbarBrandTitle.value,
	})
	if (themeLocale.value.logoDark === undefined) {
		return img
	}
	// wrap brand logo with <ClientOnly> to avoid ssr-mismatch
	// when using a different brand logo in dark mode
	return h(ClientOnly, () => img)
}

// use github data
const dataFromGithub = reactive({
	nickname: "",
	avatar: "",
	bio: "",
})
const githubData = inject(GithubDataKey, ref())
watch(githubData, (val) => {
	dataFromGithub.nickname = val.name
	dataFromGithub.avatar = val.avatar_url
	dataFromGithub.bio = val.bio
})
</script>

<template>
	<RouterLink :to="navbarBrandLink" class="nav-brand">
		<NavbarBrandLogo />

		<span
			v-if="navbarBrandTitle"
			class="site-name"
			:class="{ 'can-hide': navbarBrandLogo }"
		>
			<Transition name="slide-up" mode="out-in" appear>
				<span class="title" v-if="navbarBrandTitle">{{
					navbarBrandTitle
				}}</span>
			</Transition>

			<Transition name="turn-z" mode="out-in" appear>
				<span class="github-nickname" v-if="dataFromGithub.nickname !== ''">{{
					dataFromGithub.nickname
				}}</span>
			</Transition>
		</span>
	</RouterLink>
</template>
