import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home'
import Login from '../views/login'
import Signup from '../views/signup'
import Detail from '../views/detail'
import Cart from '../views/viceNavbar/cart'
import Admin from '../views/viceNavbar/admin'
import Account from '../views/viceNavbar/account'
import Addbook from '../views/viceNavbar/addBook'
import Myorder from '../views/viceNavbar/myorder'
import Statistic from '../views/viceNavbar/statistic'
import Hotsell from '../views/viceNavbar/hotSell'
import CustomerSell from '../views/viceNavbar/customerSell'
import ChatRoom from '../views/mainNavbar/chatRoom'
import FullText from '../views/mainNavbar/fullText'
import AuthorSearch from '../views/mainNavbar/authorSearch'
import LabelSearch from '../views/mainNavbar/labelSearch'
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
        path:'/fullText',
        component: FullText
    },
    {
        path:'/authorSearch',
        component: AuthorSearch
    },
    {
        path:'/labelSearch',
        component: LabelSearch
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
