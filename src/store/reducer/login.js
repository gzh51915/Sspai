import {START_LOGIN , LOGIN_SUCCESS , LOGIN_FAILED } from '../action/actionType'


// const userInfo = window.localStorage.getItem('userInfo')


const initState = {
    // ...userInfo,
    // isLogin:getToken(JSON.parse(localStorage.getItem('authorization'))),
    isLogin:false,
    loading:false,
}

export default function Reducer(state=initState,action){  
    switch(action.type){
        case START_LOGIN :
            return {
                ...state,               //这里是展开符，所以下面不用写成login
                loading:true           
            }
            case LOGIN_SUCCESS :
                return {
                    ...state,
                    // ...action.payload.userInfo,
                    isLogin:true,
                    loading:false,
                }
            case LOGIN_FAILED :
                return {
                    ...state,
                    isLogin:false,
                    loading:false,
                    username:'',
                    role:''
                }
        default :
            return state
    }
}