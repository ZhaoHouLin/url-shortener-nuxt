<script setup>
const route = useRoute()
// params.code 將包含短網址代碼
const code = ref(route.params.id)

const asyncData = async () => {
  // 在這裡處理短網址導向邏輯，例如讀取 xlsx 檔案並重定向
  const urlData = await $fetch("/api/url-redirect-xlsx", {
    method: "POST",
    body: {
      code: code.value,
    },
  })

  console.log(code)
  window.location.href = urlData
}

asyncData()

onMounted(() => {})
</script>

<template lang="pug">
div
</template>
