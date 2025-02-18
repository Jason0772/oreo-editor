<script setup lang="ts"> 
defineProps({
  title: {
    type: String,
    default: "title"
  },
  img: {
    type: String,
    default: "/imgs/img.png"
  },
  desc: {
    type: String,
    default: "desc"
  },
  style: {
    type: Object,
  },
  titleStyle: {
    type: Object,
    default: {}
  },
  descStyle: {
    type: Object,
    default: {}
  }
})

</script>


<template>
  <div class="temps" :style="style">
    <div class="title" :style="titleStyle">{{ title }}</div>
    <img class="pic" :src="img" />
    <div class="desc" :style="descStyle">{{ desc }}</div>
  </div>
</template>

<style lang="less" scoped>
@import url("./base.less");
</style>
