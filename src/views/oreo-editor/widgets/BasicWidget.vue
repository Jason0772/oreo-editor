<template>
    <div class="tools">
        <v-btn
            v-for="item in props.data"
            :key="item.id"
            variant="text"
            :icon="item.icon"
            size="x-small"
            draggable="true"
            @dragstart="onDragstart(item)"
        >
            <v-icon :icon="item.icon"></v-icon>
        </v-btn>
    </div>
</template>
<script lang="ts" setup>
import type { VirtualDom } from '../hooks/enumTypes';
import { cloneDeep } from 'lodash';

const emit = defineEmits(['draging', 'addimg']);

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);

const onDragstart = (e: VirtualDom) => {
    console.warn('onDragstart', e);
    emit('draging', cloneDeep(e));
};
</script>
