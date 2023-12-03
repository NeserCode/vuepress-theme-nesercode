<script setup lang="ts">
import Navbar from "@theme/Navbar.vue"
import Sidebar from "@theme/Sidebar.vue"

import { usePageFrontmatter } from "@vuepress/client"
import {
	Ref,
	computed,
	nextTick,
	onBeforeMount,
	onMounted,
	onUnmounted,
	provide,
	reactive,
	ref,
	watch,
} from "vue"
import { useRouter, useRoute } from "vue-router"
import type {
	DefaultThemePageFrontmatter,
	DefaultThemeLocaleData,
} from "../../shared/index.js"
import {
	useScrollPromise,
	useSidebarItems,
	useThemeLocaleData,
	initUpandDown,
} from "../composables/index.js"

import { GithubDataKey } from "../token.js"

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()

// github data
const githubData = ref(null)
const githubName = themeLocale.value.github?.username
provide(
	GithubDataKey,
	computed(() => githubData.value)
)
onBeforeMount(() => {
	if (!localStorage.getItem("fetch-github-data")) {
		if (githubName) {
			fetch(`https://api.github.com/users/${githubName}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${themeLocale.value.github?.accessToken}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					githubData.value = data
					localStorage.setItem("fetch-github-data", JSON.stringify(data))
				})
		}
	} else {
		nextTick(() => {
			githubData.value = JSON.parse(localStorage.getItem("fetch-github-data")!)
		})
	}
})

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

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
		"no-sidebar": !sidebarItems.value.length,
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

// watch path
const $route = useRoute()
onMounted(() => {
	watch(
		() => $route.path,
		() => {
			nextTick(() => {
				initUpandDown(document)
			})
		},
		{ immediate: true }
	)
})
</script>

<template>
	<div
		class="theme-container"
		:class="containerClass"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
	>
		<slot name="navbar">
			<Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
				<template #before>
					<slot name="navbar-before" />
				</template>
				<template #after>
					<slot name="navbar-after" />
				</template>
			</Navbar>
		</slot>

		<div class="sidebar-mask" @click="toggleSidebar(false)" />

		<slot name="sidebar">
			<Sidebar>
				<template #top>
					<slot name="sidebar-top" />
				</template>
				<template #bottom>
					<slot name="sidebar-bottom" />
				</template>
			</Sidebar>
		</slot>

		<Transition
			name="fade-slide-y"
			mode="out-in"
			appear
			@before-enter="onBeforeEnter"
			@before-leave="onBeforeLeave"
		>
			<slot name="page"> </slot>
		</Transition>
	</div>
</template>
