import { createApp } from 'vue';
import './styles/reset.scss';
import App from './App.vue';
import router from './router';
import { vuetify, arcoVue } from '@/plugins';
import { redirect, getUrlParams } from "./comm/tooler";
import { createPinia } from 'pinia';

const token = getUrlParams("token");
  if(token){
    localStorage.setItem('token', token);
    // 重定向
    location.href = location.pathname
  }
  else{
    if(!localStorage.getItem('token')){
        //重定向
        // const url = `${location.origin}/admin/authorization/?scope=im-maker&redirect=${location.origin}/admin/immaker/`
        // location.href = url
        redirect();
    }
  }

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.use(arcoVue); // only use oreo-editor
app.use(router);

app.mount('#app');
