<template>
    <div
        class="contextmenu"
        v-if="visible"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    >
        <div class="contextmenu_item" @click="actions.onMenuVisible">
            <div class="contextmenu_label">隐藏/显示</div>
            <div class="contextmenu_desc">Shift + Ctrl + H</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuDelete">
            <div class="contextmenu_label">删除</div>
            <div class="contextmenu_desc">Delete & Back</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuLocked">
            <div class="contextmenu_label">锁定/解锁</div>
            <div class="contextmenu_desc">Shift + Ctrl + L</div>
        </div>
        <div class="contextmenu_item">
            <div class="contextmenu_label">复制</div>
            <div class="contextmenu_desc">Ctrl + C</div>
        </div>
        <div class="contextmenu_item">
            <div class="contextmenu_label">粘贴</div>
            <div class="contextmenu_desc">Ctrl + V</div>
        </div>
        <div v-if="showGroup" class="contextmenu_item" @click="actions.onMenuGroup">
            <div class="contextmenu_label">组合</div>
            <div class="contextmenu_desc">Ctrl + G</div>
        </div>
        <div v-if="showGroup" class="contextmenu_item" @click="actions.onMenuDisbandGroup">
            <div class="contextmenu_label">解除组合</div>
            <div class="contextmenu_desc">Shift + Ctrl + G</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuMoveUp">
            <div class="contextmenu_label">上移</div>
            <div class="contextmenu_desc">Ctrl + ↑</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuMoveDown">
            <div class="contextmenu_label">下移</div>
            <div class="contextmenu_desc">Ctrl + ↓</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { VirtualDom } from '../hooks/enumTypes';
import type { MeneActions } from '../hooks/useMouseMenu';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
        visible: boolean;
        left: number;
        top: number;
        actions: MeneActions;
    }>(),
    {}
);
const showGroup = computed(() => {
    return props.data.length;
});
</script>
<style lang="scss">
.contextmenu {
    background: rgba(18, 18, 18);
    position: fixed;
    // left: 200px;
    // top: 300px;
    z-index: 999;
    padding: 4px;
    border-radius: 6px;
    // transform: scale(1) !important;
    // transform-origin: top left;
    .contextmenu_item {
        color: #fff;
        line-height: 28px;
        height: 28px;
        padding: 0 12px;
        margin: 2px 0;
        font-size: 11px;
        width: 200px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.8;
        &:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }
    }
}
</style>
