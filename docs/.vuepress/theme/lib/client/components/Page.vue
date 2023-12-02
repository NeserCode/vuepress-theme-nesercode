<script setup lang="ts">
import PageMeta from "@theme/PageMeta.vue"
import PageNav from "@theme/PageNav.vue"
import PageFooter from "@theme/PageFooter.vue"
import Comment from "@theme/GiscusComment.vue"
import EncryptRouter from "./EncryptRouter.vue"

import CryptoJs from "crypto-js/crypto-js"
import hmacSHA256 from "crypto-js/hmac-sha256"

import { computed, nextTick, onMounted, ref, watch } from "vue"
import { Ref } from "@vue/reactivity"
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { useThemeLocaleData, usePluginState } from "../composables"

import type { PageData, PageFrontmatter } from "@vuepress/client"
import type { DefaultThemeLocaleData } from "../../shared"
import type { GitData } from "@vuepress/plugin-git"
import type { ReadingTime } from "vuepress-plugin-reading-time2"
import { useRoute } from "vue-router"

type ExtraPageData = PageData & {
	readingTime: ReadingTime
} & {
	git: GitData
}

type ExtraPageFrontmatter = PageFrontmatter & {
	tag?: string[]
	plugins?: {
		readingTime?: boolean
		comment?: boolean
		sidebarCategory?: boolean
	}

	password?: string
}

const page: Ref<ExtraPageData> = usePageData()
const frontmatter: Ref<ExtraPageFrontmatter> = usePageFrontmatter()
const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()

const createdTime = computed(() => {
	if (page.value.git.createdTime !== (undefined || null)) {
		if (page.value.git.createdTime !== undefined)
			return new Date(page.value.git.createdTime).toLocaleString()
	}

	let outTimeText = themeLocale.value.outTime ?? '"非法时间"'

	return frontmatter.value.date ?? outTimeText
})
const updatedTime = computed(() => {
	if (page.value.git.updatedTime !== (undefined || null)) {
		if (page.value.git.updatedTime !== undefined)
			return new Date(page.value.git.updatedTime).toLocaleString()
	}

	let outTimeText = themeLocale.value.outTime ?? '"非法时间"'

	return frontmatter.value.date ?? outTimeText
})

const isOpenSdiebarCategory = usePluginState(
	"sidebarCategory",
	frontmatter.value.plugins
)
const tocOptions = {
	containerTag: "nav",
	containerClass: "toc-main",
	listClass: "vuepress-toc-list",
	itemClass: "vuepress-toc-item",
	linkTag: "a",
	linkClass: "vuepress-toc-link",
	linkActiveClass: "active",
	linkChildrenActiveClass: "active",
}

const isOpenReadingTime = usePluginState(
	"readingTime",
	frontmatter.value.plugins
)

const isOpenComment = usePluginState("comment", frontmatter.value.plugins)
const isExistOption = computed(() => themeLocale.value.giscus !== undefined)

// encrypt
const isEncrypted = ref(false)
function getEncryptedKey(key: string) {
	return CryptoJs.enc.Base64.stringify(
		hmacSHA256(
			key,
			themeLocale.value.helperOptions.passwordSalt ?? "#NeserCode#"
		)
	)
}
function encryptMatch(hash: string) {
	isEncrypted.value = true
	localStorage.setItem(`isEncrypted:${getEncryptedKey(page.value.key)}`, hash)
}
function encryptCheck() {
	if (frontmatter.value.password) {
		const storageSymbol = localStorage.getItem(
			`isEncrypted:${getEncryptedKey(page.value.key)}`
		)
		if (storageSymbol === frontmatter.value.password) {
			isEncrypted.value = true
		}
	}
}
onMounted(() => {
	console.log(`[Debug: Page Data]`, page.value)

	encryptCheck()
})

// Article Tag
const tag = frontmatter.value.tag ?? []

function getTagPath(tag: string) {
	return encodeURI(`/tag/${tag.toLowerCase()}/`)
}

// Toc
const $route = useRoute()
const toc = ref<HTMLDivElement | null>(null)
const tocFly = ref<HTMLDivElement | null>(null)
watch(
	() => $route.hash,
	() => {
		let counter = 0
		let current = -1
		let sums = [] as number[]

		function getTotal(list: number[], index: number = list.length - 1) {
			let result = 0

			list.forEach((l, i) => {
				if (i < index + 1 && index >= 0) result += l
			})
			return result
		}

		nextTick(() => {
			const list = toc.value?.querySelector<HTMLDivElement>(
				".vuepress-toc-list"
			) as HTMLDivElement
			if (!list) return

			list.querySelectorAll(".vuepress-toc-list").forEach((l) => {
				sums.push(l.querySelectorAll(".vuepress-toc-link").length)
			})

			const links = list.querySelectorAll(".vuepress-toc-link")
			counter = links.length
			links.forEach((link, index) => {
				if (!link.classList.contains("active")) return
				else current = index
			})

			let offsetRadius = 0
			let index = 0
			if (current === -1) {
			} else {
				sums.forEach((_sum, i) => {
					if (current >= getTotal(sums, i - 1) + i) {
						index = i
					}
				})
				offsetRadius = current - (index > 0 ? getTotal(sums, index - 1) : 0)
			}
			console.log(`[Debug Hash Fly Position]`, offsetRadius)
			;(tocFly.value as HTMLDivElement).style.transform = `translateY(calc(${
				offsetRadius * 100
			}% + ${0.485 * offsetRadius}rem))`
		})
	},
	{ immediate: true }
)
</script>

<template>
	<main class="page encrypted" v-if="!isEncrypted && frontmatter.password">
		<EncryptRouter
			:encrypted="frontmatter.password"
			:salt="themeLocale.helperOptions.passwordSalt ?? '#NeserCode#'"
			@encrypt:match="encryptMatch"
		/>
	</main>
	<main class="page" v-else>
		<div class="main-custom">
			<slot name="top" />

			<div class="theme-default-content">
				<h1 class="page-title-custom">{{ page.title }}</h1>
				<div class="page-header">
					<span class="reading-time-main description" v-if="isOpenReadingTime">
						<span class="reading-time">
							<span class="prefix">📖</span>共
							{{ page.readingTime.words }} 字，预计需要
							{{ page.readingTime.minutes }} 分钟</span
						>
						<span class="time-like">
							<span class="prefix">🕙</span>
							<span class="created-time" title="Created Time"
								>写于 {{ createdTime }}
							</span>
							<span class="updated-time" title="Updated Time">
								最后更新于 {{ updatedTime }}
							</span>
						</span>
					</span>
					<span class="tags description" v-if="tag.length">
						<span class="prefix"> <span class="prefix">🔖</span>本文标签</span>
						<router-link
							class="tag"
							v-for="tagName in tag"
							:key="tagName"
							:to="getTagPath(tagName)"
							>{{ tagName }}</router-link
						>
					</span>
				</div>
				<slot name="content-top" />

				<div class="content-custom">
					<slot name="custom-content" />
					<Content />
				</div>

				<slot name="content-bottom" />
			</div>

			<slot name="bottom" />

			<PageMeta />

			<PageNav />

			<Comment
				:options="themeLocale.giscus"
				v-if="isOpenComment && isExistOption"
			/>

			<PageFooter />
		</div>
		<aside class="sidebar-custom">
			<Toc ref="toc" :options="tocOptions" v-if="isOpenSdiebarCategory" />
			<div class="toc-fly" ref="tocFly" v-if="isOpenSdiebarCategory"></div>
			<slot name="sidebar-custom" />
		</aside>
	</main>
</template>
