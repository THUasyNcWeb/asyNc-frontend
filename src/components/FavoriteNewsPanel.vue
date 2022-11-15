<!--
 * @FileDescription: 新闻展示面板 (用于收藏与稍后再看)
 * @Author: 王博文
 * @Date: 2022-11-07 00:40
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-15 11:29
-->

<template>
  <n-layout style="height: 60vh">
    <n-empty v-if="!news.length" size="large" />
      <n-list v-else hoverable>
        <n-list-item v-for="item in news">
          <n-a :href="item.url" @click="newsClick(item.id)" style="text-decoration: none;">
            <news-panel-entry :id="item.id" :url="item.url" :title="item.title"
            :media="item.media" :image_url="item.image_url" :visit_time="item.visit_time"/>
          </n-a>
        </n-list-item>
        <n-list-item v-if="news.length >= maxNewsCount">
          <router-link :to="morePath">
            <n-a>
              更多...
            </n-a>
          </router-link>
        </n-list-item>
      </n-list>
  </n-layout>
</template>

<script setup lang="ts">
import {
  NA,
  NEmpty,
  NLayout,
  NList,
  NListItem,
} from 'naive-ui';

import NewsPanelEntry from '@/components/NewsPanelEntry.vue';

import { newsClick } from '@/main';

import type { News } from '@/components/NewsPanelEntry.vue';

// Max count of news shown in a panel
const maxNewsCount = 10;

defineProps<{
  news: News[],
  morePath: string,
}>();
</script>