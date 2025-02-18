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
    <img class="pic" :src="img" />
    <div class="info">
      <div class="title" :style="titleStyle">{{ title }}</div>
      <div class="desc" :style="descStyle">{{ desc }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.temps {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  // background: #f0f0f0;
  // border: solid 1px #a0a0a0;
  gap: 10px;
  flex: 1 0 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 100px;

  .pic {
    flex: 1 0 0;
    overflow: hidden;
    object-fit: cover;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
      font-size: 20px;
      font-family: CustomFont;
      font-weight: bolder;
      color: #000;
    }

    .desc {
      flex: 1;
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
