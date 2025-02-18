import { type Ref } from 'vue';
import { cloneDeep } from 'lodash';
import { beaseDom, virtualGroup, type OreoEvent, VirtualDomType } from './enumTypes';

export const useTemplate = (oreoEvent: OreoEvent) => {

    const addTemplate = (name: string) => {

        for (let i = 0; i < oreoEvent.appDom.value.length; i++) {
            oreoEvent.appDom.value[i].selected = false;
        }
       
        const _id_ = Date.now();
        const obj = cloneDeep(virtualGroup);
        obj.id = _id_;
        obj.styles.left = 400;
        obj.styles.top = 300;
        obj.selected = true;
        obj.active = true;

        const title = cloneDeep(beaseDom[2]);
        title.id = _id_ + 1;
        title.groupId = _id_;
        title.styles.width = 200;
        title.styles.height = 20;
        title.styles.left = 400;
        title.styles.top = 400;
        title.label = '标题文字';
        // title.selected = true;
        // title.active = true;

        const desc = cloneDeep(beaseDom[2]);
        desc.id = _id_ + 2;
        desc.groupId = _id_;
        desc.styles.width = 200;
        desc.styles.height = 80;
        desc.styles.left = 400;
        desc.styles.top = 500;
        desc.label = '内容文字';
        // desc.selected = true;
        // desc.active = true;

        const img = cloneDeep(beaseDom[3]);
        img.id = _id_ + 3;
        img.groupId = _id_;
        img.styles.width = 180;
        img.styles.height = 120;
        img.styles.left = 400;
        img.styles.top = 600;
        // img.selected = true;
        // img.active = true;

       
        oreoEvent.curDom.value = obj;
        oreoEvent.appDom.value.push(oreoEvent.curDom.value);
        oreoEvent.appDom.value.push(title);
        oreoEvent.appDom.value.push(desc);
        oreoEvent.appDom.value.push(img);

        console.log('添加了新的模版');
        console.log(oreoEvent.appDom.value);

        // const res = oreoEvent.getBoundsInfo();

        // if (obj) {
        //     obj.name = 'Group';
        //     obj.type = VirtualDomType.Group;
            
        //     obj.styles.width = res.width;
        //     obj.styles.height = res.height;
        //     obj.styles.left = res.left;
        //     obj.styles.top = res.top;

        //     for (let i = 0; i < oreoEvent.appDom.value.length; i++) {
        //         oreoEvent.appDom.value[i].selected = false;
        //     }

        //     obj.selected = true;
        //     obj.active = true;

        //     oreoEvent.curDom.value = obj;
        //     oreoEvent.appDom.value.push(oreoEvent.curDom.value);

        // }
       
    };

    return {
        addTemplate,
        // rectWorkEventMove,
        // rectWorkEventUp,
        // onBottomToolsDraRact,
    };
};
