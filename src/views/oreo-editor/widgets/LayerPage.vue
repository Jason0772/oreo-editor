<template>
    <a-collapse :default-active-key="['1', '2']" :bordered="false" :show-expand-icon="false"
        expand-icon-position="right">
        <a-collapse-item header="Pages" key="2"> </a-collapse-item>
        <a-collapse-item header="Layers" key="1">
            <a-tree draggable @drop="onDrop" @select="onSelect" @check="onCheck" @expand="onExpand"
                :selected-keys="selectedKeys" :data="treeData" block-node show-line size="small">
                <template #extra="nodeData">
                    <v-icon icon="mdi-arrow-up" size="x-small" @click="onMoveUp(nodeData)" class="ml-1" />
                    <v-icon icon="mdi-arrow-down" size="x-small" @click="onMoveDown(nodeData)" class="ml-1" />
                    <v-icon icon="mdi-trash-can-outline" size="x-small" @click="onDel(nodeData)" />
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
    </a-collapse>
</template>
<script lang="ts" setup>
import { computed, h } from 'vue';
import { IconDriveFile, IconDown, IconImage, IconFontColors } from '@arco-design/web-vue/es/icon';
import { VIcon } from 'vuetify/components';
import { VirtualDomType } from '../hooks/enumTypes';
import type { VirtualDom } from '../hooks/enumTypes';

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

const selectedKeys = computed(() => {
    const ids = [];
    for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].active || props.data[i].selected) {
            ids.push(props.data[i].id + '');
        }
    }
    return ids;
});

const emit = defineEmits(['select', 'del', 'moveUp', 'moveDown']);

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
