import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home'
import Login from '../views/login'
import Signup from '../views/signup'
import Detail from '../views/detail'
import Cart from '../views/cart'
import Admin from '../views/admin'
import Account from '../views/account'
import Addbook from '../views/addBook'
import Myorder from '../views/myorder'
import Statistic from '../views/statistic'
import Hotsell from '../views/hotSell'
import CustomerSell from '../views/customerSell'
import ChatRoom from '../views/chatRoom'
// const Login = () => import "../components/login"
Vue.use(Router)

const routes = [
    {
        path:'',
        redirect:'/login'
    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/signup',
        component: Signup
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/detail',
        component: Detail,
    },
    {
        path:'/cart',
        component: Cart
    },
    {
        path:'/Books',
        component: Admin
    },
    {
        path:'/account',
        component: Account
    },
    {
        path:'/addBook',
        component: Addbook
    },
    {
        path:'/myOrder',
        component: Myorder
    },
    {
        path:'/statistic',
        component: Statistic
    },
    {
        path:'/hotsell',
        component: Hotsell
    },
    {
        path:'/customersell',
        component: CustomerSell
    },
    {
        path:'/chatRoom',
        component: ChatRoom
    }
]
const router = new Router({
    routes,
    mode:'history'
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
