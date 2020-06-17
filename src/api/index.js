import axios from './requset'
// import axis from 'axios'
//获取网站头部照片
export const getWebImg = ()=>{
    return axios.get('/home/logo')
}

//登录接口
export const getUserName = (username,password) => {
    return axios.post('/admin',{username,password})
}

export const verifyToken = (token) => {
    return axios.get(`/users/verify?authorization=${token}`)
}

//管理员接口
export const getAdmin= () =>{
    return axios.get('/admin/getAdmin')
}
// export const getAd = () => {
//     return axis.get('http://rap2.taobao.org:38080/app/mock/258068/ad')
// }