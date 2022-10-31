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
        {{state.username}}
        </n-button>
    </n-dropdown>
    <n-space v-else>
        <router-link to="login" style="text-decoration: none">
        <n-button>
            登录
        </n-button>
        </router-link>
        <router-link to="register" style="text-decoration: none">
        <n-button primary type="primary">
            注册
        </n-button>
        </router-link>
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
} from 'naive-ui';
import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5';

import { decodeToken } from '@/main';
// import router from '@/router';
import router from '@/router';
import API from '@/store/axiosInstance';

import { Component, h, reactive } from 'vue';
// import '@/mock/SearchPage.mock';

// Query parameters
const state = reactive({
  query: null,
  word: '',
  page: 0,

  loading: true,

  news: [],
  page_count: 0,

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
function handleSelect(key: 'profile' | 'logout') {
  switch (key) {
    case 'profile':
      router.push('/user/userInformation');
      break;
    case 'logout':
      API({
          headers:{"Authorization": window.localStorage.getItem("token")},
          // 携带token字段
          url:'logout/',
          method:'post'}).then((res) => {
              console.log(res)
          })
          .catch((error) => {
              console.log(error)
      })
      window.localStorage.removeItem('token');
      sessionStorage.removeItem('username');
      state.username = '';
      break;
  }
}

</script>

<style>

</style>