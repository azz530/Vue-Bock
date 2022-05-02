import axios from 'axios'
import { Loading } from 'element-ui';
let loading;
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rgba(0,0,0,0.7)'
    })
}
function endLoading(){
    loading.close();
}

let service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/' : '',
    baseURL:'http://127.0.0.1:3000/',
    timeout:3000,
})
service.interceptors.request.use(config=>{
    startLoading();
    const token = sessionStorage.getItem('token');
    if(token) {
        config.headers['Authorization'] = token;
    }
    return config;
},err=>{
    return new Promise.reject(err);
})

service.interceptors.response.use(response=>{
    endLoading();
    return response.data;
},err=>{
    return new Promise.reject(err);
})

export default service;