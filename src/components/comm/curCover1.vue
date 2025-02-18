<template>
  <div class="edition">
    <img class="cover" :src="item.cover" />
    <div class="c-smn">
      <span>iM</span>
      <span class="c-num">{{ item.issue_number }}</span>
    </div>
    <div class="c-words">
      <div class="c-desc">{{ item.description }}</div>
      <div class="c-more">Read more →</div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const pathname = ref(route.path)
defineProps({
  item: {
    type: Object
  }
})
</script>

<style lang="less" scoped>
.edition {
  aspect-ratio: 2 / 3;
  overflow-y: hidden;
  overflow-x: auto;
  background: #f0f0f0;
  display: block;
  position: relative;
  overflow: hidden;

  .cover {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:active {
      opacity: 0.8;
    }

  }

  .c-smn {
    position: absolute;
    top: 37px;
    left: 70px;
    color: #F2EEE8;

    text-align: center;
    font-family: Poppins;
    font-size: 96px;
    font-style: normal;
    font-weight: 900;

    .c-num {
      color: #F2EEE8;
      font-family: Poppins;
      font-size: 24px;
    }
  }

  .c-words {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;

    .c-desc {
      padding: 60px;
      color: #F2EEE8;
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: 149.97%;
      width: 60%;
    }

    .c-more {
      text-align: right;
      margin-right: 18px;
      padding-bottom: 18px;
      font-family: Lexend;
      font-size: 36px;
    }
  }
}
</style>