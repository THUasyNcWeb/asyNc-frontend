<!--
 * @FileDescription: 新闻搜索页面
 * @Author: 王博文
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-24 01:38
-->
<template>
  <n-layout position="absolute">
    <n-layout-header bordered embedded
      style="height: 74px; padding: 18px 96px; position: fixed">
      <n-space align="center" justify="space-between">
        <n-space>
          <n-gradient-text type="success" size=24>
            asyNc
          </n-gradient-text>
          <search-box :text="word" style="width: 40vw"/>
        </n-space>
        <n-space>
          <n-button quaternary type="success">
            登录
          </n-button>
          <n-button quaternary type="success">
            注册
          </n-button>
        </n-space>
      </n-space>
    </n-layout-header>
    <n-layout position="absolute" style="top: 74px;">
      <n-space vertical style="padding: 18px 96px">
        <n-list v-if="news.length" hoverable clickable>
          <n-list-item v-for="entry, id in news" :key="id">
            <news-entry :news="entry" />
          </n-list-item>
        </n-list>
        <template v-else v-for="_ in 10">
          <n-skeleton text size="medium" style="width: 30%"/>
          <n-skeleton text :repeat="3"/>
          <n-skeleton text style="width: 20%"/>
        </template>
        <n-pagination :page="page" :page-count="page_count" @update:page="jump"/>
      </n-space>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  NButton,
  NGradientText,
  NLayout,
  NLayoutHeader, 
  NList,
  NListItem,
  NPagination,
  NSkeleton,
  NSpace,
} from 'naive-ui'

import NewsEntry from '@/components/NewsEntry.vue'
import SearchBox from '@/components/SearchBox.vue'
import router from '@/router';
import API from '@/store/axiosInstance';

import '@/mock/SearchPage.mock';

// Get query parameters
const query = router.currentRoute.value.query;
const word = query.q as string;
const page = parseInt(query.page as string) || 1;
// const user = 'abmfy';

// Set page title
document.title = `${word} - asyNc`;

// Jump to specified page
function jump(page: number) {
  window.location.href = `search?q=${word}&page=${page}`;
}

let news = [];
let page_count = ref(0);

// Fetch news and page count
API({
  url: 'search',
  method: 'post',
  data: {
    query: word,
    page
  }
}).then(response => {
  let data = response.data.data;
  page_count.value = data.page_count;
  for (const entry of data.news) {
    // Construct Date object
    news.push({
      ...entry,
      pub_time: new Date(entry.pub_time),
    });
  }
});
</script>