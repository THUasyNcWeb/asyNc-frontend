/*
 * @FileDescription: 主脚本，注册了全局应用app与路由守卫
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-23 01:49
 */

import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import API from "./store/axiosInstance";

export const reloader = reactive({
  timestamp: 0,
});

// Reload navigation bar when favorites, history etc. update
export function reloadNavigationBar() {
  reloader.timestamp++;
}

// 将页面标题与路由对应
const app = createApp(App);

app.use(router);
app.mount("#app");

function decodeToken(): string {
  try {
    const tokenString: string = localStorage.getItem("token");
    const token = JSON.parse(
      decodeURIComponent(
        encodeURIComponent(window.atob(tokenString.split(".")[1]))
      )
    );
    const expire_date = new Date(token.expire_time * 1000);
    const now_date = new Date();
    if (expire_date < now_date) {
      throw Error("The token has expired!");
    }
    return token.user_name;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    // 清除原来无用的token
    return "";
  }
}

// Record when the user clicks a news
export function newsClick(id: number) {
  if (!decodeToken()) {
    return;
  }
  API({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    url: "history",
    method: "post",
    params: {
      id,
    },
  }).then(() => {
    reloadNavigationBar();
  })
}

async function judgeToken(): Promise<string> {
  /**
   * @description: 判断当前token是否有效
   * @return {string} 若token有效则返回对应用户名，否则返回false
   */
  if (localStorage.getItem("token") == null) {
    return "";
  }
  let return_value = decodeToken();
  if (return_value == "") {
    return return_value;
  }
  await API({
    headers: { Authorization: window.localStorage.getItem("token") },
    url: "checklogin",
    method: "post",
  })
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      return_value = "";
    });
  return return_value;
}

router.beforeEach((to, _, next) => {
  /**
   * @description: 路由守卫，监听当前路由切换时是否有权限
   * @param {string} to - 即将访问的url
   * @param {string} next - 页面切换函数，负责切换到对应路径的视图
   * @return {void}
   */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export { decodeToken, judgeToken };
