<script lang="ts" setup>
import { LockClosedIcon, KeyIcon } from "@heroicons/vue/24/outline"
import { computed, ref, toRefs } from "vue"

import CryptoJs from "crypto-js/crypto-js"
import hmacSHA256 from "crypto-js/hmac-sha256"

const $props = defineProps<{
	encrypted: string
	salt?: string
}>()
const { encrypted, salt = { value: "#NeserCode#" } } = toRefs($props)
const $emit = defineEmits<{
	(event: "encrypt:match", hash: string): void
}>()

const password = ref("")
const EncryptSaltFix = computed(() => hmacSHA256(password.value, salt.value))
const wrongTemp = ref("")
let timer: NodeJS.Timeout

const MATCH = computed(
	() => encrypted.value === CryptoJs.enc.Hex.stringify(EncryptSaltFix.value)
)
const isWrongTemp = computed(() => wrongTemp.value === password.value)
const WrongClass = computed(() =>
	isWrongTemp.value && wrongTemp.value !== "" ? "wrong" : null
)
const WrongText = computed(() =>
	wrongTemp.value === "" ? "看起来这里被加上了锁" : "这把钥匙似乎不对"
)

function encrypt() {
	clearTimeout(timer)
	if (MATCH.value) {
		$emit("encrypt:match", CryptoJs.enc.Hex.stringify(EncryptSaltFix.value))
	} else {
		wrongTemp.value = password.value
		timer = setTimeout(() => {
			password.value = ""
		}, 500)
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
		<div class="encrypt-input">
			<input
				:class="['input-body', WrongClass]"
				type="password"
				v-model="password"
				:placeholder="WrongText"
				@keypress.enter="encrypt"
			/>
		</div>
		<div class="encrypt-button">
			<button class="btn" @click="encrypt">
				<span class="icon">
					<KeyIcon />
				</span>
				<span class="text">插入钥匙</span>
			</button>
		</div>
	</div>
</template>
