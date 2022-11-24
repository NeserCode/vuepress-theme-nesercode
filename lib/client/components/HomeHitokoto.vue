<script setup>
import { ref, computed, onMounted } from "vue"
import { usePageData } from "@vuepress/client"
import axios from "axios"
const $axios = axios

const hitokoto = ref(":P 正在获取一言")
const hitokoto_from = ref("")
const hitokoto_fromWho = ref("")
const computedTitle = computed(
	() => `摘自: ${hitokoto_from.value}
作者: ${hitokoto_fromWho.value ?? "无名"}
本功能基于 Hitokoto · 一言`
)

onMounted(() => {
	$axios
		.get("https://v1.hitokoto.cn?c=i&max_length=14&min_length=4")
		.then(({ data }) => {
			hitokoto.value = data.hitokoto
			hitokoto_from.value = data.from
			hitokoto_fromWho.value = data.from_who
		})
		.catch(console.error)
})

const page = usePageData()
const { themeDataPlugin } = page.value
</script>

<template>
	<div class="neser-theme-hitokoto">
		<span class="avatar">
			<img
				class="avatar-img"
				:src="themeDataPlugin.adminInfo.avatar"
				:alt="themeDataPlugin.adminInfo.username"
			/>
		</span>
		<span class="innerText" :title="computedTitle">{{ hitokoto }}</span>
	</div>
</template>

<style lang="postcss" scoped>
.neser-theme-hitokoto {
	@apply inline-flex justify-center items-center mx-auto px-12 py-8 my-48
	rounded-md backdrop-blur bg-white bg-opacity-75 dark:bg-[#22272e] dark:bg-opacity-75
	transition-colors duration-[335ms];
}

.neser-theme-hitokoto .innerText {
	@apply inline-block
  font-thin text-lg;
}

.innerText::before {
	content: "『";
	@apply relative -top-1.5;
}
.innerText::after {
	content: "』";
	@apply relative -bottom-1.5;
}

.innerText::before,
.innerText::after {
	@apply inline-block sm:hidden px-3.5 font-thin;
}

.avatar {
	@apply inline-block mr-4;
}

.avatar-img {
	@apply inline-block w-12 h-12 rounded;
}
</style>
