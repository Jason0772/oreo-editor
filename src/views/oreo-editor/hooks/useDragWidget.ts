import { type OreoEvent, type VirtualDom } from './enumTypes';

// 导出一个名为 useDragWidget 的函数，接收一个 OreoEvent 类型的参数
export const useDragWidget = (oreoEvent: OreoEvent) => {
    // 当前拖动中的节点
    let dragingDom: VirtualDom;
    //
    // 定义一个名为 onDraging 的函数，接收一个 VirtualDom 类型的参数
    const onDraging = (item: VirtualDom) => {
        // e.preventDefault();
        // 将传入的参数赋值给 dragingDom
        dragingDom = item;
    };

    // 定义一个名为 onDragover 的函数，接收一个 DragEvent 类型的参数
    const onDragover = (e: DragEvent) => {
        // 阻止默认行为
        e.preventDefault();
    };

    // 定义一个名为 onDrop 的函数，接收一个 DragEvent 类型的参数
    const onDrop = (e: DragEvent, dragingDom:any) => {
        // 打印 onDrop--- 和传入的参数
        console.log('onDrop---', e);
        // 阻止默认行为
        e.preventDefault();
       
        // 如果 dragingDom 不存在，则返回
        // if (!dragingDom) return;
        // @ts-ignore
        // 获取目标元素的矩形区域
        const divRect = e.target.getBoundingClientRect() as DOMRect;
        // 取消当前激活的节点
        oreoEvent.cancelActived();
        // 获取 dragingDom 的宽度和高度
        const { width, height } = dragingDom.styles;
        // @ts-ignore 这个2020 是 work-content 外边距 margin: 2000px; 加上 .work-area padding: 20px;
        dragingDom.styles.top = e.clientY + e.target.scrollTop - divRect.top - 2020 - height / 2;
        // @ts-ignore
        dragingDom.styles.left = e.clientX + e.target.scrollLeft - divRect.left - 2020 - width / 2;
        dragingDom.id = new Date().getTime();
        oreoEvent.curDom.value = dragingDom;
        oreoEvent.appDom.value.push(dragingDom);
    };

    return {
        onDraging,
        onDragover,
        onDrop,
    };
};
