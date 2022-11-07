<!--
 * @FileDescription: 导航栏组件
 * @Author: 郑友捷
 * @Date: 2022-10-31 9:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-31 20:40
-->
<template>
  <n-space align="center" justify="space-between">
    <n-space>
      <router-link to="/">
        <n-gradient-text type="success" size=24>
          asyNc
        </n-gradient-text>
      </router-link>
      <search-box :text="state.word" style="width: 40vw" />
    </n-space>

    <n-dropdown v-if="state.username" :options="options" @select="handleSelect">
      <n-button quaternary>
        {{ state.username }}
      </n-button>
    </n-dropdown>

    <n-popover v-else trigger="hover" placement="bottom" :show-arrow="false">
      <template #trigger>
        <router-link to="login" style="text-decoration: none">
          <n-icon :size="25" color="#0e7a0d">
            <PersonAddOutline />
          </n-icon>
        </router-link>
      </template>
      <template #header>
        <n-text strong depth="1">
          登录后你可以
        </n-text>
      </template>

      <div>
        <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%">
          <AnalyticsOutline />
        </n-icon>
        <n-text>
          畅享百万数据模型
        </n-text>
      </div>

      <div>
        <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%">
          <TimeOutline />
        </n-icon>
        <n-text>
          多端同步搜索记录
        </n-text>
      </div>

      <div>
        <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%">
          <TargetArrow20Regular />
        </n-icon>
        <n-text>
          私人定制搜索服务
        </n-text>
      </div>

      <div>
        <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%">
          <SlideMultipleSearch20Regular />
        </n-icon>
        <n-text>
          发现网站更多功能
        </n-text>
      </div>

      <template #footer>
        <div>
          <router-link to="login" style="text-decoration: none">
            <n-button quaternary>
              立即进入知识的世界
            </n-button>
          </router-link>
        </div>
      </template>
      <!-- <router-link to="register" style="text-decoration: none">
        <n-button primary type="primary">
            注册
        </n-button>
        </router-link> -->
    </n-popover>
  </n-space>
</template>

<script setup lang="ts">
import {
  NButton,
  NDropdown,
  NGradientText,
  NIcon,
  NSpace,
  useDialog,
  NPopover,
  NText
} from 'naive-ui';
import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  PersonAddOutline,
  TimeOutline,
  AnalyticsOutline
} from '@vicons/ionicons5';
import {
  TargetArrow20Regular,
  SlideMultipleSearch20Regular
} from '@vicons/fluent';

import SearchBox from './SearchBox.vue'
import { decodeToken } from '@/main';
// import router from '@/router';
import router from '@/router';
import API from '@/store/axiosInstance';

import { Component, h, reactive } from 'vue';
import '@/mock/SearchPage.mock';

// Query parameters
const state = reactive({
  word: router.currentRoute.value.query.q as string,
  username: decodeToken() || '',
})


function renderIcon(icon: Component) {
  return () => h(NIcon, null, {
    default: () => h(icon),
  });
}

// Options for user menu
const options = [
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon(UserIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
]

// Handle select event of the user menu

const exitDialog = useDialog()
function handleSelect(key: 'profile' | 'logout') {
  switch (key) {
    case 'profile':
      router.push('/user/userInformation');
      break;
    case 'logout':
      exitDialog.warning({
        title: '退出登录确认',
        content: '你确定退出登录吗QWQ？',
        positiveText: '确认',
        negativeText: '取消',
        onPositiveClick: () => {
          API({
            headers: { "Authorization": window.localStorage.getItem("token") },
            // 携带token字段
            url: 'logout',
            method: 'post'
          }).then((res) => {
            console.log(res)
            window.localStorage.removeItem('token')
            state.username = ""
            router.push("/")
          })
            .catch((error) => {
              console.log(error)
            })
        },
        onNegativeClick: () => {
        }
        // 若是退出登录界面，则关闭弹窗
      })
  }
}

</script>

<style>

</style>