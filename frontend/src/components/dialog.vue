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
import { defineComponent, h, ref } from "vue";
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
    // 定义用户名与密码
    const handleConfirm = (initial_username) => {
      // 实现登录弹窗
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
            return h(
              "div", "登录"
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
            initial_username.value = username.value
          },
          onNegativeClick: () => {
          }
        })
    }
    return{
      username,
      handleConfirm
    };
  }
});

</script>
