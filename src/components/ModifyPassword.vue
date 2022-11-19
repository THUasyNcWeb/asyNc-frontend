<!--
 * @FileDescription: 修改密码页面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
  <div style="margin:auto;width:90%">
      <!-- <n-space justify="space-between" style="margin-bottom: 3%;">
        <img src="../assets/asyNc.png" style="width:120px;overflow: hidden;" /> -->
      <n-gradient-text type="primary" :size="26.5" style="margin-bottom: 5%;">修改密码
      </n-gradient-text>
    <!-- </n-space> -->
    <n-grid y-gap="12" :cols="1">
      <n-grid-item>
        <n-space vertical>
          <n-text style="font-size:16px">
            旧密码
          </n-text>
          <n-input size="large"  type="password" placeholder="请输入旧密码" v-model:value="state.old_password"/>
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-space vertical>
          <n-text style="font-size:16px">
            新密码
          </n-text>
          <n-input size="large"  type="password" placeholder="请输入新密码" v-model:value="state.new_password"/>
          <n-text depth="3" style="font-size: small; margin-top: 0%; padding-top: 0%;">
            |&nbsp;密码为包含英文字母、下划线"_"、连字符"-" 在内的 8-14 个字符
          </n-text>
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-space vertical>
          <n-text style="font-size:16px">
            请再次输入密码
          </n-text>
          <n-input size="large"  type="password" placeholder="请再次输入密码" v-model:value="state.new_password_again"/>
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-button style="width:100%; margin-top:5%;" type="success" @click="modify()">
              确定
        </n-button>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import API from "@/store/axiosInstance"
import {reactive, defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {NInput,NButton,NGrid,NGridItem,NGradientText,NText,NSpace, useMessage} from 'naive-ui'
import {judgeToken} from "@/main"
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: string[],
  mails: string,
  avatar: string,
}
const router = useRouter()
const message = useMessage()

const props = defineProps<{
  user:UserInfo,
}>();

const state = reactive({
  old_password:"", 
  new_password: "", 
  new_password_again:"",
})

async function init_valid() {
    const value = await judgeToken()
    console.log(value)
    console.log("异步请求")
    if(value=='') {
        message.error("请先登录或者注册😢")
        router.push("/")
    }
}
init_valid()

function judgePassword(password : string) {
    if(password.length > 14 || password.length < 8){
      return false;
    }
    return /^[-A-Za-z0-9_]*$/.test(password)
}

function judgeRepassword() {
    if(state.new_password_again != state.new_password) {
      message.error("两次输入的密码需要相同😢")
      return false;
    }
    if(judgePassword(state.new_password) == false) {
      message.error("输入的新密码不规范😢")
      return false
    }
    return true
}

function modify() {
    /**
    * @description: 向后端请求修改密码
    * @return {void}
    */           
    if(judgePassword(state.old_password)  == false) {
        // alert("输入旧密码不规范")
      message.error("输入的旧密码错误😢")
      return;
    } 
    if(judgePassword(state.new_password)  == false) {
      message.error("输入的新密码不规范😢")
      return;
    } 
    if(judgeRepassword() == false) {
      return;
    }  
    // 输入检验
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        // 携带token字段
        url:'modifypassword',
        method:'post',
        data:{
            "user_name": props.user.user_name,
            "old_password":state.old_password,
            "new_password":state.new_password,
        }
    }).then((res) => {
        // 若成功响应，则修改成功
        console.log(res)
        message.success("修改成功🥳")
        state.old_password = ''
        state.new_password = ''
        
        router.push("/user/userInformation")

    }).catch((error)=>{
        // 否则修改失败，根据失败码来进行对应的响应
        console.log(error)
        var code = error.data.code
        if(code == 3) {
          message.error("输入的旧密码错误😢")
        }
        else if (code == 4) {
          message.error("输入的新密码不规范😢")
        }
        message.error("修改失败😢")
    })
}

</script>

<style scoped>

</style>