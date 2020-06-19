import axios from './axios.js'


//登录请求
export const loginRequest = (username,password)=>{
    return axios.request({
        url:'/admin',
        method:'post',
        data:{
            username,password
        }
    })
}
//token验证请求
export const tokenRequest = (authorization)=>{
    return axios.request({
        method:'get',
        url:'/users/verify?authorization='+authorization
    })
}
//====================================================================================
//获取管理员信息请求
export const adminRequest = (username,password)=>{
    return axios.request({
        url:'/admin/getAdmin',
        method:'get'
    })
}
//修改管理员权限
export const changeRequest = (username,power)=>{
    return axios.request({
        url:'/admin/change',
        method:'post',
        data:{username,power}
    })
}
//添加管理员
export const addAdminRequest = (username,password,role)=>{
    return axios.request({
        method:'post',
        url:'/admin/add',
        data:{
            username,password,role
        }
    })
}

//删除管理员
export const removeAdminRequest = (username)=>{
    return axios.request({
        method:'post',
        url:'/admin/remove',
        data:{username}

    })
}

//======================================================================================
//获取用户信息请求
export const userRequest = (username,password)=>{
    return axios.request({
        url:'/users/getUsers',
        method:'get'
    })
}
//添加用户
export const addUserRequest = (username,password)=>{
    return axios.request({
        method:'post',
        url:'/users/add',
        data:{
            username,password
        }
    })
}

//删除用户
export const removeUserRequest = (username)=>{
    return axios.request({
        method:'post',
        url:'/users/remove',
        data:{username}

    })
}
//======================================================================================
//获取文章导航栏信息
export const navRequest = ()=>{
    return axios.request({
        url:'/home/navlist',
        method:'get'
    })
}

//======================================================================================
//获取轮播图信息
export const bannerRequest = ()=>{
    return axios.request({
        url:'/home/banner',
        method:'get'
    })
}

//获取卡片信息
export const cartRequest = ()=>{
    return axios.request({
        url:'/home/nav',
        method:'get'
    })
}

//======================================================================================
//测试接口
//提交图片
export const editImgRequest = (img)=>{
    console.log(img);
    return axios.request({
        url:'/users/userimgedit',
        method:'post',
        data:{img}
    })
}