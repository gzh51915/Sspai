import Login from '../views/Login'
import Artical from '../views/Artical'
import NotFound from '../views/NotFound'
import Administrator from '../views/Administrator'
import User from '../views/Administrator/user'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

export const mainRoutes = [
    {
        pathname:'/notfound',
        component:NotFound,
        exact:false
    },
    {
        pathname:'/login',
        component:Login,
        exact:true
    }
]

export const adminRoutes = [
    {
        pathname:'/admin/administrator',
        component:Administrator,
        exact:true,
        title:'管理员',
        icon:UserOutlined
    },
    {
        pathname:'/admin/artical',
        component:Artical,
        exact:true,
        title:'文章管理',
        icon:LaptopOutlined

    },
    {
        pathname:'/admin/administrator/ad',
        component:Administrator,
        // exact:true,
        // title:'管理员',
    },
    {
        pathname:'/admin/administrator/user',
        component:User,
        // exact:true,
        // title:'管理员',
    }
]
