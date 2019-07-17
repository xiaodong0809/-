import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/right.vue'
import Role from '@/components/role/role.vue'
import { Message } from 'element-ui';

Vue.use(Router)
const router = new Router({
    routes:[{
        name: 'login',
        path: '/login',
        component:Login
    },{
        name: 'home',
        path: '/',
        component:Home,
        children:[{
            name: 'users',
            path: 'users',
            component:Users,
        },{
            name: 'rights',
            path: '/rights',
            component:Rights,
        },
        {
            name: 'roles',
            path: '/roles',
            component:Role,
        }
        ]
    }],
    
})
router.beforeEach((to, from, next) => {
    if(to.path ==='/login'){
        console.log(111)
        next()
    } else {
        const token = localStorage.getItem('token')
        if (!token) {
            Message.warning('回到登陆页')
            router.push({
                name: 'login'
            })
            return
        }
       
    }
    next()
   console.log(to)
})
export default router
//在路由配置生效之前 统一判断token
//路由/导航 守卫