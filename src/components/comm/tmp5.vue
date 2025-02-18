<script setup lang="ts">
// import { getStyleNumber } from '@/comm/tooler';
import { computed } from 'vue';


const props = defineProps({
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
const lineStyle = computed(() => {
  let h = 10;
  if (props.titleStyle) {
    h = getStyleNumber(props.titleStyle.fontSize, 24) / 2;
  }
  return {
    height: h + "px",
    transform: `translateY(-${h}px)`
  }
})

function getStyleNumber(val: any, defaultVal: any) {
  if (val) {
    const t = parseFloat(val);
    if (!isNaN(t)) {
      return t;
    }
  }

  return defaultVal;
}
</script>


<template>
  <div class="temps" :style="style">
    <div class="title">
      <div class="tname" :style="titleStyle">{{ title }}</div>
      <div class="tline" :style="lineStyle"></div>
    </div>
    <img class="pic" :src="img" />
    <div class="desc" :style="descStyle">{{ desc }}</div>
  </div>
</template>

<style lang="less" scoped>
.temps {
  display: flex;
  flex-direction: column;
  // background: #f0f0f0;
  // border: solid 1px #a0a0a0;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 100px;

  .title {
    font-size: 20px;
    font-family: CustomFont;

    font-weight: bolder;
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    margin: auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tname {
      width: fit-content;
      text-align: center;
      padding: 0 10px;
      z-index: 2;
    }

    .tline {
      height: 10px;
      width: 100%;
      background: rgba(52, 52, 52, 1);
      transform: translateY(-10px);
      z-index: 1;
    }
  }

  .pic {
    display: block;
    min-height: 20px;
    object-fit: cover;
    flex: 1 0 0;
  }

  .desc {
    font-size: 12px;
    color: #333;
  }
}
</style>
