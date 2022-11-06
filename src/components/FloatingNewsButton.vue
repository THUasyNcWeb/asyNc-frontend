<!--
 * @FileDescription: 悬浮新闻按钮
 * @Author: 王博文
 * @Date: 2022-11-06 23:26
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 00:38
-->

<template>
  <n-affix v-if="loggedIn" style="position: fixed; right: 48px; bottom: 48px;">
    <n-popover>
      <template #trigger>
        <n-button secondary circle size="large">
          <template #icon>
            <n-icon>
              <ellipsis-icon />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-tabs>
        <n-tab-pane name="history">
          <template #tab>
            <n-icon size="large">
              <history-icon />
            </n-icon>
          </template>
          Tab1
        </n-tab-pane>
        <n-tab-pane name="readlater">
          <template #tab>
            <n-icon size="large">
              <read-icon />
            </n-icon>
          </template>
          Tab2
        </n-tab-pane>
        <n-tab-pane name="favorites">
          <template #tab>
            <n-icon size="large">
              <favorites-icon />
            </n-icon>
          </template>
          Tab3
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

const state = reactive({
  username: decodeToken(),
});

// Has the user logged in
const loggedIn = new Boolean(state.username).valueOf();
</script>