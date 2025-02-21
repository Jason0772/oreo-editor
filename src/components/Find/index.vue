<template>
    <div>
        <div class="lbe">Category</div>
        <div>
            <v-select v-model="selected" :items="items" item-title="name" item-value="id" outlined
                @update:model-value="onSelect" density="compact"></v-select>
        </div>

        <div class="lbe">Keyword</div>
        <div>
            <!-- 搜索框 -->
            <v-text-field v-model="searchQuery" density="compact" outlined clearable @click:clear="clearSearch"
                @keyup.enter="search" class="sbx">
                <template v-slot:append-inner>
                    <v-icon size="small" @click="search" class="cursor-pointer">mdi-magnify</v-icon>
                </template>
            </v-text-field>

            <!-- 下拉数据列表 -->
            <v-list v-if="showResults" class="dropdown-list">
                <!-- 加载状态 -->
                <v-list-item v-if="loading">
                    <div class="d-flex align-center justify-center" style="width: 100%">
                        <v-progress-circular indeterminate size="20"></v-progress-circular>
                        <span class="ml-2">加载中...</span>
                    </div>
                </v-list-item>

                <!-- 空数据状态 -->
                <v-list-item v-else-if="!loading && filteredList.length === 0">
                    <div class="d-flex align-center justify-center text-grey" style="width: 100%">
                        暂无数据
                    </div>
                </v-list-item>

                <!-- 数据列表 -->
                <v-list-item v-else v-for="(item, index) in filteredList" :key="index" @click="selectItem(item)">
                    <div class="d-flex align-center" style="width: 100%">
                        <v-img class="imgs" :src="item.cover" cover></v-img>
                        <div class="ml-4" style="flex: 1">
                            <div class="text-truncate font-weight-medium">{{ item.title }}</div>
                            <div class="text-caption text-grey">{{ item.author }}</div>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { getRequest } from '@/comm/request';

const emit = defineEmits(['choose']);

const loading = ref(false);
const searchQuery = ref(''); // 搜索框输入内容
const showResults = ref(false); // 是否显示下拉列表
const list = ref([]); // 数据列表

const selectId = ref(null);

const selected = ref(null);
const items = ref([]);

onMounted(async () => {
  try {
    const res = await getRequest("/api/im/category/");
    console.log("res", res);
    items.value = res.list;
  } catch (err) {
    console.log("err", err);
  }
});

const onSelect = (value) => {
  const selectedItem = items.value.find(item => item.id === value);
  console.log('选中的数据:', selectedItem);
  selectId.value = selectedItem.id;
  showResults.value = false;
  searchQuery.value = '';
};

// 过滤后的列表
const filteredList = computed(() => {
  return list.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 搜索方法
const search = async () => {
  showResults.value = true;
  loading.value = true;

  const param = {
    category: selectId.value
  };
  if (searchQuery.value !== '') {
    param.q = searchQuery.value;
  }

  try {
    const res = await getRequest("/api/im/post/", param);
    list.value = res.list;
  } finally {
    loading.value = false;
  }
};

// 清空搜索
const clearSearch = () => {
  searchQuery.value = '';
  showResults.value = false;
};

// 选择列表项
const selectItem = (item) => {
  console.log('选中的列表项:', item);
  searchQuery.value = item.title;
  showResults.value = false;
  emit('choose', item);
};
</script>

<style scoped lang="scss">
.dropdown-list {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 1px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .imgs {
        width: 40px;
        height: 30px;
        background-color: #aaa;
        flex: none;
    }

    .v-list-item {
        cursor: pointer;

        &:hover {
            background-color: #f5f5f5;
        }

        padding: 8px 16px;

        .text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

.sbx {
    :deep(.v-input__details) {
        display: none;
    }
}

.lbe {
    margin-bottom: 4px;
    color: #999;
}
</style>