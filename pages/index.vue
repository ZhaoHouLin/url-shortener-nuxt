<script setup>
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

const counter = useCounterStore()

const urlList = reactive({ data: [] })

const urlText = ref([])

const randomColor = () => {
  // 生成三個隨機的RGB值
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 將RGB值拼接成CSS顏色字串
  return `rgb(${r},${g},${b})`
}

const randomFontSize = () => {
  const fz = Math.floor(Math.random() * 32) + 32
  return `${fz}px`
}

const textAnimation = () => {
  urlText.value.forEach((text) => {
    // 隨機生成單詞的起始位置
    // const startX = ((Math.random() - 1) * window.innerWidth) / 2
    // const startY = ((Math.random() - 1) * window.innerHeight) / 2
    const startX = 0
    const startY = 0

    // 定義單詞的結束位置
    const endX = ((Math.random() * 2 - 1) * window.innerWidth) / 2
    const endY = ((Math.random() * 2 - 1) * window.innerHeight) / 2

    gsap.fromTo(
      text,
      {
        duration: 2,
        x: startX,
        y: startY,
        color: "rgb(194, 37, 92)",
        // repeat: -1,
        // yoyo: true,
      },
      {
        x: endX,
        y: endY,
        color: randomColor(),
        fontSize: randomFontSize(),
        duration: 1,
        ease: "power2.out",
      }
    )
  })
}

watch(
  () => counter.urlData,
  (newValue, oldValue) => {
    // newValue === oldValue
    textAnimation()
  },
  { deep: true }
)

onMounted(async () => {
  await counter.getUrlList()
  gsap.registerPlugin(TextPlugin)
  textAnimation()

  const tl = gsap.timeline()
  gsap.defaults({ ease: "linear" })

  const btn = document.querySelector(".btn")
  const backBtn = document.querySelector(".backBtn")

  const tlLinkRotate = gsap.timeline({ paused: true }).to(".btn svg", {
    rotate: -360,
    repeat: -1,
  })

  const tlCardRotate = gsap
    .timeline({ paused: true })
    .to(".card", {
      rotateY: 180,
      boxShadow: "-4px 4px 12px rgba(34,34,34,0.3)",
    })
    .to(".result", { opacity: 1 })

  btn.addEventListener("mouseenter", () => tlLinkRotate.play())
  btn.addEventListener("mouseleave", () => tlLinkRotate.reverse())

  btn.addEventListener("click", () => tlCardRotate.play())
  backBtn.addEventListener("click", () => tlCardRotate.reverse())
})
</script>

<template lang="pug">
.content
  a(v-for="(data,idx) in counter.urlData"  :class="`url-text url-text-${idx+1}`" :href='data["原網址"]' ref='urlText')
    .url {{ data["原網址"] }} 
    .code {{ data["短網址代碼"] }}

  .card
    CardFront
    CardBack
  .author
    h6 created by 
      a(href="mailto:rodes5292@gmail.com") 
        span ZZ
</template>

<style lang="stylus">
.content
  size(,100vh)
  flex(,,column)
  overflow hidden
  .url-text
    text-align center
    cursor pointer
    text-decoration none
    size(auto)
    flex()
    font-size 1rem

    .code
      position absolute
      opacity 0
    .url
      text-align center
      transition .5s
      z-index 1
      &:hover
        opacity 0
        ~ .code
          opacity 1


.card
  z-index 2
  pos()
  transform translate(-50%,-50%)
  flex(,,column)
  // display none
  size(320px)
  background-color #fff
  box-shadow 4px 4px 12px rgba(color_secondary,0.3)
  border-radius 1rem
  transform-style preserve-3d
  // perspective 800px
  .front,.back
    position absolute
    size()
    flex(,,column)
    backface-visibility hidden
    // overflow hidden

.author
  position absolute
  bottom 0
  right 0
  margin 1rem
  color color_primary
  a
    color color_primary
    text-decoration none
    font-weight 900
</style>
