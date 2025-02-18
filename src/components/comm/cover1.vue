<template>
  <a class="edition" :href="pathname + '?id=' + item.id">
    <img class="cover" :src="item.cover" />
    <div class="c-smn">
      <span>iM</span>
      <span class="c-num">{{ item.issue_number }}</span>
    </div>
    <div class="c-words">
      <div class="c-desc">{{ item.description }}</div>
      <div class="c-more">Read more →</div>
    </div>
  </a>
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
    transition: all 300ms;

    &:hover {
      transform: scale(1.04);
    }

    &:active {
      opacity: 0.8;
    }

  }

  .c-smn {
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 32px;
    font-weight: bolder;
    color: #fff;

    .c-num {
      font-size: 12px;
      font-weight: 300;
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
      padding: 10px;
      width: 60%;
      font-size: 12px;
    }

    .c-more {
      text-align: right;
      margin-right: 10px;
      padding-bottom: 8px;
      font-size: 12px;
    }
  }
}
</style>