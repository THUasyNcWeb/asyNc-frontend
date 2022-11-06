<!--
 * @FileDescription: 新闻展示面板 (用于收藏等)
 * @Author: 王博文
 * @Date: 2022-11-07 00:40
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 01:10
-->

<template>
  <n-empty v-if="news.length === 0" />
  <n-list v-else hoverable clickable>
    <n-thing v-for="item in news">
      <template #header>
        <n-ellipsis line-clamp="1">
          {{item.title}}
        </n-ellipsis>
      </template>
    </n-thing>
    <router-link :to="morePath">
      更多...
    </router-link>
  </n-list>
</template>

<script setup lang="ts">
import { NEllipsis, NEmpty, NList, NThing } from 'naive-ui';

export interface News {
  id: number,
  title: string,
  media: string,
  url: string,
  pub_time: Date,
};

const props = defineProps<{
  news: News[],
  morePath: string,
}>();
</script>