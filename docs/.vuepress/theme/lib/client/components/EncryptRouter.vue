<script lang="ts" setup>
import { LockClosedIcon, KeyIcon } from "@heroicons/vue/24/outline"
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
			<h1>
				<span class="icon">
					<LockClosedIcon />
				</span>
				<span class="text">加密内容</span>
			</h1>
		</div>
		<div class="encrypt-content">
			<p>啊哦，看起来这里被加上了锁</p>
		</div>
		<div class="encrypt-input">
			<input type="password" v-model="password" placeholder="请输入密码" />
			<span class="test">{{ MATCH }}</span>
		</div>
		<div class="encrypt-button">
			<button class="btn" @click="encrypt">
				<span class="icon">
					<KeyIcon />
				</span>
				<span class="text">使用钥匙</span>
			</button>
		</div>
	</div>
</template>
