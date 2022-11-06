<!--
 * @FileDescription: 悬浮新闻按钮
 * @Author: 王博文
 * @Date: 2022-11-06 23:26
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 03:30
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
        <n-tab-pane name="history">
          <template #tab>
            <n-icon size="large">
              <history-icon />
            </n-icon>
          </template>
          <news-pane :news="state.history" more-path="user/history" @remove="removeHistory" />
        </n-tab-pane>
        <n-tab-pane name="readlater">
          <template #tab>
            <n-icon size="large">
              <read-icon />
            </n-icon>
          </template>
          <news-pane :news="state.readLater" more-path="user/readLater" @remove="removeReadLater" />
        </n-tab-pane>
        <n-tab-pane name="favorites">
          <template #tab>
            <n-icon size="large">
              <favorites-icon />
            </n-icon>
          </template>
          <news-pane :news="state.favorites" more-path="user/favorites" @remove="removeFavorites" />
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
  readLater: [],
  favorites: [],
});

// Has the user logged in
const loggedIn = new Boolean(state.username).valueOf();

if (loggedIn) {
  // Fetch news
  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: 'history',
    method: 'get',
    params: {
      page: 1,
    },
  }).then(response => {
    state.history = response.data.data.news.slice(0, maxNewsCount);
  });
}

// Remove news from history
function removeHistory(id: number) {
  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: 'history',
    method: 'delete',
    params: {
      id
    },
  }).then(response => {
    state.history = response.data.data.news.slice(0, maxNewsCount);
  });
}

// Remove news from read later
function removeReadLater(index: number) {
  state.readLater.splice(index, 1);
}

// Remove news from favorites
function removeFavorites(index: number) {
  state.favorites.splice(index, 1);
}
</script>