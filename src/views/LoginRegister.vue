<!--
 * @FileDescription: 登录注册界面
 * @Author: 郑友捷
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-22 18:38
-->
<template>
  <div class="back_img first_div">
    <n-card size="large" class="card" hoverable:="true" style="">
      <n-space justify="space-between" size="large">
        <img src="../assets/asyNc_avatar.png" style="width:80px;height:80px;overflow: hidden;" />
        <n-gradient-text type="primary" :size="26.5" style="margin-top: 20px;">asyNc检索系统
        </n-gradient-text>
      </n-space>
      <n-grid y-gap="12" :cols="1">
        <n-grid-item style="margin-bottom: 5%;">
          <n-gradient-text :gradient="{
            from: 'rgb(24, 160, 88)',
            to: 'rgb(24, 160, 88)'
          }" size="20" style="vertical-align: -65%;">
            账密{{ state.title }}
          </n-gradient-text>
        </n-grid-item>
        <n-grid-item>
          <n-space vertical>
            <n-input size="large" placeholder="请输入用户名" v-model:value="username" style="" />
            <n-text v-if="state.title == '注册'" depth="3" style="font-size: small; margin-top: 0%; padding-top: 0%; ">
              |&nbsp;用户名为包含 "中英文数字 _ -" 在内的 1-14 位字符，且首字符需为中文或英文
            </n-text>
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space vertical>
            <n-input type="password" size="large" placeholder="请输入密码" v-model:value="password"
              show-password-on="click" />
            <n-text v-if="state.title == '注册'" depth="3" style="font-size: small; margin-top: 0%; padding-top: 0%;">
              |&nbsp;密码为包含 "英文 _ -" 在内的 8-14 个字符
            </n-text>
          </n-space>
        </n-grid-item>
        <n-grid-item v-if="state.title == '注册'">
          <n-input type="password" size="large" placeholder="请再次输入密码" v-model:value="re_password"
            show-password-on="click" />
        </n-grid-item>
        <n-grid-item style="text-align:center">
          <n-button round style="width:100%; margin-top:10px;" size="large" type="success" @click="() => {
            if (state.title == '登录') {
              login()
            }
            else {
              register()
            }
          }">
            确定
          </n-button>
        </n-grid-item>
        <n-grid-item style="text-align:center;">
          <n-space justify="space-between" size="large" style="margin-top: 10px;">
            <n-button style="width:160px;" type="tertiary" @click="() => { handleHomePage() }">
              主页
            </n-button>
            <n-button v-if="state.title == '登录'" style="width:160px;" type="tertiary"
              @click="() => { handleRegister() }">
              注册
            </n-button>
            <n-button v-else style="width:160px;" type="tertiary" @click="() => { handleLogin() }">
              返回登录
            </n-button>
          </n-space>
        </n-grid-item>
        <!-- 登录界面与注册界面进行勾连 -->
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, Ref, reactive, watch } from 'vue'
import API from "../store/axiosInstance"
import {
  NCard,
  NGradientText,
  NInput,
  NGrid,
  NGridItem,
  NButton,
  NSpace,
  NText,
  useMessage,
} from 'naive-ui'

var title: string = ""
const state = reactive({ title })
const message = useMessage()

watch(() => router.currentRoute.value.path, (newValue) => {
  if (newValue == "/login") {
    state.title = "登录"
  } else {
    state.title = "注册"
  }
}, { immediate: true })
var username: Ref<string> = ref("")
var password: Ref<string> = ref("")
var re_password: Ref<string> = ref("")

function handleRegister() {
  router.push('/register')
  state.title = "注册"
}

function handleLogin() {
  router.push('/login')
  state.title = "登录"
}

function handleHomePage() {
  router.push("/")
}

function judgeUser(username: string) {
  if (username.length > 14) {
    message.error('用户名不应超过 14 个字符');
    return false;
  }
  if (!(/^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(username))) {
    message.error('用户名应只包含 "中英文 数字 _ -"，且首字符需为中文或英文');
    return false;
  }
  return true;
}

function judgePassword(password: string) {
  if (password.length > 14 || password.length < 8) {
    message.error('密码长度应为 8-14 个字符');
    return false;
  }
  if (!(/^[-A-Za-z0-9_]*$/.test(password))) {
    message.error('密码应只包含 "英文 数字 _ -"');
    return false;
  }
  return true;
}

function judgeRepassword() {
  if (re_password.value != password.value) {
    message.error("两次输入的密码不一致")
    return false;
  }
  return true;
}

function login() {
  /**
  * @description: 登录功能
  * @return {void}
  */
  API({
    url: 'login',
    method: 'post',
    data: {
      "user_name": username.value,
      "password": password.value,
    }
  }).then((res) => {
    // 对登录接口请求成功
    window.localStorage.setItem("token", res.data.data.token)
    // 存储token
    message.success("欢迎回来，" + username.value + "!")
    router.back();
  }).catch(() => {
    message.error("用户名或密码错误")
  })
}

function register() {
  /**
  * @description: 注册功能
  * @return {void}
  */
  if (judgeUser(username.value) == false) {
    return;
  }
  if (judgePassword(password.value) == false) {
    return;
  }
  if (judgeRepassword() == false) {
    return;
  }
  API({
    url: 'register',
    method: 'post',
    data: {
      "user_name": username.value,
      "password": password.value,
    }
  }).then((res) => {
    // 对注册接口请求成功
    window.localStorage.setItem("token", res.data.data.token)
    // 存储token
    message.success("欢迎来到知识的世界，" + username.value + "!")
    router.back();
  }).catch(() => {
    message.error("用户名重复")
  })
}
</script>

<style>
.back_img {
  background-color: #ffffff;
  background-image: url("../assets/cool-background.png");
  background-size: cover;
  /*  z-index:1; */
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* relative flex justify-center items-center w-full h-full */
.first_div {
  width: 100%;
  height: 100%;
}

.card {
  width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  border: 5px solid;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}
</style>