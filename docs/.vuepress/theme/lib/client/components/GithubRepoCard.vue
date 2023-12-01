<script lang="ts" setup>
import { BookmarkSquareIcon } from "@heroicons/vue/24/outline"

import { Ref, onBeforeMount, ref } from "vue"
import { useThemeLocaleData } from "../composables"
import { DefaultThemeLocaleData } from "../../shared"
const $props = withDefaults(
	defineProps<{
		owner?: string
		repoName?: string
	}>(),
	{}
)
const themeLocale: Ref<DefaultThemeLocaleData> = useThemeLocaleData()

const repoInfo = ref<null | any>(null)
onBeforeMount(() => {
	if ($props.owner && $props.repoName) {
		fetch(`https://api.github.com/repos/${$props.owner}/${$props.repoName}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/vnd.github.v3+json",
				Authorization: `Bearer ${themeLocale.value.github?.accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				repoInfo.value = res
			})
	}
})
</script>

<template>
	<Transition name="turn-z" mode="out-in" appear>
		<div class="github-repo-card" v-if="owner && repoName">
			<span class="prefix">Linked Github Repo</span>
			<a :href="repoInfo?.html_url" class="card-main" target="_blank">
				<span class="repo-title">
					<BookmarkSquareIcon class="title-icon" />
					<span class="repo-name">
						<span class="repo">{{ repoName }}</span>
						<span class="owner">{{ owner }}</span>
					</span>
				</span>
				<span class="repo-description">{{ repoInfo?.description }}</span>
			</a>
		</div>
	</Transition>
</template>
