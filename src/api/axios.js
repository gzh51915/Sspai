import axios from 'axios'

import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro;

class HttpRequest {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.queue = {}
    }
    //固定的配置
    getInsideConfig(){
        const token = sessionStorage.getItem('adminToken')
        const config = {
            baseURL:this.baseUrl,
            headers :{
                'authorization': token,
            }
        }
        return config
    }
    //拦截处理
    interceptors(instance,url){
        instance.interceptors.request.use((config)=>{
            //处理请求config
            // console.log('拦截和处理');
            return config
        });
        instance.interceptors.response.use((res)=>{
            //处理响应内容
            // console.log('响应处理');
            return res.data
        },(error => {
            //请求出问题，处理问题
            console.log('请求失败');
            return {error:'失败'}
        }))
    }
    //发送请求设置
    request(options){
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(),options);
        this.interceptors(instance,options.url);
        return instance(options)
    }
}

const axiosObj = new HttpRequest(baseUrl)

export default axiosObj

