import Vue from "vue";
import VueRouter from "vue-router";
import NewsHome from "../views/NewsHome.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

    return originalPush.call(this, location).catch(err => err)
    // 捕获跳转时错误
}

const routes = [
    {
        path: "/",
        name: "NewsHome",
        component: NewsHome,
        meta: {
            title: "百度新闻——海量中文资讯平台",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
