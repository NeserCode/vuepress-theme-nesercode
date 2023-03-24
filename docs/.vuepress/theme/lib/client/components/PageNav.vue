<script lang="ts" setup>
// @ts-ignore
import AutoLink from "@theme/AutoLink.vue"
import { usePageData, usePageFrontmatter, PageData } from "@vuepress/client"
import { isPlainObject, isString } from "@vuepress/shared"
import { computed } from "vue"
import { useRoute } from "vue-router"
import type {
	DefaultThemeNormalPageFrontmatter,
	NavLink,
	ResolvedSidebarItem,
} from "../../shared"
import { useNavLink, useSidebarItems } from "../composables"

/**
 * Resolve `prev` or `next` config from frontmatter
 */
interface ExrtaPageData extends PageData {
	prev?: { path: string; title: string }
	next?: { path: string; title: string }
}

const resolveFromFrontmatterConfig = (
	conf: unknown
): null | false | NavLink => {
	if (conf === false) {
		return null
	}

	if (isString(conf)) {
		return useNavLink(conf)
	}

	if (isPlainObject<NavLink>(conf)) {
		return conf
	}

	return false
}

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
	sidebarItems: ResolvedSidebarItem[],
	currentPath: string,
	offset: number
): null | NavLink => {
	const index = sidebarItems.findIndex((item) => item.link === currentPath)
	if (index !== -1) {
		const targetItem = sidebarItems[index + offset]
		if (!targetItem?.link) {
			return null
		}
		return targetItem as NavLink
	}

	for (const item of sidebarItems) {
		if (item.children) {
			const childResult = resolveFromSidebarItems(
				item.children,
				currentPath,
				offset
			)
			if (childResult) {
				return childResult
			}
		}
	}

	return null
}

const page = usePageData<ExrtaPageData>()
const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
const sidebarItems = useSidebarItems()
const route = useRoute()

const prevNavLink = computed(() => {
	const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
	if (prevConfig !== false) {
		return prevConfig
	}

	return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
})

const nextNavLink = computed(() => {
	const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
	if (nextConfig !== false) {
		return nextConfig
	}

	return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
})
</script>

<template>
	<nav v-if="prevNavLink || nextNavLink" class="page-nav">
		<p class="inner">
			<span v-if="prevNavLink" class="prev">
				<AutoLink :item="prevNavLink" />
			</span>

			<span v-if="nextNavLink" class="next">
				<AutoLink :item="nextNavLink" />
			</span>
		</p>
	</nav>
	<nav v-else-if="page.prev || page.next" class="page-nav">
		<p class="inner">
			<span v-if="page.prev" class="prev">
				<router-link :to="page.prev.path">
					{{ page.prev.title }}{{ page.prev.title }}{{ page.prev.title
					}}{{ page.prev.title }}{{ page.prev.title }}{{ page.prev.title
					}}{{ page.prev.title }}
				</router-link>
			</span>

			<span v-if="page.next" class="next">
				<router-link :to="page.next.path">
					{{ page.next.title }}{{ page.next.title }}{{ page.next.title
					}}{{ page.next.title }}{{ page.next.title }}{{ page.next.title
					}}{{ page.next.title }}
				</router-link>
			</span>
		</p>
	</nav>
</template>
