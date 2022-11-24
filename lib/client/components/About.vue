<script setup>
import AboutSidebar from "./AboutSidebar.vue"
import AboutMain from "./AboutMain.vue"
import SubSidebar from "./SubSidebar.vue"
import ThemeFooter from "./ThemeFooter.vue"
import PageReadingTime from "./PageReadingTime.vue"

import { ref, onMounted, onUnmounted } from "vue"

const sidebarContainer = ref(null)
const mainTextBodyWidth = 660
const sideOffset = 60

const resizeWatcher = new ResizeObserver((element) => {
	let containerWidth = Math.floor(
		Number(
			window.getComputedStyle(sidebarContainer.value).width.replace("px", "")
		)
	)
	let screenWidth = element[0].contentRect.width

	let computedRightMargin =
		(screenWidth - mainTextBodyWidth) / 2 -
		sideOffset -
		(containerWidth === NaN ? 0 : containerWidth)

	sidebarContainer.value.style.right = `${computedRightMargin}px`
})

onMounted(() => {
	resizeWatcher.observe(document.body)
})
onUnmounted(() => {
	resizeWatcher.disconnect()
})
</script>

<template>
	<main class="page">
		<div class="content-container">
			<div class="theme-default-content">
				<about-sidebar />
				<about-main>
					<Content />
				</about-main>
			</div>
			<ThemeFooter />
		</div>
		<div class="sidebar-container" ref="sidebarContainer">
			<page-reading-time />
			<sub-sidebar />
		</div>
	</main>
</template>

<style lang="postcss" scoped>
.page {
	@apply relative -ml-36;
}
.content-container {
	@apply text-center;
}
.page .theme-default-content {
	@apply inline-flex flex-row text-center max-w-4xl;
}

.sidebar-container {
	@apply absolute inline-flex flex-col h-full top-0 right-0 pt-40;
}

.sub-sidebar {
	@apply top-24 right-0;
}

@media (max-width: 1150px) {
	.page {
		@apply -ml-0;
	}
	.sidebar-container {
		@apply hidden;
	}
}
</style>
