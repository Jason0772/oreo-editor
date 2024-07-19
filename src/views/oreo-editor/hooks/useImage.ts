import { ref, type Ref } from 'vue';
import { cloneDeep } from 'lodash';
import { beaseDom, type VirtualDom } from './enumTypes';
import type { OreoPointerEvent } from './enumTypes';

export const useImage = (
    appDom: Ref<VirtualDom[]>,
    curDom: Ref<VirtualDom | undefined>,
    pointerEvent: OreoPointerEvent
) => {
    const imageFileRef = ref<any>();

    const onBottomToolsImage = () => {
        pointerEvent.cancelActived();
        pointerEvent.onMouseMode('image');
        imageFileRef.value?.click();
    };

    const onAddImage = (event: Event) => {
        const obj = cloneDeep(beaseDom[3]);
        obj.active = false;
        obj.id = new Date().getTime();
        // @ts-ignore
        const file = event.target?.files[0];
        if (!file) return;
        const _URL = window.URL || window.webkitURL;
        const image = new Image();
        obj.url = _URL.createObjectURL(file);
        image.src = obj.url;
        image.onload = () => {
            obj.styles.fill = false;
            obj.styles.width = 216;
            obj.styles.height = (image.height / image.width) * 216;

            curDom.value = obj;
            appDom.value.push(curDom.value);
            console.log(appDom.value);
        };
    };

    return {
        imageFileRef,
        onBottomToolsImage,
        onAddImage,
    };
};
