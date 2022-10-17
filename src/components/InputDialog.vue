<!--
 * @FileDescription: 弹窗控件，实现包括登录弹窗等功能
 * @Author: 郑友捷
 * @Date: 2022-10-05 12:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-06 17:43
 -->
<template>
  <body>
  </body>
</template>
   
<script lang="ts">
import API from "../store/axiosInstance"
import { defineComponent, h, ref,Ref, watch } from "vue";
import { useDialog, NInput } from "naive-ui";
import imgUrl from "../assets/logo.png"
import {useRouter} from 'vue-router'
export default defineComponent({
  setup () {
    const dialog = useDialog()
    const username: Ref<string> = ref("");
    const password: Ref<string> = ref("")
    const router = useRouter();
    // 定义用户名与密码
    const visible = ref(false)
    // 控制弹窗可视与否的变量，若变化为true则弹窗关闭
    function login(initial_username:Ref<string>) {
       /**
        * @description: 实现登录接口
        * @param {string} initial_username - 主页的用户名称的引用，方便在请求成功时修改
        * @return {void}
        */
      visible.value = false
      // 初始化为false
      API({
          url:'login/',
          method:'post',
          data:{
            "user_name": username.value,
            "password": password.value,
          }
      }).then((res)=>{
        // 对登录接口请求成功
        console.log(res)
        window.localStorage.setItem("token",res.data.data.token)
        // 存储token
        initial_username.value = username.value
        // 修改主页用户名的引用
        alert("登录成功")
        visible.value = true
        // 触发watch关闭弹窗
      }).catch((error) => {
        // 登录失败，弹窗不关闭
        console.log(error);
        alert("用户名或密码错误")
      })
    }
    function register(initial_username:Ref<String>) {
      /**
        * @description: 实现注册接口
        * @param {string} initial_username - 主页的用户名称的引用，方便在请求成功时修改
        * @return {void}
        */
      visible.value = false
      API({
          url:'register/',
          method:'post',
          data:{
            "user_name": username.value,
            "password": password.value,
          }
      }).then((res)=>{
        // 注册成功
        console.log(res.data.data.token)
        window.localStorage.setItem("token",res.data.data.token)
        initial_username.value = username.value
        alert("注册成功")
        visible.value = true
      }).catch((error) => {
        // 注册失败，根据返回码相应报错
        var code = error.response.data.code
        if(code == 1) {
          alert("用户名已存在")
        }
        else if(code == 2) {
          alert("用户名格式不合法")
        }
        else if(code == 3) {
          alert("密码格式不合法")
        }
        console.log(error);
      })
    }
    watch(visible, (newVal:boolean, oldVal:boolean) => {
      /**
        * @description: 检测弹窗是否应当关闭，若visible变化为true则关闭
        * @param {boolean} oldVal - visible原本的值
        * @param {boolean} newVal - visible的新值
        * @return {void}
        */
      console.log(oldVal)
      console.log(newVal)
      if (newVal == true) {
        visible.value = false
        dialog.destroyAll()
      }
    })
    const handleDialog = (initial_username:Ref<string>, api:string) => {
      /**
        * @description: 使用render函数规定控件来实现弹窗功能，根据api规定是注册弹窗还是登录弹窗
        * @param {string} initial_username - 主页的用户名称的引用，方便在请求成功时修改
        * @param {string} api - 申请的接口，决定弹窗类别
        * @return void
        */
      var confirmText = ''
      if(api == 'login') {
        confirmText = '登录'
      }
      else if (api == "register") {
        confirmText = '注册'
      }
      // 确定按钮的文本与接口有关
      dialog.create({
        // 创建一个弹窗，可以实现登录与注册
          icon: () => {
            return h("img", {
              src:imgUrl,
              style:{
                width:"100%",
                height:"100%",
              }
            })
          },
          // 弹窗的图标
          title: () => {
            var content = confirmText
            return h(
              "div", content
            )
          },
          // 弹窗的标题
          content: () => {  
            return h("div",[
              h("div", [
                h("div",{
                  innerHTML:"用户名",
                  style: {
                    "width":"12%",
                    "margin-right":"10px",
                    "display": "inline-block" , 
                  }
                }),
                // 输入用户名
                h(NInput, {
                  style: {
                    "width":"85%",
                    "margin-bottom": "10px",
                  },
                  type:"text",
                  placeholder:"手机号/用户名/邮箱",
                  Props: {
                    value: username
                  },
                  onInput: (event) => {
                    username.value = event
                    console.log(username.value)
                  },
                  // 实时绑定username进行更新
                }),
                
              ])
              ,
              h("div", [
                h("div",{
                  innerHTML:"密码",
                  style: {
                    "width":"12%",
                    "margin-right":"10px",
                    "display": "inline-block", 
                  }
                }),
                // 输入密码
                h(NInput, {
                  style: {
                    "width":"85%",
                    "margin-bottom": "10px",
                  },
                  type:"password",
                  placeholder:"密码",
                  'show-password-on': "click",
                  Props: {
                    value: password
                  },
                  onInput: (event) => {
                    password.value = event
                  },
                  // 实时绑定密码进行更新
                }),
              ])
            ])
          },
          positiveText: confirmText,
          negativeText: '取消',
          onPositiveClick: () => {
            // 根据接口类型判断发出不同的请求
            if(api == "login") {
              login(initial_username)
            }
            else if (api == "register") {
              register(initial_username)
            }            
            return false
          },
          onNegativeClick: () => {
            return true
          }
        })
    }
    const exitDialog = () => {
      // 退出登录按钮所对应的弹窗
      dialog.create({
        icon: () => {
          return h("img", {
            src:imgUrl,
            style:{
              width:"100%",
              height:"100%",
            }
          })
        },
        // 弹窗的图标
        content:() => {
          return h("div", {
            innerHTML:'真的要退出吗qwq',
            style: {
              "font-size":"20px",
            },
          })
        },
        positiveText: "狠心离开",
        negativeText: "取消",
        // 确认按钮与取消按钮对应文本
        onPositiveClick:() => {
          window.localStorage.removeItem('token')
          sessionStorage.removeItem('username')
          router.push("/");
          // 退出后直接跳转到主页
          return true
        },
        onNegativeClick: () => {
          return true
        }
      })
    }
    return{
      username,
      handleDialog,
      exitDialog,
    };
  }
});

</script>
