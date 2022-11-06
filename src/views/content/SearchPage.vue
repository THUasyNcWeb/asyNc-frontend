<!--
 * @FileDescription: 新闻搜索页面
 * @Author: 王博文
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 00:00
-->
<template>
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
  <floating-news-button />
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
import { decodeToken } from '@/main';

import '@/mock/SearchPage.mock';
import { Tag } from '../MainSurface.vue';
import FloatingNewsButton from '@/components/FloatingNewsButton.vue';

const state = reactive({
  // Query parameters
  query: null,
  word: '',
  page: 0,

  loading: true,

  news: [],
  page_count: 0,

  username: decodeToken() || '',
})

// Reference to the layout content, for scrolling
const contentRef: any = inject('contentRef');

// Inclusion/exclusion tags
const tags: Tag[] = inject('inclusionExclusionTags');

console.log(tags);

// Refresh when router changed
// router.beforeEach(to => init(to));
onBeforeRouteUpdate(to => init(to));
// router.beforeResolve

init(router.currentRoute.value);

// Message box
const message = useMessage();

function error() {
  message.error('搜索时出现错误😢');
}

// Jump to specified page
function jump(page: number) {
  router.push(`search?q=${state.word}&page=${page}`);
}

function init(to: RouteLocationNormalized) {
  // Get query parameters
  state.query = to.query;
  state.word = state.query.q as string || '';
  state.page = parseInt(state.query.page as string) || 1;

  state.news = [];
  
  // Set page title
  document.title = `${state.word || '搜索'} - asyNc`;

  state.loading = true;

  // Scroll to top
  contentRef.value?.scrollTo({ top: 0 });

  // Fetch news and page count
  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: 'search',
    method: 'post',
    data: {
      query: state.word,
      page: state.page,
      include: tags
        .filter(value => value.type === 'include')
        .map(tag => tag.value),
      exclude: tags
        .filter(value => value.type === 'exclude')
        .map(tag => tag.value),
    },
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