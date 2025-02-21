import { type Ref } from 'vue';
import { cloneDeep } from 'lodash';
import { beaseDom, virtualGroup, type OreoEvent, VirtualDomType } from './enumTypes';

export const useTemplate = (oreoEvent: OreoEvent) => {

    const addTemplate = (tmp: any, startX = 0, startY = 0) => {

        startX = startX - 2020
        startY = startY - 2020

        for (let i = 0; i < oreoEvent.appDom.value.length; i++) {
            oreoEvent.appDom.value[i].selected = false;
        }

        const _id_ = Date.now();

        const items:any[] = []

        const sons = tmp.list;
        sons.forEach((son: any, i:number) => {
            const dom = beaseDom.find(item => item.name === son.name);
            if(!dom) return;
            const item = cloneDeep(dom);
            item.id = _id_ + i + 1;
            item.styles.width = son.width;
            item.styles.height = son.height;
            item.styles.left = startX + son.left;
            item.styles.top = startY + son.top;
            item.styles.background = "#e0e0e0"
            if(son.name === 'Text'){
                item.label = son.label;
                item.fontStyle = {
                    ...son.style
                };
                if(son.align){
                    item.fontStyle.textAlign = son.align;
                }
            }
            items.push(item);

            oreoEvent.appDom.value.push(item);
        })

        console.log("items", oreoEvent.appDom.value)
        
        // const title = cloneDeep(beaseDom[2]);
        // title.id = _id_ + 1;
        // title.styles.width = 200;
        // title.styles.height = 20;
        // title.styles.left = startX;
        // title.styles.top = startY;
        // title.label = '标题文字';

        // const desc = cloneDeep(beaseDom[2]);
        // desc.id = _id_ + 2;
        // desc.styles.width = 200;
        // desc.styles.height = 80;
        // desc.styles.left = startX;
        // desc.styles.top = startY + 100;
        // desc.label = '内容文字';

        // const img = cloneDeep(beaseDom[3]);
        // img.id = _id_ + 3;
        // img.styles.width = 180;
        // img.styles.height = 120;
        // img.styles.left = startX;
        // img.styles.top = startY + 200;

        // const items = [title, desc, img]
        for (let i = 0; i < items.length; i++) {
            items[i].selected = true;
            items[i].active = true;
        }

        setTimeout(() => {
            const obj = cloneDeep(virtualGroup);
            obj.id = _id_;
            // obj.type = VirtualDomType.Group

            for (let i = 0; i < items.length; i++) {
                items[i].groupId = _id_;
                items[i].active = true;
            }

            oreoEvent.selectedList.value = [...items]

            const bounds = oreoEvent.getBoundsInfo();
            obj.styles.width = bounds.width;
            obj.styles.height = bounds.height;
            obj.styles.left = bounds.left;
            obj.styles.top = bounds.top;

            console.log("bounds", bounds);

            obj.selected = true;
            obj.active = true;
            obj.name = tmp.name;
            oreoEvent.curDom.value = undefined;
            oreoEvent.appDom.value.push(obj);
            oreoEvent.selectedList.value = []
            for (let i = 0; i < items.length; i++) {
                items[i].active = false;
            }
            setTimeout(() => {
                oreoEvent.curDom.value = obj;
                obj.type = VirtualDomType.Group;

                oreoEvent.selectedList.value = [...items]
            }, 90);

        }, 300);

        // oreoEvent.appDom.value.push(title);
        // oreoEvent.appDom.value.push(desc);
        // oreoEvent.appDom.value.push(img);

        console.log('添加了新的模版');
        console.log(oreoEvent.appDom.value);

    };

    const onPost = (obj) => {
        const list = oreoEvent.selectedList.value;
        console.log('list', list, obj);
        const txts = [obj.title, obj.description];
        list.forEach((item) => {
            if (item.name === 'Text') {
                item.label = txts.shift() || "";
            }
            if (item.name === 'Image') {
                item.url = obj.cover;
            }
        })

    }

    let dragingDom: any;
    const onDragTempStart = (tmp: any) => {
        dragingDom = tmp
        oreoEvent.dragTemp = tmp
    }

    const onDragTempOver = (tmp: any) => {
        dragingDom = tmp
    }

    const onTempDrop = (e: any, item: any) => {
        // 打印 onDrop--- 和传入的参数
        console.log('onDrop---', e);
        // 阻止默认行为
        e.preventDefault();
        // 如果 dragingDom 不存在，则返回
        // if (!dragingDom) return;
        // @ts-ignore
        // 获取目标元素的矩形区域
        // const divRect = e.target.getBoundingClientRect() as DOMRect;
        // 取消当前激活的节点
        oreoEvent.cancelActived();
        // 获取 dragingDom 的宽度和高度
        // const { width, height } = dragingDom.styles;
        // // @ts-ignore 这个2020 是 work-content 外边距 margin: 2000px; 加上 .work-area padding: 20px;
        // dragingDom.styles.top = e.clientY + e.target.scrollTop - divRect.top - 2020 - height / 2;
        // // @ts-ignore
        // dragingDom.styles.left = e.clientX + e.target.scrollLeft - divRect.left - 2020 - width / 2;
        // dragingDom.id = new Date().getTime();
        // oreoEvent.curDom.value = dragingDom;
        // oreoEvent.appDom.value.push(oreoEvent.curDom.value);

       
        const x = e.clientX + e.target.scrollLeft
        const y = e.clientY + e.target.scrollTop
        console.log(x, y, item)

        addTemplate(item, x, y)
    };

    return {
        addTemplate,
        onPost,
        onDragTempStart,
        onDragTempOver,
        onTempDrop,
        // rectWorkEventMove,
        // rectWorkEventUp,
        // onBottomToolsDraRact,
    };
};
