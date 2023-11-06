<script setup>
const route = useRoute()
// params.code 將包含短網址代碼
const code = ref(route.params.id)

let redirectUrl = ""

const asyncData = async () => {
  // 在這裡處理短網址導向邏輯，例如讀取 JSON 檔案並重定向
  const { data, pending, error, refresh } = await useFetch(
    "/api/url-redirect",
    {
      method: "POST",
      body: {
        code: code.value,
      },
    }
  )
  window.location.href = data.value
}

asyncData()

onMounted(() => {})
</script>

<template lang="pug">
div
</template>
