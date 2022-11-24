<!--
 * @FileDescription: 新闻搜索页面
 * @Author: 王博文
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-24 03:35
-->
<template>
  <n-space vertical style="padding: 18px 96px">
    <template v-if="!state.loading">
      <n-empty v-if="!state.news.length" size="large" description="什么也没有找到" />
      <template v-else>
        <n-text depth="3">
          找到 {{state.total}} 条结果 (用时 {{getTiming}} 秒)
        </n-text>
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
</template>

<script setup lang="ts">
import { computed, inject, reactive } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
import {
  NEmpty,
  NList,
  NListItem,
  NPagination,
  NSkeleton,
  NSpace,
  NText,
  useMessage,
} from 'naive-ui';

import NewsEntry from '@/components/NewsEntry.vue'
import router from '@/router';
import API from '@/store/axiosInstance';

// import '@/mock/SearchPage.mock';
import { Tag } from '../MainSurface.vue';

const state = reactive({
  // Query parameters
  query: null,
  word: '',
  page: 0,
  sort: '',

  loading: true,
  total: 0,
  news: [],
  page_count: 0,
  timing: 0,
})

// Reference to the layout content, for scrolling
const contentRef: any = inject('contentRef');

// Inclusion/exclusion tags
const tags: Tag[] = inject('inclusionExclusionTags');

// Refresh when router changed
onBeforeRouteUpdate(to => init(to));

// Only init once when setup
if (state.query === null) {
  init(router.currentRoute.value);
}

// Message box
const message = useMessage();

function error() {
  message.error('搜索时出现错误😢');
}

// Calculate time elapsed
const getTiming = computed(() => {
  // Timing uses millisecond as unit, so / 1000 to
  // convert it to seconds
  return (state.timing / 1000).toFixed(2);
})

// Jump to specified page
function jump(page: number) {
  router.push({
    path:'/search',
    query: {
      q: state.word,
      page,
      sort: state.sort || undefined,
    },
  });
}

function init(to: RouteLocationNormalized) {
  // Get query parameters
  state.query = to.query;
  state.word = state.query.q as string || '';
  state.page = parseInt(state.query.page as string) || 1;
  state.sort = state.query.sort as string || '';

  state.news = [];
  
  // Set page title
  document.title = `${state.word || '搜索'} - asyNc`;

  state.loading = true;

  // Scroll to top
  contentRef.value?.scrollTo({ top: 0 });

  // For timing
  const start_time = performance.now();

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
      sort: !!state.sort,
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
    state.total = data.total
    state.page_count = data.page_count;

    // Ensure we don't replicate news
    state.news = [];

    for (const entry of data.news) {
      // Construct Date object
      state.news.push({
        ...entry,
        pub_time: new Date(entry.pub_time),
        is_favorites: entry.is_favorite
      });
    }

    state.timing = performance.now() - start_time;
  }).catch(() => {
    error();
  });
}
</script>