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
