/*
 * @FileDescription: 注册全局路由
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-21 21:51
*/

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NewsHome from "../views/content/NewsHome.vue";
import UserHome from "../views/content/UserHome.vue";
import SearchPage from "../views/content/SearchPage.vue";
import MainSurface from "../views/MainSurface.vue"
import LoginRegister from "../views/LoginRegister.vue"
import Favorites from '@/views/user/FavoritesPage.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "MainSurface",
        component: MainSurface,
        meta: {
            title: "欢迎来到asyNc的新闻主页",
        },
        children:[
        {
            path:"/",
            name:"NewsHome",
            component:NewsHome,
            meta:{
                title:"新闻展示"
            }
        },
        {
            path: "/user",
            name: "UserHome",
            component: UserHome,
            meta: {
                title: "用户主页",
            },
            children: [
                // 注册子路由，方便进行嵌套路由管理
            {
                path:"/user/userInformation",
                name:"userInformation",
                component: () => import("../components/EditInformation.vue"),
                meta: {
                    title: "详细用户信息"
                }
            },
            {
                path:"/user/modifyPassword",
                name:"modifyPassword",
                component:() => import("../components/ModifyPassword.vue"),
                meta: {
                    title: "修改密码"
                }
            },
            {
                path: "/user/favorites",
                name: "favorites",
                component: Favorites,
                meta: {
                    title: "收藏",
                },
                props: {
                    path: 'favorites',
                }
            },
            {
                path: "/user/readlater",
                name: "readlater",
                component: Favorites,
                meta: {
                    title: "稍后再看",
                },
                props: {
                    path: 'readlater',
                }
            },
            {
                path: "/user/history",
                name: "history",
                component: Favorites,
                meta: {
                    title: "历史记录",
                },
                props: {
                    path: 'history',
                }
            },
            ]
        },
        {
            path: "/search",
            name: "Search",
            component: SearchPage,
            meta: {
                title: "搜索",
            },
        },
        ]
    },
    {
        path:"/login",
        name:"Login",
        component: LoginRegister,
        meta: {
            title: "登录",
        },
    },
    {
        path:"/register",
        name:"Register",
        component: LoginRegister,
        meta: {
            title: "注册",
        },
    },
    
];
// 注册页面路由


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
// 导出路由供其他组件使用