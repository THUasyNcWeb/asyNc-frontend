import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import NewsHome from "../views/NewsHome.vue";
import UserHome from "../views/UserHome.vue";



const routes = [
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
