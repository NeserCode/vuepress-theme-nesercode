<script setup lang="ts">
import Navbar from "@theme/Navbar.vue"
import Sidebar from "@theme/Sidebar.vue"

import { computed, onMounted, onUnmounted, ref } from "vue"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import type { DefaultThemePageFrontmatter } from "../../shared"
import { useSidebarItems, useThemeLocaleData } from "../composables"
import { useRouter } from "vue-router"

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(
	() => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)
// sidebar
const sidebarItems = useSidebarItems()
const isSidebarOpen = ref(false)
const toggleSidebar = (to?: boolean): void => {
	isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value
}
const touchStart = { x: 0, y: 0 }
const onTouchStart = (e): void => {
	touchStart.x = e.changedTouches[0].clientX
	touchStart.y = e.changedTouches[0].clientY
}
const onTouchEnd = (e): void => {
	const dx = e.changedTouches[0].clientX - touchStart.x
	const dy = e.changedTouches[0].clientY - touchStart.y
	if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
		if (dx > 0 && touchStart.x <= 80) {
			toggleSidebar(true)
		} else {
			toggleSidebar(false)
		}
	}
}

// classes
const containerClass = computed(() => [
	{
		"no-navbar": !shouldShowNavbar.value,
		"no-sidebar":
			page.value.themeDataPlugin.subSidebar ?? !sidebarItems.value.length,
		"sidebar-open": isSidebarOpen.value,
	},
	frontmatter.value.pageClass,
])

// close sidebar after navigation
let unregisterRouterHook
onMounted(() => {
	const router = useRouter()
	unregisterRouterHook = router.afterEach(() => {
		toggleSidebar(false)
	})
})
onUnmounted(() => {
	unregisterRouterHook()
})
</script>

<template>
	<div
		class="theme-tag-view-container theme-container"
		:class="containerClass"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
	>
		<slot name="navbar">
			<Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
		</slot>

		<div class="sidebar-mask" @click="toggleSidebar(false)" />

		<slot name="sidebar">
			<Sidebar class="lg:inline-block xl:hidden">
				<template #top>
					<slot name="sidebar-top" />
				</template>
				<template #bottom>
					<slot name="sidebar-bottom" />
				</template>
			</Sidebar>
		</slot>

		<slot name="page"> </slot>
	</div>
</template>
