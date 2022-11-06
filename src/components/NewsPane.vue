<!--
 * @FileDescription: 新闻展示面板 (用于收藏等)
 * @Author: 王博文
 * @Date: 2022-11-07 00:40
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 02:13
-->

<template>
  <n-empty v-if="!news.length" size="large" />
  <n-list v-else hoverable>
    <n-list-item v-for="item, index in news">
      <n-a :href="item.url">
        <n-ellipsis line-clamp="1">
          {{item.title}}
        </n-ellipsis>
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
</template>

<script setup lang="ts">
import { NA, NEllipsis, NEmpty, NIcon, NList, NListItem, NSpace, NText } from 'naive-ui';

export interface News {
  id: number,
  title: string,
  url: string,
};

// Max count of news shown in a panel
const maxNewsCount = 5;

const props = defineProps<{
  news: News[],
  morePath: string,
}>();
</script>