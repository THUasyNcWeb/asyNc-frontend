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

// 将页面标题与路由对应
const app = createApp(App);

app.use(router);
app.mount("#app");

function judgeToken() :(string | boolean) {
  // 检验token是否有效
  try{
      const tokenString:string = localStorage.getItem("token");
      const token = JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(tokenString.split('.')[1]))))
      console.log(token)
      const expire_date =  new Date(token.expire_time * 1000)
      console.log(expire_date)
      const now_date = new Date()
      console.log(now_date)
      if (expire_date < now_date) {
          throw Error("The token has expired!")
      }
      return token.user_name
      // username.value = token.user_name
  }
  catch(error){
      console.log(error)
      console.log("错啦")
      // username.value = ""
      localStorage.removeItem("token")
      // 清除原来无用的token
      return false
  }
}

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  window.localStorage.removeItem("token")
  if (to.path.indexOf("/user") != 0) {
    next()
  }
  else if (window.localStorage.getItem("token")) {
    const flag = judgeToken()
    if( typeof(flag) == "boolean" ) {
      alert("请先登录或者注册")
    }
    else if (typeof(flag) == "string") {
      next()
    }
    else {
      alert("无权访问!")
    }
  }
  else {
    alert("请先登录或者注册")
    next("/")
  }
})

export {judgeToken}