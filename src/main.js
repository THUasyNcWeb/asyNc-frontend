/*
 * @FileDescription: 主脚本，注册了全局应用app与路由守卫
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 9:38
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
});
// 将页面标题与路由对应
const app = createApp(App);

app.use(router);
app.mount("#app");
