import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development'
const service = axios.create({
    baseURL : isDev ? 'http://10.3.135.29:3000' : ''
})

service.interceptors.request.use(config => {
    return config
},err => {

})

service.interceptors.response.use(res =>{
    return res.data
},err => {
    console.log(err);
})

export default service