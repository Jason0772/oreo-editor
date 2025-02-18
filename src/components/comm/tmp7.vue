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
    <div class="infos">
      <div class="title" :style="titleStyle">{{ title }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.temps {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 100px;
  display: flex;
  flex-direction: column;

  .infos {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(52, 52, 52, 1);

    .title {
      font-size: 20px;
      font-family: CustomFont;

      font-weight: bolder;
      color: #fff;
      text-align: center;
      padding: 4px;
    }
  }

  .pic {
    display: block;
    min-height: 20px;
    object-fit: cover;
    width: 100%;
    flex: 1 0 0;
  }
}
</style>
