<script setup lang="ts">
import BaseLayout from "./BaseLayout.vue"
import { useRouteLocale } from "@vuepress/client"
import { useThemeLocaleData } from "../composables/index.js"

import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline"

const routeLocale = useRouteLocale()
const themeLocale = useThemeLocaleData()

const messages = themeLocale.value.notFound ?? ["Not Found"]
const getMsg = (): string =>
	messages[Math.floor(Math.random() * messages.length)]
const homeLink = themeLocale.value.home ?? routeLocale.value
const homeText = themeLocale.value.backToHome ?? "Back to home"
</script>

<template>
	<BaseLayout>
		<template #page>
			<div class="theme-default-content not-found">
				<span class="not-found-number">404</span>
				<span class="message">{{ getMsg() }}</span>

				<RouterLink :to="homeLink" class="home-link">
					<ArrowUturnLeftIcon class="icon" />
					<span class="text">{{ homeText }}</span>
				</RouterLink>
			</div>
		</template>
	</BaseLayout>
</template>
