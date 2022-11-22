<!--
 * @FileDescription: 新闻展示面板 (用于收藏与稍后再看)
 * @Author: 王博文
 * @Date: 2022-11-07 00:40
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-22 10:51
-->

<template>
  <n-layout :style="{
    height: historyMode ? 'calc(60vh + 34px)' : '60vh'
  }">
    <n-empty v-if="!news.length" size="large" />
    <n-list v-else hoverable>
      <template v-for="item, id in news" :key="id">
        <n-text strong v-if="historyMode && getDateTitle(item, id)"
          style="font-size: 16px;">
          {{getDateTitle(item, id)}}
        </n-text>
        <n-list-item>
          <n-a :href="item.url" @click="newsClick(item.id)" style="text-decoration: none;">
            <news-panel-entry :id="item.id" :url="item.url" :title="item.title"
            :media="item.media" :picture_url="item.picture_url"
            :visit_time="historyMode ? item.visit_time : undefined"/>
          </n-a>
        </n-list-item>
      </template>
      <n-list-item v-if="historyMode">
        <router-link :to="morePath" style="text-decoration: none">
          <n-button>
            查看全部
          </n-button>
        </router-link>
      </n-list-item>
    </n-list>
  </n-layout>
  <router-link v-if="!historyMode" :to="morePath" style="text-decoration: none">
    <n-button>
      查看全部
    </n-button>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import {
  NA,
  NButton,
  NEmpty,
  NLayout,
  NList,
  NListItem,
  NText,
} from 'naive-ui';

import { endOfToday, endOfYesterday, startOfToday, startOfTomorrow, startOfYesterday } from 'date-fns';

import NewsPanelEntry from '@/components/NewsPanelEntry.vue';

import { newsClick } from '@/main';

import type { News } from '@/components/NewsPanelEntry.vue';

const props = defineProps<{
  news: News[],
  morePath: string,
  historyMode: boolean,
}>();

// Check if we should show "Today" or so here
function getDateTitle(item: News, id: number): string {
  // If this is the first item in the news list, insert a sentinel
  const lastItem = id ? props.news[id - 1] : {
    visit_time: startOfTomorrow(),
  };

  if (item.visit_time >= startOfToday()
    && item.visit_time < endOfToday()
    && lastItem.visit_time >= endOfToday()) {
    return '今天';
  }
  if (item.visit_time >= startOfYesterday()
    && item.visit_time < endOfYesterday()
    && lastItem.visit_time >= endOfYesterday()) {
    return '昨天';
  }
  if (item.visit_time < startOfYesterday()
    && lastItem.visit_time >= startOfYesterday()) {
    return '更早';
  }
  return '';
}
</script>