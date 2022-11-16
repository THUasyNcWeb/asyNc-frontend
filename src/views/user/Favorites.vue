<!--
 * @FileDescription: 新闻收藏页面
 * @Author: 王博文
 * @Date: 2022-11-16 11:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-16 20:59
 -->

<template>
  <n-grid x-gap="12" :cols="5">
    <n-gi v-for="item in state.news">
      <n-space vertical>
        <n-image height="100" :src="item.image_url ?? DefaultLogo" object-fit="cover" />
        <n-ellipsis :tooltip="false" :line-clamp="2">
          {{item.title}}
        </n-ellipsis>
        <n-space justify="space-between">
          {{item.media}}
          <n-button>
            123
          </n-button>
        </n-space>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { NButton, NEllipsis, NGi, NGrid, NImage, NSpace } from 'naive-ui';
import { reactive } from 'vue';

import { News } from '@/components/NewsPanelEntry.vue';

import DefaultLogo from '@/assets/asyNc.png';
import API from '@/store/axiosInstance';

import '@/mock/Favorites.mock';

const state: {
  news: News[],
} = reactive({
  news: [],
});

API({
  headers: {
    Authorization: window.localStorage.getItem('token'),
  },
  url: 'favorites',
  method: 'get',
  params: {
    page: 1,
  },
}).then(response => {
  const data = response.data.data.news.slice(0, 10);
  console.log(data);
  state.news = [];
  data.forEach(item => {
    state.news.push({
      ...item,
      visit_time: item.visit_time ? new Date(item.visit_time) : undefined,
    })
  });
})
</script>

<style scoped>
.n-image {
  border-radius: 8px;
  box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);
}
</style>