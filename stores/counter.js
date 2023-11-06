import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const urlCode = ref('')

  const storeFetchData = (code) => {
    urlCode.value = code
  }

  return {
    urlCode,
    storeFetchData
  }

})
