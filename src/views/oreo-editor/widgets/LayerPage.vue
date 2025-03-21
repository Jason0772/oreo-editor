<template>
    <div class="lpage">
        <a-collapse :default-active-key="['1', '2', '3']" :bordered="false" :show-expand-icon="false"
            expand-icon-position="right">
            <a-collapse-item header="Pages" key="2"> </a-collapse-item>
            <a-collapse-item header="Layers" key="1">
                <a-tree draggable @drop="onDrop" @select="onSelect" @check="onCheck" @expand="onExpand"
                    :selected-keys="selectedKeys" :data="treeData" block-node show-line size="small">
                    <template #extra="nodeData">
                        <v-icon icon="mdi-arrow-up" size="x-small" @click="onMoveUp(nodeData)" class="ml-1" />
                        <v-icon icon="mdi-arrow-down" size="x-small" @click="onMoveDown(nodeData)" class="ml-1" />
                        <v-icon icon="mdi-trash-can-outline" size="x-small" @click="onDel(nodeData)" />
                        <v-icon v-if="!nodeData.item.locked" icon="mdi-lock-outline" size="x-small" class="ml-1"
                            @click="onLock(nodeData)" />
                        <v-icon v-else icon="mdi-lock-open-variant-outline" size="x-small" class="ml-1"
                            @click="onLock(nodeData)" />
                        <v-icon v-if="!nodeData.item.visible" icon="mdi-eye-outline" size="x-small" class="ml-1"
                            @click="onVisible(nodeData)" />
                        <v-icon v-else icon="mdi-eye-off-outline" size="x-small" class="ml-1"
                            @click="onVisible(nodeData)" />
                    </template>
                    <template #switcher-icon="{ isLeaf }">
                        <IconDown v-if="!isLeaf" />
                    </template>
                </a-tree>
            </a-collapse-item>
            <a-collapse-item header="Templates" key="3">
                <div v-for="tmp in tmps" class="boxs" :key="tmp.name" draggable="true"
                @dragstart="onDragstart(tmp)">
                    <component :is="tmp.component" :img="pic" />
                    <!-- <div>{{ tmp.name }}</div> -->
                </div>
            </a-collapse-item>
        </a-collapse>
    </div>
</template>
<script lang="ts" setup>
import { computed, h, ref, markRaw } from 'vue';
import { IconDriveFile, IconDown, IconImage, IconFontColors } from '@arco-design/web-vue/es/icon';
import { VIcon } from 'vuetify/components';
import { VirtualDomType } from '../hooks/enumTypes';
import type { VirtualDom } from '../hooks/enumTypes';
import tmp1 from '@/components/comm/tmp1.vue';
import tmp2 from '@/components/comm/tmp2.vue';
import tmp3 from '@/components/comm/tmp3.vue';
import tmp4 from '@/components/comm/tmp4.vue';
import tmp5 from '@/components/comm/tmp5.vue';
import tmp6 from '@/components/comm/tmp6.vue';
import tmp7 from '@/components/comm/tmp7.vue';

import pic from '@/assets/img/img.jpg';

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);
const treeData = computed(() => {
    const res = buildTree(props.data, 0);
    return res;
});

const onDragstart = (item: any) => {
    console.log('dragstart', item);
    emit('dragstart', item);
}

const onAdd = (item:any)=>{
    console.log(item);
    emit('group', item);
}
const titleWord = "This is a title text. Please modify the content as needed"
const descWord = "This is a piece of content text under a specific topic. It covers certain specific information. Some of this information may not be clear enough or needs to be adjusted and improved according to specific situations, as well as the needs of the target audience"
const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
}
const descStyle = {
    fontSize: '16px',
    color: '#666',
}
const tmps = ref([
    {
        type: "temp",
        name: '模版1',
        component: markRaw(tmp1),
        list: [
            { name: "Text", label: titleWord, width: 300, height: 60, top: 0, left: 0, style: titleStyle },
            { name: "Image", width: 300, height: 200, top: 100, left: 0 },
            { name: "Text", label: descWord, width: 300, height: 100, top: 320, left: 0, style: descStyle },
        ]
    },
    {
        type: "temp",
        name: '模版2',
        component: markRaw(tmp2),
        list: [
            { name: "Image", width: 300, height: 200, top: 0, left: 0 },
            { name: "Text", label: titleWord, width: 300, height: 60, top: 240, left: 0, style: titleStyle },
            { name: "Text", label: descWord, width: 300, height: 100, top: 320, left: 0, style: descStyle },
        ]
    },
    {
        type: "temp",
        name: '模版3',
        component: markRaw(tmp3),
        list: [
            { name: "Image", width: 160, height: 200, top: 0, left: 0 },
            { name: "Text", label: titleWord, width: 150, height: 60, top: 0, left: 180, style: titleStyle },
            { name: "Text", label: descWord, width: 150, height: 100, top: 100, left: 180, style: descStyle },
        ]
    },
    {
        type: "temp",
        name: '模版4',
        component: markRaw(tmp4),
        list: [
            { name: "Text", label: titleWord, width: 150, height: 60, top: 0, left: 0, style: titleStyle },
            { name: "Text", label: descWord, width: 150, height: 100, top: 100, left: 0, style: descStyle },
            { name: "Image", width: 160, height: 200, top: 0, left: 180 },
        ]
    },
    {
        type: "temp",
        name: '模版5',
        component: markRaw(tmp5),
        list: [
            { name: "Image", width: 300, height: 240, top: 0, left: 0 },
            { name: "Text", label: titleWord, width: 200, height: 60, top: 100, left: 50, align: 'center', style: titleStyle },
            { name: "Text", label: descWord, width: 300, height: 40, top: 260, left: 0, style: descStyle },
        ]
    },
    {
        type: "temp",
        name: '模版6',
        component: markRaw(tmp6),
        list: [
            { name: "Image", width: 300, height: 300, top: 0, left: 0 },
            { name: "Text", label: titleWord, width: 200, height: 60, top: 100, left: 50, align: 'center', style: titleStyle },
            { name: "Text", label: descWord, width: 300, height: 40, top: 260, left: 0, style: descStyle },
        ]
    },
    {
        type: "temp",
        name: '模版7',
        component: markRaw(tmp7),
        list: [
            { name: "Image", width: 300, height: 300, top: 0, left: 0 },
            { name: "Text", label: titleWord, width: 200, height: 60, top: 240, left: 50, align: 'center', style: titleStyle },
        ]
    },
]);
const selectedKeys = computed(() => {
    const ids = [];
    for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].active || props.data[i].selected) {
            ids.push(props.data[i].id + '');
        }
    }
    return ids;
});

const emit = defineEmits(['select', 'del', 'moveUp', 'moveDown', 'group', 'dragstart']);

// 添加上移下移方法
const onMoveUp = (nodeData: TreeData) => {
    if (nodeData.item.locked) return;
    // 找到所有层级比当前元素高的元素
    const higherElements = props.data.filter(
        item => (item.styles.zIndex || 0) > (nodeData.item.styles.zIndex || 0)
    );

    if (higherElements.length > 0) {
        // 找到最接近的上层元素
        const nextElement = higherElements.reduce((prev, curr) =>
            (curr.styles.zIndex || 0) < (prev.styles.zIndex || 0) ? curr : prev
        );
        // 将当前元素的 zIndex 设置为比上层元素大 1
        nodeData.item.styles.zIndex = (nextElement.styles.zIndex || 0) + 1;
    } else {
        // 如果已经是最上层，则加 1
        nodeData.item.styles.zIndex = (nodeData.item.styles.zIndex || 0) + 1;
    }
};

const onMoveDown = (nodeData: TreeData) => {
    if (nodeData.item.locked) return;
    // 找到所有层级比当前元素低的元素
    const lowerElements = props.data.filter(
        item => (item.styles.zIndex || 0) < (nodeData.item.styles.zIndex || 0)
    );

    if (lowerElements.length > 0) {
        // 找到最接近的下层元素
        const nextElement = lowerElements.reduce((prev, curr) =>
            (curr.styles.zIndex || 0) > (prev.styles.zIndex || 0) ? curr : prev
        );
        // 将当前元素的 zIndex 设置为比下层元素小 1
        nodeData.item.styles.zIndex = Math.max(0, (nextElement.styles.zIndex || 0) - 1);
    } else {
        // 如果已经是最下层，则减 1，但不小于 0
        nodeData.item.styles.zIndex = Math.max(0, (nodeData.item.styles.zIndex || 0) - 1);
    }
};


const onDrop = (info: any) => {
    const dropKey = info.dropNode.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.dropPosition;

    // 找到被拖拽的元素和目标元素
    const dragItem = props.data.find(item => item.id === parseInt(dragKey));
    const dropItem = props.data.find(item => item.id === parseInt(dropKey));

    if (!dragItem || !dropItem) return;

    // 根据放置位置调整 zIndex
    if (dropPos === -1) {
        // 放在目标之前，zIndex 更小
        dragItem.styles = {
            ...dragItem.styles,
            zIndex: (dropItem.styles?.zIndex || 0) - 1
        };
    } else {
        // 放在目标之后，zIndex 更大
        dragItem.styles = {
            ...dragItem.styles,
            zIndex: (dropItem.styles?.zIndex || 0) + 1
        };
    }
};

const onDel = (nodeData: TreeData) => {
    emit('del', nodeData.item.id);
};
const onLock = (nodeData: TreeData) => {
    console.log(nodeData);
    nodeData.item.locked = !nodeData.item.locked;
};
const onVisible = (nodeData: TreeData) => {
    console.log(nodeData);
    nodeData.item.visible = !nodeData.item.visible;
};

const onSelect = (newSelectedKeys: string[], event: TreeEvent) => {
    console.log('select: ', event.node.item);
    event.node.item.selected = true;
    emit('select', event.node.item);
};

const onCheck = (newCheckedKeys: string[], event: TreeEvent) => {
    console.log('check: ', newCheckedKeys, event);
};

const onExpand = (newExpandedKeys: string[], event: TreeEvent) => {
    console.log('expand: ', newExpandedKeys, event);
};

function buildTree(flatData: VirtualDom[], rootId: number) {

    const tree: TreeData[] = [];
    // 先找出当前层级的所有元素
    const currentLevelItems = flatData.filter(item => item.groupId === rootId);

    // 按 zIndex 从大到小排序
    currentLevelItems.sort((a, b) => (b.styles.zIndex || 0) - (a.styles.zIndex || 0));

    // 构建树结构
    for (const item of currentLevelItems) {
        const children = buildTree(flatData, item.id);
        const icon = getIcon(item.type, item.icon);
        let title = item.name;
        if (item.type === VirtualDomType.Text) {
            title = item.label + '';
        }
        tree.push({
            item,
            key: item.id + '',
            title,
            switcherIcon: children.length ? undefined : icon,
            children,
        });
    }
    return tree;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getIcon = (type: number, _icon: string) => {
    let icon = () => h(IconDriveFile);
    if (type === VirtualDomType.Image) {
        icon = () => h(IconImage);
    }
    if (type === VirtualDomType.Text) {
        icon = () => h(IconFontColors);
    }
    // if (type === VirtualDomType.Icon) {
    //     icon = () => h(VIcon, { icon: icon });
    // }
    return icon;
};
interface TreeData {
    item: VirtualDom;
    key: string;
    title: string;
    switcherIcon?: any;
    children: TreeData[];
}
interface TreeEvent {
    e: PointerEvent;
    node: TreeData;
    selected: boolean;
    selectedNodes: TreeData[];
}
</script>

<style lang="scss" scoped>
.lpage {
    height: 100%;
    overflow-y: auto;
}

.boxs {
    box-sizing: border-box;
    padding: 8px;
    background: #fff;
    margin: 0 auto 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
</style>
