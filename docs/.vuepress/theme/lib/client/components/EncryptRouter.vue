<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from "vue"

import CryptoJs from "crypto-js/crypto-js"
import hmacSHA256 from "crypto-js/hmac-sha256"

const $props = defineProps<{
	encrypted: string
	salt?: string
}>()
const { encrypted, salt = { value: "#NeserCode#" } } = toRefs($props)
const $emit = defineEmits<{
	(event: "encrypt:match"): void
}>()

const password = ref("")
const EncryptSaltFix = computed(() => hmacSHA256(password.value, salt.value))

const MATCH = computed(
	() => encrypted.value === CryptoJs.enc.Hex.stringify(EncryptSaltFix.value)
)

function encrypt() {
	if (MATCH.value) {
		$emit("encrypt:match")
	}
}
</script>

<template>
	<div class="encrypt-main">
		<div class="encrypt-title">
			<h1>加密文章</h1>
			<p>啊哦，看起来这里被加上了锁</p>
		</div>
		<div class="encrypt-input">
			<input type="password" v-model="password" placeholder="请输入密码" />
			<span class="test">{{ MATCH }}</span>
		</div>
		<div class="encrypt-button">
			<button @click="encrypt">解锁</button>
		</div>
	</div>
</template>
