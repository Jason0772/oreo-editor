import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getRequest, patchRequest, postRequest } from "@/comm/request";
// import { ElMessage } from "element-plus";
import { getTmpObjects } from "@/comm/tooler";

export const useLPageStore = defineStore("page", () => {
  const curItem = ref<any>({type: 'stage'});
  const list = ref([]);
  const previewShow = ref(false)
  const background = ref('#ffffff')

  const init = (id:any)=>{
    getRequest("/api/im/page/" + id).then(res => {
      console.log("res", res)
      list.value = res.schema
      if(res.config?.color){
        background.value = res.config?.color
      }
    }).catch(err => {
      console.log("err", err)
    })
  }

  const updatePage = (id:any)=>{
    const posts: any[] = [];//更新
    patchRequest("/api/im/page/" + id, {
      schema: list.value,
      posts: posts.map(i=>i.data.post),
      config: {color: background.value}
    }).then(res => {
      console.log("res", res)
      if (res.id) {
        // ElMessage({
        //   message: 'Update Success',
        //   type: 'success',
        // })
      }
    }).catch(err => {
      console.log("err", err)
    //   ElMessage("Error")
    })
  }

  const savePage = ()=>{
    const posts = getTmpObjects(list.value);
    postRequest("/api/im/page/", {
      schema: list.value,
      posts: posts.map(i=>i.data.post),
      config: {color: background.value}
    }).then(res => {
      console.log("res", res)
      if (res.id) {
        // ElMessage({
        //   message: 'Save Success',
        //   type: 'success',
        // })
      }
    }).catch(err => {
      console.log("err", err)
    //   ElMessage("Error")
    })
  }

  return { updatePage, savePage, init};
});