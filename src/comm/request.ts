import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { redirect } from './tooler';

const baseURL: string = "";

const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 添加请求拦截器，设置 token
instance.interceptors.request.use((config: any) => {
    console.log("config", config)
    // static.infomate.co.nz
    const token = localStorage.getItem("token");
    if (token && !config.url.includes("static.infomate.co.nz")) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    // 如果数据是 FormData，则删除 Content-Type 头，让浏览器自动设置
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器，处理错误
instance.interceptors.response.use((response) => response.data, (error) => {
    if (error.response) {
        // 处理服务器返回的错误状态码
        console.error(`服务器错误: ${error.response.status}`);
        if (error.response.status == 401) {
            redirect()
        }
    } else if (error.request) {
        // 处理请求未发送的情况
        console.error('请求未发送');
    } else {
        // 处理其他错误
        console.error('发生错误:', error.message);
    }
    return Promise.reject(error);
});

// GET 方法封装
const getRequest = async (url: string, params: object = {}): Promise<any> => {
    try {
        const response = await instance.get(url, { params });
        return response;
    } catch (error) {
        throw error;
    }
};

// POST 方法封装
const postRequest = async (url: string, data: object = {}): Promise<any> => {
    try {
        const response = await instance.post(url, data);
        return response;
    } catch (error) {
        throw error;
    }
};



// PATCH 方法封装
const patchRequest = async (url: string, data: object = {}): Promise<any> => {
    try {
        const response = await instance.patch(url, data);
        return response;
    } catch (error) {
        throw error;
    }
};

// 文件上传方法封装
const uploadFile = async (url: string, file: File, additionalData: any = {}): Promise<any> => {
    const formData = new FormData();


    // 添加额外的数据到 FormData
    // Object.entries(additionalData).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    // formData.append('file', file);
    for (const key in additionalData) {
        formData.append(key, additionalData[key])
    }
    formData.append('file', file);

    try {
        const response = await instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        //   const response = await fetch(url, {
        //     method: "POST",
        //     body: formData
        //   })
        return response;
    } catch (error) {
        throw error;
    }
};

export { getRequest, postRequest, patchRequest, uploadFile };