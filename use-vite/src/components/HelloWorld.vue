<script setup>
import { ref,computed } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0);
const imgUrls = ['https://p8.itc.cn/images01/20230824/7d2c939956664f3c86ffb564f33aa57c.jpeg','https://live.staticflickr.com/2511/4142792553_4601d0fbdc_z.jpg']
const imgUrl = computed(()=>{
  const width = document.body.clientWidth;
  if(width < 1000){
    return imgUrls[0]
  }
  return imgUrls[1] 
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <img :src="imgUrl" alt="">
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
