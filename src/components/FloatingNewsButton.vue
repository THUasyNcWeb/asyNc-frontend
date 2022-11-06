<!--
 * @FileDescription: 悬浮新闻按钮
 * @Author: 王博文
 * @Date: 2022-11-06 23:26
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 01:10
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
          <news-pane :news="news" more-path="user/history" />
        </n-tab-pane>
        <n-tab-pane name="readlater">
          <template #tab>
            <n-icon size="large">
              <read-icon />
            </n-icon>
          </template>
          <news-pane :news="[]" more-path="user/readLater" />
        </n-tab-pane>
        <n-tab-pane name="favorites">
          <template #tab>
            <n-icon size="large">
              <favorites-icon />
            </n-icon>
          </template>
          <news-pane :news="[]" more-path="user/favorites" />
        </n-tab-pane>
      </n-tabs>
    </n-popover>
  </n-affix>
</template>

<script setup lang="ts">
import { NAffix, NButton, NIcon, NPopover, NTabPane, NTabs } from 'naive-ui';

import {
  BookmarkOutline as ReadIcon,
  EllipsisVertical as EllipsisIcon,
  StarOutline as FavoritesIcon,
  TimeOutline as HistoryIcon,
} from '@vicons/ionicons5/';
import { reactive } from 'vue';
import { decodeToken } from '@/main';
import NewsPane from './NewsPane.vue';

const state = reactive({
  username: decodeToken(),
});

// Has the user logged in
const loggedIn = new Boolean(state.username).valueOf();

const news = [
  {
    id: 3,
    title: 'Test',
    media: 'Media',
    url: 'baidu.com',
    pub_time: new Date(),
  },
  {
    id: 3,
    title: 'Test2...........你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
    media: 'Media',
    url: 'baidu.com',
    pub_time: new Date(),
  },
];
</script>