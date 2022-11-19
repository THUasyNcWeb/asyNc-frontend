<!--
 * @FileDescription: 新闻收藏页面
 * @Author: 王博文
 * @Date: 2022-11-16 20:59
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-19 19:29
-->
<template>
  <n-space vertical>
    <template v-if="!state.loading">
      <n-empty v-if="!state.news.length" size="large" description="什么也没有找到" />
      <template v-else>
        <n-list hoverable clickable>
          <n-list-item v-for="entry, id in state.news" :key="id">
            <news-entry :news="entry" style="width: 65vw" />
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
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
import {
  NEmpty,
  NList,
  NListItem,
  NPagination,
  NSkeleton,
  NSpace,
  useMessage,
} from 'naive-ui';

import NewsEntry from '@/components/NewsEntry.vue'
import router from '@/router';
import API from '@/store/axiosInstance';

import '@/mock/Favorites.mock';

const props = defineProps<{
  path: string,
}>();

const state = reactive({
  page: 0,
  page_count: 0,
  loading: true,
  news: [],
})

// Reference to the layout content, for scrolling
const usersContentRef: any = inject('usersContentRef');

// Refresh when router changed
onBeforeRouteUpdate(to => init(to));

init(router.currentRoute.value);

// Message box
const message = useMessage();

function error() {
  message.error(`获取${document.title}时出现错误😨`);
}

// Jump to specified page
function jump(page: number) {
  router.push(`${props.path}?page=${page}`);
}

function init(to: RouteLocationNormalized) {
  state.page = parseInt(to.query.page as string) || 1;
  state.page_count = 0;

  state.news = [];

  state.loading = true;

  // Scroll to top
  usersContentRef.value?.scrollTo({ top: 0,});

  // Fetch news and page count
  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: `${props.path}?page=${state.page}`,
    method: 'get',
  }).then(response => {
    state.loading = false;

    let data = response.data.data;
    state.page_count = data.page_count;
    for (const entry of data.news) {
      // Construct Date object
      state.news.push({
        ...entry,
        pub_time: new Date(entry.pub_time),
        keywords: [],
        title_keywords: [],
      });
    }
  }).catch(() => {
    error();
  });
}
</script>