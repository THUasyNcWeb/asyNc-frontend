<!--
 * @FileDescription: 悬浮新闻按钮
 * @Author: 王博文
 * @Date: 2022-11-06 23:26
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 05:14
-->

<template>
  <n-affix v-if="loggedIn" style="position: fixed; right: 48px; bottom: 48px;">
    <n-popover trigger="click" style="width: 30vw">
      <template #trigger>
        <n-button secondary circle size="large">
          <template #icon>
            <n-icon>
              <ellipsis-icon />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-tabs animated default-value="readlater" justify-content="center">
        <n-tab-pane v-for="tab in tabs" :name="tab.name">
          <template #tab>
            <n-icon size="large" :component="tab.icon" />
          </template>
          <news-pane :news="state[tab.name]" :more-path="`user/${tab.name}`"
            @remove="id => remove(tab.name, id)" />
        </n-tab-pane>
      </n-tabs>
    </n-popover>
  </n-affix>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { NAffix, NButton, NIcon, NPopover, NTabPane, NTabs } from 'naive-ui';

import {
  BookmarkOutline as ReadIcon,
  EllipsisVertical as EllipsisIcon,
  StarOutline as FavoritesIcon,
  TimeOutline as HistoryIcon,
} from '@vicons/ionicons5/';

import { decodeToken } from '@/main';
import NewsPane from './NewsPane.vue';
import API from '@/store/axiosInstance';

import '@/mock/Favorites.mock';

const maxNewsCount = 5;

const state = reactive({
  username: decodeToken(),
  history: [],
  readlater: [],
  favorites: [],
});

// Tabs, to avoid redundancy
const tabs = [
  {
    name: 'history',
    icon: HistoryIcon,
  },
  {
    name: 'readlater',
    icon: ReadIcon,
  },
  {
    name: 'favorites',
    icon: FavoritesIcon,
  },
];

// Has the user logged in
const loggedIn = new Boolean(state.username).valueOf();

if (loggedIn) {
  // Fetch news
  tabs.forEach(tab => {
    API({
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
      url: tab.name,
      method: 'get',
      params: {
        page: 1,
      },
    }).then(response => {
      state[tab.name] = response.data.data.news.slice(0, maxNewsCount);
    })
  });
}

// Remove news from a list
function remove(from: string, id: number) {
  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: from,
    method: 'delete',
    params: {
      id
    },
  }).then(response => {
    state[from] = response.data.data.news.slice(0, maxNewsCount);
  });
}
</script>