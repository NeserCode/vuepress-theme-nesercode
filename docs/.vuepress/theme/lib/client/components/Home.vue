<script lang="ts" setup>
// @ts-ignore
import HomeContent from "@theme/HomeContent.vue"
// @ts-ignore
import PageFooter from "@theme/PageFooter.vue"
// @ts-ignore
import HomeHero from "@theme/HomeHero.vue"
// @ts-ignore
import HomeArticleList from "./HomeArticleList.vue"
// @ts-ignore
import { pages } from "@temp/pages.js"
</script>

<template>
	<main class="home">
		<HomeHero />
		<HomeContent />
		<HomeArticleList :articles="pages" />
		<PageFooter />
	</main>
</template>
