<!--
 * @FileDescription: 弹窗控件，实现包括登录弹窗等功能
 * @Author: 郑友捷
 * @Date: 2022-10-05 12:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-06 17:43
 -->
<template>
</template>
   
<script>
import API from "../store/axiosInstance.js"
import { defineComponent, h, ref, watch } from "vue";
import { useDialog, NDialogProvider, NInput, NButton } from "naive-ui";
import imgUrl from "../assets/logo.png"
export default defineComponent({
  components: {
    NDialogProvider,
    NInput,
    NButton,  
  },
  setup () {
    const dialog = useDialog()
    const username = ref("");
    const password = ref("")
    const visible = ref(false)
    // 定义用户名与密码
    function login(initial_username) {
      API({
          url:'login/',
          method:'post',
          data:{
            "user_name": username.value,
            "password": password.value,
          }
      }).then((res)=>{
          console.log(res.data.data.data.token)
          window.localStorage.setItem("token",res.data.data.data.token)
          initial_username.value = username.value
          visible.value = true
      }).catch((error) => {
          console.log(error);
      })
    }
    function register(initial_username) {
      API({
          url:'register/',
          method:'post',
          data:{
            "user_name": username.value,
            "password": password.value,
          }
      }).then((res)=>{
          console.log(res.data.data.data.token)
          window.localStorage.setItem("token",res.data.data.data.token)
          initial_username.value = username.value
          visible.value = true
      }).catch((error) => {
          console.log(error);
      })
    }
    watch(visible, (newVal, _) => {
      console.log(newVal)
      if (newVal == true) {
        visible.value = false
        dialog.destroyAll()
      }
    })
    const handleLogin = (initial_username) => {
      // 实现登录弹窗
      // 现在暂时把登录与注册弹窗放在一起
      // 之后会尝试分开
      dialog.warning({
          icon: () => {
            return h("img", {
              src:imgUrl,
              style:{
                width:"100%",
                height:"100%",
              }
            })
          },
          title: () => {
            var content = "登录"
            return h(
              "div", content
            )
          },
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
                    console.log(password.value)
                  },
                }),
              ])
            ])
          },
          positiveText: '登录',
          negativeText: '取消',
          onPositiveClick: () => {
            login(initial_username)
            return false
          },
          onNegativeClick: () => {
            return true
          }
        })
    }
    const handleRegister = (initial_username) => {
      // 实现注册弹窗
      dialog.warning({
          icon: () => {
            return h("img", {
              src:imgUrl,
              style:{
                width:"100%",
                height:"100%",
              }
            })
          },
          title: () => {
            var content = "注册"
            return h(
              "div", content
            )
          },
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
                    console.log(password.value)
                  },
                }),
              ])
            ])
          },
          positiveText: '注册',
          negativeText: '取消',
          onPositiveClick: () => {
            register(initial_username)
            return false
          },
          onNegativeClick: () => {
            return true
          }
        })
    }
    return{
      username,
      handleLogin,
      handleRegister,
    };
  }
});

</script>
