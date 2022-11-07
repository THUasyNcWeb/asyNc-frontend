<!--
 * @FileDescription: 导航栏组件
 * @Author: 郑友捷
 * @Date: 2022-10-31 9:21
 * @LastEditors: 刘铠铭
 * @LastEditTime: 2022-11-07
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

    <n-space justify="end">
      <n-dropdown v-if="state.username" :options="options" @select="handleSelect">
        <n-button quaternary>
          {{ state.username }}
        </n-button>
      </n-dropdown>
      <n-popover v-else trigger="hover" placement="bottom" :show-arrow="false"
        style="width: 370px; border-radius: 5px;">
        <template #trigger>
          <router-link to="login" style="text-decoration: none">
            <n-icon :size="25" color="#0e7a0d" style="margin-top: 6px;">
              <CalendarPerson20Regular />
            </n-icon>
          </router-link>
        </template>
        <template #header style="margin-top: 5px;">
          <n-space>
            <n-h4 align-text="true" type="info" style="vertical-align: -10%; margin-left: 6px;">
              登录后你可以：
            </n-h4>
          </n-space>
        </template>
        <n-space>
          <div style="margin: 8px; border: 0;padding: 0;">
            <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%; margin-right: 5px;">
              <AnalyticsOutline />
            </n-icon>
            <n-text>
              畅享百万数据模型
            </n-text>
          </div>

          <div style="margin: 8px; border: 0;padding: 0;">
            <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%; margin-right: 5px;">
              <TimeOutline />
            </n-icon>
            <n-text>
              多端同步搜索记录
            </n-text>
          </div>
        </n-space>
        <n-space>
          <div style="margin: 8px; border: 0;padding: 0;">
            <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%; margin-right: 5px;">
              <TargetArrow20Regular />
            </n-icon>
            <n-text>
              私人定制搜索服务
            </n-text>
          </div>

          <div style="margin: 8px; border: 0;padding: 0;">
            <n-icon :size="20" color="#0e7a0d" style="vertical-align: -20%; margin-right: 5px;">
              <SlideMultipleSearch20Regular />
            </n-icon>
            <n-text>
              发现网站更多功能
            </n-text>
          </div>
        </n-space>
        <template #footer>
          <n-space>
            <router-link to="login" style="text-decoration: none">
              <n-button type="primary" size="large"
                style="min-width: 315px; border-radius: 15px;margin-left: 4px;margin-top: 5px;">
                进入知识的世界
              </n-button>
            </router-link>
            <router-link to="register" style="text-decoration: none">
              <n-button type="tertiary" size="medium"
                style="min-width: 315px; border-radius: 15px;margin-left: 4px;margin-bottom: 5px;">
                第一次来？点我注册
              </n-button>
            </router-link>
          </n-space>
        </template>
      </n-popover>

      <n-popover trigger="hover" placement="bottom" :show-arrow="false" style="max-width: 370px; border-radius: 5px;">
        <template #trigger>
          <n-icon :size="25" color="#0e7a0d" style="margin-left: 25px;margin-top: 6px;">
            <StarLineHorizontal316Regular />
          </n-icon>
        </template>
        <n-space v-if="state.username" vertical></n-space>
        <n-space v-else vertical>
          <router-link to="login" style="text-decoration: none">
            <n-button type="primary" size="large" style=" border-radius: 15px; margin: 5px;">
              登录以查看收藏的宝藏知识
            </n-button>
          </router-link>
        </n-space>
      </n-popover>

      <n-popover trigger="hover" placement="bottom" :show-arrow="false" style="max-width: 370px; border-radius: 5px;">
        <template #trigger>
          <n-icon :size="25" color="#0e7a0d" style="margin-left: 25px;margin-top: 6px;">
            <History20Regular />
          </n-icon>
        </template>
        <n-space v-if="state.username" vertical></n-space>
        <n-space v-else vertical>
          <router-link to="login" style="text-decoration: none">
            <n-button type="primary" size="large" style=" border-radius: 15px; margin: 5px;">
              登录以查看记忆中的知识
            </n-button>
          </router-link>
        </n-space>
      </n-popover>

      <n-space vertical>
        <n-icon :size="25" color="#0e7a0d" style="margin-left: 25px;margin-top: 6px;">
          <SignOut20Regular />
        </n-icon>
        <n-text></n-text>
      </n-space>

    </n-space>

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
  TimeOutline,
  AnalyticsOutline,
} from '@vicons/ionicons5';
import {
  CalendarPerson20Regular,
  TargetArrow20Regular,
  SlideMultipleSearch20Regular,
  SignOut20Regular,
  History20Regular,
  StarLineHorizontal316Regular
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