<script lang="ts" setup>
import {
	LockClosedIcon,
	LockOpenIcon,
	ArrowUpCircleIcon,
} from "@heroicons/vue/20/solid"
// @ts-ignore
import Pagination from "@theme/Pagination.vue"

import { Ref, computed, ref, toRefs } from "vue"
import CryptoJs from "crypto-js/crypto-js"
import hmacSHA256 from "crypto-js/hmac-sha256"
import { DefaultThemeLocaleData } from "../../shared"
import { useThemeLocaleData } from "../composables"

const $props = defineProps<{
	articles: any[]
}>()

const { articles } = toRefs($props)
console.log(articles.value)

function getComputedDate(page: any) {
	const { frontmatter } = page
	return (
		frontmatter.date
			? new Date(frontmatter.date)
			: new Date(page.data.git?.createdTime)
	).toString()
}

function getComputedTags(page: any) {
	const { frontmatter } = page
	return frontmatter.tags || frontmatter.tag || []
}

function translateDate(date: string) {
	function addZero(num: number) {
		return num < 10 ? `0${num}` : num
	}

	const dateObj = new Date(date)
	const year = dateObj.getFullYear()
	const month = dateObj.getMonth() + 1
	const day = dateObj.getDate()
	const hour = dateObj.getHours()
	const minute = dateObj.getMinutes()
	const second = dateObj.getSeconds()

	return `${year}/${month}/${day}
	${addZero(hour)}:${addZero(minute)}:${addZero(second)}`
}

function getTimeFromNow(date: string) {
	const dateObj = new Date(date)
	const now = new Date()
	const diff = now.getTime() - dateObj.getTime()
	const day = 1000 * 60 * 60 * 24
	const days = Math.floor(diff / day)
	const hours = Math.floor((diff % day) / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

	if (days > 0) return `${days} days ago`
	else if (hours > 0) return `${hours} hours ago`
	else if (minutes > 0) return `${minutes} minutes ago`
	else return "just now"
}

function getTagPath(tag: string) {
	return encodeURI(`/tag/${tag.toLowerCase()}/`)
}

const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()
function getEncryptedKey(key: string) {
	return CryptoJs.enc.Base64.stringify(
		hmacSHA256(
			key,
			themeLocale.value.helperOptions.passwordSalt ?? "#NeserCode#"
		)
	)
}

function isEncryptedPage(article: any, key: "lock" | "unlock") {
	if (key == "lock") {
		return (
			article.frontmatter.password &&
			!localStorage.getItem(`isEncrypted:${getEncryptedKey(article.key)}`)
		)
	} else if (key == "unlock") {
		return (
			article.frontmatter.password &&
			localStorage.getItem(`isEncrypted:${getEncryptedKey(article.key)}`)
		)
	}

	return false
}

/* Pagination */
const currentPage = ref(1)
const totalPage = ref(articles.value.length)
const limit = ref(5)

function prev() {
	if (currentPage.value > 1) currentPage.value--
}

function next() {
	if (currentPage.value < totalPage.value) currentPage.value++
}

function jump(page: number) {
	if (page > 0 && page <= totalPage.value) currentPage.value = page
}

const callbacks = {
	prev,
	next,
	jump,
}

const slicedArticles = computed(() => {
	const start = (currentPage.value - 1) * limit.value
	const end = start + limit.value
	if (!articles.value || articles.value.length === 0) return []
	return articles.value.slice(start, end)
})
</script>

<template>
	<Transition name="fade-slide-x" appear mode="out-in">
		<div class="home-article-list" :key="currentPage">
			<div
				class="home-article-wrapper"
				v-for="article in slicedArticles"
				:key="article.path"
			>
				<div class="home-article-main">
					<router-link :to="article.path" class="title">{{
						article.title
					}}</router-link>
					<span class="info">
						<span class="date"
							>{{ translateDate(getComputedDate(article)) }} ·
							{{ getTimeFromNow(getComputedDate(article)) }}</span
						>
					</span>
					<span class="special">
						<ArrowUpCircleIcon
							v-if="article.frontmatter.isPinned || article.frontmatter.pinned"
							class="icon"
							:title="'已置顶'"
						/>
						<LockClosedIcon
							v-if="isEncryptedPage(article, 'lock')"
							class="icon"
							:title="'内容已加密'"
						/>
						<LockOpenIcon
							v-if="isEncryptedPage(article, 'unlock')"
							class="icon"
							:title="'内容已解密'"
						/>
					</span>
					<span class="tags">
						<span
							v-for="tag of getComputedTags(article)"
							:key="tag"
							class="tag"
						>
							<router-link :to="getTagPath(tag)">{{ tag }}</router-link>
						</span>
					</span>
				</div>
			</div>
		</div>
	</Transition>
	<Pagination
		:maxPage="6"
		:total="totalPage"
		:limit="limit"
		:current="currentPage"
		:callbacks="callbacks"
	/>
</template>
