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
    <div class="infos">
      <div class="title" :style="titleStyle">{{ title }}</div>
      <div class="desc" :style="descStyle">{{ desc }}</div>
    </div>
    <img class="pic" :src="img" />
  </div>
</template>

<style lang="less" scoped>
.temps {
  // background: #f0f0f0;
  // border: solid 1px #a0a0a0;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 100px;

  .infos {
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: 10%;
    margin: auto;
    z-index: 1;

    .title {
      font-size: 20px;
      font-family: CustomFont;

      font-weight: bolder;
      color: #fff;
      text-align: center;
      padding: 0 10px;
      z-index: 2;
    }
    .desc {
      font-size: 12px;
      color: #fff;
    }
  }

  .pic {
    display: block;
    min-height: 20px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
