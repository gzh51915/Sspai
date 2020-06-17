import {START_LOGIN , LOGIN_SUCCESS , LOGIN_FAILED } from '../action/actionType'
// import {getUserName} from '../../api'
/**登录分成4个阶段：
1、登录loading :startLogin
2、登录成功 : loginSuccess
3、登陆失败 : loginFailed
4、退出登录 : logout
**/
//这里是携带的数据，dispatch的过程，如果我们在前面用了connect的话，这里是不需要dispatch的，
//但是如果我们这里需要复用的话那么这里就要再次dispatch，按需使用


export const startLogin = () => {
    return {
        type:START_LOGIN
    }
}

export const loginSuccess = () => {
    return {
        type:LOGIN_SUCCESS,
    }
}

export const loginFailed = () => {
    return {
        type:LOGIN_FAILED
    }
}

export const logout = () => {
    window.localStorage.removeItem('authorization')
    window.localStorage.removeItem('userInfo')
    return {
        type:LOGIN_FAILED
    }
}

