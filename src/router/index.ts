/*
 * @FileDescription: 注册全局路由
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 9:38
*/

import {createRouter, createWebHistory,RouteRecordRaw} from "vue-router";
import NewsHome from "../views/NewsHome.vue";
import UserHome from "../views/UserHome.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "NewsHome",
        component: NewsHome,
        meta: {
            title: "百度新闻——海量中文资讯平台",
        },
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
            path:"/user/userInformation/:user_name",
            name:"userInformation",
            component: () => import("../views/user/userInformation.vue"),
            meta: {
                title: "详细用户信息"
            }
        },
        {
            path:"/user/modifyPassword/:user_name",
            name:"modifyPassword",
            component:() => import("../views/user/modifyPassword.vue"),
            meta: {
                title: "修改密码"
            }
        }
        ]
    },
];
// 注册页面路由


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
// 导出路由供其他组件使用