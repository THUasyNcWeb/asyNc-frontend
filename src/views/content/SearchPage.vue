<!--
 * @FileDescription: 新闻搜索页面
 * @Author: 王博文
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-24 23:16
-->
<template>
  <n-layout position="absolute">
    <n-layout-header bordered embedded style="height: 74px; padding: 18px 96px; position: fixed">
      <n-space align="center" justify="space-between">
        <n-space>
          <router-link to="/">
            <n-gradient-text type="success" size=24>
              asyNc
            </n-gradient-text>
          </router-link>
          <search-box :text="state.word" style="width: 40vw" />
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
        <template v-if="!state.loading">
          <n-empty v-if="!state.news.length" size="large" description="什么也没有找到" />
          <template v-else>
            <n-list hoverable clickable>
              <n-list-item v-for="entry, id in state.news" :key="id">
                <news-entry :news="entry" />
              </n-list-item>
            </n-list>
            <n-pagination :page="state.page" :page-count="state.page_count" @update:page="jump" />
          </template>
        </template>
        <template v-else v-for="_ in 10" :key="_">
          <n-skeleton text size="medium" style="width: 30%" />
          <n-skeleton text :repeat="3" />
          <n-skeleton text style="width: 20%" />
        </template>
      </n-space>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  NButton,
  NEmpty,
  NGradientText,
  NLayout,
  NLayoutHeader,
  NList,
  NListItem,
  NPagination,
  NSkeleton,
  NSpace,
  useMessage,
} from 'naive-ui'

import NewsEntry, { News } from '@/components/NewsEntry.vue'
import SearchBox from '@/components/SearchBox.vue'
import router from '@/router';
import API from '@/store/axiosInstance';
import { LocationQuery, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';

// import '@/mock/SearchPage.mock';

// Query parameters
const state = reactive({
  query: <LocationQuery>null,
  word: '',
  page: 0,

  loading: true,

  news: <News[]>[],
  page_count: 0,
})

// Refresh when router changed
onBeforeRouteUpdate(to => init(to));

init(router.currentRoute.value);

// Message box
const message = useMessage();

function error() {
  message.error('搜索时出现错误😢');
}

// Jump to specified page
function jump(page: number) {
  router.push(`search?q=${state.word}&page=${state.page}`);
}

function init(to: RouteLocationNormalized) {
  // Get query parameters
  state.query = to.query;
  state.word = state.query.q as string;
  state.page = parseInt(state.query.page as string) || 1;

  state.news = [];
  
  // Set page title
  document.title = `${state.word || '搜索'} - asyNc`;

  state.loading = true;

  // Fetch news and page count
  API({
    url: 'search',
    method: 'post',
    data: {
      query: state.word,
      page: state.page,
    }
  }).then(response => {
    state.loading = false;

    let data = response.data.data;
    state.page_count = data.page_count;
    for (const entry of data.news) {
      // Construct Date object
      state.news.push({
        ...entry,
        pub_time: new Date(entry.pub_time),
      });
    }
  }).catch(() => {
    error();
  });
}
</script>