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
import API from './store/axiosInstance';
// 将页面标题与路由对应
const app = createApp(App);

app.use(router);
app.mount("#app");

function decodeToken() :(string | boolean) {
  /**
  * @description: 判断当前token是否有效
  * @return {string | boolean} 若token有效则返回对应用户名，否则返回false
  */    
  if(localStorage.getItem("token") == null) {
    return false
  }
  API({
    headers:{"Authorization": window.localStorage.getItem("token")},
    url:'checklogin',
    method:'post',
  }).then((res) => {
    console.log(res)
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
    }
    catch(error){
      console.log(error)
      console.log("错啦")
      localStorage.removeItem("token")
      // 清除原来无用的token
      return false
    }
  }).catch((error) => {
    console.log(error)
    console.log("错啦")
    localStorage.removeItem("token")
  })
  
}

router.beforeEach((to, _, next) => {
  /**
  * @description: 路由守卫，监听当前路由切换时是否有权限
  * @param {string} to - 即将访问的url
  * @param {string} next - 页面切换函数，负责切换到对应路径的视图
  * @return {void}
  */    
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  if (to.path.indexOf("/user") != 0) {
    next()
  }
  else if (window.localStorage.getItem("token")) {
    const flag = decodeToken()
    if( typeof(flag) == "boolean" ) {
      alert("请先登录或者注册")
      next("/login")
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
    next("/login")
  }
})

export {decodeToken}