<!--
 * @FileDescription: 登录注册界面
 * @Author: 郑友捷
 * @Date: 2022-10-20 01:21
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-26 16:16
-->
<template>
  <div class="first_div">
    <n-card size="large" class="card" hoverable:="true" style="">
      <div style="width: 300px;">
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
            }" size="20" style="vertical-align: -60%;">
              账密{{ state.title }}
            </n-gradient-text>
          </n-grid-item>
          <n-grid-item>
            <n-space vertical>
              <n-input size="large" placeholder="请输入用户名" v-model:value="username" style="" />
              <n-text v-if="state.title == '注册'" depth="3" style="font-size: small; margin-top: 0%; padding-top: 0%;">
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
            <n-button round style="width:100%; margin-top:5%;" type="success" @click="() => {
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
            <n-space justify="space-between" size="large">
              <n-button style="width:140px;" type="tertiary" @click="() => { handleHomePage() }">
                主页
              </n-button>
              <n-button v-if="state.title == '登录'" style="width:140px;" type="tertiary"
                @click="() => { handleRegister() }">
                注册
              </n-button>
              <n-button v-else style="width:140px;" type="tertiary" @click="() => { handleLogin() }">
                返回登录
              </n-button>
            </n-space>
          </n-grid-item>
          <!-- 登录界面与注册界面进行勾连 -->
        </n-grid>
      </div>
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
    message.success("欢迎回来，"+username.value+"!")
    router.push("/")
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
    message.success("欢迎来到知识的世界，"+username.value+"!")
    router.push("/")
  }).catch(() => {
    message.error("用户名重复")
  })
}
</script>

<style>
.back_img {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(211,960,471)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%234EC1FF'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='704' height='586.7' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.09'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  /*  z-index:1; */
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: auto;
}

/* relative flex justify-center items-center w-full h-full */
.first_div {
  width: 100%;
  height: 100%;
}

.card {
  width: 364px;
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