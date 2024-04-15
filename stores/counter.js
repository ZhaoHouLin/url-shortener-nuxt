import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const urlCode = ref('')

  const urlList = reactive({ data: [] })

  const storeUrlCode = (code) => {
    urlCode.value = code
    getUrlList()
  }

  const getUrlList = async () => {
    urlList.data = await $fetch("/api/url-list-xlsx", { method: "GET" })
  }

  const urlData = computed(() => urlList.data)

  return {
    urlCode,
    storeUrlCode,
    urlList,
    urlData,
    getUrlList
  }

})
