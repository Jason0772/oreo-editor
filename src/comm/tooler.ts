import { postRequest, uploadFile } from "./request";
import SparkMD5 from 'spark-md5';

export const onChooseFile = async (file: any) => {
    console.log(file);
    // const file = e.target.files[0];
    const hash = await calcMD5(file)
    const data = { hash, name: file.name }
    const res = await postRequest("/api/common/presigned_upload_url", data)
    console.log(res);
    if (res.url) {
        console.log(res.url)
        // layoutStore.changeImage(res.url)
        return res.url
    }
    else {
        const r = await uploadFile(res.upload_url, file, res.form_data);
        console.log('r', r)
        return "https://static.infomate.co.nz/infomate/" + res.form_data.key;
    }
}

const calcMD5 = (file: any) => {
    return new Promise<void>((resolve) => {
        const chunkSize = 8192
        const fileReader = new FileReader()
        const spark = new SparkMD5.ArrayBuffer()
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        const loadNextChunk = () => {
            const start = currentChunk * chunkSize
            const end = Math.min(file.size, start + chunkSize)
            const chunk = file.slice(start, end)
            fileReader.readAsArrayBuffer(chunk)
        }
        fileReader.onload = (event: any) => {
            spark.append(event.target.result)
            currentChunk++
            if (currentChunk < chunks) {
                loadNextChunk()
            } else {
                const md5 = spark.end()
                resolve(md5.slice(0, 8))
            }
        }
        fileReader.onerror = () => {
            resolve()
        }
        loadNextChunk()
    })
}

export function redirect() {
    const url = `${location.origin}/admin/authorization/?scope=im-maker&redirect=${location.origin}/admin/immaker/`
    location.href = url;
}

export function getStyleNumber(val: any, defaultVal: any) {
    if (val) {
        const t = parseFloat(val);
        if (!isNaN(t)) {
            return t;
        }
    }

    return defaultVal;
}

export function getTmpObjects(data: any) {
    let tmpObjects: any[] = [];

    function traverse(arr: any) {
        for (let item of arr) {
            if (item.type === 'tmp') {
                tmpObjects.push(item);
            }
            if (item.tasks && item.tasks.length > 0) {
                traverse(item.tasks);
            }
        }
    }

    traverse(data);
    return tmpObjects;
}

export function getUrlParams(key: string, url = '') {
    url = url || location.href
    const params = new URLSearchParams(new URL(url).search);
    return params.get(key);
}

export function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}