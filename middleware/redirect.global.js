export default defineNuxtRouteMiddleware(async (to, from) => {
  const code = to.path.slice(1)
  if (to.path == '/') {
  } else {
    // console.log('5plTQ', to, code)
    // 在這裡處理短網址導向邏輯，例如讀取 JSON 檔案並重定向
    const { data, pending, error, refresh } = await useFetch(
      "/api/url-redirect-xlsx",
      {
        method: "POST",
        body: {
          code: code,
        },
      }
    )
    await navigateTo(data.value, {
      external: true,
    })

  }
})